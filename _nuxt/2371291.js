(window.webpackJsonp=window.webpackJsonp||[]).push([[9,13,17,19,20],{348:function(e,t,i){e.exports={"dark-theme":"dark-theme_JDHmK",label:"label_Mzd3o"}},349:function(e,t,i){e.exports={"dark-theme":"dark-theme_L9Ua-",title:"title_b7qil"}},351:function(e,t,i){e.exports={"dark-theme":"dark-theme_jK0Dl",image:"image_pvTu2"}},353:function(e,t,i){"use strict";i.r(t);var a=i(0),r=Object(a.b)({name:"VImageLazy",props:{alt:{type:String,required:!1,default:""},src:{type:String,required:!0},objectFit:{type:String,required:!1,default:""}}}),s=i(364),n=i(13);var o=Object(n.a)(r,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("img",{directives:[{name:"lazy-load",rawName:"v-lazy-load"}],class:e.$style.image,style:"object-fit: ".concat(e.objectFit),attrs:{"data-src":e.src,alt:e.alt,title:""}})}),[],!1,(function(e){this.$style=s.default.locals||s.default}),null,null);t.default=o.exports},354:function(e,t,i){"use strict";i.r(t);var a=i(0),r=Object(a.b)({name:"VLabel",props:{label:{type:String,required:!0}}}),s=i(361),n=i(13);var o=Object(n.a)(r,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{class:e.$style.label},[e._v(e._s(e.label))])}),[],!1,(function(e){this.$style=s.default.locals||s.default}),null,null);t.default=o.exports},355:function(e,t,i){"use strict";i.r(t);var a=i(0),r=Object(a.b)({name:"VTitle",props:{title:{type:String,required:!0}}}),s=i(362),n=i(13);var o=Object(n.a)(r,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("h2",{class:e.$style.title,domProps:{innerHTML:e._s(e.title)}})}),[],!1,(function(e){this.$style=s.default.locals||s.default}),null,null);t.default=o.exports},360:function(e,t,i){e.exports={"dark-theme":"dark-theme_KH92M",card:"card_k88pb",rating:"rating_EtMW3",star:"star_TDAcr",description:"description_vaq1Q",profile:"profile_L4zDg",imageWrap:"imageWrap_8-Qum",info:"info_qGvMl",name:"name_1WVK3",position:"position_3ea3a"}},361:function(e,t,i){"use strict";var a=i(348),r=i.n(a);i.d(t,"default",(function(){return r.a}))},362:function(e,t,i){"use strict";var a=i(349),r=i.n(a);i.d(t,"default",(function(){return r.a}))},364:function(e,t,i){"use strict";var a=i(351),r=i.n(a);i.d(t,"default",(function(){return r.a}))},374:function(e,t,i){e.exports={"dark-theme":"dark-theme_wingM",reviewsWrap:"reviewsWrap_CpNog",head:"head_1pe84",body:"body_gDdBi",slidesSection:"slidesSection_15uI4",sliderItem:"sliderItem_QRqxN"}},376:function(e,t,i){"use strict";i.r(t);i(22),i(20),i(42),i(128);var a=i(0),r=i(353),s=Object(a.b)({name:"ReviewCard",components:{VImageLazy:r.default},props:{rating:{type:Number,required:!0},reviewText:{type:String,required:!0},profileImage:{type:String,required:!0},name:{type:String,required:!0},position:{type:String,required:!0}}}),n=i(380),o=i(13);var l=Object(o.a)(s,(function(){var e,t=this,i=t._self._c;t._self._setupProxy;return i("article",{class:t.$style.card},[i("div",{class:t.$style.profile},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.profileImage,expression:"profileImage"}],class:t.$style.imageWrap},[i("VImageLazy",{attrs:{src:t.profileImage,"object-fit":"cover",alt:"profile: ".concat(null===(e=t.profileImage)||void 0===e?void 0:e.split("/")[2].split(".")[0])}})],1),t._v(" "),i("div",{class:t.$style.info},[i("h6",{directives:[{name:"show",rawName:"v-show",value:t.name,expression:"name"}],class:t.$style.name},[t._v("\n        "+t._s(t.name)+"\n      ")]),t._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:t.position,expression:"position"}],class:t.$style.position},[t._v("\n        "+t._s(t.position)+"\n      ")])])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.rating,expression:"rating"}],class:t.$style.rating},t._l(t.rating,(function(e){return i("VImageLazy",{key:"star".concat(e),class:t.$style.star,attrs:{src:"icon/star.svg",alt:"star-rating"}})})),1),t._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:t.reviewText,expression:"reviewText"}],class:t.$style.description},[t._v("\n    "+t._s(t.reviewText)+"\n  ")])])}),[],!1,(function(e){this.$style=n.default.locals||n.default}),null,null);t.default=l.exports;installComponents(l,{VImageLazy:i(353).default})},380:function(e,t,i){"use strict";var a=i(360),r=i.n(a);i.d(t,"default",(function(){return r.a}))},393:function(e,t,i){"use strict";var a=i(374),r=i.n(a);i.d(t,"default",(function(){return r.a}))},399:function(e,t,i){"use strict";i.r(t);i(22);var a=i(0),r=i(354),s=i(355),n=i(376),o=0,l=Object(a.b)({name:"ReviewsPage",components:{VLabel:r.default,VTitle:s.default,ReviewCard:n.default},props:{device:{type:Object,required:!0}},data:function(){return{reviewCardsDesktop:[{id:"cardId".concat(o++),rating:5,reviewText:"Работа была выполнена в указанные сроки",position:"Руководитель отдела развития GetMO",name:"Александра Иванова",profileImage:"images/reviews/Aleksandra_Ivanova.webp"},{id:"cardId".concat(o++),rating:5,reviewText:"Проект был написан со строгим соблюдением технического задания. Рекомендую",position:"Зам. директор DoubleBe",name:"Игорь Таранов",profileImage:"images/reviews/Igor_taranov.webp"},{id:"cardId".concat(o++),rating:5,reviewText:"Архитектура написания кода понравилась",position:"Senior Fronted-developer Avito Tech",name:"Иван Петров",profileImage:"images/reviews/Ivan_Petrov.webp"},{id:"cardId".concat(o++),rating:5,reviewText:"Решила расширить функционал своего текущего веб приложения. Работой довольна, спасибо",position:"ИП Завьялова",name:"Любовь Завьялова",profileImage:"images/reviews/Luba_Zavialova.webp"},{id:"cardId".concat(o++),rating:5,reviewText:"Успешная работа в команде, быстро вошел в проект",position:"Team Lead Tinkoff Business",name:"Валерий Кондрашов",profileImage:"images/reviews/Murad_Gasanov.webp"}],reviewCardsMobile:[{id:"cardId".concat(o++),rating:5,reviewText:"Работа была выполнена в указанные сроки",position:"Руководитель отдела развития GetMO",name:"Александра Иванова",profileImage:"images/reviews/mobile/Aleksandra_Ivanova-425.webp"},{id:"cardId".concat(o++),rating:5,reviewText:"Проект был написан со строгим соблюдением технического задания. Рекомендую",position:"Зам. директор DoubleBe",name:"Игорь Таранов",profileImage:"images/reviews/mobile/Igor_taranov-425.webp"},{id:"cardId".concat(o++),rating:5,reviewText:"Архитектура написания кода понравилась",position:"Senior Fronted-developer Avito Tech",name:"Иван Петров",profileImage:"images/reviews/mobile/Ivan_Petrov-425.webp"},{id:"cardId".concat(o++),rating:5,reviewText:"Решила расширить функционал своего текущего веб приложения. Работой довольна, спасибо",position:"ИП Завьялова",name:"Любовь Завьялова",profileImage:"images/reviews/mobile/Luba_Zavialova-425.webp"},{id:"cardId".concat(o++),rating:5,reviewText:"Успешная работа в команде, быстро вошел в проект",position:"Team Lead Tinkoff Business",name:"Валерий Кондрашов",profileImage:"images/reviews/mobile/Murad_Gasanov-425.webp"}],swiper:{}}},computed:{getSlides:function(){return this.device.tablet||this.device.mobile?this.reviewCardsMobile:this.reviewCardsDesktop}},mounted:function(){var e=this;this.$nextTick((function(){e.initSlider()})),this.$refs.reviews&&this.$nuxt.$emit("addRef",{element:this.$refs.reviews,eventName:"reviews"})},beforeDestroy:function(){this.swiper={}},methods:{initSlider:function(){var e=3;this.device.tablet&&(e=2),this.device.mobile&&(e=1),this.swiper=new this.$Swiper(".reviews",{loop:!1,slidesPerView:e,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},scrollbar:{el:".swiper-scrollbar"},spaceBetween:15})}}}),c=i(393),d=i(13);var p=Object(d.a)(l,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("section",{ref:"reviews",class:["container",e.$style.reviewsWrap]},[t("div",{class:e.$style.head},[t("VLabel",{attrs:{label:"Отзывы"}}),e._v(" "),t("VTitle",{attrs:{title:"<span>Что говорят компании партнеры о моей</span> работе"}})],1),e._v(" "),t("div",{class:e.$style.body},[t("div",{class:["reviews",e.$style.slidesSection]},[Boolean(e.getSlides.length)?t("div",{staticClass:"swiper-wrapper"},e._l(e.getSlides,(function(i){return t("ReviewCard",{key:i.id,class:["swiper-slide",e.$style.sliderItem],attrs:{name:i.name,position:i.position,"profile-image":i.profileImage,rating:i.rating,"review-text":i.reviewText}})})),1):e._e(),e._v(" "),t("div",{staticClass:"swiper-pagination"}),e._v(" "),t("div",{staticClass:"swiper-button-prev"}),e._v(" "),t("div",{staticClass:"swiper-button-next"})])])])}),[],!1,(function(e){this.$style=c.default.locals||c.default}),null,null);t.default=p.exports;installComponents(p,{VLabel:i(354).default,VTitle:i(355).default,ReviewCard:i(376).default})}}]);