webpackJsonp([1],{106:function(e,a){e.exports={sha224WithRSAEncryption:{sign:"rsa",hash:"sha224",id:"302d300d06096086480165030402040500041c"},"RSA-SHA224":{sign:"ecdsa/rsa",hash:"sha224",id:"302d300d06096086480165030402040500041c"},sha256WithRSAEncryption:{sign:"rsa",hash:"sha256",id:"3031300d060960864801650304020105000420"},"RSA-SHA256":{sign:"ecdsa/rsa",hash:"sha256",id:"3031300d060960864801650304020105000420"},sha384WithRSAEncryption:{sign:"rsa",hash:"sha384",id:"3041300d060960864801650304020205000430"},"RSA-SHA384":{sign:"ecdsa/rsa",hash:"sha384",id:"3041300d060960864801650304020205000430"},sha512WithRSAEncryption:{sign:"rsa",hash:"sha512",id:"3051300d060960864801650304020305000440"},"RSA-SHA512":{sign:"ecdsa/rsa",hash:"sha512",id:"3051300d060960864801650304020305000440"},"RSA-SHA1":{sign:"rsa",hash:"sha1",id:"3021300906052b0e03021a05000414"},"ecdsa-with-SHA1":{sign:"ecdsa",hash:"sha1",id:""},sha256:{sign:"ecdsa",hash:"sha256",id:""},sha224:{sign:"ecdsa",hash:"sha224",id:""},sha384:{sign:"ecdsa",hash:"sha384",id:""},sha512:{sign:"ecdsa",hash:"sha512",id:""},"DSA-SHA":{sign:"dsa",hash:"sha1",id:""},"DSA-SHA1":{sign:"dsa",hash:"sha1",id:""},DSA:{sign:"dsa",hash:"sha1",id:""},"DSA-WITH-SHA224":{sign:"dsa",hash:"sha224",id:""},"DSA-SHA224":{sign:"dsa",hash:"sha224",id:""},"DSA-WITH-SHA256":{sign:"dsa",hash:"sha256",id:""},"DSA-SHA256":{sign:"dsa",hash:"sha256",id:""},"DSA-WITH-SHA384":{sign:"dsa",hash:"sha384",id:""},"DSA-SHA384":{sign:"dsa",hash:"sha384",id:""},"DSA-WITH-SHA512":{sign:"dsa",hash:"sha512",id:""},"DSA-SHA512":{sign:"dsa",hash:"sha512",id:""},"DSA-RIPEMD160":{sign:"dsa",hash:"rmd160",id:""},ripemd160WithRSA:{sign:"rsa",hash:"rmd160",id:"3021300906052b2403020105000414"},"RSA-RIPEMD160":{sign:"rsa",hash:"rmd160",id:"3021300906052b2403020105000414"},md5WithRSAEncryption:{sign:"rsa",hash:"md5",id:"3020300c06082a864886f70d020505000410"},"RSA-MD5":{sign:"rsa",hash:"md5",id:"3020300c06082a864886f70d020505000410"}}},113:function(e,a){e.exports={"aes-128-ecb":{cipher:"AES",key:128,iv:0,mode:"ECB",type:"block"},"aes-192-ecb":{cipher:"AES",key:192,iv:0,mode:"ECB",type:"block"},"aes-256-ecb":{cipher:"AES",key:256,iv:0,mode:"ECB",type:"block"},"aes-128-cbc":{cipher:"AES",key:128,iv:16,mode:"CBC",type:"block"},"aes-192-cbc":{cipher:"AES",key:192,iv:16,mode:"CBC",type:"block"},"aes-256-cbc":{cipher:"AES",key:256,iv:16,mode:"CBC",type:"block"},aes128:{cipher:"AES",key:128,iv:16,mode:"CBC",type:"block"},aes192:{cipher:"AES",key:192,iv:16,mode:"CBC",type:"block"},aes256:{cipher:"AES",key:256,iv:16,mode:"CBC",type:"block"},"aes-128-cfb":{cipher:"AES",key:128,iv:16,mode:"CFB",type:"stream"},"aes-192-cfb":{cipher:"AES",key:192,iv:16,mode:"CFB",type:"stream"},"aes-256-cfb":{cipher:"AES",key:256,iv:16,mode:"CFB",type:"stream"},"aes-128-cfb8":{cipher:"AES",key:128,iv:16,mode:"CFB8",type:"stream"},"aes-192-cfb8":{cipher:"AES",key:192,iv:16,mode:"CFB8",type:"stream"},"aes-256-cfb8":{cipher:"AES",key:256,iv:16,mode:"CFB8",type:"stream"},"aes-128-cfb1":{cipher:"AES",key:128,iv:16,mode:"CFB1",type:"stream"},"aes-192-cfb1":{cipher:"AES",key:192,iv:16,mode:"CFB1",type:"stream"},"aes-256-cfb1":{cipher:"AES",key:256,iv:16,mode:"CFB1",type:"stream"},"aes-128-ofb":{cipher:"AES",key:128,iv:16,mode:"OFB",type:"stream"},"aes-192-ofb":{cipher:"AES",key:192,iv:16,mode:"OFB",type:"stream"},"aes-256-ofb":{cipher:"AES",key:256,iv:16,mode:"OFB",type:"stream"},"aes-128-ctr":{cipher:"AES",key:128,iv:16,mode:"CTR",type:"stream"},"aes-192-ctr":{cipher:"AES",key:192,iv:16,mode:"CTR",type:"stream"},"aes-256-ctr":{cipher:"AES",key:256,iv:16,mode:"CTR",type:"stream"},"aes-128-gcm":{cipher:"AES",key:128,iv:12,mode:"GCM",type:"auth"},"aes-192-gcm":{cipher:"AES",key:192,iv:12,mode:"GCM",type:"auth"},"aes-256-gcm":{cipher:"AES",key:256,iv:12,mode:"GCM",type:"auth"}}},127:function(e,a){e.exports={"1.3.132.0.10":"secp256k1","1.3.132.0.33":"p224","1.2.840.10045.3.1.1":"p192","1.2.840.10045.3.1.7":"p256","1.3.132.0.34":"p384","1.3.132.0.35":"p521"}},136:function(e,a,t){"use strict";function c(e){t(340)}var i=t(137),n=t(347),s=t(5),d=c,r=s(i.a,n.a,!1,d,"data-v-1b7c8c12",null);a.a=r.exports},137:function(e,a,t){"use strict";var c=t(23),i=t.n(c),n=t(94),s=t.n(n),d=t(14),r=t(20),f=t(138);console.log;a.a={methods:{displayDetails:function(e){this.$router.push({name:"detail",params:{id:e}})},logOutUser:function(){var e=this,a=this.jwt,t=s.a.decode(a).id,c={};a&&(c.Authorization="JWT "+a);var i=r.a.server+"/lgo/"+t;this.$log.info(" +++ LOG OUT USER '"+t+"' AT '"+i+"' +++ "),fetch(""+i,{headers:c}).then(function(a){e.status=a.statusText,a.text().then(function(a){e.response=a})})},purge:function(){var e=this,a=this.jwt,t=r.a.server+"/purge";this.$log.info("  +++ PURGE USERS AT '"+t+"' +++ ");var c={};a&&(c.Authorization="JWT "+a),fetch(""+t,{headers:c}).then(function(a){e.status=a.statusText,a.text().then(function(a){e.response=a})})}},data:function(){return{pictures:f.a.pictures,status:"",response:""}},computed:i()({},Object(d.c)({jwt:"axsToken"}))}},138:function(e,a,t){"use strict";a.a={pictures:[{id:0,url:"https://i.kinja-img.com/gawker-media/image/upload/s--Fe5WsRl7--/c_fit,fl_progressive,q_80,w_320/18k2qthnfp8znjpg.jpg",comment:"A cat game",info:"Posted by Kevin on Friday"},{id:1,url:"https://s.blogcdn.com/news.travel.aol.com/media/2010/10/wittelsbach-diamond-320lvg102910.jpg",comment:"Tatoo & cat",info:"Posted by Charles on Tuesday"},{id:2,url:"https://www.jordanjewellery.com/wp-content/uploads/2017/07/elegant-flower-diamond-rings-large-blooming-beauty-flower-engagement-ring-laying-down-video-gdkdsds-11.jpg",comment:"Santa cat",info:"Posted by Richard on Monday"}]}},139:function(e,a,t){"use strict";var c=console.log;a.a={name:"Splash",created:function(){c("********* Splash View ********"),c(this.$route.query);var e=this.$route.query;window.ls.tkn=e.tkn,e.tkn&&delete e.tkn,c(this.$route.query),c("********* Exiting Splash View ********"),this.$router.push({name:"home",query:e})}}},140:function(e,a,t){"use strict";var c=t(138);a.a={data:function(){return{pictures:c.a.pictures}}}},141:function(e,a,t){"use strict";var c=t(142),i=t(144);a.a={components:{AA:c.a,BB:i.a}}},142:function(e,a,t){"use strict";function c(e){t(358)}var i=t(143),n=t(359),s=t(5),d=c,r=s(i.a,n.a,!1,d,"data-v-3d9bd8ec",null);a.a=r.exports},143:function(e,a,t){"use strict";a.a={name:"A",data:function(){return{old_counter:0}},computed:{counter:function(){return this.$store.state.counter}}}},144:function(e,a,t){"use strict";function c(e){t(360)}var i=t(145),n=t(361),s=t(5),d=c,r=s(i.a,n.a,!1,d,"data-v-4de4ef1d",null);a.a=r.exports},145:function(e,a,t){"use strict";var c=t(23),i=t.n(c),n=t(14),s=t(20);a.a={name:"B",data:function(){return{old_counter:0,axStkn:"unused"}},created:function(){this.axStkn=window.ls.get(s.a.tokenName,0);var e=this;window.ls.on(s.a.tokenName,function(a){window.lgr.warn("New token value in local store :: "+a),e.keepTkn(a)})},computed:i()({},Object(n.c)({counter:"theCounter",token:"axsToken"})),methods:i()({},Object(n.b)(["increment","decrement","keepTkn"]))}},146:function(e,a,t){"use strict";var c=t(365);a.a={components:{accessControl:c.a}}},147:function(e,a,t){"use strict";var c=t(23),i=t.n(c),n=t(14),s=t(20),d={name:"auth",data:function(){return{tkn:null,axStkn:"unused",isActive:"unused"}},created:function(){var e=this;window.ls.on(s.a.activityName,function(a){window.lgr.warn("Auth.vue :: Activity updated :: "+a),e.setActivity(a)}),window.ls.on(s.a.authName,function(a){window.lgr.warn("Auth.vue :: Auth updated :: "+a),e.setAuth(a)}),this.axStkn=window.ls.get(s.a.tokenName,0),window.ls.on(s.a.tokenName,function(a){window.lgr.warn("Auth.vue :: New token value in local store :: "+a),e.keepTkn(a)}),window.lgr.info("Auth.vue :: created")},computed:i()({},Object(n.c)({jwt:"axsToken",isHere:"isActive",isKnown:"isAuthenticated",user:"nameUser"})),methods:i()({},Object(n.b)(["keepTkn","logIn","logOut","setActivity","setAuth"]))};a.a=d},148:function(e,a,t){"use strict";var c=t(23),i=t.n(c),n=t(14),s=t(149);a.a={components:{"blog-article":s.a},computed:i()({},Object(n.c)("articles",{articleById:"byId"}),Object(n.d)(["route"]),{currentArticle:function(){return this.articleById(this.route.params.id)}}),methods:i()({},Object(n.b)("articles",{fetchArticle:"fetchSingle"}),{fetchData:function(){return this.fetchArticle({id:this.route.params.id})}}),watch:{$route:"fetchData"},created:function(){this.fetchData()}}},149:function(e,a,t){"use strict";var c=t(150),i=t(372),n=t(5),s=n(c.a,i.a,!1,null,null,null);a.a=s.exports},150:function(e,a,t){"use strict";var c=t(23),i=t.n(c),n=t(14),s=t(151),d=t.n(s),r=new d.a;a.a={props:{article:{type:Object,required:!0}},methods:i()({},Object(n.b)("articles",["update","replace","destroy"]),{onEdit:function(){this.update({id:this.article.id,data:{title:r.generateSentence(),content:r.generateParagraph()}})},onReplace:function(){this.replace({id:this.article.id,data:{title:r.generateSentence(),content:r.generateParagraph()}})},onDelete:function(){this.destroy({id:this.article.id})}})}},152:function(e,a,t){"use strict";var c=t(23),i=t.n(c),n=t(14),s=t(151),d=t.n(s),r=t(149),f=new d.a;a.a={name:"Blog",components:{"blog-article":r.a},computed:i()({},Object(n.c)("articles",{articles:"list"})),methods:i()({onFetchArticles:function(){this.fetchArticles()},onCreateArticle:function(){this.createArticle({data:{title:f.generateSentence(),content:f.generateParagraph()}})}},Object(n.b)("articles",{fetchArticles:"fetchList",createArticle:"create"}))}},153:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var c=t(34),i=t(155),n=t(156),s=t.n(n),d=t(157),r=t.n(d),f=t(159),o=(t.n(f),t(160)),l=t.n(o),u=t(161),b=(t.n(u),t(163)),h=t(72),m=t(333),p=t(20),g=t(136),v=t(348),w=console.log;c.default.use(r.a,p.a.logger),c.default.use(i.a),c.default.use(s.a,{namespace:"vuesppwa-"}),c.default.use(l.a),c.default.config.productionTip=p.a.productionTip,c.default.component("home",g.a);var k=m.a,_=navigator.languages[0]||"en",y=new i.a({locale:_.split("-")[0]||"en",fallbackLocale:"en",messages:k});Object(f.sync)(h.a,v.a);var A=new c.default({el:"#app",i18n:y,router:v.a,store:h.a,created:function(){w("********* Create main ********"),window.lgr=this.$log,window.ls=this.$ls,this.$log.info("microservice = "+p.a.server),w(this.$route.query);var e=this.$route.query;this.$route.query.tkn?(this.$store.dispatch("keepTkn",e.tkn),delete e.tkn,w(e)):this.$store.dispatch("logOut"),w("********* Exiting Create main ********")},render:function(e){return e(b.a)}});a.default=A},161:function(e,a){},163:function(e,a,t){"use strict";function c(e){t(164)}var i=t(71),n=t(165),s=t(5),d=c,r=s(i.a,n.a,!1,d,null,null);a.a=r.exports},164:function(e,a){},165:function(e,a,t){"use strict";var c=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"mdl-layout mdl-js-layout mdl-layout--fixed-header",attrs:{id:"app"}},[t("router-view",{attrs:{name:"hdr"}}),e._v(" "),t("main",{staticClass:"mdl-layout__content"},[t("div",{staticClass:"page-content"},[t("router-view")],1)])],1)},i=[],n={render:c,staticRenderFns:i};a.a=n},166:function(e,a,t){"use strict";var c=t(167),i=t.n(c),n=t(199),s=t.n(n),d=t(72),r=t(20),f=console.log;n.client.interceptors.request.use(function(e){var a=e,t=window.ls.get(r.a.tokenName);return null!=t&&(a.headers.Authorization="JWT "+t),a},function(e){return f("request failed"),i.a.reject(e)});a.a=s()({resource:"articles",idAttribute:"id",urlRoot:r.a.server+"/api/articles",client:n.client,onFetchListError:function(){d.a.dispatch("logIn")},onFetchSingleError:function(){d.a.dispatch("logIn")},onCreateError:function(){d.a.dispatch("logIn")},onUpdateError:function(){d.a.dispatch("logIn")},onReplaceError:function(){d.a.dispatch("logIn")},onDestroyError:function(){d.a.dispatch("logIn")}})},20:function(e,a,t){"use strict";a.a={server:"https://wt-a0a68818c7b34a465e865e888dc419c9-0.run.webtask.io/webtasksso",authPath:"/authentication/google/start",tokenTimeToLive:2e4,tokenName:"tkn",activityName:"actv",authName:"authd",localStorageNameSpace:"vuesppwa-",productionTip:!1,testAuthUrlEnvVar:"AUTH_TEST_URL",logger:{logLevel:"info",stringifyArguments:!0,showLogLevel:!0,showMethodName:!0,separator:"|",showConsoleColors:!0}}},224:function(e,a,t){"use strict";var c=t(94),i=t.n(c),n=t(20),s=console.log,d={accessToken:"no token",active:0,authenticated:0,nameUser:""},r={axsToken:function(e){return e.accessToken},isActive:function(e){return e.active},isAuthenticated:function(e){return e.authenticated},nameUser:function(e){return e.nameUser}},f={saveToken:function(e,a){window.lgr.info("Auth(mutation) :: Saving token"),window.ls.set(n.a.tokenName,a),e.accessToken=a,e.nameUser=i.a.decode(a).name,window.ls.set(n.a.authName,1),e.authenticated=1,window.ls.set(n.a.activityName,1),e.active=1},toSignedOut:function(e){window.lgr.warn("Auth(mutation) :: Requesting to sign out here"),window.ls.set(n.a.tokenName,null),e.accessToken=""},activity:function(e,a){window.lgr.warn("Auth(mutation) :: Changing activity state"),e.active=a,window.ls.set(n.a.activityName,a)},auth:function(e,a){window.lgr.warn("Auth(mutation) :: Changing authentication state"),e.authenticated=a,window.ls.set(n.a.authName,a)}},o={keepTkn:function(e,a){(0,e.commit)("saveToken",a),s("Router Auth actions keepTkn")},logIn:function(e){var a=(e.commit,e.dispatch);a("setActivity",1),a("authenticate")},authenticate:function(e){var a=(e.commit,e.dispatch,"");window.lgr.info("Auth(action) :: Authenticating... STATIC_PUB"),a=""+n.a.server+n.a.authPath+"?mode=STATIC_PUB";var t=Object({NODE_ENV:"production",STATIC_MODE:"STATIC_PUB"})[n.a.testAuthUrlEnvVar];window.lgr.info("Auth(action) :: Faked authentication URL :: "+t),t&&(a=t),window.location.assign(a)},logOut:function(e){var a=e.commit,t=e.dispatch;t("setActivity",0),t("setAuth",0),a("toSignedOut")},setActivity:function(e,a){(0,e.commit)("activity",a)},setAuth:function(e,a){(0,e.commit)("auth",a)}};a.a={state:d,getters:r,mutations:f,actions:o}},230:function(e,a){},232:function(e,a){},273:function(e,a){},274:function(e,a){},275:function(e,a){e.exports={modp1:{gen:"02",prime:"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"},modp2:{gen:"02",prime:"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"},modp5:{gen:"02",prime:"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"},modp14:{gen:"02",prime:"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"},modp15:{gen:"02",prime:"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"},modp16:{gen:"02",prime:"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"},modp17:{gen:"02",prime:"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"},modp18:{gen:"02",prime:"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"}}},279:function(e,a){e.exports={_args:[[{raw:"elliptic@^6.0.0",scope:null,escapedName:"elliptic",name:"elliptic",rawSpec:"^6.0.0",spec:">=6.0.0 <7.0.0",type:"range"},"/home/you/projects/vuesppwa_buggyPWA/node_modules/browserify-sign"]],_from:"elliptic@>=6.0.0 <7.0.0",_id:"elliptic@6.4.0",_inCache:!0,_location:"/elliptic",_nodeVersion:"7.0.0",_npmOperationalInternal:{host:"packages-18-east.internal.npmjs.com",tmp:"tmp/elliptic-6.4.0.tgz_1487798866428_0.30510620190761983"},_npmUser:{name:"indutny",email:"fedor@indutny.com"},_npmVersion:"3.10.8",_phantomChildren:{},_requested:{raw:"elliptic@^6.0.0",scope:null,escapedName:"elliptic",name:"elliptic",rawSpec:"^6.0.0",spec:">=6.0.0 <7.0.0",type:"range"},_requiredBy:["/browserify-sign","/create-ecdh"],_resolved:"https://registry.npmjs.org/elliptic/-/elliptic-6.4.0.tgz",_shasum:"cac9af8762c85836187003c8dfe193e5e2eae5df",_shrinkwrap:null,_spec:"elliptic@^6.0.0",_where:"/home/you/projects/vuesppwa_buggyPWA/node_modules/browserify-sign",author:{name:"Fedor Indutny",email:"fedor@indutny.com"},bugs:{url:"https://github.com/indutny/elliptic/issues"},dependencies:{"bn.js":"^4.4.0",brorand:"^1.0.1","hash.js":"^1.0.0","hmac-drbg":"^1.0.0",inherits:"^2.0.1","minimalistic-assert":"^1.0.0","minimalistic-crypto-utils":"^1.0.0"},description:"EC cryptography",devDependencies:{brfs:"^1.4.3",coveralls:"^2.11.3",grunt:"^0.4.5","grunt-browserify":"^5.0.0","grunt-cli":"^1.2.0","grunt-contrib-connect":"^1.0.0","grunt-contrib-copy":"^1.0.0","grunt-contrib-uglify":"^1.0.1","grunt-mocha-istanbul":"^3.0.1","grunt-saucelabs":"^8.6.2",istanbul:"^0.4.2",jscs:"^2.9.0",jshint:"^2.6.0",mocha:"^2.1.0"},directories:{},dist:{shasum:"cac9af8762c85836187003c8dfe193e5e2eae5df",tarball:"https://registry.npmjs.org/elliptic/-/elliptic-6.4.0.tgz"},files:["lib"],gitHead:"6b0d2b76caae91471649c8e21f0b1d3ba0f96090",homepage:"https://github.com/indutny/elliptic",keywords:["EC","Elliptic","curve","Cryptography"],license:"MIT",main:"lib/elliptic.js",maintainers:[{name:"indutny",email:"fedor@indutny.com"}],name:"elliptic",optionalDependencies:{},readme:"ERROR: No README data found!",repository:{type:"git",url:"git+ssh://git@github.com/indutny/elliptic.git"},scripts:{jscs:"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",jshint:"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",lint:"npm run jscs && npm run jshint",test:"npm run lint && npm run unit",unit:"istanbul test _mocha --reporter=spec test/index.js",version:"grunt dist && git add dist/"},version:"6.4.0"}},312:function(e,a){e.exports={"2.16.840.1.101.3.4.1.1":"aes-128-ecb","2.16.840.1.101.3.4.1.2":"aes-128-cbc","2.16.840.1.101.3.4.1.3":"aes-128-ofb","2.16.840.1.101.3.4.1.4":"aes-128-cfb","2.16.840.1.101.3.4.1.21":"aes-192-ecb","2.16.840.1.101.3.4.1.22":"aes-192-cbc","2.16.840.1.101.3.4.1.23":"aes-192-ofb","2.16.840.1.101.3.4.1.24":"aes-192-cfb","2.16.840.1.101.3.4.1.41":"aes-256-ecb","2.16.840.1.101.3.4.1.42":"aes-256-cbc","2.16.840.1.101.3.4.1.43":"aes-256-ofb","2.16.840.1.101.3.4.1.44":"aes-256-cfb"}},333:function(e,a,t){"use strict";var c=t(334),i=t(337),n=[c.a,i.a],s={};n.forEach(function(e){e.sub.forEach(function(e){s[e.id]=e}),s[e.id]=e}),a.a=s},334:function(e,a,t){"use strict";var c=t(335),i=t(336);a.a={id:"es",sub:[i.a,c.a],message:{hello:"Saludos amigos!!!"},label:{signup:"Inscribirse",signin:"Ingresar",signout:"Salir"}}},335:function(e,a,t){"use strict";a.a={id:"es-AR",message:{hello:"Che!"}}},336:function(e,a,t){"use strict";a.a={id:"es-419",message:{hello:"Hola!"}}},337:function(e,a,t){"use strict";var c=t(338),i=t(339);a.a={id:"en",sub:[i.a,c.a],message:{hello:"Hello!!!",damned:"Thrown to the wolves"},label:{signup:"Join",signin:"Log in",signout:"Log out"}}},338:function(e,a,t){"use strict";a.a={id:"en-GB",message:{hello:"Watcha!"}}},339:function(e,a,t){"use strict";a.a={id:"en-US",message:{hello:"Howdy",damned:"Thrown under a bus"}}},340:function(e,a){},347:function(e,a,t){"use strict";var c=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("div",{staticClass:"mdl-grid"},[t("div",{staticClass:"mdl-cell mdl-cell--3-col mdl-cell mdl-cell--1-col-tablet mdl-cell--hide-phone"}),e._v(" "),t("div",{staticClass:"mdl-cell mdl-cell--6-col mdl-cell--4-col-phone"},[t("a",{staticClass:"button",attrs:{"data-cyp":"logOutUser"},on:{click:e.logOutUser}},[e._v("logOutUser")]),e._v(" "),t("a",{staticClass:"button",attrs:{"data-cyp":"purge"},on:{click:e.purge}},[e._v("Purge")]),e._v(" "),t("div",{attrs:{"data-cyp":"status"}},[e._v(e._s(e.status))]),e._v(" "),t("div",[e._v(e._s(e.response))]),e._v(" "),e._l(this.pictures,function(a){return t("div",{staticClass:"image-card",on:{click:function(t){e.displayDetails(a.id)}}},[t("div",{staticClass:"image-card__picture"},[t("img",{attrs:{src:a.url}})])])}),e._v(" "),t("router-link",{staticClass:"mdl-button mdl-js-button mdl-button--fab mdl-button--colored",attrs:{to:"/blog"}},[t("i",{staticClass:"material-icons"},[e._v("blog")])])],2)]),e._v(" "),t("router-link",{staticClass:"add-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored",attrs:{to:"/post"}},[t("i",{staticClass:"material-icons"},[e._v("add")])])],1)},i=[],n={render:c,staticRenderFns:i};a.a=n},348:function(e,a,t){"use strict";var c=t(34),i=t(349),n=t(350),s=t(136),d=t(353),r=t(356),f=t(142),o=t(144),l=t(363),u=t(369);c.default.use(i.a);var b=(console.log,new i.a({routes:[{path:"/blog",name:"blog",components:{default:u.b,hdr:l.a}},{path:"/articles/:id",name:"article",components:{default:u.a,hdr:l.a}},{path:"",name:"home",components:{default:s.a,hdr:l.a}},{path:"/",name:"root",components:{default:s.a,hdr:l.a}},{path:"xxx",name:"splash",component:n.a},{path:"/detail/:id",name:"detail",components:{default:d.a,hdr:l.a}},{path:"/post",name:"post",components:{default:r.a,hdr:l.a}},{path:"/dc",name:"DA",components:{default:f.a,hdr:l.a}},{path:"/db",name:"DB",components:{default:o.a,hdr:l.a}}]}));a.a=b},350:function(e,a,t){"use strict";function c(e){t(351)}var i=t(139),n=t(352),s=t(5),d=c,r=s(i.a,n.a,!1,d,"data-v-2fbc440e",null);a.a=r.exports},351:function(e,a){},352:function(e,a,t){"use strict";var c=function(){var e=this,a=e.$createElement;return(e._self._c||a)("div",[e._v("\n  i r i d i u m   b l u e\n")])},i=[],n={render:c,staticRenderFns:i};a.a=n},353:function(e,a,t){"use strict";function c(e){t(354)}var i=t(140),n=t(355),s=t(5),d=c,r=s(i.a,n.a,!1,d,"data-v-a3fb692a",null);a.a=r.exports},354:function(e,a){},355:function(e,a,t){"use strict";var c=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"mdl-grid"},[t("div",{staticClass:"mdl-cell mdl-cell--8-col"},[t("router-link",{staticClass:"mdl-button mdl-js-button mdl-button--raised mdl-button--colored",attrs:{to:"/"}},[e._v("\n        Main Page\n      ")]),e._v(" "),t("div",{staticClass:"picture"},[t("img",{attrs:{src:this.pictures[e.$route.params.id].url}})]),e._v(" "),t("div",{staticClass:"info"},[t("span",[e._v(e._s(this.pictures[e.$route.params.id].info))])])],1),e._v(" "),t("div",{staticClass:"mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet"},[t("div",{staticClass:"comment"},[t("span",[e._v(e._s(this.pictures[e.$route.params.id].comment))])]),e._v(" "),t("div",{staticClass:"actions"},[t("router-link",{staticClass:"mdl-button mdl-js-button mdl-button--raised mdl-button--colored",attrs:{to:"/post"}},[e._v("\n        ANSWER\n      ")])],1)])])},i=[],n={render:c,staticRenderFns:i};a.a=n},356:function(e,a,t){"use strict";function c(e){t(357)}var i=t(141),n=t(362),s=t(5),d=c,r=s(i.a,n.a,!1,d,"data-v-d6c623e0",null);a.a=r.exports},357:function(e,a){},358:function(e,a){},359:function(e,a,t){"use strict";var c=function(){var e=this,a=e.$createElement;return(e._self._c||a)("div",[e._v("\n  Dumb #A --\x3e "+e._s(e.counter)+"\n")])},i=[],n={render:c,staticRenderFns:i};a.a=n},360:function(e,a){},361:function(e,a,t){"use strict";var c=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("button",{attrs:{type:"button"},on:{click:e.increment}},[e._v("Increment")]),e._v(" "),t("button",{attrs:{type:"button"},on:{click:e.decrement}},[e._v("Decrement")]),e._v(" "),t("div",[e._v(" Dumb #B -- count "+e._s(e.counter.other))]),e._v(" "),t("div",[e._v(" Token "+e._s(e.token))])])},i=[],n={render:c,staticRenderFns:i};a.a=n},362:function(e,a,t){"use strict";var c=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"waiting"},[e._v("\n  Not yet available\n  "),t("AA"),e._v(" "),t("BB")],1)},i=[],n={render:c,staticRenderFns:i};a.a=n},363:function(e,a,t){"use strict";function c(e){t(364)}var i=t(146),n=t(368),s=t(5),d=c,r=s(i.a,n.a,!1,d,"data-v-6cd0bdd7",null);a.a=r.exports},364:function(e,a){},365:function(e,a,t){"use strict";function c(e){t(366)}var i=t(147),n=t(367),s=t(5),d=c,r=s(i.a,n.a,!1,d,null,null);a.a=r.exports},366:function(e,a){},367:function(e,a,t){"use strict";var c=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("div",[e._v(" Token signature :: '"+e._s(e.jwt.split(".")[2])+"'")]),e._v(" "),e.isKnown&&e.isHere?t("div",[t("a",{staticClass:"button",attrs:{"data-cyp":"logOut"},on:{click:e.logOut}},[e._m(0),e._v(" "),t("span",[e._v(e._s(e.$t("label.signout"))+", "+e._s(e.user))])])]):t("div",[e._v("\n     \n    "),t("a",{staticClass:"button",attrs:{"data-cyp":"logIn"},on:{click:e.logIn}},[e._m(1),e._v(" "),t("span",[e._v(e._s(e.$t("label.signin")))])])]),e._v(" "),t("div",{attrs:{"data-cyp":"activity"}},[e._v(" Activity "+e._s(e.isHere)+" ")]),e._v(" "),t("div",[e._v(" Authenticated "+e._s(e.isKnown)+" ")])])},i=[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fas fa-sign-out-alt"})])},function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("span",{staticClass:"icon"},[t("i",{staticClass:"fas fa-sign-in-alt"})])}],n={render:c,staticRenderFns:i};a.a=n},368:function(e,a,t){"use strict";var c=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("nav",{staticClass:"level"},[t("div",{staticClass:"level-left"},[t("router-link",{attrs:{to:"/"}},[t("div",{staticClass:"level-item"},[t("img",{attrs:{src:"static/img/WaterDrop_50.png",alt:"Iridium Blue Logo"}}),e._v(" "),t("span",{staticStyle:{"font-family":"'Advent Pro'","font-size":"48px"},attrs:{"data-cyp":"appTitle"}},[e._v("iridium blue")])])])],1),e._v(" "),t("div",{staticClass:"level-right"},[t("div",{staticClass:"level-item"},[e._v("\n      V0.0.1d\n    ")]),e._v(" "),t("div",{staticClass:"level-item"},[t("accessControl")],1)])])},i=[],n={render:c,staticRenderFns:i};a.a=n},369:function(e,a,t){"use strict";var c=t(370);t.d(a,"a",function(){return c.a});var i=t(374);t.d(a,"b",function(){return i.a})},370:function(e,a,t){"use strict";var c=t(148),i=t(373),n=t(5),s=n(c.a,i.a,!1,null,null,null);a.a=s.exports},371:function(e,a){e.exports=["A","Aasgem","Abfieseln","Almrausch","An","Au","Auf","Auffisteign","Baamwach","Back","Bavariae","Bayer","Beidl","Berg","Bia","Biagadn","Biakriagal","Biaschlegl","Biawambn","Biazelt","Bitt","Bladl","Blosmusi","Bradwurschtsemmal","Breihaus","Brezn","Broadwurschtbudn","Brodzeid","Brotzeit","Bua","Buachbinda","Buam","Bussal","Charivari","Damischa","Deandl","Deandlgwand","Des","Di","Diandldrahn","Do","Dog","Edlweiss","Engelgwand","Enzian","Ewig","Fensdaln","Fingahaggln","Foidweg","Freibia","Fünferl","Gams","Gamsbart","Gar","Gaudi","Gelbe","Giasinga","Gidarn","Gipfe","Gmiadlichkeit","Goaßmaß","God","Godds","Gott","Graudwiggal","Greaßt","Greichats","Griasd","Griasnoggalsubbm","Gscheckate","Gschicht","Gschmeidig","Gstanzl","Guglhupf","Gwiass","Habedehre","Haberertanz","Haferl","Hawadere","Heimatland","Heiwog","Hemad","Hendl","Hetschapfah","Hi","Hoam","Hob","Hoiwe","I","Im","In","Jodler","Kaiwe","Kimmt","Kini","Kirwa","Klampfn","Kneedl","Koa","Kuaschwanz","Landla","Ledahosn","Leit","Lem","Leonhardifahrt","Lewakaas","Luja","Ma","Maderln","Maibam","Mamalad","Marei","Marterl","Maß","Maßkruag","Mehra","Meidromml","Mim","Mongdratzal","Mordsgaudi","Musi","Namidog","Nia","Nimma","Nix","Oachkatzlschwoaf","Obandeln","Obandln","Obazda","Ohrwaschl","Oim","Prosd","Prosit","Radi","Radl","Radler","Ramasuri","Reiwadatschi","Resi","Rüam","Samma","Sauakraud","Sauwedda","Schaung","Schbozal","Schdarmbeaga","Schdeckalfisch","Schellnsau","Schichtl","Schmankal","Schmarn","Schnacksln","Schneid","Schorsch","Schuabladdla","Schwoanshaxn","See","Sei","Semmlkneedl","Sepp","Servas","Singan","So","Sodala","Sog","Sonn","Spezi","Spotzerl","Spuiratz","Steckerleis","Stubn","Suri","Sünd","Tag","Trachtnhuat","Umma","Vergeltsgott","Wanninger","Watschnbaam","Watschnpladdla","Wea","Weibaleid","Weiznglasl","Weißwiaschd","Wia","Wiesn","Woibbadinga","Wolpern","Wos","Wuascht","Wurscht","Wurschtsolod","Xaver","Zidern","Zwedschgndadschi","a","aa","aasgem","aba","abfieseln","acht'n","af","allerweil","am","amoi","an","anbandeln","aso","auf","auf'd","auf'n","auffi","ausgähd","auszutzeln","aweng","baamwach","back","baddscher","barfuaßat","basd","beim","beinand","biawambn","biazelt","bin","bissal","bitt","bittschön","bloß","blärrd","boarischer","bravs","brodzeid","brotzeit","bussal","charivari","d'","da","daad","dadst","dahoam","damischa","daugn","de","dea","deandlgwand","ded","dee","dei","denn","der","des","di","dijidiholleri","do","drei","dringma","du","eam","eana","ebba","eich","enzian","es","etza","ewig","fei","fensdaln","fescha","fias","foahn","freibia","fui","g'hupft","gamsbart","ganze","gar","gaudi","gean","geh","gehd","gehds","gelbe","gfoids","gfreit","ghupft","gibt's","glacht","glei","gmahde","goaßmaß","gor","graudwiggal","greana","greaßt","griagd","griasd","griaß","großherzig","gscheckate","gscheid","gscheit","gschicht","gschmeidig","gsprunga","gsuffa","guad","gwihss","gwiss","hab","haferl","hallelujah","ham","hawadere","hea","heid","heitzdog","helfgod","hemad","hera","hetschapfah","hi","hinter'm","hoam","hob","hod","hog","hogg","hoggd","hoid","huift","i","iabaroi","im","imma","in","is","ja","jedza","jo","kenna","kimmt","kloan","ko","koa","kost","kuaschwanz","kumm","kummd","kummt","landla","leck","ledahosn","legst","lem","liab","liabs","liberalitas","lossn","luja","lustiga","ma","maibam","marei","marterl","mas","maßkruag","measi","mechad","mehra","mei","meidromml","mi","midanand","midananda","middn","midnand","mim","moan","moand","mog","mogsd","muas","muass","naa","nacha","nachad","nackata","narrisch","ned","need","nei","nia","nieda","nimma","nimmds","nix","no","noch","nois","nomoi","o'ha","oa","oamoi","oans","oba","obacht","obandeln","obandln","ognudelt","oiwei","ollaweil","om","owe","ozapfa","pfenningguat","pfiad","pfundig","prosd","radi","radler","red","resch","sagrisch","samma","sammawiedaguad","san","sauakraud","sauba","sauwedda","schaugn","schdarmbeaga","scheans","schee","schnacksln","scho","schoo","schorsch","schuabladdla","schuf","schüds","sei","sepp","singan","singd","so","sodala","sog","soi","soweid","sowos","spernzaln","spezi","spotzerl","trihöleridi","um","umananda","umma","unbandig","und","uns","vasteh","vo","von","vui","waar","wann","wea","weibaleid","weida","wia","wiad","wiavui","wirds","wo","woar","woass","woaß","wolln","wolpern","wos","woschechta","wui","wuid","wujn","wurschtsolod","z'dringa","zamm","zua","zwoa","zünftig"]},372:function(e,a,t){"use strict";var c=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("article",{class:"article-"+e.article.id},[t("router-link",{attrs:{to:{name:"article",params:{id:e.article.id}}}},[t("h1",[e._v(e._s(e.article.title))])]),e._v(" "),t("p",[t("a",{staticClass:"edit-article",attrs:{href:"javascript:void(0);"},on:{click:e.onEdit}},[e._v("Edit (PATCH)")]),e._v("\n    |\n    "),t("a",{staticClass:"replace-article",attrs:{href:"javascript:void(0);"},on:{click:e.onReplace}},[e._v("Replace (PUT)")]),e._v("\n    |\n    "),t("a",{staticClass:"delete-article",attrs:{href:"javascript:void(0);"},on:{click:e.onDelete}},[e._v("Delete")])]),e._v(" "),t("p",{staticClass:"content"},[e._v(e._s(e.article.content))]),e._v(" "),t("hr")],1)},i=[],n={render:c,staticRenderFns:i};a.a=n},373:function(e,a,t){"use strict";var c=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("main",{attrs:{id:"article"}},[t("p",{staticClass:"back"},[t("router-link",{attrs:{to:{name:"blog"}}},[e._v("Back to Articles")])],1),e._v(" "),e.currentArticle?t("blog-article",{attrs:{article:e.currentArticle}}):e._e()],1)},i=[],n={render:c,staticRenderFns:i};a.a=n},374:function(e,a,t){"use strict";var c=t(152),i=t(375),n=t(5),s=n(c.a,i.a,!1,null,null,null);a.a=s.exports},375:function(e,a,t){"use strict";var c=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("main",[t("button",{staticClass:"fetch-articles",attrs:{"data-cyp":"fetch-articles"},on:{click:e.onFetchArticles}},[e._v("Fetch Articles")]),e._v(" "),t("button",{staticClass:"create-article",on:{click:e.onCreateArticle}},[e._v("Create New Article")]),e._v(" "),e.articles.length?t("div",{attrs:{id:"articles"}},e._l(e.articles,function(e){return t("blog-article",{key:e.id,attrs:{article:e}})})):e._e()])},i=[],n={render:c,staticRenderFns:i};a.a=n},71:function(e,a,t){"use strict";a.a={name:"app",data:function(){return{}}}},72:function(e,a,t){"use strict";t.d(a,"a",function(){return r});var c=t(14),i=t(34),n=t(166),s=t(224),d=console.log;i.default.use(c.a);var r=new c.a.Store({state:{counter:0},getters:{theCounter:function(e){return{cntr:e.counter,other:"okok"}}},mutations:{increment:function(e){window.lgr.warn("UU"),e.counter+=1},decrement:function(e){d("DD"),e.counter-=1}},actions:{increment:function(e){(0,e.commit)("increment")},decrement:function(e){(0,e.commit)("decrement")}},modules:{Auth:s.a,articles:n.a}})}},[153]);
//# sourceMappingURL=app.7b648ff0b2507ac61f60.js.map