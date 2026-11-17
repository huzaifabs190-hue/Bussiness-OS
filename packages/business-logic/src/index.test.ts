import {describe,it,expect} from 'vitest';
import {checkout,returnSale,totals,parseMoney,units} from './index';
import {catalog,initialState} from '../../../apps/website/src/data';
const when='2026-11-15T10:00:00.000Z';
const input={lines:[{medicineId:'m1',quantity:2,unit:'strip'}],discountPercent:10,payment:'cash',tendered:1000};
describe('integer pharmacy calculations',()=>{
it('converts pack, strip and tablet units',()=>{expect(units(catalog[0],'pack')).toBe(100);expect(units(catalog[0],'strip')).toBe(10);expect(units(catalog[0],'tablet')).toBe(1);});
it('parses money without binary floating point multiplication',()=>{expect(parseMoney('1.01')).toBe(101);expect(parseMoney('100')).toBe(10000);expect(()=>parseMoney('1.001')).toThrow();expect(()=>parseMoney('-1')).toThrow();});
it('rounds discounts to the nearest minor unit',()=>{expect(totals([{medicineId:'m1',quantity:1,unit:'tablet'}],catalog,10)).toEqual({subtotal:25,discount:3,total:22});});
it('reduces stock atomically and computes cash change',()=>{const state=initialState();const next=checkout(state,catalog,input,'sale1',when);expect(next.sale.total).toBe(450);expect(next.sale.change).toBe(550);expect(next.state.stock.m1).toBe(460);expect(state.stock.m1).toBe(480);expect(state.sales).toHaveLength(0);});
it('does not duplicate retried operation IDs',()=>{const first=checkout(initialState(),catalog,input,'sale1',when);const retried=checkout(first.state,catalog,input,'sale1',when);expect(retried.state).toBe(first.state);expect(retried.state.sales).toHaveLength(1);});
it('rejects aggregate stock overselling across unit lines',()=>{const lines=[{medicineId:'m1',quantity:4,unit:'pack'},{medicineId:'m1',quantity:9,unit:'strip'}];expect(()=>checkout(initialState(),catalog,{...input,lines},'sale1',when)).toThrow('Insufficient stock');});
it('rejects insufficient cash, fractional quantities and invalid discounts',()=>{expect(()=>checkout(initialState(),catalog,{...input,tendered:1},'s',when)).toThrow('Cash received');expect(()=>checkout(initialState(),catalog,{...input,lines:[{medicineId:'m1',quantity:1.5,unit:'tablet'}]},'s',when)).toThrow();expect(()=>checkout(initialState(),catalog,{...input,discountPercent:101},'s',when)).toThrow();});
it('blocks expired batches at checkout',()=>{expect(()=>checkout(initialState(),catalog,input,'s','2028-01-01T00:00:00.000Z')).toThrow('expired');});
it('records card simulation with exact tender and no change',()=>{const {sale}=checkout(initialState(),catalog,{...input,payment:'card',tendered:0},'s',when);expect(sale.tendered).toBe(sale.total);expect(sale.change).toBe(0);});
it('returns stock without modifying completed sales and prevents double returns',()=>{const {state,sale}=checkout(initialState(),catalog,input,'s',when);const returned=returnSale(state,'s','Customer return','r',when);expect(returned.stock.m1).toBe(480);expect(returned.sales[0]).toBe(sale);expect(returned.returns[0].amount).toBe(450);expect(()=>returnSale(returned,'s','Again','r2',when)).toThrow('already');});
});
