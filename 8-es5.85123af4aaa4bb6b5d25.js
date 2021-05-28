(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"9fSt":function(n,t){n.exports='<main id="main-content" role="main">\n  <div class="page-wrapper">\n    <div class="container-about">\n      <div class="full-text-block">\n        <h2>\n          {{ \'about-us.intro.block-1.header\' | translate }}\n        </h2>\n        <p>\n          {{ \'about-us.intro.block-1.text\' | translate }}\n        </p>\n        <button class="primary-global-button" (click)="navigateToHabit()">\n          {{ \'about-us.intro.block-1.button\' | translate }}\n        </button>\n      </div>\n      <img src="assets/img/Illustrationman.png" alt="Illustration man" />\n    </div>\n\n    <div class="vision">\n      <div class="container-vision">\n        <img src="assets/img/Vision.png" alt="vision" />\n        <div class="full-text-block">\n          <h2>\n            {{ \'about-us.intro.block-2.header\' | translate }}\n          </h2>\n          <p>\n            {{ \'about-us.intro.block-2.text\' | translate }}\n          </p>\n          <button class="primary-global-button" (click)="navigateToHabit()">\n            {{ \'about-us.intro.block-2.button\' | translate }}\n          </button>\n        </div>\n      </div>\n    </div>\n\n    <div class="steps-main-block">\n      <div class="dashed-line">\n        <div class="leaves"></div>\n      </div>\n      <div class="steps-wrapper">\n        <h2>\n          {{ \'about-us.steps.title\' | translate }}\n        </h2>\n        <div class="card-content card-store">\n          <img class="card-imgage" src="assets/img/illustration-store.png" alt="illustration store" />\n          <div>\n            <div>\n              <div class="card-title">\n                <div class="card-title-number"></div>\n                <h3 class="card-title-text">{{ \'about-us.steps.block-1.header\' | translate }}</h3>\n              </div>\n            </div>\n            <div class="card-info">\n              <span class="main-card-text">\n                {{ \'about-us.steps.block-1.text\' | translate }}\n              </span>\n              <a\n                class="card-link"\n                [routerLink]="[\'/places\']"\n                fragment="top-user-bar"\n                routerLinkActive="active-link"\n                [routerLinkActiveOptions]="{ exact: true }"\n              >\n                {{ \'about-us.steps.block-1.button\' | translate }}\n              </a>\n            </div>\n          </div>\n        </div>\n\n        <div class="card-eco-place card-content">\n          <div>\n            <div class="card-title">\n              <div class="card-title-number"></div>\n              <h3 class="card-title-text">{{ \'about-us.steps.block-2.header\' | translate }}</h3>\n            </div>\n            <div class="card-info">\n              <span class="main-card-text">\n                {{ \'about-us.steps.block-2.text\' | translate }}\n              </span>\n              <a\n                class="card-link"\n                [routerLink]="[\'/tips\']"\n                fragment="tips"\n                routerLinkActive="active-link"\n                [routerLinkActiveOptions]="{ exact: true }"\n              >\n                {{ \'about-us.steps.block-2.button\' | translate }}\n              </a>\n            </div>\n          </div>\n          <img src="assets/img/illustration-earth.png" alt="illustration earth" />\n        </div>\n\n        <div class="card-eco-products card-content">\n          <img src="assets/img/illustration-money.png" alt="illustration money" />\n          <div>\n            <div class="card-title">\n              <div class="card-title-number"></div>\n              <h3 class="card-title-text">{{ \'about-us.steps.block-3.header\' | translate }}</h3>\n            </div>\n            <div class="card-info">\n              <span class="main-card-text">\n                {{ \'about-us.steps.block-3.text\' | translate }}\n              </span>\n              <a class="card-link disabled-link" [routerLink]="[]">\n                {{ \'about-us.steps.block-3.button\' | translate }}\n              </a>\n            </div>\n          </div>\n        </div>\n\n        <div class="card-content card-story">\n          <div>\n            <div class="card-title">\n              <div class="card-title-number"></div>\n              <h3 class="card-title-text">{{ \'about-us.steps.block-4.header\' | translate }}</h3>\n            </div>\n            <div class="card-info">\n              <span class="main-card-text">\n                {{ \'about-us.steps.block-4.text\' | translate }}\n              </span>\n              <a class="card-link disabled-link" routerLink="[]" title="{{ \'about-us.disabled-link\' | translate }}">\n                {{ \'about-us.steps.block-4.button\' | translate }}\n              </a>\n            </div>\n          </div>\n          <img src="assets/img/illustration-recycle.png" alt="illustration recycle" />\n        </div>\n\n        <div class="card-content card-people">\n          <img src="assets/img/illustration-people.png" alt="illustration people" />\n          <div>\n            <div class="card-title">\n              <div class="card-title-number"></div>\n              <h3 class="card-title-text">{{ \'about-us.steps.block-5.header\' | translate }}</h3>\n            </div>\n            <div class="card-info">\n              <span class="main-card-text" id="fifth-card-text">\n                {{ \'about-us.steps.block-5.text\' | translate }}\n              </span>\n              <a class="disabled-link card-link" title="{{ \'about-us.disabled-link\' | translate }}" routerLink="[]">\n                {{ \'about-us.steps.block-5.button\' | translate }}\n              </a>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</main>\n'},Fdht:function(n,t,e){"use strict";e.r(t);var a=e("mrSG"),i=e("CcnG"),s=e("ZYCi"),r=e("82Ky"),o=e("A7o+"),l=function(){function n(n,t,e){this.router=n,this.localStorageService=t,this.translate=e}return n.prototype.ngOnInit=function(){var n=this;this.localStorageService.userIdBehaviourSubject.subscribe((function(t){return n.userId=t})),this.subscribeToLangChange(),this.bindLang(this.localStorageService.getCurrentLanguage())},n.prototype.bindLang=function(n){this.translate.setDefaultLang(n)},n.prototype.subscribeToLangChange=function(){this.langChangeSub=this.localStorageService.languageSubject.subscribe(this.bindLang.bind(this))},n.prototype.navigateToHabit=function(){this.router.navigate(["profile",this.userId])},n.prototype.ngOnDestroy=function(){this.langChangeSub.unsubscribe()},n.ctorParameters=function(){return[{type:s.g},{type:r.a},{type:o.c}]},n=a.__decorate([Object(i.Component)({selector:"app-about-page",template:e("9fSt"),styles:[e("Fs3C")]})],n)}(),c=[{path:"",component:l}],d=function(){function n(){}return n=a.__decorate([Object(i.NgModule)({imports:[s.i.forChild(c)],exports:[s.i]})],n)}(),u=e("Ip0R"),p=e("UrIO"),b=e("t/Na"),g=e("0bV8");e.d(t,"AboutModule",(function(){return v})),e.d(t,"createTranslateLoader",(function(){return m}));var v=function(){function n(){}return n=a.__decorate([Object(i.NgModule)({declarations:[l],imports:[d,p.a,u.CommonModule,o.b.forChild({loader:{provide:o.a,useFactory:m,deps:[b.b]},isolate:!0})],exports:[],providers:[]})],n)}();function m(n){return new g.a(n,"./assets/i18n/",".json")}},Fs3C:function(n,t){n.exports="body {\n  overflow-x: hidden;\n}\n\nimg {\n  max-width: 100%;\n}\n\n.disabled-link {\n  cursor: not-allowed;\n}\n\n.steps-main-block {\n  position: relative;\n  margin: auto 150px;\n}\n\n.steps-wrapper {\n  margin-top: -3767px;\n}\n\n.full-text-block h2 {\n  font-style: normal;\n  font-weight: 500;\n  font-size: 48px;\n  line-height: 60px;\n  font-family: var(--secondary-font);\n}\n\n.full-text-block p {\n  font-size: 24px;\n  line-height: 36px;\n  font-family: var(--primary-font);\n}\n\n.full-text-block button {\n  font-family: var(--primary-font);\n  padding: 16px 40px;\n}\n\n.container-about {\n  padding-bottom: 250px;\n  background-image: url('/GreenCityClient/assets/img/curly-line.png');\n  background-size: 100% 100%;\n}\n\n.container-about .full-text-block {\n  margin-left: 171px;\n}\n\n.container-about button {\n  margin-top: 40px;\n}\n\n.vision {\n  background-image: url('/GreenCityClient/assets/img/wave-line.png');\n  background-size: 100% 100%;\n  margin-bottom: 100px;\n}\n\n.container-vision {\n  margin: auto 171px;\n  padding-bottom: 250px;\n}\n\n.container-about,\n.container-vision {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n\n.card-content {\n  display: flex;\n  flex-direction: row;\n}\n\n.card-info {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-self: center;\n  padding: 40px 48px;\n  line-height: 36px;\n  font-size: 24px;\n  font-family: var(--primary-font);\n  position: relative;\n  top: 150px;\n  background: white;\n}\n\n.card-info .card-link {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 28px;\n  text-decoration: underline;\n  color: var(--secondary-dark-green);\n  font-size: 16px;\n  line-height: 18.75px;\n}\n\n.card-title-text {\n  width: 441px;\n  background: white;\n  font-size: 32px;\n  font-family: var(--primary-font);\n  margin: 44px auto auto 24px;\n  font-weight: bold;\n}\n\n.card-store {\n  margin-bottom: 175px;\n}\n\n.card-store .card-title-number::before {\n  content: url('/GreenCityClient/assets/img/1.png');\n}\n\n.card-eco-place {\n  margin-bottom: 270px;\n}\n\n.card-eco-place .card-title-number::before {\n  content: url('/GreenCityClient/assets/img/2.png');\n}\n\n.card-eco-products {\n  margin-top: 216px;\n}\n\n.card-eco-products .card-title-number::before {\n  content: url('/GreenCityClient/assets/img/3.png');\n}\n\n.card-title {\n  display: flex;\n  flex-direction: row;\n}\n\n.card-story {\n  margin-top: 300px;\n}\n\n.card-story .card-title-number::before {\n  content: url('/GreenCityClient/assets/img/4.png');\n}\n\n.card-people {\n  margin-top: 320px;\n}\n\n.card-people .card-title-number::before {\n  content: url('/GreenCityClient/assets/img/5.png');\n}\n\n.dashed-line {\n  position: relative;\n  background: url('/GreenCityClient/assets/img/dashed-line.png');\n  width: 832px;\n  height: 3576px;\n  margin: auto;\n  z-index: -1;\n}\n\n.leaves {\n  position: relative;\n  top: 12px;\n  left: 107px;\n  background: url('/GreenCityClient/assets/img/leaves.png') no-repeat;\n  width: 641px;\n  height: 3214px;\n  z-index: -1;\n}\n\n@media only screen and (max-width: 1199px) {\n  .container-vision {\n    margin: auto 30px;\n  }\n\n  .container-about img {\n    max-width: 60%;\n  }\n\n  .steps-main-block {\n    margin: auto 30px;\n  }\n\n  .card-title {\n    width: auto;\n  }\n\n  .card-info {\n    padding: 0;\n    margin: 0;\n  }\n\n  .card-title-text {\n    width: auto;\n  }\n}\n\n@media only screen and (max-width: 1024px) {\n  .container-about,\n.container-vision {\n    flex-direction: column;\n  }\n  .container-about .full-text-block,\n.container-vision .full-text-block {\n    margin-left: 0;\n  }\n\n  .container-vision img {\n    order: 2;\n  }\n\n  .card-content {\n    flex-direction: column;\n    margin: 0;\n  }\n  .card-content img {\n    max-width: 100%;\n    order: 2;\n  }\n  .card-content .card-info {\n    position: relative;\n    top: 0;\n  }\n\n  .dashed-line,\n.leaves {\n    display: none;\n  }\n\n  .steps-wrapper {\n    margin-top: 0;\n  }\n}"}}]);