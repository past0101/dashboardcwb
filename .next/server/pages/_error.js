"use strict";(()=>{var e={};e.id=731,e.ids=[220,636,731],e.modules={237:(e,t)=>{Object.defineProperty(t,"A",{enumerable:!0,get:function(){return r}});var r=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},361:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},609:(e,t)=>{function r(e){let{ampFirst:t=!1,hybrid:r=!1,hasQuery:n=!1}=void 0===e?{}:e;return t||r&&n}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return r}})},1025:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"warnOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},1145:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),!function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return g},defaultHead:function(){return c}});let n=r(7020),o=r(3147),a=r(8732),i=o._(r(2015)),l=n._(r(8160)),u=r(7043),s=r(1523),d=r(609);function c(e){void 0===e&&(e=!1);let t=[(0,a.jsx)("meta",{charSet:"utf-8"},"charset")];return e||t.push((0,a.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")),t}function p(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===i.default.Fragment?e.concat(i.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}r(1025);let f=["name","httpEquiv","charSet","itemProp"];function h(e,t){let{inAmpMode:r}=t;return e.reduce(p,[]).reverse().concat(c(r).reverse()).filter(function(){let e=new Set,t=new Set,r=new Set,n={};return o=>{let a=!0,i=!1;if(o.key&&"number"!=typeof o.key&&o.key.indexOf("$")>0){i=!0;let t=o.key.slice(o.key.indexOf("$")+1);e.has(t)?a=!1:e.add(t)}switch(o.type){case"title":case"base":t.has(o.type)?a=!1:t.add(o.type);break;case"meta":for(let e=0,t=f.length;e<t;e++){let t=f[e];if(o.props.hasOwnProperty(t)){if("charSet"===t)r.has(t)?a=!1:r.add(t);else{let e=o.props[t],r=n[t]||new Set;("name"!==t||!i)&&r.has(e)?a=!1:(r.add(e),n[t]=r)}}}}return a}}()).reverse().map((e,t)=>{let n=e.key||t;if(process.env.__NEXT_OPTIMIZE_FONTS&&!r&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(t=>e.props.href.startsWith(t))){let t={...e.props||{}};return t["data-href"]=t.href,t.href=void 0,t["data-optimized-fonts"]=!0,i.default.cloneElement(e,t)}return i.default.cloneElement(e,{key:n})})}let g=function(e){let{children:t}=e,r=(0,i.useContext)(u.AmpStateContext),n=(0,i.useContext)(s.HeadManagerContext);return(0,a.jsx)(l.default,{reduceComponentsToState:h,headManager:n,inAmpMode:(0,d.isInAmpMode)(r),children:t})};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1413:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},1523:(e,t,r)=>{e.exports=r(3885).vendored.contexts.HeadManagerContext},2015:e=>{e.exports=require("react")},3147:(e,t)=>{function r(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(r=function(e){return e?n:t})(e)}t._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=r(t);if(n&&n.has(e))return n.get(e);var o={__proto__:null},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if("default"!==i&&Object.prototype.hasOwnProperty.call(e,i)){var l=a?Object.getOwnPropertyDescriptor(e,i):null;l&&(l.get||l.set)?Object.defineProperty(o,i,l):o[i]=e[i]}return o.default=e,n&&n.set(e,o),o}},3873:e=>{e.exports=require("path")},5124:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),!function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{NEXT_REQUEST_META:function(){return r},addRequestMeta:function(){return a},getRequestMeta:function(){return n},removeRequestMeta:function(){return i},setRequestMeta:function(){return o}});let r=Symbol.for("NextInternalRequestMeta");function n(e,t){let n=e[r]||{};return"string"==typeof t?n[t]:n}function o(e,t){return e[r]=t,t}function a(e,t,r){let a=n(e);return a[t]=r,o(e,a)}function i(e,t){let r=n(e);return delete r[t],o(e,r)}},5379:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return d}});let n=r(7020),o=r(8732),a=n._(r(2015)),i=n._(r(1145)),l={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function u(e){let t,{req:n,res:o,err:a}=e,i=o&&o.statusCode?o.statusCode:a?a.statusCode:404;if(n){let{getRequestMeta:e}=r(5124),o=e(n,"initURL");o&&(t=new URL(o).hostname)}return{statusCode:i,hostname:t}}let s={error:{fontFamily:'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{lineHeight:"48px"},h1:{display:"inline-block",margin:"0 20px 0 0",paddingRight:23,fontSize:24,fontWeight:500,verticalAlign:"top"},h2:{fontSize:14,fontWeight:400,lineHeight:"28px"},wrap:{display:"inline-block"}};class d extends a.default.Component{render(){let{statusCode:e,withDarkMode:t=!0}=this.props,r=this.props.title||l[e]||"An unexpected error has occurred";return(0,o.jsxs)("div",{style:s.error,children:[(0,o.jsx)(i.default,{children:(0,o.jsx)("title",{children:e?e+": "+r:"Application error: a client-side exception has occurred"})}),(0,o.jsxs)("div",{style:s.desc,children:[(0,o.jsx)("style",{dangerouslySetInnerHTML:{__html:"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}"+(t?"@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}":"")}}),e?(0,o.jsx)("h1",{className:"next-error-h1",style:s.h1,children:e}):null,(0,o.jsx)("div",{style:s.wrap,children:(0,o.jsxs)("h2",{style:s.h2,children:[this.props.title||e?r:(0,o.jsxs)(o.Fragment,{children:["Application error: a client-side exception has occurred"," ",!!this.props.hostname&&(0,o.jsxs)(o.Fragment,{children:["while loading ",this.props.hostname]})," ","(see the browser console for more information)"]}),"."]})})]})]})}}d.displayName="ErrorPage",d.getInitialProps=u,d.origGetInitialProps=u,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7043:(e,t,r)=>{e.exports=r(3885).vendored.contexts.AmpContext},8160:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return i}});let n=r(2015),o=()=>{},a=()=>{};function i(e){var t;let{headManager:r,reduceComponentsToState:i}=e;function l(){if(r&&r.mountedInstances){let t=n.Children.toArray(Array.from(r.mountedInstances).filter(Boolean));r.updateHead(i(t,e))}}return null==r||null==(t=r.mountedInstances)||t.add(e.children),l(),o(()=>{var t;return null==r||null==(t=r.mountedInstances)||t.add(e.children),()=>{var t;null==r||null==(t=r.mountedInstances)||t.delete(e.children)}}),o(()=>(r&&(r._pendingUpdate=l),()=>{r&&(r._pendingUpdate=l)})),a(()=>(r&&r._pendingUpdate&&(r._pendingUpdate(),r._pendingUpdate=null),()=>{r&&r._pendingUpdate&&(r._pendingUpdate(),r._pendingUpdate=null)})),null}},8732:e=>{e.exports=require("react/jsx-runtime")},9875:(e,t,r)=>{r.r(t),r.d(t,{config:()=>h,default:()=>d,getServerSideProps:()=>f,getStaticPaths:()=>p,getStaticProps:()=>c,reportWebVitals:()=>g,routeModule:()=>v,unstable_getServerProps:()=>_,unstable_getServerSideProps:()=>P,unstable_getStaticParams:()=>b,unstable_getStaticPaths:()=>y,unstable_getStaticProps:()=>m});var n=r(3885),o=r(237),a=r(1413),i=r(9616),l=r.n(i),u=r(2386),s=r(5379);let d=(0,a.M)(s,"default"),c=(0,a.M)(s,"getStaticProps"),p=(0,a.M)(s,"getStaticPaths"),f=(0,a.M)(s,"getServerSideProps"),h=(0,a.M)(s,"config"),g=(0,a.M)(s,"reportWebVitals"),m=(0,a.M)(s,"unstable_getStaticProps"),y=(0,a.M)(s,"unstable_getStaticPaths"),b=(0,a.M)(s,"unstable_getStaticParams"),_=(0,a.M)(s,"unstable_getServerProps"),P=(0,a.M)(s,"unstable_getServerSideProps"),v=new n.PagesRouteModule({definition:{kind:o.A.PAGES,page:"/_error",pathname:"/_error",bundlePath:"",filename:""},components:{App:u.default,Document:l()},userland:s})}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[616,386],()=>r(9875));module.exports=n})();