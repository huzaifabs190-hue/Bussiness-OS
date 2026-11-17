import type { ReactNode } from 'react';
export function Badge({children,muted=false}:{children:ReactNode;muted?:boolean}){return <span className={`badge ${muted?'muted':''}`}>{children}</span>}
export function Logo({compact=false}:{compact?:boolean}){return <span className="logo"><span className="logo-mark" aria-hidden="true"><i/><i/><i/><i/></span>{!compact&&<span>Business<span className="logo-os">OS</span></span>}</span>}
export function Empty({title,children}:{title:string;children:ReactNode}){return <div className="empty"><strong>{title}</strong><div>{children}</div></div>}
