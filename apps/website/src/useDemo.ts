import {useEffect,useState} from 'react';
import type {DemoState} from '@businessos/shared-types';
import {demoStateSchema} from '@businessos/validation';
import {initialState} from './data';
const key='businessos-demo-v1';
export function useDemo(){const [warning,setWarning]=useState('');const [state,setState]=useState<DemoState>(()=>{try{const raw=localStorage.getItem(key);return raw?demoStateSchema.parse(JSON.parse(raw)):initialState();}catch{return initialState();}});useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(state));}catch{setWarning('Browser storage is unavailable. This demo session will not be saved.');}},[state]);return {state,setState,warning};}
