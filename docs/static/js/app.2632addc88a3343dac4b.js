webpackJsonp([0],[,,,,function(t,e,n){"use strict";var a=n(25);console.log;e.a={name:"app",data:function(){return{who:"kkkk",what:"What!"}},components:{globalHeader:a.a}}},function(t,e,n){"use strict";var a=n(27);e.a={components:{accessControl:a.a}}},function(t,e,n){"use strict";var a=n(7);e.a={name:"auth",data:function(){return{tkn:"qqqq"}},methods:{getAccessToken:function(t,e){var n="tkn",s=t;if(void 0!==e){var i=e.get(n);if(s){e.set(n,s,a.a.tokenTimeToLive),window.lgr.info("URI query token saved to Local Storage '"+s+"'");var o=window.location.href.replace("?tkn="+s,"");location.assign(o),window.lgr.debug("Redirected to same URI without token.")}else i?(s=i,e.set(n,s,a.a.tokenTimeToLive),window.lgr.debug("Using token from local storage '"+s+"'.")):window.lgr.info("Neither stored nor new token found.")}else window.lgr.warn("No local storage to use.");return s},signOut:function(){var t=this.getAccessToken(this.tkn,this.$ls);window.lgr.debug("Signing out '"+t+"'.")},signUp:function(){var t=this.getAccessToken(this.tkn,this.$ls);window.lgr.debug("Signing up '"+t+"'.")},signIn:function(){var t=this.getAccessToken(this.tkn,this.$ls);window.lgr.debug("Signing in '"+t+"'.")}},computed:{authorized:function(){var t=this.getAccessToken(this.$route.query.tkn,this.$ls);return window.lgr.info("Auth.vue : "+(t?"":"NOT ")+"Authorized"),t}}}},function(t,e,n){"use strict";e.a={server:"https://wt-a0a68818c7b34a465e865e888dc419c9-0.run.webtask.io/webtasksso",tokenTimeToLive:2e4,productionTip:!1,logger:{logLevel:"debug",stringifyArguments:!0,showLogLevel:!0,showMethodName:!0,separator:"|",showConsoleColors:!0}}},function(t,e,n){"use strict";function a(t){n(34)}var s=n(9),i=n(35),o=n(0),c=a,l=o(s.a,i.a,!1,c,"data-v-f1589ec8",null);e.a=l.exports},function(t,e,n){"use strict";var a=n(10);console.log;e.a={methods:{displayDetails:function(t){this.$router.push({name:"detail",params:{id:t}})},testMethod:function(){this.$log.debug("  +++ DEEBUG +++",window.lgr)}},data:function(){return{pictures:a.a.pictures}}}},function(t,e,n){"use strict";e.a={pictures:[{id:0,url:"https://i.kinja-img.com/gawker-media/image/upload/s--Fe5WsRl7--/c_fit,fl_progressive,q_80,w_320/18k2qthnfp8znjpg.jpg",comment:"A cat game",info:"Posted by Kevin on Friday"},{id:1,url:"https://s.blogcdn.com/news.travel.aol.com/media/2010/10/wittelsbach-diamond-320lvg102910.jpg",comment:"Tatoo & cat",info:"Posted by Charles on Tuesday"},{id:2,url:"https://www.jordanjewellery.com/wp-content/uploads/2017/07/elegant-flower-diamond-rings-large-blooming-beauty-flower-engagement-ring-laying-down-video-gdkdsds-11.jpg",comment:"Santa cat",info:"Posted by Richard on Monday"}]}},function(t,e,n){"use strict";var a=n(10);e.a={data:function(){return{pictures:a.a.pictures}}}},function(t,e,n){"use strict";e.a={}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(3),s=n(16),i=n(17),o=n.n(i),c=n(18),l=n.n(c),r=n(20),u=n.n(r),d=n(21),m=(n.n(d),n(23)),v=n(32),f=n(42),g=n(7),p=n(8);(0,console.log)("microservice = "+g.a.server),a.a.use(l.a,g.a.logger),a.a.use(s.a),a.a.use(o.a,{namespace:"vuesppwa"}),a.a.use(u.a),a.a.config.productionTip=g.a.productionTip,a.a.component("home",p.a);var h=f.a,_=navigator.languages[0]||"en",w=new s.a({locale:_.split("-")[0]||"en",fallbackLocale:"en",messages:h}),b=new a.a({el:"#app",i18n:w,router:v.a,created:function(){window.lgr=this.$log},render:function(t){return t(m.a)}});e.default=b},,,,,,,,function(t,e){},,function(t,e,n){"use strict";function a(t){n(24)}var s=n(4),i=n(31),o=n(0),c=a,l=o(s.a,i.a,!1,c,null,null);e.a=l.exports},function(t,e){},function(t,e,n){"use strict";function a(t){n(26)}var s=n(5),i=n(30),o=n(0),c=a,l=o(s.a,i.a,!1,c,"data-v-19b95a27",null);e.a=l.exports},function(t,e){},function(t,e,n){"use strict";function a(t){n(28)}var s=n(6),i=n(29),o=n(0),c=a,l=o(s.a,i.a,!1,c,null,null);e.a=l.exports},function(t,e){},function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.authorized?n("div",[n("a",{staticClass:"button",on:{click:t.signOut}},[t._m(0),t._v(" "),n("span",[t._v(t._s(t.$t("label.signout")))])])]):n("div",[n("a",{staticClass:"button",on:{click:t.signUp}},[t._m(1),t._v(" "),n("span",[t._v(t._s(t.$t("label.signup")))])]),t._v("\n     \n    "),n("a",{staticClass:"button",on:{click:t.signIn}},[t._m(2),t._v(" "),n("span",[t._v(t._s(t.$t("label.signin")))])])])])},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"icon"},[n("i",{staticClass:"fas fa-sign-out-alt"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"icon"},[n("i",{staticClass:"fas fa-edit"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"icon"},[n("i",{staticClass:"fas fa-sign-in-alt"})])}],i={render:a,staticRenderFns:s};e.a=i},function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nav",{staticClass:"level"},[t._m(0),t._v(" "),n("div",{staticClass:"level-right"},[n("div",{staticClass:"level-item"},[n("accessControl")],1)])])},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"level-left"},[n("div",{staticClass:"level-item"},[n("img",{attrs:{src:"static/img/WaterDrop_50.png",alt:"Demo of a microservice SPA PWA"}}),t._v(" "),n("span",{staticStyle:{"font-family":"'Advent Pro'","font-size":"48px"}},[t._v("iridium blue")])])])}],i={render:a,staticRenderFns:s};e.a=i},function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mdl-layout mdl-js-layout mdl-layout--fixed-header",attrs:{id:"app"}},[n("globalHeader"),t._v(" "),n("main",{staticClass:"mdl-layout__content"},[n("div",{staticClass:"page-content"},[n("router-view")],1)])],1)},s=[],i={render:a,staticRenderFns:s};e.a=i},function(t,e,n){"use strict";var a=n(3),s=n(33),i=n(8),o=n(36),c=n(39);a.a.use(s.a),e.a=new s.a({routes:[{path:"",name:"home",component:i.a},{path:"/",name:"root",component:i.a},{path:"/detail/:id",name:"detail",component:o.a},{path:"/post",name:"post",component:c.a}]})},,function(t,e){},function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"mdl-grid"},[n("div",{staticClass:"mdl-cell mdl-cell--3-col mdl-cell mdl-cell--1-col-tablet mdl-cell--hide-phone"}),t._v(" "),n("div",{staticClass:"mdl-cell mdl-cell--6-col mdl-cell--4-col-phone"},[n("a",{staticClass:"button",on:{click:t.testMethod}},[t._v("Test method")]),t._v(" "),t._l(this.pictures,function(e){return n("div",{staticClass:"image-card",on:{click:function(n){t.displayDetails(e.id)}}},[n("div",{staticClass:"image-card__picture"},[n("img",{attrs:{src:e.url}})])])})],2)]),t._v(" "),n("router-link",{staticClass:"add-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored",attrs:{to:"/post"}},[n("i",{staticClass:"material-icons"},[t._v("add")])])],1)},s=[],i={render:a,staticRenderFns:s};e.a=i},function(t,e,n){"use strict";function a(t){n(37)}var s=n(11),i=n(38),o=n(0),c=a,l=o(s.a,i.a,!1,c,"data-v-a3fb692a",null);e.a=l.exports},function(t,e){},function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mdl-grid"},[n("div",{staticClass:"mdl-cell mdl-cell--8-col"},[n("router-link",{staticClass:"mdl-button mdl-js-button mdl-button--raised mdl-button--colored",attrs:{to:"/"}},[t._v("\n        Main Page\n      ")]),t._v(" "),n("div",{staticClass:"picture"},[n("img",{attrs:{src:this.pictures[t.$route.params.id].url}})]),t._v(" "),n("div",{staticClass:"info"},[n("span",[t._v(t._s(this.pictures[t.$route.params.id].info))])])],1),t._v(" "),n("div",{staticClass:"mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet"},[n("div",{staticClass:"comment"},[n("span",[t._v(t._s(this.pictures[t.$route.params.id].comment))])]),t._v(" "),n("div",{staticClass:"actions"},[n("router-link",{staticClass:"mdl-button mdl-js-button mdl-button--raised mdl-button--colored",attrs:{to:"/post"}},[t._v("\n        ANSWER\n      ")])],1)])])},s=[],i={render:a,staticRenderFns:s};e.a=i},function(t,e,n){"use strict";function a(t){n(40)}var s=n(12),i=n(41),o=n(0),c=a,l=o(s.a,i.a,!1,c,"data-v-a077e5f6",null);e.a=l.exports},function(t,e){},function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"waiting"},[t._v("\n  Not yet available\n")])},s=[],i={render:a,staticRenderFns:s};e.a=i},function(t,e,n){"use strict";var a=n(43),s=n(46),i=[a.a,s.a],o={};i.forEach(function(t){t.sub.forEach(function(t){o[t.id]=t}),o[t.id]=t}),e.a=o},function(t,e,n){"use strict";var a=n(44),s=n(45);e.a={id:"es",sub:[s.a,a.a],message:{hello:"Saludos amigos!!!"},label:{signup:"Inscribirse",signin:"Ingresar",signout:"Salir"}}},function(t,e,n){"use strict";e.a={id:"es-AR",message:{hello:"Che!"}}},function(t,e,n){"use strict";e.a={id:"es-419",message:{hello:"Hola!"}}},function(t,e,n){"use strict";var a=n(47),s=n(48);e.a={id:"en",sub:[s.a,a.a],message:{hello:"Hello!!!",damned:"Thrown to the wolves"},label:{signup:"Join",signin:"Log in",signout:"Log out"}}},function(t,e,n){"use strict";e.a={id:"en-GB",message:{hello:"Watcha!"}}},function(t,e,n){"use strict";e.a={id:"en-US",message:{hello:"Howdy",damned:"Thrown under a bus"}}}],[13]);
//# sourceMappingURL=app.2632addc88a3343dac4b.js.map