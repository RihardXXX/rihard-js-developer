(window.webpackJsonp=window.webpackJsonp||[]).push([[2,12,16,17,18,19,20],{348:function(t,e,i){t.exports={"dark-theme":"dark-theme_JDHmK",label:"label_Mzd3o"}},349:function(t,e,i){t.exports={"dark-theme":"dark-theme_L9Ua-",title:"title_b7qil"}},350:function(t,e,i){t.exports={"dark-theme":"dark-theme_+ozRw",button:"button_JYp3r",big:"big_NMQFD",red:"red_7cECW",black:"black_UGG2y",green:"green_AgH1R",white:"white_jjzud",blue:"blue_UbNvd",orange:"orange_44ZbJ"}},351:function(t,e,i){t.exports={"dark-theme":"dark-theme_jK0Dl",image:"image_pvTu2"}},352:function(t,e,i){t.exports={"dark-theme":"dark-theme_lM0pK",info:"info_v5ufA",title:"title_y-17U",description:"description_195Uf",btnMe:"btnMe_OEDo6",link:"link_9D74O"}},353:function(t,e,i){"use strict";i.r(e);var o=i(0),r=Object(o.b)({name:"VImageLazy",props:{alt:{type:String,required:!1,default:""},src:{type:String,required:!0},objectFit:{type:String,required:!1,default:""}}}),a=i(364),n=i(13);var l=Object(n.a)(r,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("img",{directives:[{name:"lazy-load",rawName:"v-lazy-load"}],class:t.$style.image,style:"object-fit: ".concat(t.objectFit),attrs:{"data-src":t.src,alt:t.alt,title:""}})}),[],!1,(function(t){this.$style=a.default.locals||a.default}),null,null);e.default=l.exports},354:function(t,e,i){"use strict";i.r(e);var o=i(0),r=Object(o.b)({name:"VLabel",props:{label:{type:String,required:!0}}}),a=i(361),n=i(13);var l=Object(n.a)(r,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{class:t.$style.label},[t._v(t._s(t.label))])}),[],!1,(function(t){this.$style=a.default.locals||a.default}),null,null);e.default=l.exports},355:function(t,e,i){"use strict";i.r(e);var o=i(0),r=Object(o.b)({name:"VTitle",props:{title:{type:String,required:!0}}}),a=i(362),n=i(13);var l=Object(n.a)(r,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("h2",{class:t.$style.title,domProps:{innerHTML:t._s(t.title)}})}),[],!1,(function(t){this.$style=a.default.locals||a.default}),null,null);e.default=l.exports},356:function(t,e,i){"use strict";i.r(e);i(20),i(42),i(366);var o=i(0),r=i(354),a=i(355),n=Object(o.b)({name:"VInfo",components:{VLabel:r.default,VTitle:a.default},props:{label:{type:String,required:!1,default:""},title:{type:String,required:!1,default:""},description:{type:String,required:!1,default:""},buttonName:{type:String,required:!1,default:""},isMail:{type:Boolean,required:!1,default:!1}},data:function(){return{element:void 0}},created:function(){var t=this;this.$nuxt.$on("addRef",(function(e){var i=e.element;"contact"===e.eventName&&(t.element=i)}))},methods:{connect:function(){var t;this.isMail&&this.$refs.email?this.$refs.email.click():null===(t=this.element)||void 0===t||t.scrollIntoView({behavior:"smooth"})}}}),l=i(369),s=i(13);var u=Object(s.a)(n,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{class:t.$style.info},[e("VLabel",{attrs:{label:t.label}}),t._v(" "),e("VTitle",{attrs:{title:t.title}}),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.description,expression:"description"}],class:t.$style.description},[t._v("\n    "+t._s(t.description)+"\n  ")]),t._v(" "),t.isMail?e("a",{ref:"email",class:t.$style.link,attrs:{href:"mailto:yusupa.akaeva@yandex.ru"}},[t._v("\n    yusupa.akaeva@yandex.ru\n  ")]):t._e(),t._v(" "),e("VButton",{class:t.$style.btnMe,attrs:{color:"green"},on:{click:t.connect}},[t._v("\n    "+t._s(t.buttonName)+"\n  ")])],1)}),[],!1,(function(t){this.$style=l.default.locals||l.default}),null,null);e.default=u.exports;installComponents(u,{VLabel:i(354).default,VTitle:i(355).default,VButton:i(365).default})},359:function(t,e,i){t.exports={"dark-theme":"dark-theme_nJQZV",certificatesModal:"certificatesModal_OZ1ng",close:"close_wnEd3"}},361:function(t,e,i){"use strict";var o=i(348),r=i.n(o);i.d(e,"default",(function(){return r.a}))},362:function(t,e,i){"use strict";var o=i(349),r=i.n(o);i.d(e,"default",(function(){return r.a}))},363:function(t,e,i){"use strict";var o=i(350),r=i.n(o);i.d(e,"default",(function(){return r.a}))},364:function(t,e,i){"use strict";var o=i(351),r=i.n(o);i.d(e,"default",(function(){return r.a}))},365:function(t,e,i){"use strict";i.r(e);var o=i(4),r=i(0),a=Object(r.b)({name:"VButton",props:{color:{type:String,required:!0}}}),n=i(363),l=i(13);var s=Object(l.a)(a,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("button",{class:[t.$style.button,Object(o.a)({},t.$style["".concat(t.color)],t.color)],on:{click:function(){return t.$emit("click")}}},[t._t("default")],2)}),[],!1,(function(t){this.$style=n.default.locals||n.default}),null,null);e.default=s.exports},366:function(t,e,i){"use strict";var o=i(2),r=i(367);o({target:"String",proto:!0,forced:i(368)("link")},{link:function(t){return r(this,"a","href",t)}})},367:function(t,e,i){var o=i(5),r=i(36),a=i(16),n=/"/g,l=o("".replace);t.exports=function(t,e,i,o){var s=a(r(t)),u="<"+e;return""!==i&&(u+=" "+i+'="'+l(a(o),n,"&quot;")+'"'),u+">"+s+"</"+e+">"}},368:function(t,e,i){var o=i(3);t.exports=function(t){return o((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},369:function(t,e,i){"use strict";var o=i(352),r=i.n(o);i.d(e,"default",(function(){return r.a}))},379:function(t,e,i){"use strict";var o=i(359),r=i.n(o);i.d(e,"default",(function(){return r.a}))},381:function(t,e,i){"use strict";i.r(e);var o=i(0),r=i(353),a=Object(o.b)({name:"CertificatesModal",components:{VImageLazy:r.default},props:{src:{type:String,required:!0}},methods:{close:function(){this.$modal.close()}}}),n=i(379),l=i(13);var s=Object(l.a)(a,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("div",{class:t.$style.certificatesModal},[e("h2",{class:t.$style.close,on:{click:t.close}},[t._v("закрыть X")]),t._v(" "),e("VImageLazy",{attrs:{src:t.src,"object-fit":"contain"}})],1)}),[],!1,(function(t){this.$style=n.default.locals||n.default}),null,null);e.default=s.exports;installComponents(s,{VImageLazy:i(353).default})},382:function(t,e,i){t.exports={"dark-theme":"dark-theme_RbHY1",portfolio:"portfolio_lNpuv",leftSection:"leftSection_zOFgO",swiperWrap:"swiperWrap_okcEN",sliderItem:"sliderItem_sAemr",progress:"progress_1maaF",info:"info_+aZ6j"}},401:function(t,e,i){"use strict";var o=i(382),r=i.n(o);i.d(e,"default",(function(){return r.a}))},410:function(t,e,i){"use strict";i.r(e);var o=i(10),r=(i(46),i(0)),a=i(356),n=i(353),l=i(381),s=Object(r.b)({name:"PortfolioPage",components:{VInfo:a.default,VImageLazy:n.default},props:{device:{type:Object,required:!0}},data:function(){return{swiper:{},show:!1,desktopSlides:[{path:"images/portfolio/amenu.webp"},{path:"images/portfolio/4D.webp"},{path:"images/portfolio/brusnika.webp"},{path:"images/portfolio/krost.webp"},{path:"images/portfolio/lesart.webp"},{path:"images/portfolio/scrile.webp"},{path:"images/portfolio/vatutinki.webp"},{path:"images/portfolio/zki.webp"}],mobileSlides:[{path:"images/portfolio/mobile/amenu-425.webp"},{path:"images/portfolio/mobile/4D-425.webp"},{path:"images/portfolio/mobile/brusnika-425.webp"},{path:"images/portfolio/mobile/krost-425.webp"},{path:"images/portfolio/mobile/lesart-425.webp"},{path:"images/portfolio/mobile/scrile-425.webp"},{path:"images/portfolio/mobile/vatutinki-425.webp"},{path:"images/portfolio/mobile/zki-425.webp"}]}},computed:{getSlides:function(){return this.device.tablet||this.device.mobile?this.mobileSlides:this.desktopSlides}},mounted:function(){this.initSlider(),this.$refs.portfolio&&this.$nuxt.$emit("addRef",{element:this.$refs.portfolio,eventName:"portfolio"})},beforeDestroy:function(){this.swiper={}},methods:{initSlider:function(){this.swiper=new this.$Swiper(".portfolio",{loop:!1,slidesPerView:1,autoplay:{delay:6e3},speed:2e3,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},scrollbar:{el:".swiper-scrollbar"},spaceBetween:10})},showCertificate:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:e.$modal.open(l.default,{src:t.path});case 1:case"end":return i.stop()}}),i)})))()}}}),u=i(401),c=i(13);var f=Object(c.a)(s,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e("section",{ref:"portfolio",class:["container",t.$style.portfolio]},[e("div",{class:t.$style.leftSection},[e("VInfo",{class:t.$style.info,attrs:{label:"Портфолио",title:"В каких <span>проектах</span> участвовал?",description:"Я выбрал и упомянул здесь некоторые из моих последних проектов, чтобы поделиться с вами","button-name":"Связаться со мной"}})],1),t._v(" "),e("div",{class:["portfolio",t.$style.swiperWrap]},[Boolean(t.getSlides.length)?e("div",{staticClass:"swiper-wrapper"},t._l(t.getSlides,(function(i,o){var r;return e("div",{key:"portfolio".concat(o+1),class:["swiper-slide",t.$style.sliderItem],on:{click:function(e){return e.stopPropagation(),function(){return t.showCertificate(i)}.apply(null,arguments)}}},[e("VImageLazy",{attrs:{src:i.path,"object-fit":"cover",alt:"portfolio: ".concat(null===(r=i.path)||void 0===r?void 0:r.split("/")[2].split(".")[0])}})],1)})),0):t._e(),t._v(" "),e("div",{staticClass:"swiper-pagination"})])])}),[],!1,(function(t){this.$style=u.default.locals||u.default}),null,null);e.default=f.exports;installComponents(f,{VInfo:i(356).default,VImageLazy:i(353).default})}}]);