!function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=11)}({11:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const extjs_1=__webpack_require__(12),build_1=__webpack_require__(13);let area=extjs_1.$("#area");area.child("span").html("&Omega; = {");let omega=area.child("span").attr("contentEditable","true").text("(1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(2,1),(2,2),(2,3),(2,4),(2,5),(2,6),(3,1),(3,2),(3,3),(3,4),(3,5),(3,6),(4,1),(4,2),(4,3),(4,4),(4,5),(4,6),(5,1),(5,2),(5,3),(5,4),(5,5),(5,6),(6,1),(6,2),(6,3),(6,4),(6,5),(6,6)");area.child("span").text("}"),area.child("h3").text("Évènements");let events=area.child("div");events.attr("contentEditable","true"),events.text('A = "element[0] % 2 = 0"'),area.child("h3").text("Recherche");let research=area.child("div");research.attr("contentEditable","true"),research.text("A"),area.child("h3").text("Résultats");let result=area.child("div"),c=new build_1.default(omega,events,research);const build=()=>{let code=c.buildCode();result.html(""),console.log(code);const log=(e,t="$text")=>{t=t.replace(/\$text/g,e),result.html(result.html()+t+"<br />")};eval(code)};research.input(()=>{build()}),events.input(()=>{build()}),omega.input(()=>{build()}),build()},12:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});class n{constructor(e){this.message=e,this.name="IndexOutOfArrayException"}}t.IndexOutOfArrayExecption=n;class i{constructor(e,t){var r;if("string"==typeof e)r=document.querySelectorAll(e),null!=t&&(r=[r[t]]);else{if(null==e||e==document)return this.ready=function(e){document.addEventListener("DOMContentLoaded",e)},this;if("object"!=typeof e)return"ExtJsObject"==e.type?e:void 0;r=null==e.length?[e]:null!=t?[e[t]]:e}this.type="ExtJsObject",this.node=r}html(e){if(null!=e){for(var t=0;t<this.node.length;t++){var r=this.node[t];"string"!=typeof e&&"number"!=typeof e||(r.innerHTML=e)}return this}return this.node[0].innerHTML}text(e){if(null!=e){for(var t=0;t<this.node.length;t++){var r=this.node[t];"string"!=typeof e&&"number"!=typeof e||(r.innerText=e)}return this}return this.node[0].innerText}click(e,t){for(var r=0;r<this.node.length;r++){var n=this.node[r];if(void 0===t)void 0!==e?n.addEventListener("click",e):n.click();else if(void 0!==e){var i=n;n.addEventListener("click",function(r){if(i.querySelector(t)==r.target){let r=i.querySelector(t);r.prototype.toDo=e,r.toDo()}})}else{(i=n).querySelector(t).click()}}return this}dblclick(e,t){for(var r=0;r<this.node.length;r++){var n=this.node[r];if(void 0===t)void 0!==e?n.addEventListener("dblclick",e):n.dblclick();else if(void 0!==e){var i=n;n.addEventListener("dblclick",function(r){if(i.querySelector(t)==r.target){let r=i.querySelector(t);r.prototype.toDo=e,r.toDo()}})}else{(i=n).querySelector(t).dblclick()}}return this}hover(e,t){for(var r=0;r<this.node.length;r++){var n=this.node[r];if(void 0===t)void 0!==e?n.addEventListener("mouseover",e):n.click();else if(void 0!==e){var i=n;n.addEventListener("mouseover",function(r){if(i.querySelector(t)==r.target){let r=i.querySelector(t);r.prototype.toDo=e,r.toDo()}})}}return this}leave(e,t){for(var r=0;r<this.node.length;r++){var n=this.node[r];if(void 0===t)void 0!==e?n.addEventListener("mouseleave",e):n.click();else if(void 0!==e){var i=n;n.addEventListener("mouseleave",function(r){if(i.querySelector(t)==r.target){let r=i.querySelector(t);r.prototype.toDo=e,r.toDo()}})}}return this}get(e){if(null!=e){if(null==this.node[e])throw new n("ExtJsObject.get undefined index node["+e+"]");return this.node[e]}if(null==this.node[0])throw new n("ExtJsObject.get undefined index node[0]");return this.node[0]}exists(e){return null!=e?null!=this.node[e]:0!=this.node.length}height(e){for(var t=0;t<this.node.length;t++){var r=this.node[t];if(void 0===e)return r.offsetHeight;r.style.height=e}return this}width(e){for(var t=0;t<this.node.length;t++){var r=this.node[t];if(void 0===e)return r.offsetWidth;r.style.width=e}return this}addClass(e){for(var t=0;t<this.node.length;t++){this.node[t].classList.add(e)}return this}hasClass(e){return this.node[0].classList.contains(e)}removeClass(e){for(var t=0;t<this.node.length;t++){this.node[t].classList.remove(e)}return this}remove(){for(var e=0;e<this.node.length;e++){var t=this.node[e];t.parentElement.removeChild(t)}}child(e){for(var t=[],r=0;r<this.node.length;r++){var n=this.node[r],i=document.createElement(e);n.appendChild(i),t.push(i)}return o(t)}css(e,t,r){var n=r;if(null==r&&(r=0),null==t)return this.node[r].style[e];if(null!=n)return this.node[r].style[e]=t,this;for(let r=0;r<this.node.length;r++){this.node[r].style[e]=t}return this}attr(e,t,r){var n=r;if(null==r&&(r=0),null==t)return this.node[r].getAttribute(e);if(null!=n)return this.node[r].style[e]=t,this;for(let r=0;r<this.node.length;r++){this.node[r].setAttribute(e,t)}return this}parent(e){for(var t=[],r=0;r<this.node.length;r++){var n=this.node[r];null==e?t.push(n.parentElement):t.push(n.closest(e))}return o(t)}value(e){if(null!=e){for(var t=0;t<this.node.length;t++){var r=this.node[t];"string"!=typeof e&&"number"!=typeof e||(r.value=e)}return this}this.node[0];return this.node[0].value}keypress(e,t){for(var r=0;r<this.node.length;r++){var n=this.node[r];if(void 0===t)void 0!==e&&n.addEventListener("keypress",e);else if(void 0!==e){var i=n;n.addEventListener("keypress",function(r){if(i.querySelector(t)==r.target){let r=i.querySelector(t);r.prototype.toDo=e,r.toDo()}})}}return this}input(e,t){for(var r=0;r<this.node.length;r++){var n=this.node[r];if(void 0===t)void 0!==e&&n.addEventListener("input",e);else if(void 0!==e){var i=n;n.addEventListener("input",function(r){if(i.querySelector(t)==r.target){let r=i.querySelector(t);r.prototype.toDo=e,r.toDo()}})}}return this}keydown(e,t){for(var r=0;r<this.node.length;r++){var n=this.node[r];if(void 0===t)void 0!==e&&n.addEventListener("keydown",e);else if(void 0!==e){var i=n;n.addEventListener("keydown",function(r){if(i.querySelector(t)==r.target){let r=i.querySelector(t);r.prototype.toDo=e,r.toDo()}})}}return this}change(e,t){for(var r=0;r<this.node.length;r++){var n=this.node[r];if(void 0===t)void 0!==e&&n.addEventListener("change",e);else if(void 0!==e){var i=n;n.addEventListener("change",function(r){if(i.querySelector(t)==r.target){let r=i.querySelector(t);r.prototype.toDo=e,r.toDo()}})}}return this}keyup(e,t){for(var r=0;r<this.node.length;r++){var n=this.node[r];if(void 0===t)void 0!==e&&n.addEventListener("keyup",e);else if(void 0!==e){var i=n;n.addEventListener("keyup",function(r){if(i.querySelector(t)==r.target){let r=i.querySelector(t);r.prototype.toDo=e,r.toDo()}})}}return this}prevSibling(){let e=[];for(var t=0;t<this.node.length;t++){var r=this.node[t];e.push(r.previousSibling)}return o(e)}nextSibling(){let e=[];for(var t=0;t<this.node.length;t++){var r=this.node[t];e.push(r.nextSibling)}return o(e)}appendTo(e){let t=this.get(0);e.get(0).appendChild(t)}count(){return this.node.length}forEach(e){for(let t=0;t<this.node.length;t++){const r=this.node[t];e.bind(r)(t)}return this}cssObj(e){return Object.keys(e).forEach(t=>{this.css(t,e[t])}),this}children(e){return o(this.node[0].querySelectorAll(e))}only(e){return o(this.node[e])}}t.ExtJsObject=i;function o(e,t){return null!=e?new i(e,t):this}t.AR=new class{request(e,t,r,n,i){let o=new XMLHttpRequest;o.onreadystatechange=function(){if(4==o.readyState&&200==o.status)n(o.responseText);else if(4==o.readyState&&null!=i)try{i()}catch(e){}},o.open("GET"==e||"DELETE"==e?"GET":"POST",t,!0);let s="";if(null!=r){let e=Object.keys(r);for(let t=0;t<e.length;t++)0!==t&&(s+="&"),s=s+e[t]+"="+r[e[t]];o.setRequestHeader("Content-type","application/x-www-form-urlencoded")}"PUT"!=e&&"DELETE"!=e||o.setRequestHeader("x-http-method-override",e),""!=s?o.send(s):o.send()}GET(e,t,r){return this.request("GET",e,void 0,t,r)}DELETE(e,t,r){return this.request("DELETE",e,void 0,t,r)}POST(e,t,r,n){return this.request("POST",e,t,r,n)}PUT(e,t,r,n){return this.request("PUT",e,t,r,n)}},t.$=o},13:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e,t,r){this.omega=e,this.events=t,this.search=r}buildCode(){let e=this.omega.text(),t=this.events.text(),r=this.search.text();e=(e=(e=e.replace(/;/g,",")).replace(/\(/g,"[")).replace(/\)/g,"]");let n=t.split(/\r\n|\n|\r/);return t="",n.forEach(e=>{if(""==e.trim()||e.indexOf("=")<0)return;let r=e.split("="),n=r[0].trim();r.shift();let i=r.join("=").trim().replace(/"/g,"").replace(/[^\<\>]=/g,"==");""!=i.trim()&&(i=(i=(i=(i=(i=(i=(i=(i=i.toLowerCase()).replace(/est\spair/g," %2 == 0")).replace(/est\simpair/g," %2 == 1")).replace(/é/g,"e")).replace(/è/g,"e")).replace(/premier/g,"isPrime")).replace(/ou/g,"||")).replace(/et/g,"&&"),t+=`let ${n} = base.filter(element => ${i});\n`,console.log(i,n))}),n=r.split(/\r\n|\n|\r/),r="",n.forEach(e=>{""!=(e=e.trim())&&(0==e.indexOf("#")?r+=`log(${e}, "${e} = $text");`:r+=`log(JSON.stringify(${e}).replace(/^\\[/g, "").replace(/\\]$/g, "").replace(/\\[/g, "(").replace(/\\]/g, ")"), "${e} = {$text}");`)}),`\n        \n        try {\n            let base = [${e}];\n            function isPrime(input) {\n                let prime = true;\n                for (let i = 2; i <= Math.sqrt(input); i++) {\n                    if (input % i == 0) {\n                        prime = false;\n                        break;\n                    }\n                }\n                return prime && (input > 1);\n            }\n            ${t}\n            ${r}\n        } catch (error) {\n            log(error);\n        }\n        `}}}});