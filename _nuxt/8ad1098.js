(window.webpackJsonp=window.webpackJsonp||[]).push([[21,8,14,15],{357:function(e,t,i){e.exports={"dark-theme":"dark-theme_PIaCW",resultsCard:"resultsCard_2aGf5",title:"title_rUR6z",description:"description_Mg07E"}},358:function(e,t,i){e.exports={"dark-theme":"dark-theme_+-SKq",card:"card_uHVzO",head:"head_TN7wE",title:"title_mjjuM",body:"body_-b-w4"}},360:function(e,t,i){e.exports={"dark-theme":"dark-theme_KH92M",card:"card_k88pb",rating:"rating_EtMW3",star:"star_TDAcr",description:"description_vaq1Q",profile:"profile_L4zDg",imageWrap:"imageWrap_8-Qum",info:"info_qGvMl",name:"name_1WVK3",position:"position_3ea3a"}},370:function(e,t,i){e.exports={"dark-theme":"dark-theme_RH6zX",aboutMe:"aboutMe_iadfp",left:"left_tbMXy",active:"active_tdJd3",info:"info_1lOZ4",right:"right_ptlyG",emptySquare:"emptySquare_wYENO",greenSquare:"greenSquare_xCOq-",imgContainer:"imgContainer_KkhSh"}},371:function(e,t,i){e.exports={"dark-theme":"dark-theme_8lpp8",results:"results_M7pCX",activeTablet:"activeTablet_YYFbH",card:"card_oRVph",active_1:"active_1_JHTMR",active_2:"active_2_36csA",active_3:"active_3_GIZv2"}},372:function(e,t,i){e.exports={"dark-theme":"dark-theme_NB3U0",skills:"skills_fNqTf",leftSection:"leftSection_0kjBQ",active:"active_ukEZL",swiperWrap:"swiperWrap_LAxuO",sliderItem:"sliderItem_WgYCd",progress:"progress_u9pOq",info:"info_vAzg1"}},373:function(e,t,i){e.exports={"dark-theme":"dark-theme_9LoGS",certificatesWrap:"certificatesWrap_E62pI",title:"title_pN0+k",slidesSection:"slidesSection_lW23A",sliderItem:"sliderItem_tjNeP",imageCertificate:"imageCertificate_6dwMs",progress:"progress_7AmAa"}},374:function(e,t,i){e.exports={"dark-theme":"dark-theme_wingM",reviewsWrap:"reviewsWrap_CpNog",head:"head_1pe84",body:"body_gDdBi",slidesSection:"slidesSection_15uI4",sliderItem:"sliderItem_QRqxN"}},375:function(e,t,i){e.exports={"dark-theme":"dark-theme_jO79H",contactWrap:"contactWrap_0BkZ4",info:"info_7hMB4"}},376:function(e,t,i){"use strict";i.r(t);i(22),i(20),i(42),i(128);var a=i(0),s=i(353),r=Object(a.b)({name:"ReviewCard",components:{VImageLazy:s.default},props:{rating:{type:Number,required:!0},reviewText:{type:String,required:!0},profileImage:{type:String,required:!0},name:{type:String,required:!0},position:{type:String,required:!0}}}),n=i(380),c=i(13);var o=Object(c.a)(r,(function(){var e,t=this,i=t._self._c;t._self._setupProxy;return i("article",{class:t.$style.card},[i("div",{class:t.$style.profile},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.profileImage,expression:"profileImage"}],class:t.$style.imageWrap},[i("VImageLazy",{attrs:{src:t.profileImage,"object-fit":"cover",alt:"profile: ".concat(null===(e=t.profileImage)||void 0===e?void 0:e.split("/")[2].split(".")[0])}})],1),t._v(" "),i("div",{class:t.$style.info},[i("h6",{directives:[{name:"show",rawName:"v-show",value:t.name,expression:"name"}],class:t.$style.name},[t._v("\n        "+t._s(t.name)+"\n      ")]),t._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:t.position,expression:"position"}],class:t.$style.position},[t._v("\n        "+t._s(t.position)+"\n      ")])])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.rating,expression:"rating"}],class:t.$style.rating},t._l(t.rating,(function(e){return i("VImageLazy",{key:"star".concat(e),class:t.$style.star,attrs:{src:"icon/star.svg",alt:"star-rating"}})})),1),t._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:t.reviewText,expression:"reviewText"}],class:t.$style.description},[t._v("\n    "+t._s(t.reviewText)+"\n  ")])])}),[],!1,(function(e){this.$style=n.default.locals||n.default}),null,null);t.default=o.exports;installComponents(o,{VImageLazy:i(353).default})},377:function(e,t,i){"use strict";var a=i(357),s=i.n(a);i.d(t,"default",(function(){return s.a}))},378:function(e,t,i){"use strict";var a=i(358),s=i.n(a);i.d(t,"default",(function(){return s.a}))},380:function(e,t,i){"use strict";var a=i(360),s=i.n(a);i.d(t,"default",(function(){return s.a}))},383:function(e,t,i){e.exports={"dark-theme":"dark-theme_XJNQU",mainPage:"mainPage_EEQxY"}},387:function(e,t,i){"use strict";i.r(t);i(20),i(42);var a=i(0),s=Object(a.b)({name:"VResultsCard",props:{title:{type:String,required:!0},description:{type:String,required:!0},modClass:{type:[String,Array],required:!1,default:""}}}),r=i(377),n=i(13);var c=Object(n.a)(s,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("article",{class:[e.$style.resultsCard,e.modClass]},[t("h3",{class:e.$style.title},[e._v("\n    "+e._s(e.title)+"\n  ")]),e._v(" "),t("p",{class:e.$style.description},[e._v("\n    "+e._s(e.description)+"\n  ")])])}),[],!1,(function(e){this.$style=r.default.locals||r.default}),null,null);t.default=c.exports},388:function(e,t,i){"use strict";i.r(t);i(20),i(42);var a=i(0),s=i(177),r=Object(a.b)({name:"VCardSkills",components:{VIcon:s.default},props:{svgName:{type:String,required:!0},title:{type:String,required:!0},description:{type:String,required:!0}}}),n=i(378),c=i(13);var o=Object(c.a)(r,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("article",{class:e.$style.card},[t("div",{class:e.$style.head},[t("VIcon",{attrs:{name:e.svgName,size:"big7"}}),e._v(" "),t("h3",{class:e.$style.title},[e._v(e._s(e.title))])],1),e._v(" "),t("div",{class:e.$style.body},[e._v("\n    "+e._s(e.description)+"\n  ")])])}),[],!1,(function(e){this.$style=n.default.locals||n.default}),null,null);t.default=o.exports},389:function(e,t,i){"use strict";var a=i(370),s=i.n(a);i.d(t,"default",(function(){return s.a}))},390:function(e,t,i){"use strict";var a=i(371),s=i.n(a);i.d(t,"default",(function(){return s.a}))},391:function(e,t,i){"use strict";var a=i(372),s=i.n(a);i.d(t,"default",(function(){return s.a}))},392:function(e,t,i){"use strict";var a=i(373),s=i.n(a);i.d(t,"default",(function(){return s.a}))},393:function(e,t,i){"use strict";var a=i(374),s=i.n(a);i.d(t,"default",(function(){return s.a}))},394:function(e,t,i){"use strict";var a=i(375),s=i.n(a);i.d(t,"default",(function(){return s.a}))},395:function(e,t,i){"use strict";i.r(t);var a=i(4),s=i(0),r=i(129),n=i(356),c=i(176),o=0,l=Object(s.b)({name:"AboutMe",components:{Dot:r.default,VInfo:n.default},props:{device:{type:Object,required:!0}},data:function(){return{showLeft:!1,dots:[{id:"about".concat(o++),size:"small",color:"blue",position:{top:"1.6",left:"30.2"}},{id:"about".concat(o++),size:"medium",color:"green",position:{top:"8.6",left:"3"}},{id:"about".concat(o++),size:"big",color:"red",position:{top:"20.2",left:"59.6"}},{id:"about".concat(o++),size:"small",color:"red",position:{top:"4.9",left:"44.7"}}]}},mounted:function(){var e,t=this;Object(c.a)(null===(e=this.$refs)||void 0===e?void 0:e.left,(function(e){e&&(t.showLeft=!0)})),this.$refs.aboutMe&&this.$nuxt.$emit("addRef",{element:this.$refs.aboutMe,eventName:"aboutMe"})}}),d=i(389),p=i(13);var u=Object(p.a)(l,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("section",{ref:"aboutMe",class:["container",e.$style.aboutMe]},[t("div",{ref:"left",class:[e.$style.left,Object(a.a)({},e.$style.active,e.device.laptop||e.device.large?e.showLeft:void 0)]},[t("VInfo",{class:e.$style.info,attrs:{label:"добро пожаловать",title:"Я <span>фронтенд</span> разработчик",description:"Меня зовут Рихард Алиханов, я люблю писать код. Уже больше 5 лет я помогаю бизнесу\n      решать их проблемы с помощью моего кода. Участвовал в разных высоко нагруженных проектах. Люблю Frontend ))","button-name":"Связаться со мной"}})],1),e._v(" "),t("div",{class:[e.$style.right,Object(a.a)({},e.$style.active,e.device.laptop||e.device.large?e.showLeft:void 0)],attrs:{inline:!0}},[t("div",{class:e.$style.emptySquare}),e._v(" "),t("div",{class:e.$style.greenSquare}),e._v(" "),t("div",{class:e.$style.imgContainer},[e.device.tablet||e.device.mobile?t("nuxt-img",{attrs:{src:"images/mobile/rihard-425.webp",placeholder:"",format:"webp",sizes:"sm:100vw md:42rem lg:42rem",alt:"main-picture-rihard"}}):t("nuxt-img",{attrs:{src:"images/rihard.webp",placeholder:"",format:"webp",sizes:"sm:100vw md:42rem lg:42rem",alt:"main-picture-rihard"}})],1)]),e._v(" "),e._l(e.dots,(function(e){return t("Dot",{key:e.id,attrs:{size:e.size,color:e.color,position:e.position}})}))],2)}),[],!1,(function(e){this.$style=d.default.locals||d.default}),null,null);t.default=u.exports;installComponents(u,{VInfo:i(356).default,Dot:i(129).default})},396:function(e,t,i){"use strict";i.r(t);var a=i(4),s=(i(20),i(42),i(128),i(0)),r=i(387),n=i(176),c=0,o=Object(s.b)({name:"ResultsPage",components:{VResultsCardVue:r.default},props:{device:{type:Object,required:!0}},data:function(){return{show:!1,resultList:[{id:"resultCard".concat(c++),title:"25+",description:"довольных клиентов"},{id:"resultCard".concat(c++),title:"77+",description:"выполненных проектов"},{id:"resultCard".concat(c++),title:"50+",description:"отзывов о работе"}]}},mounted:function(){var e,t=this;Object(n.a)(null===(e=this.$refs)||void 0===e?void 0:e.result,(function(e){e&&(t.show=!0)}))}}),l=i(390),d=i(13);var p=Object(d.a)(o,(function(){var e=this,t=e._self._c;e._self._setupProxy;return e.resultList.length?t("section",{ref:"result",class:["container",e.$style.results,Object(a.a)({},e.$style.activeTablet,e.device.tablet||e.device.mobile?e.show:void 0)]},e._l(e.resultList,(function(i,s){return t("v-results-card-vue",{key:i.id,attrs:{title:i.title,description:i.description,"mod-class":[e.$style.card,Object(a.a)({},e.$style["active_".concat(Number(s+1))],e.device.large||e.device.laptop?e.show:void 0)]}})})),1):e._e()}),[],!1,(function(e){this.$style=l.default.locals||l.default}),null,null);t.default=p.exports},397:function(e,t,i){"use strict";i.r(t);var a=i(4),s=(i(20),i(42),i(0)),r=i(356),n=i(388),c=i(176),o=0,l=Object(s.b)({name:"SkillsPage",components:{VInfo:r.default,VCardSkills:n.default},props:{device:{type:Object,required:!0}},data:function(){return{swiper:{},show:!1,slides:[{id:"slideItem".concat(o++),cards:[{id:"cardItem".concat(o++),svgName:"js",title:"Javascript",description:"Разработка высоко-нагруженных приложений на JS"},{id:"cardItem".concat(o++),svgName:"ts",title:"TypeScript",description:"Обеспечу строгую типизацию и надежность приложений на TS"},{id:"cardItem".concat(o++),svgName:"npm",title:"NPM",description:"Использую в работе самый популярный пакетный менеджер"},{id:"cardItem".concat(o++),svgName:"webpack",title:"Webpack",description:"Использую один из лучших сборщиков"}]},{id:"slideItem".concat(o++),cards:[{id:"cardItem".concat(o++),svgName:"html5",title:"HTML5",description:"В верстке применяю тэги из HTML5"},{id:"cardItem".concat(o++),svgName:"css3",title:"CSS3",description:"Применяю стили с использованием CSS3"},{id:"cardItem".concat(o++),svgName:"sass-original",title:"SASS-SCSS",description:"В работе использую только препроцессоры"},{id:"cardItem".concat(o++),svgName:"babel-original",title:"Babel",description:"Не забываю писать в новом стиле не теряя поддержки старых браузеров"}]},{id:"slideItem".concat(o++),cards:[{id:"cardItem".concat(o++),svgName:"github_cat",title:"Git",description:"Удаленная разработка с использованием системы контроля версий"},{id:"cardItem".concat(o++),svgName:"gulp-plain",title:"Gulp",description:"Использую менеджер задаче в старых проектах"},{id:"cardItem".concat(o++),svgName:"gitlab-original-wordmark",title:"GITHUB-GITLAB",description:"Использую лучший хостинг для удаленных репо"},{id:"cardItem".concat(o++),svgName:"docker",title:"Docker",description:"Разворачиваю проект для локальный разработки с использованием Docker"}]},{id:"slideItem".concat(o++),cards:[{id:"cardItem".concat(o++),svgName:"vuejs-original-wordmark",title:"Vue JS",description:"Работаю на самом скоростном фронтенд фреймворке"},{id:"cardItem".concat(o++),svgName:"nuxtjs-original",title:"Nuxt JS",description:"лучший фреймворк с SSR поддержкой проектов для поисковых роботов"},{id:"cardItem".concat(o++),svgName:"react",title:"React JS",description:"Использование мощных возможностей Реакта"},{id:"cardItem".concat(o++),svgName:"redux",title:"Redux",description:"Использование глобального менеджера состояния для эффективного управления приложением"}]},{id:"slideItem".concat(o++),cards:[{id:"cardItem".concat(o++),svgName:"axios",title:"Axios",description:"Эффективное использование популярной библиотеки для работы с сервером"},{id:"cardItem".concat(o++),svgName:"graphql-plain-wordmark",title:"Graphql",description:"Современный язык запросов для работы с сервером "},{id:"cardItem".concat(o++),svgName:"apollo",title:"Apollo",description:"Одна из самых лучших библиотек для работы с Graphql"},{id:"cardItem".concat(o++),svgName:"mongodb-plain-wordmark",title:"Express JS, Nest JS, Mongo DB",description:"Поддержка бэка с ипользованием Express JS, Nest JS и БД Монги"}]}]}},mounted:function(){var e,t=this;Object(c.a)(null===(e=this.$refs)||void 0===e?void 0:e.skills,(function(e){e&&(t.show=!0)})),this.initSlider(),this.$refs.skills&&this.$nuxt.$emit("addRef",{element:this.$refs.skills,eventName:"skills"})},beforeDestroy:function(){this.swiper={}},methods:{initSlider:function(){this.swiper=new this.$Swiper(".swiper",{loop:!0,autoplay:{delay:8e3},speed:2e3,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},scrollbar:{el:".swiper-scrollbar"}})}}}),d=i(391),p=i(13);var u=Object(p.a)(l,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("section",{ref:"skills",class:["container",e.$style.skills]},[t("div",{class:[e.$style.leftSection,Object(a.a)({},e.$style.active,e.show)]},[t("VInfo",{class:e.$style.info,attrs:{label:"Мои навыки",title:"<span>Почему вы</span> выберете меня ?",description:"Я frontend-developer. Моя страсть — разработка интерфейсов развивающих бизнес проекты  компании.","button-name":"Связаться со мной"}})],1),e._v(" "),t("div",{class:["swiper",e.$style.swiperWrap,Object(a.a)({},e.$style.active,e.show)]},[Boolean(e.slides.length)?t("div",{staticClass:"swiper-wrapper"},e._l(e.slides,(function(i){return t("div",{key:i.id,class:["swiper-slide",e.$style.sliderItem]},e._l(i.cards,(function(e){return t("VCardSkills",{key:e.id,attrs:{"svg-name":e.svgName,title:e.title,description:e.description}})})),1)})),0):e._e(),e._v(" "),t("div",{staticClass:"swiper-pagination"})])])}),[],!1,(function(e){this.$style=d.default.locals||d.default}),null,null);t.default=u.exports;installComponents(u,{VInfo:i(356).default})},398:function(e,t,i){"use strict";i.r(t);var a=i(10),s=(i(46),i(0)),r=i(353),n=i(381),c=Object(s.b)({name:"CertificatesPage",components:{VImageLazy:r.default},props:{device:{type:Object,required:!0}},data:function(){return{modalOpen:!1,swiper:{},desktopSlides:[{path:"images/certificates/git-udemy.webp"},{path:"images/certificates/js_advantages_ivan.webp"},{path:"images/certificates/js_mih_nepom.webp"},{path:"images/certificates/JS_OOP_Itgidinfo.webp"},{path:"images/certificates/js_react_ivan.webp"},{path:"images/certificates/JS_React_Redux_23.webp"},{path:"images/certificates/js_tools.webp"},{path:"images/certificates/js_vladilen.webp"},{path:"images/certificates/js_vue_mecheriak.webp"},{path:"images/certificates/js_mih_nepom.webp"},{path:"images/certificates/js2itgidinfo.webp"},{path:"images/certificates/JSYouraAllahverdov.webp"},{path:"images/certificates/lodash_kochergin.webp"},{path:"images/certificates/nestJSKochergin.webp"},{path:"images/certificates/nuxtAcademind.webp"},{path:"images/certificates/php_intuit.webp"},{path:"images/certificates/react_hooks_kochergin.webp"},{path:"images/certificates/react_redux_bura.webp"},{path:"images/certificates/react_redux_vesel.webp"},{path:"images/certificates/stepic_ssh.webp"},{path:"images/certificates/stepik_python_base.webp"},{path:"images/certificates/stepik_python.webp"},{path:"images/certificates/vueFirebase_kokorin.webp"},{path:"images/certificates/vuejs_kochergin.webp"},{path:"images/certificates/vueMaximilan.webp"},{path:"images/certificates/webdeveloper2021.webp"},{path:"images/certificates/docker_kochergin.webp"},{path:"images/certificates/geek_base_programming.webp"},{path:"/images/certificates/java_intuit.webp"},{path:"/images/certificates/javarush33.webp"}],mobileSlides:[{path:"images/certificates/mobile/git-udemy-425.webp"},{path:"images/certificates/mobile/js_advantages_ivan-425.webp"},{path:"images/certificates/mobile/js_mih_nepom-425.webp"},{path:"images/certificates/mobile/JS_OOP_Itgidinfo-425.webp"},{path:"images/certificates/mobile/js_react_ivan-425.webp"},{path:"images/certificates/mobile/JS_React_Redux_23-425.webp"},{path:"images/certificates/mobile/js_tools-425.webp"},{path:"images/certificates/mobile/js_vladilen-425.webp"},{path:"images/certificates/mobile/js_vue_mecheriak-425.webp"},{path:"images/certificates/mobile/js_mih_nepom-425.webp"},{path:"images/certificates/mobile/js2itgidinfo-425.webp"},{path:"images/certificates/mobile/JSYouraAllahverdov-425.webp"},{path:"images/certificates/mobile/lodash_kochergin-425.webp"},{path:"images/certificates/mobile/nestJSKochergin-425.webp"},{path:"images/certificates/mobile/nuxtAcademind-425.webp"},{path:"images/certificates/mobile/php_intuit-425.webp"},{path:"images/certificates/mobile/react_hooks_kochergin-425.webp"},{path:"images/certificates/mobile/react_redux_bura-425.webp"},{path:"images/certificates/mobile/react_redux_vesel-425.webp"},{path:"images/certificates/mobile/stepic_ssh-425.webp"},{path:"images/certificates/mobile/stepik_python_base-425.webp"},{path:"images/certificates/mobile/stepik_python-425.webp"},{path:"images/certificates/mobile/vueFirebase_kokorin-425.webp"},{path:"images/certificates/mobile/vuejs_kochergin-425.webp"},{path:"images/certificates/mobile/vueMaximilan-425.webp"},{path:"images/certificates/mobile/webdeveloper2021-425.webp"},{path:"images/certificates/mobile/docker_kochergin-425.webp"},{path:"images/certificates/mobile/geek_base_programming-425.webp"},{path:"/images/certificates/mobile/java_intuit-425.webp"},{path:"/images/certificates/mobile/javarush33-425.webp"}]}},computed:{getSlides:function(){return this.device.tablet||this.device.mobile?this.mobileSlides:this.desktopSlides}},mounted:function(){var e=this;this.$refs.certificates&&(this.$nuxt.$emit("addRef",{element:this.$refs.certificates,eventName:"certificates"}),this.$nextTick((function(){e.initSlider()})))},beforeDestroy:function(){this.swiper={}},methods:{initSlider:function(){var e=3;this.device.tablet&&(e=2),this.device.mobile&&(e=1),this.swiper=new this.$Swiper(".certificates",{loop:!1,autoplay:{delay:3e3},speed:2e3,slidesPerView:e,pagination:{el:".swiper-pagination"},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},scrollbar:{el:".swiper-scrollbar"},spaceBetween:15})},showCertificate:function(e){var t=this;return Object(a.a)(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:t.$modal.open(n.default,{src:e.path});case 1:case"end":return i.stop()}}),i)})))()}}}),o=i(392),l=i(13);var d=Object(l.a)(c,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("section",{ref:"certificates",class:["container",e.$style.certificatesWrap]},[t("h3",{class:e.$style.title},[e._v("Сертификаты обучения")]),e._v(" "),t("div",{class:["certificates",e.$style.slidesSection]},[Boolean(e.getSlides.length)?t("div",{staticClass:"swiper-wrapper"},e._l(e.getSlides,(function(i,a){var s;return t("div",{key:"certificate".concat(a+1,"}"),class:["swiper-slide",e.$style.sliderItem],on:{click:function(t){return t.stopPropagation(),function(){return e.showCertificate(i)}.apply(null,arguments)}}},[t("VImageLazy",{attrs:{src:i.path,"object-fit":"contain",alt:"certificate: ".concat(null===(s=i.path)||void 0===s?void 0:s.split("/")[2].split(".")[0])}})],1)})),0):e._e(),e._v(" "),t("div",{staticClass:"swiper-pagination"})])])}),[],!1,(function(e){this.$style=o.default.locals||o.default}),null,null);t.default=d.exports;installComponents(d,{VImageLazy:i(353).default})},399:function(e,t,i){"use strict";i.r(t);i(22);var a=i(0),s=i(354),r=i(355),n=i(376),c=0,o=Object(a.b)({name:"ReviewsPage",components:{VLabel:s.default,VTitle:r.default,ReviewCard:n.default},props:{device:{type:Object,required:!0}},data:function(){return{reviewCardsDesktop:[{id:"cardId".concat(c++),rating:5,reviewText:"Работа была выполнена в указанные сроки",position:"Руководитель отдела развития GetMO",name:"Александра Иванова",profileImage:"images/reviews/Aleksandra_Ivanova.webp"},{id:"cardId".concat(c++),rating:5,reviewText:"Проект был написан со строгим соблюдением технического задания. Рекомендую",position:"Зам. директор DoubleBe",name:"Игорь Таранов",profileImage:"images/reviews/Igor_taranov.webp"},{id:"cardId".concat(c++),rating:5,reviewText:"Архитектура написания кода понравилась",position:"Senior Fronted-developer Avito Tech",name:"Иван Петров",profileImage:"images/reviews/Ivan_Petrov.webp"},{id:"cardId".concat(c++),rating:5,reviewText:"Решила расширить функционал своего текущего веб приложения. Работой довольна, спасибо",position:"ИП Завьялова",name:"Любовь Завьялова",profileImage:"images/reviews/Luba_Zavialova.webp"},{id:"cardId".concat(c++),rating:5,reviewText:"Успешная работа в команде, быстро вошел в проект",position:"Team Lead Tinkoff Business",name:"Валерий Кондрашов",profileImage:"images/reviews/Murad_Gasanov.webp"}],reviewCardsMobile:[{id:"cardId".concat(c++),rating:5,reviewText:"Работа была выполнена в указанные сроки",position:"Руководитель отдела развития GetMO",name:"Александра Иванова",profileImage:"images/reviews/mobile/Aleksandra_Ivanova-425.webp"},{id:"cardId".concat(c++),rating:5,reviewText:"Проект был написан со строгим соблюдением технического задания. Рекомендую",position:"Зам. директор DoubleBe",name:"Игорь Таранов",profileImage:"images/reviews/mobile/Igor_taranov-425.webp"},{id:"cardId".concat(c++),rating:5,reviewText:"Архитектура написания кода понравилась",position:"Senior Fronted-developer Avito Tech",name:"Иван Петров",profileImage:"images/reviews/mobile/Ivan_Petrov-425.webp"},{id:"cardId".concat(c++),rating:5,reviewText:"Решила расширить функционал своего текущего веб приложения. Работой довольна, спасибо",position:"ИП Завьялова",name:"Любовь Завьялова",profileImage:"images/reviews/mobile/Luba_Zavialova-425.webp"},{id:"cardId".concat(c++),rating:5,reviewText:"Успешная работа в команде, быстро вошел в проект",position:"Team Lead Tinkoff Business",name:"Валерий Кондрашов",profileImage:"images/reviews/mobile/Murad_Gasanov-425.webp"}],swiper:{}}},computed:{getSlides:function(){return this.device.tablet||this.device.mobile?this.reviewCardsMobile:this.reviewCardsDesktop}},mounted:function(){var e=this;this.$nextTick((function(){e.initSlider()})),this.$refs.reviews&&this.$nuxt.$emit("addRef",{element:this.$refs.reviews,eventName:"reviews"})},beforeDestroy:function(){this.swiper={}},methods:{initSlider:function(){var e=3;this.device.tablet&&(e=2),this.device.mobile&&(e=1),this.swiper=new this.$Swiper(".reviews",{loop:!1,slidesPerView:e,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},scrollbar:{el:".swiper-scrollbar"},spaceBetween:15})}}}),l=i(393),d=i(13);var p=Object(d.a)(o,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("section",{ref:"reviews",class:["container",e.$style.reviewsWrap]},[t("div",{class:e.$style.head},[t("VLabel",{attrs:{label:"Отзывы"}}),e._v(" "),t("VTitle",{attrs:{title:"<span>Что говорят компании партнеры о моей</span> работе"}})],1),e._v(" "),t("div",{class:e.$style.body},[t("div",{class:["reviews",e.$style.slidesSection]},[Boolean(e.getSlides.length)?t("div",{staticClass:"swiper-wrapper"},e._l(e.getSlides,(function(i){return t("ReviewCard",{key:i.id,class:["swiper-slide",e.$style.sliderItem],attrs:{name:i.name,position:i.position,"profile-image":i.profileImage,rating:i.rating,"review-text":i.reviewText}})})),1):e._e(),e._v(" "),t("div",{staticClass:"swiper-pagination"}),e._v(" "),t("div",{staticClass:"swiper-button-prev"}),e._v(" "),t("div",{staticClass:"swiper-button-next"})])])])}),[],!1,(function(e){this.$style=l.default.locals||l.default}),null,null);t.default=p.exports;installComponents(p,{VLabel:i(354).default,VTitle:i(355).default,ReviewCard:i(376).default})},400:function(e,t,i){"use strict";i.r(t);var a=i(0),s=i(356),r=Object(a.b)({name:"ContactPage",components:{VInfo:s.default},props:{device:{type:Object,required:!0}},data:function(){return{refContact:void 0}},mounted:function(){this.$refs.contact&&this.$nuxt.$emit("addRef",{element:this.$refs.contact,eventName:"contact"})}}),n=i(394),c=i(13);var o=Object(c.a)(r,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("section",{ref:"contact",class:["container",e.$style.contactWrap]},[t("VInfo",{class:e.$style.info,attrs:{label:"контакты",title:"Вы можете <span>связаться</span> со мной",description:"Давайте сделаем что-то новое, отличное и более значимое или сделаем что-то более наглядным или концептуальным.","button-name":"написать на электронную почту","is-mail":""}})],1)}),[],!1,(function(e){this.$style=n.default.locals||n.default}),null,null);t.default=o.exports;installComponents(o,{VInfo:i(356).default})},402:function(e,t,i){"use strict";var a=i(383),s=i.n(a);i.d(t,"default",(function(){return s.a}))},412:function(e,t,i){"use strict";i.r(t);var a=i(0),s=i(395),r=i(396),n=i(397),c=i(398),o=i(399),l=i(410),d=i(400),p=i(129),u=1,m=Object(a.b)({name:"MainPage",components:{AboutMe:s.default,Results:r.default,Dot:p.default,Skills:n.default,Certificates:c.default,Reviews:o.default,Portfolio:l.default,Contact:d.default},props:{device:{type:Object,required:!0}},data:function(){return{dots:[{id:"x".concat(u++),size:"medium",color:"blue",position:{top:"1.6",left:"12.6"}},{id:"x".concat(u++),size:"medium",color:"green",position:{top:"1.7",left:"47"}}]}}}),f=i(402),v=i(13);var b=Object(v.a)(m,(function(){var e=this,t=e._self._c;e._self._setupProxy;return t("div",{class:e.$style.mainPage},[e._l(e.dots,(function(e){return t("Dot",{key:e.id,attrs:{color:e.color,size:e.size,position:e.position}})})),e._v(" "),t("AboutMe",{attrs:{device:e.device}}),e._v(" "),t("Results",{attrs:{device:e.device}}),e._v(" "),t("Skills",{attrs:{device:e.device}}),e._v(" "),t("Certificates",{attrs:{device:e.device}}),e._v(" "),t("Reviews",{attrs:{device:e.device}}),e._v(" "),t("Portfolio",{attrs:{device:e.device}}),e._v(" "),t("Contact",{attrs:{device:e.device}})],2)}),[],!1,(function(e){this.$style=f.default.locals||f.default}),null,null);t.default=b.exports;installComponents(b,{Dot:i(129).default})}}]);