import{_ as ht}from"../chunks/preload-helper.41c905a7.js";import{r as Ct,i as Yt,$ as Jt,w as Qt}from"../chunks/runtime.esm.c6070bb8.js";import{S as Wt,i as Mt,s as Ft,C as Kt,a as bt,H as _t,e as j,c as Rt,D as Zt,E as Et,h as N,b as ct,F as Lt,G as te,I as ee,J as ne,g as X,d as tt,f as oe,o as ie,y as re,z as le,A as se,B as ae,v as ce}from"../chunks/index.1fa16860.js";import{s as fe}from"../chunks/popup.28cfbfc0.js";import{s as ue}from"../chunks/ProgressBar.svelte_svelte_type_style_lang.baaee050.js";const de="en";Ct("en",()=>ht(()=>import("../chunks/en.6012f25b.js"),[],import.meta.url));Ct("ja",()=>ht(()=>import("../chunks/ja.6530e4e5.js"),[],import.meta.url));Yt({fallbackLocale:de,initialLocale:window.navigator.language});const me=async()=>{Jt.set(window.navigator.language),await Qt()},Xe=Object.freeze(Object.defineProperty({__proto__:null,load:me},Symbol.toStringTag,{value:"Module"}));function J(t){return t.split("-")[1]}function gt(t){return t==="y"?"height":"width"}function B(t){return t.split("-")[0]}function Q(t){return["top","bottom"].includes(B(t))?"x":"y"}function $t(t,e,o){let{reference:n,floating:i}=t;const r=n.x+n.width/2-i.width/2,l=n.y+n.height/2-i.height/2,a=Q(e),u=gt(a),c=n[u]/2-i[u]/2,h=a==="x";let f;switch(B(e)){case"top":f={x:r,y:n.y-i.height};break;case"bottom":f={x:r,y:n.y+n.height};break;case"right":f={x:n.x+n.width,y:l};break;case"left":f={x:n.x-i.width,y:l};break;default:f={x:n.x,y:n.y}}switch(J(e)){case"start":f[a]-=c*(o&&h?-1:1);break;case"end":f[a]+=c*(o&&h?-1:1)}return f}const pe=async(t,e,o)=>{const{placement:n="bottom",strategy:i="absolute",middleware:r=[],platform:l}=o,a=r.filter(Boolean),u=await(l.isRTL==null?void 0:l.isRTL(e));let c=await l.getElementRects({reference:t,floating:e,strategy:i}),{x:h,y:f}=$t(c,n,u),m=n,s={},d=0;for(let p=0;p<a.length;p++){const{name:g,fn:w}=a[p],{x:y,y:v,data:T,reset:b}=await w({x:h,y:f,initialPlacement:n,placement:m,strategy:i,middlewareData:s,rects:c,platform:l,elements:{reference:t,floating:e}});h=y??h,f=v??f,s={...s,[g]:{...s[g],...T}},b&&d<=50&&(d++,typeof b=="object"&&(b.placement&&(m=b.placement),b.rects&&(c=b.rects===!0?await l.getElementRects({reference:t,floating:e,strategy:i}):b.rects),{x:h,y:f}=$t(c,m,u)),p=-1)}return{x:h,y:f,placement:m,strategy:i,middlewareData:s}};function K(t,e){return typeof t=="function"?t(e):t}function Ht(t){return typeof t!="number"?function(e){return{top:0,right:0,bottom:0,left:0,...e}}(t):{top:t,right:t,bottom:t,left:t}}function et(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}async function Vt(t,e){var o;e===void 0&&(e={});const{x:n,y:i,platform:r,rects:l,elements:a,strategy:u}=t,{boundary:c="clippingAncestors",rootBoundary:h="viewport",elementContext:f="floating",altBoundary:m=!1,padding:s=0}=K(e,t),d=Ht(s),p=a[m?f==="floating"?"reference":"floating":f],g=et(await r.getClippingRect({element:(o=await(r.isElement==null?void 0:r.isElement(p)))==null||o?p:p.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(a.floating)),boundary:c,rootBoundary:h,strategy:u})),w=f==="floating"?{...l.floating,x:n,y:i}:l.reference,y=await(r.getOffsetParent==null?void 0:r.getOffsetParent(a.floating)),v=await(r.isElement==null?void 0:r.isElement(y))&&await(r.getScale==null?void 0:r.getScale(y))||{x:1,y:1},T=et(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({rect:w,offsetParent:y,strategy:u}):w);return{top:(g.top-T.top+d.top)/v.y,bottom:(T.bottom-g.bottom+d.bottom)/v.y,left:(g.left-T.left+d.left)/v.x,right:(T.right-g.right+d.right)/v.x}}const ut=Math.min,he=Math.max;function dt(t,e,o){return he(t,ut(e,o))}const ge=t=>({name:"arrow",options:t,async fn(e){const{x:o,y:n,placement:i,rects:r,platform:l,elements:a}=e,{element:u,padding:c=0}=K(t,e)||{};if(u==null)return{};const h=Ht(c),f={x:o,y:n},m=Q(i),s=gt(m),d=await l.getDimensions(u),p=m==="y",g=p?"top":"left",w=p?"bottom":"right",y=p?"clientHeight":"clientWidth",v=r.reference[s]+r.reference[m]-f[m]-r.floating[s],T=f[m]-r.reference[m],b=await(l.getOffsetParent==null?void 0:l.getOffsetParent(u));let S=b?b[y]:0;S&&await(l.isElement==null?void 0:l.isElement(b))||(S=a.floating[y]||r.floating[s]);const k=v/2-T/2,D=S/2-d[s]/2-1,F=ut(h[g],D),H=ut(h[w],D),x=F,R=S-d[s]-H,_=S/2-d[s]/2+k,E=dt(x,_,R),L=J(i)!=null&&_!=E&&r.reference[s]/2-(_<x?F:H)-d[s]/2<0?_<x?x-_:R-_:0;return{[m]:f[m]-L,data:{[m]:E,centerOffset:_-E+L}}}}),we=["top","right","bottom","left"];we.reduce((t,e)=>t.concat(e,e+"-start",e+"-end"),[]);const ye={left:"right",right:"left",bottom:"top",top:"bottom"};function nt(t){return t.replace(/left|right|bottom|top/g,e=>ye[e])}function ve(t,e,o){o===void 0&&(o=!1);const n=J(t),i=Q(t),r=gt(i);let l=i==="x"?n===(o?"end":"start")?"right":"left":n==="start"?"bottom":"top";return e.reference[r]>e.floating[r]&&(l=nt(l)),{main:l,cross:nt(l)}}const xe={start:"end",end:"start"};function ft(t){return t.replace(/start|end/g,e=>xe[e])}const be=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var o;const{placement:n,middlewareData:i,rects:r,initialPlacement:l,platform:a,elements:u}=e,{mainAxis:c=!0,crossAxis:h=!0,fallbackPlacements:f,fallbackStrategy:m="bestFit",fallbackAxisSideDirection:s="none",flipAlignment:d=!0,...p}=K(t,e),g=B(n),w=B(l)===l,y=await(a.isRTL==null?void 0:a.isRTL(u.floating)),v=f||(w||!d?[nt(l)]:function(x){const R=nt(x);return[ft(x),R,ft(R)]}(l));f||s==="none"||v.push(...function(x,R,_,E){const L=J(x);let $=function(C,at,Ut){const vt=["left","right"],xt=["right","left"],Gt=["top","bottom"],Xt=["bottom","top"];switch(C){case"top":case"bottom":return Ut?at?xt:vt:at?vt:xt;case"left":case"right":return at?Gt:Xt;default:return[]}}(B(x),_==="start",E);return L&&($=$.map(C=>C+"-"+L),R&&($=$.concat($.map(ft)))),$}(l,d,s,y));const T=[l,...v],b=await Vt(e,p),S=[];let k=((o=i.flip)==null?void 0:o.overflows)||[];if(c&&S.push(b[g]),h){const{main:x,cross:R}=ve(n,r,y);S.push(b[x],b[R])}if(k=[...k,{placement:n,overflows:S}],!S.every(x=>x<=0)){var D,F;const x=(((D=i.flip)==null?void 0:D.index)||0)+1,R=T[x];if(R)return{data:{index:x,overflows:k},reset:{placement:R}};let _=(F=k.filter(E=>E.overflows[0]<=0).sort((E,L)=>E.overflows[1]-L.overflows[1])[0])==null?void 0:F.placement;if(!_)switch(m){case"bestFit":{var H;const E=(H=k.map(L=>[L.placement,L.overflows.filter($=>$>0).reduce(($,C)=>$+C,0)]).sort((L,$)=>L[1]-$[1])[0])==null?void 0:H[0];E&&(_=E);break}case"initialPlacement":_=l}if(n!==_)return{reset:{placement:_}}}return{}}}},_e=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){const{x:o,y:n}=e,i=await async function(r,l){const{placement:a,platform:u,elements:c}=r,h=await(u.isRTL==null?void 0:u.isRTL(c.floating)),f=B(a),m=J(a),s=Q(a)==="x",d=["left","top"].includes(f)?-1:1,p=h&&s?-1:1,g=K(l,r);let{mainAxis:w,crossAxis:y,alignmentAxis:v}=typeof g=="number"?{mainAxis:g,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...g};return m&&typeof v=="number"&&(y=m==="end"?-1*v:v),s?{x:y*p,y:w*d}:{x:w*d,y:y*p}}(e,t);return{x:o+i.x,y:n+i.y,data:i}}}};function Re(t){return t==="x"?"y":"x"}const Ee=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:n,placement:i}=e,{mainAxis:r=!0,crossAxis:l=!1,limiter:a={fn:g=>{let{x:w,y}=g;return{x:w,y}}},...u}=K(t,e),c={x:o,y:n},h=await Vt(e,u),f=Q(B(i)),m=Re(f);let s=c[f],d=c[m];if(r){const g=f==="y"?"bottom":"right";s=dt(s+h[f==="y"?"top":"left"],s,s-h[g])}if(l){const g=m==="y"?"bottom":"right";d=dt(d+h[m==="y"?"top":"left"],d,d-h[g])}const p=a.fn({...e,[f]:s,[m]:d});return{...p,data:{x:p.x-o,y:p.y-n}}}}};function A(t){var e;return((e=t.ownerDocument)==null?void 0:e.defaultView)||window}function P(t){return A(t).getComputedStyle(t)}function Bt(t){return t instanceof A(t).Node}function V(t){return Bt(t)?(t.nodeName||"").toLowerCase():"#document"}function O(t){return t instanceof A(t).HTMLElement}function W(t){return t instanceof A(t).Element}function Tt(t){return typeof ShadowRoot<"u"&&(t instanceof A(t).ShadowRoot||t instanceof ShadowRoot)}function Y(t){const{overflow:e,overflowX:o,overflowY:n,display:i}=P(t);return/auto|scroll|overlay|hidden|clip/.test(e+n+o)&&!["inline","contents"].includes(i)}function Le(t){return["table","td","th"].includes(V(t))}function mt(t){const e=wt(),o=P(t);return o.transform!=="none"||o.perspective!=="none"||!!o.containerType&&o.containerType!=="normal"||!e&&!!o.backdropFilter&&o.backdropFilter!=="none"||!e&&!!o.filter&&o.filter!=="none"||["transform","perspective","filter"].some(n=>(o.willChange||"").includes(n))||["paint","layout","strict","content"].some(n=>(o.contain||"").includes(n))}function wt(){return!(typeof CSS>"u"||!CSS.supports)&&CSS.supports("-webkit-backdrop-filter","none")}function lt(t){return["html","body","#document"].includes(V(t))}const pt=Math.min,q=Math.max,ot=Math.round,Z=Math.floor,z=t=>({x:t,y:t});function zt(t){const e=P(t);let o=parseFloat(e.width)||0,n=parseFloat(e.height)||0;const i=O(t),r=i?t.offsetWidth:o,l=i?t.offsetHeight:n,a=ot(o)!==r||ot(n)!==l;return a&&(o=r,n=l),{width:o,height:n,$:a}}function yt(t){return W(t)?t:t.contextElement}function U(t){const e=yt(t);if(!O(e))return z(1);const o=e.getBoundingClientRect(),{width:n,height:i,$:r}=zt(e);let l=(r?ot(o.width):o.width)/n,a=(r?ot(o.height):o.height)/i;return l&&Number.isFinite(l)||(l=1),a&&Number.isFinite(a)||(a=1),{x:l,y:a}}const St=z(0);function It(t,e,o){var n,i;if(e===void 0&&(e=!0),!wt())return St;const r=t?A(t):window;return!o||e&&o!==r?St:{x:((n=r.visualViewport)==null?void 0:n.offsetLeft)||0,y:((i=r.visualViewport)==null?void 0:i.offsetTop)||0}}function I(t,e,o,n){e===void 0&&(e=!1),o===void 0&&(o=!1);const i=t.getBoundingClientRect(),r=yt(t);let l=z(1);e&&(n?W(n)&&(l=U(n)):l=U(t));const a=It(r,o,n);let u=(i.left+a.x)/l.x,c=(i.top+a.y)/l.y,h=i.width/l.x,f=i.height/l.y;if(r){const m=A(r),s=n&&W(n)?A(n):n;let d=m.frameElement;for(;d&&n&&s!==m;){const p=U(d),g=d.getBoundingClientRect(),w=getComputedStyle(d),y=g.left+(d.clientLeft+parseFloat(w.paddingLeft))*p.x,v=g.top+(d.clientTop+parseFloat(w.paddingTop))*p.y;u*=p.x,c*=p.y,h*=p.x,f*=p.y,u+=y,c+=v,d=A(d).frameElement}}return et({width:h,height:f,x:u,y:c})}function M(t){return((Bt(t)?t.ownerDocument:t.document)||window.document).documentElement}function st(t){return W(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function jt(t){return I(M(t)).left+st(t).scrollLeft}function G(t){if(V(t)==="html")return t;const e=t.assignedSlot||t.parentNode||Tt(t)&&t.host||M(t);return Tt(e)?e.host:e}function Nt(t){const e=G(t);return lt(e)?t.ownerDocument?t.ownerDocument.body:t.body:O(e)&&Y(e)?e:Nt(e)}function it(t,e){var o;e===void 0&&(e=[]);const n=Nt(t),i=n===((o=t.ownerDocument)==null?void 0:o.body),r=A(n);return i?e.concat(r,r.visualViewport||[],Y(n)?n:[]):e.concat(n,it(n))}function At(t,e,o){let n;if(e==="viewport")n=function(i,r){const l=A(i),a=M(i),u=l.visualViewport;let c=a.clientWidth,h=a.clientHeight,f=0,m=0;if(u){c=u.width,h=u.height;const s=wt();(!s||s&&r==="fixed")&&(f=u.offsetLeft,m=u.offsetTop)}return{width:c,height:h,x:f,y:m}}(t,o);else if(e==="document")n=function(i){const r=M(i),l=st(i),a=i.ownerDocument.body,u=q(r.scrollWidth,r.clientWidth,a.scrollWidth,a.clientWidth),c=q(r.scrollHeight,r.clientHeight,a.scrollHeight,a.clientHeight);let h=-l.scrollLeft+jt(i);const f=-l.scrollTop;return P(a).direction==="rtl"&&(h+=q(r.clientWidth,a.clientWidth)-u),{width:u,height:c,x:h,y:f}}(M(t));else if(W(e))n=function(i,r){const l=I(i,!0,r==="fixed"),a=l.top+i.clientTop,u=l.left+i.clientLeft,c=O(i)?U(i):z(1);return{width:i.clientWidth*c.x,height:i.clientHeight*c.y,x:u*c.x,y:a*c.y}}(e,o);else{const i=It(t);n={...e,x:e.x-i.x,y:e.y-i.y}}return et(n)}function qt(t,e){const o=G(t);return!(o===e||!W(o)||lt(o))&&(P(o).position==="fixed"||qt(o,e))}function kt(t,e){return O(t)&&P(t).position!=="fixed"?e?e(t):t.offsetParent:null}function Pt(t,e){const o=A(t);if(!O(t))return o;let n=kt(t,e);for(;n&&Le(n)&&P(n).position==="static";)n=kt(n,e);return n&&(V(n)==="html"||V(n)==="body"&&P(n).position==="static"&&!mt(n))?o:n||function(i){let r=G(i);for(;O(r)&&!lt(r);){if(mt(r))return r;r=G(r)}return null}(t)||o}function $e(t,e,o){const n=O(e),i=M(e),r=o==="fixed",l=I(t,!0,r,e);let a={scrollLeft:0,scrollTop:0};const u=z(0);if(n||!n&&!r)if((V(e)!=="body"||Y(i))&&(a=st(e)),O(e)){const c=I(e,!0,r,e);u.x=c.x+e.clientLeft,u.y=c.y+e.clientTop}else i&&(u.x=jt(i));return{x:l.left+a.scrollLeft-u.x,y:l.top+a.scrollTop-u.y,width:l.width,height:l.height}}const Te={getClippingRect:function(t){let{element:e,boundary:o,rootBoundary:n,strategy:i}=t;const r=o==="clippingAncestors"?function(c,h){const f=h.get(c);if(f)return f;let m=it(c).filter(g=>W(g)&&V(g)!=="body"),s=null;const d=P(c).position==="fixed";let p=d?G(c):c;for(;W(p)&&!lt(p);){const g=P(p),w=mt(p);w||g.position!=="fixed"||(s=null),(d?!w&&!s:!w&&g.position==="static"&&s&&["absolute","fixed"].includes(s.position)||Y(p)&&!w&&qt(c,p))?m=m.filter(y=>y!==p):s=g,p=G(p)}return h.set(c,m),m}(e,this._c):[].concat(o),l=[...r,n],a=l[0],u=l.reduce((c,h)=>{const f=At(e,h,i);return c.top=q(f.top,c.top),c.right=pt(f.right,c.right),c.bottom=pt(f.bottom,c.bottom),c.left=q(f.left,c.left),c},At(e,a,i));return{width:u.right-u.left,height:u.bottom-u.top,x:u.left,y:u.top}},convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{rect:e,offsetParent:o,strategy:n}=t;const i=O(o),r=M(o);if(o===r)return e;let l={scrollLeft:0,scrollTop:0},a=z(1);const u=z(0);if((i||!i&&n!=="fixed")&&((V(o)!=="body"||Y(r))&&(l=st(o)),O(o))){const c=I(o);a=U(o),u.x=c.x+o.clientLeft,u.y=c.y+o.clientTop}return{width:e.width*a.x,height:e.height*a.y,x:e.x*a.x-l.scrollLeft*a.x+u.x,y:e.y*a.y-l.scrollTop*a.y+u.y}},isElement:W,getDimensions:function(t){return zt(t)},getOffsetParent:Pt,getDocumentElement:M,getScale:U,async getElementRects(t){let{reference:e,floating:o,strategy:n}=t;const i=this.getOffsetParent||Pt,r=this.getDimensions;return{reference:$e(e,await i(o),n),floating:{x:0,y:0,...await r(o)}}},getClientRects:t=>Array.from(t.getClientRects()),isRTL:t=>P(t).direction==="rtl"};function Se(t,e,o,n){n===void 0&&(n={});const{ancestorScroll:i=!0,ancestorResize:r=!0,elementResize:l=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:u=!1}=n,c=yt(t),h=i||r?[...c?it(c):[],...it(e)]:[];h.forEach(g=>{i&&g.addEventListener("scroll",o,{passive:!0}),r&&g.addEventListener("resize",o)});const f=c&&a?function(g,w){let y,v=null;const T=M(g);function b(){clearTimeout(y),v&&v.disconnect(),v=null}return function S(k,D){k===void 0&&(k=!1),D===void 0&&(D=1),b();const{left:F,top:H,width:x,height:R}=g.getBoundingClientRect();if(k||w(),!x||!R)return;const _={rootMargin:-Z(H)+"px "+-Z(T.clientWidth-(F+x))+"px "+-Z(T.clientHeight-(H+R))+"px "+-Z(F)+"px",threshold:q(0,pt(1,D))||1};let E=!0;function L($){const C=$[0].intersectionRatio;if(C!==D){if(!E)return S();C?S(!1,C):y=setTimeout(()=>{S(!1,1e-7)},100)}E=!1}try{v=new IntersectionObserver(L,{..._,root:T.ownerDocument})}catch{v=new IntersectionObserver(L,_)}v.observe(g)}(!0),b}(c,o):null;let m,s=-1,d=null;l&&(d=new ResizeObserver(g=>{let[w]=g;w&&w.target===c&&d&&(d.unobserve(e),cancelAnimationFrame(s),s=requestAnimationFrame(()=>{d&&d.observe(e)})),o()}),c&&!u&&d.observe(c),d.observe(e));let p=u?I(t):null;return u&&function g(){const w=I(t);!p||w.x===p.x&&w.y===p.y&&w.width===p.width&&w.height===p.height||o(),p=w,m=requestAnimationFrame(g)}(),o(),()=>{h.forEach(g=>{i&&g.removeEventListener("scroll",o),r&&g.removeEventListener("resize",o)}),f&&f(),d&&d.disconnect(),d=null,u&&cancelAnimationFrame(m)}}const Ae=(t,e,o)=>{const n=new Map,i={platform:Te,...o},r={...i.platform,_c:n};return pe(t,e,{...i,platform:r})};function ke(t={}){const{immediate:e=!1,onNeedRefresh:o,onOfflineReady:n,onRegistered:i,onRegisteredSW:r,onRegisterError:l}=t;let a,u,c;const h=async(m=!0)=>{await u,await(c==null?void 0:c())};async function f(){if("serviceWorker"in navigator){const{Workbox:m}=await ht(()=>import("../chunks/workbox-window.prod.es5.a7b12eab.js"),[],import.meta.url);a=new m("./sw.js",{scope:"./",type:"classic"}),c=async()=>{await(a==null?void 0:a.messageSkipWaiting())};{let s=!1;const d=()=>{s=!0,a==null||a.addEventListener("controlling",p=>{p.isUpdate&&window.location.reload()}),o==null||o()};a.addEventListener("installed",p=>{typeof p.isUpdate>"u"?typeof p.isExternal<"u"?p.isExternal?d():!s&&(n==null||n()):p.isExternal?window.location.reload():!s&&(n==null||n()):p.isUpdate||n==null||n()}),a.addEventListener("waiting",d),a.addEventListener("externalwaiting",d)}a.register({immediate:e}).then(s=>{r?r("./sw.js",s):i==null||i(s)}).catch(s=>{l==null||l(s)})}}return u=f(),h}function Pe(t){return ke({immediate:!0}),[]}class Oe extends Wt{constructor(e){super(),Mt(this,e,Pe,null,Ft,{})}}const rt={pwaInDevEnvironment:!1,webManifest:{href:"./manifest.webmanifest",useCredentials:!0,linkTag:'<link rel="manifest" href="./manifest.webmanifest" crossorigin="use-credentials">'}};var De="@vercel/analytics",Ce="1.0.1",We=()=>{window.va||(window.va=function(...e){(window.vaq=window.vaq||[]).push(e)})};function Me(){return typeof window<"u"}function Fe(){try{const t="production"}catch{}return"production"}function He(t="auto"){if(t==="auto"){window.vam=Fe();return}window.vam=t}function Ve(){return window.vam||"production"}function Ot(){return Ve()==="development"}function Be(t={debug:!0}){var e;if(!Me())return;He(t.mode),We(),t.beforeSend&&((e=window.va)==null||e.call(window,"beforeSend",t.beforeSend));const o=Ot()?"https://va.vercel-scripts.com/v1/script.debug.js":"/_vercel/insights/script.js";if(document.head.querySelector(`script[src*="${o}"]`))return;const n=document.createElement("script");n.src=o,n.defer=!0,n.setAttribute("data-sdkn",De),n.setAttribute("data-sdkv",Ce),Ot()&&t.debug===!1&&n.setAttribute("data-debug","false"),document.head.appendChild(n)}function Dt(t){let e,o;return e=new Oe({}),{c(){re(e.$$.fragment)},l(n){le(e.$$.fragment,n)},m(n,i){se(e,n,i),o=!0},i(n){o||(X(e.$$.fragment,n),o=!0)},o(n){tt(e.$$.fragment,n),o=!1},d(n){ae(e,n)}}}function ze(t){let e,o,n,i,r=`<script>(${ue.toString()})();<\/script>`,l,a,u,c;const h=t[3].default,f=Kt(h,t,t[2],null);let m=t[0]&&rt&&Dt();return{c(){f&&f.c(),e=bt(),o=new _t(!1),n=j(),i=new _t(!1),l=j(),a=bt(),m&&m.c(),u=j(),this.h()},l(s){f&&f.l(s),e=Rt(s);const d=Zt("svelte-1cn90uz",document.head);o=Et(d,!1),n=j(),i=Et(d,!1),l=j(),d.forEach(N),a=Rt(s),m&&m.l(s),u=j(),this.h()},h(){o.a=n,i.a=l},m(s,d){f&&f.m(s,d),ct(s,e,d),o.m(t[1],document.head),Lt(document.head,n),i.m(r,document.head),Lt(document.head,l),ct(s,a,d),m&&m.m(s,d),ct(s,u,d),c=!0},p(s,[d]){f&&f.p&&(!c||d&4)&&te(f,h,s,s[2],c?ne(h,s[2],d,null):ee(s[2]),null),(!c||d&2)&&o.p(s[1]),s[0]&&rt?m?d&1&&X(m,1):(m=Dt(),m.c(),X(m,1),m.m(u.parentNode,u)):m&&(ce(),tt(m,1,1,()=>{m=null}),oe())},i(s){c||(X(f,s),X(m),c=!0)},o(s){tt(f,s),tt(m),c=!1},d(s){f&&f.d(s),s&&N(e),N(n),s&&o.d(),N(l),s&&i.d(),s&&N(a),m&&m.d(s),s&&N(u)}}}function Ie(t,e,o){let n,{$$slots:i={},$$scope:r}=e;fe.set({computePosition:Ae,autoUpdate:Se,offset:_e,shift:Ee,flip:be,arrow:ge}),Be({mode:"production"});let l=!1;return ie(()=>{o(0,l=!0)}),t.$$set=a=>{"$$scope"in a&&o(2,r=a.$$scope)},o(1,n=rt?rt.webManifest.linkTag:""),[l,n,r,i]}class Ye extends Wt{constructor(e){super(),Mt(this,e,Ie,ze,Ft,{})}}export{Ye as component,Xe as universal};
