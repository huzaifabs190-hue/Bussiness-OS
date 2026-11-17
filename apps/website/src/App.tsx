import {Workspace} from './workspaces/Workspace';
import type {Industry} from './workspaces/model';
import {useEffect,useState} from 'react';
import {Moon,Sun} from 'lucide-react';
import {Marketing} from './Marketing';
import {Demo} from './Demo';
import {QuickSearch} from './components/QuickSearch';
import {useDialogFocus} from './useDialogFocus';
export function App(){useDialogFocus();const [route,setRoute]=useState(location.hash.slice(1)||'/');const [dark,setDark]=useState(()=>{try{return localStorage.getItem('businessos-theme-v2')!=='light';}catch{return true;}});useEffect(()=>{const onHash=()=>{setRoute(location.hash.slice(1)||'/');window.scrollTo(0,0);};window.addEventListener('hashchange',onHash);return()=>window.removeEventListener('hashchange',onHash);},[]);useEffect(()=>{document.documentElement.dataset.theme=dark?'dark':'light';try{localStorage.setItem('businessos-theme-v2',dark?'dark':'light');}catch{}},[dark]);const toggle=<button className="icon-button" onClick={()=>setDark(!dark)} aria-label={`Switch to ${dark?'light':'dark'} theme`}>{dark?<Sun size={18}/>:<Moon size={18}/>}</button>;const segments=route.split('/');const candidate=segments[1]==='products'?segments[2]:segments[1];const industry=['retail','restaurant','clinic'].includes(candidate)?candidate as Industry:null;return <><QuickSearch/><a className="skip-link" href="#main-content" onClick={e=>{e.preventDefault();document.getElementById('main-content')?.focus();}}>Skip to content</a>{industry?<Workspace key={industry} kind={industry} page={segments[1]==='products'?'':segments[2]?.split('?')[0]||''} themeToggle={toggle}/>:route.startsWith('/demo')?<Demo route={route} themeToggle={toggle}/>:<Marketing route={route} themeToggle={toggle}/>}</>}
