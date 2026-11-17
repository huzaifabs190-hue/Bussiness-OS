import {useEffect,useState} from 'react';
import {initialWorkspace,type Industry,type WorkspaceState} from './model';
function valid(data:unknown):data is WorkspaceState{
 if(!data||typeof data!=='object')return false;const d=data as WorkspaceState;
 return d.version===1&&Array.isArray(d.items)&&d.items.every(i=>typeof i.id==='string'&&typeof i.name==='string'&&typeof i.category==='string'&&typeof i.code==='string'&&Number.isSafeInteger(i.price)&&i.price>=0&&Number.isSafeInteger(i.stock)&&i.stock>=0)&&Array.isArray(d.orders)&&d.orders.every(o=>typeof o.id==='string'&&typeof o.created==='string'&&['paid','returned','queued','preparing','ready','served','cancelled'].includes(o.status)&&Number.isSafeInteger(o.total)&&o.total>=0&&Array.isArray(o.lines)&&o.lines.every(l=>typeof l.id==='string'&&typeof l.name==='string'&&Number.isSafeInteger(l.price)&&Number.isSafeInteger(l.quantity)&&l.quantity>0))&&Array.isArray(d.patients)&&d.patients.every(p=>typeof p.id==='string'&&typeof p.name==='string'&&typeof p.reference==='string')&&Array.isArray(d.appointments)&&d.appointments.every(a=>typeof a.id==='string'&&typeof a.patient==='string'&&typeof a.date==='string'&&typeof a.time==='string'&&typeof a.provider==='string'&&typeof a.service==='string'&&Number.isSafeInteger(a.fee)&&typeof a.paid==='boolean'&&['booked','arrived','completed','cancelled'].includes(a.status));
}
export function useWorkspace(kind:Industry){
 const key=`businessos-${kind}-v1`;const [warning,setWarning]=useState('');
 const [state,setState]=useState<WorkspaceState>(()=>{try{const raw=localStorage.getItem(key);if(!raw)return initialWorkspace(kind);const data:unknown=JSON.parse(raw);return valid(data)?data:initialWorkspace(kind);}catch{return initialWorkspace(kind);}});
 useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(state));setWarning('');}catch{setWarning('Browser storage is unavailable. Your changes will last only for this session.');}},[key,state]);
 return {state,setState,warning};
}
