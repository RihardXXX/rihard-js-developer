import{_ as nu}from"./BXJCzdpb.js";import{_ as ru,a as au}from"./AyHFVIfz.js";import{e as Cr,f as qr,g as iu,h as ou,i as uu,j as su,o as wt,c as jt,a as me,t as He,k as le,F as or,r as gr,l as Xa,v as Va,m as Ha,n as cu,p as Ga,q as vn,_ as lu,s as Aa,d as ga,x as ma,y as fu,u as pu,w as kr,b as Fr,z as hu,A as du}from"./CoQsHFll.js";import{_ as Ur}from"./DlAUqK2U.js";function $a(n,t){(t==null||t>n.length)&&(t=n.length);for(var e=0,r=Array(t);e<t;e++)r[e]=n[e];return r}function yu(n){if(Array.isArray(n))return n}function gu(n,t,e){return(t=Au(t))in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function mu(n,t){var e=n==null?null:typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(e!=null){var r,a,i,u,o=[],S=!0,I=!1;try{if(i=(e=e.call(n)).next,t!==0)for(;!(S=(r=i.call(e)).done)&&(o.push(r.value),o.length!==t);S=!0);}catch(te){I=!0,a=te}finally{try{if(!S&&e.return!=null&&(u=e.return(),Object(u)!==u))return}finally{if(I)throw a}}return o}}function vu(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ka(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(n,a).enumerable})),e.push.apply(e,r)}return e}function Ya(n){for(var t=1;t<arguments.length;t++){var e=arguments[t]!=null?arguments[t]:{};t%2?Ka(Object(e),!0).forEach(function(r){gu(n,r,e[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):Ka(Object(e)).forEach(function(r){Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(e,r))})}return n}function bu(n,t){if(n==null)return{};var e,r,a=wu(n,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);for(r=0;r<i.length;r++)e=i[r],t.indexOf(e)===-1&&{}.propertyIsEnumerable.call(n,e)&&(a[e]=n[e])}return a}function wu(n,t){if(n==null)return{};var e={};for(var r in n)if({}.hasOwnProperty.call(n,r)){if(t.indexOf(r)!==-1)continue;e[r]=n[r]}return e}function _u(n,t){return yu(n)||mu(n,t)||Eu(n,t)||vu()}function Su(n,t){if(typeof n!="object"||!n)return n;var e=n[Symbol.toPrimitive];if(e!==void 0){var r=e.call(n,t);if(typeof r!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(n)}function Au(n){var t=Su(n,"string");return typeof t=="symbol"?t:t+""}function Eu(n,t){if(n){if(typeof n=="string")return $a(n,t);var e={}.toString.call(n).slice(8,-1);return e==="Object"&&n.constructor&&(e=n.constructor.name),e==="Map"||e==="Set"?Array.from(n):e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?$a(n,t):void 0}}function Nu(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function Qa(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(n,a).enumerable})),e.push.apply(e,r)}return e}function Za(n){for(var t=1;t<arguments.length;t++){var e=arguments[t]!=null?arguments[t]:{};t%2?Qa(Object(e),!0).forEach(function(r){Nu(n,r,e[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):Qa(Object(e)).forEach(function(r){Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(e,r))})}return n}function Ou(){for(var n=arguments.length,t=new Array(n),e=0;e<n;e++)t[e]=arguments[e];return function(r){return t.reduceRight(function(a,i){return i(a)},r)}}function dr(n){return function t(){for(var e=this,r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return a.length>=n.length?n.apply(this,a):function(){for(var u=arguments.length,o=new Array(u),S=0;S<u;S++)o[S]=arguments[S];return t.apply(e,[].concat(a,o))}}}function Br(n){return{}.toString.call(n).includes("Object")}function xu(n){return!Object.keys(n).length}function mr(n){return typeof n=="function"}function Ru(n,t){return Object.prototype.hasOwnProperty.call(n,t)}function Tu(n,t){return Br(t)||Jn("changeType"),Object.keys(t).some(function(e){return!Ru(n,e)})&&Jn("changeField"),t}function Mu(n){mr(n)||Jn("selectorType")}function Iu(n){mr(n)||Br(n)||Jn("handlerType"),Br(n)&&Object.values(n).some(function(t){return!mr(t)})&&Jn("handlersType")}function ku(n){n||Jn("initialIsRequired"),Br(n)||Jn("initialType"),xu(n)&&Jn("initialContent")}function Fu(n,t){throw new Error(n[t]||n.default)}var ju={initialIsRequired:"initial state is required",initialType:"initial state should be an object",initialContent:"initial state shouldn't be an empty object",handlerType:"handler should be an object or a function",handlersType:"all handlers should be a functions",selectorType:"selector should be a function",changeType:"provided value of changes should be an object",changeField:'it seams you want to change a field in the state which is not specified in the "initial" state',default:"an unknown error accured in `state-local` package"},Jn=dr(Fu)(ju),jr={changes:Tu,selector:Mu,handler:Iu,initial:ku};function Bu(n){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};jr.initial(n),jr.handler(t);var e={current:n},r=dr(Cu)(e,t),a=dr(Pu)(e),i=dr(jr.changes)(n),u=dr(Lu)(e);function o(){var I=arguments.length>0&&arguments[0]!==void 0?arguments[0]:function(te){return te};return jr.selector(I),I(e.current)}function S(I){Ou(r,a,i,u)(I)}return[o,S]}function Lu(n,t){return mr(t)?t(n.current):t}function Pu(n,t){return n.current=Za(Za({},n.current),t),t}function Cu(n,t,e){return mr(t)?t(n.current):Object.keys(e).forEach(function(r){var a;return(a=t[r])===null||a===void 0?void 0:a.call(t,n.current[r])}),e}var qu={create:Bu},Uu={paths:{vs:"https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs"}};function Du(n){return function t(){for(var e=this,r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return a.length>=n.length?n.apply(this,a):function(){for(var u=arguments.length,o=new Array(u),S=0;S<u;S++)o[S]=arguments[S];return t.apply(e,[].concat(a,o))}}}function Wu(n){return{}.toString.call(n).includes("Object")}function zu(n){return n||ei("configIsRequired"),Wu(n)||ei("configType"),n.urls?(Ju(),{paths:{vs:n.urls.monacoBase}}):n}function Ju(){console.warn(Ai.deprecation)}function Xu(n,t){throw new Error(n[t]||n.default)}var Ai={configIsRequired:"the configuration object is required",configType:"the configuration object should be an object",default:"an unknown error accured in `@monaco-editor/loader` package",deprecation:`Deprecation warning!
    You are using deprecated way of configuration.

    Instead of using
      monaco.config({ urls: { monacoBase: '...' } })
    use
      monaco.config({ paths: { vs: '...' } })

    For more please check the link https://github.com/suren-atoyan/monaco-loader#config
  `},ei=Du(Xu)(Ai),Vu={config:zu},Hu=function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(a){return e.reduceRight(function(i,u){return u(i)},a)}};function Ei(n,t){return Object.keys(t).forEach(function(e){t[e]instanceof Object&&n[e]&&Object.assign(t[e],Ei(n[e],t[e]))}),Ya(Ya({},n),t)}var Gu={type:"cancelation",msg:"operation is manually canceled"};function na(n){var t=!1,e=new Promise(function(r,a){n.then(function(i){return t?a(Gu):r(i)}),n.catch(a)});return e.cancel=function(){return t=!0},e}var $u=["monaco"],Ku=qu.create({config:Uu,isInitialized:!1,resolve:null,reject:null,monaco:null}),Ni=_u(Ku,2),vr=Ni[0],Dr=Ni[1];function Yu(n){var t=Vu.config(n),e=t.monaco,r=bu(t,$u);Dr(function(a){return{config:Ei(a.config,r),monaco:e}})}function Qu(){var n=vr(function(t){var e=t.monaco,r=t.isInitialized,a=t.resolve;return{monaco:e,isInitialized:r,resolve:a}});if(!n.isInitialized){if(Dr({isInitialized:!0}),n.monaco)return n.resolve(n.monaco),na(ra);if(window.monaco&&window.monaco.editor)return Oi(window.monaco),n.resolve(window.monaco),na(ra);Hu(Zu,ts)(ns)}return na(ra)}function Zu(n){return document.body.appendChild(n)}function es(n){var t=document.createElement("script");return n&&(t.src=n),t}function ts(n){var t=vr(function(r){var a=r.config,i=r.reject;return{config:a,reject:i}}),e=es("".concat(t.config.paths.vs,"/loader.js"));return e.onload=function(){return n()},e.onerror=t.reject,e}function ns(){var n=vr(function(e){var r=e.config,a=e.resolve,i=e.reject;return{config:r,resolve:a,reject:i}}),t=window.require;t.config(n.config),t(["vs/editor/editor.main"],function(e){var r=e.m||e;Oi(r),n.resolve(r)},function(e){n.reject(e)})}function Oi(n){vr().monaco||Dr({monaco:n})}function rs(){return vr(function(n){var t=n.monaco;return t})}var ra=new Promise(function(n,t){return Dr({resolve:n,reject:t})}),as={config:Yu,init:Qu,__getMonacoInstance:rs},is=function(){return!1},os=function(){return!0};const us={"@@functional/placeholder":!0};function ze(n){return n!=null&&typeof n=="object"&&n["@@functional/placeholder"]===!0}function W(n){return function t(e){return arguments.length===0||ze(e)?t:n.apply(this,arguments)}}function v(n){return function t(e,r){switch(arguments.length){case 0:return t;case 1:return ze(e)?t:W(function(a){return n(e,a)});default:return ze(e)&&ze(r)?t:ze(e)?W(function(a){return n(a,r)}):ze(r)?W(function(a){return n(e,a)}):n(e,r)}}}var Wr=v(function(t,e){return Number(t)+Number(e)});function Yt(n,t){n=n||[],t=t||[];var e,r=n.length,a=t.length,i=[];for(e=0;e<r;)i[i.length]=n[e],e+=1;for(e=0;e<a;)i[i.length]=t[e],e+=1;return i}function _n(n,t){switch(n){case 0:return function(){return t.apply(this,arguments)};case 1:return function(e){return t.apply(this,arguments)};case 2:return function(e,r){return t.apply(this,arguments)};case 3:return function(e,r,a){return t.apply(this,arguments)};case 4:return function(e,r,a,i){return t.apply(this,arguments)};case 5:return function(e,r,a,i,u){return t.apply(this,arguments)};case 6:return function(e,r,a,i,u,o){return t.apply(this,arguments)};case 7:return function(e,r,a,i,u,o,S){return t.apply(this,arguments)};case 8:return function(e,r,a,i,u,o,S,I){return t.apply(this,arguments)};case 9:return function(e,r,a,i,u,o,S,I,te){return t.apply(this,arguments)};case 10:return function(e,r,a,i,u,o,S,I,te,G){return t.apply(this,arguments)};default:throw new Error("First argument to _arity must be a non-negative integer no greater than ten")}}function fr(n,t,e){return function(){for(var r=[],a=0,i=n,u=0,o=!1;u<t.length||a<arguments.length;){var S;u<t.length&&(!ze(t[u])||a>=arguments.length)?S=t[u]:(S=arguments[a],a+=1),r[u]=S,ze(S)?o=!0:i-=1,u+=1}return!o&&i<=0?e.apply(this,r):_n(Math.max(0,i),fr(n,r,e))}}var ft=v(function(t,e){return t===1?W(e):_n(t,fr(t,[],e))}),ss=W(function(t){return ft(t.length,function(){var e=0,r=arguments[0],a=arguments[arguments.length-1],i=Array.prototype.slice.call(arguments,0);return i[0]=function(){var u=r.apply(this,Yt(arguments,[e,a]));return e+=1,u},t.apply(this,i)})}),cs=W(function(t){return ft(t.length,function(){var e=arguments[0],r=arguments[arguments.length-1],a=r.length-1,i=Array.prototype.slice.call(arguments,0);return i[0]=function(){var u=e.apply(this,Yt(arguments,[a,r]));return a-=1,u},t.apply(this,i)})});function oe(n){return function t(e,r,a){switch(arguments.length){case 0:return t;case 1:return ze(e)?t:v(function(i,u){return n(e,i,u)});case 2:return ze(e)&&ze(r)?t:ze(e)?v(function(i,u){return n(i,r,u)}):ze(r)?v(function(i,u){return n(e,i,u)}):W(function(i){return n(e,r,i)});default:return ze(e)&&ze(r)&&ze(a)?t:ze(e)&&ze(r)?v(function(i,u){return n(i,u,a)}):ze(e)&&ze(a)?v(function(i,u){return n(i,r,u)}):ze(r)&&ze(a)?v(function(i,u){return n(e,i,u)}):ze(e)?W(function(i){return n(i,r,a)}):ze(r)?W(function(i){return n(e,i,a)}):ze(a)?W(function(i){return n(e,r,i)}):n(e,r,a)}}}var xi=oe(function(t,e,r){var a=r.length;if(t>=a||t<-a)return r;var i=(a+t)%a,u=Yt(r);return u[i]=e(r[i]),u});const mt=Array.isArray||function(t){return t!=null&&t.length>=0&&Object.prototype.toString.call(t)==="[object Array]"};function Ea(n){return n!=null&&typeof n["@@transducer/step"]=="function"}function Je(n,t,e){return function(){if(arguments.length===0)return e();var r=arguments[arguments.length-1];if(!mt(r)){for(var a=0;a<n.length;){if(typeof r[n[a]]=="function")return r[n[a]].apply(r,Array.prototype.slice.call(arguments,0,-1));a+=1}if(Ea(r)){var i=t.apply(null,Array.prototype.slice.call(arguments,0,-1));return i(r)}}return e.apply(this,arguments)}}function jn(n){return n&&n["@@transducer/reduced"]?n:{"@@transducer/value":n,"@@transducer/reduced":!0}}const _e={init:function(){return this.xf["@@transducer/init"]()},result:function(n){return this.xf["@@transducer/result"](n)}};var ls=(function(){function n(t,e){this.xf=e,this.f=t,this.all=!0}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=function(t){return this.all&&(t=this.xf["@@transducer/step"](t,!0)),this.xf["@@transducer/result"](t)},n.prototype["@@transducer/step"]=function(t,e){return this.f(e)||(this.all=!1,t=jn(this.xf["@@transducer/step"](t,!1))),t},n})();function fs(n){return function(t){return new ls(n,t)}}var Ri=v(Je(["all"],fs,function(t,e){for(var r=0;r<e.length;){if(!t(e[r]))return!1;r+=1}return!0}));function ti(n){for(var t=[],e;!(e=n.next()).done;)t.push(e.value);return t}function tr(n,t,e){for(var r=0,a=e.length;r<a;){if(n(t,e[r]))return!0;r+=1}return!1}function ps(n){var t=String(n).match(/^function (\w*)/);return t==null?"":t[1]}function lt(n,t){return Object.prototype.hasOwnProperty.call(t,n)}function hs(n,t){return n===t?n!==0||1/n===1/t:n!==n&&t!==t}const yr=typeof Object.is=="function"?Object.is:hs;var ni=Object.prototype.toString,Ti=(function(){return ni.call(arguments)==="[object Arguments]"?function(t){return ni.call(t)==="[object Arguments]"}:function(t){return lt("callee",t)}})(),ds=!{toString:null}.propertyIsEnumerable("toString"),ri=["constructor","valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],ai=(function(){return arguments.propertyIsEnumerable("length")})(),ys=function(t,e){for(var r=0;r<t.length;){if(t[r]===e)return!0;r+=1}return!1},Ut=W(typeof Object.keys=="function"&&!ai?function(t){return Object(t)!==t?[]:Object.keys(t)}:function(t){if(Object(t)!==t)return[];var e,r,a=[],i=ai&&Ti(t);for(e in t)lt(e,t)&&(!i||e!=="length")&&(a[a.length]=e);if(ds)for(r=ri.length-1;r>=0;)e=ri[r],lt(e,t)&&!ys(a,e)&&(a[a.length]=e),r-=1;return a}),Lr=W(function(t){return t===null?"Null":t===void 0?"Undefined":Object.prototype.toString.call(t).slice(8,-1)});function ii(n,t,e,r){var a=ti(n),i=ti(t);function u(o,S){return Na(o,S,e.slice(),r.slice())}return!tr(function(o,S){return!tr(u,S,o)},i,a)}function Na(n,t,e,r){if(yr(n,t))return!0;var a=Lr(n);if(a!==Lr(t))return!1;if(typeof n["fantasy-land/equals"]=="function"||typeof t["fantasy-land/equals"]=="function")return typeof n["fantasy-land/equals"]=="function"&&n["fantasy-land/equals"](t)&&typeof t["fantasy-land/equals"]=="function"&&t["fantasy-land/equals"](n);if(typeof n.equals=="function"||typeof t.equals=="function")return typeof n.equals=="function"&&n.equals(t)&&typeof t.equals=="function"&&t.equals(n);switch(a){case"Arguments":case"Array":case"Object":if(typeof n.constructor=="function"&&ps(n.constructor)==="Promise")return n===t;break;case"Boolean":case"Number":case"String":if(!(typeof n==typeof t&&yr(n.valueOf(),t.valueOf())))return!1;break;case"Date":if(!yr(n.valueOf(),t.valueOf()))return!1;break;case"Error":return n.name===t.name&&n.message===t.message;case"RegExp":if(!(n.source===t.source&&n.global===t.global&&n.ignoreCase===t.ignoreCase&&n.multiline===t.multiline&&n.sticky===t.sticky&&n.unicode===t.unicode))return!1;break}for(var i=e.length-1;i>=0;){if(e[i]===n)return r[i]===t;i-=1}switch(a){case"Map":return n.size!==t.size?!1:ii(n.entries(),t.entries(),e.concat([n]),r.concat([t]));case"Set":return n.size!==t.size?!1:ii(n.values(),t.values(),e.concat([n]),r.concat([t]));case"Arguments":case"Array":case"Object":case"Boolean":case"Number":case"String":case"Date":case"Error":case"RegExp":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"ArrayBuffer":break;default:return!1}var u=Ut(n);if(u.length!==Ut(t).length)return!1;var o=e.concat([n]),S=r.concat([t]);for(i=u.length-1;i>=0;){var I=u[i];if(!(lt(I,t)&&Na(t[I],n[I],o,S)))return!1;i-=1}return!0}var Dt=v(function(t,e){return Na(t,e,[],[])});function Mi(n,t,e){var r,a;if(typeof n.indexOf=="function")switch(typeof t){case"number":if(t===0){for(r=1/t;e<n.length;){if(a=n[e],a===0&&1/a===r)return e;e+=1}return-1}else if(t!==t){for(;e<n.length;){if(a=n[e],typeof a=="number"&&a!==a)return e;e+=1}return-1}return n.indexOf(t,e);case"string":case"boolean":case"function":case"undefined":return n.indexOf(t,e);case"object":if(t===null)return n.indexOf(t,e)}for(;e<n.length;){if(Dt(n[e],t))return e;e+=1}return-1}function Pr(n,t){return Mi(t,n,0)>=0}function er(n,t){for(var e=0,r=t.length,a=Array(r);e<r;)a[e]=n(t[e]),e+=1;return a}function aa(n){var t=n.replace(/\\/g,"\\\\").replace(/[\b]/g,"\\b").replace(/\f/g,"\\f").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\t/g,"\\t").replace(/\v/g,"\\v").replace(/\0/g,"\\0");return'"'+t.replace(/"/g,'\\"')+'"'}var pr=function(t){return(t<10?"0":"")+t},gs=typeof Date.prototype.toISOString=="function"?function(t){return t.toISOString()}:function(t){return t.getUTCFullYear()+"-"+pr(t.getUTCMonth()+1)+"-"+pr(t.getUTCDate())+"T"+pr(t.getUTCHours())+":"+pr(t.getUTCMinutes())+":"+pr(t.getUTCSeconds())+"."+(t.getUTCMilliseconds()/1e3).toFixed(3).slice(2,5)+"Z"};function Ii(n){return function(){return!n.apply(this,arguments)}}function br(n,t,e){for(var r=0,a=e.length;r<a;)t=n(t,e[r]),r+=1;return t}function Oa(n,t){for(var e=0,r=t.length,a=[];e<r;)n(t[e])&&(a[a.length]=t[e]),e+=1;return a}function ms(n,t){for(var e=new Map,r=t.entries(),a=r.next();!a.done;)n(a.value[1])&&e.set(a.value[0],a.value[1]),a=r.next();return e}function vs(n){return Object.prototype.toString.call(n)==="[object Map]"}function ur(n){return Object.prototype.toString.call(n)==="[object Object]"}var bs=(function(){function n(t,e){this.xf=e,this.f=t}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=_e.result,n.prototype["@@transducer/step"]=function(t,e){return this.f(e)?this.xf["@@transducer/step"](t,e):t},n})();function ws(n){return function(t){return new bs(n,t)}}var xa=v(Je(["fantasy-land/filter","filter"],ws,function(n,t){return ur(t)?br(function(e,r){return n(t[r])&&(e[r]=t[r]),e},{},Ut(t)):vs(t)?ms(n,t):Oa(n,t)})),zr=v(function(t,e){return xa(Ii(t),e)});function Ra(n,t){var e=function(u){var o=t.concat([n]);return Pr(u,o)?"<Circular>":Ra(u,o)},r=function(i,u){return er(function(o){return aa(o)+": "+e(i[o])},u.slice().sort())};switch(Object.prototype.toString.call(n)){case"[object Arguments]":return"(function() { return arguments; }("+er(e,n).join(", ")+"))";case"[object Array]":return"["+er(e,n).concat(r(n,zr(function(i){return/^\d+$/.test(i)},Ut(n)))).join(", ")+"]";case"[object Boolean]":return typeof n=="object"?"new Boolean("+e(n.valueOf())+")":n.toString();case"[object Date]":return"new Date("+(isNaN(n.valueOf())?e(NaN):aa(gs(n)))+")";case"[object Map]":return"new Map("+e(Array.from(n))+")";case"[object Null]":return"null";case"[object Number]":return typeof n=="object"?"new Number("+e(n.valueOf())+")":1/n===-1/0?"-0":n.toString(10);case"[object Set]":return"new Set("+e(Array.from(n).sort())+")";case"[object String]":return typeof n=="object"?"new String("+e(n.valueOf())+")":aa(n);case"[object Undefined]":return"undefined";default:if(typeof n.toString=="function"){var a=n.toString();if(a!=="[object Object]")return a}return"{"+r(n,Ut(n)).join(", ")+"}"}}var bn=W(function(t){return Ra(t,[])}),rr=v(function(t,e){if(t===e)return e;function r(S,I){if(S>I!=I>S)return I>S?I:S}var a=r(t,e);if(a!==void 0)return a;var i=r(typeof t,typeof e);if(i!==void 0)return i===typeof t?t:e;var u=bn(t),o=r(u,bn(e));return o!==void 0&&o===u?t:e}),_s=(function(){function n(t,e){this.xf=e,this.f=t}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=_e.result,n.prototype["@@transducer/step"]=function(t,e){return this.xf["@@transducer/step"](t,this.f(e))},n})(),ki=function(t){return function(e){return new _s(t,e)}},Sn=v(Je(["fantasy-land/map","map"],ki,function(t,e){switch(Object.prototype.toString.call(e)){case"[object Function]":return ft(e.length,function(){return t.call(this,e.apply(this,arguments))});case"[object Object]":return br(function(r,a){return r[a]=t(e[a]),r},{},Ut(e));default:return er(t,e)}}));const wn=Number.isInteger||function(t){return t<<0===t};function Xn(n,t){var e=n<0?t.length+n:n;return t[e]}function Fi(n,t){if(t!=null)return wn(n)?Xn(n,t):t[n]}var Vn=v(Fi),wr=v(function(t,e){return Sn(Vn(t),e)});function sr(n){return Object.prototype.toString.call(n)==="[object String]"}var _r=W(function(t){return mt(t)?!0:!t||typeof t!="object"||sr(t)?!1:t.length===0?!0:t.length>0?t.hasOwnProperty(0)&&t.hasOwnProperty(t.length-1):!1}),oi=typeof Symbol<"u"?Symbol.iterator:"@@iterator";function ji(n,t,e){return function(a,i,u){if(_r(u))return n(a,i,u);if(u==null)return i;if(typeof u["fantasy-land/reduce"]=="function")return t(a,i,u,"fantasy-land/reduce");if(u[oi]!=null)return e(a,i,u[oi]());if(typeof u.next=="function")return e(a,i,u);if(typeof u.reduce=="function")return t(a,i,u,"reduce");throw new TypeError("reduce: list must be array or iterable")}}function Bi(n,t,e){for(var r=0,a=e.length;r<a;){if(t=n["@@transducer/step"](t,e[r]),t&&t["@@transducer/reduced"]){t=t["@@transducer/value"];break}r+=1}return n["@@transducer/result"](t)}var Li=v(function(t,e){return _n(t.length,function(){return t.apply(e,arguments)})});function Ss(n,t,e){for(var r=e.next();!r.done;){if(t=n["@@transducer/step"](t,r.value),t&&t["@@transducer/reduced"]){t=t["@@transducer/value"];break}r=e.next()}return n["@@transducer/result"](t)}function As(n,t,e,r){return n["@@transducer/result"](e[r](Li(n["@@transducer/step"],n),t))}var ar=ji(Bi,As,Ss),Es=(function(){function n(t){this.f=t}return n.prototype["@@transducer/init"]=function(){throw new Error("init not implemented on XWrap")},n.prototype["@@transducer/result"]=function(t){return t},n.prototype["@@transducer/step"]=function(t,e){return this.f(t,e)},n})();function Jr(n){return new Es(n)}var Bn=oe(function(n,t,e){return ar(typeof n=="function"?Jr(n):n,t,e)}),Ns=W(function(t){return ft(Bn(rr,0,wr("length",t)),function(){for(var e=0,r=t.length;e<r;){if(!t[e].apply(this,arguments))return!1;e+=1}return!0})}),Xr=W(function(t){return function(){return t}}),Pi=v(function(t,e){return t&&e}),Os=(function(){function n(t,e){this.xf=e,this.f=t,this.any=!1}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=function(t){return this.any||(t=this.xf["@@transducer/step"](t,!1)),this.xf["@@transducer/result"](t)},n.prototype["@@transducer/step"]=function(t,e){return this.f(e)&&(this.any=!0,t=jn(this.xf["@@transducer/step"](t,!0))),t},n})();function xs(n){return function(t){return new Os(n,t)}}var Rs=v(Je(["any"],xs,function(t,e){for(var r=0;r<e.length;){if(t(e[r]))return!0;r+=1}return!1})),Ts=W(function(t){return ft(Bn(rr,0,wr("length",t)),function(){for(var e=0,r=t.length;e<r;){if(t[e].apply(this,arguments))return!0;e+=1}return!1})});function Ms(n,t,e){for(var r=e.next();!r.done;)t=n(t,r.value),r=e.next();return t}function Is(n,t,e,r){return e[r](n,t)}var Sr=ji(br,Is,Ms),Ta=v(function(t,e){return typeof e["fantasy-land/ap"]=="function"?e["fantasy-land/ap"](t):typeof t.ap=="function"?t.ap(e):typeof t=="function"?function(r){return t(r)(e(r))}:Sr(function(r,a){return Yt(r,Sn(a,e))},[],t)});function ks(n,t){for(var e=0,r=t.length-(n-1),a=new Array(r>=0?r:0);e<r;)a[e]=Array.prototype.slice.call(t,e,e+n),e+=1;return a}var Fs=(function(){function n(t,e){this.xf=e,this.pos=0,this.full=!1,this.acc=new Array(t)}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=function(t){return this.acc=null,this.xf["@@transducer/result"](t)},n.prototype["@@transducer/step"]=function(t,e){return this.store(e),this.full?this.xf["@@transducer/step"](t,this.getCopy()):t},n.prototype.store=function(t){this.acc[this.pos]=t,this.pos+=1,this.pos===this.acc.length&&(this.pos=0,this.full=!0)},n.prototype.getCopy=function(){return Yt(Array.prototype.slice.call(this.acc,this.pos),Array.prototype.slice.call(this.acc,0,this.pos))},n})();function js(n){return function(t){return new Fs(n,t)}}var Bs=v(Je([],js,ks)),Ls=v(function(t,e){return Yt(e,[t])}),Ci=v(function(t,e){return t.apply(this,e)}),qi=W(function(t){for(var e=Ut(t),r=e.length,a=[],i=0;i<r;)a[i]=t[e[i]],i+=1;return a});function ui(n,t){return mt(t)?t.map(n):Ut(t).reduce(function(e,r){return e[r]=n(t[r]),e},{})}var Ps=W(function n(t){return t=ui(function(e){return typeof e=="function"?e:n(e)},t),ft(Bn(rr,0,wr("length",qi(t))),function(){var e=arguments;return ui(function(r){return Ci(r,e)},t)})}),Ui=v(function(t,e){return e(t)}),Cs=oe(function(t,e,r){var a=t(e),i=t(r);return a<i?-1:a>i?1:0}),Ar=W(function(t){return ft(t.length,t)}),qs=Ar(function(t,e,r,a){const i=e(r),u=e(a);return i.localeCompare(u,t,{numeric:!0})});function Ma(n,t,e){if(wn(n)&&mt(e)){var r=n<0?e.length+n:n,a=[].concat(e);return a[r]=t,a}var i={};for(var u in e)i[u]=e[u];return i[n]=t,i}var cr=W(function(t){return t==null}),Ia=oe(function n(t,e,r){if(t.length===0)return e;var a=t[0];if(t.length>1){var i=Fi(a,r);(cr(i)||typeof i!="object")&&(i=wn(t[1])?[]:{}),e=n(Array.prototype.slice.call(t,1),e,i)}return Ma(a,e,r)}),ka=oe(function(t,e,r){return Ia([t],e,r)}),Vr=v(function(t,e){switch(t){case 0:return function(){return e.call(this)};case 1:return function(r){return e.call(this,r)};case 2:return function(r,a){return e.call(this,r,a)};case 3:return function(r,a,i){return e.call(this,r,a,i)};case 4:return function(r,a,i,u){return e.call(this,r,a,i,u)};case 5:return function(r,a,i,u,o){return e.call(this,r,a,i,u,o)};case 6:return function(r,a,i,u,o,S){return e.call(this,r,a,i,u,o,S)};case 7:return function(r,a,i,u,o,S,I){return e.call(this,r,a,i,u,o,S,I)};case 8:return function(r,a,i,u,o,S,I,te){return e.call(this,r,a,i,u,o,S,I,te)};case 9:return function(r,a,i,u,o,S,I,te,G){return e.call(this,r,a,i,u,o,S,I,te,G)};case 10:return function(r,a,i,u,o,S,I,te,G,V){return e.call(this,r,a,i,u,o,S,I,te,G,V)};default:throw new Error("First argument to nAry must be a non-negative integer no greater than ten")}}),Us=W(function(t){return Vr(2,t)});function lr(n){var t=Object.prototype.toString.call(n);return t==="[object Function]"||t==="[object AsyncFunction]"||t==="[object GeneratorFunction]"||t==="[object AsyncGeneratorFunction]"}var Di=v(function(t,e){var r=ft(t,e);return ft(t,function(){return br(Ta,Sn(r,arguments[0]),Array.prototype.slice.call(arguments,1))})}),Hr=W(function(t){return Di(t.length,t)}),Ds=v(function(t,e){return lr(t)?function(){return t.apply(this,arguments)&&e.apply(this,arguments)}:Hr(Pi)(t,e)}),Ws=W(function(t){return t.apply(this,Array.prototype.slice.call(arguments,1))});function Wi(n){return function t(e){for(var r,a,i,u=[],o=0,S=e.length;o<S;){if(_r(e[o]))for(r=n?t(e[o]):e[o],i=0,a=r.length;i<a;)u[u.length]=r[i],i+=1;else u[u.length]=e[o];o+=1}return u}}function zs(n){return{"@@transducer/value":n,"@@transducer/reduced":!0}}var zi="@@transducer/init",va="@@transducer/step",Ji="@@transducer/result",Js=(function(){function n(t){this.xf=t}return n.prototype[zi]=_e.init,n.prototype[Ji]=_e.result,n.prototype[va]=function(t,e){var r=this.xf[va](t,e);return r["@@transducer/reduced"]?zs(r):r},n})(),Xs=(function(){function n(t){this.xf=new Js(t)}return n.prototype[zi]=_e.init,n.prototype[Ji]=_e.result,n.prototype[va]=function(t,e){return _r(e)?ar(this.xf,t,e):Bi(this.xf,t,[e])},n})(),Vs=function(t){return new Xs(t)};function Hs(n){return function(t){return ki(n)(Vs(t))}}const Xi=Je(["fantasy-land/chain","chain"],Hs,function(t,e){return typeof e=="function"?function(r){return t(e(r))(r)}:Wi(!1)(Sn(t,e))});var Vi=v(Xi),Gs=oe(function(t,e,r){if(t>e)throw new Error("min must not be greater than max in clamp(min, max, value)");return r<t?t:r>e?e:r});function Hi(n){return new RegExp(n.source,n.flags?n.flags:(n.global?"g":"")+(n.ignoreCase?"i":"")+(n.multiline?"m":"")+(n.sticky?"y":"")+(n.unicode?"u":"")+(n.dotAll?"s":""))}function Gr(n,t,e){if(e||(e=new Ks),$s(n))return n;var r=function(i){var u=e.get(n);if(u)return u;e.set(n,i);for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(i[o]=t?Gr(n[o],!0,e):n[o]);return i};switch(Lr(n)){case"Object":return r(Object.create(Object.getPrototypeOf(n)));case"Array":return r(Array(n.length));case"Date":return new Date(n.valueOf());case"RegExp":return Hi(n);case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"BigInt64Array":case"BigUint64Array":return n.slice();default:return n}}function $s(n){var t=typeof n;return n==null||t!="object"&&t!="function"}var Ks=(function(){function n(){this.map={},this.length=0}return n.prototype.set=function(t,e){var r=this.hash(t),a=this.map[r];a||(this.map[r]=a=[]),a.push([t,e]),this.length+=1},n.prototype.hash=function(t){var e=[];for(var r in t)e.push(Object.prototype.toString.call(t[r]));return e.join()},n.prototype.get=function(t){if(this.length<=180){for(var e in this.map)for(var u=this.map[e],r=0;r<u.length;r+=1){var a=u[r];if(a[0]===t)return a[1]}return}var i=this.hash(t),u=this.map[i];if(u)for(var r=0;r<u.length;r+=1){var a=u[r];if(a[0]===t)return a[1]}},n})(),Gi=W(function(t){return t!=null&&typeof t.clone=="function"?t.clone():Gr(t,!0)}),Ys=v(function(t,e){var r=Sr(function(u,o){var S=t(o);return u[S]===void 0&&(u[S]=[]),u[S].push(o),u},{},e),a=[];for(var i in r)a.push(r[i]);return a}),Qs=W(function(t){return function(e,r){return t(e,r)?-1:t(r,e)?1:0}}),$i=W(function(t){return!t}),Zs=Hr($i);function ec(n,t){return function(){return t.call(this,n.apply(this,arguments))}}function Er(n,t){return function(){var e=arguments.length;if(e===0)return t();var r=arguments[e-1];return mt(r)||typeof r[n]!="function"?t.apply(this,arguments):r[n].apply(r,Array.prototype.slice.call(arguments,0,e-1))}}var Kt=oe(Er("slice",function(t,e,r){return Array.prototype.slice.call(r,t,e)})),Fa=W(Er("tail",Kt(1,1/0)));function Ki(){if(arguments.length===0)throw new Error("pipe requires at least one argument");return _n(arguments[0].length,Bn(ec,arguments[0],Fa(arguments)))}var ja=W(function(t){return sr(t)?t.split("").reverse().join(""):Array.prototype.slice.call(t,0).reverse()});function Yi(){if(arguments.length===0)throw new Error("compose requires at least one argument");return Ki.apply(this,ja(arguments))}var Qi=W(function(n){return Xn(0,n)});function nr(n){return n}var $r=W(nr),Zi=v(function(t,e){if(e.length<=0)return $r;var r=Qi(e),a=Fa(e);return _n(r.length,function(){return Sr(function(i,u){return t.call(this,u,i)},r.apply(this,arguments),a)})}),tc=v(function(t,e){return Zi.apply(this,[t,ja(e)])}),Ba=v(function(t,e){if(mt(t)){if(mt(e))return t.concat(e);throw new TypeError(bn(e)+" is not an array")}if(sr(t)){if(sr(e))return t+e;throw new TypeError(bn(e)+" is not a string")}if(t!=null&&lr(t["fantasy-land/concat"]))return t["fantasy-land/concat"](e);if(t!=null&&lr(t.concat))return t.concat(e);throw new TypeError(bn(t)+' does not have a method named "concat" or "fantasy-land/concat"')}),nc=W(function(t){var e=Bn(rr,0,Sn(function(r){return r[0].length},t));return _n(e,function(){for(var r=0;r<t.length;){if(t[r][0].apply(this,arguments))return t[r][1].apply(this,arguments);r+=1}})}),eo=v(function(t,e){if(t>10)throw new Error("Constructor with greater than ten arguments");return t===0?function(){return new e}:Ar(Vr(t,function(r,a,i,u,o,S,I,te,G,V){switch(t){case 1:return new e(r);case 2:return new e(r,a);case 3:return new e(r,a,i);case 4:return new e(r,a,i,u);case 5:return new e(r,a,i,u,o);case 6:return new e(r,a,i,u,o,S);case 7:return new e(r,a,i,u,o,S,I);case 8:return new e(r,a,i,u,o,S,I,te);case 9:return new e(r,a,i,u,o,S,I,te,G);case 10:return new e(r,a,i,u,o,S,I,te,G,V)}}))}),rc=W(function(t){return eo(t.length,t)}),to=v(function(t,e){return ft(Bn(rr,0,wr("length",e)),function(){var r=arguments,a=this;return t.apply(a,er(function(i){return i.apply(a,r)},e))})}),ac=Ar(function(n,t){return Sr(function(e,r){return n(r)?e+1:e},0,t)}),ic=(function(){function n(t,e,r,a){this.valueFn=t,this.valueAcc=e,this.keyFn=r,this.xf=a,this.inputs={}}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=function(t){var e;for(e in this.inputs)if(lt(e,this.inputs)&&(t=this.xf["@@transducer/step"](t,this.inputs[e]),t["@@transducer/reduced"])){t=t["@@transducer/value"];break}return this.inputs=null,this.xf["@@transducer/result"](t)},n.prototype["@@transducer/step"]=function(t,e){var r=this.keyFn(e);return this.inputs[r]=this.inputs[r]||[r,Gr(this.valueAcc,!1)],this.inputs[r][1]=this.valueFn(this.inputs[r][1],e),t},n})();function oc(n,t,e){return function(r){return new ic(n,t,e,r)}}var Kr=fr(4,[],Je([],oc,function(t,e,r,a){var i=Jr(function(u,o){var S=r(o),I=t(lt(S,u)?u[S]:Gr(e,!1),o);return I&&I["@@transducer/reduced"]?jn(u):(u[S]=I,u)});return ar(i,{},a)})),uc=Kr(function(n,t){return n+1},0),sc=Wr(-1),La=v(function(t,e){return e==null||e!==e?t:e}),cc=oe(function(t,e,r){var a=t(e),i=t(r);return a>i?-1:a<i?1:0}),lc=Ar(function(t,e,r,a){const i=e(r);return e(a).localeCompare(i,t,{numeric:!0})}),Nr=(function(){function n(){this._nativeSet=typeof Set=="function"?new Set:null,this._items={}}return n.prototype.add=function(t){return!si(t,!0,this)},n.prototype.has=function(t){return si(t,!1,this)},n})();function si(n,t,e){var r=typeof n,a,i;switch(r){case"string":case"number":return n===0&&1/n===-1/0?e._items["-0"]?!0:(t&&(e._items["-0"]=!0),!1):e._nativeSet!==null?t?(a=e._nativeSet.size,e._nativeSet.add(n),i=e._nativeSet.size,i===a):e._nativeSet.has(n):r in e._items?n in e._items[r]?!0:(t&&(e._items[r][n]=!0),!1):(t&&(e._items[r]={},e._items[r][n]=!0),!1);case"boolean":if(r in e._items){var u=n?1:0;return e._items[r][u]?!0:(t&&(e._items[r][u]=!0),!1)}else return t&&(e._items[r]=n?[!1,!0]:[!0,!1]),!1;case"function":return e._nativeSet!==null?t?(a=e._nativeSet.size,e._nativeSet.add(n),i=e._nativeSet.size,i===a):e._nativeSet.has(n):r in e._items?Pr(n,e._items[r])?!0:(t&&e._items[r].push(n),!1):(t&&(e._items[r]=[n]),!1);case"undefined":return e._items[r]?!0:(t&&(e._items[r]=!0),!1);case"object":if(n===null)return e._items.null?!0:(t&&(e._items.null=!0),!1);default:return r=Object.prototype.toString.call(n),r in e._items?Pr(n,e._items[r])?!0:(t&&e._items[r].push(n),!1):(t&&(e._items[r]=[n]),!1)}}var ba=v(function(t,e){for(var r=[],a=0,i=t.length,u=e.length,o=new Nr,S=0;S<u;S+=1)o.add(e[S]);for(;a<i;)o.add(t[a])&&(r[r.length]=t[a]),a+=1;return r}),wa=oe(function(t,e,r){for(var a=[],i=0,u=e.length;i<u;)!tr(t,e[i],r)&&!tr(t,e[i],a)&&a.push(e[i]),i+=1;return a}),no=oe(function(t,e,r){var a=Array.prototype.slice.call(r,0);return a.splice(t,e),a});function fc(n,t){if(t==null)return t;if(wn(n)&&mt(t))return no(n,1,t);var e={};for(var r in t)e[r]=t[r];return delete e[n],e}function pc(n,t){if(wn(n)&&mt(t))return[].concat(t);var e={};for(var r in t)e[r]=t[r];return e}var ro=v(function n(t,e){if(e==null)return e;switch(t.length){case 0:return e;case 1:return fc(t[0],e);default:var r=t[0],a=Array.prototype.slice.call(t,1);return e[r]==null?pc(r,e):ka(r,n(a,e[r]),e)}}),hc=v(function(t,e){return ro([t],e)}),dc=v(function(t,e){return t/e}),yc=(function(){function n(t,e){this.xf=e,this.n=t}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=_e.result,n.prototype["@@transducer/step"]=function(t,e){return this.n>0?(this.n-=1,t):this.xf["@@transducer/step"](t,e)},n})();function gc(n){return function(t){return new yc(n,t)}}var ao=v(Je(["drop"],gc,function(t,e){return Kt(Math.max(0,t),1/0,e)})),mc=(function(){function n(t,e){this.xf=e,this.n=t,this.i=0}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=_e.result,n.prototype["@@transducer/step"]=function(t,e){this.i+=1;var r=this.n===0?t:this.xf["@@transducer/step"](t,e);return this.n>=0&&this.i>=this.n?jn(r):r},n})();function vc(n){return function(t){return new mc(n,t)}}var Pa=v(Je(["take"],vc,function(t,e){return Kt(0,t<0?1/0:t,e)}));function bc(n,t){return Pa(n<t.length?t.length-n:0,t)}var wc=(function(){function n(t,e){if(t<=0)return e;this.xf=e,this.pos=0,this.full=!1,this.acc=new Array(t)}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=function(t){return this.acc=null,this.xf["@@transducer/result"](t)},n.prototype["@@transducer/step"]=function(t,e){return this.full&&(t=this.xf["@@transducer/step"](t,this.acc[this.pos])),this.store(e),t},n.prototype.store=function(t){this.acc[this.pos]=t,this.pos+=1,this.pos===this.acc.length&&(this.pos=0,this.full=!0)},n})();function _c(n){return function(t){return new wc(n,t)}}var Sc=v(Je([],_c,bc));function Ac(n,t){for(var e=t.length-1;e>=0&&n(t[e]);)e-=1;return Kt(0,e+1,t)}var Ec=(function(){function n(t,e){this.f=t,this.retained=[],this.xf=e}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=function(t){return this.retained=null,this.xf["@@transducer/result"](t)},n.prototype["@@transducer/step"]=function(t,e){return this.f(e)?this.retain(t,e):this.flush(t,e)},n.prototype.flush=function(t,e){return t=ar(this.xf,t,this.retained),this.retained=[],this.xf["@@transducer/step"](t,e)},n.prototype.retain=function(t,e){return this.retained.push(e),t},n})();function Nc(n){return function(t){return new Ec(n,t)}}var Oc=v(Je([],Nc,Ac)),xc=(function(){function n(t,e){this.xf=e,this.pred=t,this.lastValue=void 0,this.seenFirstValue=!1}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=_e.result,n.prototype["@@transducer/step"]=function(t,e){var r=!1;return this.seenFirstValue?this.pred(this.lastValue,e)&&(r=!0):this.seenFirstValue=!0,this.lastValue=e,r?t:this.xf["@@transducer/step"](t,e)},n})();function Ca(n){return function(t){return new xc(n,t)}}var io=W(function(n){return Xn(-1,n)}),qa=v(Je([],Ca,function(t,e){var r=[],a=1,i=e.length;if(i!==0)for(r[0]=e[0];a<i;)t(io(r),e[a])||(r[r.length]=e[a]),a+=1;return r})),Rc=W(Je([],function(){return Ca(Dt)},qa(Dt))),_a=oe(function(t,e,r){return Dt(t(e),t(r))}),Tc=v(function(n,t){return Je([],function(){return Ca(_a(n))},qa(_a(n)))(t)}),Mc=(function(){function n(t,e){this.xf=e,this.f=t}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=_e.result,n.prototype["@@transducer/step"]=function(t,e){if(this.f){if(this.f(e))return t;this.f=null}return this.xf["@@transducer/step"](t,e)},n})();function Ic(n){return function(t){return new Mc(n,t)}}var kc=v(Je(["dropWhile"],Ic,function(t,e){for(var r=0,a=e.length;r<a&&t(e[r]);)r+=1;return Kt(r,1/0,e)})),oo=v(function(t,e){return t||e}),Fc=v(function(t,e){return lr(t)?function(){return t.apply(this,arguments)||e.apply(this,arguments)}:Hr(oo)(t,e)});function jc(n){var t=Object.prototype.toString.call(n);return t==="[object Uint8ClampedArray]"||t==="[object Int8Array]"||t==="[object Uint8Array]"||t==="[object Int16Array]"||t==="[object Uint16Array]"||t==="[object Int32Array]"||t==="[object Uint32Array]"||t==="[object Float32Array]"||t==="[object Float64Array]"||t==="[object BigInt64Array]"||t==="[object BigUint64Array]"}var uo=W(function(t){return t!=null&&typeof t["fantasy-land/empty"]=="function"?t["fantasy-land/empty"]():t!=null&&t.constructor!=null&&typeof t.constructor["fantasy-land/empty"]=="function"?t.constructor["fantasy-land/empty"]():t!=null&&typeof t.empty=="function"?t.empty():t!=null&&t.constructor!=null&&typeof t.constructor.empty=="function"?t.constructor.empty():t==Set||t instanceof Set?new Set:t==Map||t instanceof Map?new Map:mt(t)?[]:sr(t)?"":ur(t)?{}:Ti(t)?(function(){return arguments})():jc(t)?t.constructor.from(""):void 0}),so=v(function(t,e){return ao(t>=0?e.length-t:0,e)}),Bc=v(function(n,t){return Dt(so(n.length,t),n)}),Lc=oe(function(t,e,r){return Dt(e[t],r[t])}),Pc=v(function n(t,e){if(!ur(e)&&!mt(e))return e;var r=e instanceof Array?[]:{},a,i,u;for(i in e)a=t[i],u=typeof a,r[i]=u==="function"?a(e[i]):a&&u==="object"?n(a,e[i]):e[i];return r}),Cc=(function(){function n(t,e){this.xf=e,this.f=t,this.found=!1}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=function(t){return this.found||(t=this.xf["@@transducer/step"](t,void 0)),this.xf["@@transducer/result"](t)},n.prototype["@@transducer/step"]=function(t,e){return this.f(e)&&(this.found=!0,t=jn(this.xf["@@transducer/step"](t,e))),t},n})();function qc(n){return function(t){return new Cc(n,t)}}var Uc=v(Je(["find"],qc,function(t,e){for(var r=0,a=e.length;r<a;){if(t(e[r]))return e[r];r+=1}})),Dc=(function(){function n(t,e){this.xf=e,this.f=t,this.idx=-1,this.found=!1}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=function(t){return this.found||(t=this.xf["@@transducer/step"](t,-1)),this.xf["@@transducer/result"](t)},n.prototype["@@transducer/step"]=function(t,e){return this.idx+=1,this.f(e)&&(this.found=!0,t=jn(this.xf["@@transducer/step"](t,this.idx))),t},n})();function Wc(n){return function(t){return new Dc(n,t)}}var zc=v(Je([],Wc,function(t,e){for(var r=0,a=e.length;r<a;){if(t(e[r]))return r;r+=1}return-1})),Jc=(function(){function n(t,e){this.xf=e,this.f=t}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=function(t){return this.xf["@@transducer/result"](this.xf["@@transducer/step"](t,this.last))},n.prototype["@@transducer/step"]=function(t,e){return this.f(e)&&(this.last=e),t},n})();function Xc(n){return function(t){return new Jc(n,t)}}var Vc=v(Je([],Xc,function(t,e){for(var r=e.length-1;r>=0;){if(t(e[r]))return e[r];r-=1}})),Hc=(function(){function n(t,e){this.xf=e,this.f=t,this.idx=-1,this.lastIdx=-1}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=function(t){return this.xf["@@transducer/result"](this.xf["@@transducer/step"](t,this.lastIdx))},n.prototype["@@transducer/step"]=function(t,e){return this.idx+=1,this.f(e)&&(this.lastIdx=this.idx),t},n})();function Gc(n){return function(t){return new Hc(n,t)}}var $c=v(Je([],Gc,function(t,e){for(var r=e.length-1;r>=0;){if(t(e[r]))return r;r-=1}return-1})),Kc=W(Wi(!0)),co=W(function(t){return ft(t.length,function(e,r){var a=Array.prototype.slice.call(arguments,0);return a[0]=r,a[1]=e,t.apply(this,a)})}),Yc=v(function(t,e){return Sr(Ui,t,e)}),Qc=v(Er("forEach",function(t,e){for(var r=e.length,a=0;a<r;)t(e[a]),a+=1;return e})),Zc=v(function(t,e){for(var r=Ut(e),a=0;a<r.length;){var i=r[a];t(e[i],i,e),a+=1}return e});function lo(n){for(var t={},e=0;e<n.length;)t[n[e][0]]=n[e][1],e+=1;return t}var el=W(lo),tl=v(Er("groupBy",Kr(function(n,t){return n.push(t),n},[]))),nl=v(function(n,t){for(var e=[],r=0,a=t.length;r<a;){for(var i=r+1;i<a&&n(t[i-1],t[i]);)i+=1;e.push(t.slice(r,i)),r=i}return e}),rl=v(function(t,e){return t>e}),al=v(function(t,e){return t>=e}),fo=v(function(t,e){if(t.length===0||cr(e))return!1;for(var r=e,a=0;a<t.length;)if(!cr(r)&&lt(t[a],r))r=r[t[a]],a+=1;else return!1;return!0}),il=v(function(t,e){return fo([t],e)}),ol=v(function(t,e){return cr(e)?!1:t in e}),po=function(n,t){switch(arguments.length){case 0:return po;case 1:return(function(){return function e(r){return arguments.length===0?e:yr(n,r)}})();default:return yr(n,t)}},ul=oe(function(t,e,r){return ft(Math.max(t.length,e.length,r.length),function(){return t.apply(this,arguments)?e.apply(this,arguments):r.apply(this,arguments)})}),sl=Wr(1),cl=v(Pr),ll=Kr(function(n,t){return t},null),fl=v(function(t,e){return typeof e.indexOf=="function"&&!mt(e)?e.indexOf(t):Mi(e,t,0)}),pl=Kt(0,-1),hl=oe(function(t,e,r){return Oa(function(a){return tr(t,a,r)},e)}),dl=oe(function(t,e,r){t=t<r.length&&t>=0?t:r.length;var a=Array.prototype.slice.call(r,0);return a.splice(t,0,e),a}),yl=oe(function(t,e,r){return t=t<r.length&&t>=0?t:r.length,[].concat(Array.prototype.slice.call(r,0,t),e,Array.prototype.slice.call(r,t))}),gl=(function(){function n(t,e){this.xf=e,this.f=t,this.set=new Nr}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=_e.result,n.prototype["@@transducer/step"]=function(t,e){return this.set.add(this.f(e))?this.xf["@@transducer/step"](t,e):t},n})();function ml(n){return function(t){return new gl(n,t)}}var ho=v(Je([],ml,function(n,t){for(var e=new Nr,r=[],a=0,i,u;a<t.length;)u=t[a],i=n(u),e.add(i)&&r.push(u),a+=1;return r})),Ua=ho($r),vl=v(function(t,e){for(var r=new Nr,a=0;a<t.length;a+=1)r.add(t[a]);return Ua(Oa(r.has.bind(r),e))}),bl=v(Er("intersperse",function(t,e){var r=e.length;if(r===0)return[];for(var a=Array(r*2-1),i=0;i<r;){var u=i*2;i===r-1?a[u]=e[i]:(a[u]=e[i],a[u+1]=t),i+=1}return a}));function wl(n){if(n==null)throw new TypeError("Cannot convert undefined or null to object");for(var t=Object(n),e=1,r=arguments.length;e<r;){var a=arguments[e];if(a!=null)for(var i in a)lt(i,a)&&(t[i]=a[i]);e+=1}return t}const Yr=typeof Object.assign=="function"?Object.assign:wl;var yo=v(function(t,e){var r={};return r[t]=e,r}),_l={"@@transducer/init":Array,"@@transducer/step":function(n,t){return n.push(t),n},"@@transducer/result":nr},Sl={"@@transducer/init":String,"@@transducer/step":function(n,t){return n+t},"@@transducer/result":nr},Al={"@@transducer/init":Object,"@@transducer/step":function(n,t){return Yr(n,_r(t)?yo(t[0],t[1]):t)},"@@transducer/result":nr};function El(n){if(Ea(n))return n;if(_r(n))return _l;if(typeof n=="string")return Sl;if(typeof n=="object")return Al;throw new Error("Cannot create transformer for "+n)}var Nl=oe(function(t,e,r){var a=e(Ea(t)?t:El(t));return ar(a,a["@@transducer/init"](),r)}),Ol=W(function(t){for(var e=Ut(t),r=e.length,a=0,i={};a<r;){var u=e[a],o=t[u],S=lt(o,i)?i[o]:i[o]=[];S[S.length]=u,a+=1}return i}),xl=W(function(t){for(var e=Ut(t),r=e.length,a=0,i={};a<r;){var u=e[a];i[t[u]]=u,a+=1}return i}),Or=v(function(t,e){return ft(t+1,function(){var r=arguments[t];if(r!=null&&lr(r[e]))return r[e].apply(r,Array.prototype.slice.call(arguments,0,t));throw new TypeError(bn(r)+' does not have a method named "'+e+'"')})}),go=v(function(t,e){return e instanceof t||e!=null&&(e.constructor===t||t.name==="Object"&&typeof e=="object")}),mo=W(function(t){return t!=null&&Dt(t,uo(t))}),Rl=W(function(t){return!mo(t)}),Tl=W(function(t){return!cr(t)}),Ml=Or(1,"join"),vo=W(function(t){return to(function(){return Array.prototype.slice.call(arguments,0)},t)}),Il=W(function(t){var e,r=[];for(e in t)r[r.length]=e;return r}),kl=v(function(t,e){if(typeof e.lastIndexOf=="function"&&!mt(e))return e.lastIndexOf(t);for(var r=e.length-1;r>=0;){if(Dt(e[r],t))return r;r-=1}return-1});function Sa(n){return Object.prototype.toString.call(n)==="[object Number]"}var bo=W(function(t){return t!=null&&Sa(t.length)?t.length:NaN}),Qr=v(function(t,e){return function(r){return function(a){return Sn(function(i){return e(i,a)},r(t(a)))}}}),wo=oe(function(t,e,r){return xi(t,Xr(e),r)}),Fl=W(function(t){return Qr(function(e){return Xn(t,e)},wo(t))});function xr(n,t){for(var e=t,r=0;r<n.length;r+=1){if(e==null)return;var a=n[r];wn(a)?e=Xn(a,e):e=e[a]}return e}var jl=W(function(t){return Qr(function(e){return xr(t,e)},Ia(t))}),Bl=W(function(t){return Qr(Vn(t),ka(t))}),Ll=v(function(t,e){return t<e}),Pl=v(function(t,e){return t<=e}),Cl=oe(function(t,e,r){for(var a=0,i=r.length,u=Array(i),o=[e];a<i;)o=t(o[0],r[a]),u[a]=o[1],a+=1;return[o[0],u]}),ql=oe(function(t,e,r){for(var a=r.length-1,i=Array(r.length),u=[e];a>=0;)u=t(u[0],r[a]),i[a]=u[1],a-=1;return[u[0],i]});function _o(n){var t=[];for(var e in n)lt(e,n)&&(t[t.length]=[e,n[e]]);return t}var So=function(n,t){return lo(Xi(function(e){return n(e[0],e[1])},_o(t)))},Ao=function(t,e){return So(function(r,a){return[[t(r),a]]},e)},Ul=v(Ao),Dl=v(function(t,e){return br(function(r,a){return r[a]=t(e[a],a,e),r},{},Ut(e))}),Wl=v(function(t,e){return e.match(t)||[]}),zl=v(function(t,e){return wn(t)?!wn(e)||e<1?NaN:(t%e+e)%e:NaN}),Jl=oe(function(t,e,r){var a=t(r);return rr(t(e),a)===a?r:e}),Eo=Bn(Wr,0),No=W(function(t){return Eo(t)/t.length}),Xl=W(function(t){var e=t.length;if(e===0)return NaN;var r=2-e%2,a=(e-r)/2;return No(Array.prototype.slice.call(t,0).sort(function(i,u){return i<u?-1:i>u?1:0}).slice(a,a+r))}),Vl=v(function(t,e){var r={};return _n(e.length,function(){var a=t.apply(this,arguments);return lt(a,r)||(r[a]=e.apply(this,arguments)),r[a]})}),Hl=W(function(t){return Yr.apply(null,[{}].concat(t))}),Da=oe(function(t,e,r){var a={},i;e=e||{},r=r||{};for(i in e)lt(i,e)&&(a[i]=lt(i,r)?t(i,e[i],r[i]):e[i]);for(i in r)lt(i,r)&&!lt(i,a)&&(a[i]=r[i]);return a}),Zr=oe(function n(t,e,r){return Da(function(a,i,u){return ur(i)&&ur(u)?n(t,i,u):t(a,i,u)},e,r)}),Gl=v(function(t,e){return Zr(function(r,a,i){return a},t,e)}),Oo=v(function(t,e){return Zr(function(r,a,i){return i},t,e)}),$l=oe(function(t,e,r){return Zr(function(a,i,u){return t(i,u)},e,r)}),Kl=v(function(t,e){return Yr({},e,t)}),Yl=v(function(t,e){return Yr({},t,e)}),Ql=oe(function(t,e,r){return Da(function(a,i,u){return t(i,u)},e,r)}),xo=v(function(t,e){if(t===e)return t;function r(S,I){if(S<I!=I<S)return I<S?I:S}var a=r(t,e);if(a!==void 0)return a;var i=r(typeof t,typeof e);if(i!==void 0)return i===typeof t?t:e;var u=bn(t),o=r(u,bn(e));return o!==void 0?o===u?t:e:t}),Zl=oe(function(t,e,r){var a=t(r);return xo(t(e),a)===a?r:e});function ef(n,t,e){if(wn(n)&&mt(e)){var r=[].concat(e);return r[n]=t(r[n]),r}var a={};for(var i in e)a[i]=e[i];return a[n]=t(a[n]),a}var Ro=oe(function n(t,e,r){if(!ur(r)&&!mt(r))return r;if(t.length===0)return e(r);var a=t[0];if(!lt(a,r))return r;if(t.length===1)return ef(a,e,r);var i=n(Array.prototype.slice.call(t,1),e,r[a]);return i===r[a]?r:Ma(a,i,r)}),tf=oe(function(t,e,r){return Ro([t],e,r)}),nf=v(function(t,e){return t%e}),rf=oe(function(n,t,e){var r=e.length,a=e.slice(),i=n<0?r+n:n,u=t<0?r+t:t,o=a.splice(i,1);return i<0||i>=e.length||u<0||u>=e.length?e:[].concat(a.slice(0,u)).concat(o).concat(a.slice(u,e.length))}),To=v(function(t,e){return t*e}),af=v(function(t,e){return function(a){return t(Oo(e,a))}}),of=W(function(t){return-t}),uf=v(function(t,e){return Ri(Ii(t),e)}),sf=v(Xn),cf=W(function(t){var e=t<0?1:t+1;return ft(e,function(){return Xn(t,arguments)})}),lf=oe(function(t,e,r){return t(e(r))}),ff=v(function(t,e){return typeof t["fantasy-land/of"]=="function"?t["fantasy-land/of"](e):typeof t.of=="function"?t.of(e):[e]}),pf=v(function(t,e){for(var r={},a={},i=0,u=t.length;i<u;)a[t[i]]=1,i+=1;for(var o in e)a.hasOwnProperty(o)||(r[o]=e[o]);return r}),hf=fr(4,[],function(t,e,r,a){return t(e(r),e(a))}),df=W(function(t){var e=!1,r;return _n(t.length,function(){return e||(e=!0,r=t.apply(this,arguments)),r})});function Mo(n,t){if(t==null||!lr(t.then))throw new TypeError("`"+n+"` expected a Promise, received "+Ra(t,[]))}var yf=v(function(t,e){return Mo("otherwise",e),e.then(null,t)}),Io=function(n){return{value:n,map:function(t){return Io(t(n))}}},ko=oe(function(t,e,r){return t(function(a){return Io(e(a))})(r).value}),gf=v(function(t,e){return[t,e]});function Fo(n){return v(function(t,e){return _n(Math.max(0,t.length-e.length),function(){return t.apply(this,n(e,arguments))})})}var mf=Fo(Yt),vf=Fo(co(Yt)),bf=vo([xa,zr]),wf=v(xr),_f=v(function(t,e){return t.map(function(r){for(var a=e,i=0,u;i<r.length;){if(a==null)return;u=r[i],a=wn(u)?Xn(u,a):a[u],i+=1}return a})}),Sf=oe(function(t,e,r){return Dt(xr(e,r),t)}),Af=oe(function(t,e,r){return La(t,xr(e,r))}),Ef=oe(function(t,e,r){return t(xr(e,r))}),Nf=v(function(t,e){for(var r={},a=0;a<t.length;)t[a]in e&&(r[t[a]]=e[t[a]]),a+=1;return r}),jo=v(function(t,e){for(var r={},a=0,i=t.length;a<i;){var u=t[a];r[u]=e[u],a+=1}return r}),Of=v(function(t,e){var r={};for(var a in e)t(e[a],a,e)&&(r[a]=e[a]);return r}),Bo=v(function(t,e){return Yt([t],e)}),xf=Bn(To,1),Lo=v(function(t,e){return ft(e.length,function(){for(var r=[],a=0;a<e.length;)r.push(e[a].call(this,arguments[a])),a+=1;return t.apply(this,r.concat(Array.prototype.slice.call(arguments,e.length)))})}),Rf=Lo(er,[jo,$r]);function Po(n,t,e){return function(r){return t(e(n(r)))}}var Tf=(function(){function n(t,e,r){this.xf=r,this.f=t,this.g=e}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=_e.result,n.prototype["@@transducer/step"]=function(t,e){return this.xf["@@transducer/step"](t,Po(this.f,this.g,e))},n})();function Mf(n,t){return function(e){return new Tf(n,t,e)}}var If=oe(Je(["fantasy-land/promap","promap"],Mf,Po)),kf=oe(function(t,e,r){return Dt(t,Vn(e,r))}),Ff=oe(function(t,e,r){return go(t,Vn(e,r))}),jf=oe(function(t,e,r){return La(t,Vn(e,r))}),Bf=oe(function(t,e,r){return t(Vn(e,r))}),Lf=v(function(t,e){return t.map(function(r){return Vn(r,e)})}),Pf=v(function(t,e){if(!(Sa(t)&&Sa(e)))throw new TypeError("Both arguments to range must be numbers");for(var r=t<e?Math.ceil(e-t):0,a=Array(r),i=0;i<r;)a[i]=i+t,i+=1;return a}),Cf=v(So),Co=oe(function(t,e,r){for(var a=r.length-1;a>=0;){if(e=t(r[a],e),e&&e["@@transducer/reduced"]){e=e["@@transducer/value"];break}a-=1}return e}),qf=fr(4,[],function(t,e,r,a){var i=Jr(function(u,o){return t(u,o)?e(u,o):jn(u)});return ar(i,r,a)}),Uf=W(jn),Df=v(function(t,e){return Ao(function(r){return lt(r,t)?t[r]:r},e)}),qo=v(function(t,e){var r=Number(e);if(r<0||isNaN(r))throw new RangeError("n must be a non-negative number");for(var a=0,i=Array(r);a<r;)i[a]=t(a),a+=1;return i}),Wf=v(function(t,e){return qo(Xr(t),e)}),zf=oe(function(t,e,r){return r.replace(t,e)}),ci="@@transducer/init",ia="@@transducer/step",Jf=(function(){function n(t,e,r){this.xf=r,this.f=t,this.acc=e}return n.prototype[ci]=function(){return this.xf[ia](this.xf[ci](),this.acc)},n.prototype["@@transducer/result"]=_e.result,n.prototype[ia]=function(t,e){return t["@@transducer/reduced"]?t:(this.acc=this.f(this.acc,e),this.xf[ia](t,this.acc))},n})(),Xf=oe(function(t,e,r){return new Jf(t,e,r)}),Vf=oe(Je([],Xf,function(t,e,r){var a=0,i=r.length,u=Array(i+1);for(u[0]=e;a<i;)e=t(e,r[a]),u[a+1]=e,a+=1;return u})),Uo=v(function(t,e){var r=typeof t["fantasy-land/of"]=="function"?t["fantasy-land/of"]:typeof t.of=="function"?t.of:t,a={"fantasy-land/of":r};return typeof e["fantasy-land/traverse"]=="function"?e["fantasy-land/traverse"](a,nr):typeof e.traverse=="function"?e.traverse(a,nr):Co(function(i,u){return Ta(Sn(Bo,i),u)},r([]),e)}),Hf=oe(function(t,e,r){return ko(t,Xr(e),r)}),Gf=v(function(t,e){return Array.prototype.slice.call(e,0).sort(t)}),$f=v(function(t,e){return Array.prototype.slice.call(e,0).sort(function(r,a){var i=t(r),u=t(a);return i<u?-1:i>u?1:0})}),Kf=v(function(t,e){return Array.prototype.slice.call(e,0).sort(function(r,a){for(var i=0,u=0;i===0&&u<t.length;)i=t[u](r,a),u+=1;return i})}),Yf=Or(1,"split"),Qf=v(function(t,e){return[Kt(0,t,e),Kt(t,bo(e),e)]}),Zf=v(function(t,e){if(t<=0)throw new Error("First argument to splitEvery must be a positive integer");for(var r=[],a=0;a<e.length;)r.push(Kt(a,a+=t,e));return r}),ep=v(function(t,e){for(var r=0,a=e.length,i=[];r<a&&!t(e[r]);)i.push(e[r]),r+=1;return[i,Array.prototype.slice.call(e,r)]}),tp=fr(2,[],function(t,e){for(var r=[],a=[],i=0;i<e.length;i=i+1)t(e[i])||a.push(e[i]),(i<e.length-1&&t(e[i+1])||i===e.length-1)&&a.length>0&&(r.push(a),a=[]);return r}),np=v(function(n,t){return Dt(Pa(n.length,t),n)}),rp=v(function(t,e){return Number(t)-Number(e)}),ap=function(n,t,e){var r=Gi(e),a=Object.getOwnPropertyNames(r);if(a.includes(n)&&a.includes(t)){var i=r[n];r[n]=r[t],r[t]=i}return r},Do=function(n,t,e){var r=e.length,a=e.slice(),i=n<0?r+n:n,u=t<0?r+t:t,o=Math.min(i,u),S=Math.max(i,u);return i<0||i>r||u<0||u>r||i===u||(a=[].concat(a.slice(0,o)).concat([a[S]]).concat(a.slice(o+1,S)).concat([a[o]]).concat(a.slice(S+1,r))),a},ip=function(n,t,e){var r=Do(n,t,e);return mt(r)?r.join(""):r},op=oe(function(n,t,e){return mt(e)?Do(n,t,e):sr(e)?ip(n,t,e):ap(n,t,e)}),up=v(function(t,e){return Ba(ba(t,e),ba(e,t))}),sp=oe(function(t,e,r){return Ba(wa(t,e,r),wa(t,r,e))}),cp=v(function(t,e){for(var r=e.length-1;r>=0&&t(e[r]);)r-=1;return Kt(r+1,1/0,e)}),lp=(function(){function n(t,e){this.xf=e,this.f=t}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=_e.result,n.prototype["@@transducer/step"]=function(t,e){return this.f(e)?this.xf["@@transducer/step"](t,e):jn(t)},n})();function fp(n){return function(t){return new lp(n,t)}}var pp=v(Je(["takeWhile"],fp,function(t,e){for(var r=0,a=e.length;r<a&&t(e[r]);)r+=1;return Kt(0,r,e)})),hp=(function(){function n(t,e){this.xf=e,this.f=t}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=_e.result,n.prototype["@@transducer/step"]=function(t,e){return this.f(e),this.xf["@@transducer/step"](t,e)},n})();function dp(n){return function(t){return new hp(n,t)}}var yp=v(Je([],dp,function(t,e){return t(e),e}));function gp(n){return Object.prototype.toString.call(n)==="[object RegExp]"}var mp=v(function(t,e){if(!gp(t))throw new TypeError("‘test’ requires a value of type RegExp as its first argument; received "+bn(t));return Hi(t).test(e)}),vp=v(function(t,e){return Mo("andThen",e),e.then(t)}),bp=Or(0,"toLowerCase"),wp=W(_o),_p=W(function(t){var e=[];for(var r in t)e[e.length]=[r,t[r]];return e}),Sp=Or(0,"toUpperCase"),Ap=ft(4,function(t,e,r,a){return ar(t(typeof e=="function"?Jr(e):e),r,a)}),Ep=W(function(t){for(var e=0,r=[];e<t.length;){for(var a=t[e],i=0;i<a.length;)typeof r[i]>"u"&&(r[i]=[]),r[i].push(a[i]),i+=1;e+=1}return r}),Np=oe(function(t,e,r){var a=typeof t["fantasy-land/of"]=="function"?t["fantasy-land/of"]:typeof t.of=="function"?t.of:t,i={"fantasy-land/of":a};return typeof r["fantasy-land/traverse"]=="function"?r["fantasy-land/traverse"](i,e):typeof r.traverse=="function"?r.traverse(i,e):Uo(i,Sn(e,r))}),hr=`	
\v\f\r                　\u2028\u2029\uFEFF`,Op="​",xp=typeof String.prototype.trim=="function",Rp=W(!xp||hr.trim()||!Op.trim()?function(t){var e=new RegExp("^["+hr+"]["+hr+"]*"),r=new RegExp("["+hr+"]["+hr+"]*$");return t.replace(e,"").replace(r,"")}:function(t){return t.trim()}),Tp=v(function(t,e){return _n(t.length,function(){try{return t.apply(this,arguments)}catch(r){return e.apply(this,Yt([r],arguments))}})}),Mp=W(function(t){return function(){return t(Array.prototype.slice.call(arguments,0))}}),Ip=W(function(t){return Vr(1,t)}),kp=v(function(t,e){return ft(t,function(){for(var r=1,a=e,i=0,u;r<=t&&typeof a=="function";)u=r===t?arguments.length:i+a.length,a=a.apply(this,Array.prototype.slice.call(arguments,i,u)),r+=1,i=u;return a})}),Fp=v(function(t,e){for(var r=t(e),a=[];r&&r.length;)a[a.length]=r[0],r=t(r[1]);return a}),jp=v(Yi(Ua,Yt)),Bp=(function(){function n(t,e){this.xf=e,this.pred=t,this.items=[]}return n.prototype["@@transducer/init"]=_e.init,n.prototype["@@transducer/result"]=_e.result,n.prototype["@@transducer/step"]=function(t,e){return tr(this.pred,e,this.items)?t:(this.items.push(e),this.xf["@@transducer/step"](t,e))},n})();function Lp(n){return function(t){return new Bp(n,t)}}var Wo=v(Je([],Lp,function(n,t){for(var e=0,r=t.length,a=[],i;e<r;)i=t[e],tr(n,i,a)||(a[a.length]=i),e+=1;return a})),Pp=oe(function(t,e,r){return Wo(t,Yt(e,r))}),Cp=oe(function(t,e,r){return t(r)?r:e(r)}),qp=Vi(nr),Up=oe(function(t,e,r){for(var a=r;!t(a);)a=e(a);return a}),Dp=v(function(n,t){return n in t&&mt(t[n])?er(function(e){return Ma(n,e,t)},t[n]):[t]}),Wp=W(function(t){var e,r=[];for(e in t)r[r.length]=t[e];return r}),zp=function(n){return{value:n,"fantasy-land/map":function(){return this}}},Jp=v(function(t,e){return t(zp)(e).value}),Xp=oe(function(t,e,r){return t(r)?e(r):r}),zo=v(function(t,e){for(var r in t)if(lt(r,t)&&!t[r](e[r]))return!1;return!0}),Vp=v(function(t,e){for(var r in t)if(lt(r,t)&&t[r](e[r]))return!0;return!1}),Hp=v(function(t,e){return zo(Sn(Dt,t),e)}),Gp=v(function(t,e){for(var r=new Nr,a=0;a<t.length;a+=1)r.add(t[a]);return zr(r.has.bind(r),e)}),$p=v(function(t,e){return!!(!t^!e)}),Kp=v(function(t,e){for(var r=0,a=t.length,i,u=e.length,o=Array(a*u);r<a;){for(i=0;i<u;)o[r*u+i]=[t[r],e[i]],i+=1;r+=1}return o}),Yp=v(function(t,e){for(var r=Math.min(t.length,e.length),a=Array(r),i=0;i<r;)a[i]=[t[i],e[i]],i+=1;return a}),Qp=v(function(t,e){for(var r=0,a=Math.min(t.length,e.length),i={};r<a;)i[t[r]]=e[r],r+=1;return i}),Zp=oe(function(t,e,r){for(var a=Math.min(e.length,r.length),i=Array(a),u=0;u<a;)i[u]=t(e[u],r[u]),u+=1;return i}),eh=W(function(t){return ft(t.length,function(){var r=arguments;return function(){return t.apply(this,r)}})});const th=Object.freeze(Object.defineProperty({__proto__:null,F:is,T:os,__:us,add:Wr,addIndex:ss,addIndexRight:cs,adjust:xi,all:Ri,allPass:Ns,always:Xr,and:Pi,andThen:vp,any:Rs,anyPass:Ts,ap:Ta,aperture:Bs,append:Ls,apply:Ci,applySpec:Ps,applyTo:Ui,ascend:Cs,ascendNatural:qs,assoc:ka,assocPath:Ia,binary:Us,bind:Li,both:Ds,call:Ws,chain:Vi,clamp:Gs,clone:Gi,collectBy:Ys,comparator:Qs,complement:Zs,compose:Yi,composeWith:tc,concat:Ba,cond:nc,construct:rc,constructN:eo,converge:to,count:ac,countBy:uc,curry:Ar,curryN:ft,dec:sc,defaultTo:La,descend:cc,descendNatural:lc,difference:ba,differenceWith:wa,dissoc:hc,dissocPath:ro,divide:dc,drop:ao,dropLast:Sc,dropLastWhile:Oc,dropRepeats:Rc,dropRepeatsBy:Tc,dropRepeatsWith:qa,dropWhile:kc,either:Fc,empty:uo,endsWith:Bc,eqBy:_a,eqProps:Lc,equals:Dt,evolve:Pc,filter:xa,find:Uc,findIndex:zc,findLast:Vc,findLastIndex:$c,flatten:Kc,flip:co,flow:Yc,forEach:Qc,forEachObjIndexed:Zc,fromPairs:el,groupBy:tl,groupWith:nl,gt:rl,gte:al,has:il,hasIn:ol,hasPath:fo,head:Qi,identical:po,identity:$r,ifElse:ul,inc:sl,includes:cl,indexBy:ll,indexOf:fl,init:pl,innerJoin:hl,insert:dl,insertAll:yl,intersection:vl,intersperse:bl,into:Nl,invert:Ol,invertObj:xl,invoker:Or,is:go,isEmpty:mo,isNil:cr,isNotEmpty:Rl,isNotNil:Tl,join:Ml,juxt:vo,keys:Ut,keysIn:Il,last:io,lastIndexOf:kl,length:bo,lens:Qr,lensIndex:Fl,lensPath:jl,lensProp:Bl,lift:Hr,liftN:Di,lt:Ll,lte:Pl,map:Sn,mapAccum:Cl,mapAccumRight:ql,mapKeys:Ul,mapObjIndexed:Dl,match:Wl,mathMod:zl,max:rr,maxBy:Jl,mean:No,median:Xl,memoizeWith:Vl,mergeAll:Hl,mergeDeepLeft:Gl,mergeDeepRight:Oo,mergeDeepWith:$l,mergeDeepWithKey:Zr,mergeLeft:Kl,mergeRight:Yl,mergeWith:Ql,mergeWithKey:Da,min:xo,minBy:Zl,modify:tf,modifyPath:Ro,modulo:nf,move:rf,multiply:To,nAry:Vr,negate:of,none:uf,not:$i,nth:sf,nthArg:cf,o:lf,objOf:yo,of:ff,omit:pf,on:hf,once:df,or:oo,otherwise:yf,over:ko,pair:gf,partial:mf,partialObject:af,partialRight:vf,partition:bf,path:wf,pathEq:Sf,pathOr:Af,pathSatisfies:Ef,paths:_f,pick:Nf,pickAll:jo,pickBy:Of,pipe:Ki,pipeWith:Zi,pluck:wr,prepend:Bo,product:xf,project:Rf,promap:If,prop:Vn,propEq:kf,propIs:Ff,propOr:jf,propSatisfies:Bf,props:Lf,range:Pf,rebuild:Cf,reduce:Bn,reduceBy:Kr,reduceRight:Co,reduceWhile:qf,reduced:Uf,reject:zr,remove:no,renameKeys:Df,repeat:Wf,replace:zf,reverse:ja,scan:Vf,sequence:Uo,set:Hf,slice:Kt,sort:Gf,sortBy:$f,sortWith:Kf,split:Yf,splitAt:Qf,splitEvery:Zf,splitWhen:ep,splitWhenever:tp,startsWith:np,subtract:rp,sum:Eo,swap:op,symmetricDifference:up,symmetricDifferenceWith:sp,tail:Fa,take:Pa,takeLast:so,takeLastWhile:cp,takeWhile:pp,tap:yp,test:mp,thunkify:eh,times:qo,toLower:bp,toPairs:wp,toPairsIn:_p,toString:bn,toUpper:Sp,transduce:Ap,transpose:Ep,traverse:Np,trim:Rp,tryCatch:Tp,type:Lr,unapply:Mp,unary:Ip,uncurryN:kp,unfold:Fp,union:jp,unionWith:Pp,uniq:Ua,uniqBy:ho,uniqWith:Wo,unless:Cp,unnest:qp,until:Up,unwind:Dp,update:wo,useWith:Lo,values:qi,valuesIn:Wp,view:Jp,when:Xp,where:zo,whereAny:Vp,whereEq:Hp,without:Gp,xor:$p,xprod:Kp,zip:Yp,zipObj:Qp,zipWith:Zp},Symbol.toStringTag,{value:"Module"}));function nh(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}function rh(n){if(Object.prototype.hasOwnProperty.call(n,"__esModule"))return n;var t=n.default;if(typeof t=="function"){var e=function r(){var a=!1;try{a=this instanceof r}catch{}return a?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};e.prototype=t.prototype}else e={};return Object.defineProperty(e,"__esModule",{value:!0}),Object.keys(n).forEach(function(r){var a=Object.getOwnPropertyDescriptor(n,r);Object.defineProperty(e,r,a.get?a:{enumerable:!0,get:function(){return n[r]}})}),e}var oa={exports:{}},ua={exports:{}};const ah=Symbol.for("nodejs.util.inspect.custom"),Jo=Object.assign(n=>{try{return JSON.stringify(n)}catch{return String(n)}},{custom:ah}),ih={inspect:Jo},oh=Object.freeze(Object.defineProperty({__proto__:null,default:ih,inspect:Jo},Symbol.toStringTag,{value:"Module"})),ea=rh(oh);var sa={exports:{}},ca={exports:{}},li;function Rr(){return li||(li=1,(function(n){(function(t){n.exports=t()})(function(){var t="@@show",e=[];function r(u){return function(o){return i(o)+": "+i(u[o])}}function a(u){return Object.keys(u).sort()}function i(u){if(e.indexOf(u)>=0)return"<Circular>";switch(Object.prototype.toString.call(u)){case"[object Boolean]":return typeof u=="object"?"new Boolean ("+i(u.valueOf())+")":u.toString();case"[object Number]":return typeof u=="object"?"new Number ("+i(u.valueOf())+")":1/u===-1/0?"-0":u.toString(10);case"[object String]":return typeof u=="object"?"new String ("+i(u.valueOf())+")":JSON.stringify(u);case"[object Date]":return"new Date ("+i(isNaN(u.valueOf())?NaN:u.toISOString())+")";case"[object Error]":return"new "+u.name+" ("+i(u.message)+")";case"[object Arguments]":return"function () { return arguments; } ("+Array.prototype.map.call(u,i).join(", ")+")";case"[object Array]":e.push(u);try{return"["+u.map(i).concat(a(u).filter(function(o){return!/^\d+$/.test(o)}).map(r(u))).join(", ")+"]"}finally{e.pop()}case"[object Object]":e.push(u);try{return t in u&&(u.constructor==null||u.constructor.prototype!==u)?u[t]():"{"+a(u).map(r(u)).join(", ")+"}"}finally{e.pop()}case"[object Set]":e.push(u);try{return"new Set ("+i(Array.from(u.values()))+")"}finally{e.pop()}case"[object Map]":e.push(u);try{return"new Map ("+i(Array.from(u.entries()))+")"}finally{e.pop()}default:return String(u)}}return i})})(ca)),ca.exports}var la={exports:{}},fa={exports:{}},fi;function Wa(){return fi||(fi=1,(function(n){(function(t){n.exports=t()})(function(){var t="@@type",e=new RegExp("^([\\s\\S]+)/([\\s\\S]+?)(?:@([0-9]+))?$");function r(a){return a!=null&&a.constructor!=null&&a.constructor.prototype!==a&&typeof a[t]=="string"?a[t]:Object.prototype.toString.call(a).slice(8,-1)}return r.parse=function(i){var u=null,o=i,S=0,I=e.exec(i);return I!=null&&(u=I[1],o=I[2],I[3]!=null&&(S=Number(I[3]))),{namespace:u,name:o,version:S}},r})})(fa)),fa.exports}var pi;function Tr(){return pi||(pi=1,(function(n){(function(t){n.exports=t(Wa())})(function(t){if(typeof __doctest<"u"){__doctest.require("sanctuary-identity");var e=__doctest.require("./test/List"),r=__doctest.require("sanctuary-maybe");__doctest.require("sanctuary-pair"),__doctest.require("./test/Sum"),e.Nil,e.Cons,r.Nothing,r.Just}function a(f){return function(d){return f.concat(d)}}function i(f){return function(d){return f}}function u(f,d){Object.keys(f).forEach(d,f)}function o(f,d){return Object.prototype.hasOwnProperty.call(d,f)}function S(f){return f}function I(f){return function(d){return[f,d]}}function te(f,d){return typeof f==typeof d&&t(f)===t(d)}function G(f){return Object.keys(f).sort()}function V(f){return function(d){return d(f)}}function X(f){return function(d){return f(d)}}function se(f){return{value:f,done:!1}}function ue(f){return{value:f,done:!0}}function ve(f,d,_,x){if(!(this instanceof ve))return new ve(f,d,_,x);this.name=f,this.url=d,this.test=function(Z){return _.every(function(ke){return ke.test(Z)})&&x(Z)}}ve.prototype["@@type"]="sanctuary-type-classes/TypeClass@1";var J="Constructor",fe="Value";function je(f,d,_){for(var x=_,Z=0;Z<d.length;Z+=1){var ke=d[Z];if(x==null||!(f||o(ke,x)))return null;x=x[ke]}return typeof x=="function"?x:null}function l(f,d){return je(!0,f,d)}function b(f){return je(!1,f,qn)}var T=o("name",function(){})?function(d){return d.name}:function(d){var _=/function (\w*)/.exec(d);return _==null?"":_[1]};function L(f,d,_){function x(Fe){var xe="fantasy-land/"+Fe;return _[Fe]===J?function(st){var ir=l([xe],st);return ir==null&&typeof st=="function"?b([T(st),xe]):ir}:function(st){var ir=st!=null&&st.constructor!=null&&st.constructor.prototype===st,un=null;return ir||(un=l([xe],st)),un==null&&(un=b([t(st),"prototype",xe])),un&&un.bind(st)}}var Z="12.1.0",ke=Object.keys(_),gt=ve("sanctuary-type-classes/"+f,"https://github.com/sanctuary-js/sanctuary-type-classes/tree/v"+Z+"#"+f,d,function(Fe){return ke.every(function(xe){var st=_[xe]===J?Fe.constructor:Fe;return x(xe)(st)!=null})});return gt.methods=ke.reduce(function(Fe,xe){return Fe[xe]=x(xe),Fe},{}),gt}var be=L("Setoid",[],{equals:fe}),ne=L("Ord",[be],{lte:fe}),pe=L("Semigroupoid",[],{compose:fe}),w=L("Category",[pe],{id:J}),we=L("Semigroup",[],{concat:fe}),Ge=L("Monoid",[we],{empty:J}),Be=L("Group",[Ge],{invert:fe}),Ze=L("Filterable",[],{filter:fe}),Le=L("Functor",[],{map:fe}),Ne=L("Bifunctor",[Le],{bimap:fe}),ye=L("Profunctor",[Le],{promap:fe}),et=L("Apply",[Le],{ap:fe}),y=L("Applicative",[et],{of:J}),Ue=L("Chain",[et],{chain:fe}),A=L("ChainRec",[Ue],{chainRec:J}),$=L("Monad",[y,Ue],{}),Re=L("Alt",[Le],{alt:fe}),Ke=L("Plus",[Re],{zero:J}),An=L("Alternative",[y,Ke],{}),Qt=L("Foldable",[],{reduce:fe}),Bt=L("Traversable",[Le,Qt],{traverse:fe}),rt=L("Extend",[Le],{extend:fe}),it=L("Comonad",[rt],{extract:fe}),Lt=L("Contravariant",[],{contramap:fe});function En(f){return!0}function Wt(f){return!0}function Hn(f){return!0}function Nn(f){return!0}function pt(f){return typeof this=="object"?Ae(this.valueOf(),f.valueOf()):this===f}function Nt(f){return typeof this=="object"?ot(this.valueOf(),f.valueOf()):this===!1||f===!0}function Mt(f){return typeof this=="object"?Ae(this.valueOf(),f.valueOf()):isNaN(this)&&isNaN(f)||this===f}function Pe(f){return typeof this=="object"?ot(this.valueOf(),f.valueOf()):isNaN(this)||this<=f}function It(f){return Ae(this.valueOf(),f.valueOf())}function cn(f){return ot(this.valueOf(),f.valueOf())}function tt(f){return f.source===this.source&&f.global===this.global&&f.ignoreCase===this.ignoreCase&&f.multiline===this.multiline&&f.sticky===this.sticky&&f.unicode===this.unicode}function zt(){return""}function Ot(f){return typeof this=="object"?Ae(this.valueOf(),f.valueOf()):this===f}function he(f){return typeof this=="object"?ot(this.valueOf(),f.valueOf()):this<=f}function Xe(f){return this+f}function Pt(){return[]}function Oe(f){return[f]}function Zt(f,d){for(var _=[],x={},Z={head:d,tail:x};Z!==x;){for(var ke=x,gt=f(se,ue,Z.head),Fe=0;Fe<gt.length;Fe+=1){var xe=gt[Fe];xe.done?_.push(xe.value):ke={head:xe.value,tail:ke}}for(Z=Z.tail;ke!==x;)Z={head:ke.head,tail:Z},ke=ke.tail}return _}function ln(){return[]}function Ct(f){if(f.length!==this.length)return!1;for(var d=0;d<this.length;d+=1)if(!Ae(this[d],f[d]))return!1;return!0}function On(f){for(var d=0;;d+=1){if(d===this.length)return!0;if(d===f.length)return!1;if(!Ae(this[d],f[d]))return ot(this[d],f[d])}}function Ye(f){return this.concat(f)}function xn(f){return this.filter(function(d){return f(d)})}function Ln(f){return this.map(function(d){return f(d)})}function Jt(f){for(var d=[],_=0;_<f.length;_+=1)for(var x=0;x<this.length;x+=1)d.push(f[_](this[x]));return d}function en(f){for(var d=[],_=0;_<this.length;_+=1)for(var x=0,Z=f(this[_]);x<Z.length;x+=1)d.push(Z[x]);return d}var fn=Ye;function pn(f,d){for(var _=d,x=0;x<this.length;x+=1)_=f(_,this[x]);return _}function Pn(f,d){var _=this;function x(Z,ke){switch(ke){case 0:return St(f,[]);case 2:return yt(I,d(_[Z]),d(_[Z+1]));default:var gt=Math.floor(ke/4)*2;return yt(a,x(Z,gt),x(Z+gt,ke-gt))}}return this.length%2===1?yt(a,xt(Oe,d(this[0])),x(1,this.length-1)):x(0,this.length)}function Rn(f){return this.map(function(d,_,x){return f(x.slice(_))})}function hn(f){return Ct.call(this,f)}function qt(f){return On.call(this,f)}function h(f){return Ae(this.name,f.name)&&Ae(this.message,f.message)}function E(){return{}}function k(){return{}}function Q(f){var d=this,_=G(this);return Ae(_,G(f))&&_.every(function(x){return Ae(d[x],f[x])})}function Ie(f){for(var d=G(this),_=G(f);;){if(d.length===0)return!0;if(_.length===0)return!1;var x=d.shift(),Z=_.shift();if(x<Z)return!0;if(x>Z)return!1;if(!Ae(this[x],f[x]))return ot(this[x],f[x])}}function Te(f){var d={};function _(x){d[x]=this[x]}return u(this,_),u(f,_),d}function D(f){var d={};return u(this,function(_){f(this[_])&&(d[_]=this[_])}),d}function C(f){var d={};return u(this,function(_){d[_]=f(this[_])}),d}function K(f){var d={};return u(this,function(_){o(_,f)&&(d[_]=f[_](this[_]))}),d}var De=Te;function Ce(f,d){var _=this;function x(Z,ke){return f(Z,_[ke])}return G(this).reduce(x,d)}function _t(f,d){var _=this;return Object.keys(this).reduce(function(x,Z){function ke(gt){return function(Fe){var xe={};return xe[Z]=Fe,Te.call(gt,xe)}}return yt(ke,x,d(_[Z]))},St(f,{}))}function Xt(){return S}function dn(f){return function(d){return f}}function Tn(f,d){return function(_){for(var x=se(d);!x.done;)x=f(se,ue,x.value)(_);return x.value}}function tn(f){return f===this}function Gn(f){var d=this;return function(_){return f(d(_))}}function $n(f){var d=this;return function(_){return f(d(_))}}function Vt(f,d){var _=this;return function(x){return d(_(f(x)))}}function Cn(f){var d=this;return function(_){return f(_)(d(_))}}function kt(f){var d=this;return function(_){return f(d(_))(_)}}function Kn(f){var d=this;return function(_){return f(function(x){return d(ee(_,x))})}}function Yn(f){var d=this;return function(_){return d(f(_))}}var qn={Null:{prototype:{"fantasy-land/equals":En,"fantasy-land/lte":Wt}},Undefined:{prototype:{"fantasy-land/equals":Hn,"fantasy-land/lte":Nn}},Boolean:{prototype:{"fantasy-land/equals":pt,"fantasy-land/lte":Nt}},Number:{prototype:{"fantasy-land/equals":Mt,"fantasy-land/lte":Pe}},Date:{prototype:{"fantasy-land/equals":It,"fantasy-land/lte":cn}},RegExp:{prototype:{"fantasy-land/equals":tt}},String:{"fantasy-land/empty":zt,prototype:{"fantasy-land/equals":Ot,"fantasy-land/lte":he,"fantasy-land/concat":Xe}},Array:{"fantasy-land/empty":Pt,"fantasy-land/of":Oe,"fantasy-land/chainRec":Zt,"fantasy-land/zero":ln,prototype:{"fantasy-land/equals":Ct,"fantasy-land/lte":On,"fantasy-land/concat":Ye,"fantasy-land/filter":xn,"fantasy-land/map":Ln,"fantasy-land/ap":Jt,"fantasy-land/chain":en,"fantasy-land/alt":fn,"fantasy-land/reduce":pn,"fantasy-land/traverse":Pn,"fantasy-land/extend":Rn}},Arguments:{prototype:{"fantasy-land/equals":hn,"fantasy-land/lte":qt}},Error:{prototype:{"fantasy-land/equals":h}},Object:{"fantasy-land/empty":E,"fantasy-land/zero":k,prototype:{"fantasy-land/equals":Q,"fantasy-land/lte":Ie,"fantasy-land/concat":Te,"fantasy-land/filter":D,"fantasy-land/map":C,"fantasy-land/ap":K,"fantasy-land/alt":De,"fantasy-land/reduce":Ce,"fantasy-land/traverse":_t}},Function:{"fantasy-land/id":Xt,"fantasy-land/of":dn,"fantasy-land/chainRec":Tn,prototype:{"fantasy-land/equals":tn,"fantasy-land/compose":Gn,"fantasy-land/map":$n,"fantasy-land/promap":Vt,"fantasy-land/ap":Cn,"fantasy-land/chain":kt,"fantasy-land/extend":Kn,"fantasy-land/contramap":Yn}}},Ae=(function(){var f=[];return function(_,x){if(!te(_,x))return!1;if(f.some(function(Z){return Z[0]===_&&Z[1]===x}))return!0;f.push([_,x]);try{return be.test(_)&&be.test(x)&&be.methods.equals(_)(x)}finally{f.pop()}}})();function Mn(f,d){return te(f,d)&&!ot(d,f)}var ot=(function(){var f=[];return function(_,x){if(!te(_,x))return!1;if(f.some(function(Z){return Z[0]===_&&Z[1]===x}))return Ae(_,x);f.push([_,x]);try{return ne.test(_)&&ne.test(x)&&ne.methods.lte(_)(x)}finally{f.pop()}}})();function Qn(f,d){return Mn(d,f)}function Zn(f,d){return ot(d,f)}function nn(f,d){return ot(f,d)?f:d}function Ht(f,d){return ot(f,d)?d:f}function yn(f,d,_){return Ht(f,nn(d,_))}function R(f,d){return pe.methods.compose(d)(f)}function H(f){return w.methods.id(f)()}function ee(f,d){return we.methods.concat(f)(d)}function re(f){return Ge.methods.empty(f)()}function qe(f){return Be.methods.invert(f)()}function ut(f,d){return Ze.methods.filter(d)(f)}function Y(f,d){return ut(function(_){return!f(_)},d)}function xt(f,d){return Le.methods.map(d)(f)}function at(f,d){return Le.methods.map(f)(V(d))}function ht(f,d,_){return Ne.methods.bimap(_)(f,d)}function dt(f,d){return ht(f,S,d)}function Un(f,d,_){return ye.methods.promap(_)(f,d)}function Gt(f,d){return et.methods.ap(d)(f)}function yt(f,d,_){return Gt(xt(f,d),_)}function Dn(f,d,_,x){return Gt(Gt(xt(f,d),_),x)}function In(f,d){return yt(i,f,d)}function rn(f,d){return yt(i(S),f,d)}function St(f,d){return y.methods.of(f)(d)}function kn(f,d){return ee(d,St(d.constructor,f))}function vt(f,d){return ee(St(d.constructor,f),d)}function Fn(f,d){return Ue.methods.chain(d)(f)}function Rt(f){return Fn(S,f)}function ae(f,d,_){return A.methods.chainRec(f)(d,_)}function an(f,d){return Re.methods.alt(f)(d)}function We(f){return Ke.methods.zero(f)()}function de(f,d,_){return Qt.methods.reduce(_)(f,d)}function $t(f){return Array.isArray(f)?f.length:de(function(d,_){return d+1},0,f)}function At(f,d){return Array.isArray(d)?d.every(X(f)):de(function(_,x){return _&&f(x)},!0,d)}function on(f,d){return Array.isArray(d)?d.some(X(f)):de(function(_,x){return _||f(x)},!1,d)}function gn(f,d){return!on(f,d)}function j(f,d){return on(function(_){return Ae(f,_)},d)}function z(f,d){var _=de(function(x,Z){return{empty:!1,value:ee(x.value,x.empty?Z:ee(f,Z))}},{empty:!0,value:re(f.constructor)},d);return _.value}function ce(f,d,_){return de(function(x,Z){return ee(x,d(Z))},re(f),_)}function Se(f){if(Array.isArray(f))return f.slice().reverse();var d=f.constructor;return de(function(_,x){return ee(St(d,x),_)},re(d),f)}function c(f){return p(S,f)}function p(f,d){var _=de(function(Fe,xe){return Fe.push({idx:Fe.length,x:xe,fx:f(xe)}),Fe},[],d),x=(function(Fe){switch(typeof(Fe&&Fe.fx)){case"number":return function(xe,st){return xe<=st||xe!==xe};case"string":return function(xe,st){return xe<=st};default:return ot}})(_[0]);if(_.sort(function(Fe,xe){return x(Fe.fx,xe.fx)?x(xe.fx,Fe.fx)?Fe.idx-xe.idx:-1:1}),Array.isArray(d)){for(var Z=0;Z<_.length;Z+=1)_[Z]=_[Z].x;return _}var ke=d.constructor,gt=re(ke);for(Z=0;Z<_.length;Z+=1)gt=ee(gt,St(ke,_[Z].x));return gt}function m(f,d,_){return Bt.methods.traverse(_)(f,d)}function F(f,d){return m(f,S,d)}function ge(f,d){return rt.methods.extend(d)(f)}function Ve(f){return ge(S,f)}function mn(f){return it.methods.extract(f)()}function Wn(f,d){return Lt.methods.contramap(d)(f)}return{TypeClass:ve,Setoid:be,Ord:ne,Semigroupoid:pe,Category:w,Semigroup:we,Monoid:Ge,Group:Be,Filterable:Ze,Functor:Le,Bifunctor:Ne,Profunctor:ye,Apply:et,Applicative:y,Chain:Ue,ChainRec:A,Monad:$,Alt:Re,Plus:Ke,Alternative:An,Foldable:Qt,Traversable:Bt,Extend:rt,Comonad:it,Contravariant:Lt,equals:Ae,lt:Mn,lte:ot,gt:Qn,gte:Zn,min:nn,max:Ht,clamp:yn,compose:R,id:H,concat:ee,empty:re,invert:qe,filter:ut,reject:Y,map:xt,flip:at,bimap:ht,mapLeft:dt,promap:Un,ap:Gt,lift2:yt,lift3:Dn,apFirst:In,apSecond:rn,of:St,append:kn,prepend:vt,chain:Fn,join:Rt,chainRec:ae,alt:an,zero:We,reduce:de,size:$t,all:At,any:on,none:gn,elem:j,intercalate:z,foldMap:ce,reverse:Se,sort:c,sortBy:p,traverse:m,sequence:F,extend:ge,duplicate:Ve,extract:mn,contramap:Wn}})})(la)),la.exports}var hi;function Xo(){return hi||(hi=1,(function(n){(function(t){n.exports=t(ea,Rr(),Tr())})(function(t,e,r){if(typeof __doctest<"u"){var a=__doctest.require("sanctuary");__doctest.require("sanctuary-def"),__doctest.require("sanctuary-type-identifiers"),a.bimap=a.unchecked.bimap,a.of=a.unchecked.of}var i="sanctuary-either/Either@1",u={},o={constructor:u,isLeft:!0,isRight:!1,"@@type":i,"@@show":se,"fantasy-land/map":T,"fantasy-land/bimap":be,"fantasy-land/ap":pe,"fantasy-land/chain":we,"fantasy-land/alt":Be,"fantasy-land/reduce":Le,"fantasy-land/traverse":ye,"fantasy-land/extend":y},S={constructor:u,isLeft:!1,isRight:!0,"@@type":i,"@@show":ue,"fantasy-land/map":L,"fantasy-land/bimap":ne,"fantasy-land/ap":w,"fantasy-land/chain":Ge,"fantasy-land/alt":Ze,"fantasy-land/reduce":Ne,"fantasy-land/traverse":et,"fantasy-land/extend":Ue},I=t.inspect.custom;typeof I=="symbol"?(o[I]=se,S[I]=ue):(o.inspect=se,S.inspect=ue);var te=u.Left=function(A){var $=Object.create(o);return r.Setoid.test(A)&&($["fantasy-land/equals"]=ve,r.Ord.test(A)&&($["fantasy-land/lte"]=fe)),r.Semigroup.test(A)&&($["fantasy-land/concat"]=l),$.value=A,$},G=u.Right=function($){var Re=Object.create(S);return r.Setoid.test($)&&(Re["fantasy-land/equals"]=J,r.Ord.test($)&&(Re["fantasy-land/lte"]=je)),r.Semigroup.test($)&&(Re["fantasy-land/concat"]=b),Re.value=$,Re};u["fantasy-land/of"]=G;function V(A){return{tag:V,value:A}}function X(A){return{tag:X,value:A}}u["fantasy-land/chainRec"]=function(A,$){for(var Re=V($);Re.tag===V;){var Ke=A(V,X,Re.value);if(Ke.isLeft)return Ke;Re=Ke.value}return G(Re.value)};function se(){return"Left ("+e(this.value)+")"}function ue(){return"Right ("+e(this.value)+")"}function ve(A){return A.isLeft&&r.equals(this.value,A.value)}function J(A){return A.isRight&&r.equals(this.value,A.value)}function fe(A){return A.isRight||r.lte(this.value,A.value)}function je(A){return A.isRight&&r.lte(this.value,A.value)}function l(A){return A.isLeft?te(r.concat(this.value,A.value)):A}function b(A){return A.isRight?G(r.concat(this.value,A.value)):this}function T(A){return this}function L(A){return G(A(this.value))}function be(A,$){return te(A(this.value))}function ne(A,$){return G($(this.value))}function pe(A){return A.isLeft?A:this}function w(A){return A.isLeft?A:G(A.value(this.value))}function we(A){return this}function Ge(A){return A(this.value)}function Be(A){return A}function Ze(A){return this}function Le(A,$){return $}function Ne(A,$){return A($,this.value)}function ye(A,$){return r.of(A,this)}function et(A,$){return r.map(G,$(this.value))}function y(A){return this}function Ue(A){return G(A(this))}return u})})(sa)),sa.exports}var di;function uh(){return di||(di=1,(function(n){var t={};(function(e){n.exports=e(ea,Xo(),Rr(),Tr(),Wa())})(function(e,r,a,i,u){var o=Math.pow(2,53)-1,S=-o,I=Array.prototype.slice,te=Object.prototype.hasOwnProperty,G=Object.prototype.toString,V=typeof e.inspect.custom=="symbol"?e.inspect.custom:"inspect",X=r.Left,se=r.Right;function ue(s){return function(g){return function(O){return s(g(O))}}}function ve(s){return s}function J(s){return function(g){return s}}function fe(s){return function(){return s}}function je(s){return function(g,O){return s}}function l(s){return function(g){return!s(g)}}function b(s){return function(g){return i.filter(s,g)}}function T(s){return s.slice(0,-1)}function L(s){return i.size(s)===0}function be(s){return function(g){if(s.length>g.length)return!1;for(var O=0;O<s.length;O+=1)if(s[O]!==g[O])return!1;return!0}}function ne(s,g){return g.join(s)}function pe(s){return s[s.length-1]}function w(s){return function(g){return s.some(function(O){return i.equals(O,g)})}}function we(s,g){return L(s)?g:s}function Ge(s){return function(g){return g[s]}}function Be(s){return function(g){return i.size(g)===s}}function Ze(s,g){return ne(s,Array(g+1))}function Le(s){return function(g){return Ze(s,g.length)}}var Ne=Le(" ");function ye(s){return Object.keys(s).sort()}function et(s){return Array.isArray(s)?s:i.reduce(function(g,O){return g.push(O),g},[],s)}function y(s,g,O,N){return L(N)?s:i.reduce(function(M,B){return M+"  - "+O(B)+`
`},g,N)}function Ue(s){return s.replace(/[ ]+$/gm,"")}function A(s){return function(g){return function(O){return s?g(O):O}}}function $(s){return function(g){return function(O){return s+O+g}}}function Re(s){return $(s("("))(s(")"))}var Ke=$("‘")("’");function An(s){return s.name.slice(s.name.indexOf("/")+1)}function Qt(s){return function(g){return function O(N){return N.supertypes.every(O)&&N._test(s)(g)}}}var Bt={"@@type":"sanctuary-def/Type@1","@@show":function(){return this.format(ve,J(ve))},validate:function(s){var g=Qt(s),O=this;return function(N){if(!g(N)(O))return X({value:N,propPath:[]});for(var M=0;M<O.keys.length;M+=1)for(var B=O.keys[M],U=O.types[B],ie=O.extractors[B](N),P=0;P<ie.length;P+=1){var q=U.validate(s)(ie[P]);if(q.isLeft)return X({value:q.value.value,propPath:i.concat([B],q.value.propPath)})}return se(N)}},"fantasy-land/equals":function(s){return i.equals(this.type,s.type)&&i.equals(this.name,s.name)&&i.equals(this.url,s.url)&&i.equals(this.supertypes,s.supertypes)&&i.equals(this.keys,s.keys)&&i.equals(this.types,s.types)}};function rt(s,g,O,N,M,B,U,ie){var P=Object.create(Bt);return P._test=U,P._extractors=ie.reduce(function(q,Ee){return q[Ee[0]]=Ee[1],q},{}),P.arity=N,P.extractors=i.map(ue(et),P._extractors),P.format=M||function(q,Ee){return i.reduce(function($e,Qe){return $e+q(" ")+A(Qe[2].arity>0)(Re(q))(Ee(Qe[0])(a(Qe[2])))},q(g),ie)},P.keys=ie.map(function(q){return q[0]}),P.name=g,P.supertypes=B,P.type=s,P.types=ie.reduce(function(q,Ee){return q[Ee[0]]=Ee[2],q},{}),P.url=O,P}var it="BINARY",Lt="FUNCTION",En="INCONSISTENT",Wt="NO_ARGUMENTS",Hn="NULLARY",Nn="RECORD",pt="UNARY",Nt="UNKNOWN",Mt="VARIABLE",Pe=rt(En,"","",0,je("???"),[],J(J(!1)),[]),It=rt(Wt,"","",0,je("()"),[],J(J(!0)),[]);function cn(s){return function(g){return g.arity>=s}}function tt(s){return function(g){return u(g)===s}}function zt(s){return function(g){return typeof g===s}}function Ot(s){var g="0.22.0";return"https://github.com/sanctuary-js/sanctuary-def/tree/v"+g+"#"+s}var he=i.ap(an,Ot),Xe=i.ap(We,Ot),Pt=i.ap($t,Ot),Oe=rt(Nt,"","",0,je("Unknown"),[],J(J(!0)),[]),Zt=he("Void")([])(J(!1)),ln=he("Any")([])(J(!0)),Ct=he("Function")([])(zt("function")),On=he("Arguments")([])(tt("Arguments")),Ye=Xe("Array")([])(tt("Array"))(ve),xn=he("Array0")([Ye(Oe)])(Be(0)),Ln=Xe("Array1")([Ye(Oe)])(Be(1))(ve),Jt=Pt("Array2")([Ye(Oe)])(Be(2))(function(s){return[s[0]]})(function(s){return[s[1]]}),en=he("Boolean")([])(zt("boolean")),fn=he("Buffer")([])(function(s){return typeof Buffer<"u"&&Buffer.isBuffer(s)}),pn=he("Date")([])(tt("Date")),Pn=he("ValidDate")([pn])(ue(l(isNaN))(Number)),Rn=Xe("Descending")([])(tt("sanctuary-descending/Descending@1"))(ve),hn=Pt("Either")([])(tt("sanctuary-either/Either@1"))(function(s){return s.isLeft?[s.value]:[]})(function(s){return s.isLeft?[]:[s.value]}),qt=he("Error")([])(tt("Error"));function h(s){return function(g){return E([s,g])}}function E(s){var g=i.reduce(function(N,M){return N.push(["$"+a(N.length+1),J([]),M]),N},[],s);function O(N,M){return A(g.length!==2)(Re(N))(ne(N(", "),i.map(function(B){return A(B[2].type===Lt)(Re(N))(M(B[0])(a(B[2])))},T(g))))+N(" -> ")+M(pe(g)[0])(a(pe(g)[2]))}return rt(Lt,"","",s.length,O,[Ct],J(J(!0)),g)}var k=he("HtmlElement")([])(function(s){return/^\[object HTML.+Element\]$/.test(G.call(s))}),Q=Xe("Identity")([])(tt("sanctuary-identity/Identity@1"))(ve),Ie=Pt("JsMap")([])(function(s){return G.call(s)==="[object Map]"})(function(s){return Array.from(s.keys())})(function(s){return Array.from(s.values())}),Te=Xe("JsSet")([])(function(s){return G.call(s)==="[object Set]"})(function(s){return Array.from(s.values())}),D=Xe("Maybe")([])(tt("sanctuary-maybe/Maybe@1"))(ve),C=he("Module")([])(function(s){return G.call(s)==="[object Module]"}),K=Xe("NonEmpty")([])(function(s){return i.Monoid.test(s)&&i.Setoid.test(s)&&!i.equals(s,i.empty(s.constructor))})(function(s){return[s]}),De=he("Null")([])(tt("Null")),Ce=Xe("Nullable")([])(J(!0))(function(s){return s===null?[]:[s]}),_t=he("Number")([])(zt("number"));function Xt(s){return s!==0}function dn(s){return s>=0}function Tn(s){return s>0}function tn(s){return s<0}var Gn=he("PositiveNumber")([_t])(Tn),$n=he("NegativeNumber")([_t])(tn),Vt=he("ValidNumber")([_t])(l(isNaN)),Cn=he("NonZeroValidNumber")([Vt])(Xt),kt=he("FiniteNumber")([Vt])(isFinite),Kn=he("NonZeroFiniteNumber")([kt])(Xt),Yn=he("PositiveFiniteNumber")([kt])(Tn),qn=he("NegativeFiniteNumber")([kt])(tn),Ae=he("Integer")([Vt])(function(s){return Math.floor(s)===s&&s>=S&&s<=o}),Mn=he("NonZeroInteger")([Ae])(Xt),ot=he("NonNegativeInteger")([Ae])(dn),Qn=he("PositiveInteger")([Ae])(Tn),Zn=he("NegativeInteger")([Ae])(tn),nn=he("Object")([])(tt("Object")),Ht=Pt("Pair")([])(tt("sanctuary-pair/Pair@1"))(function(s){return[s.fst]})(function(s){return[s.snd]}),yn=he("RegExp")([])(tt("RegExp")),R=he("GlobalRegExp")([yn])(Ge("global")),H=he("NonGlobalRegExp")([yn])(l(Ge("global"))),ee=Xe("StrMap")([nn])(J(!0))(ve),re=he("String")([])(zt("string")),qe=he("RegexFlags")([re])(function(s){return/^g?i?m?$/.test(s)}),ut=he("Symbol")([])(zt("symbol")),Y=he("Type")([])(tt("sanctuary-def/Type@1")),xt=he("TypeClass")([])(tt("sanctuary-type-classes/TypeClass@1")),at=he("Undefined")([])(tt("Undefined")),ht=[Ct,On,Ye(Oe),Jt(Oe)(Oe),en,fn,pn,Rn(Oe),hn(Oe)(Oe),qt,h(Oe)(Oe),k,Q(Oe),Ie(Oe)(Oe),Te(Oe),D(Oe),C,De,_t,nn,Ht(Oe)(Oe),yn,ee(Oe),re,ut,Y,xt,at];function dt(s){return an(s)("")([])(J(!0))}var Un=typeof process<"u"&&process!=null&&t!=null&&!0,Gt=["zero","one","two","three","four","five","six","seven","eight","nine"];function yt(s){return(s<Gt.length?Gt[s]:a(s))+" "+(s===1?"argument":"arguments")}function Dn(s){return function(g){return function(O){return function(N){return function(M){return M.type===Nt?In(s,g,N(O)):[M]}}}}}function In(s,g,O){var N=Dn(s);function M(B,U){var ie;if(typeof U=="object"&&U!=null||typeof U=="function"){if(g.indexOf(U)>=0)return[];ie=i.concat(g,[U])}else ie=g;var P=N(ie)(U);return i.chain(function(q){return q.validate(s)(U).isLeft?[]:q.type===pt?i.map(de(q),P(q.extractors.$1)(q.types.$1)):q.type===it?i.lift2(At(q),P(q.extractors.$1)(q.types.$1),P(q.extractors.$2)(q.types.$2)):[q]},B)}return L(O)?[Oe]:we(i.reduce(M,s,O),[Pe])}function rn(s){return s.type===pt?rn(s.types.$1):s.type===it?rn(s.types.$1)&&rn(s.types.$2):s.type!==En}function St(s,g){return i.filter(rn,In(s,[],g))}function kn(s,g){return i.reject(function(O){return O.type===En},In(s,[],g))}function vt(s,g,O,N,M,B){var U={};for(var ie in g){var P=g[ie],q={types:P.types.slice(),valuesByPath:{}};for(var Ee in P.valuesByPath)q.valuesByPath[Ee]=P.valuesByPath[Ee].slice();U[ie]=q}te.call(U,O.name)||(U[O.name]={types:i.filter(cn(O.arity),s),valuesByPath:{}});var $e=JSON.stringify(i.concat([N],M));te.call(U[O.name].valuesByPath,$e)||(U[O.name].valuesByPath[$e]=[]);var Qe=ae(s),ct=ue(ue(ue(b(rn))))(Dn(s)([]));return B.forEach(function(Et){var Tt=ct(Et);U[O.name].valuesByPath[$e].push(Et),U[O.name].types=i.chain(function(Me){return Qe(Me)(Et)?O.arity===0&&Me.type===pt?i.map(de(Me),Tt(Me.extractors.$1)(Me.types.$1)):O.arity===0&&Me.type===it?i.lift2(At(Me),Tt(Me.extractors.$1)(Me.types.$1),Tt(Me.extractors.$2)(Me.types.$2)):[Me]:[]},U[O.name].types)}),U}function Fn(s,g){var O=i.map(JSON.parse,ye(g));return x(s,J(J(Ne)),function(N){return function(M){return function(B){return function(U){var ie=i.concat([N],U);return function(P){if(O.some(be(ie))){var q=JSON.stringify(ie);if(!te.call(g,q))return P;if(!L(g[q]))return M(P)}return Ne(P)}}}}})}function Rt(s,g,O,N,M,B,U){for(var ie=Rt,P=0;P<U.length;P+=1){var q=N.validate(s)(U[P]);if(q.isLeft)return X(function(){return st(s,g,M,i.concat(B,q.value.propPath),q.value.value)})}switch(N.type){case Mt:var Ee=N.name,$e=g.constraints;if(te.call($e,Ee)){var Qe=$e[Ee];for(P=0;P<U.length;P+=1)for(var ct=0;ct<Qe.length;ct+=1)if(!Qe[ct].test(U[P]))return X(function(){return Fe(s,g,Qe[ct],M,B,U[P])})}var Et=vt(s,O,N,M,B,U),Tt=Et[Ee].types;return L(Tt)?X(function(){return xe(s,g,M,B,Et[Ee].valuesByPath)}):i.reduce(function(Me,bt){return i.chain(function(Ft){var sn=bt.arity-N.arity;return N.keys.reduce(function(ta,Ir,Yo){var Qo=bt.extractors[bt.keys[sn+Yo]];return i.reduce(function(Zo,eu){return i.chain(function(tu){return ie(s,g,tu.typeVarMap,N.types[Ir],M,i.concat(B,[Ir]),[eu])},Zo)},ta,i.chain(Qo,U))},se(Ft))},Me)},se({typeVarMap:Et,types:Tt}),Tt);case pt:return i.map(function(Me){return{typeVarMap:Me.typeVarMap,types:i.map(de(N),we(Me.types,[N.types.$1]))}},ie(s,g,O,N.types.$1,M,i.concat(B,["$1"]),i.chain(N.extractors.$1,U)));case it:return i.chain(function(Me){var bt=Me.types;return i.map(function(Ft){var sn=Ft.types;return{typeVarMap:Ft.typeVarMap,types:i.lift2(At(N),we(bt,[N.types.$1]),we(sn,[N.types.$2]))}},ie(s,g,Me.typeVarMap,N.types.$2,M,i.concat(B,["$2"]),i.chain(N.extractors.$2,U)))},ie(s,g,O,N.types.$1,M,i.concat(B,["$1"]),i.chain(N.extractors.$1,U)));case Nn:return i.reduce(function(Me,bt){return i.chain(function(Ft){return ie(s,g,Ft.typeVarMap,N.types[bt],M,i.concat(B,[bt]),i.chain(N.extractors[bt],U))},Me)},se({typeVarMap:O,types:[N]}),N.keys);default:return se({typeVarMap:O,types:[N]})}}function ae(s){return function(g){return function(O){var N={name:"name",constraints:{},types:[g]};return Rt(s,N,{},g,0,[],[O]).isRight}}}function an(s){return function(g){return function(O){return function(N){return rt(Hn,s,g,0,null,O,J(N),[])}}}}function We(s){return function(g){return function(O){return function(N){return function(M){return function(B){return rt(pt,s,g,1,null,O,J(N),[["$1",M,B]])}}}}}}function de(s){return We(s.name)(s.url)(s.supertypes)(s._test([]))(s._extractors.$1)}function $t(s){return function(g){return function(O){return function(N){return function(M){return function(B){return function(U){return function(ie){return rt(it,s,g,2,null,O,J(N),[["$1",M,U],["$2",B,ie]])}}}}}}}}function At(s){return $t(s.name)(s.url)(s.supertypes)(s._test([]))(s._extractors.$1)(s._extractors.$2)}function on(s){return function(g){return ue(an(s)(g)([]))(w)}}function gn(s){var g=ye(s);function O(B,U){if(L(g))return B("{}");var ie=i.map(function(P){var q=s[P];return B(" ")+B(/^(?!\d)[$\w]+$/.test(P)?P:a(P))+B(" :: ")+U(P)(a(q))},g);return $(B("{"))(B(" }"))(ne(B(","),ie))}function N(B){return function(U){if(U==null)return!1;var ie={};g.forEach(function(q){ie[q]=q});for(var P in U)delete ie[P];return L(ie)}}var M=g.map(function(B){return[B,function(U){return[U[B]]},s[B]]});return rt(Nn,"","",0,O,[],N,M)}function j(s){return function(g){return function(O){return function(N){var M=ye(N);function B(P,q){return P(s)}function U(P){var q=Qt(P);return function(Ee){if(Ee==null)return!1;var $e={};M.forEach(function(ct){$e[ct]=ct});for(var Qe in Ee)delete $e[Qe];return L($e)&&M.every(function(ct){return q(Ee[ct])(N[ct])})}}var ie=M.map(function(P){return[P,function(q){return[q[P]]},N[P]]});return rt(Nn,s,g,0,B,O,U,ie)}}}}function z(s){var g=cn(s);return function(O){var N=Qt(O);return function(M){var B=N(M);return O.some(function(U){return g(U)&&B(U)})}}}function ce(s){var g=[],O=z(g.length);return rt(Mt,s,"",0,je(s),[],O,g)}function Se(s){return function(g){var O=[["$1",J([]),g]],N=z(O.length);return rt(Mt,s,"",1,null,[],N,O)}}function c(s){return function(g){return function(O){var N=[["$1",J([]),g],["$2",J([]),O]],M=z(N.length);return rt(Mt,s,"",2,null,[],M,N)}}}function p(s){return E([s])}function m(s){return h(s)(en)}function F(s,g,O,N){return new TypeError(Ue(Ke(s.name)+` applied to the wrong number of arguments

`+x(s,J(J(Ne)),function(M){return function(B){return J(J(M===g?B:Ne))}})+`
Expected `+yt(O)+" but received "+yt(N.length)+y(`.
`,`:

`,a,N)))}function ge(s,g,O){var N=[];return ye(s).forEach(function(M){var B=O(M);s[M].forEach(function(U){N.push(B(U)(An(U)+" "+M))})}),A(N.length>0)($("")(g(" => ")))(A(N.length>1)(Re(g))(ne(g(", "),N)))}function Ve(s){return function(g){var O=g.length-s.length;return Ze(" ",Math.floor(O/2))+s+Ze(" ",Math.ceil(O/2))}}function mn(s){return i.concat(s.type===Mt?[s.name]:[],i.chain(function(g){return mn(s.types[g])},s.keys))}function Wn(s){var g=i.chain(mn,s);return function(O){var N=97;return A(O.type===Lt)(Re(ve))(a(O).replace(/\bUnknown\b/g,function(){do var M=String.fromCharCode(N++);while(g.indexOf(M)>=0);return M}))}}function f(s,g,O,N){var M=Wn(g.types);return a(N)+")  "+ne(`
    `,i.map(function(B){return a(B)+" :: "+ne(", ",we(i.map(M,kn(s,[B])),["(no types)"]))},O))}function d(s){return s.name+" :: "+ge(s.constraints,ve,J(J(ve)))+ne(" -> ",i.map(Wn(s.types),s.types))}function _(s,g,O){return O(s)(g)(s.format(Ne,function(N){return J(_(s.types[N],i.concat(g,[N]),O))}))}function x(s,g,O){var N=s.types.reduce(function(M,B,U){var ie=ue(A(B.type===Lt)(Re(Ne)))(ue(function(P){return _(B,[],P)})(O(U)));return M.carets.push(ie(Le("^"))),M.numbers.push(ie(function(P){return Ve(a(M.counter+=1))(P)})),M},{carets:[],numbers:[],counter:0});return d(s)+`
`+Ne(s.name+" :: ")+ge(s.constraints,Ne,g)+ne(Ne(" -> "),N.carets)+`
`+Ne(s.name+" :: ")+ge(s.constraints,Ne,J(J(Ne)))+ne(Ne(" -> "),N.numbers)+`
`}function Z(s,g){return i.reduce(function(O,N){return O.types[N]},s,g)}function ke(s){return function(g){return function(O){return function(N){return function(M){var B=i.concat([g],M),U=be(B)(s),ie=be(s)(B);return U&&ie?O:U?ve:Ne}}}}}function gt(s,g){return g.url==null||g.url===""?"":`
See `+g.url+" for information about the "+g.name+" "+s+`.
`}function Fe(s,g,O,N,M,B,U){var ie=Z(g.types[N],M);return new TypeError(Ue(`Type-class constraint violation

`+x(g,function(P){return function(q){return P===ie.name&&q.name===O.name?Le("^"):Ne}},ke(i.concat([N],M)))+`
`+f(s,g,[B],1)+`

`+Ke(g.name)+" requires "+Ke(ie.name)+" to satisfy the "+An(O)+` type-class constraint; the value at position 1 does not.
`+gt("type class",O)))}function xe(s,g,O,N,M){var B=JSON.stringify(i.concat([O],N)),U=M[B],ie=i.filter(function(q){var Ee=M[q];return q===B||L(St(s,i.concat(U,Ee)))},ye(M)),P=Fn(g,i.reduce(function(q,Ee){return q[Ee]=M[Ee],q},{},ie));return new TypeError(Ue(`Type-variable constraint violation

`+P+`
`+i.reduce(function(q,Ee){var $e=M[Ee];return L($e)?q:{idx:q.idx+1,s:q.s+f(s,g,$e,q.idx+1)+`

`}},{idx:0,s:""},ie).s+`Since there is no type of which all the above values are members, the type-variable constraint has been violated.
`))}function st(s,g,O,N,M){var B=Z(g.types[O],N),U=x(g,J(J(Ne)),ke(i.concat([O],N)));return new TypeError(Ue(B.type===Mt&&L(kn(s,[M]))?`Unrecognized value

`+U+`
`+f(s,g,[M],1)+`

`+y(`The environment is empty! Polymorphic functions require a non-empty environment.
`,`The value at position 1 is not a member of any type in the environment.

The environment contains the following types:

`,Wn(g.types),s):`Invalid value

`+U+`
`+f(s,g,[M],1)+`

The value at position 1 is not a member of `+Ke(a(B))+`.
`+gt(cn(1)(B)?"type constructor":"type",B)))}function ir(s,g,O,N){return new TypeError(Ue(Ke(s.name)+" applied "+Ke(a(s.types[g]))+` to the wrong number of arguments

`+x(s,J(J(Ne)),function(M){return function(B){return function(U){return function(ie){return function(P){return M===g?U.format(Ne,function(q){return q==="$1"?B:Ne}):Ne(P)}}}}})+`
Expected `+yt(O)+" but received "+yt(N.length)+y(`.
`,`:

`,a,N)))}function un(s){if(s.isLeft)throw s.value();return s.value}function Ko(s,g,O){var N=g.types.length-1;function M(ie,P,q){var Ee=g.types[P];if(Ee.type!==Lt)return q;function $e(ct,Et,Tt,Me){var bt=[Tt],Ft=Ee.types[Tt];return Ft.type===Mt?i.chain(function(sn){return L(sn[Ft.name].types)?X(function(){return xe(s,g,Et,bt,sn[Ft.name].valuesByPath)}):se(sn)},se(vt(s,ct,Ft,Et,bt,[Me]))):i.map(function(sn){return sn.typeVarMap},Rt(s,g,ct,Ft,Et,bt,[Me]))}var Qe=ie;return function(ct){if(arguments.length!==Ee.arity-1)throw ir(g,P,Ee.arity-1,I.call(arguments));var Et=arguments;Qe=un(T(Ee.keys).reduce(function(bt,Ft,sn){var ta=Et[sn];return i.chain(function(Ir){return $e(Ir,P,Ft,ta)},bt)},se(Qe)));var Tt=q.apply(this,arguments),Me=pe(Ee.keys);return Qe=un($e(Qe,P,Me,Tt)),Tt}}function B(ie,P,q){return function(Ee){var $e=I.call(arguments);if($e.length!==1)throw F(g,q,1,$e);var Qe=un(Rt(s,g,ie,g.types[q],q,[],$e)).typeVarMap,ct=i.concat(P,$e);if(q+1===N){var Et=ct.reduce(function(Tt,Me,bt){return Tt(M(Qe,bt,Me))},O);return Qe=un(Rt(s,g,Qe,g.types[N],N,[],[Et])).typeVarMap,M(Qe,N,Et)}else return B(Qe,ct,q+1)}}var U=g.types[0].type===Wt?function(){if(arguments.length!==0)throw F(g,0,0,I.call(arguments));var ie=O(),P=un(Rt(s,g,{},g.types[N],N,[],[ie])).typeVarMap;return M(P,N,ie)}:B({},[],0);return U[V]=U.toString=fe(d(g)),U}var za=[re,ee(Ye(xt)),K(Ye(Y)),Ct,Ct];function Ja(s){function g(O){return function(N){return function(M){return function(B){return s.checkTypes?Ko(s.env,{name:O,constraints:N,types:M.length===1?i.concat([It],M):M},B):B}}}}return g(g.name)({})(za)(g)}var nt=Ja({checkTypes:!Un,env:ht});function zn(s){var g=s(Oe);return nt(g.name)({})([Y,Y])(de(g))}function Mr(s){var g=s(Oe)(Oe);return nt(g.name)({})([Y,Y,Y])(At(g))}return{Any:ln,AnyFunction:Ct,Arguments:On,Array:zn(Ye),Array0:xn,Array1:zn(Ln),Array2:Mr(Jt),Boolean:en,Buffer:fn,Date:pn,ValidDate:Pn,Descending:zn(Rn),Either:Mr(hn),Error:qt,Fn:nt("Fn")({})([Y,Y,Y])(h),Function:nt("Function")({})([K(Ye(Y)),Y])(E),HtmlElement:k,Identity:zn(Q),JsMap:Mr(Ie),JsSet:zn(Te),Maybe:zn(D),Module:C,NonEmpty:K,Null:De,Nullable:zn(Ce),Number:_t,PositiveNumber:Gn,NegativeNumber:$n,ValidNumber:Vt,NonZeroValidNumber:Cn,FiniteNumber:kt,NonZeroFiniteNumber:Kn,PositiveFiniteNumber:Yn,NegativeFiniteNumber:qn,Integer:Ae,NonZeroInteger:Mn,NonNegativeInteger:ot,PositiveInteger:Qn,NegativeInteger:Zn,Object:nn,Pair:Mr(Ht),RegExp:yn,GlobalRegExp:R,NonGlobalRegExp:H,RegexFlags:qe,StrMap:zn(ee),String:re,Symbol:ut,Type:Y,TypeClass:xt,Undefined:at,Unknown:Oe,Void:Zt,env:ht,create:nt("create")({})([gn({checkTypes:en,env:Ye(Y)}),dt(ne(" -> ",i.map(a,za)))])(Ja),test:nt("test")({})([Ye(Y),Y,ln,en])(ae),NullaryType:nt("NullaryType")({})([re,re,Ye(Y),dt("(Any -> Boolean)"),Y])(an),UnaryType:nt("UnaryType")({f:[i.Foldable]})([re,re,Ye(Y),dt("(Any -> Boolean)"),dt("(t a -> f a)"),dt("Type -> Type")])(function(s){return ue(ue(ue(ue(nt(s)({})([Y,Y])))))(We(s))}),BinaryType:nt("BinaryType")({f:[i.Foldable]})([re,re,Ye(Y),dt("(Any -> Boolean)"),dt("(t a b -> f a)"),dt("(t a b -> f b)"),dt("Type -> Type -> Type")])(function(s){return ue(ue(ue(ue(ue(nt(s)({})([Y,Y,Y]))))))($t(s))}),EnumType:nt("EnumType")({})([re,re,Ye(ln),Y])(on),RecordType:nt("RecordType")({})([ee(Y),Y])(gn),NamedRecordType:nt("NamedRecordType")({})([K(re),re,Ye(Y),ee(Y),Y])(j),TypeVariable:nt("TypeVariable")({})([re,Y])(ce),UnaryTypeVariable:nt("UnaryTypeVariable")({})([re,dt("Type -> Type")])(function(s){return nt(s)({})([Y,Y])(Se(s))}),BinaryTypeVariable:nt("BinaryTypeVariable")({})([re,dt("Type -> Type -> Type")])(function(s){return nt(s)({})([Y,Y,Y])(c(s))}),Thunk:nt("Thunk")({})([Y,Y])(p),Predicate:nt("Predicate")({})([Y,Y])(m)}})})(ua)),ua.exports}var pa={exports:{}},yi;function sh(){return yi||(yi=1,(function(n){(function(t){n.exports=t(ea,Rr(),Tr())})(function(t,e,r){if(typeof __doctest<"u"){var a=__doctest.require("sanctuary");__doctest.require("sanctuary-def"),__doctest.require("sanctuary-type-identifiers"),a.empty=a.unchecked.empty,a.of=a.unchecked.of,a.zero=a.unchecked.zero}var i="sanctuary-maybe/Maybe@1",u={},o={constructor:u,isNothing:!0,isJust:!1,"@@type":i,"@@show":se,"fantasy-land/equals":ve,"fantasy-land/lte":fe,"fantasy-land/concat":l,"fantasy-land/filter":T,"fantasy-land/map":be,"fantasy-land/ap":pe,"fantasy-land/chain":we,"fantasy-land/alt":Be,"fantasy-land/reduce":Le,"fantasy-land/traverse":ye,"fantasy-land/extend":y},S={constructor:u,isNothing:!1,isJust:!0,"@@type":i,"@@show":ue,"fantasy-land/filter":L,"fantasy-land/map":ne,"fantasy-land/ap":w,"fantasy-land/chain":Ge,"fantasy-land/alt":Ze,"fantasy-land/reduce":Ne,"fantasy-land/traverse":et,"fantasy-land/extend":Ue},I=t.inspect.custom;typeof I=="symbol"?(o[I]=se,S[I]=ue):(o.inspect=se,S.inspect=ue);var te=u.Nothing=Object.create(o),G=u.Just=function(A){var $=Object.create(S);return r.Setoid.test(A)&&($["fantasy-land/equals"]=J,r.Ord.test(A)&&($["fantasy-land/lte"]=je)),r.Semigroup.test(A)&&($["fantasy-land/concat"]=b),$.value=A,$};u["fantasy-land/empty"]=function(){return te},u["fantasy-land/of"]=G;function V(A){return{tag:V,value:A}}function X(A){return{tag:X,value:A}}u["fantasy-land/chainRec"]=function(A,$){for(var Re=V($);Re.tag===V;){var Ke=A(V,X,Re.value);if(Ke.isNothing)return Ke;Re=Ke.value}return G(Re.value)},u["fantasy-land/zero"]=function(){return te};function se(){return"Nothing"}function ue(){return"Just ("+e(this.value)+")"}function ve(A){return A.isNothing}function J(A){return A.isJust&&r.equals(this.value,A.value)}function fe(A){return!0}function je(A){return A.isJust&&r.lte(this.value,A.value)}function l(A){return A}function b(A){return A.isJust?G(r.concat(this.value,A.value)):this}function T(A){return this}function L(A){return A(this.value)?this:te}function be(A){return this}function ne(A){return G(A(this.value))}function pe(A){return this}function w(A){return A.isJust?G(A.value(this.value)):A}function we(A){return this}function Ge(A){return A(this.value)}function Be(A){return A}function Ze(A){return this}function Le(A,$){return $}function Ne(A,$){return A($,this.value)}function ye(A,$){return r.of(A,this)}function et(A,$){return r.map(G,$(this.value))}function y(A){return this}function Ue(A){return G(A(this))}return u})})(pa)),pa.exports}var ha={exports:{}},gi;function ch(){return gi||(gi=1,(function(n){(function(t){n.exports=t(ea,Rr(),Tr())})(function(t,e,r){if(typeof __doctest<"u"){var a=__doctest.require("sanctuary");__doctest.require("sanctuary-def"),__doctest.require("sanctuary-type-identifiers"),a.bimap=a.unchecked.bimap,a.compose=a.unchecked.compose}var i="sanctuary-pair/Pair@1",u={constructor:S,"@@type":i,"@@show":I,"fantasy-land/compose":V,"fantasy-land/map":se,"fantasy-land/bimap":ue,"fantasy-land/reduce":fe,"fantasy-land/traverse":je,"fantasy-land/extend":l,"fantasy-land/extract":b},o=t.inspect.custom;typeof o=="symbol"?u[o]=I:u.inspect=I,typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"&&(u[Symbol.iterator]=function(){return[this.fst,this.snd][Symbol.iterator]()});function S(T){return function(L){var be=Object.create(u);return r.Setoid.test(T)&&r.Setoid.test(L)&&(be["fantasy-land/equals"]=te,r.Ord.test(T)&&r.Ord.test(L)&&(be["fantasy-land/lte"]=G)),r.Semigroup.test(T)&&(r.Semigroup.test(L)&&(be["fantasy-land/concat"]=X),be["fantasy-land/ap"]=ve,be["fantasy-land/chain"]=J),be.fst=T,be.snd=L,be}}S.fst=function(T){return T.fst},S.snd=function(T){return T.snd},S.swap=function(T){return S(T.snd)(T.fst)};function I(){return"Pair ("+e(this.fst)+") ("+e(this.snd)+")"}function te(T){return r.equals(this.fst,T.fst)&&r.equals(this.snd,T.snd)}function G(T){return r.equals(this.fst,T.fst)?r.lte(this.snd,T.snd):r.lte(this.fst,T.fst)}function V(T){return S(this.fst)(T.snd)}function X(T){return S(r.concat(this.fst,T.fst))(r.concat(this.snd,T.snd))}function se(T){return S(this.fst)(T(this.snd))}function ue(T,L){return S(T(this.fst))(L(this.snd))}function ve(T){return S(r.concat(T.fst,this.fst))(T.snd(this.snd))}function J(T){var L=T(this.snd);return S(r.concat(this.fst,L.fst))(L.snd)}function fe(T,L){return T(L,this.snd)}function je(T,L){return r.map(S(this.fst),L(this.snd))}function l(T){return S(this.fst)(T(this))}function b(){return this.snd}return S})})(ha)),ha.exports}var mi;function Vo(){return mi||(mi=1,(function(n){var t={};(function(e){n.exports=e(uh(),Xo(),sh(),ch(),Rr(),Tr(),Wa())})(function(e,r,a,i,u,o,S){if(typeof __doctest<"u"){__doctest.require("sanctuary-descending"),__doctest.require("./test/internal/List").Nil,__doctest.require("./test/internal/List").Cons;var I=__doctest.require("./test/internal/Sum");(function(c){var p=c.create({checkTypes:!0,env:c.env.concat([__doctest.require("./test/internal/List").Type(e.Unknown),I.Type])});return p.env=c.env,p})(Vo())}var te=r.Left,G=r.Right,V=a.Nothing,X=a.Just;function se(c){return function(p){return function(m){return c(p(m))}}}function ue(c){return function(p){return function(m){return c(m)(p)}}}function ve(c){return se(function(p){return c in p?X(p[c]):V})(je)}function J(c){return function(p){return p[c]()}}function fe(c){return function(p){return function(m){return m[c](p)}}}function je(c){return c==null?Object.create(null):Object(c)}var l=e.TypeVariable("a"),b=e.TypeVariable("b"),T=e.TypeVariable("c"),L=e.TypeVariable("d"),be=e.TypeVariable("e"),ne=e.TypeVariable("g"),pe=e.TypeVariable("r"),w=e.UnaryTypeVariable("f"),we=e.UnaryTypeVariable("m"),Ge=e.UnaryTypeVariable("t"),Be=e.UnaryTypeVariable("w"),Ze=e.BinaryTypeVariable("p"),Le=e.BinaryTypeVariable("s");function Ne(c){return function(p){return function(m){var F=e.Fn(p)(m);return F.format=function(ge,Ve){return ge("Throwing "+u(c))+ge(" ")+Ve("$1")(u(p))+ge(" ")+Ve("$2")(u(m))},F}}}var ye=e.UnaryType("TypeRep")("https://github.com/fantasyland/fantasy-land#type-representatives")([])(Nt(!0))(Nt([])),et=e.RecordType({checkTypes:e.Boolean,env:e.Array(e.Any)}),y={};function Ue(c){var p=e.create(c),m={env:c.env,is:p("is")({})([e.Type,e.Any,e.Boolean])(e.test(c.env)),Maybe:a,Nothing:V,Either:r};return Object.keys(y).forEach(function(F){m[F]=p(F)(y[F].consts)(y[F].types)(y[F].impl)}),m.unchecked=c.checkTypes?Ue({checkTypes:!1,env:c.env}):m,m}y.create={consts:{},types:[et,e.Object],impl:Ue};function A(c){var p=S.parse(S(c));return p.namespace=o.reject($(null),X(p.namespace)),p}y.type={consts:{},types:[e.Any,e.RecordType({namespace:e.Maybe(e.String),name:e.String,version:e.NonNegativeInteger})],impl:A},y.show={consts:{},types:[e.Any,e.String],impl:u};function $(c){return function(p){return o.equals(c,p)}}y.equals={consts:{a:[o.Setoid]},types:[l,l,e.Boolean],impl:$};function Re(c){return function(p){return o.lt(p,c)}}y.lt={consts:{a:[o.Ord]},types:[l,l,e.Boolean],impl:Re};function Ke(c){return function(p){return o.lte(p,c)}}y.lte={consts:{a:[o.Ord]},types:[l,l,e.Boolean],impl:Ke};function An(c){return function(p){return o.gt(p,c)}}y.gt={consts:{a:[o.Ord]},types:[l,l,e.Boolean],impl:An};function Qt(c){return function(p){return o.gte(p,c)}}y.gte={consts:{a:[o.Ord]},types:[l,l,e.Boolean],impl:Qt},y.min={consts:{a:[o.Ord]},types:[l,l,l],impl:Pe(o.min)},y.max={consts:{a:[o.Ord]},types:[l,l,l],impl:Pe(o.max)},y.clamp={consts:{a:[o.Ord]},types:[l,l,l,l],impl:It(o.clamp)},y.id={consts:{c:[o.Category]},types:[ye(T),T],impl:o.id},y.concat={consts:{a:[o.Semigroup]},types:[l,l,l],impl:Pe(o.concat)},y.empty={consts:{a:[o.Monoid]},types:[ye(l),l],impl:o.empty},y.invert={consts:{g:[o.Group]},types:[ne,ne],impl:o.invert};function Bt(c){return function(p){return o.filter(c,p)}}y.filter={consts:{f:[o.Filterable]},types:[e.Predicate(l),w(l),w(l)],impl:Bt};function rt(c){return function(p){return o.reject(c,p)}}y.reject={consts:{f:[o.Filterable]},types:[e.Predicate(l),w(l),w(l)],impl:rt};function it(c){return function(p){return o.map(c,p)}}y.map={consts:{f:[o.Functor]},types:[e.Fn(l)(b),w(l),w(b)],impl:it};function Lt(c){return function(p){return o.flip(c,p)}}y.flip={consts:{f:[o.Functor]},types:[w(e.Fn(l)(b)),l,w(b)],impl:Lt},y.bimap={consts:{p:[o.Bifunctor]},types:[e.Fn(l)(b),e.Fn(T)(L),Ze(l)(T),Ze(b)(L)],impl:It(o.bimap)},y.mapLeft={consts:{p:[o.Bifunctor]},types:[e.Fn(l)(b),Ze(l)(T),Ze(b)(T)],impl:Pe(o.mapLeft)},y.promap={consts:{p:[o.Profunctor]},types:[e.Fn(l)(b),e.Fn(T)(L),Ze(b)(T),Ze(l)(L)],impl:It(o.promap)};function En(c){return function(p){return o.alt(p,c)}}y.alt={consts:{f:[o.Alt]},types:[w(l),w(l),w(l)],impl:En},y.zero={consts:{f:[o.Plus]},types:[ye(w(l)),w(l)],impl:o.zero};function Wt(c){return function(p){return function(m){return o.reduce(function(F,ge){return c(F)(ge)},p,m)}}}y.reduce={consts:{f:[o.Foldable]},types:[e.Fn(b)(e.Fn(l)(b)),b,w(l),b],impl:Wt},y.reduce_={consts:{f:[o.Foldable]},types:[e.Fn(l)(e.Fn(b)(b)),b,w(l),b],impl:se(Wt)(Lt)},y.traverse={consts:{f:[o.Applicative],t:[o.Traversable]},types:[ye(w(b)),e.Fn(l)(w(b)),Ge(l),w(Ge(b))],impl:It(o.traverse)},y.sequence={consts:{f:[o.Applicative],t:[o.Traversable]},types:[ye(w(l)),Ge(w(l)),w(Ge(l))],impl:Pe(o.sequence)},y.ap={consts:{f:[o.Apply]},types:[w(e.Fn(l)(b)),w(l),w(b)],impl:Pe(o.ap)},y.lift2={consts:{f:[o.Apply]},types:[e.Fn(l)(e.Fn(b)(T)),w(l),w(b),w(T)],impl:It(o.lift2)},y.lift3={consts:{f:[o.Apply]},types:[e.Fn(l)(e.Fn(b)(e.Fn(T)(L))),w(l),w(b),w(T),w(L)],impl:cn(o.lift3)},y.apFirst={consts:{f:[o.Apply]},types:[w(l),w(b),w(l)],impl:Pe(o.apFirst)},y.apSecond={consts:{f:[o.Apply]},types:[w(l),w(b),w(b)],impl:Pe(o.apSecond)};function Hn(c){return function(p){return o.of(c,p)}}y.of={consts:{f:[o.Applicative]},types:[ye(w(l)),l,w(l)],impl:Hn},y.chain={consts:{m:[o.Chain]},types:[e.Fn(l)(we(b)),we(l),we(b)],impl:Pe(o.chain)},y.join={consts:{m:[o.Chain]},types:[we(we(l)),we(l)],impl:o.join};function Nn(c){return function(p){return function(F){return o.chainRec(c,m,F)};function m(F,ge,Ve){return o.map(Jt(F)(ge),p(Ve))}}}y.chainRec={consts:{m:[o.ChainRec]},types:[ye(we(b)),e.Fn(l)(we(e.Either(l)(b))),l,we(b)],impl:Nn},y.extend={consts:{w:[o.Extend]},types:[e.Fn(Be(l))(b),Be(l),Be(b)],impl:Pe(o.extend)},y.duplicate={consts:{w:[o.Extend]},types:[Be(l),Be(Be(l))],impl:o.duplicate},y.extract={consts:{w:[o.Comonad]},types:[Be(l),l],impl:o.extract},y.contramap={consts:{f:[o.Contravariant]},types:[e.Fn(b)(l),w(l),w(b)],impl:Pe(o.contramap)};function pt(c){return c}y.I={consts:{},types:[l,l],impl:pt};function Nt(c){return function(p){return c}}y.K={consts:{},types:[l,b,l],impl:Nt};function Mt(c){return function(p){return p(c)}}y.T={consts:{},types:[l,e.Fn(l)(b),b],impl:Mt};function Pe(c){return function(p){return function(m){return c(p,m)}}}y.curry2={consts:{},types:[e.Function([l,b,T]),l,b,T],impl:Pe};function It(c){return function(p){return function(m){return function(F){return c(p,m,F)}}}}y.curry3={consts:{},types:[e.Function([l,b,T,L]),l,b,T,L],impl:It};function cn(c){return function(p){return function(m){return function(F){return function(ge){return c(p,m,F,ge)}}}}}y.curry4={consts:{},types:[e.Function([l,b,T,L,be]),l,b,T,L,be],impl:cn};function tt(c){return function(p){return function(m){return function(F){return function(ge){return function(Ve){return c(p,m,F,ge,Ve)}}}}}}y.curry5={consts:{},types:[e.Function([l,b,T,L,be,pe]),l,b,T,L,be,pe],impl:tt},y.compose={consts:{s:[o.Semigroupoid]},types:[Le(b)(T),Le(l)(b),Le(l)(T)],impl:Pe(o.compose)};function zt(c){return function(p){return Wt(Mt)(p)(c)}}y.pipe={consts:{f:[o.Foldable]},types:[w(e.Fn(e.Any)(e.Any)),l,b],impl:zt};function Ot(c){return function(p){return o.reduce(function(m,F){return o.chain(F,m)},p,c)}}y.pipeK={consts:{f:[o.Foldable],m:[o.Chain]},types:[w(e.Fn(e.Any)(we(e.Any))),we(l),we(b)],impl:Ot};function he(c){return function(p){return function(m){return function(F){return c(p(m))(p(F))}}}}y.on={consts:{},types:[e.Fn(b)(e.Fn(b)(T)),e.Fn(l)(b),l,l,T],impl:he},y.Pair={consts:{},types:[l,b,e.Pair(l)(b)],impl:i};function Xe(c){return function(p){return c(p.fst)(p.snd)}}y.pair={consts:{},types:[e.Fn(l)(e.Fn(b)(T)),e.Pair(l)(b),T],impl:Xe},y.fst={consts:{},types:[e.Pair(l)(b),l],impl:Xe(Nt)},y.snd={consts:{},types:[e.Pair(l)(b),b],impl:Xe(ue(Nt))},y.swap={consts:{},types:[e.Pair(l)(b),e.Pair(b)(l)],impl:Xe(ue(i))},y.Just={consts:{},types:[l,e.Maybe(l)],impl:X};function Pt(c){return c.isNothing}y.isNothing={consts:{},types:[e.Maybe(l),e.Boolean],impl:Pt};function Oe(c){return c.isJust}y.isJust={consts:{},types:[e.Maybe(l),e.Boolean],impl:Oe};function Zt(c){return function(p){return function(m){return m.isJust?p(m.value):c}}}y.maybe={consts:{},types:[b,e.Fn(l)(b),e.Maybe(l),b],impl:Zt};function ln(c){return function(p){return function(m){return m.isJust?p(m.value):c()}}}y.maybe_={consts:{},types:[e.Thunk(b),e.Fn(l)(b),e.Maybe(l),b],impl:ln},y.fromMaybe={consts:{},types:[l,e.Maybe(l),l],impl:ue(Zt)(pt)},y.fromMaybe_={consts:{},types:[e.Thunk(l),e.Maybe(l),l],impl:ue(ln)(pt)};function Ct(c){return it(Ae("value"))(Bt(Oe)(c))}y.justs={consts:{f:[o.Filterable,o.Functor]},types:[w(e.Maybe(l)),w(l)],impl:Ct},y.mapMaybe={consts:{f:[o.Filterable,o.Functor]},types:[e.Fn(l)(e.Maybe(b)),w(l),w(b)],impl:se(se(Ct))(it)};function On(c){return c.isJust?c.value:null}y.maybeToNullable={consts:{},types:[e.Maybe(l),e.Nullable(l)],impl:On};function Ye(c){return Zt(te(c))(G)}y.maybeToEither={consts:{},types:[l,e.Maybe(b),e.Either(l)(b)],impl:Ye},y.Left={consts:{},types:[l,e.Either(l)(b)],impl:te},y.Right={consts:{},types:[b,e.Either(l)(b)],impl:G};function xn(c){return c.isLeft}y.isLeft={consts:{},types:[e.Either(l)(b),e.Boolean],impl:xn};function Ln(c){return c.isRight}y.isRight={consts:{},types:[e.Either(l)(b),e.Boolean],impl:Ln};function Jt(c){return function(p){return function(m){return(m.isLeft?c:p)(m.value)}}}y.either={consts:{},types:[e.Fn(l)(T),e.Fn(b)(T),e.Either(l)(b),T],impl:Jt};function en(c){return Jt(pt)(Nt(c))}y.fromLeft={consts:{},types:[l,e.Either(l)(b),l],impl:en};function fn(c){return Jt(Nt(c))(pt)}y.fromRight={consts:{},types:[b,e.Either(l)(b),b],impl:fn};function pn(c){return Jt(Nt(c))(pt)}y.fromEither={consts:{},types:[b,e.Either(l)(b),b],impl:pn},y.lefts={consts:{f:[o.Filterable,o.Functor]},types:[w(e.Either(l)(b)),w(l)],impl:se(it(Ae("value")))(Bt(xn))},y.rights={consts:{f:[o.Filterable,o.Functor]},types:[w(e.Either(l)(b)),w(b)],impl:se(it(Ae("value")))(Bt(Ln))};function Pn(c){return Q(c)(G)(te)}y.tagBy={consts:{},types:[e.Predicate(l),l,e.Either(l)(l)],impl:Pn};function Rn(c){return function(p){try{return G(c(p))}catch(m){return te(m)}}}y.encase={consts:{},types:[Ne(be)(l)(b),l,e.Either(be)(b)],impl:Rn};function hn(c){return c.isLeft?V:X(c.value)}y.eitherToMaybe={consts:{},types:[e.Either(l)(b),e.Maybe(b)],impl:hn};function qt(c){return function(p){return c&&p}}y.and={consts:{},types:[e.Boolean,e.Boolean,e.Boolean],impl:qt};function h(c){return function(p){return c||p}}y.or={consts:{},types:[e.Boolean,e.Boolean,e.Boolean],impl:h};function E(c){return!c}y.not={consts:{},types:[e.Boolean,e.Boolean],impl:E},y.complement={consts:{},types:[e.Predicate(l),l,e.Boolean],impl:se(E)};function k(c){return function(p){return function(m){return m?p:c}}}y.boolean={consts:{},types:[l,l,e.Boolean,l],impl:k};function Q(c){return function(p){return function(m){return function(F){return(c(F)?p:m)(F)}}}}y.ifElse={consts:{},types:[e.Predicate(l),e.Fn(l)(b),e.Fn(l)(b),l,b],impl:Q};function Ie(c){return ue(Q(c))(pt)}y.when={consts:{},types:[e.Predicate(l),e.Fn(l)(l),l,l],impl:Ie};function Te(c){return Q(c)(pt)}y.unless={consts:{},types:[e.Predicate(l),e.Fn(l)(l),l,l],impl:Te};function D(c){return function(p){return function(m){return m.length===0?c:p(m[0])(m.slice(1))}}}y.array={consts:{},types:[b,e.Fn(l)(e.Fn(e.Array(l))(b)),e.Array(l),b],impl:D};function C(c){return Array.isArray(c)?c.length>0?X(c[0]):V:o.reduce(function(p,m){return p.isJust?p:X(m)},V,c)}y.head={consts:{f:[o.Foldable]},types:[w(l),e.Maybe(l)],impl:C};function K(c){return Array.isArray(c)?c.length>0?X(c[c.length-1]):V:o.reduce(function(p,m){return X(m)},V,c)}y.last={consts:{f:[o.Foldable]},types:[w(l),e.Maybe(l)],impl:K};function De(c){if(Array.isArray(c))return c.length>0?X(c.slice(1)):V;var p=o.empty(c.constructor);return o.reduce(function(m,F){return X(Zt(p)(Vt(F))(m))},V,c)}y.tail={consts:{f:[o.Applicative,o.Foldable,o.Monoid]},types:[w(l),e.Maybe(w(l))],impl:De};function Ce(c){if(Array.isArray(c))return c.length>0?X(c.slice(0,-1)):V;var p=o.empty(c.constructor);return o.map(i.snd,o.reduce(function(m,F){return X(i(F)(Zt(p)(Xe(Vt))(m)))},V,c))}y.init={consts:{f:[o.Applicative,o.Foldable,o.Monoid]},types:[w(l),e.Maybe(w(l))],impl:Ce};function _t(c,p){return function(m){return function(F){if(m<0)return V;if(Array.isArray(F))return m<=F.length?X(c(m,F)):V;var ge=o.reduce(function(Ve,mn){return o.map(function(Wn){var f=Wn.fst,d=Wn.snd;return i(f-1)(p(f,d,mn))},Ve)},X(i(m)(o.empty(F.constructor))),F);return o.map(i.snd,o.reject(se(An(0))(i.fst),ge))}}}var Xt=_t(function(c,p){return p.slice(0,c)},function(c,p,m){return c>0?o.append(m,p):p});y.take={consts:{f:[o.Applicative,o.Foldable,o.Monoid]},types:[e.Integer,w(l),e.Maybe(w(l))],impl:Xt};var dn=_t(function(c,p){return p.slice(c)},function(c,p,m){return c>0?p:o.append(m,p)});y.drop={consts:{f:[o.Applicative,o.Foldable,o.Monoid]},types:[e.Integer,w(l),e.Maybe(w(l))],impl:dn};function Tn(c){return function(p){return o.map(o.reverse,Xt(c)(o.reverse(p)))}}y.takeLast={consts:{f:[o.Applicative,o.Foldable,o.Monoid]},types:[e.Integer,w(l),e.Maybe(w(l))],impl:Tn};function tn(c){return function(p){return o.map(o.reverse,dn(c)(o.reverse(p)))}}y.dropLast={consts:{f:[o.Applicative,o.Foldable,o.Monoid]},types:[e.Integer,w(l),e.Maybe(w(l))],impl:tn};function Gn(c){return function(p){for(var m=0;m<p.length&&c(p[m]);)m+=1;return p.slice(0,m)}}y.takeWhile={consts:{},types:[e.Predicate(l),e.Array(l),e.Array(l)],impl:Gn};function $n(c){return function(p){for(var m=0;m<p.length&&c(p[m]);)m+=1;return p.slice(m)}}y.dropWhile={consts:{},types:[e.Predicate(l),e.Array(l),e.Array(l)],impl:$n},y.size={consts:{f:[o.Foldable]},types:[w(l),e.NonNegativeInteger],impl:o.size},y.all={consts:{f:[o.Foldable]},types:[e.Predicate(l),w(l),e.Boolean],impl:Pe(o.all)},y.any={consts:{f:[o.Foldable]},types:[e.Predicate(l),w(l),e.Boolean],impl:Pe(o.any)},y.none={consts:{f:[o.Foldable]},types:[e.Predicate(l),w(l),e.Boolean],impl:Pe(o.none)};function Vt(c){return function(p){return o.append(c,p)}}y.append={consts:{f:[o.Applicative,o.Semigroup]},types:[l,w(l),w(l)],impl:Vt},y.prepend={consts:{f:[o.Applicative,o.Semigroup]},types:[l,w(l),w(l)],impl:Pe(o.prepend)},y.joinWith={consts:{},types:[e.String,e.Array(e.String),e.String],impl:fe("join")},y.elem={consts:{a:[o.Setoid],f:[o.Foldable]},types:[l,w(l),e.Boolean],impl:Pe(o.elem)};function Cn(c){return function(p){return o.reduce(function(m,F){return m.isJust?m:c(F)?X(F):V},V,p)}}y.find={consts:{f:[o.Foldable]},types:[e.Predicate(l),w(l),e.Maybe(l)],impl:Cn},y.intercalate={consts:{a:[o.Monoid],f:[o.Foldable]},types:[l,w(l),l],impl:Pe(o.intercalate)},y.foldMap={consts:{b:[o.Monoid],f:[o.Foldable]},types:[ye(b),e.Fn(l)(b),w(l),b],impl:It(o.foldMap)};function kt(c){return function(p){for(var m=[],F=c(p);F.isJust;F=c(F.value.snd))m.push(F.value.fst);return m}}y.unfoldr={consts:{},types:[e.Fn(b)(e.Maybe(e.Pair(l)(b))),b,e.Array(l)],impl:kt};function Kn(c){return function(p){for(var m=[],F=c;F<p;F+=1)m.push(F);return m}}y.range={consts:{},types:[e.Integer,e.Integer,e.Array(e.Integer)],impl:Kn};function Yn(c){return function(p){if(p.length===0)return[];for(var m=p[0],F=[m],ge=[F],Ve=1;Ve<p.length;Ve+=1){var mn=p[Ve];c(m)(mn)?F.push(mn):ge.push(F=[m=mn])}return ge}}y.groupBy={consts:{},types:[e.Fn(l)(e.Predicate(l)),e.Array(l),e.Array(e.Array(l))],impl:Yn},y.reverse={consts:{f:[o.Applicative,o.Foldable,o.Monoid]},types:[w(l),w(l)],impl:o.reverse},y.sort={consts:{a:[o.Ord],m:[o.Applicative,o.Foldable,o.Monoid]},types:[we(l),we(l)],impl:o.sort},y.sortBy={consts:{b:[o.Ord],m:[o.Applicative,o.Foldable,o.Monoid]},types:[e.Fn(l)(b),we(l),we(l)],impl:Pe(o.sortBy)},y.zip={consts:{},types:[e.Array(l),e.Array(b),e.Array(e.Pair(l)(b))],impl:qn(i)};function qn(c){return function(p){return function(m){for(var F=[],ge=Math.min(p.length,m.length),Ve=0;Ve<ge;Ve+=1)F.push(c(p[Ve])(m[Ve]));return F}}}y.zipWith={consts:{},types:[e.Fn(l)(e.Fn(b)(T)),e.Array(l),e.Array(b),e.Array(T)],impl:qn};function Ae(c){return function(p){var m=je(p);if(c in m)return m[c];throw new TypeError("‘prop’ expected object to have a property named ‘"+c+"’; "+u(p)+" does not")}}y.prop={consts:{},types:[e.String,l,b],impl:Ae};function Mn(c){return function(p){return c.reduce(function(m,F){var ge=je(m);if(F in ge)return ge[F];throw new TypeError("‘props’ expected object to have a property at "+u(c)+"; "+u(m)+" does not")},p)}}y.props={consts:{},types:[e.Array(e.String),l,b],impl:Mn};function ot(c){return se(se(Bt(c)))(ve)}y.get={consts:{},types:[e.Predicate(e.Any),e.String,l,e.Maybe(b)],impl:ot};function Qn(c){return function(p){return function(m){return o.filter(c,p.reduce(function(F,ge){return o.chain(ve(ge),F)},X(m)))}}}y.gets={consts:{},types:[e.Predicate(e.Any),e.Array(e.String),l,e.Maybe(b)],impl:Qn};function Zn(c){return function(p){return Object.prototype.propertyIsEnumerable.call(p,c)?X(p[c]):V}}y.value={consts:{},types:[e.String,e.StrMap(l),e.Maybe(l)],impl:Zn};function nn(c){return function(p){var m={};return m[c]=p,m}}y.singleton={consts:{},types:[e.String,l,e.StrMap(l)],impl:nn};function Ht(c){return function(p){return function(m){return o.concat(m,nn(c)(p))}}}y.insert={consts:{},types:[e.String,l,e.StrMap(l),e.StrMap(l)],impl:Ht};function yn(c){return function(p){var m=o.concat(p,{});return delete m[c],m}}y.remove={consts:{},types:[e.String,e.StrMap(l),e.StrMap(l)],impl:yn},y.keys={consts:{},types:[e.StrMap(l),e.Array(e.String)],impl:Object.keys};function R(c){return o.map(function(p){return c[p]},Object.keys(c))}y.values={consts:{},types:[e.StrMap(l),e.Array(l)],impl:R};function H(c){return o.map(function(p){return i(p)(c[p])},Object.keys(c))}y.pairs={consts:{},types:[e.StrMap(l),e.Array(e.Pair(e.String)(l))],impl:H};function ee(c){return o.reduce(function(p,m){return p[m.fst]=m.snd,p},{},c)}y.fromPairs={consts:{f:[o.Foldable]},types:[w(e.Pair(e.String)(l)),e.StrMap(l)],impl:ee};function re(c){return-c}y.negate={consts:{},types:[e.ValidNumber,e.ValidNumber],impl:re};function qe(c){return function(p){return c+p}}y.add={consts:{},types:[e.FiniteNumber,e.FiniteNumber,e.FiniteNumber],impl:qe},y.sum={consts:{f:[o.Foldable]},types:[w(e.FiniteNumber),e.FiniteNumber],impl:Wt(qe)(0)};function ut(c){return function(p){return p-c}}y.sub={consts:{},types:[e.FiniteNumber,e.FiniteNumber,e.FiniteNumber],impl:ut};function Y(c){return function(p){return c*p}}y.mult={consts:{},types:[e.FiniteNumber,e.FiniteNumber,e.FiniteNumber],impl:Y},y.product={consts:{f:[o.Foldable]},types:[w(e.FiniteNumber),e.FiniteNumber],impl:Wt(Y)(1)};function xt(c){return function(p){return p/c}}y.div={consts:{},types:[e.NonZeroFiniteNumber,e.FiniteNumber,e.FiniteNumber],impl:xt};function at(c){return function(p){return Math.pow(p,c)}}y.pow={consts:{},types:[e.FiniteNumber,e.FiniteNumber,e.FiniteNumber],impl:at};function ht(c){var p=o.reduce(function(m,F){return m.total+=F,m.count+=1,m},{total:0,count:0},c);return p.count>0?X(p.total/p.count):V}y.mean={consts:{f:[o.Foldable]},types:[w(e.FiniteNumber),e.Maybe(e.FiniteNumber)],impl:ht};function dt(c){return c%2===0}y.even={consts:{},types:[e.Integer,e.Boolean],impl:dt};function Un(c){return c%2!==0}y.odd={consts:{},types:[e.Integer,e.Boolean],impl:Un};function Gt(c){var p=new Date(c);return isNaN(p.valueOf())?V:X(p)}y.parseDate={consts:{},types:[e.String,e.Maybe(e.ValidDate)],impl:Gt};function yt(c){return"(?:"+c.join("|")+")"}function Dn(c){return yt(c)+"?"}var In=new RegExp("^\\s*[+-]?"+yt(["Infinity","NaN",yt(["[0-9]+","[0-9]+[.][0-9]+","[0-9]+[.]","[.][0-9]+"])+Dn(["[Ee][+-]?[0-9]+"])])+"\\s*$");function rn(c){return In.test(c)?X(parseFloat(c)):V}y.parseFloat={consts:{},types:[e.String,e.Maybe(e.Number)],impl:rn};var St=e.NullaryType("Radix")("")([e.Integer])(function(c){return c>=2&&c<=36});function kn(c){return function(p){var m="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0,c),F=new RegExp("^["+m+"]+$","i"),ge=p.replace(/^[+-]/,"");if(F.test(c===16?ge.replace(/^0x/i,""):ge)){var Ve=parseInt(p,c);if(e.test([])(e.Integer)(Ve))return X(Ve)}return V}}y.parseInt={consts:{},types:[St,e.String,e.Maybe(e.Integer)],impl:kn};function vt(c){return se(Bt(c))(se(hn)(Rn(JSON.parse)))}y.parseJson={consts:{},types:[e.Predicate(e.Any),e.String,e.Maybe(l)],impl:vt};var Fn=e.RecordType({match:e.String,groups:e.Array(e.Maybe(e.String))});function Rt(c){return{match:c[0],groups:o.map(se(rt($(void 0)))(X),c.slice(1))}}function ae(c,p){var m=c.lastIndex,F=p();return c.lastIndex=m,F}function an(c){return function(p){return new RegExp(p,c)}}y.regex={consts:{},types:[e.RegexFlags,e.String,e.RegExp],impl:an};function We(c){return c.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}y.regexEscape={consts:{},types:[e.String,e.String],impl:We};function de(c){return function(p){return ae(c,function(){return c.test(p)})}}y.test={consts:{},types:[e.RegExp,e.String,e.Boolean],impl:de};function $t(c){return function(p){return o.map(Rt,o.reject($(null),X(p.match(c))))}}y.match={consts:{},types:[e.NonGlobalRegExp,e.String,e.Maybe(Fn)],impl:$t};function At(c){return function(p){return ae(c,function(){return kt(function(m){return o.map(function(F){return i(Rt(F))(null)},o.reject($(null),X(c.exec(p))))})([])})}}y.matchAll={consts:{},types:[e.GlobalRegExp,e.String,e.Array(Fn)],impl:At},y.toUpper={consts:{},types:[e.String,e.String],impl:J("toUpperCase")},y.toLower={consts:{},types:[e.String,e.String],impl:J("toLowerCase")},y.trim={consts:{},types:[e.String,e.String],impl:J("trim")};function on(c){return function(p){var m=c.length;return p.slice(0,m)===c?X(p.slice(m)):V}}y.stripPrefix={consts:{},types:[e.String,e.String,e.Maybe(e.String)],impl:on};function gn(c){return function(p){var m=p.length-c.length;return p.slice(m)===c?X(p.slice(0,m)):V}}y.stripSuffix={consts:{},types:[e.String,e.String,e.Maybe(e.String)],impl:gn};function j(c){var p=c.split(/\s+/),m=p.length;return p.slice(p[0]===""?1:0,p[m-1]===""?m-1:m)}y.words={consts:{},types:[e.String,e.Array(e.String)],impl:j},y.unwords={consts:{},types:[e.Array(e.String),e.String],impl:fe("join")(" ")};function z(c){return c===""?[]:c.replace(/\r\n?/g,`
`).match(/^(?=[\s\S]).*/gm)}y.lines={consts:{},types:[e.String,e.Array(e.String)],impl:z};function ce(c){return c.reduce(function(p,m){return p+m+`
`},"")}y.unlines={consts:{},types:[e.Array(e.String),e.String],impl:ce},y.splitOn={consts:{},types:[e.String,e.String,e.Array(e.String)],impl:fe("split")};function Se(c){return function(p){return ae(c,function(){for(var m=[],F=0,ge;(ge=c.exec(p))!=null;)if(c.lastIndex===F&&ge[0]===""){if(c.lastIndex===p.length)return m;c.lastIndex+=1}else m.push(p.slice(F,ge.index)),F=ge.index+ge[0].length;return m.push(p.slice(F)),m})}}return y.splitOnRegex={consts:{},types:[e.GlobalRegExp,e.String,e.Array(e.String)],impl:Se},Ue({checkTypes:typeof process>"u"||process==null||t==null||!1,env:e.env})})})(oa)),oa.exports}var vi=Vo();const lh={class:"playground"},fh={class:"libs"},ph={class:"libs__label"},hh={class:"libs__list"},dh={class:"libchip__alias"},yh=["href","title"],gh=["aria-label","onClick"],mh={key:0,class:"addform"},vh={class:"addform__row"},bh=["placeholder"],wh=["placeholder"],_h=["disabled"],Sh={class:"addform__quick"},Ah=["onClick"],Eh={class:"addform__hint"},Nh={key:0,class:"addform__error"},Oh={class:"playground__bar"},xh={class:"playground__actions"},Rh={class:"playground__output"},Th={class:"playground__output-label"},Mh={class:"playground__pre"},da=`// Доступные библиотеки — в чипах выше. Добавляй свои кнопкой «+».
// Available libraries are shown above. Add your own with "+".
console.log(R.add(1, 2))            // 3
console.log(S.add (1) (2))          // 3

const inc = R.add(1)
console.log(R.map(inc, [1, 2, 3]))  // [2, 3, 4]
`,Ih=Cr({__name:"CoursePlayground.client",setup(n){const t={ramda:"https://ramdajs.com/docs/",sanctuary:"https://sanctuary.js.org/",lodash:"https://lodash.com/docs","date-fns":"https://date-fns.org/docs/Getting-Started",rxjs:"https://rxjs.dev/guide/overview",zod:"https://zod.dev/"},e=ne=>t[ne]??`https://www.npmjs.com/package/${ne}`,r=vi.create({checkTypes:!1,env:vi.env}),{t:a}=qr(),{theme:i}=iu(),u=vn([{alias:"R",pkg:"ramda",mod:th,docs:e("ramda")},{alias:"S",pkg:"sanctuary",mod:r,docs:e("sanctuary")}]),o=[{alias:"_",pkg:"lodash"},{alias:"dfns",pkg:"date-fns"},{alias:"rx",pkg:"rxjs"},{alias:"z",pkg:"zod"}],S=vn(!1),I=vn(""),te=vn(""),G=vn(!1),V=vn(""),X=async(ne,pe)=>{if(ne=ne.trim(),pe=pe.trim(),!(!ne||!pe)){if(u.value.some(w=>w.alias===ne)){V.value=a("course.libExists",{alias:ne});return}G.value=!0,V.value="";try{const w=await lu(()=>import(`https://esm.sh/${pe}`),[],import.meta.url);u.value.push({alias:ne,pkg:pe,mod:w.default??w,docs:e(pe)}),I.value="",te.value="",S.value=!1}catch{V.value=a("course.libFailed",{pkg:pe})}finally{G.value=!1}}},se=ne=>{u.value=u.value.filter(pe=>pe.alias!==ne)},ue=vn(null),ve=vn(""),J=vn(da);let fe=null,je=null;const l=()=>i.value==="dark"?"vs-dark":"vs-light";ou(()=>{as.init().then(ne=>{je=ne.editor,ue.value&&(fe=je.create(ue.value,{value:da,language:"javascript",theme:l(),fontSize:15,minimap:{enabled:!1},automaticLayout:!0,scrollBeyondLastLine:!1,padding:{top:14,bottom:14},tabSize:2}),fe.onDidChangeModelContent(()=>{J.value=fe?.getValue()??""}))})}),uu(i,()=>je?.setTheme(l())),su(()=>{fe?.dispose(),fe=null});const b=ne=>{if(typeof ne=="string")return ne;try{return JSON.stringify(ne,null,2)}catch{return String(ne)}},T=()=>{const ne=[],pe={log:(...w)=>ne.push(...w),error:(...w)=>ne.push("ERROR: "+w.join(" ")),warn:(...w)=>ne.push("WARN: "+w.join(" "))};try{const w=u.value.map(Ge=>Ge.alias),we=u.value.map(Ge=>Ge.mod);new Function("console",...w,J.value)(pe,...we),ve.value=ne.map(b).join(`
`)}catch(w){ve.value="Error: "+(w instanceof Error?w.message:String(w))}},L=()=>{fe?.setValue(da),ve.value=""},be=()=>{fe?.setValue(""),ve.value=""};return(ne,pe)=>(wt(),jt("div",lh,[me("div",fh,[me("span",ph,He(le(a)("course.libraries")),1),me("ul",hh,[(wt(!0),jt(or,null,gr(le(u),w=>(wt(),jt("li",{key:w.alias,class:"libchip"},[me("code",dh,He(w.alias),1),me("a",{class:"libchip__pkg",href:w.docs,target:"_blank",rel:"noopener noreferrer",title:le(a)("course.docs")},He(w.pkg)+" ↗",9,yh),me("button",{class:"libchip__x",type:"button","aria-label":le(a)("course.removeLib",{alias:w.alias}),onClick:we=>se(w.alias)}," × ",8,gh)]))),128))]),me("button",{class:"libs__add",type:"button",onClick:pe[0]||(pe[0]=w=>S.value=!le(S))}," + "+He(le(a)("course.addLib")),1)]),le(S)?(wt(),jt("div",mh,[me("div",vh,[Xa(me("input",{"onUpdate:modelValue":pe[1]||(pe[1]=w=>Ha(I)?I.value=w:null),class:"addform__input addform__input--alias",placeholder:le(a)("course.alias"),spellcheck:"false"},null,8,bh),[[Va,le(I)]]),Xa(me("input",{"onUpdate:modelValue":pe[2]||(pe[2]=w=>Ha(te)?te.value=w:null),class:"addform__input",placeholder:le(a)("course.package"),spellcheck:"false",onKeyup:pe[3]||(pe[3]=cu(w=>X(le(I),le(te)),["enter"]))},null,40,wh),[[Va,le(te)]]),me("button",{class:"addform__btn",type:"button",disabled:le(G),onClick:pe[4]||(pe[4]=w=>X(le(I),le(te)))},He(le(G)?le(a)("course.loading"):le(a)("course.add")),9,_h)]),me("div",Sh,[(wt(),jt(or,null,gr(o,w=>me("button",{key:w.pkg,class:"addform__chip",type:"button",onClick:we=>X(w.alias,w.pkg)},He(w.alias)+" · "+He(w.pkg),9,Ah)),64))]),me("p",Eh,He(le(a)("course.cdnHint")),1),le(V)?(wt(),jt("p",Nh,He(le(V)),1)):Ga("",!0)])):Ga("",!0),me("div",Oh,[pe[5]||(pe[5]=me("span",{class:"playground__title"},"playground",-1)),me("div",xh,[me("button",{class:"playground__btn",type:"button",onClick:L},He(le(a)("course.reset")),1),me("button",{class:"playground__btn",type:"button",onClick:be},He(le(a)("course.clear")),1),me("button",{class:"playground__btn playground__btn--run",type:"button",onClick:T}," ▶ "+He(le(a)("course.run")),1)])]),me("div",{ref_key:"editorEl",ref:ue,class:"playground__editor"},null,512),me("div",Rh,[me("span",Th,He(le(a)("course.output")),1),me("pre",Mh,He(le(ve)||"—"),1)])]))}}),kh=Object.assign(Ur(Ih,[["__scopeId","data-v-6f58b96c"]]),{__name:"CoursePlayground"});var ya,bi;function Fh(){if(bi)return ya;bi=1;function n(h){return h instanceof Map?h.clear=h.delete=h.set=function(){throw new Error("map is read-only")}:h instanceof Set&&(h.add=h.clear=h.delete=function(){throw new Error("set is read-only")}),Object.freeze(h),Object.getOwnPropertyNames(h).forEach(E=>{const k=h[E],Q=typeof k;(Q==="object"||Q==="function")&&!Object.isFrozen(k)&&n(k)}),h}class t{constructor(E){E.data===void 0&&(E.data={}),this.data=E.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function e(h){return h.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function r(h,...E){const k=Object.create(null);for(const Q in h)k[Q]=h[Q];return E.forEach(function(Q){for(const Ie in Q)k[Ie]=Q[Ie]}),k}const a="</span>",i=h=>!!h.scope,u=(h,{prefix:E})=>{if(h.startsWith("language:"))return h.replace("language:","language-");if(h.includes(".")){const k=h.split(".");return[`${E}${k.shift()}`,...k.map((Q,Ie)=>`${Q}${"_".repeat(Ie+1)}`)].join(" ")}return`${E}${h}`};class o{constructor(E,k){this.buffer="",this.classPrefix=k.classPrefix,E.walk(this)}addText(E){this.buffer+=e(E)}openNode(E){if(!i(E))return;const k=u(E.scope,{prefix:this.classPrefix});this.span(k)}closeNode(E){i(E)&&(this.buffer+=a)}value(){return this.buffer}span(E){this.buffer+=`<span class="${E}">`}}const S=(h={})=>{const E={children:[]};return Object.assign(E,h),E};class I{constructor(){this.rootNode=S(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(E){this.top.children.push(E)}openNode(E){const k=S({scope:E});this.add(k),this.stack.push(k)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(E){return this.constructor._walk(E,this.rootNode)}static _walk(E,k){return typeof k=="string"?E.addText(k):k.children&&(E.openNode(k),k.children.forEach(Q=>this._walk(E,Q)),E.closeNode(k)),E}static _collapse(E){typeof E!="string"&&E.children&&(E.children.every(k=>typeof k=="string")?E.children=[E.children.join("")]:E.children.forEach(k=>{I._collapse(k)}))}}class te extends I{constructor(E){super(),this.options=E}addText(E){E!==""&&this.add(E)}startScope(E){this.openNode(E)}endScope(){this.closeNode()}__addSublanguage(E,k){const Q=E.root;k&&(Q.scope=`language:${k}`),this.add(Q)}toHTML(){return new o(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function G(h){return h?typeof h=="string"?h:h.source:null}function V(h){return ue("(?=",h,")")}function X(h){return ue("(?:",h,")*")}function se(h){return ue("(?:",h,")?")}function ue(...h){return h.map(k=>G(k)).join("")}function ve(h){const E=h[h.length-1];return typeof E=="object"&&E.constructor===Object?(h.splice(h.length-1,1),E):{}}function J(...h){return"("+(ve(h).capture?"":"?:")+h.map(Q=>G(Q)).join("|")+")"}function fe(h){return new RegExp(h.toString()+"|").exec("").length-1}function je(h,E){const k=h&&h.exec(E);return k&&k.index===0}const l=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function b(h,{joinWith:E}){let k=0;return h.map(Q=>{k+=1;const Ie=k;let Te=G(Q),D="";for(;Te.length>0;){const C=l.exec(Te);if(!C){D+=Te;break}D+=Te.substring(0,C.index),Te=Te.substring(C.index+C[0].length),C[0][0]==="\\"&&C[1]?D+="\\"+String(Number(C[1])+Ie):(D+=C[0],C[0]==="("&&k++)}return D}).map(Q=>`(${Q})`).join(E)}const T=/\b\B/,L="[a-zA-Z]\\w*",be="[a-zA-Z_]\\w*",ne="\\b\\d+(\\.\\d+)?",pe="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",w="\\b(0b[01]+)",we="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",Ge=(h={})=>{const E=/^#![ ]*\//;return h.binary&&(h.begin=ue(E,/.*\b/,h.binary,/\b.*/)),r({scope:"meta",begin:E,end:/$/,relevance:0,"on:begin":(k,Q)=>{k.index!==0&&Q.ignoreMatch()}},h)},Be={begin:"\\\\[\\s\\S]",relevance:0},Ze={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Be]},Le={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Be]},Ne={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},ye=function(h,E,k={}){const Q=r({scope:"comment",begin:h,end:E,contains:[]},k);Q.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const Ie=J("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return Q.contains.push({begin:ue(/[ ]+/,"(",Ie,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),Q},et=ye("//","$"),y=ye("/\\*","\\*/"),Ue=ye("#","$"),A={scope:"number",begin:ne,relevance:0},$={scope:"number",begin:pe,relevance:0},Re={scope:"number",begin:w,relevance:0},Ke={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[Be,{begin:/\[/,end:/\]/,relevance:0,contains:[Be]}]},An={scope:"title",begin:L,relevance:0},Qt={scope:"title",begin:be,relevance:0},Bt={begin:"\\.\\s*"+be,relevance:0};var it=Object.freeze({__proto__:null,APOS_STRING_MODE:Ze,BACKSLASH_ESCAPE:Be,BINARY_NUMBER_MODE:Re,BINARY_NUMBER_RE:w,COMMENT:ye,C_BLOCK_COMMENT_MODE:y,C_LINE_COMMENT_MODE:et,C_NUMBER_MODE:$,C_NUMBER_RE:pe,END_SAME_AS_BEGIN:function(h){return Object.assign(h,{"on:begin":(E,k)=>{k.data._beginMatch=E[1]},"on:end":(E,k)=>{k.data._beginMatch!==E[1]&&k.ignoreMatch()}})},HASH_COMMENT_MODE:Ue,IDENT_RE:L,MATCH_NOTHING_RE:T,METHOD_GUARD:Bt,NUMBER_MODE:A,NUMBER_RE:ne,PHRASAL_WORDS_MODE:Ne,QUOTE_STRING_MODE:Le,REGEXP_MODE:Ke,RE_STARTERS_RE:we,SHEBANG:Ge,TITLE_MODE:An,UNDERSCORE_IDENT_RE:be,UNDERSCORE_TITLE_MODE:Qt});function Lt(h,E){h.input[h.index-1]==="."&&E.ignoreMatch()}function En(h,E){h.className!==void 0&&(h.scope=h.className,delete h.className)}function Wt(h,E){E&&h.beginKeywords&&(h.begin="\\b("+h.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",h.__beforeBegin=Lt,h.keywords=h.keywords||h.beginKeywords,delete h.beginKeywords,h.relevance===void 0&&(h.relevance=0))}function Hn(h,E){Array.isArray(h.illegal)&&(h.illegal=J(...h.illegal))}function Nn(h,E){if(h.match){if(h.begin||h.end)throw new Error("begin & end are not supported with match");h.begin=h.match,delete h.match}}function pt(h,E){h.relevance===void 0&&(h.relevance=1)}const Nt=(h,E)=>{if(!h.beforeMatch)return;if(h.starts)throw new Error("beforeMatch cannot be used with starts");const k=Object.assign({},h);Object.keys(h).forEach(Q=>{delete h[Q]}),h.keywords=k.keywords,h.begin=ue(k.beforeMatch,V(k.begin)),h.starts={relevance:0,contains:[Object.assign(k,{endsParent:!0})]},h.relevance=0,delete k.beforeMatch},Mt=["of","and","for","in","not","or","if","then","parent","list","value"],Pe="keyword";function It(h,E,k=Pe){const Q=Object.create(null);return typeof h=="string"?Ie(k,h.split(" ")):Array.isArray(h)?Ie(k,h):Object.keys(h).forEach(function(Te){Object.assign(Q,It(h[Te],E,Te))}),Q;function Ie(Te,D){E&&(D=D.map(C=>C.toLowerCase())),D.forEach(function(C){const K=C.split("|");Q[K[0]]=[Te,cn(K[0],K[1])]})}}function cn(h,E){return E?Number(E):tt(h)?0:1}function tt(h){return Mt.includes(h.toLowerCase())}const zt={},Ot=h=>{console.error(h)},he=(h,...E)=>{console.log(`WARN: ${h}`,...E)},Xe=(h,E)=>{zt[`${h}/${E}`]||(console.log(`Deprecated as of ${h}. ${E}`),zt[`${h}/${E}`]=!0)},Pt=new Error;function Oe(h,E,{key:k}){let Q=0;const Ie=h[k],Te={},D={};for(let C=1;C<=E.length;C++)D[C+Q]=Ie[C],Te[C+Q]=!0,Q+=fe(E[C-1]);h[k]=D,h[k]._emit=Te,h[k]._multi=!0}function Zt(h){if(Array.isArray(h.begin)){if(h.skip||h.excludeBegin||h.returnBegin)throw Ot("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Pt;if(typeof h.beginScope!="object"||h.beginScope===null)throw Ot("beginScope must be object"),Pt;Oe(h,h.begin,{key:"beginScope"}),h.begin=b(h.begin,{joinWith:""})}}function ln(h){if(Array.isArray(h.end)){if(h.skip||h.excludeEnd||h.returnEnd)throw Ot("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Pt;if(typeof h.endScope!="object"||h.endScope===null)throw Ot("endScope must be object"),Pt;Oe(h,h.end,{key:"endScope"}),h.end=b(h.end,{joinWith:""})}}function Ct(h){h.scope&&typeof h.scope=="object"&&h.scope!==null&&(h.beginScope=h.scope,delete h.scope)}function On(h){Ct(h),typeof h.beginScope=="string"&&(h.beginScope={_wrap:h.beginScope}),typeof h.endScope=="string"&&(h.endScope={_wrap:h.endScope}),Zt(h),ln(h)}function Ye(h){function E(D,C){return new RegExp(G(D),"m"+(h.case_insensitive?"i":"")+(h.unicodeRegex?"u":"")+(C?"g":""))}class k{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(C,K){K.position=this.position++,this.matchIndexes[this.matchAt]=K,this.regexes.push([K,C]),this.matchAt+=fe(C)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const C=this.regexes.map(K=>K[1]);this.matcherRe=E(b(C,{joinWith:"|"}),!0),this.lastIndex=0}exec(C){this.matcherRe.lastIndex=this.lastIndex;const K=this.matcherRe.exec(C);if(!K)return null;const De=K.findIndex((_t,Xt)=>Xt>0&&_t!==void 0),Ce=this.matchIndexes[De];return K.splice(0,De),Object.assign(K,Ce)}}class Q{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(C){if(this.multiRegexes[C])return this.multiRegexes[C];const K=new k;return this.rules.slice(C).forEach(([De,Ce])=>K.addRule(De,Ce)),K.compile(),this.multiRegexes[C]=K,K}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(C,K){this.rules.push([C,K]),K.type==="begin"&&this.count++}exec(C){const K=this.getMatcher(this.regexIndex);K.lastIndex=this.lastIndex;let De=K.exec(C);if(this.resumingScanAtSamePosition()&&!(De&&De.index===this.lastIndex)){const Ce=this.getMatcher(0);Ce.lastIndex=this.lastIndex+1,De=Ce.exec(C)}return De&&(this.regexIndex+=De.position+1,this.regexIndex===this.count&&this.considerAll()),De}}function Ie(D){const C=new Q;return D.contains.forEach(K=>C.addRule(K.begin,{rule:K,type:"begin"})),D.terminatorEnd&&C.addRule(D.terminatorEnd,{type:"end"}),D.illegal&&C.addRule(D.illegal,{type:"illegal"}),C}function Te(D,C){const K=D;if(D.isCompiled)return K;[En,Nn,On,Nt].forEach(Ce=>Ce(D,C)),h.compilerExtensions.forEach(Ce=>Ce(D,C)),D.__beforeBegin=null,[Wt,Hn,pt].forEach(Ce=>Ce(D,C)),D.isCompiled=!0;let De=null;return typeof D.keywords=="object"&&D.keywords.$pattern&&(D.keywords=Object.assign({},D.keywords),De=D.keywords.$pattern,delete D.keywords.$pattern),De=De||/\w+/,D.keywords&&(D.keywords=It(D.keywords,h.case_insensitive)),K.keywordPatternRe=E(De,!0),C&&(D.begin||(D.begin=/\B|\b/),K.beginRe=E(K.begin),!D.end&&!D.endsWithParent&&(D.end=/\B|\b/),D.end&&(K.endRe=E(K.end)),K.terminatorEnd=G(K.end)||"",D.endsWithParent&&C.terminatorEnd&&(K.terminatorEnd+=(D.end?"|":"")+C.terminatorEnd)),D.illegal&&(K.illegalRe=E(D.illegal)),D.contains||(D.contains=[]),D.contains=[].concat(...D.contains.map(function(Ce){return Ln(Ce==="self"?D:Ce)})),D.contains.forEach(function(Ce){Te(Ce,K)}),D.starts&&Te(D.starts,C),K.matcher=Ie(K),K}if(h.compilerExtensions||(h.compilerExtensions=[]),h.contains&&h.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return h.classNameAliases=r(h.classNameAliases||{}),Te(h)}function xn(h){return h?h.endsWithParent||xn(h.starts):!1}function Ln(h){return h.variants&&!h.cachedVariants&&(h.cachedVariants=h.variants.map(function(E){return r(h,{variants:null},E)})),h.cachedVariants?h.cachedVariants:xn(h)?r(h,{starts:h.starts?r(h.starts):null}):Object.isFrozen(h)?r(h):h}var Jt="11.11.1";class en extends Error{constructor(E,k){super(E),this.name="HTMLInjectionError",this.html=k}}const fn=e,pn=r,Pn=Symbol("nomatch"),Rn=7,hn=function(h){const E=Object.create(null),k=Object.create(null),Q=[];let Ie=!0;const Te="Could not find the language '{}', did you forget to load/include a language module?",D={disableAutodetect:!0,name:"Plain text",contains:[]};let C={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:te};function K(R){return C.noHighlightRe.test(R)}function De(R){let H=R.className+" ";H+=R.parentNode?R.parentNode.className:"";const ee=C.languageDetectRe.exec(H);if(ee){const re=Ae(ee[1]);return re||(he(Te.replace("{}",ee[1])),he("Falling back to no-highlight mode for this block.",R)),re?ee[1]:"no-highlight"}return H.split(/\s+/).find(re=>K(re)||Ae(re))}function Ce(R,H,ee){let re="",qe="";typeof H=="object"?(re=R,ee=H.ignoreIllegals,qe=H.language):(Xe("10.7.0","highlight(lang, code, ...args) has been deprecated."),Xe("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),qe=R,re=H),ee===void 0&&(ee=!0);const ut={code:re,language:qe};Ht("before:highlight",ut);const Y=ut.result?ut.result:_t(ut.language,ut.code,ee);return Y.code=ut.code,Ht("after:highlight",Y),Y}function _t(R,H,ee,re){const qe=Object.create(null);function ut(j,z){return j.keywords[z]}function Y(){if(!ae.keywords){We.addText(de);return}let j=0;ae.keywordPatternRe.lastIndex=0;let z=ae.keywordPatternRe.exec(de),ce="";for(;z;){ce+=de.substring(j,z.index);const Se=vt.case_insensitive?z[0].toLowerCase():z[0],c=ut(ae,Se);if(c){const[p,m]=c;if(We.addText(ce),ce="",qe[Se]=(qe[Se]||0)+1,qe[Se]<=Rn&&($t+=m),p.startsWith("_"))ce+=z[0];else{const F=vt.classNameAliases[p]||p;ht(z[0],F)}}else ce+=z[0];j=ae.keywordPatternRe.lastIndex,z=ae.keywordPatternRe.exec(de)}ce+=de.substring(j),We.addText(ce)}function xt(){if(de==="")return;let j=null;if(typeof ae.subLanguage=="string"){if(!E[ae.subLanguage]){We.addText(de);return}j=_t(ae.subLanguage,de,!0,an[ae.subLanguage]),an[ae.subLanguage]=j._top}else j=dn(de,ae.subLanguage.length?ae.subLanguage:null);ae.relevance>0&&($t+=j.relevance),We.__addSublanguage(j._emitter,j.language)}function at(){ae.subLanguage!=null?xt():Y(),de=""}function ht(j,z){j!==""&&(We.startScope(z),We.addText(j),We.endScope())}function dt(j,z){let ce=1;const Se=z.length-1;for(;ce<=Se;){if(!j._emit[ce]){ce++;continue}const c=vt.classNameAliases[j[ce]]||j[ce],p=z[ce];c?ht(p,c):(de=p,Y(),de=""),ce++}}function Un(j,z){return j.scope&&typeof j.scope=="string"&&We.openNode(vt.classNameAliases[j.scope]||j.scope),j.beginScope&&(j.beginScope._wrap?(ht(de,vt.classNameAliases[j.beginScope._wrap]||j.beginScope._wrap),de=""):j.beginScope._multi&&(dt(j.beginScope,z),de="")),ae=Object.create(j,{parent:{value:ae}}),ae}function Gt(j,z,ce){let Se=je(j.endRe,ce);if(Se){if(j["on:end"]){const c=new t(j);j["on:end"](z,c),c.isMatchIgnored&&(Se=!1)}if(Se){for(;j.endsParent&&j.parent;)j=j.parent;return j}}if(j.endsWithParent)return Gt(j.parent,z,ce)}function yt(j){return ae.matcher.regexIndex===0?(de+=j[0],1):(gn=!0,0)}function Dn(j){const z=j[0],ce=j.rule,Se=new t(ce),c=[ce.__beforeBegin,ce["on:begin"]];for(const p of c)if(p&&(p(j,Se),Se.isMatchIgnored))return yt(z);return ce.skip?de+=z:(ce.excludeBegin&&(de+=z),at(),!ce.returnBegin&&!ce.excludeBegin&&(de=z)),Un(ce,j),ce.returnBegin?0:z.length}function In(j){const z=j[0],ce=H.substring(j.index),Se=Gt(ae,j,ce);if(!Se)return Pn;const c=ae;ae.endScope&&ae.endScope._wrap?(at(),ht(z,ae.endScope._wrap)):ae.endScope&&ae.endScope._multi?(at(),dt(ae.endScope,j)):c.skip?de+=z:(c.returnEnd||c.excludeEnd||(de+=z),at(),c.excludeEnd&&(de=z));do ae.scope&&We.closeNode(),!ae.skip&&!ae.subLanguage&&($t+=ae.relevance),ae=ae.parent;while(ae!==Se.parent);return Se.starts&&Un(Se.starts,j),c.returnEnd?0:z.length}function rn(){const j=[];for(let z=ae;z!==vt;z=z.parent)z.scope&&j.unshift(z.scope);j.forEach(z=>We.openNode(z))}let St={};function kn(j,z){const ce=z&&z[0];if(de+=j,ce==null)return at(),0;if(St.type==="begin"&&z.type==="end"&&St.index===z.index&&ce===""){if(de+=H.slice(z.index,z.index+1),!Ie){const Se=new Error(`0 width match regex (${R})`);throw Se.languageName=R,Se.badRule=St.rule,Se}return 1}if(St=z,z.type==="begin")return Dn(z);if(z.type==="illegal"&&!ee){const Se=new Error('Illegal lexeme "'+ce+'" for mode "'+(ae.scope||"<unnamed>")+'"');throw Se.mode=ae,Se}else if(z.type==="end"){const Se=In(z);if(Se!==Pn)return Se}if(z.type==="illegal"&&ce==="")return de+=`
`,1;if(on>1e5&&on>z.index*3)throw new Error("potential infinite loop, way more iterations than matches");return de+=ce,ce.length}const vt=Ae(R);if(!vt)throw Ot(Te.replace("{}",R)),new Error('Unknown language: "'+R+'"');const Fn=Ye(vt);let Rt="",ae=re||Fn;const an={},We=new C.__emitter(C);rn();let de="",$t=0,At=0,on=0,gn=!1;try{if(vt.__emitTokens)vt.__emitTokens(H,We);else{for(ae.matcher.considerAll();;){on++,gn?gn=!1:ae.matcher.considerAll(),ae.matcher.lastIndex=At;const j=ae.matcher.exec(H);if(!j)break;const z=H.substring(At,j.index),ce=kn(z,j);At=j.index+ce}kn(H.substring(At))}return We.finalize(),Rt=We.toHTML(),{language:R,value:Rt,relevance:$t,illegal:!1,_emitter:We,_top:ae}}catch(j){if(j.message&&j.message.includes("Illegal"))return{language:R,value:fn(H),illegal:!0,relevance:0,_illegalBy:{message:j.message,index:At,context:H.slice(At-100,At+100),mode:j.mode,resultSoFar:Rt},_emitter:We};if(Ie)return{language:R,value:fn(H),illegal:!1,relevance:0,errorRaised:j,_emitter:We,_top:ae};throw j}}function Xt(R){const H={value:fn(R),illegal:!1,relevance:0,_top:D,_emitter:new C.__emitter(C)};return H._emitter.addText(R),H}function dn(R,H){H=H||C.languages||Object.keys(E);const ee=Xt(R),re=H.filter(Ae).filter(ot).map(at=>_t(at,R,!1));re.unshift(ee);const qe=re.sort((at,ht)=>{if(at.relevance!==ht.relevance)return ht.relevance-at.relevance;if(at.language&&ht.language){if(Ae(at.language).supersetOf===ht.language)return 1;if(Ae(ht.language).supersetOf===at.language)return-1}return 0}),[ut,Y]=qe,xt=ut;return xt.secondBest=Y,xt}function Tn(R,H,ee){const re=H&&k[H]||ee;R.classList.add("hljs"),R.classList.add(`language-${re}`)}function tn(R){let H=null;const ee=De(R);if(K(ee))return;if(Ht("before:highlightElement",{el:R,language:ee}),R.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",R);return}if(R.children.length>0&&(C.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(R)),C.throwUnescapedHTML))throw new en("One of your code blocks includes unescaped HTML.",R.innerHTML);H=R;const re=H.textContent,qe=ee?Ce(re,{language:ee,ignoreIllegals:!0}):dn(re);R.innerHTML=qe.value,R.dataset.highlighted="yes",Tn(R,ee,qe.language),R.result={language:qe.language,re:qe.relevance,relevance:qe.relevance},qe.secondBest&&(R.secondBest={language:qe.secondBest.language,relevance:qe.secondBest.relevance}),Ht("after:highlightElement",{el:R,result:qe,text:re})}function Gn(R){C=pn(C,R)}const $n=()=>{kt(),Xe("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function Vt(){kt(),Xe("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let Cn=!1;function kt(){function R(){kt()}if(document.readyState==="loading"){Cn||window.addEventListener("DOMContentLoaded",R,!1),Cn=!0;return}document.querySelectorAll(C.cssSelector).forEach(tn)}function Kn(R,H){let ee=null;try{ee=H(h)}catch(re){if(Ot("Language definition for '{}' could not be registered.".replace("{}",R)),Ie)Ot(re);else throw re;ee=D}ee.name||(ee.name=R),E[R]=ee,ee.rawDefinition=H.bind(null,h),ee.aliases&&Mn(ee.aliases,{languageName:R})}function Yn(R){delete E[R];for(const H of Object.keys(k))k[H]===R&&delete k[H]}function qn(){return Object.keys(E)}function Ae(R){return R=(R||"").toLowerCase(),E[R]||E[k[R]]}function Mn(R,{languageName:H}){typeof R=="string"&&(R=[R]),R.forEach(ee=>{k[ee.toLowerCase()]=H})}function ot(R){const H=Ae(R);return H&&!H.disableAutodetect}function Qn(R){R["before:highlightBlock"]&&!R["before:highlightElement"]&&(R["before:highlightElement"]=H=>{R["before:highlightBlock"](Object.assign({block:H.el},H))}),R["after:highlightBlock"]&&!R["after:highlightElement"]&&(R["after:highlightElement"]=H=>{R["after:highlightBlock"](Object.assign({block:H.el},H))})}function Zn(R){Qn(R),Q.push(R)}function nn(R){const H=Q.indexOf(R);H!==-1&&Q.splice(H,1)}function Ht(R,H){const ee=R;Q.forEach(function(re){re[ee]&&re[ee](H)})}function yn(R){return Xe("10.7.0","highlightBlock will be removed entirely in v12.0"),Xe("10.7.0","Please use highlightElement now."),tn(R)}Object.assign(h,{highlight:Ce,highlightAuto:dn,highlightAll:kt,highlightElement:tn,highlightBlock:yn,configure:Gn,initHighlighting:$n,initHighlightingOnLoad:Vt,registerLanguage:Kn,unregisterLanguage:Yn,listLanguages:qn,getLanguage:Ae,registerAliases:Mn,autoDetection:ot,inherit:pn,addPlugin:Zn,removePlugin:nn}),h.debugMode=function(){Ie=!1},h.safeMode=function(){Ie=!0},h.versionString=Jt,h.regex={concat:ue,lookahead:V,either:J,optional:se,anyNumberOfTimes:X};for(const R in it)typeof it[R]=="object"&&n(it[R]);return Object.assign(h,it),h},qt=hn({});return qt.newInstance=()=>hn({}),ya=qt,qt.HighlightJS=qt,qt.default=qt,ya}var jh=Fh();const wi=nh(jh),_i="[A-Za-z$_][0-9A-Za-z$_]*",Bh=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends","using"],Lh=["true","false","null","undefined","NaN","Infinity"],Ho=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],Go=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],$o=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],Ph=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Ch=[].concat($o,Ho,Go);function qh(n){const t=n.regex,e=(ye,{after:et})=>{const y="</"+ye[0].slice(1);return ye.input.indexOf(y,et)!==-1},r=_i,a={begin:"<>",end:"</>"},i=/<[A-Za-z0-9\\._:-]+\s*\/>/,u={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(ye,et)=>{const y=ye[0].length+ye.index,Ue=ye.input[y];if(Ue==="<"||Ue===","){et.ignoreMatch();return}Ue===">"&&(e(ye,{after:y})||et.ignoreMatch());let A;const $=ye.input.substring(y);if(A=$.match(/^\s*=/)){et.ignoreMatch();return}if((A=$.match(/^\s+extends\s+/))&&A.index===0){et.ignoreMatch();return}}},o={$pattern:_i,keyword:Bh,literal:Lh,built_in:Ch,"variable.language":Ph},S="[0-9](_?[0-9])*",I=`\\.(${S})`,te="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",G={className:"number",variants:[{begin:`(\\b(${te})((${I})|\\.)?|(${I}))[eE][+-]?(${S})\\b`},{begin:`\\b(${te})\\b((${I})\\b|\\.)?|(${I})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},V={className:"subst",begin:"\\$\\{",end:"\\}",keywords:o,contains:[]},X={begin:".?html`",end:"",starts:{end:"`",returnEnd:!1,contains:[n.BACKSLASH_ESCAPE,V],subLanguage:"xml"}},se={begin:".?css`",end:"",starts:{end:"`",returnEnd:!1,contains:[n.BACKSLASH_ESCAPE,V],subLanguage:"css"}},ue={begin:".?gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[n.BACKSLASH_ESCAPE,V],subLanguage:"graphql"}},ve={className:"string",begin:"`",end:"`",contains:[n.BACKSLASH_ESCAPE,V]},fe={className:"comment",variants:[n.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:r+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),n.C_BLOCK_COMMENT_MODE,n.C_LINE_COMMENT_MODE]},je=[n.APOS_STRING_MODE,n.QUOTE_STRING_MODE,X,se,ue,ve,{match:/\$\d+/},G];V.contains=je.concat({begin:/\{/,end:/\}/,keywords:o,contains:["self"].concat(je)});const l=[].concat(fe,V.contains),b=l.concat([{begin:/(\s*)\(/,end:/\)/,keywords:o,contains:["self"].concat(l)}]),T={className:"params",begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:o,contains:b},L={variants:[{match:[/class/,/\s+/,r,/\s+/,/extends/,/\s+/,t.concat(r,"(",t.concat(/\./,r),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,r],scope:{1:"keyword",3:"title.class"}}]},be={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...Ho,...Go]}},ne={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},pe={variants:[{match:[/function/,/\s+/,r,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[T],illegal:/%/},w={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function we(ye){return t.concat("(?!",ye.join("|"),")")}const Ge={match:t.concat(/\b/,we([...$o,"super","import"].map(ye=>`${ye}\\s*\\(`)),r,t.lookahead(/\s*\(/)),className:"title.function",relevance:0},Be={begin:t.concat(/\./,t.lookahead(t.concat(r,/(?![0-9A-Za-z$_(])/))),end:r,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},Ze={match:[/get|set/,/\s+/,r,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},T]},Le="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+n.UNDERSCORE_IDENT_RE+")\\s*=>",Ne={match:[/const|var|let/,/\s+/,r,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(Le)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[T]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:o,exports:{PARAMS_CONTAINS:b,CLASS_REFERENCE:be},illegal:/#(?![$_A-z])/,contains:[n.SHEBANG({label:"shebang",binary:"node",relevance:5}),ne,n.APOS_STRING_MODE,n.QUOTE_STRING_MODE,X,se,ue,ve,fe,{match:/\$\d+/},G,be,{scope:"attr",match:r+t.lookahead(":"),relevance:0},Ne,{begin:"("+n.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[fe,n.REGEXP_MODE,{className:"function",begin:Le,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:n.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/(\s*)\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:o,contains:b}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:a.begin,end:a.end},{match:i},{begin:u.begin,"on:begin":u.isTrulyOpeningTag,end:u.end}],subLanguage:"xml",contains:[{begin:u.begin,end:u.end,skip:!0,contains:["self"]}]}]},pe,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+n.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[T,n.inherit(n.TITLE_MODE,{begin:r,className:"title.function"})]},{match:/\.\.\./,relevance:0},Be,{match:"\\$"+r,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[T]},Ge,w,L,Ze,{match:/\$[(.]/}]}}const Uh={class:"cb"},Dh={class:"cb__pre"},Wh=["innerHTML"],zh=Cr({__name:"CourseCodeBlock",props:{code:{}},setup(n){wi.registerLanguage("javascript",qh);const t=n,{t:e}=qr(),r=Aa(()=>wi.highlight(t.code,{language:"javascript"}).value),a=vn(!1),i=async()=>{try{await navigator.clipboard.writeText(t.code),a.value=!0,setTimeout(()=>a.value=!1,2e3)}catch{}};return(u,o)=>(wt(),jt("div",Uh,[me("button",{class:"cb__copy",type:"button",onClick:i},He(le(a)?le(e)("course.copied"):le(e)("course.copy")),1),me("pre",Dh,[me("code",{class:"hljs language-javascript",innerHTML:le(r)},null,8,Wh)])]))}}),Jh=Object.assign(Ur(zh,[["__scopeId","data-v-c7131343"]]),{__name:"CourseCodeBlock"}),Xh=["id"],Vh={class:"lesson__title"},Hh={class:"lesson__num"},Gh={key:1,class:"lesson__text"},$h=Cr({__name:"CourseLesson",props:{lesson:{},index:{}},setup(n){const{locale:t}=qr(),e=Aa(()=>t.value!=="ru");return(r,a)=>{const i=Jh;return wt(),jt("section",{id:n.lesson.slug,class:"lesson"},[me("h3",Vh,[me("span",Hh,He(String(n.index).padStart(2,"0")),1),ga(" "+He(le(e)?n.lesson.title.en:n.lesson.title.ru),1)]),(wt(!0),jt(or,null,gr(n.lesson.blocks,(u,o)=>(wt(),jt(or,{key:o},[u.type==="code"?(wt(),ma(i,{key:0,code:u.code},null,8,["code"])):(wt(),jt("p",Gh,He(le(e)?u.en:u.ru),1))],64))),128))],8,Xh)}}}),Kh=Object.assign(Ur($h,[["__scopeId","data-v-ed6f296e"]]),{__name:"CourseLesson"}),Yh={slug:"for-whom",title:{ru:"Для кого этот курс",en:"Who this course is for"},blocks:[{type:"text",ru:"Этот курс в первую очередь написан для разработчиков с опытом разработки в JS, которые хотят расширить свой кругозор и писать более надежный, декларативный и сопровождаемый код в функциональном стиле.",en:"This course is written primarily for developers with JS experience who want to broaden their horizons and write more reliable, declarative, and maintainable code in a functional style."}]},Qh={slug:"not-for-whom",title:{ru:"Кому этот курс не подойдет",en:"Who this course is not for"},blocks:[{type:"text",ru:"Этот курс не подойдет начинающим разработчикам, которые только постигают азы разработки на JS.",en:"This course is not suitable for beginner developers who are only just learning the basics of JS development."}]},Zh={slug:"imperative-vs-declarative",title:{ru:"Императивность и декларативность",en:"Imperative vs declarative"},blocks:[{type:"text",ru:'Императивный код говорит вам "как вы это делаете". То есть Вам надо вникать в сам код.',en:'Imperative code tells you "how you do it". In other words, you have to dig into the code itself.'},{type:"text",ru:"Декларативный код Вам говорит, что делает ваш код, он чаще модульный, и вам не нужно вникать в весь код. Если требуются изменения, вы вносите изменения в определенный участок кода модульно.",en:"Declarative code tells you what your code does; it is more often modular, and you do not need to dig into the whole codebase. If changes are needed, you make them in a specific section of the code in a modular way."},{type:"code",code:`// например получить все числа больше 3 из текущего массива

// Императивный код
// ========
let result = [] // массив результирующий

const numbers = [1, 2, 3, 4, 5] // текущий массив

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 3) {
    result.push(numbers[i])
  }
}

console.log(result) // 4, 5
// =========


// Декларативный код
// =========
// isGt3 :: Number -> Boolean
const isGt3 = number => number > 3

const result = numbers.filter(isGt3) // мы не вникаем в реализацию а просто читаем название

console.log(result) // 4, 5 тот же результат более декларативен
// =========

// Мы можем повысить слои абстракции (и тут Остапа понесло))) )
// =========
// не пугайтесь если сразу непонятно, поймете дальше

// filter :: (* -> Boolean) -> [a] -> [a]
const filter = (predicat, arr) => arr.filter(predicat)

// filterBy :: (* -> Boolean) -> [a] -> [a]
const filterBy = (predicat) => (arr) => filter(predicat, arr)

// gt :: Number -> (Number -> Boolean) -> Boolean
const gt = pointer => number => number > pointer

// теперь мы создаем любые функции предикаты
// для фильтрации
// gt2 :: Number -> (Number -> Boolean)
const gt2 = gt(2) // предикат для фильтрации чисел больше 2
const gt3 = gt(3) // предикат для фильтрации чисел больше 3

// а вот теперь мы можем фильтровать массив по любым предикатам
const arr = [1, 2, 3, 4, 5]

const more2 = filterBy (gt2) (arr) // получаем числа больше 2
const more3 = filterBy (gt3) (arr) // получаем числа больше 3

// мы можем также главную функцию фильтрации подготовить для конвееров
// не вызывая сразу ее
// filterByGt2 :: [a] -> [a]
const filterByGt2 = filterBy (gt2) // ожидает массива

// filterByGt2 (arr) из названия мы уже понимаем что идет фильтрация чисел больше 2
const result = filterByGt2 (arr) // получаем готовый результат числа больше 2
// ======`}]},ed={slug:"functional-programming",title:{ru:"Функциональное программирование",en:"Functional programming"},blocks:[{type:"text",ru:"Функциональное программирование - это высокоуровневая декларативная разработка на основе чистых функций. Функциональное программирование - парадигма программирования, которая опирается на функции как на основные строительные блоки.",en:"Functional programming is high-level, declarative development based on pure functions. Functional programming is a programming paradigm that relies on functions as its primary building blocks."},{type:"text",ru:"Чистые функции - это функции, которые при одних и тех же аргументах возвращают одинаковый результат и не создают побочных (сайд) эффектов.",en:"Pure functions are functions that return the same result for the same arguments and produce no side effects."},{type:"code",code:`// ==== Внимание ===
// Эти примеры Вам пока могут казаться крайне запутанными и непонятными
// Не пугайтесь и читайте дальше

// наша цель
// 1. Получить пользователей со статусом онлайн
// 2. Старше 20 лет
// 3. Первого пользователя из списка
// 4. Получить его имя

// Пример функционального кода
// импорт готовых утилит с библиотеки
import { pipe, prop, equals, filter, head, gt } from 'sanctuary';

// fetchAllUsers :: * -> Promise a
const fetchAllUsers = () => new Promise(resolve => resolve([
  {
    name: 'John',
    status: 'online',
    age: 25
  },
  {
    name: 'Alex',
    status: 'offline',
    age: 18
  },
  {
    name: 'Angel',
    status: 'online',
    age: 18
  }
]))

const ONLINE = 'online'

// isStatus :: String -> (a -> Boolean)
const isStatus = status => pipe([
  prop('status'), // берем содержимое поля статус у пользователя
  equals(status), // сравниваем поле юзера со статусом установленным выше
])

// moreAge :: Number -> (a -> Boolean)
const moreAge = age => pipe([
  prop('age'), // берем содержимое поля возраст
  gt(age), // поле юзера было больше age
])

// isStatusOnline :: a -> Boolean
const isStatusOnline = isStatus(ONLINE)

//  moreAge20 :: a -> Boolean
const moreAge20 = moreAge(20)

// getName :: a -> String
const getName = prop('name')

// Внимание необязательно создавать чрезмерную абстракцию
// это иногда может запутать коллег
// В идеале конечно лучше обернуть в монаду для защиты от падений композиции
// в случае если с сервера прилетит, что попало и это будет настоящей защитой
// а не псевдо как в typescript

// searchOnlineUsers :: [a] -> a
const searchOnlineUsers= pipe([
  filter(isStatusOnline), // получаем только пользователей онлайн
  filter(moreAge20), // получаем пользователей старше 20 лет
  head, // получаем первого пользователя из списка
  getName // получить имя этого пользователя
])

// start программы
const onlineUsersByAge = await fetchAllUsers().then(searchOnlineUsers)
console.log(onlineUsersByAge) // 'John'`}]},td={slug:"pure-functions",title:{ru:"Чистые функции",en:"Pure functions"},blocks:[{type:"text",ru:"Чистые функции крайне важны и обычно они идемпотентны, но не всегда. Если вам нужны сайд эффекты то группируйте их в отдельные функции и разделяйте от чистых функций. Любая программа особенно в вебе нуждается в сайд эффектах (изменение Dom дерева (tree), запросы к серверу (fetch), чтение из файла (readFile) и тп)",en:"Pure functions are extremely important and are usually idempotent, but not always. If you need side effects, group them into separate functions and keep them apart from pure functions. Every program, especially on the web, needs side effects (mutating the DOM tree, requests to the server (fetch), reading from a file (readFile), and so on)."},{type:"code",code:`// НЕчистая функция
// ===============================
let user = { name: 'John', age: 25 }

const changeAge = () => user.age = 30

// мы мутируем внешнюю переменную и создаем сайд эффекты
// программа будет везти себя непредсказуемо так как с этой
// переменной могут работать несколько функций  и отловить ошибку будет сложнее
changeAge()
console.log(user) // { name: 'John', age: 30 }
// ===============================


// Такой код допустим, если мы создаем независимые модули с собственным замыканием
// ===============================
// useChangeUser :: Object -> Object
const useChangeUser = (user) => {

  let userBase = structuredClone(user) // обязательно клонируем

  const changeAge = (newAge) => userBase.age = newAge

  // для работы снаружи с данными
  return {
    userBase,
    changeAge
  }
}

// Но даже в этом случае лучше делать так
// useChangeUser :: Object -> Object
const useChangeUser = (user) => {

  let userBase = structuredClone(user) // обязательно клонируем

  const changeAge = (newAge) => userBase = ({
    ...userBase, // или structuredClone(userBase) или JSON.parse(JSON.stringify(user))
    age: newAge
  })

  // для работы снаружи с данными
  return {
    userBase,
    changeAge
  }
}
// ===============================


// А теперь давайте поправим пример выше
// ===============================
let user = { name: 'John', age: 25 }

// Чистая функция
// changeAge :: Number -> Object -> Object
const changeAge = (newAge, user) => ({
  ...user,
  age: newAge
})

//  улучшим
// или если требуется глубокое клонирование и каррирование

// changeAge :: Number -> Object -> Object
const changeAge = (newAge) => (user) => ({
  ...structuredClone(user), // или JSON.parse(JSON.stringify(user))
  age: newAge
})

// тут мы проверим все
const changedUser = changeAge (30) (user)

console.log(user) // { name: John, age: 25 } сохранил первоначальное состояние
console.log(changedUser) // { name: John, age: 30 } получили нового пользователя без сайд эффектов
// ===============================`}]},nd={slug:"hindley-milner-type-notation",title:{ru:"Нотация типов Хиндли–Милнера",en:"Hindley–Milner type notation"},blocks:[{type:"text",ru:"Нотацию типов Хиндли–Милнера вы уже встречали в коде. Над функциями, в блоке комментариев.",en:"You have already come across Hindley–Milner type notation in the code — above functions, in comment blocks."},{type:"text",ru:"Эта нотация типов используется в Haskell и других языках с функциональным уклоном. В JS она помогает нам писать более абстрактный код, а также помогает сопровождать этот код.",en:"This type notation is used in Haskell and other languages with a functional bent. In JS it helps us write more abstract code, and it also helps maintain that code."},{type:"text",ru:"Даёт объяснение, какие типы аргументов принимает функция и что возвращает.",en:"It explains which argument types a function accepts and what it returns."},{type:"code",code:`// без нотации
const foo = (a, b) => a + b

// в функции выше мы не можем понять, это функция по сложению или конкатенации
//  конечно мы можем назвать правильно функцию foo

// конечно мы можем написать функцию вот так
const concat = (a, b) => a + b // конкатенация
const add = (a, b) => a + b // сложение

// с нотацией
// Название функции :: Первый аргумент -> Второй аргумент -> Возвращаемое значение

// add :: Number -> Number -> Number
const add = (a, b) => a + b // сложение

// map :: (a -> b) -> [a] -> [b]
const map = (mappable) => (arr) => arr.map(mappable)

// тоже самое но более классический подход в рамках теории категории
// и Спецификации Fantasy-land не пугаемся об этом поговорим позже
// Тип Функтор => Принимает функцию (a значение превращает в b) -> Функтор a аргумент -> Функтор b возвращает
// Спойлер )) функтор это любой тип, который реализовал интерфейс map
// Functor f => (a → b) → f a → f b
const map = (mappable) => (arr) => arr.map(mappable)`}]},rd={slug:"category-theory",title:{ru:"Теория категорий",en:"Category theory"},blocks:[{type:"text",ru:"Существует тесная связь между функциональным программированием и теорией категорий. В функциональном программировании многие абстракции, законы и принципы взяты из теории категорий.",en:"There is a close connection between functional programming and category theory. In functional programming many abstractions, laws and principles are taken from category theory."},{type:"text",ru:"Что же мы знаем о теории категорий. Мы не будем углубляться в основы и академические термины. Мы постараемся объяснить всё это без академических терминов.",en:"So what do we know about category theory? We will not dive into the fundamentals and academic terms. We will try to explain all of this without academic terminology."},{type:"text",ru:"Теория категорий в рамках программирования — это совокупность абстрактных объектов (любые типы данных Array, Object, Number, String ...) и их морфизмов (стрелок, их отношений, то есть функций), а также законов, по которым они работают (композиция и т. п.).",en:"Category theory in the context of programming is a collection of abstract objects (any data types: Array, Object, Number, String, ...) and their morphisms (arrows, the relations between them — that is, functions), as well as the laws by which they operate (composition and so on)."},{type:"code",code:`//  Пример
a -> b -> c

a, b, c // это объекты
-> // это их отношения и процессы над ними
a ... c // процесс композиции

// Практический пример

// concatX :: Number -> String
const concatX = num => \`\${num} X\`

// toArray:: a -> [a]
const toArray = word => [word]

// compose :: (* -> *) -> (* -> *) -> * -> *
const compose = (f2, f1) => (...args) => f2(f1(...args))

const pipeline = compose(
  toArray, // строку превращаем в массив
  concatX // добавляем X и превращаем в строку
  )

// start
pipeline(5) // ['5 X'] результат

// Что же тут произошло
// мы входной аргумент 5 это "a" тип Number
// конкатенировали букву X и получили '5 X' это "b" тип String
// добавили в массив и получили ['5 X'] это "с" тип Array
// и все это сделали законом композиции
// 5 -> '5 X' -> ['5 X'] это абстрактные объекты (Number, String, Array) их отношение объектов(вызовы функций -> ) по законом композиции
// a -> b -> c`},{type:"text",ru:"А давайте мы с вами пофантазируем, чтобы глубже понять теорию категорий. Используем аналогии из окружающего нас мира.",en:"Let's use our imagination to understand category theory more deeply. We will draw analogies from the world around us."},{type:"text",ru:"Мы используем природу и напишем псевдокод, реализующий теорию категорий.",en:"We will use nature and write pseudocode that implements category theory."},{type:"code",code:`//  Пример
a -> b -> c
твердое -> жидкое -> газообразное
лёд -> вода -> пар

лёд, вода, пар // это объекты
-> // процессы над ними (нагрев и тп)
a ... c // процесс композиции (упорядоченная совокупность процессов)

// Практический пример

// превратитьВВоду :: лёд -> вода
const превратитьВВоду = лёд => (держим в комнатной температуре, вода)

// превратитьВПар:: вода -> пар
const превратитьВПар = вода=> (производим сильный нагрев, пар)

// композицияПроцессов :: (* -> *) -> (* -> *) -> * -> *
const композицияПроцессов = (f2, f1) => (...args) => f2(f1(...args))

const pipeline = композицияПроцессов(
  превратитьВПар,
  превратитьВВоду
  )

// start
pipeline(лёд) // пар результат`}]},ad={slug:"fantasy-land",title:{ru:"Fantasy-land (Страна фантазий)",en:"Fantasy-land"},blocks:[{type:"text",ru:"Спецификация Fantasy-land (Страна фантазий) — это набор правил и публичных интерфейсов, описывающих абстракции из теории категорий.",en:"The Fantasy Land specification is a set of rules and public interfaces describing abstractions from category theory."},{type:"text",ru:"Эти правила и законы опираются на алгебраические структуры данных.",en:"These rules and laws rest on algebraic data structures."},{type:"text",ru:"По сути, реализуя эти интерфейсы и законы, мы следуем спецификации Fantasy-land (Страна фантазий).",en:"In essence, by implementing these interfaces and laws, we follow the Fantasy Land specification."},{type:"code",code:`// Вот как она выглядит

Setoid   Semigroupoid  Semigroup   Foldable        Functor      Contravariant  Filterable
(equals)    (compose)    (concat)   (reduce)         (map)        (contramap)    (filter)
    |           |           |           \\         / | | | | \\
    |           |           |            \\       /  | | | |  \\
    |           |           |             \\     /   | | | |   \\
    |           |           |              \\   /    | | | |    \\
    |           |           |               \\ /     | | | |     \\
  Ord      Category     Monoid         Traversable | | | |      \\
  (lte)       (id)       (empty)        (traverse)  / | | \\       \\
                            |                      /  | |  \\       \\
                            |                     /   / \\   \\       \\
                            |             Profunctor /   \\ Bifunctor \\
                            |              (promap) /     \\ (bimap)   \\
                            |                      /       \\           \\
                          Group                   /         \\           \\
                        (invert)               Alt        Apply      Extend
                                              (alt)        (ap)     (extend)
                                                /           / \\           \\
                                              /           /   \\           \\
                                              /           /     \\           \\
                                            /           /       \\           \\
                                            /           /         \\           \\
                                          Plus    Applicative    Chain      Comonad
                                        (zero)       (of)      (chain)    (extract)
                                            \\         / \\         / \\
                                            \\       /   \\       /   \\
                                              \\     /     \\     /     \\
                                              \\   /       \\   /       \\
                                                \\ /         \\ /         \\
                                            Alternative    Monad     ChainRec
                                                                    (chainRec)`},{type:"text",ru:"Давайте мы попробуем с вами создать Functor (функтор) согласно спецификации Fantasy-land (Страна фантазий).",en:"Let's try to create a Functor according to the Fantasy Land specification."},{type:"code",code:`// Сигнатура
fantasy-land/map :: Functor f => f a ~> (a -> b) -> f b

// Создание функтора
// ==== синтаксис es5 ======

// подготавливаем прототип для функции конструктора
// удалив наследование Object.prototype дефолтная
var prototypeFunctor = Object.create(null)

// Название строки функции и метода согласно спецификации
const FANTASY_LAND_MAP = 'fantasy-land/map'

// создаем функцию конструктор
function Functor(value) {
  this.value = value
}

// создаем правильные связи между прототипом и функций конструктором
Functor.prototype = prototypeFunctor
prototypeFunctor.constructor = Functor

//  а вот теперь самое главное реализовываем интерфейс функтора
prototypeFunctor[FANTASY_LAND_MAP] = function (fn) {
  return new Functor(fn(this.value))
}

// Давайте разделим ключевую логику на части
// return new Functor(fn(this.value))
// 1. Текущей содержимое контейнера мы пропускаем через функцию
fn(this.value)
// 2. Возвращаем новый экземпляр типа функтор уже с новым значением
return new Functor(тут результат инструкции выше)

// Пример
var functorObj = new Functor(5)

var functorResult = functorObj[FANTASY_LAND_MAP](value => value * 2)

// отсутствуют мутации
// реализован интерфейс спецификации
console.log(functorObj.value) // 5
console.log(functorResult.value) // 10

// =========================

// Полифил
// как устроен примерно внутри Object.create(objectProto)
var createObjectProto = function (obj) {
  // для создания экземпляра формируем конструктор
  function XXX() {}

  // устанавливаем правильные ссылки
  XXX.prototype = obj || Object.prototype
  XXX.prototype.constructor = XXX

  // создаем экземпляр и возвращаем
  return new XXX()
}

// ==== синтаксис es6 ======
// тут все гораздо проще
// тут в прототипе мы также можем уничтожить дефолтное наследование Object.prototype
class Functor {
  constructor (value) {
    this.value = value
  }

  // этот метод и так уже будет хранится по дефолту в прототипе
  [FANTASY_LAND_MAP] (fn) {
    return new Functor(fn(this.value))
  }
}

// Пример описанный выше также сработает
const functorObj = new Functor(5)
// =========================


// ==== через чистые функции ======
// Создание функтора без создания экземпляров
// через чистые функции
const functor = value => ({
  value,
  [FANTASY_LAND_MAP]: (fn) => functor(fn(value))
})

// создали объект и вернули его
const objA = functor(10)
const objB = objA[FANTASY_LAND_MAP](value => value - 5)

console.log(objA.value) // 10
console.log(objB.value) // 5

// =========================`}]},id={slug:"composition",title:{ru:"Композиция функций",en:"Function composition"},blocks:[{type:"text",ru:"Композиция функций — это способность функций вызываться последовательно, где результат одной функции передаётся следующей.",en:"Function composition is the ability of functions to be called in sequence, where the result of one function is passed to the next."},{type:"text",ru:"Композиция функций — это одно из фундаментальных понятий, на которых основана теория категорий.",en:"Function composition is one of the fundamental concepts on which category theory is based."},{type:"code",code:`// === композиция из 3 функций ===
// compose :: (c -> z) -> (b -> c) -> (a -> b) -> a -> z
const compose = (f3, f2, f1) => (...args) => f3(f2(f1(...args)))

// использование функции
// наша цель
// 1. Получить пользователей со статусом онлайн
// 2. Их имена
// 3. Вывезти список имен в лог

// fetchAllUsers :: * -> Promise a
const fetchAllUsers = () => new Promise(resolve => resolve([
  {
    name: 'John',
    status: 'online',
    age: 25
  },
  {
    name: 'Alex',
    status: 'offline',
    age: 18
  },
  {
    name: 'Angel',
    status: 'online',
    age: 18
  }
]))

fetchAllUsers() // имитируем запрос
  .then( // дожидаемся ответа
    compose( // результат бросаем в композицию функций
        console.log, // логируем результаты
        (usersActive) => usersActive.map(user => user.name), /// собираем имена
        (data) => data.filter(user => user.status === 'online'), // фильтруем по статусу
      )
    )

// таже самая композиция только в рамках типа Array
// не совсем классический функциональный подход
fetchAllUsers() // имитируем запрос
  .then( // дожидаемся ответа
      (data) => console.log(
          data
            .filter(user => user.status === 'online')
            .map(user => user.name)
        )
    )

// ===============================`},{type:"text",ru:"Если вы заметили в примере выше, порядок выполнения функций был справа налево — с точки зрения математики это нормально. Но часто читателю удобнее читать код слева направо.",en:"If you noticed in the example above, the functions executed from right to left — mathematically that's fine. But it is often more convenient for the reader to read code from left to right."},{type:"text",ru:"Поэтому код выше мы можем переписать.",en:"So we can rewrite the code above."},{type:"code",code:`// === композиция из 3 функций в человеко читаемом формате ===
// порядок сменился на слева на право
// pipe ::  (a -> b) -> (b -> c) -> (c -> z) -> a -> z
const pipe = (f1, f2, f3) => (...args) => f3(f2(f1(...args)))

// Теперь композицию удобнее читать слева на право

fetchAllUsers() // имитируем запрос
  .then( // дожидаемся ответа
    pipe( // результат бросаем в композицию функций
        (data) => data.filter(user => user.status === 'online'), // фильтруем по статусу
        (usersActive) => usersActive.map(user => user.name), /// собираем имена
        console.log, // логируем результаты
      )
    )

// Внимание

// compose порядок выполнения функций
3 <- 2 <- 1

// pipe
1 -> 2 -> 3

// ===============================`},{type:"text",ru:"А теперь представим ситуацию, когда количество функций более 3.",en:"Now imagine a situation where the number of functions is more than 3."},{type:"text",ru:"В реальных проектах используйте compose или pipe из готовых библиотек. Мы попробуем создать compose несколькими способами (императивно) (декларативно) (рекурсивно).",en:"In real projects, use compose or pipe from existing libraries. We will try to build compose in several ways: (imperatively) (declaratively) (recursively)."},{type:"code",code:`// === композиция функций в нестрого заданном количестве функций ===

// === Способ императивный ===
// порядок сменился на слева на право
// pipe ::  (a -> b) -> ..., -> a -> z
const pipe = (...fns) => (...args) => {

  // дробим массив функций на голову и хвост ))
  const [ head, ...tail ] = fns

  // переменная с результатом выполнения
  // первой и остальных функций и результата
  let result = head(...args)

  // в цикле вызываем остальные функции и перезаписываем результат
  // в переменную
  for (const fn of tail) {
    result = fn(result)
  }

  // возвращаем итоговый результат
  return result
}

// ===============================`},{type:"text",ru:"А теперь давайте реализуем в функциональном стиле, декларативно.",en:"Now let's implement it in a functional style, declaratively."},{type:"code",code:`// === композиция функций в нестрого заданном количестве функций ===

// === Способ декларативный ===
// порядок сменился на слева на право
// pipe ::  (a -> b) -> ..., -> a -> z
const pipe = (...fns) => (arg) => fns.reduce(
    (init, fn) => fn(init), // акумм значение или инит бросаем в функцию
    arg // аргумент первого вызова
  )

// на первый взгляд в этой функции все топчик))
// и с точки зрения функционального подхода аргумент лучше и правильнее когда один
// но может быть ситуация когда при первом запуске аргументов 2 и более
const pipe = (...fns) => (...args) => fns.reduce(
    (init, fn, i) => i === 0 ? fn(...init) : fn(init) , // проверка первый вызов или остальные
    args // аргументы первого вызова
)

// ===============================`},{type:"text",ru:"Мы также можем реализовать композицию функций рекурсивно. Сразу сделаем оптимизацию хвостовой рекурсии и сократим количество вызовов вдвое.",en:"We can also implement function composition recursively. We'll apply tail-call optimization right away and cut the number of calls in half."},{type:"code",code:`// === композиция функций в нестрого заданном количестве функций ===

// === Способ рекурсивный ===
// порядок сменился на слева на право
// pipe ::  (a -> b) -> ..., -> a -> z
const pipe = (...fns) => (arg) => {

  // базовый случай — одна функция осталась
  if (fns.length === 1) {
    return fns[0](arg)
  }

  // разбиваем голову и хвост
  // первая функция и остальные
  const [head, ...tail] = fns

  // рекурсивно вызываем pipe для хвоста
  // а первую функцию вызываем с аргументом текущим
  return pipe(...tail)(head(arg))
}

// ===============================`}]},od={slug:"currying",title:{ru:"Каррирование",en:"Currying"},blocks:[{type:"text",ru:"Каррирование — это один из приёмов, используемых в функциональном программировании, при котором вычисление функции происходит только при полном получении всех аргументов, а при частичном получении аргументов функция возвращает новую функцию.",en:"Currying is one of the techniques used in functional programming, in which the function is evaluated only once all of its arguments have been supplied, while given only some of the arguments the function returns a new function."},{type:"text",ru:"Каррирование может быть использовано:",en:"Currying can be used:"},{type:"text",ru:"1. В композиции функций, когда функция в последовательности вызовов ожидает два и более аргумента.",en:"1. In function composition, when a function in a chain of calls expects two or more arguments."},{type:"text",ru:"2. Когда мы хотим создавать специализированные функции на основе базовой функции, меняя значение аргумента в замыкании.",en:"2. When we want to create specialized functions based on a base function by changing the value of an argument captured in a closure."},{type:"code",code:`//  Пример
// Каррирование
// sum :: Number -> Number -> Number -> Number
const sum  = (a) => (b) => (c) => a + b + c

// функция вычисляется только когда получает все аргументы
// иначе возвращает новая функция
const result = sum (1) (2) (1)

console.log(result) // 4

// Неполные вызовы каррированной функции

// add : Number -> Number -> Number
const add = (a) => (b) => a + b

// в замыкании хранится 10 и ждёт второго аргумента
// возвращается функция
const add10 = add(10)
// после получения второго аргумента
// происходит полное вычисление функции
const resultAdded = add10(5) // 15`},{type:"text",ru:"Как же нам каррировать любую функцию с n количеством параметров, значение которых мы не знаем. Например, 5 параметров и более у функции.",en:"So how do we curry an arbitrary function with n parameters whose values we don't know — for example, a function with 5 or more parameters?"},{type:"text",ru:"Можно использовать автоматическое каррирование любой функции и вызывать её в любом порядке.",en:"We can apply automatic currying to any function and call it in any order."},{type:"code",code:`// Например мы хотим каррировать функцию sum
// sum :: Number -> Number -> Number -> Number
const sum  = (a, b, c) => a + b + c

// функция которая каррирует любую функцию
// curry :: (* -> *) -> * -> (* -> *)
const curry = (fn) => {
  // количество параметров функции
  const lengthFn = fn.length

  // внутренняя функция, которая будет вызываться рекурсивно
  const curried = (...argsFirst) => {
    // если количество входящих аргументов больше или равно
    // количество аргументов функции то мы немедленно вызываем её
    if (argsFirst.length >= lengthFn) {
      return fn(...argsFirst)
    }

    // если входящих аргументов меньше, чем количество
    // аргументов у функции то возвращаем новую функцию
    // и собираем остальные аргументы
    return (...argsSecond) => curried(...argsFirst, ...argsSecond)
  }

  return curried
}

// каррируем нашу функцию sum
const sumCurry = curry(sum)

// теперь можем вызывать ее как угодно
console.log( sumCurry (1) (1) (1) ) // 3
console.log( sumCurry (1, 1) (1) ) // 3
console.log( sumCurry (1) (1, 1) ) // 3
console.log( sumCurry (1, 1, 1) ) // 3`},{type:"text",ru:"А теперь давайте глянем всю мощь каррирования на примерах композиции функций.",en:"Now let's look at the full power of currying through examples of function composition."},{type:"code",code:`// Например в следующей композиции будут
// =====================================
// использоваться две функции каррированые
// одна каррированая уже
// а другая автоматически каррируем перед вызовом

// данные с которыми будем работать
// список пользователей
// fetchAllUsers :: * -> Promise a
const fetchAllUsers = () => new Promise(resolve => resolve([
  { name: 'John', status: 'online', age: 28 },
  { name: 'Angel', status: 'online', age: 35 },
  { name: 'Michel', status: 'offline', age: 18 },
  { name: 'Anna', status: 'offline', age: 20 },
]))

// Наша задача
// 1. Получить пользователей со статусом онлайн
// 2. Возрастом старше 30 лет
// 3. их имена

// filter :: (a -> Boolean) -> [a] -> [a]
const filter = (fn) => (arr) => arr.filter(fn)

// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => arr.map(fn)

// функция предикат, которая будет проверять статус
// isStatus :: String -> String -> a -> Boolean
const isStatus = (status) => (prop) => (user) => user[prop] === status

// isMoreAge :: String -> String -> a -> Boolean
const isMoreAge = (age, prop, user) => user[prop] > age

// давайте используя функцию выше мы автокаррируем её
const isMoreAgeCurry = curry(isMoreAge)

// вызовим дважды и создадим абстракцию с понятным названием
// предикат функция которая будет проверять на возраст
const isMoreAge30 = isMoreAgeCurry (30) ('age')

// получение значений по ключу
// getByProp :: String -> a -> String
const getByProp = (prop) => (user) => user[prop]

//  в замыкании сохраняем ключ 'name' и ожидаем объект
// getName :: a -> String
const getName = getByProp('name')

// готовим композицию и при след вызове в качестве аргумента
// ждем массив пользователей
// представим что pipe функция уже реализована или готова
const pipeline = pipe (
  filter ( isStatus ('online') ('status') ), // только онлайн пользователей получаем
  filter ( isMoreAge30 ), // возрастом старше 30 лет
  map ( getName ), // вернуть имена
)

(async () => {

  // запуск промиса с данными
  // данные бросаем в композицию и запускаем её
  const adultsUsers = await fetchAllUsers()
                                          .then(pipeline)

  console.log(adultsUsers) // ['Angel']
})


// =============================

// в коде выше все круто описано
// но если пользователей несколько десятков тысяч
// и нам нужна оптимизация мы можем сделать так
// чтобы исключить двойной обход массива в рамках filter
const pipeline = pipe (
  filter (
    (user) => (
      isStatus ('online') ('status') (user) && isMoreAge30 (user)
    )
  ), // разовый проход с проверкой по двум предикатам сразу
  map ( getName ), // вернуть имена
)`},{type:"text",ru:"Мы также можем создавать специализированные функции при помощи каррирования. Это нечто подобное «наследованию» в ООП.",en:'We can also create specialized functions with the help of currying. It is somewhat similar to "inheritance" in OOP.'},{type:"text",ru:"Берётся базовая каррированная функция, а дальше при помощи вызовов создаются другие функции. Ну хватит болтать)) давайте сразу приступим к примерам.",en:"We take a base curried function, and then we build other functions through calls. Enough talking)) let's get straight to the examples."},{type:"code",code:`// Давайте возьмем каррированную функцию
// и начнем создавать другие специализированные функции

// Базовая функция сравнения значения по определенному ключу
// equalBy :: String -> * -> a -> Boolean
const equalBy = (prop) => (value) => (obj) => obj[prop] === value

// данные с которыми мы будем работать
const user = { name: 'John', status: 'online', married: true }

// мы бы могли вызвать функцию разом
const onlineStatusUser = equalBy ('status') ('online') (user)

// проверяем онлайн ли статус у пользователя
console.log(onlineStatusUser) // true

// теперь давайте начнем создавать
// специализированные функции из equalBy

// сравнение по ключу статусу
const equalByStatus = equalBy ('status')
// сравнение по ключу женат
const equalByMarried = equalBy ('married')

// создадим еще один слой абстракции
// проверка онлайн
const isOnline = equalByStatus ('online')
// проверка оффлайн
const isOffline = equalByStatus ('offline')

// проверка женат ли
const isMarried = equalByMarried (true)
// проверка не женат
const isNotMarried = equalByMarried (false)

// мы можем написать хелпер отрицания
// для последних функций
// not :: (a -> Boolean) -> a -> Boolean
const not = (fn) => (...args) => !fn(...args)

// человеко читаемое выражение не онлайн
const offlineUserCheck = not (isOnline)
const notMarriedCheck = not (isMarried)

// а теперь давайте запустим наши спец функции
// и проверим онлайн ли пользователь и женат ли он

// получим статус юзера
const isOnlineUser = isOnline (user)
//  получим его статус женат ли
const isMarriedUser = isMarried (user)

// теперь давайте допускать в наше приложение
// пользователей женатых и которые онлайн

// напишем хелпер
// and :: Boolean -> Boolean -> Boolean
const and = (valueFirst) => (valueSecond) => valueFirst && valueSecond

// обратите внимание код стал человекочитаемым
// и очень абстрактным
// каждая функция делает одну логическую операцию
// код говорит что делает а не как
if (and (isOnlineUser) (isMarriedUser) ) {
  // что то там делам ...
}`}]},ud={slug:"currying-and-asynchrony",title:{ru:"Каррирование и Асинхронность (Эволюция)",en:"Currying and asynchrony (evolution)"},blocks:[{type:"text",ru:"Каррирование можно эффективно использовать в асинхронном программировании.",en:"Currying can be used effectively in asynchronous programming."},{type:"text",ru:"1. Создание специализированных функций",en:"1. Creating specialized functions"},{type:"text",ru:'2. Победим "ад колбеков" без промисов',en:'2. We will defeat "callback hell" without promises'},{type:"code",code:`//  Давайте создадим базовую функцию для запросов
// baseFetch :: String -> String -> a -> Promise
const baseFetch = (baseUrl)
                    => (params)
                    => (config = {}) =>
                      fetch(\`\${baseUrl}/\${params}\`, config)


const BASE_URL = 'https://example.com'
// для работы с базовым url
const useFetch = baseFetch (BASE_URL)

// создадим две специализированные функции
// получение списка всех пользователей
const getAllUser = useFetch ('all-users')
// получения списка всех книг
const getAllBooks = useFetch ('all-books')

// дальше можем вызывать функции и получать данные
( async () => console.log( await getAllUser () )) ()
( async () => console.log( await getAllBooks () )) ()

// вы можете добавить авторизационные токены
// в отдельном замыкании если это необходимо
// xFetch :: String -> b -> String -> a -> Promise
const xFetch = (baseUrl)
          => (headers)
          => (params)
          => (config = {}) =>
            fetch(\`\${baseUrl}/\${params}\`, {
              ...headers,
              ...config,
            })

const token = 'xxx'
// для работы с базовым url и установка заголовком сразу
const useXFetch = xFetch (BASE_URL) ({
  headers: {
      'Content-Type': 'application/json',
      'authorization': \`Bearer \${token}\`,
    }
})

// создадим две специализированные функции
// получение списка всех пользователей
const getAllUserX = useXFetch ('all-users')
// получения списка всех книг
const getAllBooksX = useXFetch ('all-books')`},{type:"text",ru:"А теперь внизу мы покажем два примера.",en:"Now below we will show two examples."},{type:"text",ru:"Первый код будет императивный на колбеках, а второй будет использовать каррирование и замыкание без промисов.",en:"The first piece of code will be imperative and callback-based, while the second will use currying and closures without promises."},{type:"code",code:`//  код который "плохо пахнет"

// создадим функцию для запросов на основе XMLHttpRequest
// он на событиях без промисов
// можно конечно обернуть в промисы, но сейчас у нас тема каррирование))

const fetchXML = (url, callback) => {
  const req = new XMLHttpRequest()
  req.addEventListener('load', () => {
    const data = JSON.parse(req.responseText)
    callback(data)
  })
  req.open('GET', url)
  req.send()
}


// Чего мы хотим
// 1. При клике на кнопку подробнее
// у определенного пользователя мы получим его слаг из дата атрибута
// 2. По слагу сделаем запрос и получим список отзывов,
// 3. Берем слаг последнего отзыва (первый в списке) и делаем запрос
// 4. Получаем подробную информацию об отзыве, берем оттуда текст

// текс который покажем
var textReview = ''

// используем делегирование на всем контейнере с кнопками
document.getElementById('users-wrapper')
  .addEventListener('click', (e) => {
    // получаем элемент
    const el = e.target

    // если кнопка не с пользователем но игнорим клик
    if(!el.classList.contains('user-btn')) {
      return
    }

    // получаем слаг пользователя с его кнопки
    const slugUser = el.dataset.slug // 'xksdfjdkhfd' это слаг

    // проверка на слаг
    if(!slugUser) {
      return
    }

    // получаем список отзывов по слагу пользователя
    fetchXML('https://example.com/reviews/' + slugUser, (data) => {
      // получаем список пользователей
      const reviews = data.reviews

      // получаем слаг последнего отзыва
      const slugFirstReview = reviews[0].slug

      // делаем запрос и получаем подробную информацию по отзыву
      fetchXML('https://example.com/review/' + slugFirstReview, (data) => {
        const review = data.review

        textReview = review
      })
    })
  })`},{type:"text",ru:'Мы используем каррирование без промисов и победим "ад колбеков".',en:'We will use currying without promises and defeat "callback hell".'},{type:"text",ru:"Отрефакторим наш код.",en:"Let's refactor our code."},{type:"code",code:`//  декларативный код
// ==== ВНИМАНИЕ многие функции хелперы уже
// ==== существуют в готовых библиотеках
// ==== тут мы это часто показываем в учебных целях

// создадим функцию для запросов на основе XMLHttpRequest
// он на событиях без промисов
// можно конечно обернуть в промисы, но сейчас у нас тема каррирование))

// fetchXML :: String -> String -> String -> (a -> b) -> c
const fetchXML = (baseUrl) => (params) => (id) => (callback) => {
  const req = new XMLHttpRequest()
  req.addEventListener('load', () => callback(JSON.parse(req.responseText)))
  req.open('GET', \`\${baseUrl}/\${params}/\${id}\`)
  req.send()
  return req
}

// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)


// давайте на основе функции выше создадим спец функции
const BASE_URL = 'https://example.com'
const REVIEWS = 'reviews'
const REVIEW_INFO = 'review-info'

// функция закрепляющая базовый путь
const fetchBaseUrl = fetchXML(BASE_URL)

// функция для получения списка отзывов
const getReviews = fetchBaseUrl(REVIEWS)

// функция для получения подробностей по опред отзыву
const getReviewInfo = fetchBaseUrl(REVIEW_INFO)

// теперь создадим хелпер для сообщения клик
// чтобы вызывать в композиции функций
// clickElement :: a -> (a -> *) -> *
const clickElement = (element) =>
                      (callback) =>
                        element.addEventListener('click', callback)

// Чего мы хотим
// 1. При клике на кнопку подробнее
// у определенного пользователя мы получим его слаг из дата атрибута
// 2. По слагу сделаем запрос и получим список отзывов,
// 3. Берем слаг последнего отзыва (первый в списке) и делаем запрос
// 4. Получаем подробную информацию об отзыве, берем оттуда текст

// head :: [a] -> a
const head = (arr) => arr[0]

// prop :: String -> a -> b
const prop = (prop) => (obj) => obj[prop]

// текс который покажем
var textReview = ''

// получаем контейнер с кнопками
const btnWrapper =  document.getElementById('users-wrapper')

// запускаем сразу композицию
clickElement (btnWrapper) (pipe(
  (e) => e?.target, // получаем элемент
  (el) => el?.dataset?.slug, // получаем дата атрибут
  (slugUser) => getReviews (slugUser) ( // делаем запрос на получение всех отзывов
        pipe(
          head, // берем первый отзыв
          prop('slug'), // оттуда слаг
          (slug) => getReviewInfo (slug) ( // по слагу делаем запрос на получение инфы
            (review) => {
              textReview = prop ('text') (review) // результат записываем в глобальную переменную
            })
        )
      )
))`},{type:"text",ru:"Признаюсь вам ))) запах плохого кода не пропал.",en:"I'll admit to you ))) the smell of bad code hasn't gone away."},{type:"text",ru:"А что если мы добавим мощь промисов в код выше и преобразим его.",en:"What if we add the power of promises to the code above and transform it."},{type:"code",code:`//  А теперь возьмемся за дело
// перепишем нашу функцию получения данных
// которая сама возвращает промис

// fetchClassic :: String -> String -> String -> Promise
const fetchClassic = (baseUrl) =>
                        (params) =>
                        (id) =>
                        fetch (\`\${baseUrl}/\${params}/\${id}\`)
                          .then (res => res.json())

const BASE_URL = 'https://example.com'
const REVIEWS = 'reviews'
const REVIEW_INFO = 'review-info'

// получения списка отзывов
const getReviews = fetchClassic (BASE_URL) (REVIEWS)
const getReviewInfo = fetchClassic (BASE_URL) (REVIEW_INFO)


// У нас будет супер пайп, который под капотом
// будет проверять промисы ))
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipeAsync = (...fns) => (x) => fns.reduce((v, f) => {
  return v instanceof Promise
    ? v.then(f)
    : f(v)
}, x)

// запускаем улучшенный вариант
// pipeAsync отрабатывает промисы под капотом
clickElement (btnWrapper) (pipeAsync(
  (e) => e?.target, // получаем элемент
  (el) => el?.dataset?.slug, // получаем дата атрибут
  getReviews, // делаем запрос на получение всех отзывов
  head, // берем первый отзыв
  prop('slug'), // оттуда слаг
  getReviewInfo, // по слагу делаем запрос на получение инфы отзыва
  prop('text'), // берем поле text
  (text) => textReview = text, // устанавливаем значением в глоб переменную
))`}]},sd={slug:"partial-application",title:{ru:"Частичное применение",en:"Partial application"},blocks:[{type:"text",ru:"Частичное применение — это один из приёмов, используемых в функциональном программировании, при котором вычисление функции происходит только при полном получении всех аргументов.",en:"Partial application is one of the techniques used in functional programming, in which the function is evaluated only once all of its arguments have been supplied."},{type:"text",ru:"Частичное применение очень похоже на каррирование, но есть отличия.",en:"Partial application is very similar to currying, but there are differences."},{type:"text",ru:"1. При частичном применении количество отложенных вызовов обычно не больше двух.",en:"1. With partial application the number of deferred calls is usually no more than two."},{type:"text",ru:"2. Количество аргументов, передаваемых в функцию при частичном применении, может быть несколько, а в классическом каррировании обычно одно.",en:"2. The number of arguments passed to the function in partial application can be several, whereas in classic currying it is usually one."},{type:"code",code:`//  пример функции с частичным применением
// partialSumA :: Number -> Number -> Number -> Number
const partialSumA = (a) => (b, c) => a + b + c
// partialSumB :: Number -> Number -> Number -> Number
const partialSumB = (a, b) => (c) => a + b + c

// давайте теперь вызовем эти функции
console.log ( partialSumA (1) (1, 1) ) // 3
console.log ( partialSumB (1, 1) (1) ) // 3

// А давайте напишем функцию, которая применяет
// частичное применение к любой обычной функции

// ((a, b, c, …, n) → x) → [a, b, c, …] → ((d, e, f, …, n) → x)
// partial:: (a -> b) -> (a ->b)
const partial = (fn) => {

  // количество аргументов у вызываемой функции
  const lengthArgs = fn.length

  // возвращаемая функция
  const innerPartial = (...firstArgs) => {
    // если количество входящих аргументов
    // больше или равно чем у функции вызывающей
    // значит сразу можно ее вызвать
    if (firstArgs.length >= lengthArgs) {
      return fn (...firstArgs)
    }

    // иначе мы вторым вызовом
    // запускаем функцию в любом случае
    return (...secondArgs) => fn (...firstArgs, ...secondArgs)
  }

  return innerPartial
}

// можем применить нашу функцию
// которая применяет частичное применение
// к любой функции

// sum :: Number -> Number -> Number -> Number
const sum = (a, b, c) => a + b + c

// возвращаем функцию с супер способностями )
const sumPartial = partial (sum)

// теперь мы можем вызывать возвращенную функцию
console.log ( sumPartial (1) (1, 1) ) // 3
console.log ( sumPartial (1, 1) (1) ) // 3`}]},cd={slug:"recursion",title:{ru:"Рекурсия",en:"Recursion"},blocks:[{type:"text",ru:"Рекурсия — это способность функции вызывать саму себя.",en:"Recursion is the ability of a function to call itself."},{type:"text",ru:"Рекурсия должна отвечать двум основным требованиям, чтобы она корректно работала.",en:"Recursion must meet two basic requirements in order to work correctly."},{type:"text",ru:"1. Базовый случай. Это логика, при которой рекурсия должна прекращаться. Базовое условие, которое прекращает вызов функцией самой себя.",en:"1. The base case. This is the logic at which the recursion must stop — the base condition that stops the function from calling itself."},{type:"text",ru:"2. Рекурсивный случай. Это логика, при которой функция вызывает саму себя, обычно с небольшими изменениями в аргументах.",en:"2. The recursive case. This is the logic in which the function calls itself, usually with small changes to the arguments."},{type:"text",ru:"Рекурсия часто используется в функциональном программировании.",en:"Recursion is frequently used in functional programming."},{type:"code",code:`// наша цель получить средний возраст пользователей

// ================================
// декларативный стиль без рекурсии

// список пользователей
const fetchAllUsers = () => new Promise(resolve => resolve([
  { name: 'John', status: 'online', age: 28 },
  { name: 'Angel', status: 'online', age: 35 },
  { name: 'Michel', status: 'offline', age: 18 },
  { name: 'Anna', status: 'offline', age: 20 },
]))

// getAgeAverage :: [a] -> Number
const getAgeAverage = (users) => pipe (
  (users) => [
    users.reduce ((init, { age }) => init + age, 0),
    users.length
    ], // получаем общий возраст и количество пользователей
  ([allAges, quantity]) => Math.round (allAges / quantity), // вычисляем средний возраст
  console.log // логируем результат
) (users)

fetchAllUsers().then(getAgeAverage)
// ================================

// Рекурсивный пример
// ================================
// эта функций рекурсивная оптимизирована
// она не делает 2 * вызовов
// потому что по достижению базового случая она
// сразу возвращает результат
// но про это мы поговорим еще позже

// а теперь тоже самое сделаем с помощью рекурсии
// recurAgeAverage :: [a] -> Number -> Number -> Number
const recurAgeAverage = (
    users, // массив данных пользователей
    sumAges = 0, // сумма возрастов пользователей
    quantityUsers = users.length // первичное количество пользователей
  ) => {

  // базовый случай, условие выхода
  // когда массив уже пуст
  if (!users.length) {
    // сумму всех лет пользователей делим на количество пользователей
    // чтобы посчитать средний возраст пользователей
    return sumAges / quantityUsers
  }

  // рекурсивный случай, чтобы вызывать самого себя
  // пока в массиве есть элементы
  return recurAgeAverage (
      users.slice(1), // возвращаем массив без первого элемента
      sumAges = sumAges + users[0]?.age, // собираем возраст каждого пользователя
      quantityUsers // передаем ранее сохраненное значение количество пользователей
    )
}
// ================================

// Давайте нашу функцию перепишем в одну строку и вызовем
const recurAgeAverageF = (users, sumAges = 0, quantityUsers)
                          => !users.length
                              ? sumAges / quantityUsers
                              : recurAgeAverageF (
                                  users.slice(1),
                                  sumAges = sumAges + users[0]?.age,
                                  quantityUsers
                                )

( async () => {
  const users = await fetchAllUsers () // получаем список пользователей
  const averageAge = recurAgeAverageF (users) // получаем средний возраст рекурсивно
  console.log (averageAge) // логируем результат 25.25
}
)()`},{type:"text",ru:"Пример выше с рекурсией, возможно, для некоторых не прост. Поэтому мы напишем пример проще и визуализируем вызовы. Главное, не волнуйтесь, если сразу вам что-то непонятно.",en:"The example above with recursion may not be simple for some. So we will write a simpler example and visualize the calls. The main thing is, don't worry if something isn't clear right away."},{type:"code",code:`// Наша цель собрать общий рейтинг пользователей
// То есть сумму  рейтингов

const users = [
  { name: 'John', rating: 4.5 },
  { name: 'Angel', rating: 4 },
  { name: 'Michel', rating: 3 },
  { name: 'Anna', rating: 5 },
]

// sumRating : [a] -> Number
const sumRating = (users) => {
  // базовый случай, условие выхода когда массив пуст
  if (!users.length) {
    return 0
  }

  // рекурсивный случай
  // рейтинг первого элемента складывается
  // с вызовом самой же функции с вырезанным эти элементом
  return users[0].rating + sumRating (users.slice(1))
}

// давайте сократим синтасис
const rateSum = (users) =>
                      !users.length
                        ? 0
                        :  users[0] + rateSum (users.slice(1))

// визуализируем вызовы
// и для понимания представим массив числе вместо ключа rating
rateSum ([4.5, 4, 3, 5]) // возвращает 4.5 + rateSum ([4, 3, 5])
rateSum ([4, 3, 5]) // возвращает 4 + rateSum ([3, 5])
rateSum ([3, 5]) // возвращает 3 + rateSum ([5])
rateSum ([5]) // возвращает 5 + rateSum ([])
rateSum ([]) // возвращает 0 достигли базового случая

// и тут самое главное идут возвраты от вызовов в стэке
rateSum ([5]) // возвращает 5 + 0
rateSum ([3, 5]) // возвращает 3 + 5
rateSum ([4, 3, 5]) // возвращает 4 + 8
rateSum ([4.5, 4, 3, 5]) // возвращает 4.5 + 12
// итоговый результат 16.5`},{type:"text",ru:'В примере выше в функции "rateSum" есть один существенный недостаток. Это количество вызовов, которое можно оптимизировать, используя приём оптимизации хвостовой рекурсии.',en:'The example above with the "rateSum" function has one significant drawback — the number of calls, which can be optimized using the tail call optimization technique.'},{type:"text",ru:"Зачем нам это нужно. В JS стек вызовов функций при рекурсивном синхронном вызове переполняется, так как функции создаются не лениво, то есть они создаются уже до момента вызова, в отличие от Haskell, где нет циклов и функции создаются лениво в момент фактического вызова.",en:"Why do we need this? In JS the call stack overflows during recursive synchronous calls, because functions are not created lazily — that is, they are created before the moment of the call, unlike in Haskell, where there are no loops and functions are created lazily at the moment of the actual call."},{type:"code",code:`// === Оптимизация хвостовой рекурсии ====
// Давайте избавимся от лишних вызовов
const rateSum = (users, result = 0) => {
  // базовый случай условие выхода когда массив пуст
  // возвращаем второй аргумент где аккумулируем
  // результаты всех вызовов
  if (!users.length) {
    return result
  }

  // рекурсивный случай пока в массиве элементы
  // при каждом вызове результат складываем во второй аргумент
  // и вызываем дальше и при базовой случай возвращаем результат
  // тем самым сокращаем количество вызовов
  return rateSum (users.slice(1), result = result + users[0])
}

// давайте все перепишем в одну строку
const sum = (users, result = 0) => !users.length
                                ? result
                                : sum (users.slice(1), result = result + users[0])

// визуализируем вызовы
// и для понимания представим массив числе вместо ключа rating
sum ([4.5, 4, 3, 5], 0) // возвращает sum ([4, 3, 5], 0 + 4.5)
sum ([4, 3, 5], 4.5) // возвращает sum ([3, 5], 4.5 + 4)
sum ([3, 5], 8.5) // возвращает sum ([5], 8.5 + 3)
sum ([5], 11.5) // возвращает sum ([], 11.5 + 5)
sum ([], 16.5) // возвращает result  16.5
// дальше вызовы прекращаются
// удержания и возвратов нет
// размотки стека нет
// возвращаем итоги
// количество вызовов сократилось вдвое`},{type:"text",ru:"Оптимизация хвостовой рекурсии на текущий момент времени (2025 год), к сожалению, не реализована в движке Node.js (Chrome). Она была реализована в одной из версий Core JS (Safari), но затем была удалена. В любом случае количество вызовов сокращается. В продакшен-коде старайтесь не использовать её, когда не владеете точной информацией о количестве вызовов в программе.",en:"Tail call optimization, as of now (the year 2025), is unfortunately not implemented in the Node.js (Chrome) engine. It was implemented in one of the versions of Core JS (Safari), but was later removed. In any case the number of calls is reduced. In production code, try not to use it when you don't have precise information about the number of calls in the program."},{type:"text",ru:"Далее в разделе рекурсии мы будем использовать приёмы, при помощи которых можно безопасно использовать рекурсию в продакшен-коде без подсчёта количества вызовов.",en:"Further on in the recursion section we will use techniques that let you safely use recursion in production code without counting the number of calls."},{type:"text",ru:"Так как же нам освободить стек вызовов без его переполнения в продакшен-коде.",en:"So how do we free up the call stack without overflowing it in production code."},{type:"text",ru:"1. Сделать код асинхронным, не блокировать поток и освобождать стек",en:"1. Make the code asynchronous, avoid blocking the thread, and free up the stack"},{type:"text",ru:'2. Использовать санку (thunk) — "трамплин", фейковую рекурсию',en:'2. Use a thunk — a "trampoline", a fake recursion'},{type:"code",code:`// === 1. Асинхронный вызов рекурсии ====

// обратите внимание, что рекурсивный случай оборачивается в таймер
// sum :: [a] -> Number -> (Number -> *)
const sumD = (users, result = 0, callback) => {

  // базовый случай условие выхода
  // когда массив уже пустой то результат пробрасываем в колбек
  if (!users.length) {
    callback (result)
    return
  }

  // рекурсивный случай вызываем асинхронно
  // через таймер чтобы стек не переполнялся
  setTimeout (
    () => sumD (users.slice(1), result = result + users[0], callback),
    0
  )
}

// давайте сократим запись
const sum = (users, result = 0, callback) =>
  !users.length
    ? callback (result)
    : setTimeout (
        () => sum (users.slice(1), result = result + users[0], callback),
        0
      )

// попробуем вызвать
sum ([4.5, 4, 3, 5], 0, (total) => console.log(total)) // 16.5

// визуализируем вызовы
sum ([4.5, 4, 3, 5], 0, (total) => console.log(total)) // возвращает sum ([4, 3, 5], 0 + 4.5, callback)
// стэк вызовов свободный для микрозадач (промисы) или макро например
// отсутствует блокировка потока
// отсутствует переполнение стека
sum ([4, 3, 5], 4.5, (total) => console.log(total)) // возвращает sum ([3, 5], 4.5 + 4, callback)
// стэк вызовов свободный для микрозадач (промисы) или макро например
// отсутствует блокировка потока
// отсутствует переполнение стека
sum ([3, 5], 8.5, (total) => console.log(total)) // возвращает sum ([5], 8.5 + 3, callback)
// стэк вызовов свободный для микрозадач (промисы) или макро например
// отсутствует блокировка потока
// отсутствует переполнение стека
sum ([5], 11.5, (total) => console.log(total)) // возвращает sum ([], 11.5 + 5, callback)
// стэк вызовов свободный для микрозадач (промисы) или макро например
// отсутствует блокировка потока
// отсутствует переполнение стека
sum ([], 16.5, (total) => console.log(total)) // вызовет callback c result

// Минусы этого подхода
// Скорость выполнения (производительность) низкая
// Если вам необходимы длительные операции вызовы функций синхронные
// То лучше использовать веб воркеры в отдельном потоке
// При условии, что у вас процессор больше одного ядра`},{type:"text",ru:"Разберём логику использования трамплина, чтобы избежать переполнения стека. Трамплин работает синхронно, в отличие от вызова через таймер.",en:"Let's examine the logic of using a trampoline to avoid stack overflow. The trampoline works synchronously, unlike a call through a timer."},{type:"text",ru:"Рассмотрим основные принципы трамплина.",en:"Let's look at the main principles of the trampoline."},{type:"text",ru:"1. Трамплин — это функция-обёртка, которая придаёт нашей основной функции особенное поведение.",en:"1. A trampoline is a wrapper function that gives our main function special behavior."},{type:"text",ru:"2. Функция-трамплин возвращает другую функцию, которая принимает аргументы.",en:"2. The trampoline function returns another function that accepts arguments."},{type:"text",ru:"3. Внутри она в цикле вызывает основную функцию с аргументом.",en:"3. Inside, it calls the main function with an argument in a loop."},{type:"text",ru:"4. Если возвращаемое значение — функция, то она вызовет её снова, иначе остановит цикл и вернёт результат.",en:"4. If the returned value is a function, it will call it again; otherwise it stops the loop and returns the result."},{type:"text",ru:"5. Основная функция в базовом случае должна возвращать результат.",en:"5. In the base case the main function must return a result."},{type:"text",ru:"6. Основная функция в рекурсивном случае должна обязательно возвращать функцию.",en:"6. In the recursive case the main function must necessarily return a function."},{type:"code",code:`// === Рекурсия через трамплин ====

// обратите внимание первый аргумент это функция
// а вторым аргументом мы по сути запускаем вызов функции
// trampoline :: ((...args -> *) -> (...args -> *))
const trampoline = (fn) => (...args) => {
  // запускаем функцию с первым аргументом
  let result = fn(...args)

  // запускаем цикл бесконечно пока функция
  // возвращает другую функцию
  while (typeof result == 'function') {
    // результат вызова сохраняем в переменную
    // и проверяем что оно вернуло
    // result() *** запомни эту метку дальше покажем что за функция это
    result = result()
  }

  // как только результат вызова функции
  // не функция то возвращаем его
  return result
}

// давайте сократим запись
// sumD :: [a] -> Number -> Number
const sumD = (users, result = 0) => {

  // если массив пустой то возвращаем результат
  if (!users.length) {
    return result
  }

  // внимание тут обязательно возвращаем функцию
  // метка *** эта функция запускаемая в трамплине внутри
  return () => sumD (users.slice(1), result = result + users[0])
}

// давайте перепишем в одну строку функцию
// sum :: [a] -> Number -> Number
const sum = (users, result = 0) =>
      !users.length
       ? result
       : () => sum (users.slice(1), result = result + users[0])

// протестируем код

// пропускаем нашу функцию через трамплин
const sumTrampoline = trampoline (sum)

// теперь на самом деле в цикле будут запускаться функции
console.log (sumTrampoline ([4.5, 4, 3, 5], 0)) // 16.5

// давайте теперь визуализируем вызовы
// логика внутри функции трамплин

//  === первый вызов =====
let result = sum([4.5, 4, 3, 5], 0) //
// вернет в result () => sum ([4, 3, 5], 4.5 + 0)
// =======================

//  === обычные вызовы =====
while (typeof result == 'function') {
  result = result() // () => sum ([4, 3, 5], 4.5 + 0)
  // вернет в result () => sum ([3, 5], 4.5 + 4)
}
// =======================

//  === обычные вызовы =====
while (typeof result == 'function') {
  result = result() // () => sum ([3, 5], 4.5 + 4)
  // вернет в result () => sum ([5], 8.5 + 3)
}
// =======================

//  === обычные вызовы =====
while (typeof result == 'function') {
  result = result() // () => sum ([5], 8.5 + 3)
  // вернет в result () => sum ([], 11.5 + 5)
}
// =======================

//  === последний вызов условие выхода из цикла =====
return result // где result это второй аргумент 16.5
// =======================


// визуализация через схему
// это как тип связный список функций, который заранее не готов
// а формируется в процессе
[(a -> b)] -> [(b -> c)] -> [(c -> d)]
// массив функция где след элемент формируется динамически
[
  ([4.5, 4, 3, 5]) => sum ([4.5, 4, 3, 5], 0), // первый вызов let result = fn(...args)
  () => sum ([4.5, 4, 3, 5], 0), // result = result() внутри цикла
  () => sum ([4, 3, 5], 4.5), // result = result() внутри цикла
  () => sum ([3, 5], 8.5), // result = result() внутри цикла
  () => sum ([5], 11.5), // result = result() внутри цикла
  () => sum ([], 16.5), // result = result() внутри цикла
  16.5 // цикл завершается return result
]`}]},ld={slug:"performance",title:{ru:"Производительность (Performance — Перфоманс)",en:"Performance"},blocks:[{type:"text",ru:"Следует отметить, что в типичных случаях императивный код работает немного быстрее, однако разница обычно незначительна. Иногда функциональный код может показывать даже те же или лучшие результаты благодаря оптимизациям движка JavaScript. Если на одной чаше весов удобство сопровождения кода, надёжность кода, правильная архитектура, то безусловно лучше выбирать функциональный код.",en:"It is worth noting that in typical cases imperative code runs slightly faster, but the difference is usually negligible. Sometimes functional code can even show the same or better results thanks to optimizations in the JavaScript engine. If maintainability, reliability, and a sound architecture are on one side of the scales, then functional code is undoubtedly the better choice."},{type:"text",ru:"За улучшение скорости работы функционального кода в первую очередь отвечают разработчики движков JavaScript. То есть разработчики движков проводят улучшения, оптимизации компилятора, сборщика мусора.",en:"Improving the speed of functional code is primarily the responsibility of the developers of JavaScript engines. That is, engine developers carry out improvements and optimizations of the compiler and the garbage collector."},{type:"text",ru:"Каждая абстракция создаёт дополнительный небольшой расход ресурсов, зачастую он не критичен.",en:"Every abstraction introduces a small additional resource cost, which is often not critical."},{type:"text",ru:"В проектах, где критически важна скорость и количество элементов достигает нескольких десятков тысяч и даже сотен тысяч при синхронном выполнении кода, и мы не можем создать отдельный поток в силу отсутствия мощностей железа, а именно свободного ядра процессора, мы можем прибегнуть к низкоуровневым императивным инструментам.",en:"In projects where speed is critical and the number of elements reaches several tens of thousands or even hundreds of thousands during synchronous execution, and we cannot spawn a separate thread due to a lack of hardware resources — namely a free CPU core — we can resort to low-level imperative tools."},{type:"text",ru:"В 98% задач скорость работы вашего приложения скорее определяется правильной логикой построения программы, а не лишней абстракцией.",en:"In 98% of cases the performance of your application is determined more by the correct logic of how the program is built than by an extra abstraction."},{type:"code",code:`// Произведем небольшие замеры
// ===============================
// функция, которая генерирует массив чисел от 1 до числа n включительно
// createArray :: Number -> [a]
const createNumberArray = (n) => new Array(n).fill(1).map((_, i) => i + 1)

// функция которая декларативно складывает числа в массиве
// sumD :: [a] -> Number
const sumD = (arr) => arr.reduce((acc, curr) => acc + curr)

// функция которая императивно складывает числа в массиве
const sumN = (arr) => {
  let result = 0
  const length = arr.length

  for (let i = 0; i < length; i += 1) {
    result = result + arr[i]
  }

  return result
}
// ===============================

// начнем тестировать
// ===============================
// создаем данные массив из 100 000 чисел
const dataNumber = createNumberArray (100000)

// замер времени декларативного кода
// ===============================
const startT = performance.now() // стартовое время
const resultD = sumD (dataNumber) // выполняемый код
const endT = performance.now() // конечное время

// вычисление дельты и логирования
console.log('Время выполнения декларативного кода ' + (endT - startT) + 'миллисекунд. Результат: ' + resultD)
// время выполнения конечно же зависит от вашего устройства и прогрева железа
// это тестирование не особо точное
// тут главное нам уловить разницу в императивном и декларативном коде
// 2.4274640000000005миллисекунд. Результат: 5000050000
// ===============================

// только подряд сразу не тестируйте )))

// замер времени императивного кода
// ===============================
const startI = performance.now() // стартовое время
const resultI = sumN (dataNumber) // выполняемый код
const endI = performance.now() // конечное время

// вычисление дельты и логирования
console.log('Время выполнения императивного кода ' + (endI - startI) + 'миллисекунд. Результат: ' + resultI)
// время выполнения конечно же зависит от вашего устройства и прогрева железа
// тут главное нам уловить разницу в императивном и декларативном коде
// 2.2674640000000005миллисекунд. Результат: 5000050000
// 2.380783000000008миллисекунд. Результат: 5000050000
// 2.600783000000008миллисекунд. Результат: 5000050000
// ===============================

// Неожиданно даже reduce код работает быстрее ХАХА
// Это нам говорит о том создатели движков работают над этим
// Даже если мы перепишем sumN через цикл while
// оно будет иметь почти такую же скорость
// reduce уже по сути нативное решение ))
// Это не противоречие моим словам выше это просто нативное улучшение
// Наши абстракции будут чуть больше использовать`},{type:"text",ru:"Из вышесказанного можно сделать вывод, что нативные решения более эффективны.",en:"From the above we can conclude that native solutions are more efficient."},{type:"text",ru:"А давайте напишем небольшую утилиту для замеров. И проведём тесты скорости выполнения.",en:"Let's write a small utility for measurements and run some execution-speed tests."},{type:"code",code:`// Утилита замера скорости
// ===============================
const benchmark = (fn) => (n = 100) => (msg = '') => {
  // итоговый средний результат
  let total = 0

  // количество итераций вызова нашей функции
  for (let i = 0; i < n; i++) {
    // стартовый замер перед началом вызова функции
    const start = performance.now()

    // вызов функции
    fn()

    // аккумулируем результат дельты конечного и стартового результата
    total += performance.now() - start
  }

  console.log(msg) // текст лога

  // далее итоговое время делим на количество вызовов
  // функции и выводим среднее арифметическое
  return total / n
}

// создаем две функции
// для работы с массивом чисел
// подготовка данных
// ======================
// массив чисел 1 - 10 000
const dataNumbers = createNumberArray (100000)

// обертка для императивной функция
// и декларативной функции
// sumImperative :: ([a] -> Number) -> [a] -> (* -> Number) -> Number
const sumWrap = (fn) => (arr) => () => fn(arr)

// императивная функция складывания
const sumImperative = sumWrap (sumN) (dataNumbers)

// декларативная функция складывания
const sumDeclarative = sumWrap (sumD) (dataNumbers)

// Внимание одновременно обе функции сразу не прогоняйте
// в начале запустите одну, а потом через какое то время вторую

// замер императивной функции
const resultImperative = benchmark (sumImperative) (1000) ('замер завершён')
console.log (resultImperative) // 0.15482687300000053
// замер декларативной функции
const resultDeclarative = benchmark (sumDeclarative) (1000) ('замер завершён')
console.log (resultDeclarative) // 1.2971963320000012

// вот тут мы и выяснили, что все таки императивный код быстрее )))`}]},fd={slug:"neural-networks",title:{ru:"Нейронные сети и теория категорий",en:"Neural networks and category theory"},blocks:[{type:"text",ru:"Давайте с вами попробуем рассмотреть работу нейронных сетей в рамках теории категорий. Для этого мы вначале повторим понятие теории категорий, о которой мы говорили в предыдущих главах.",en:"Let's try to look at how neural networks work through the lens of category theory. To do that, we will first recap the notion of category theory that we discussed in previous chapters."},{type:"text",ru:"Теория категорий — это совокупность абстрактных объектов (любых) и их морфизмов (стрелок их отношений), а также законов, по которым они работают.",en:"Category theory is a collection of abstract objects (any objects) and their morphisms (the arrows of their relationships), as well as the laws by which they operate."},{type:"text",ru:"Теория категорий в рамках нейронных сетей — это совокупность абстрактных объектов (нейронов или слоёв с нейронами) и их морфизмов (стрелок, то есть порядка вызова нейронов или взаимодействия слоёв с нейронами), а также законов, по которым они работают (композиция).",en:"Category theory applied to neural networks is a collection of abstract objects (neurons or layers of neurons) and their morphisms (arrows, that is, the order in which neurons are called or how layers of neurons interact), as well as the laws by which they operate (composition)."},{type:"text",ru:"Представим себе, что нейрон в нейросети — это чистая функция, и она вызывает другие функции в определённом порядке. То же самое можно представить, когда определённые слои взаимодействуют в нейронной сети. Слой — это совокупность нейронов.",en:"Imagine that a neuron in a neural network is a pure function that calls other functions in a certain order. The same can be pictured when particular layers interact within a neural network. A layer is a collection of neurons."},{type:"text",ru:"Порядок построения (архитектура), расположение слоёв между собой и того, какие нейроны находятся в каких слоях, определяется создателем нейросети.",en:"The order of construction (the architecture) — the arrangement of layers relative to each other and which neurons belong to which layers — is determined by the creator of the neural network."},{type:"text",ru:"То есть по сути: — слои это совокупность функций (модули с функциями); — нейроны это функции; — морфизмы это порядок вызова одних функций другими; — веса в нейронной сети это по сути аргументы, которые мы прокидываем при вызове нейрона, то есть функции.",en:"So in essence: — layers are collections of functions (modules of functions); — neurons are functions; — morphisms are the order in which some functions call others; — the weights in a neural network are essentially the arguments we pass when calling a neuron, that is, a function."},{type:"code",code:`// ==== Визуализация данных ====

-------------------
|   Ваш вопрос     |
-------------------
        ||
        ▼
-------------------
|  Слой математики |
-------------------
        ||
        ▼
-------------------
|  Слой анализа    |
-------------------
        ||
        ▼
-------------------
|  Слой вывода     |
-------------------

-------------------

// можно представить и как композицию функций

const mathModule = pipe (
  Math.sin, // совокупность функций
  Math.cos,
  ...
)

// logicModule :: Number :: String
const logicModule = (x) => x > 0 ? 'Положительное' : 'Отрицательное'

// langModule :: Number -> String
const langModule = (x) => \`Ответ: \${x}\`

// answer :: String -> String
const getAnswer = pipe (
  logicModule, // модуль логики
  mathModule, // модуль математики
  langModule, // модуль языковой
)

// вопрос пользователя
const question = prompt('Отвечу на вопросы по математике')

// получаем ответ для пользователя
const answer = getAnswer(question)

console.log (answer) // ответ на вопрос`}]},pd={slug:"function-map-filter-reduce",title:{ru:"Функции map, filter, reduce",en:"The map, filter, and reduce functions"},blocks:[{type:"text",ru:"Наиболее часто используемыми функциями в функциональном программировании и продакшен коде являются map, filter, reduce.",en:"The most frequently used functions in functional programming and production code are map, filter, and reduce."},{type:"text",ru:"Эти функции обеспечивают мощный функционал работы с данными.",en:"These functions provide powerful capabilities for working with data."},{type:"text",ru:"map --------------------",en:"map --------------------"},{type:"text",ru:"Функция map возвращает новый объект того же типа данных, пропуская каждый элемент, если тип итерируемый, через функцию, которую получает в качестве аргумента. Если тип не итерируемый, то просто содержимое с данными пропускается через функцию.",en:"The map function returns a new object of the same data type, passing each element through the function it receives as an argument when the type is iterable. If the type is not iterable, the contained data is simply passed through the function."},{type:"text",ru:"Давайте реализуем функцию map различными способами.",en:"Let's implement the map function in several different ways."},{type:"code",code:`// каррирование используется, чтобы
// нам было удобно вызывать и в композиции
// также же используется классический
// бесточечный стиль

// ==== реализация декларативная ====
// mapD :: (a -> b) -> [a] -> [b]
const mapD = (fn) => (arr) => arr.map(fn)
// ===================================

// ==== реализация императивная ====
// без индекса итерации и контекста
// mapI :: (a -> b) -> [a] -> [b]
const mapI = (fn) => (arr) => {
  // массив результирующий
  // который будем возвращать
  let result = []

  for (const item of arr) {
    // каждый элемент пропускаем через
    // функцию первого класса
    result.push(fn(item)) // или result = [ ...result, fn (item) ]
  }

  return result
}
 // ===================================

// ==== реализация императивная ====
// с индексом итерации и контекстом
// mapIq :: (a -> b) -> [a] -> [b]
const mapIq = (fn) => (arr) => {
  let result = []

  for (let i = 0; i < arr.length; i++ ) {
    result.push(fn(arr[i], i, arr)) // или result = [ ...result, fn (arr[i], i, arr) ]
  }

  return result
}
// ===================================

// ==== реализация рекурсивная ====
// с трамплина чтобы стэк не переполнился
// надеюсь вы прочитали раздел про рекурсию
// mapR :: (a -> b) -> [a] -> [b]
const mapR = (fn) => (arr, acc = []) => {

  // базовый случай
  // когда массив пуст возвращаем аккумулятор
  if (!arr.length) {
    return acc
  }

  // рекурсивный случай
  // возвращаем функцию для трапмплина
  // вырезаем первый элемент массива
  // в аккумулятор кладем результат который пропустили через функцию
  return () => mapR (fn)
                    (
                      arr.slice(1),
                      acc = [...acc, fn (arr[0])]
                    )
}

const mapTrampoline = trampoline(mapR)
// ===================================

// ==== запуск ====
const data = [1, 2, 3, 4, 5]

const result = mapD (v => v * 2) (data)

console.log (result) // [2, 4, 6, 8, 10]
// ===================================`},{type:"text",ru:"filter --------------------",en:"filter --------------------"},{type:"text",ru:"Функция filter возвращает новый объект того же типа данных, пропуская каждый элемент через функцию предикат, которая вернет элемент в объект, если предикат вернет true (тип итерируемый).",en:"The filter function returns a new object of the same data type, passing each element through a predicate function that returns the element into the object if the predicate returns true (the type is iterable)."},{type:"text",ru:"Функция предикат - это функция, которая возвращает true или false. Она обычно используется как функция первого класса, то есть кладется в другую функцию высшего порядка как filter.",en:"A predicate is a function that returns true or false. It is typically used as a first-class function, meaning it is passed into another higher-order function such as filter."},{type:"text",ru:"Давайте реализуем функцию filter различными способами.",en:"Let's implement the filter function in several different ways."},{type:"code",code:`// каррирование используется, чтобы
// нам было удобно вызывать и в композиции
// также же используется классический
// бесточечный стиль

// ==== реализация декларативная ====
// filterD :: (a -> Boolean) -> [a] -> [a]
const filterD = (fn) => (arr) => arr.filter(fn)
// ===================================

// ==== реализация императивная ====
// без индекса итерации и контекста
// filterI :: (a -> Boolean) -> [a] -> [a]
const filterI = (fn) => (arr) => {
  // массив результирующий
  // который будем возвращать
  let result = []

  for (const item of arr) {
    // каждый элемент пропускаем через
    // функцию предикат
    // если она вернет true кладем ее
    // в результирующий массив
    if (fn(item)) {
      result.push(item) // или result = [ ...result, item ]
    }
  }

  return result
}
 // ===================================

// ==== реализация императивная ====
// с индексом итерации и контекстом
// filterIq :: (a -> Boolean) -> [a] -> [a]
const filterIq = (fn) => (arr) => {
  let result = []

  for (let i = 0; i < arr.length; i++ ) {
    const value = arr[i]

    if (fn(value, i, arr)) {
      result.push(value) // или result = [ ...result, value ]
    }

  }

  return result
}
// ===================================

// ==== реализация рекурсивная ====
// с трамплина чтобы стэк не переполнился
// надеюсь вы прочитали раздел про рекурсию
// filterR :: (a -> Boolean) -> [a] -> [a]
const filterR = (fn) => (arr, acc = []) => {

  // базовый случай
  // когда массив пуст возвращаем аккумулятор
  if (!arr.length) {
    return acc
  }

  // рекурсивный случай
  // возвращаем функцию для трапмплина
  return () => {
     // первый элемент и остальные
     const [head, ...tail] = arr

     // в аккумулятор кладем элемент
     // если функцию предикат вернула true
     // иначе возвращаем текущий аккумулятор
     // без добавления значения
     const nextAcc = fn (head)
                            ? [...acc, head]
                            : [...acc]

     return filterR (fn)(tail, nextAcc)
  }
}

const filterTrampoline = trampoline(filterR)
// ===================================

// ==== запуск ====
const data = [1, 2, 3, 4, 5]

const result = filterD (v => v > 3) (data)

console.log (result) // [4, 5]
// ===================================`},{type:"text",ru:"reduce --------------------",en:"reduce --------------------"},{type:"text",ru:"Функция reduce возвращает любой тип данных, она в качестве аргументов принимает функцию и аккумулятор.",en:"The reduce function can return any data type; it takes a function and an accumulator as its arguments."},{type:"text",ru:"Функция в качестве аргумента принимает аккумулятор (инициализации или последующих вызовов) и текущий элемент, пропускает через логику функции эти данные и возвращает новый аккумулятор или вносит в текущий аккумулятор изменения.",en:"As arguments, the function takes the accumulator (from the initial value or from subsequent calls) and the current element, passes this data through the function's logic, and returns a new accumulator or applies changes to the current accumulator."},{type:"text",ru:"Аккумулятором (значением при инициализации) может быть любое значение.",en:"The accumulator (the initial value) can be any value."},{type:"text",ru:"Функцией reduce можно сымитировать любое кастомное поведение, а также поведение map и filter. Но обычно оно используется для сбора конкретно каких-то данных по определенной логике из итерируемого типа объекта.",en:"With reduce you can emulate any custom behavior, as well as the behavior of map and filter. But it is usually used to collect specific data according to a particular logic from an iterable object type."},{type:"code",code:`// каррирование используется, чтобы
// нам было удобно вызывать и в композиции
// также же используется классический
// бесточечный стиль

// ==== реализация декларативная ====
// reduceD :: ((a, b) → a) → a → [b] → a
const reduceD = (fn) => (init) => (arr) => arr.reduce(fn, init)
// ===================================

// ==== реализация императивная ====
// без индекса итерации и контекста
// reduceI :: ((a, b) → a) → a → [b] → a
const reduceI = (fn) => (init) => (arr) => {

  // значение которое будем возвращать
  // устанавливаем ему инициализационное значение
  let accumulator = init

  for (const item of arr) {
    // вызываем функцию
    // с первым аргументом аккумулятором
    // вторым аргументом текущим элементом массива
    // результат вызова кладем в аккумулятор
    // чтобы при след вызове результат предыдущего сохранялся
    accumulator = fn (accumulator, item)
  }

  return accumulator
}
 // ===================================

// ==== реализация императивная ====
// с индексом итерации и контекстом
// reduceIq :: ((a, b, Number, [b]) → a) → a → [b] → a
const reduceIq = (fn) => (init) => (arr) => {

  let accumulator = init

  for (let i = 0; i < arr.length; i++ ) {
    accumulator = fn (accumulator, arr[i], i, arr)
  }

  return accumulator
}
// ===================================

// ==== реализация рекурсивная ====
// с трамплина чтобы стэк не переполнился
// надеюсь вы прочитали раздел про рекурсию
// reduceR :: ((a, b) → a) → a → [b] → a
const reduceR = (fn) => (init) => (arr) => {

  // базовый случай
  // когда массив пуст возвращаем аккумулятор
  if (!arr.length) {
    return init
  }

  // рекурсивный случай
  // возвращаем функцию для трапмплина
  return () => {
     // первый элемент и остальные
     const [head, ...tail] = arr

     // аккумулятор который будем возвращать
     // пропускаем через функцию
     // старый аккумулятор и текущее значение
     const nextInit = fn (init, head)

     // вызываем заново функцию
     // со старой функций
     // новым аккумулятором пропущенным через функцию
     // и срезаем массив с данными
     return reduceR (fn) (nextInit) (tail)
  }
}

const reduceTrampoline = trampoline(reduceR)
// ===================================

// ==== запуск ====
const data = [1, 2, 3]

const result = reduceD ((a, b) => a + b) (0) (data)

console.log (result) // 6
// ===================================`}]},hd={slug:"first-class-and-higher-order-functions",title:{ru:"Функции первого класса и высшего порядка",en:"First-class and higher-order functions"},blocks:[{type:"text",ru:"Функции в JavaScript могут быть как функциями первого класса, так и функциями высшего порядка.",en:"Functions in JavaScript can be both first-class functions and higher-order functions."},{type:"text",ru:"Функциями первого класса принято называть функции, которые выступают в качестве аргумента для другой функции.",en:"First-class functions is the term commonly used for functions that are passed as an argument to another function."},{type:"text",ru:"Функциями высшего порядка принято называть функции, которые принимают другие функции в качестве аргумента.",en:"Higher-order functions is the term commonly used for functions that accept other functions as arguments."},{type:"code",code:`// Простой пример
// ===============================
const data = [1, 2, 3, 4]

// эта функция первого класса
// потому что она выступает в качестве
// аргумента для другой функции
// multiply :: Number -> Number
const multiply = (v) => v * 2

// функция map это функция
// высшего порядка
// потому что принимает другую функцию
// в качестве аргумента
const result = data.map(multiply)

console.log (result) // [2, 4, 6, 8]`},{type:"text",ru:"Если коротко, принимающая функция это функция высшего порядка, а функция, которая попадает при вызове функции, это функция первого класса.",en:"In short, the receiving function is the higher-order function, and the function that is passed in when the function is called is the first-class function."},{type:"text",ru:"Во Vue JS и React JS компоненты сами могут выступать как функциями высшего порядка, так и функциями первого класса, так как компоненты это и есть функции.",en:"In Vue JS and React JS, components themselves can act as both higher-order functions and first-class functions, since components are in fact functions."},{type:"code",code:`// Простой пример
// ===============================

// hof :: (* -> *) -> * -> *
const hof = (fc) => (...args) => fc (...args)

// функция hof - это функция высшего порядка
// так как в качестве первого аргумента принимает
// функцию первого класса

// функция fc - функция первого класса
// так как она способна выступать в качестве
// аргумента для функции

// Пример из Vue JS
// HOF (HOC)
// Higher Order Function (Higher Order Component)
// Функция высшего порядка (Компонент высшего порядка)
// принимает в слот другой компонент
// под капотом
function MyComponent({ main, default: def } = {}) {
  const greetingMessage = 'hello'

  if (main) {
    return \`<div>main - \${ main (greetingMessage)}</div>\`
  }

  if (def) {
    return \`default - \${def(greetingMessage)}\`
  }

  return 'нет компонентов'
}

// вызов hof
const templateMain = MyComponent({
  main: (text) => \`XXX\${text}XXX\`
})

const templateDefault = MyComponent({
  default: (text) => \`\${text}\`
})

console.log(templateMain)    // main - XXXhelloXXX
console.log(templateDefault) // default - hello`}]},dd={slug:"lenses",title:{ru:"Линзы",en:"Lenses"},blocks:[{type:"text",ru:"Линзы это инструмент (паттерн), который используется в функциональном программировании при работе с данными, обеспечивая иммутабельность данных и чистоту функции.",en:"Lenses are a tool (a pattern) used in functional programming when working with data, providing data immutability and function purity."},{type:"text",ru:"Иммутабельность - это способность не изменять данные.",en:"Immutability is the ability not to mutate data."},{type:"text",ru:"Давайте возьмем пример из официальной документации библиотеки Ramda JS.",en:"Let's take an example from the official documentation of the Ramda JS library."},{type:"code",code:`// Lens s a = Functor f => (a → f a) → s → f s
// ===============================
// создаем линзу
// путь к данными
const xHeadYLens = R.lensPath(['x', 0, 'y']);

// запускаем линзу в разных функциях

// тестируемые данные
const data = { x: [ { y: 2, z: 3 }, { y: 4, z: 5 } ] }

// функция view получает данные согласно пути линзы
// не меняя ничего в первоначальном объекте
const resultView = R.view(xHeadYLens, data);

// функция set устанавливает новые данные
// по пути линзы не меняя исходные данные  в объекте
// а возвращая новый объект с измененными данными
const resultSet = R.set(xHeadYLens, 1, data);

// over работает с линзой как set
// но вместо данных принимает функцию
// которая примет в качестве аргумента
// данные по пути линзы
const resultOver = R.over(xHeadYLens, R.negate, data);

console.log(resultView) // 2
console.log(resultSet) // {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
console.log(resultOver) // {x: [{y: -2, z: 3}, {y: 4, z: 5}]}`},{type:"text",ru:"В примерах выше мы с вами увидели, как пользоваться линзами.",en:"In the examples above, we saw how to use lenses."},{type:"text",ru:"А теперь попробуем реализовать свою кастомную линзу. В продакшен коде используйте готовые решения из библиотек Ramda JS или Sanctuary JS.",en:"And now let's try to implement our own custom lens. In production code, use ready-made solutions from libraries like Ramda JS or Sanctuary JS."},{type:"code",code:`// Lens s a = Functor f => (a → f a) → s → f s
// ===============================
// создаем линзу
// lens :: [String] -> Lens s a
const lens = (path) => {

  // getter :: [a] -> [b] -> b
  const getter = (path) => (data) => {
    // если в линзу не прокинут путь
    // то возвращаем данные
    if (!path.length) {
      return data
    }

    // первый элемент пути и остальной путь
    const [head, ...tail] = path

    // когда в пути остается один элемент
    // хвост отсутствует
    // вызывается базовый случай
    // и возвращаются данные
    if (!tail.length) {
      return data[head]
    }

    // рекурсивный случай
    // срезанный путь бросаем в качестве первого аргумента
    // в качестве данные бросаем вложенность
    return getter (tail) (data[head])
  }

  // setter :: [a] -> b | (* -> *) -> [b] -> [c]
  const setter = (path) => (v) => (data) => {
    // если в линзу не прокинут путь
    // то возвращаем данные
    if (!path.length) {
      return data
    }

    // первый элемент пути и остальной путь
    const [head, ...tail] = path

    // когда в пути остается один элемент
    // хвост отсутствует
    // вызывается базовый случай
    // и возвращаются данные
    // подменив значение ключа
    if (!tail.length) {

      // проверка чтобы понять
      // вызывается как over или set
      // чисто функция или значение
      // отправлено в качестве аргумента
      const isFunction = typeof v === 'function'

      return {
        ...data,
        [head]: isFunction
                    ? v (data[head])
                    : v
      }
    }

    // рекурсивный случай
    // срезанный путь бросаем в качестве первого аргумента
    // аргумент изменения оставляем такой же
    // в качестве данные бросаем вложенность
    return {
      ...data,
      [head]: setter (tail) (v) (data[head])
    }
  }


  // возвращает геттер  и сеттер
  // сохраняя в замыкании путь к данным
  return {
    getter: getter (path),
    setter: setter (path),
  }
}

// линза готова
//  осталось реализовать view set over

// мы просто вызываем геттер у линзы
// и бросаем туда данные для обработки
// view :: [a] -> [b] -> b
const view = (lens) => (data) => lens.getter (data)

// мы просто вызываем сеттер у линзы
// и бросаем туда данные для обработки
// set :: [a] -> c -> [b] -> b
const set = (lens) => (v) => (data) => lens.setter (v) (data)

// аналогичен в реализации set
// over :: [a] -> c -> [b] -> b
const over = (lens) => (fn) => (data) => lens.setter (fn) (data)

// тестируем код
// =============
// создаем линзу
const xLens = lens(['x', 0, 'y']);

// тестируемые данные
const data = { x: [ { y: 2, z: 3 }, { y: 4, z: 5 } ] }

const resultView = view (xLens) (data)
const resultSet = set (xLens) (1) (data)
// ((a) => (b) => a + b) (3) создается каррированая функция
// которая сразу вызывается и возвращает
// (b) => 3 + b
const resultOver = over (xLens) ( ((a) => (b) => a + b) (3) ) (data)

console.log(resultView) // 2
console.log(resultSet) // {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
console.log(resultOver) // {x: [{y: 5, z: 3}, {y: 4, z: 5}]}`}]},yd={slug:"side-effects-in-composition-functions",title:{ru:"Side effects (сайд-побочные эффекты) в композиции функций",en:"Side effects in function composition"},blocks:[{type:"text",ru:"Исходя из принципов функционального программирования можно подумать, что создавать сайд-побочные эффекты в композиции функций нельзя. Но на самом деле любая программа и в особенности веб разработка в любом случае создаст какой-нибудь побочный эффект (операции с DOM, операции ввода и вывода, логирование и тому подобное ...).",en:"Based on the principles of functional programming, one might think that creating side effects within function composition is forbidden. But in reality, any program, and especially web development, will create some side effect no matter what (DOM operations, input/output operations, logging, and so on ...)."},{type:"text",ru:"В реальных кейсах побочные эффекты в композиции функций нам могут пригодиться в основном в двух ситуациях:",en:"In real-world cases, side effects within function composition can be useful to us mainly in two situations:"},{type:"text",ru:"1. Дебагинг композиции и её логирование, в случае ошибок или вообще, чтобы понимать поток выполнения и изменения входных данных в композиции функции.",en:"1. Debugging the composition and logging it, in case of errors or simply to understand the execution flow and how the input data changes within the function composition."},{type:"text",ru:"2. Создание побочного эффекта в рамках программы согласно её логике и продолжение выполнения композиции функций.",en:"2. Creating a side effect within the program according to its logic and continuing the execution of the function composition."},{type:"text",ru:"Попробуем с вами проверить промежуточные результаты в композиции функций, создав побочный эффект в виде лога данных.",en:"Let's try to inspect the intermediate results within a function composition by creating a side effect in the form of logging the data."},{type:"code",code:`// Программа, которая берет деньги
// пользователя и сравнивает с ценой товара
// сообщает хватает ли ему денег на покупку товара
// ===============================
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) =>
                              fns
                                .reduce((init, fn) => fn(init), data)

// пользователь тестовый с 10 000$
const dataUser = {
  name: 'John',
  money: 10000,
}

// товар с ценной 8 000$
const product = {
  name: 'car',
  model: 'toyota',
  price: 8000
}

// prop :: String -> Record -> a
const prop = (prop) => (data) => data[prop]

// lt :: Number -> Number -> Boolean
const lt = (a) => (b) => a < b

const pipeline = pipe(
  prop ('money'), // получаем деньги пользователя
  lt (prop ('price') (product)), // сравниваем цену товара и деньги пользователя
  (success) => success ? 'the product can be purchased' : "you don't have enough money"
  // сообщаем может ли купить товар или не хватает денег
)

// запускаем композицию
const resultMsg = pipeline (dataUser)

console.log(resultMsg) // the product can be purchased`},{type:"text",ru:"Но как же нам получить результаты вызовов каждой функции в pipeline (prop ('money') ...), если даже не будет ошибок в композиции, мы просто хотим отладить код.",en:"But how do we obtain the results of each function call in pipeline (prop ('money') ...), if there won't even be any errors in the composition and we simply want to debug the code."},{type:"text",ru:"Давайте напишем универсальную утилиту для любого кейса в цепочке вызовов композиции.",en:"Let's write a universal utility for any case in the chain of composition calls."},{type:"code",code:`// Утилита которая вызовет функцию в аргументе
// и прокинет аргумент дальше по композиции
// ===============================
// tapD :: (a → *) → a → a
const tapD = (fn) => (arg) => {

  // делаем проверку
  // действительно ли первый аргумент функция
  if (typeof fn === 'function') {
    // вызываем функцию с аргументом
    fn (arg)
  }

  // не забываем дальше прокинут аргумент
  // для вызова в композиции функций
  return arg
}

// можно сократить в одну строку
// tap :: (a → *) → a → a
const tap = (fn) => (arg) => (fn (arg), arg)

// а теперь давайте подготовим утилиту
// для логирования данных
// после каждого вызова в композиции

// стандартный вывод в консоль
const log = console.log

// создаем логгер
const logger = tap (log)

// 😎 вводим логгер в цепочку вызовов функций
// сразу запустим цепочку
pipe(
  prop ('money'),
  logger, // 10000
  lt (prop ('price') (product)),
  logger, // true
  (success) => success ? 'the product can be purchased' : 'you don"t have enough money',
  logger, // 'the product can be purchased'
) (dataUser)`}]},gd={slug:"selecting-library",title:{ru:"Vanilla JS, Lodash, Ramda, Sanctuary -> что выбрать",en:"Vanilla JS, Lodash, Ramda, Sanctuary -> which one to choose"},blocks:[{type:"text",ru:"Когда перед вами стоит выбор, что выбрать из выше описанных библиотек или ванильного решения, не стоит опираться на следующие принципы, которые я часто встречал в своей практике при коммерческой разработке. Не стоит придерживаться следующего:",en:"When you face the choice of which of the libraries described above, or a vanilla solution, to pick, you should not rely on the following principles, which I have often encountered in my own commercial development practice. You should not stick to the following:"},{type:"text",ru:"1. Мне нравится эта библиотека (хотелки). 2. Это сейчас модно ))) (хотелки). 3. Я главный, я решаю и я так хочу (хотелки). Все выше описанное это не профессиональный подход.",en:"1. I like this library (personal wishes). 2. It's trendy right now ))) (personal wishes). 3. I'm in charge, I decide, and that's what I want (personal wishes). Everything described above is not a professional approach."},{type:"text",ru:"На что следует обратить внимание. Какие критерии важны при выборе:",en:"What you should pay attention to. Which criteria matter when choosing:"},{type:"text",ru:"1. Бюджет. Очень важно понять платежеспособность инвестора (клиента) и его планы на будущее. Это очень важный пункт и можно сказать один из основных. 2. Насколько % проект завершён или он находится в начале. Аналогично: если проект написан и все работает корректно, не нужно его переписывать. 3. Кто работает с тобой в команде и сколько вас человек. Нужно понимать процесс онбординга нового разработчика в команду, знаком ли он с данной библиотекой и твоими архитектурными решениями. 4. Качество продукта. Чем выше сложность, тем зачастую качество будет расти. 5. Перфоманс. Это не самый важный фактор, так как зачастую ошибка в логике приложения даст просадку, а не какая-либо библиотека. 6. Парадигма функционального программирования.",en:"1. Budget. It is very important to understand the financial capacity of the investor (client) and their plans for the future. This is a very important point and, you could say, one of the main ones. 2. How far along the project is, percentage-wise, or whether it is just at the beginning. Likewise: if the project is already written and everything works correctly, there is no need to rewrite it. 3. Who works with you on the team and how many of you there are. You need to understand the onboarding process for a new developer joining the team, whether they are familiar with this library and with your architectural decisions. 4. Product quality. The higher the complexity, the more the quality tends to grow. 5. Performance. This is not the most important factor, since often it is a flaw in the application's logic that causes a slowdown rather than any particular library. 6. The functional programming paradigm."},{type:"text",ru:"| Vanilla JS | ----------------",en:"| Vanilla JS | ----------------"},{type:"text",ru:"1. Бюджет. Бюджет небольшой или средний. 2. Насколько % проект завершён или он находится в начале. Когда проект уже ранее был начат на JS и вышел за горизонт и финишную прямую. 3. Кто работает с тобой в команде и сколько вас человек. Для малых команд с глубокими знаниями в JS. Порой это будет эффективнее, чем большие команды с поверхностными знаниями в JS, но пишущие якобы без ошибок на TS. 4. Качество продукта. Зависит от команды, сроков и бюджета, зачастую невысокое. 5. Перфоманс. Будет самый высокий при аналогичном коде относительно библиотек. 6. Парадигма функционального программирования. Полная свобода: процедурный, ООП, ФП и т.п. И каждый как хочет.",en:"1. Budget. The budget is small or medium. 2. How far along the project is, percentage-wise, or whether it is just at the beginning. When the project was already started earlier in JS and has passed the horizon and the home stretch. 3. Who works with you on the team and how many of you there are. For small teams with deep knowledge of JS. At times this will be more effective than large teams with shallow knowledge of JS who supposedly write without errors in TS. 4. Product quality. Depends on the team, deadlines, and budget; often not high. 5. Performance. It will be the highest given equivalent code compared to the libraries. 6. The functional programming paradigm. Complete freedom: procedural, OOP, FP, and so on. And everyone does as they please."},{type:"text",ru:"| Lodash | ----------------",en:"| Lodash | ----------------"},{type:"text",ru:"1. Бюджет. Подходит для проектов любого масштаба, но лучше использовать на средних проектах. 2. Насколько % проект завершён или он находится в начале. Только если проект не достиг горизонта, а находится на начальном этапе. 3. Кто работает с тобой в команде и сколько вас человек. Для команд любого размера, поверхностно знакомых с функциональным программированием, которые хотят упростить рутину. 4. Качество продукта. Зависит от команды, сроков и бюджета, зачастую невысокое. 5. Перфоманс. Будет ниже ванилы при аналогичном коде. Бандл библиотеки оптимизирован по размеру. 6. Парадигма функционального программирования. Не совсем функциональна: проблемы с иммутабельностью и передачей аргументов в композиции функций, когда на первом месте функции принимают данные, а потом уже функцию. Для тех, кто только трогает функциональное программирование.",en:"1. Budget. Suitable for projects of any scale, but it is best used on medium-sized projects. 2. How far along the project is, percentage-wise, or whether it is just at the beginning. Only if the project has not reached the horizon but is at an early stage. 3. Who works with you on the team and how many of you there are. For teams of any size who are superficially familiar with functional programming and want to simplify their routine. 4. Product quality. Depends on the team, deadlines, and budget; often not high. 5. Performance. It will be lower than vanilla given equivalent code. The library's bundle is optimized for size. 6. The functional programming paradigm. Not entirely functional: there are problems with immutability and with passing arguments in function composition, where the functions take the data first and only then the function. For those who are only just touching functional programming."},{type:"text",ru:"| Ramda | ----------------",en:"| Ramda | ----------------"},{type:"text",ru:"1. Бюджет. Подходит для проектов любого масштаба. 2. Насколько % проект завершён или он находится в начале. На любом этапе, кроме ситуаций, когда проект уже завершается или уже присутствует другая библиотека для работы с данными. 3. Кто работает с тобой в команде и сколько вас человек. Для команд любого размера, поверхностно или профессионально использующих функциональное программирование, которые хотят упростить рутину. 4. Качество продукта. Качество продукта, как правило, высокое. 5. Перфоманс. Будет ниже ванилы при аналогичном коде. Бандл библиотеки необходимо оптимизировать, если планируется использование только небольшой части 5-10% функций. 6. Парадигма функционального программирования. Используется полноценное функциональное программирование. Покрывает до 98% кейсов при работе с данными и подойдет для всех проектов. Своя философия в рамках функционального программирования. Проще для новичков в функциональном программировании и задает правильный тон. Нет болячек Lodash.",en:"1. Budget. Suitable for projects of any scale. 2. How far along the project is, percentage-wise, or whether it is just at the beginning. At any stage, except for situations when the project is already wrapping up or another data-handling library is already present. 3. Who works with you on the team and how many of you there are. For teams of any size who use functional programming either superficially or professionally and who want to simplify their routine. 4. Product quality. The product quality is, as a rule, high. 5. Performance. It will be lower than vanilla given equivalent code. The library's bundle needs to be optimized if you plan to use only a small part, 5-10%, of its functions. 6. The functional programming paradigm. Full-fledged functional programming is used. It covers up to 98% of cases when working with data and is suitable for all projects. It has its own philosophy within functional programming. It is easier for newcomers to functional programming and sets the right tone. It does not have Lodash's ailments."},{type:"text",ru:"| Sanctuary | ----------------",en:"| Sanctuary | ----------------"},{type:"text",ru:"1. Бюджет. Подходит для масштабных проектов с бюджетом выше среднего. 2. Насколько % проект завершён или он находится в начале. Желательно использовать на начальном этапе. 3. Кто работает с тобой в команде и сколько вас человек. Для команд любого размера, профессионально использующих функциональное программирование и понимающих, что они пишут. 4. Качество продукта. Качество продукта, как правило, высокое. 5. Перфоманс. Будет ниже ванилы при аналогичном коде. 6. Парадигма функционального программирования. Используется полноценное функциональное программирование со своей философией, которая строже придерживается принципов ФП. Полноценное использование монад и прочих абстрактных типов. Высокий порог входа. Для тех, кто действительно в теме функционального программирования. Своя архитектура мышления.",en:"1. Budget. Suitable for large-scale projects with an above-average budget. 2. How far along the project is, percentage-wise, or whether it is just at the beginning. It is preferable to use it at the early stage. 3. Who works with you on the team and how many of you there are. For teams of any size who use functional programming professionally and understand what they are writing. 4. Product quality. The product quality is, as a rule, high. 5. Performance. It will be lower than vanilla given equivalent code. 6. The functional programming paradigm. Full-fledged functional programming is used, with its own philosophy that adheres more strictly to FP principles. Full-fledged use of monads and other abstract types. A high barrier to entry. For those who are truly into functional programming. Its own architecture of thinking."},{type:"text",ru:"Можно себе представить приверженность к функциональному программированию.",en:"One can picture the degree of commitment to functional programming."},{type:"text",ru:"Vanilla JS (присутствует) -> Lodash (не полноценное) -> Ramda (полноценное) -> Sanctuary (полноценное и строгое)",en:"Vanilla JS (present) -> Lodash (not full-fledged) -> Ramda (full-fledged) -> Sanctuary (full-fledged and strict)"},{type:"text",ru:"Сравнительная таблица. Бюджет: Vanilla JS — Малый / Средний, Lodash — Любой, Ramda — Любой, Sanctuary — Средний / Высокий. Этап проекта: Vanilla JS — Любой, Lodash — Начальный, Ramda — Любой, Sanctuary — Начальный. Размер команды: Vanilla JS — Малая, Lodash — Любая, Ramda — Любая, Sanctuary — Любая (профи). Качество: Vanilla JS — Среднее, Lodash — Среднее, Ramda — Высокое, Sanctuary — Высокое. Производительность: Vanilla JS — 4 из 5, Lodash — 3 из 5, Ramda — 2 из 5, Sanctuary — 2 из 5. Строгость ФП: Vanilla JS — 1 из 5, Lodash — 2 из 5, Ramda — 3 из 5, Sanctuary — 4 из 5. Порог входа: Vanilla JS — Низкий, Lodash — Низкий, Ramda — Средний, Sanctuary — Высокий. Философия: Vanilla JS — Свобода выбора, Lodash — Утилитарность, Ramda — Практичное ФП, Sanctuary — Академичное ФП.",en:"Comparison table. Budget: Vanilla JS — Small / Medium, Lodash — Any, Ramda — Any, Sanctuary — Medium / High. Project stage: Vanilla JS — Any, Lodash — Early, Ramda — Any, Sanctuary — Early. Team size: Vanilla JS — Small, Lodash — Any, Ramda — Any, Sanctuary — Any (pros). Quality: Vanilla JS — Medium, Lodash — Medium, Ramda — High, Sanctuary — High. Performance: Vanilla JS — 4 out of 5, Lodash — 3 out of 5, Ramda — 2 out of 5, Sanctuary — 2 out of 5. FP strictness: Vanilla JS — 1 out of 5, Lodash — 2 out of 5, Ramda — 3 out of 5, Sanctuary — 4 out of 5. Barrier to entry: Vanilla JS — Low, Lodash — Low, Ramda — Medium, Sanctuary — High. Philosophy: Vanilla JS — Freedom of choice, Lodash — Utility, Ramda — Practical FP, Sanctuary — Academic FP."}]},Si=[Yh,Qh,Zh,ed,td,nd,rd,ad,id,od,ud,sd,cd,ld,fd,pd,hd,dd,yd,gd],md=du(kh),vd={class:"playground-wrap"},bd={class:"block-title"},wd={class:"block-desc"},_d=["aria-label"],Sd={class:"block-title"},Ad={class:"toc__list"},Ed=["href"],Nd={class:"toc__num"},Od={class:"lessons"},xd=Cr({__name:"course",setup(n){const{t,locale:e}=qr(),r=fu(),a=Aa(()=>e.value!=="ru");return pu({title:()=>t("course.title"),meta:[{name:"description",content:()=>t("course.desc")}]}),(i,u)=>{const o=nu,S=ru,I=md,te=hu,G=Kh,V=au;return wt(),ma(V,{id:"course-top"},{default:kr(()=>[Fr(o,{to:le(r)("/"),class:"back"},{default:kr(()=>[ga("← "+He(le(t)("course.back")),1)]),_:1},8,["to"]),Fr(S,{as:"h1",eyebrow:le(t)("course.eyebrow"),title:le(t)("course.title"),subtitle:le(t)("course.desc")},null,8,["eyebrow","title","subtitle"]),me("div",vd,[me("h2",bd,He(le(t)("course.playgroundTitle")),1),me("p",wd,He(le(t)("course.playgroundDesc")),1),Fr(te,null,{fallback:kr(()=>[...u[0]||(u[0]=[me("div",{class:"playground-skeleton"},null,-1)])]),default:kr(()=>[Fr(I)]),_:1})]),me("nav",{class:"toc","aria-label":le(t)("course.tocTitle")},[me("h2",Sd,He(le(t)("course.tocTitle")),1),me("ol",Ad,[(wt(!0),jt(or,null,gr(le(Si),(X,se)=>(wt(),jt("li",{key:X.slug,class:"toc__item"},[me("a",{href:`#${X.slug}`,class:"toc__link"},[me("span",Nd,He(String(se+1).padStart(2,"0")),1),ga(" "+He(le(a)?X.title.en:X.title.ru),1)],8,Ed)]))),128))])],8,_d),me("div",Od,[(wt(!0),jt(or,null,gr(le(Si),(X,se)=>(wt(),ma(G,{key:X.slug,lesson:X,index:se+1},null,8,["lesson","index"]))),128))])]),_:1})}}}),kd=Ur(xd,[["__scopeId","data-v-268d6c44"]]);export{kd as default};
