import{m as u,u as d,n as l,o as a,c as o,a as n,t as h,p as _,F as m,q as p,b}from"./DNWstqCp.js";const k={class:"space-y-8"},f={class:"text-3xl font-bold text-neutral-800 dark:text-white"},v={class:"grid grid-cols-1 md:grid-cols-3 gap-6"},H=u({__name:"dashboard",setup(g){const r=d(),c=[{id:"home",title:"Home Hub",path:"/home-hub",icon:"HomeIcon",stats:{tasks:0,events:0,notes:0}},{id:"work",title:"Work Hub",path:"/work-hub",icon:"BriefcaseIcon",stats:{tasks:0,events:0,notes:0}},{id:"business",title:"Side Business Hub",path:"/business-hub",icon:"ChartBarIcon",stats:{tasks:0,events:0,notes:0}}];return(x,B)=>{var e,s;const i=l("hub-preview-card");return a(),o("div",k,[n("h1",f," Welcome back, "+h((s=(e=_(r).user)==null?void 0:e.user_metadata)==null?void 0:s.full_name),1),n("div",v,[(a(),o(m,null,p(c,t=>b(i,{key:t.id,hub:t},null,8,["hub"])),64))])])}}});export{H as default};