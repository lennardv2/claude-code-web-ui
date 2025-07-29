import{u as l}from"./CpwgzFML.js";import{a as n,c as m}from"./sK2qMGig.js";import{_ as p}from"./CMR0-z1p.js";import{D as u,g as h,E as y,c,a as e,b as x,w as f,j as a,F as g,s as k,o,d as _,n as v,C as b,G as M,t as d}from"./EiYOuP0n.js";/**
 * @license lucide-vue-next v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=n("monitor",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]);/**
 * @license lucide-vue-next v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=n("moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-vue-next v0.525.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=n("sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]),D=()=>u("color-mode").value,z={class:"flex-1 space-y-8 p-6 pb-16 max-w-4xl mx-auto"},B={class:"space-y-6"},L={class:"ml-6 space-y-6"},j={class:"space-y-3"},N={class:"grid max-w-md grid-cols-3 gap-3"},V=["onClick"],q={class:"space-y-2"},E={class:"flex items-center space-x-2"},F={class:"text-sm font-medium"},T={class:"text-xs text-muted-foreground"},Z=h({__name:"settings",setup($){const r=D();l(),y();const i=[{value:"light",label:"Light",description:"Light mode",icon:S},{value:"dark",label:"Dark",description:"Dark mode",icon:w},{value:"auto",label:"System",description:"Use system setting",icon:C}];return(A,t)=>(o(),c("div",z,[t[3]||(t[3]=e("div",{class:"space-y-0.5"},[e("h2",{class:"text-2xl font-bold tracking-tight"},"Settings"),e("p",{class:"text-muted-foreground"}," Manage your account settings and preferences. ")],-1)),e("div",B,[t[2]||(t[2]=e("div",{class:"space-y-2"},[e("h3",{class:"text-lg font-medium"},"Appearance"),e("p",{class:"text-sm text-muted-foreground"},"Customize the look and feel of the interface.")],-1)),e("div",L,[e("div",j,[x(a(p),{class:"text-base"},{default:f(()=>t[0]||(t[0]=[_("Theme")])),_:1,__:[0]}),t[1]||(t[1]=e("p",{class:"text-sm text-muted-foreground"}," Select the theme for the dashboard. ",-1)),e("div",N,[(o(),c(g,null,k(i,s=>e("div",{key:s.value,onClick:G=>a(r).preference=s.value,class:v(a(m)("cursor-pointer rounded-lg border-2 p-3 hover:bg-accent",a(r).preference===s.value?"border-primary":"border-muted"))},[e("div",q,[e("div",E,[(o(),b(M(s.icon),{class:"h-4 w-4"})),e("span",F,d(s.label),1)]),e("p",T,d(s.description),1)])],10,V)),64))])])])])]))}});export{Z as default};
