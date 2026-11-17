export type WorkspaceId='pharma'|'retail'|'restaurant'|'clinic';
const pages:Record<WorkspaceId,string[]>={pharma:['pos','inventory','sales','dashboard'],retail:['checkout','stock','sales','overview'],restaurant:['orders','tables','kitchen','menu','sales','overview'],clinic:['appointments','patients','billing','overview']};
const sections:Record<string,Partial<Record<WorkspaceId,string>>>={
 start:{pharma:'pos',retail:'checkout',restaurant:'orders',clinic:'appointments'},
 stock:{pharma:'inventory',retail:'stock',restaurant:'menu'},
 history:{pharma:'sales',retail:'sales',restaurant:'sales',clinic:'billing'},
 overview:{pharma:'dashboard',retail:'overview',restaurant:'overview',clinic:'overview'},
};
export function readWorkspaceRoute(route:string){const [_,prefix,page]=route.replace(/^#/,'').split('?')[0].split('/');const kind=prefix==='demo'?'pharma':prefix;if(!(kind in pages))return null;const id=kind as WorkspaceId;return pages[id].includes(page)?{kind:id,page}:null;}
export function workspaceDestination(target:WorkspaceId,route:string,remembered?:string){
 const current=readWorkspaceRoute(route);let page:string|undefined;
 if(current?.kind===target)page=current.page;
 else if(current)page=Object.values(sections).find(group=>group[current.kind]===current.page)?.[target];
 if(!page&&remembered&&pages[target].includes(remembered))page=remembered;
 return `#/${target==='pharma'?'demo':target}/${page||pages[target][0]}`;
}
