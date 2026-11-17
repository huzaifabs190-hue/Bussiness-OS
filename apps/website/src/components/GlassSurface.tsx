import {useEffect,useRef,useState,type ReactNode,type CSSProperties,type RefObject} from 'react';
import ReactBitsGlassSurface from './react-bits/GlassSurface.jsx';
import './glass.css';

type GlassSurfaceProps={children?:ReactNode;width?:number|string;height?:number|string;borderRadius?:number;distortionScale?:number;displace?:number;backgroundOpacity?:number;shape?:string;backdrop?:RefObject<HTMLImageElement|HTMLVideoElement|HTMLCanvasElement|null>;className?:string;style?:CSSProperties;refraction?:boolean};
/** Shared defaults from the requested React Bits treatment. Content stays undistorted. */
export default function GlassSurface({width='100%',height='100%',borderRadius=38,distortionScale=-180,displace=.5,backgroundOpacity=.1,...props}:GlassSurfaceProps){
 return <ReactBitsGlassSurface width={width} height={height} borderRadius={borderRadius} distortionScale={distortionScale} displace={displace} backgroundOpacity={backgroundOpacity} {...props}/>;
}

/** Decorative backing preserves the host's semantics, layout and focusable children. */
export function GlassLayer(){
 const ref=useRef<HTMLDivElement>(null);
 const [visible,setVisible]=useState(false);
 const [radius,setRadius]=useState(18);
 const [refract,setRefract]=useState(false);
 useEffect(()=>{
  const element=ref.current;
  if(!element)return;
  const measure=()=>{const parent=element.parentElement;if(!parent)return;const box=parent.getBoundingClientRect();setRadius(parseFloat(getComputedStyle(parent).borderTopLeftRadius)||0);setRefract(box.width*box.height<250000&&!matchMedia('(prefers-reduced-motion: reduce)').matches);};
  const observer=new IntersectionObserver(([entry])=>{setVisible(entry.isIntersecting);if(entry.isIntersecting)measure();},{rootMargin:'80px'});
  const resize=new ResizeObserver(measure);observer.observe(element);resize.observe(element);
  return()=>{observer.disconnect();resize.disconnect();};
 },[]);
 return <div ref={ref} className="glass-layer" aria-hidden="true">{visible&&<GlassSurface borderRadius={radius} refraction={refract}/>}</div>;
}
