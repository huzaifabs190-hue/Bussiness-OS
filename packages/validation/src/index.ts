import { z } from 'zod';
const money=z.number().int().min(0).max(Number.MAX_SAFE_INTEGER);
export const cartLineSchema=z.object({medicineId:z.string().min(1),quantity:z.number().int().min(1).max(10000),unit:z.enum(['tablet','strip','pack'])});
export const checkoutSchema=z.object({lines:z.array(cartLineSchema).min(1),discountPercent:z.number().int().min(0).max(100),payment:z.enum(['cash','card']),tendered:money});
const saleLine=cartLineSchema.extend({name:z.string(),batch:z.string(),tablets:money,unitPrice:money,cost:money,total:money});
export const demoStateSchema=z.object({version:z.literal(1),stock:z.record(money),sales:z.array(z.object({id:z.string(),createdAt:z.string().datetime(),lines:z.array(saleLine),subtotal:money,discount:money,total:money,payment:z.enum(['cash','card']),tendered:money,change:money})),returns:z.array(z.object({id:z.string(),saleId:z.string(),createdAt:z.string().datetime(),amount:money,reason:z.string().min(1)}))});
