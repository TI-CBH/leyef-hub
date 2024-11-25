import{_ as le}from"./sBqySmQk.js";import{x as ye,m as P,o as S,c as T,p as w,y as F,z as we,A as V,B as $,e as N,r as x,C as E,D as oe,E as xe,G as _e,F as ue,H as se,I as Ie,u as ie,w as k,b as I,t as ce,a as M,J as z,d as B,T as Se,q as Ee,K as ke,L as Pe}from"./DNWstqCp.js";let Me=new Proxy({},{get:(e,t)=>{if(t==="__esModule")return{};throw new Error(`You're trying to import \`@heroicons/vue/outline/${t}\` from Heroicons v1 but have installed Heroicons v2. Install \`@heroicons/vue@v1\` to resolve this error.`)}});var J=Me;const $e=()=>ye("color-mode").value,Te=P({__name:"ThemeToggle",setup(e){const t=$e(),r=()=>{t.preference=t.value==="dark"?"light":"dark"};return(l,o)=>(S(),T("button",{onClick:r,class:"p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"},[w(t).value==="dark"?(S(),F(w(J.SunIcon),{key:0,class:"h-5 w-5"})):(S(),F(w(J.MoonIcon),{key:1,class:"h-5 w-5"}))]))}});var Q;let De=Symbol("headlessui.useid"),Ne=0;const W=(Q=we)!=null?Q:function(){return V(De,()=>`${++Ne}`)()};function g(e){var t;if(e==null||e.value==null)return null;let r=(t=e.value.$el)!=null?t:e.value;return r instanceof Node?r:null}function R(e,t,...r){if(e in t){let o=t[e];return typeof o=="function"?o(...r):o}let l=new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(o=>`"${o}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(l,R),l}var Oe=Object.defineProperty,Ae=(e,t,r)=>t in e?Oe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,Z=(e,t,r)=>(Ae(e,typeof t!="symbol"?t+"":t,r),r);let Fe=class{constructor(){Z(this,"current",this.detect()),Z(this,"currentId",0)}set(t){this.current!==t&&(this.currentId=0,this.current=t)}reset(){this.set(this.detect())}nextId(){return++this.currentId}get isServer(){return this.current==="server"}get isClient(){return this.current==="client"}detect(){return typeof window>"u"||typeof document>"u"?"server":"client"}},q=new Fe;function G(e){if(q.isServer)return null;if(e instanceof Node)return e.ownerDocument;if(e!=null&&e.hasOwnProperty("value")){let t=g(e);if(t)return t.ownerDocument}return document}let H=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(",");var U=(e=>(e[e.First=1]="First",e[e.Previous=2]="Previous",e[e.Next=4]="Next",e[e.Last=8]="Last",e[e.WrapAround=16]="WrapAround",e[e.NoScroll=32]="NoScroll",e))(U||{}),Re=(e=>(e[e.Error=0]="Error",e[e.Overflow=1]="Overflow",e[e.Success=2]="Success",e[e.Underflow=3]="Underflow",e))(Re||{}),Le=(e=>(e[e.Previous=-1]="Previous",e[e.Next=1]="Next",e))(Le||{});function de(e=document.body){return e==null?[]:Array.from(e.querySelectorAll(H)).sort((t,r)=>Math.sign((t.tabIndex||Number.MAX_SAFE_INTEGER)-(r.tabIndex||Number.MAX_SAFE_INTEGER)))}var X=(e=>(e[e.Strict=0]="Strict",e[e.Loose=1]="Loose",e))(X||{});function Y(e,t=0){var r;return e===((r=G(e))==null?void 0:r.body)?!1:R(t,{0(){return e.matches(H)},1(){let l=e;for(;l!==null;){if(l.matches(H))return!0;l=l.parentElement}return!1}})}function fe(e){let t=G(e);$(()=>{t&&!Y(t.activeElement,0)&&je(e)})}var Ce=(e=>(e[e.Keyboard=0]="Keyboard",e[e.Mouse=1]="Mouse",e))(Ce||{});typeof window<"u"&&typeof document<"u"&&(document.addEventListener("keydown",e=>{e.metaKey||e.altKey||e.ctrlKey||(document.documentElement.dataset.headlessuiFocusVisible="")},!0),document.addEventListener("click",e=>{e.detail===1?delete document.documentElement.dataset.headlessuiFocusVisible:e.detail===0&&(document.documentElement.dataset.headlessuiFocusVisible="")},!0));function je(e){e==null||e.focus({preventScroll:!0})}let Be=["textarea","input"].join(",");function He(e){var t,r;return(r=(t=e==null?void 0:e.matches)==null?void 0:t.call(e,Be))!=null?r:!1}function ve(e,t=r=>r){return e.slice().sort((r,l)=>{let o=t(r),a=t(l);if(o===null||a===null)return 0;let n=o.compareDocumentPosition(a);return n&Node.DOCUMENT_POSITION_FOLLOWING?-1:n&Node.DOCUMENT_POSITION_PRECEDING?1:0})}function Ue(e,t){return Ke(de(),t,{relativeTo:e})}function Ke(e,t,{sorted:r=!0,relativeTo:l=null,skipElements:o=[]}={}){var a;let n=(a=Array.isArray(e)?e.length>0?e[0].ownerDocument:document:e==null?void 0:e.ownerDocument)!=null?a:document,s=Array.isArray(e)?r?ve(e):e:de(e);o.length>0&&s.length>1&&(s=s.filter(i=>!o.includes(i))),l=l??n.activeElement;let f=(()=>{if(t&5)return 1;if(t&10)return-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),p=(()=>{if(t&1)return 0;if(t&2)return Math.max(0,s.indexOf(l))-1;if(t&4)return Math.max(0,s.indexOf(l))+1;if(t&8)return s.length-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),m=t&32?{preventScroll:!0}:{},v=0,u=s.length,c;do{if(v>=u||v+u<=0)return 0;let i=p+v;if(t&16)i=(i+u)%u;else{if(i<0)return 3;if(i>=u)return 1}c=s[i],c==null||c.focus(m),v+=f}while(c!==n.activeElement);return t&6&&He(c)&&c.select(),2}function Ve(){return/iPhone/gi.test(window.navigator.platform)||/Mac/gi.test(window.navigator.platform)&&window.navigator.maxTouchPoints>0}function We(){return/Android/gi.test(window.navigator.userAgent)}function qe(){return Ve()||We()}function A(e,t,r){q.isServer||N(l=>{document.addEventListener(e,t,r),l(()=>document.removeEventListener(e,t,r))})}function Ge(e,t,r){q.isServer||N(l=>{window.addEventListener(e,t,r),l(()=>window.removeEventListener(e,t,r))})}function Xe(e,t,r=E(()=>!0)){function l(a,n){if(!r.value||a.defaultPrevented)return;let s=n(a);if(s===null||!s.getRootNode().contains(s))return;let f=function p(m){return typeof m=="function"?p(m()):Array.isArray(m)||m instanceof Set?m:[m]}(e);for(let p of f){if(p===null)continue;let m=p instanceof HTMLElement?p:g(p);if(m!=null&&m.contains(s)||a.composed&&a.composedPath().includes(m))return}return!Y(s,X.Loose)&&s.tabIndex!==-1&&a.preventDefault(),t(a,s)}let o=x(null);A("pointerdown",a=>{var n,s;r.value&&(o.value=((s=(n=a.composedPath)==null?void 0:n.call(a))==null?void 0:s[0])||a.target)},!0),A("mousedown",a=>{var n,s;r.value&&(o.value=((s=(n=a.composedPath)==null?void 0:n.call(a))==null?void 0:s[0])||a.target)},!0),A("click",a=>{qe()||o.value&&(l(a,()=>o.value),o.value=null)},!0),A("touchend",a=>l(a,()=>a.target instanceof HTMLElement?a.target:null),!0),Ge("blur",a=>l(a,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}function ee(e,t){if(e)return e;let r=t??"button";if(typeof r=="string"&&r.toLowerCase()==="button")return"button"}function Ye(e,t){let r=x(ee(e.value.type,e.value.as));return oe(()=>{r.value=ee(e.value.type,e.value.as)}),N(()=>{var l;r.value||g(t)&&g(t)instanceof HTMLButtonElement&&!((l=g(t))!=null&&l.hasAttribute("type"))&&(r.value="button")}),r}function te(e){return[e.screenX,e.screenY]}function ze(){let e=x([-1,-1]);return{wasMoved(t){let r=te(t);return e.value[0]===r[0]&&e.value[1]===r[1]?!1:(e.value=r,!0)},update(t){e.value=te(t)}}}function Je({container:e,accept:t,walk:r,enabled:l}){N(()=>{let o=e.value;if(!o||l!==void 0&&!l.value)return;let a=G(e);if(!a)return;let n=Object.assign(f=>t(f),{acceptNode:t}),s=a.createTreeWalker(o,NodeFilter.SHOW_ELEMENT,n,!1);for(;s.nextNode();)r(s.currentNode)})}var K=(e=>(e[e.None=0]="None",e[e.RenderStrategy=1]="RenderStrategy",e[e.Static=2]="Static",e))(K||{}),Qe=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(Qe||{});function L({visible:e=!0,features:t=0,ourProps:r,theirProps:l,...o}){var a;let n=me(l,r),s=Object.assign(o,{props:n});if(e||t&2&&n.static)return j(s);if(t&1){let f=(a=n.unmount)==null||a?0:1;return R(f,{0(){return null},1(){return j({...o,props:{...n,hidden:!0,style:{display:"none"}}})}})}return j(s)}function j({props:e,attrs:t,slots:r,slot:l,name:o}){var a,n;let{as:s,...f}=Ze(e,["unmount","static"]),p=(a=r.default)==null?void 0:a.call(r,l),m={};if(l){let v=!1,u=[];for(let[c,i]of Object.entries(l))typeof i=="boolean"&&(v=!0),i===!0&&u.push(c);v&&(m["data-headlessui-state"]=u.join(" "))}if(s==="template"){if(p=pe(p??[]),Object.keys(f).length>0||Object.keys(t).length>0){let[v,...u]=p??[];if(!et(v)||u.length>0)throw new Error(['Passing props on "template"!',"",`The current component <${o} /> is rendering a "template".`,"However we need to passthrough the following props:",Object.keys(f).concat(Object.keys(t)).map(d=>d.trim()).filter((d,b,h)=>h.indexOf(d)===b).sort((d,b)=>d.localeCompare(b)).map(d=>`  - ${d}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".',"Render a single element as the child so that we can forward the props onto that element."].map(d=>`  - ${d}`).join(`
`)].join(`
`));let c=me((n=v.props)!=null?n:{},f,m),i=xe(v,c,!0);for(let d in c)d.startsWith("on")&&(i.props||(i.props={}),i.props[d]=c[d]);return i}return Array.isArray(p)&&p.length===1?p[0]:p}return _e(s,Object.assign({},f,m),{default:()=>p})}function pe(e){return e.flatMap(t=>t.type===ue?pe(t.children):[t])}function me(...e){if(e.length===0)return{};if(e.length===1)return e[0];let t={},r={};for(let l of e)for(let o in l)o.startsWith("on")&&typeof l[o]=="function"?(r[o]!=null||(r[o]=[]),r[o].push(l[o])):t[o]=l[o];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(r).map(l=>[l,void 0])));for(let l in r)Object.assign(t,{[l](o,...a){let n=r[l];for(let s of n){if(o instanceof Event&&o.defaultPrevented)return;s(o,...a)}}});return t}function Ze(e,t=[]){let r=Object.assign({},e);for(let l of t)l in r&&delete r[l];return r}function et(e){return e==null?!1:typeof e.type=="string"||typeof e.type=="object"||typeof e.type=="function"}let he=Symbol("Context");var D=(e=>(e[e.Open=1]="Open",e[e.Closed=2]="Closed",e[e.Closing=4]="Closing",e[e.Opening=8]="Opening",e))(D||{});function tt(){return V(he,null)}function nt(e){se(he,e)}var y=(e=>(e.Space=" ",e.Enter="Enter",e.Escape="Escape",e.Backspace="Backspace",e.Delete="Delete",e.ArrowLeft="ArrowLeft",e.ArrowUp="ArrowUp",e.ArrowRight="ArrowRight",e.ArrowDown="ArrowDown",e.Home="Home",e.End="End",e.PageUp="PageUp",e.PageDown="PageDown",e.Tab="Tab",e))(y||{});function rt(e){throw new Error("Unexpected object: "+e)}var _=(e=>(e[e.First=0]="First",e[e.Previous=1]="Previous",e[e.Next=2]="Next",e[e.Last=3]="Last",e[e.Specific=4]="Specific",e[e.Nothing=5]="Nothing",e))(_||{});function at(e,t){let r=t.resolveItems();if(r.length<=0)return null;let l=t.resolveActiveIndex(),o=l??-1;switch(e.focus){case 0:{for(let a=0;a<r.length;++a)if(!t.resolveDisabled(r[a],a,r))return a;return l}case 1:{o===-1&&(o=r.length);for(let a=o-1;a>=0;--a)if(!t.resolveDisabled(r[a],a,r))return a;return l}case 2:{for(let a=o+1;a<r.length;++a)if(!t.resolveDisabled(r[a],a,r))return a;return l}case 3:{for(let a=r.length-1;a>=0;--a)if(!t.resolveDisabled(r[a],a,r))return a;return l}case 4:{for(let a=0;a<r.length;++a)if(t.resolveId(r[a],a,r)===e.id)return a;return l}case 5:return null;default:rt(e)}}let ne=/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;function re(e){var t,r;let l=(t=e.innerText)!=null?t:"",o=e.cloneNode(!0);if(!(o instanceof HTMLElement))return l;let a=!1;for(let s of o.querySelectorAll('[hidden],[aria-hidden],[role="img"]'))s.remove(),a=!0;let n=a?(r=o.innerText)!=null?r:"":l;return ne.test(n)&&(n=n.replace(ne,"")),n}function lt(e){let t=e.getAttribute("aria-label");if(typeof t=="string")return t.trim();let r=e.getAttribute("aria-labelledby");if(r){let l=r.split(" ").map(o=>{let a=document.getElementById(o);if(a){let n=a.getAttribute("aria-label");return typeof n=="string"?n.trim():re(a).trim()}return null}).filter(Boolean);if(l.length>0)return l.join(", ")}return re(e).trim()}function ot(e){let t=x(""),r=x("");return()=>{let l=g(e);if(!l)return"";let o=l.innerText;if(t.value===o)return r.value;let a=lt(l).trim().toLowerCase();return t.value=o,r.value=a,a}}var ut=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(ut||{}),st=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))(st||{});function it(e){requestAnimationFrame(()=>requestAnimationFrame(e))}let ge=Symbol("MenuContext");function C(e){let t=V(ge,null);if(t===null){let r=new Error(`<${e} /> is missing a parent <Menu /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,C),r}return t}let ct=P({name:"Menu",props:{as:{type:[Object,String],default:"template"}},setup(e,{slots:t,attrs:r}){let l=x(1),o=x(null),a=x(null),n=x([]),s=x(""),f=x(null),p=x(1);function m(u=c=>c){let c=f.value!==null?n.value[f.value]:null,i=ve(u(n.value.slice()),b=>g(b.dataRef.domRef)),d=c?i.indexOf(c):null;return d===-1&&(d=null),{items:i,activeItemIndex:d}}let v={menuState:l,buttonRef:o,itemsRef:a,items:n,searchQuery:s,activeItemIndex:f,activationTrigger:p,closeMenu:()=>{l.value=1,f.value=null},openMenu:()=>l.value=0,goToItem(u,c,i){let d=m(),b=at(u===_.Specific?{focus:_.Specific,id:c}:{focus:u},{resolveItems:()=>d.items,resolveActiveIndex:()=>d.activeItemIndex,resolveId:h=>h.id,resolveDisabled:h=>h.dataRef.disabled});s.value="",f.value=b,p.value=i??1,n.value=d.items},search(u){let c=s.value!==""?0:1;s.value+=u.toLowerCase();let i=(f.value!==null?n.value.slice(f.value+c).concat(n.value.slice(0,f.value+c)):n.value).find(b=>b.dataRef.textValue.startsWith(s.value)&&!b.dataRef.disabled),d=i?n.value.indexOf(i):-1;d===-1||d===f.value||(f.value=d,p.value=1)},clearSearch(){s.value=""},registerItem(u,c){let i=m(d=>[...d,{id:u,dataRef:c}]);n.value=i.items,f.value=i.activeItemIndex,p.value=1},unregisterItem(u){let c=m(i=>{let d=i.findIndex(b=>b.id===u);return d!==-1&&i.splice(d,1),i});n.value=c.items,f.value=c.activeItemIndex,p.value=1}};return Xe([o,a],(u,c)=>{var i;v.closeMenu(),Y(c,X.Loose)||(u.preventDefault(),(i=g(o))==null||i.focus())},E(()=>l.value===0)),se(ge,v),nt(E(()=>R(l.value,{0:D.Open,1:D.Closed}))),()=>{let u={open:l.value===0,close:v.closeMenu};return L({ourProps:{},theirProps:e,slot:u,slots:t,attrs:r,name:"Menu"})}}}),dt=P({name:"MenuButton",props:{disabled:{type:Boolean,default:!1},as:{type:[Object,String],default:"button"},id:{type:String,default:null}},setup(e,{attrs:t,slots:r,expose:l}){var o;let a=(o=e.id)!=null?o:`headlessui-menu-button-${W()}`,n=C("MenuButton");l({el:n.buttonRef,$el:n.buttonRef});function s(v){switch(v.key){case y.Space:case y.Enter:case y.ArrowDown:v.preventDefault(),v.stopPropagation(),n.openMenu(),$(()=>{var u;(u=g(n.itemsRef))==null||u.focus({preventScroll:!0}),n.goToItem(_.First)});break;case y.ArrowUp:v.preventDefault(),v.stopPropagation(),n.openMenu(),$(()=>{var u;(u=g(n.itemsRef))==null||u.focus({preventScroll:!0}),n.goToItem(_.Last)});break}}function f(v){switch(v.key){case y.Space:v.preventDefault();break}}function p(v){e.disabled||(n.menuState.value===0?(n.closeMenu(),$(()=>{var u;return(u=g(n.buttonRef))==null?void 0:u.focus({preventScroll:!0})})):(v.preventDefault(),n.openMenu(),it(()=>{var u;return(u=g(n.itemsRef))==null?void 0:u.focus({preventScroll:!0})})))}let m=Ye(E(()=>({as:e.as,type:t.type})),n.buttonRef);return()=>{var v;let u={open:n.menuState.value===0},{...c}=e,i={ref:n.buttonRef,id:a,type:m.value,"aria-haspopup":"menu","aria-controls":(v=g(n.itemsRef))==null?void 0:v.id,"aria-expanded":n.menuState.value===0,onKeydown:s,onKeyup:f,onClick:p};return L({ourProps:i,theirProps:c,slot:u,attrs:t,slots:r,name:"MenuButton"})}}}),ft=P({name:"MenuItems",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},id:{type:String,default:null}},setup(e,{attrs:t,slots:r,expose:l}){var o;let a=(o=e.id)!=null?o:`headlessui-menu-items-${W()}`,n=C("MenuItems"),s=x(null);l({el:n.itemsRef,$el:n.itemsRef}),Je({container:E(()=>g(n.itemsRef)),enabled:E(()=>n.menuState.value===0),accept(u){return u.getAttribute("role")==="menuitem"?NodeFilter.FILTER_REJECT:u.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(u){u.setAttribute("role","none")}});function f(u){var c;switch(s.value&&clearTimeout(s.value),u.key){case y.Space:if(n.searchQuery.value!=="")return u.preventDefault(),u.stopPropagation(),n.search(u.key);case y.Enter:if(u.preventDefault(),u.stopPropagation(),n.activeItemIndex.value!==null){let i=n.items.value[n.activeItemIndex.value];(c=g(i.dataRef.domRef))==null||c.click()}n.closeMenu(),fe(g(n.buttonRef));break;case y.ArrowDown:return u.preventDefault(),u.stopPropagation(),n.goToItem(_.Next);case y.ArrowUp:return u.preventDefault(),u.stopPropagation(),n.goToItem(_.Previous);case y.Home:case y.PageUp:return u.preventDefault(),u.stopPropagation(),n.goToItem(_.First);case y.End:case y.PageDown:return u.preventDefault(),u.stopPropagation(),n.goToItem(_.Last);case y.Escape:u.preventDefault(),u.stopPropagation(),n.closeMenu(),$(()=>{var i;return(i=g(n.buttonRef))==null?void 0:i.focus({preventScroll:!0})});break;case y.Tab:u.preventDefault(),u.stopPropagation(),n.closeMenu(),$(()=>Ue(g(n.buttonRef),u.shiftKey?U.Previous:U.Next));break;default:u.key.length===1&&(n.search(u.key),s.value=setTimeout(()=>n.clearSearch(),350));break}}function p(u){switch(u.key){case y.Space:u.preventDefault();break}}let m=tt(),v=E(()=>m!==null?(m.value&D.Open)===D.Open:n.menuState.value===0);return()=>{var u,c;let i={open:n.menuState.value===0},{...d}=e,b={"aria-activedescendant":n.activeItemIndex.value===null||(u=n.items.value[n.activeItemIndex.value])==null?void 0:u.id,"aria-labelledby":(c=g(n.buttonRef))==null?void 0:c.id,id:a,onKeydown:f,onKeyup:p,role:"menu",tabIndex:0,ref:n.itemsRef};return L({ourProps:b,theirProps:d,slot:i,attrs:t,slots:r,features:K.RenderStrategy|K.Static,visible:v.value,name:"MenuItems"})}}}),ae=P({name:"MenuItem",inheritAttrs:!1,props:{as:{type:[Object,String],default:"template"},disabled:{type:Boolean,default:!1},id:{type:String,default:null}},setup(e,{slots:t,attrs:r,expose:l}){var o;let a=(o=e.id)!=null?o:`headlessui-menu-item-${W()}`,n=C("MenuItem"),s=x(null);l({el:s,$el:s});let f=E(()=>n.activeItemIndex.value!==null?n.items.value[n.activeItemIndex.value].id===a:!1),p=ot(s),m=E(()=>({disabled:e.disabled,get textValue(){return p()},domRef:s}));oe(()=>n.registerItem(a,m)),Ie(()=>n.unregisterItem(a)),N(()=>{n.menuState.value===0&&f.value&&n.activationTrigger.value!==0&&$(()=>{var h,O;return(O=(h=g(s))==null?void 0:h.scrollIntoView)==null?void 0:O.call(h,{block:"nearest"})})});function v(h){if(e.disabled)return h.preventDefault();n.closeMenu(),fe(g(n.buttonRef))}function u(){if(e.disabled)return n.goToItem(_.Nothing);n.goToItem(_.Specific,a)}let c=ze();function i(h){c.update(h)}function d(h){c.wasMoved(h)&&(e.disabled||f.value||n.goToItem(_.Specific,a,0))}function b(h){c.wasMoved(h)&&(e.disabled||f.value&&n.goToItem(_.Nothing))}return()=>{let{disabled:h,...O}=e,be={active:f.value,disabled:h,close:n.closeMenu};return L({ourProps:{id:a,ref:s,role:"menuitem",tabIndex:h===!0?void 0:-1,"aria-disabled":h===!0?!0:void 0,onClick:v,onFocus:u,onPointerenter:i,onMouseenter:i,onPointermove:d,onMousemove:d,onPointerleave:b,onMouseleave:b},theirProps:{...r,...O},slot:be,attrs:r,slots:t,name:"MenuItem"})}}});const vt=["src"],pt={key:1,class:"h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center"},mt={class:"py-1"},ht=P({__name:"UserMenu",setup(e){const t=ie(),r=E(()=>{var o,a,n;return(((a=(o=t.user)==null?void 0:o.user_metadata)==null?void 0:a.full_name)||((n=t.user)==null?void 0:n.email)||"").split(" ").map(s=>s[0]).join("").toUpperCase().slice(0,2)});return(l,o)=>{const a=le;return S(),F(w(ct),{as:"div",class:"relative"},{default:k(()=>[I(w(dt),{class:"flex items-center space-x-2 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"},{default:k(()=>{var n,s;return[(s=(n=w(t).user)==null?void 0:n.user_metadata)!=null&&s.avatar_url?(S(),T("img",{key:0,src:w(t).user.user_metadata.avatar_url,alt:"User avatar",class:"h-8 w-8 rounded-full"},null,8,vt)):(S(),T("div",pt,ce(w(r)),1))]}),_:1}),I(Se,{"enter-active-class":"transition duration-100 ease-out","enter-from-class":"transform scale-95 opacity-0","enter-to-class":"transform scale-100 opacity-100","leave-active-class":"transition duration-75 ease-in","leave-from-class":"transform scale-100 opacity-100","leave-to-class":"transform scale-95 opacity-0"},{default:k(()=>[I(w(ft),{class:"absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"},{default:k(()=>[M("div",mt,[I(w(ae),null,{default:k(({active:n})=>[I(a,{to:"/profile",class:z([n?"bg-neutral-100 dark:bg-neutral-700":"","block px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200"])},{default:k(()=>o[1]||(o[1]=[B(" Profile Settings ")])),_:2},1032,["class"])]),_:1}),I(w(ae),null,{default:k(({active:n})=>[M("button",{onClick:o[0]||(o[0]=(...s)=>w(t).logout&&w(t).logout(...s)),class:z([n?"bg-neutral-100 dark:bg-neutral-700":"","block w-full text-left px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200"])}," Sign Out ",2)]),_:1})])]),_:1})]),_:1})]),_:1})}}}),gt={class:"bg-white dark:bg-neutral-800 shadow-lg"},bt={class:"container mx-auto px-4"},yt={class:"flex justify-between items-center h-16"},wt={class:"hidden md:flex space-x-8"},xt={class:"flex items-center space-x-4"},_t=P({__name:"NavBar",setup(e){const t=[{name:"Home Hub",path:"/home-hub"},{name:"Work Hub",path:"/work-hub"},{name:"Side Business",path:"/business-hub"}];return(r,l)=>{const o=le,a=Te,n=ht;return S(),T("nav",gt,[M("div",bt,[M("div",yt,[I(o,{to:"/dashboard",class:"text-2xl font-bold text-primary"},{default:k(()=>l[0]||(l[0]=[B(" Leyef Hub ")])),_:1}),M("div",wt,[(S(),T(ue,null,Ee(t,s=>I(o,{key:s.path,to:s.path,class:"text-neutral-600 hover:text-primary dark:text-neutral-200"},{default:k(()=>[B(ce(s.name),1)]),_:2},1032,["to"])),64))]),M("div",xt,[I(a),I(n)])])])])}}}),It={class:"min-h-screen bg-background dark:bg-neutral-900"},St={class:"container mx-auto px-4 py-8"},Mt=P({__name:"default",setup(e){const t=ie();return(r,l)=>{const o=_t;return S(),T("div",It,[w(t).isAuthenticated?(S(),F(o,{key:0})):ke("",!0),M("main",St,[Pe(r.$slots,"default")])])}}});export{Mt as default};