(window.webpackJsonp=window.webpackJsonp||[]).push([[7,16,18,19,20],{348:function(t,e,n){t.exports={"dark-theme":"dark-theme_JDHmK",label:"label_Mzd3o"}},349:function(t,e,n){t.exports={"dark-theme":"dark-theme_L9Ua-",title:"title_b7qil"}},350:function(t,e,n){t.exports={"dark-theme":"dark-theme_+ozRw",button:"button_JYp3r",big:"big_NMQFD",red:"red_7cECW",black:"black_UGG2y",green:"green_AgH1R",white:"white_jjzud",blue:"blue_UbNvd",orange:"orange_44ZbJ"}},352:function(t,e,n){t.exports={"dark-theme":"dark-theme_lM0pK",info:"info_v5ufA",title:"title_y-17U",description:"description_195Uf",btnMe:"btnMe_OEDo6",link:"link_9D74O"}},354:function(t,e,n){"use strict";n.r(e);var r=n(0),a=Object(r.b)({name:"VLabel",props:{label:{type:String,required:!0}}}),l=n(361),i=n(13);var o=Object(i.a)(a,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{class:t.$style.label},[t._v(t._s(t.label))])}),[],!1,(function(t){this.$style=l.default.locals||l.default}),null,null);e.default=o.exports},355:function(t,e,n){"use strict";n.r(e);var r=n(0),a=Object(r.b)({name:"VTitle",props:{title:{type:String,required:!0}}}),l=n(362),i=n(13);var o=Object(i.a)(a,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("h2",{class:t.$style.title,domProps:{innerHTML:t._s(t.title)}})}),[],!1,(function(t){this.$style=l.default.locals||l.default}),null,null);e.default=o.exports},356:function(t,e,n){"use strict";n.r(e);n(20),n(42),n(366);var r=n(0),a=n(354),l=n(355),i=Object(r.b)({name:"VInfo",components:{VLabel:a.default,VTitle:l.default},props:{label:{type:String,required:!1,default:""},title:{type:String,required:!1,default:""},description:{type:String,required:!1,default:""},buttonName:{type:String,required:!1,default:""},isMail:{type:Boolean,required:!1,default:!1}},data:function(){return{element:void 0}},created:function(){var t=this;this.$nuxt.$on("addRef",(function(e){var n=e.element;"contact"===e.eventName&&(t.element=n)}))},methods:{connect:function(){var t;this.isMail&&this.$refs.email?this.$refs.email.click():null===(t=this.element)||void 0===t||t.scrollIntoView({behavior:"smooth"})}}}),o=n(369),s=n(13);var u=Object(s.a)(i,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{class:t.$style.info},[e("VLabel",{attrs:{label:t.label}}),t._v(" "),e("VTitle",{attrs:{title:t.title}}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.description,expression:"description"}],class:t.$style.description},[t._v("\n    "+t._s(t.description)+"\n  ")]),t._v(" "),t.isMail?e("a",{ref:"email",class:t.$style.link,attrs:{href:"mailto:yusupa.akaeva@yandex.ru"}},[t._v("\n    yusupa.akaeva@yandex.ru\n  ")]):t._e(),t._v(" "),e("VButton",{class:t.$style.btnMe,attrs:{color:"green"},on:{click:t.connect}},[t._v("\n    "+t._s(t.buttonName)+"\n  ")])],1)}),[],!1,(function(t){this.$style=o.default.locals||o.default}),null,null);e.default=u.exports;installComponents(u,{VLabel:n(354).default,VTitle:n(355).default,VButton:n(365).default})},361:function(t,e,n){"use strict";var r=n(348),a=n.n(r);n.d(e,"default",(function(){return a.a}))},362:function(t,e,n){"use strict";var r=n(349),a=n.n(r);n.d(e,"default",(function(){return a.a}))},363:function(t,e,n){"use strict";var r=n(350),a=n.n(r);n.d(e,"default",(function(){return a.a}))},365:function(t,e,n){"use strict";n.r(e);var r=n(4),a=n(0),l=Object(a.b)({name:"VButton",props:{color:{type:String,required:!0}}}),i=n(363),o=n(13);var s=Object(o.a)(l,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("button",{class:[t.$style.button,Object(r.a)({},t.$style["".concat(t.color)],t.color)],on:{click:function(){return t.$emit("click")}}},[t._t("default")],2)}),[],!1,(function(t){this.$style=i.default.locals||i.default}),null,null);e.default=s.exports},366:function(t,e,n){"use strict";var r=n(2),a=n(367);r({target:"String",proto:!0,forced:n(368)("link")},{link:function(t){return a(this,"a","href",t)}})},367:function(t,e,n){var r=n(5),a=n(36),l=n(16),i=/"/g,o=r("".replace);t.exports=function(t,e,n,r){var s=l(a(t)),u="<"+e;return""!==n&&(u+=" "+n+'="'+o(l(r),i,"&quot;")+'"'),u+">"+s+"</"+e+">"}},368:function(t,e,n){var r=n(3);t.exports=function(t){return r((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},369:function(t,e,n){"use strict";var r=n(352),a=n.n(r);n.d(e,"default",(function(){return a.a}))},375:function(t,e,n){t.exports={"dark-theme":"dark-theme_jO79H",contactWrap:"contactWrap_0BkZ4",info:"info_7hMB4"}},394:function(t,e,n){"use strict";var r=n(375),a=n.n(r);n.d(e,"default",(function(){return a.a}))},400:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n(356),l=Object(r.b)({name:"ContactPage",components:{VInfo:a.default},props:{device:{type:Object,required:!0}},data:function(){return{refContact:void 0}},mounted:function(){this.$refs.contact&&this.$nuxt.$emit("addRef",{element:this.$refs.contact,eventName:"contact"})}}),i=n(394),o=n(13);var s=Object(o.a)(l,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("section",{ref:"contact",class:["container",t.$style.contactWrap]},[e("VInfo",{class:t.$style.info,attrs:{label:"контакты",title:"Вы можете <span>связаться</span> со мной",description:"Давайте сделаем что-то новое, отличное и более значимое или сделаем что-то более наглядным или концептуальным.","button-name":"написать на электронную почту","is-mail":""}})],1)}),[],!1,(function(t){this.$style=i.default.locals||i.default}),null,null);e.default=s.exports;installComponents(s,{VInfo:n(356).default})}}]);