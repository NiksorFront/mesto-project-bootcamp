/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";function t(t){t.classList.add("popup_opened"),function(t){t.addEventListener("click",r),document.addEventListener("keydown",n)}(t)}function e(t){t.classList.remove("popup_opened"),document.removeEventListener("keydown",n),t.removeEventListener("click",r)}function n(t){"Escape"===t.key&&e(document.querySelector(".popup_opened"))}function r(t){t.target.classList.contains("popup")&&e(t.target)}function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function i(){i=function(){return e};var t,e={},n=Object.prototype,r=n.hasOwnProperty,c=Object.defineProperty||function(t,e,n){t[e]=n.value},a="function"==typeof Symbol?Symbol:{},u=a.iterator||"@@iterator",l=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function f(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(t){f=function(t,e,n){return t[e]=n}}function d(t,e,n,r){var o=e&&e.prototype instanceof _?e:_,i=Object.create(o.prototype),a=new P(r||[]);return c(i,"_invoke",{value:q(t,n,a)}),i}function h(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}e.wrap=d;var p="suspendedStart",m="suspendedYield",v="executing",y="completed",g={};function _(){}function b(){}function E(){}var w={};f(w,u,(function(){return this}));var L=Object.getPrototypeOf,x=L&&L(L(T([])));x&&x!==n&&r.call(x,u)&&(w=x);var S=E.prototype=_.prototype=Object.create(w);function k(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function C(t,e){function n(i,c,a,u){var l=h(t[i],t,c);if("throw"!==l.type){var s=l.arg,f=s.value;return f&&"object"==o(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,a,u)}),(function(t){n("throw",t,a,u)})):e.resolve(f).then((function(t){s.value=t,a(s)}),(function(t){return n("throw",t,a,u)}))}u(l.arg)}var i;c(this,"_invoke",{value:function(t,r){function o(){return new e((function(e,o){n(t,r,e,o)}))}return i=i?i.then(o,o):o()}})}function q(e,n,r){var o=p;return function(i,c){if(o===v)throw new Error("Generator is already running");if(o===y){if("throw"===i)throw c;return{value:t,done:!0}}for(r.method=i,r.arg=c;;){var a=r.delegate;if(a){var u=j(a,r);if(u){if(u===g)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===p)throw o=y,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=v;var l=h(e,n,r);if("normal"===l.type){if(o=r.done?y:m,l.arg===g)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(o=y,r.method="throw",r.arg=l.arg)}}}function j(e,n){var r=n.method,o=e.iterator[r];if(o===t)return n.delegate=null,"throw"===r&&e.iterator.return&&(n.method="return",n.arg=t,j(e,n),"throw"===n.method)||"return"!==r&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+r+"' method")),g;var i=h(o,e.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,g;var c=i.arg;return c?c.done?(n[e.resultName]=c.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,g):c:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,g)}function B(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function P(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(B,this),this.reset(!0)}function T(e){if(e||""===e){var n=e[u];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var i=-1,c=function n(){for(;++i<e.length;)if(r.call(e,i))return n.value=e[i],n.done=!1,n;return n.value=t,n.done=!0,n};return c.next=c}}throw new TypeError(o(e)+" is not iterable")}return b.prototype=E,c(S,"constructor",{value:E,configurable:!0}),c(E,"constructor",{value:b,configurable:!0}),b.displayName=f(E,s,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,E):(t.__proto__=E,f(t,s,"GeneratorFunction")),t.prototype=Object.create(S),t},e.awrap=function(t){return{__await:t}},k(C.prototype),f(C.prototype,l,(function(){return this})),e.AsyncIterator=C,e.async=function(t,n,r,o,i){void 0===i&&(i=Promise);var c=new C(d(t,n,r,o),i);return e.isGeneratorFunction(n)?c:c.next().then((function(t){return t.done?t.value:c.next()}))},k(S),f(S,s,"Generator"),f(S,u,(function(){return this})),f(S,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},e.values=T,P.prototype={constructor:P,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(O),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function o(r,o){return a.type="throw",a.arg=e,n.next=r,o&&(n.method="next",n.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var c=this.tryEntries[i],a=c.completion;if("root"===c.tryLoc)return o("end");if(c.tryLoc<=this.prev){var u=r.call(c,"catchLoc"),l=r.call(c,"finallyLoc");if(u&&l){if(this.prev<c.catchLoc)return o(c.catchLoc,!0);if(this.prev<c.finallyLoc)return o(c.finallyLoc)}else if(u){if(this.prev<c.catchLoc)return o(c.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<c.finallyLoc)return o(c.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var c=i?i.completion:{};return c.type=t,c.arg=e,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(c)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),O(n),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;O(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:T(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),g}},e}function c(t,e,n,r,o,i,c){try{var a=t[i](c),u=a.value}catch(t){return void n(t)}a.done?e(u):Promise.resolve(u).then(r,o)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){c(i,r,o,a,u,"next",t)}function u(t){c(i,r,o,a,u,"throw",t)}a(void 0)}))}}var u={baseUrl:"https://nomoreparties.co/v1/wbf-cohort-14",authorization:"dfad8615-a69b-4969-abcf-da90e50e7e80","Content-Type":"application/json"};function l(t){return t.ok?t.json():t.json().then((function(t){return Promise.reject(t)}))}function s(t){return f.apply(this,arguments)}function f(){return(f=a(i().mark((function t(e){var n;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(u.baseUrl,"/").concat(e),{headers:{authorization:u.authorization}});case 2:return n=t.sent,t.next=5,l(n);case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function d(t,e,n){return h.apply(this,arguments)}function h(){return(h=a(i().mark((function t(e,n,r){var o;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(u.baseUrl,"/").concat(e),{method:n,headers:{authorization:u.authorization,"Content-Type":u["Content-Type"]},body:JSON.stringify(r)});case 2:return o=t.sent,t.next=5,l(o);case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function p(){return(p=a(i().mark((function t(e,n,r){var o;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(u.baseUrl,"/").concat(e,"/").concat(r),{method:n,headers:{authorization:u.authorization}});case 2:return o=t.sent,t.next=5,l(o);case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function m(){return(m=a(i().mark((function t(e,n){var r;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(u.baseUrl,"/").concat(e,"/").concat(n),{method:"DELETE",headers:{authorization:u.authorization}});case 2:return r=t.sent,t.next=5,l(r);case 5:return t.abrupt("return",t.sent);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var v=document.getElementById("big-img"),y=v.querySelector(".form__img"),g=v.querySelector(".form_img__title");v.querySelector(".popup__close").addEventListener("click",(function(){return e(v)}));var _,b,E=document.getElementById("delete-card"),w=E.querySelector(".form__button-submit");E.querySelector(".popup__close").addEventListener("click",(function(){e(E)})),w.addEventListener("click",(function(){w.textContent="Удаление...",function(t,e){return m.apply(this,arguments)}("cards",_).then((function(){b.remove(),e(E)})).catch((function(t){return console.log(t)})).finally((function(){return w.textContent="Да"}))}));var L=document.getElementById("card-template").content.querySelector(".element");function x(e,n){var r=L.cloneNode(!0),o=r.querySelector(".element__img"),i=r.querySelector(".element__like"),c=r.querySelector(".element__delete"),a=r.querySelector(".element__number-of-like");r.querySelector(".element__title").textContent=e.name,o.alt=e.name,o.src=e.link,a.textContent=e.likes.length;var u=e.likes.map((function(t){return t._id}));return u.includes(n)&&i.classList.add("element__like_set"),i.addEventListener("click",(function(){return function(t,e,n){(function(t,e,n){return p.apply(this,arguments)})("cards/likes",t.classList.contains("element__like_set")?"DELETE":"PUT",n).then((function(n){t.classList.toggle("element__like_set"),e.textContent=n.likes.length})).catch((function(t){console.log(t)}))}(i,a,e._id)})),e.owner._id===n?c.addEventListener("click",(function(){t(E),_=e._id,b=r})):c.remove(),r.querySelector("#card-image").addEventListener("click",(function(e){!function(e){var n=e.parentNode.parentNode.querySelector(".element__title").textContent;y.src=e.getAttribute("src"),y.alt=n,g.textContent=n,t(v)}(e.target)})),r}var S=function(t,e,n){var r=t.querySelector(n.submitButtonSelector);!function(t){return t.some((function(t){return!t.validity.valid}))}(e)?(r.classList.remove(n.inactiveButtonClass),r.disabled=!1):(r.classList.add(n.inactiveButtonClass),r.disabled=!0)},k=document.querySelector(".elements"),C=s("users/me").then((function(t){return t})).catch((function(t){return reject(t)})),q=s("cards").then((function(t){return t})).catch((function(t){return reject(t)}));Promise.all([C,q]).then((function(t){var e=t[0],n=t[1];D.src=e.avatar,F.value=D.src,j.textContent=e.name,O.textContent=e.about,n.forEach((function(t){return k.append(x(t,e._id))}))}));var j=document.querySelector(".profile__name"),B=document.getElementById("name"),O=document.querySelector(".profile__subtitle"),P=document.getElementById("type_of_activity"),T=document.forms.name_jod,I=document.querySelector(".profile__edit-button"),N=document.querySelector("#edit-card"),z=N.querySelector(".popup__close");I.addEventListener("click",(function(){B.value=j.textContent,P.value=O.textContent,t(N)})),z.addEventListener("click",(function(){return e(N)})),T.addEventListener("submit",(function(t){t.preventDefault();var n=t.submitter;n.textContent="Сохранение...",d("users/me","PATCH",{name:B.value,about:P.value}).then((function(t){j.textContent=t.name,O.textContent=t.about,e(N)})).catch((function(t){return console.log(t)})).finally((function(){return n.textContent="Сохранить"}))}));var A=document.querySelector(".avatar"),G=document.getElementById("edit-img"),U=G.querySelector(".popup__close");A.addEventListener("click",(function(){return t(G)})),U.addEventListener("click",(function(){return e(G)}));var D=document.querySelector(".avatar__img"),F=document.getElementById("img_url_avatar");F.value=D.src,document.forms.img_url.addEventListener("submit",(function(t){t.preventDefault();var n=t.submitter;n.textContent="Сохранение...",d("users/me/avatar","PATCH",{avatar:F.value}).then((function(t){D.src=t.avatar,e(G)})).catch((function(t){return console.log(t)})).finally((function(){return n.textContent="Сохранить"}))}));var H=document.querySelector(".button-add"),Y=document.getElementById("create-card"),J=Y.querySelector(".popup__close");H.addEventListener("click",(function(){return t(Y)})),J.addEventListener("click",(function(){return e(Y)}));var M,K=document.getElementById("name_place"),Q=document.getElementById("link_photo");document.forms.form_create.addEventListener("submit",(function(t){t.preventDefault();var n=t.submitter;n.textContent="Создание...",d("cards","POST",{name:K.value,link:Q.value}).then((function(t){k.prepend(x(t,t.owner._id)),K.value="",Q.value="",e(Y)})).catch((function(t){return console.log(t)})).finally((function(){return n.textContent="Создать"}))})),M={formSelector:".form__form",inputSelector:".form__input",submitButtonSelector:".form__button-submit",inactiveButtonClass:"form__button-submit_block",inputErrorClass:"form__error",errorClass:""},Array.from(document.querySelectorAll(M.formSelector)).forEach((function(t){return function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector));S(t,n,e),n.forEach((function(r){r.addEventListener("input",(function(){!function(t,e,n){e.validity.valid?function(t,e,n){t.querySelector("#".concat(e.id,"-error")).textContent=""}(t,e):function(t,e,n){t.querySelector("#".concat(e.id,"-error")).textContent=e.validationMessage}(t,e)}(t,r),S(t,n,e)}))})),t.addEventListener("submit",(function(){var n=t.querySelector(e.submitButtonSelector);n.classList.add(e.inactiveButtonClass),n.disabled=!0}))}(t,M)}))})();