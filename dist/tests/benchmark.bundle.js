!function(t){var e={};function n(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return t[s].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(s,i,function(e){return t[e]}.bind(null,i));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";var s=this&&this.__awaiter||function(t,e,n,s){return new(n||(n=Promise))(function(i,r){function o(t){try{c(s.next(t))}catch(t){r(t)}}function a(t){try{c(s.throw(t))}catch(t){r(t)}}function c(t){t.done?i(t.value):new n(function(e){e(t.value)}).then(o,a)}c((s=s.apply(t,e||[])).next())})};Object.defineProperty(e,"__esModule",{value:!0});const i=n(1),r=n(7),o=n(8);let a=new i.default,c="2x-sin(x)+2x+cos(x)*cos(2x)-sin(x)",l=0,h=new r.default;const u=t=>s(this,void 0,void 0,function*(){let e=yield a.expression.create(c).assembly();h.start("time_func_one_wasm"+t);for(let t=0;t<5e4;t+=.5)e(t);h.end("time_func_one_wasm"+t);let n=a.expression.create(c).function;h.start("time_func_one_eval"+t);for(let t=0;t<5e4;t+=.5)n(t);h.end("time_func_one_eval"+t)});for(;l<1;)u(l),l++;o.$("body").child("button").text("result").click(()=>{h.export()})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=n(2),i=n(5);e.default=class{constructor(){this.exp=void 0,this.gr=void 0}get expression(){return null==this.exp&&(this.exp=new r),this.exp}get graph(){return null==this.gr&&(this.gr=new o),this.gr}};class r{create(t){return new s.default(t)}}e.expressionManager=r;class o{create(t){return new i.default(t)}}e.graphManager=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=n(3),i=n(4);e.default=class{get baseExpression(){return this.baseExp}get function(){return this.code=s.default.functionize(this.baseExp),this.code}get parsedForm(){return s.default.parse(this.baseExp)}getFor(t){return this.code(t)}assembly(){return i.getCode(this.baseExp)}constructor(t){this.baseExp=t,this.code=this.function}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});class s{constructor(){this.type="parser"}static functionize(t){return this.Functionize(t,!0)}static parse(t){if("number"==typeof t&&(t=t.toString()),0==this.check(t))throw new i("Invalid expression given");return t=(t=(t=(t=this.prepareExpression(t)).replace(/sqrt\$([0-9]+)/i,(t,e)=>`Math.pow($${e}, 0.5)`)).replace(/([\$0-9xe]+)\^([\$0-9xe]+)/gi,(t,e,n)=>`pow(${e}, ${n})`)).replace(/\$([0-9]+)/gi,(t,e)=>this.clean("("+this.parse(this.partials["$"+e])+")")),t=this.clean(t)}static check(t){return t.split("(").length==t.split(")").length}static prepareExpression(t){t=(t=(t=t.replace(/²/gi,"^2")).replace(/³/gi,"^2")).replace(/X/g,"x");let e="",n=0,s="";for(let i=0;i<t.length;i++){const r=t[i];let o="$"+(Object.keys(this.partials).length+1);n>=1?")"==r?0==(n-=1)?(this.partials[o]=s,s=""):s+=r:("("==r&&(n+=1),s+=r):"("==r?(n+=1,e+=o):e+=r}return e=(e=e.replace(/([0-9\.]+)x\^([\$0-9\.]+)/gi,(t,e,n)=>{let s="$"+(Object.keys(this.partials).length+1);return this.partials[s]=`${e}*x^${n}`,s})).replace(/([0-9\.]+)x/gi,(t,e)=>{let n="$"+(Object.keys(this.partials).length+1);return this.partials[n]=`${e}*x`,n})}static Functionize(t,e=!0){return 1==e&&(t=this.parse(t)),new Function("x","funcs",`\n            const sin = Math.sin;\n            const tan = Math.tan;\n            const cos = Math.cos;\n            const asin = Math.asin;\n            const atan = Math.atan;\n            const acos = Math.acos;\n            \n            const cot = (x) => 1 / Math.tan(x);\n            const csc = (x) => 1 / Math.sin(x);\n            const sec = (x) => 1 / Math.cos(x);\n            \n            const sinh = Math.sinh;\n            const tanh = Math.tanh;\n            const cosh = Math.cosh;\n            const asinh = Math.asinh;\n            const atanh = Math.atanh;\n            const acosh = Math.acosh;\n\n            const ceil = Math.ceil;\n            const floor = Math.floor;\n            const abs = Math.abs;\n            const ln = Math.log;\n            const log = function (base, y) { \n                if(y == undefined) {\n                    y = base;\n                    base = 10;\n                }\n                return Math.log(y) / Math.log(base)\n            };\n\n            const e = Math.E;\n            const pi = Math.PI;\n            const pow = function (base, exponent){\n                if(exponent % 1 != 0){\n                    for(let i = -7; i < 8; i = i + 2){\n                        if(exponent == 1/i && base < 0) return 0 - 1 * Math.pow(0 - base, exponent);     \n                    }\n                }\n                return Math.pow(base, exponent);\n            }\n\n            const exp = function (base, y){\n                if(y == undefined){\n                    return Math.exp(base);\n                } else {\n                    return pow(base, y);\n                }\n            }; \n\n            const gamma = function (z) {\n                let g = 7;\n                let C = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]\n                if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));\n                else {\n                    z -= 1;\n            \n                    var x = C[0];\n                    for (var i = 1; i < g + 2; i++)\n                    x += C[i] / (z + i);\n            \n                    var t = z + g + 0.5;\n                    return Math.sqrt(2 * Math.PI) * Math.pow(t, (z + 0.5)) * Math.exp(-t) * x;\n                }\n            }\n            \n            return ${this.FunctionizeCalls(t)};\n            \n            `)}static FunctionizeCalls(t){return t.replace(/([a-z]+)([1-9]*)\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g,(t,e,n,s)=>this.math_func.indexOf(e)>=0?`${e+n}(${this.FunctionizeCalls(s)})`:`funcs.${e+n}.array(${this.FunctionizeCalls(s)}, funcs)`)}static clean(t){let e=/([^a-z\/])\(([0-9x]+)\)/gi;for(;e.test(t);)t=t.replace(e,(t,e,n)=>e+n);return t=(t=(t=t.replace(/\*([0-9]+)/gi,(t,e)=>1==e?"":t)).replace(/\^([0-9]+)/gi,(t,e)=>1==e?"":t)).replace(/\$([0-9]+)/g,t=>`(${this.partials[t]})`)}}s.partials={},s.math_func=["sin","tan","cos","asin","atan","acos","sinh","tanh","cosh","asinh","atanh","acosh","ceil","floor","abs","exp","ln","log","pow","cot","sec","csc","gamma"],e.default=s;class i extends Error{constructor(){super(...arguments),this.type="IE"}}e.InvalidExpressionError=i},function(t,e,n){"use strict";var s=this&&this.__awaiter||function(t,e,n,s){return new(n||(n=Promise))(function(i,r){function o(t){try{c(s.next(t))}catch(t){r(t)}}function a(t){try{c(s.throw(t))}catch(t){r(t)}}function c(t){t.done?i(t.value):new n(function(e){e(t.value)}).then(o,a)}c((s=s.apply(t,e||[])).next())})};Object.defineProperty(e,"__esModule",{value:!0}),e.getCode=function(t){return s(this,void 0,void 0,function*(){return(yield WebAssembly.instantiateStreaming(fetch("http://localhost:5000/smath-webassembly/us-central1/buildWasm?exp="+encodeURIComponent(t)+"&parse=true"),{env:{Math_cos:Math.cos,Math_sin:Math.sin}})).instance.exports.add})}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});const s=n(6);e.default=class{constructor(t){this.canvas=t,this.x_scale=50,this.y_scale=50,this.x_unit=1,this.y_unit=1,this.x_center=0,this.y_center=0,this.objects=[],this.objects.push(new s.default(1,0)),console.log(this.objects[0].X);try{window.addEventListener("resize",t=>{t.stopPropagation(),t.preventDefault(),this.canvas.resize(),this.draw()})}catch(t){console.log(t)}if(null!=window){let e,n=!1;t.canvas.addEventListener("mousedown",s=>{n=!0,e={x:s.pageX,y:s.pageY},t.canvas.style.cursor="grabbing"}),t.canvas.addEventListener("touchstart",t=>{n=!0,e={x:t.touches.item(0).clientX,y:t.touches.item(0).clientY}}),t.canvas.addEventListener("mousemove",t=>{if(1==n){let n={x:t.pageX,y:t.pageY},s=e;this.move(s,n)&&(e=n)}}),t.canvas.addEventListener("touchmove",t=>{if(t.preventDefault(),1==n){let n={x:t.touches.item(0).clientX,y:t.touches.item(0).clientY},s=e;this.move(s,n)&&(e=n)}}),t.canvas.addEventListener("mouseup",e=>{e.preventDefault(),e.stopPropagation(),n=!1,t.canvas.style.cursor="grab"}),t.canvas.addEventListener("touchend",t=>{t.stopPropagation(),t.preventDefault(),n=!1}),t.canvas.addEventListener("mousewheel",t=>{t.stopPropagation(),t.preventDefault();let e=Math.max(-1,Math.min(1,t.wheelDelta||-t.detail));this.zoom(e)}),t.canvas.addEventListener("DOMMouseScroll",t=>{t.preventDefault(),t.preventDefault();let e=Math.max(-1,Math.min(1,t.wheelDelta||-t.detail));this.zoom(e)})}}register(t,e){}zoom(t){this.x_scale+10*t>5&&(this.x_scale+=10*t),this.y_scale+10*t>5&&(this.y_scale+=10*t),this.draw()}move(t,e){let n=t.x-e.x,s=t.y-e.y;if(Math.sqrt(Math.pow(n,2)+Math.pow(s,2))>10)return this.x_center+=n/this.x_scale,this.y_center-=s/this.y_scale,this.draw(),!0}draw(){this.canvas.clear(),this.drawGrid()}drawGrid(){let t="18px Sans Serif",e=this.canvas.width/this.x_scale/2+this.x_unit,n=this.x_center-this.x_center%this.x_unit,s=this.yPos(0);for(let i=0;i<e;i+=this.x_unit){let e=this.xPos(n+i),r=this.xPos(n-i);this.canvas.drawLine(e,0,e,this.canvas.height),this.canvas.text((Math.floor(100*(n+i))/100).toString(),e,s+15,"gray",t),e!=r&&(this.canvas.drawLine(r,0,r,this.canvas.height),this.canvas.text((Math.floor(100*(n-i))/100).toString(),r,s+15,"gray",t))}let i=this.canvas.height/this.y_scale/2+this.y_unit,r=this.y_center-this.y_center%this.y_unit,o=this.xPos(0);for(let e=0;e<i;e+=this.y_unit){let n=r+e,s=r-e,i=this.yPos(n),a=this.yPos(s);this.canvas.drawLine(0,i,this.canvas.width,i),this.canvas.text((Math.floor(100*n)/100).toString(),o+2,i,"gray",t),i!=a&&(this.canvas.drawLine(0,a,this.canvas.width,a),this.canvas.text((Math.floor(100*s)/100).toString(),o+2,a,"gray",t))}this.canvas.drawLine(this.xPos(0),0,this.xPos(0),this.canvas.height,"black"),this.canvas.drawLine(0,this.yPos(0),this.canvas.width,this.yPos(0),"black")}xPos(t){return this.canvas.width/2+t*this.x_scale-this.x_center*this.x_scale}yPos(t){return this.canvas.height/2-t*this.y_scale+this.y_center*this.y_scale}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t,e){this.X=t,this.Y=e,this.type="point",this.coordinates=[[t,e]]}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(){this.timers={}}start(t){this.timers[t]={start:window.performance.now()}}end(t){console.log("ended : "+t+"@"+window.performance.now()),this.timers[t].end=window.performance.now()}export(){let t={};Object.keys(this.timers).sort().forEach(e=>{let{start:n,end:s}=this.timers[e];t[e]={},t[e].time=s-n}),console.table(this.timers),console.table(t)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});class s{constructor(t){this.message=t,this.name="IndexOutOfArrayException"}}e.IndexOutOfArrayExecption=s;class i{constructor(t,e){var n;if("string"==typeof t)n=document.querySelectorAll(t),null!=e&&(n=[n[e]]);else{if(null==t||t==document)return this.ready=function(t){document.addEventListener("DOMContentLoaded",t)},this;if("object"!=typeof t)return"ExtJsObject"==t.type?t:void 0;n=null==t.length?[t]:null!=e?[t[e]]:t}this.type="ExtJsObject",this.node=n}html(t){if(null!=t){for(var e=0;e<this.node.length;e++){var n=this.node[e];"string"!=typeof t&&"number"!=typeof t||(n.innerHTML=t)}return this}return this.node[0].innerHTML}text(t){if(null!=t){for(var e=0;e<this.node.length;e++){var n=this.node[e];"string"!=typeof t&&"number"!=typeof t||(n.innerText=t)}return this}return this.node[0].innerText}click(t,e){for(var n=0;n<this.node.length;n++){var s=this.node[n];if(void 0===e)void 0!==t?s.addEventListener("click",t):s.click();else if(void 0!==t){var i=s;s.addEventListener("click",function(n){if(i.querySelector(e)==n.target){let n=i.querySelector(e);n.prototype.toDo=t,n.toDo()}})}else{(i=s).querySelector(e).click()}}return this}dblclick(t,e){for(var n=0;n<this.node.length;n++){var s=this.node[n];if(void 0===e)void 0!==t?s.addEventListener("dblclick",t):s.dblclick();else if(void 0!==t){var i=s;s.addEventListener("dblclick",function(n){if(i.querySelector(e)==n.target){let n=i.querySelector(e);n.prototype.toDo=t,n.toDo()}})}else{(i=s).querySelector(e).dblclick()}}return this}hover(t,e){for(var n=0;n<this.node.length;n++){var s=this.node[n];if(void 0===e)void 0!==t?s.addEventListener("mouseover",t):s.click();else if(void 0!==t){var i=s;s.addEventListener("mouseover",function(n){if(i.querySelector(e)==n.target){let n=i.querySelector(e);n.prototype.toDo=t,n.toDo()}})}}return this}leave(t,e){for(var n=0;n<this.node.length;n++){var s=this.node[n];if(void 0===e)void 0!==t?s.addEventListener("mouseleave",t):s.click();else if(void 0!==t){var i=s;s.addEventListener("mouseleave",function(n){if(i.querySelector(e)==n.target){let n=i.querySelector(e);n.prototype.toDo=t,n.toDo()}})}}return this}get(t){if(null!=t){if(null==this.node[t])throw new s("ExtJsObject.get undefined index node["+t+"]");return this.node[t]}if(null==this.node[0])throw new s("ExtJsObject.get undefined index node[0]");return this.node[0]}exists(t){return null!=t?null!=this.node[t]:0!=this.node.length}height(t){for(var e=0;e<this.node.length;e++){var n=this.node[e];if(void 0===t)return n.offsetHeight;n.style.height=t}return this}width(t){for(var e=0;e<this.node.length;e++){var n=this.node[e];if(void 0===t)return n.offsetWidth;n.style.width=t}return this}addClass(t){for(var e=0;e<this.node.length;e++){this.node[e].classList.add(t)}return this}hasClass(t){return this.node[0].classList.contains(t)}removeClass(t){for(var e=0;e<this.node.length;e++){this.node[e].classList.remove(t)}return this}remove(){for(var t=0;t<this.node.length;t++){var e=this.node[t];e.parentElement.removeChild(e)}}child(t){for(var e=[],n=0;n<this.node.length;n++){var s=this.node[n],i=document.createElement(t);s.appendChild(i),e.push(i)}return r(e)}css(t,e,n){var s=n;if(null==n&&(n=0),null==e)return this.node[n].style[t];if(null!=s)return this.node[n].style[t]=e,this;for(let n=0;n<this.node.length;n++){this.node[n].style[t]=e}return this}attr(t,e,n){var s=n;if(null==n&&(n=0),null==e)return this.node[n].getAttribute(t);if(null!=s)return this.node[n].style[t]=e,this;for(let n=0;n<this.node.length;n++){this.node[n].setAttribute(t,e)}return this}parent(t){for(var e=[],n=0;n<this.node.length;n++){var s=this.node[n];null==t?e.push(s.parentElement):e.push(s.closest(t))}return r(e)}value(t){if(null!=t){for(var e=0;e<this.node.length;e++){var n=this.node[e];"string"!=typeof t&&"number"!=typeof t||(n.value=t)}return this}this.node[0];return this.node[0].value}keypress(t,e){for(var n=0;n<this.node.length;n++){var s=this.node[n];if(void 0===e)void 0!==t&&s.addEventListener("keypress",t);else if(void 0!==t){var i=s;s.addEventListener("keypress",function(n){if(i.querySelector(e)==n.target){let n=i.querySelector(e);n.prototype.toDo=t,n.toDo()}})}}return this}input(t,e){for(var n=0;n<this.node.length;n++){var s=this.node[n];if(void 0===e)void 0!==t&&s.addEventListener("input",t);else if(void 0!==t){var i=s;s.addEventListener("input",function(n){if(i.querySelector(e)==n.target){let n=i.querySelector(e);n.prototype.toDo=t,n.toDo()}})}}return this}keydown(t,e){for(var n=0;n<this.node.length;n++){var s=this.node[n];if(void 0===e)void 0!==t&&s.addEventListener("keydown",t);else if(void 0!==t){var i=s;s.addEventListener("keydown",function(n){if(i.querySelector(e)==n.target){let n=i.querySelector(e);n.prototype.toDo=t,n.toDo()}})}}return this}change(t,e){for(var n=0;n<this.node.length;n++){var s=this.node[n];if(void 0===e)void 0!==t&&s.addEventListener("change",t);else if(void 0!==t){var i=s;s.addEventListener("change",function(n){if(i.querySelector(e)==n.target){let n=i.querySelector(e);n.prototype.toDo=t,n.toDo()}})}}return this}keyup(t,e){for(var n=0;n<this.node.length;n++){var s=this.node[n];if(void 0===e)void 0!==t&&s.addEventListener("keyup",t);else if(void 0!==t){var i=s;s.addEventListener("keyup",function(n){if(i.querySelector(e)==n.target){let n=i.querySelector(e);n.prototype.toDo=t,n.toDo()}})}}return this}prevSibling(){let t=[];for(var e=0;e<this.node.length;e++){var n=this.node[e];t.push(n.previousSibling)}return r(t)}nextSibling(){let t=[];for(var e=0;e<this.node.length;e++){var n=this.node[e];t.push(n.nextSibling)}return r(t)}appendTo(t){let e=this.get(0);t.get(0).appendChild(e)}count(){return this.node.length}forEach(t){for(let e=0;e<this.node.length;e++){const n=this.node[e];t.bind(n)(e)}return this}cssObj(t){return Object.keys(t).forEach(e=>{this.css(e,t[e])}),this}children(t){return r(this.node[0].querySelectorAll(t))}only(t){return r(this.node[t])}}e.ExtJsObject=i;function r(t,e){return null!=t?new i(t,e):this}e.AR=new class{request(t,e,n,s,i){let r=new XMLHttpRequest;r.onreadystatechange=function(){if(4==r.readyState&&200==r.status)s(r.responseText);else if(4==r.readyState&&null!=i)try{i()}catch(t){}},r.open("GET"==t||"DELETE"==t?"GET":"POST",e,!0);let o="";if(null!=n){let t=Object.keys(n);for(let e=0;e<t.length;e++)0!==e&&(o+="&"),o=o+t[e]+"="+n[t[e]];r.setRequestHeader("Content-type","application/x-www-form-urlencoded")}"PUT"!=t&&"DELETE"!=t||r.setRequestHeader("x-http-method-override",t),""!=o?r.send(o):r.send()}GET(t,e,n){return this.request("GET",t,void 0,e,n)}DELETE(t,e,n){return this.request("DELETE",t,void 0,e,n)}POST(t,e,n,s){return this.request("POST",t,e,n,s)}PUT(t,e,n,s){return this.request("PUT",t,e,n,s)}},e.$=r}]);