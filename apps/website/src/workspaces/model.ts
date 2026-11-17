export type Industry='retail'|'restaurant'|'clinic';
export type Item={id:string;name:string;category:string;price:number;stock:number;code:string};
export type Line={id:string;quantity:number};
export type Order={id:string;created:string;lines:{id:string;name:string;quantity:number;price:number}[];total:number;status:'paid'|'returned'|'queued'|'preparing'|'ready'|'served'|'cancelled';table?:number;payment?:string};
export type Patient={id:string;name:string;reference:string};
export type Appointment={id:string;patient:string;date:string;time:string;provider:string;service:string;fee:number;status:'booked'|'arrived'|'completed'|'cancelled';paid:boolean};
export type WorkspaceState={version:1;items:Item[];orders:Order[];patients:Patient[];appointments:Appointment[]};
export const providers=['Dr. Morgan (sample)','Dr. Casey (sample)'];
export const services=[{name:'General appointment',fee:4000},{name:'Follow-up appointment',fee:2500},{name:'Administrative consultation',fee:1500}];
export const money=(cents:number)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(cents/100);
export function today(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
export function initialWorkspace(kind:Industry):WorkspaceState {
 const products=kind==='retail'?[['Coffee beans','Grocery',1290,35,'200001'],['Oat milk','Grocery',420,24,'200002'],['Cotton tote','Accessories',850,18,'200003'],['Notebook','Stationery',650,42,'200004'],['Desk lamp','Home',2990,8,'200005'],['Water bottle','Accessories',1800,16,'200006']]:kind==='restaurant'?[['Classic burger','Mains',1250,40,'300001'],['Margherita pizza','Mains',1450,30,'300002'],['Garden salad','Sides',750,30,'300003'],['Fries','Sides',450,60,'300004'],['Lemonade','Drinks',350,80,'300005'],['Chocolate brownie','Desserts',550,25,'300006']]:[];
 return {version:1,items:products.map(([name,category,price,stock,code],i)=>({id:`${kind}-${i+1}`,name:String(name),category:String(category),price:Number(price),stock:Number(stock),code:String(code)})),orders:[],patients:kind==='clinic'?[{id:'sample-a',name:'Alex Sample',reference:'DEMO-001'},{id:'sample-b',name:'Jamie Example',reference:'DEMO-002'},{id:'sample-c',name:'Taylor Demo',reference:'DEMO-003'}]:[],appointments:[]};
}
export function placeOrder(state:WorkspaceState,lines:Line[],kind:Industry,id:string,created:string,table?:number,payment='Cash simulation'):WorkspaceState {
 if(kind==='clinic'||!lines.length)throw Error('Add at least one item first.');
 if(state.orders.some(o=>o.id===id))return state;
 if(kind==='restaurant'&&(typeof table!=='number'||!Number.isInteger(table)||table<1||table>8))throw Error('Choose a table from 1 to 8.');
 if(kind==='restaurant'&&state.orders.some(o=>o.table===table&&!['paid','cancelled'].includes(o.status)))throw Error('This table already has an open order. Choose a free table.');
 const merged=new Map<string,number>();for(const line of lines){if(!Number.isInteger(line.quantity)||line.quantity<1)throw Error('Quantity must be a positive whole number.');merged.set(line.id,(merged.get(line.id)||0)+line.quantity);}
 const snapshots=[...merged].map(([itemId,quantity])=>{const item=state.items.find(i=>i.id===itemId);if(!item)throw Error('Item no longer exists.');if(quantity>item.stock)throw Error(`Only ${item.stock} ${item.name} available.`);return {id:item.id,name:item.name,price:item.price,quantity};});
 const total=snapshots.reduce((sum,l)=>sum+l.price*l.quantity,0);
 return {...state,items:state.items.map(i=>({...i,stock:i.stock-(merged.get(i.id)||0)})),orders:[{id,created,lines:snapshots,total,status:kind==='retail'?'paid':'queued',...(kind==='restaurant'?{table}:{payment})},...state.orders]};
}
export function changeOrder(state:WorkspaceState,id:string,next:Order['status']):WorkspaceState{
 const order=state.orders.find(o=>o.id===id);if(!order)throw Error('Order not found.');
 const allowed:Record<Order['status'],Order['status'][]>={paid:order.table?[]:['returned'],returned:[],queued:['preparing','cancelled'],preparing:['ready','cancelled'],ready:['served'],served:['paid'],cancelled:[]};
 if(!allowed[order.status].includes(next))throw Error('This order has already changed. Refresh its status.');
 const restore=next==='returned'||next==='cancelled';return {...state,items:restore?state.items.map(i=>({...i,stock:i.stock+order.lines.filter(l=>l.id===i.id).reduce((n,l)=>n+l.quantity,0)})):state.items,orders:state.orders.map(o=>o.id===id?{...o,status:next,...(next==='paid'?{payment:'Cash simulation'}:{})}:o)};
}
export function receiveStock(state:WorkspaceState,id:string,quantity:number):WorkspaceState{if(!Number.isInteger(quantity)||quantity<1||quantity>10000)throw Error('Enter a whole quantity from 1 to 10,000.');if(!state.items.some(i=>i.id===id))throw Error('Item not found.');return {...state,items:state.items.map(i=>i.id===id?{...i,stock:i.stock+quantity}:i)};}
export function bookAppointment(state:WorkspaceState,input:Omit<Appointment,'status'|'paid'>):WorkspaceState{
 if(!state.patients.some(p=>p.id===input.patient))throw Error('Choose a sample patient.');
 if(!providers.includes(input.provider)||!services.some(s=>s.name===input.service&&s.fee===input.fee))throw Error('Choose a valid provider and service.');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(input.date)||input.date<today()||Number.isNaN(Date.parse(input.date))||new Date(input.date).toISOString().slice(0,10)!==input.date)throw Error('Choose today or a future date.');
 if(!/^(09|10|11|12|13|14|15|16):[03]0$/.test(input.time))throw Error('Choose a half-hour slot from 09:00 to 16:30.');
 if(state.appointments.some(a=>a.status!=='cancelled'&&a.date===input.date&&a.time===input.time&&(a.provider===input.provider||a.patient===input.patient)))throw Error('The provider or patient already has an appointment at that time.');
 return {...state,appointments:[{...input,status:'booked',paid:false},...state.appointments]};
}
export function changeAppointment(state:WorkspaceState,id:string,next:Appointment['status']|'paid'):WorkspaceState{
 const a=state.appointments.find(a=>a.id===id);if(!a)throw Error('Appointment not found.');
 const valid=next==='paid'?a.status==='completed'&&!a.paid:({booked:['arrived','cancelled'],arrived:['completed','cancelled'],completed:[],cancelled:[]} as Record<string,string[]>)[a.status].includes(next);
 if(!valid)throw Error('This appointment cannot make that change.');return {...state,appointments:state.appointments.map(a=>a.id===id?{...a,...(next==='paid'?{paid:true}:{status:next})}:a)};
}
