import {lazy,Suspense,useState} from 'react';
import {ArrowUpRight,LayoutDashboard,ShoppingCart,Package,ReceiptText,ArrowRight} from 'lucide-react';
import {useVisualEffects} from './Effects';
const MagicBento=lazy(()=>import('./react-bits/MagicBento.jsx'));
const AnimatedList=lazy(()=>import('./react-bits/AnimatedList.jsx'));
const SpotlightCard=lazy(()=>import('./react-bits/SpotlightCard.jsx'));

const destinations=[
 {id:'dashboard',title:'Your business, at a glance.',description:'Explore sample revenue, stock value and recent demo activity.',meta:'Overview',icon:<LayoutDashboard size={20}/>,detail:'A clear view of the day.',body:'See totals calculated from your sample sales and returns. The weekly chart is explicitly illustrative.',action:'Open the dashboard'},
 {id:'pos',title:'A faster way to the finish.',description:'Search, choose a unit and complete a sample checkout.',meta:'Point of sale',icon:<ShoppingCart size={20}/>,detail:'From search to receipt.',body:'Try Panadol or barcode 100001. Sell by pack, strip or tablet, apply a discount and simulate a payment.',action:'Try point of sale'},
 {id:'inventory',title:'Every batch, in view.',description:'Browse sample medicines, batches, expiry and stock.',meta:'Inventory',icon:<Package size={20}/>,detail:'Know what is on the shelf.',body:'Search the sample catalog and filter low stock or expiry risk. Demo sales and returns update the available quantities.',action:'Browse medicines'},
 {id:'sales',title:'A record you can follow.',description:'Review receipts and record separate full returns.',meta:'Sales & returns',icon:<ReceiptText size={20}/>,detail:'Every sample sale leaves a trail.',body:'Completed sale records stay unchanged. Full returns create a separate record and restore demo stock. Export the sample sales as CSV.',action:'View sales & returns'}
];

export function MagicWorkspace(){
 const {enabled,reduced}=useVisualEffects();
 const items=destinations.map((item,index)=>({label:item.meta,title:item.title,description:item.description,icon:item.icon,href:`#/demo/${item.id}`,colSpan:2,rowSpan:index<2?2:1,visual:index===0?<div className="bento-metrics"><small>ILLUSTRATIVE WEEK</small><strong>$7,320<span>.00</span></strong><div className="bento-bars" aria-hidden="true">{[35,52,42,73,58,96,82].map((height,i)=><i key={i} style={{height:`${height}%`}}/>)}</div></div>:index===1?<div className="bento-ticket"><span>WALK-IN CUSTOMER <ShoppingCart size={14}/></span><div><span>Panadol · 1 strip</span><strong>$2.50</strong></div><div><span>Sample total</span><strong>$2.50</strong></div><small>SIMULATED CHECKOUT <ArrowUpRight size={14}/></small></div>:undefined}));
 return <Suspense fallback={<div className="bento-loading">Preparing your workspace…</div>}><MagicBento className="business-bento" items={items} columns={4} rowHeight={170} gap={14} radius={22} theme="dark" glowColor="#eeeeee" enableBorderGlow={enabled} enableSpotlight={enabled} enableStars={enabled&&!reduced} particleCount={12} enableTilt={enabled&&!reduced} clickEffect={enabled&&!reduced} disableAnimations={!enabled||reduced} intro={false} textAutoHide={false}/></Suspense>;
}

export function WorkspaceLaunchpad(){
 const [selected,setSelected]=useState(0);const active=destinations[selected];const {enabled,reduced}=useVisualEffects();
 return <section className="section-wrap workspace-launchpad" aria-labelledby="launchpad-title"><div className="section-heading"><div><span className="eyebrow">LESS SEARCHING. MORE DOING.</span><h2 id="launchpad-title">Your next move.<br/><span>One click away.</span></h2></div><p>Select a workspace to explore.<br/>Everything here uses sample data.</p></div><div className="launchpad-grid"><Suspense fallback={<div className="bento-loading">Loading workspace choices…</div>}><AnimatedList className="workspace-list" items={destinations} initialSelectedIndex={0} selectOnHover={false} onItemSelect={(_item:unknown,index:number)=>setSelected(index)} animation={enabled&&!reduced?'pop':'none'} animateOnce theme="dark" width="100%" maxHeight={450} showGradients={false} accentColor="#ffffff" radius={14} gap={10}/><SpotlightCard className="launchpad-detail" theme="dark" spotlightColor="#ffffff" intensity={enabled?.15:0} borderGlow={enabled?.6:0} ambient={enabled&&!reduced} flare={enabled&&!reduced}><div className="launchpad-detail-copy" aria-live="polite"><span className="launchpad-icon">{active.icon}</span><span className="eyebrow">0{selected+1} / {active.meta}</span><h3>{active.detail}</h3><p>{active.body}</p><a className="button dark" href={`#/demo/${active.id}`}>{active.action}<ArrowRight size={17}/></a></div><span className="launchpad-foot">PHARMAOS / INTERACTIVE DEMO <ArrowUpRight size={16}/></span></SpotlightCard></Suspense></div></section>;
}
