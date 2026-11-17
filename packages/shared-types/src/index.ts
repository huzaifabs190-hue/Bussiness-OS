export type Unit = 'tablet' | 'strip' | 'pack';
export interface Medicine { id:string; name:string; generic:string; strength:string; form:string; manufacturer:string; barcode:string; batch:string; expiry:string; stock:number; price:number; cost:number; perStrip:number; stripsPerPack:number; reorder:number; category:string }
export interface CartLine { medicineId:string; quantity:number; unit:Unit }
export interface SaleLine extends CartLine { name:string; batch:string; tablets:number; unitPrice:number; cost:number; total:number }
export interface Sale { id:string; createdAt:string; lines:SaleLine[]; subtotal:number; discount:number; total:number; payment:'cash'|'card'; tendered:number; change:number }
export interface ReturnRecord { id:string; saleId:string; createdAt:string; amount:number; reason:string }
export interface DemoState { version:1; stock:Record<string,number>; sales:Sale[]; returns:ReturnRecord[] }
