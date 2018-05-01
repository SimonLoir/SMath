!function(t){function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}var e={};n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=14)}({14:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(3),r=new i.default;new i.MathObject;["1","x","x+1","x-1","-x-1","((x-1))","2x","2*2x","x²","x^3","2*x²","(2x)^2","1/x","1/x/x","sin(x)","sin(1/x)","sin(x^2)","log(2, x)","sin(x)*x+x*(x²+6x+3*x-2x/x)*10"].forEach(function(t){console.log("=> Tokenize "+t,r.tokenize(t)),document.body.innerText+="\n    "+t+" =>  "+JSON.stringify(r.tokenize(t),null,"    ")+"\n    "}),console.log(r.parse("(sqrt(x²+6x+3)+6x+33)/2"),new Function("x","return "+r.parse("(sqrt(x²+6x+3)+6x+33)/2"))(0))},3:function(t,n,e){"use strict";var i=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])};return function(n,e){function i(){this.constructor=n}t(n,e),n.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}}();Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function t(){this.partials={},this.type="parser",this.math_func=["sin","tan","cos","asin","atan","acos","sinh","tanh","cosh","asinh","atanh","acosh","ceil","floor","abs","exp","ln","log","pow"]}return t.prototype.parse=function(t){var n=this;if("number"==typeof t&&(t=t.toString()),0==this.check(t))throw new o("Invalid expression given");return t=this.prepareExpression(t),t=t.replace(/sqrt\$([0-9]+)/i,function(t,n){return"Math.pow($"+n+", 0.5)"}),t=t.replace(/([\$0-9x]+)\^([\$0-9x]+)/gi,function(t,n,e){return"Math.pow("+n+", "+e+")"}),t=t.replace(/\$([0-9]+)/gi,function(t,e){return n.clean("("+n.parse(n.partials["$"+e])+")")}),t=this.clean(t)},t.prototype.check=function(t){return t.split("(").length==t.split(")").length},t.prototype.prepareExpression=function(t){var n=this;t=t.replace(/²/gi,"^2"),t=t.replace(/³/gi,"^2"),t=t.replace(/X/g,"x");for(var e="",i=0,r="",o=0;o<t.length;o++){var a=t[o],s="$"+(Object.keys(this.partials).length+1);i>=1?")"==a?(i-=1,0==i?(this.partials[s]=r,r=""):r+=a):("("==a&&(i+=1),r+=a):"("==a?(i+=1,e+=s):e+=a}return e=e.replace(/([0-9\.]+)x\^([\$0-9\.]+)/gi,function(t,e,i){var r="$"+(Object.keys(n.partials).length+1);return n.partials[r]=e+"*x^"+i,r}),e=e.replace(/([0-9\.]+)x/gi,function(t,e){var i="$"+(Object.keys(n.partials).length+1);return n.partials[i]=e+"*x",i})},t.prototype.getComputedValue=function(t){var n=new a;return 0==t.indexOf("dérivée ")?t=n.derivative(t.replace("dérivée ","")):0==t.indexOf("dérivée_seconde ")&&(t=n.derivative(n.derivative(t.replace("dérivée_seconde ","")))),t},t.prototype.Functionize=function(t,n){return void 0===n&&(n=!0),1==n&&(t=this.parse(t)),new Function("x","funcs","\n            const sin = Math.sin;\n            const tan = Math.tan;\n            const cos = Math.cos;\n            const asin = Math.asin;\n            const atan = Math.atan;\n            const acos = Math.acos;\n\n            const sinh = Math.sinh;\n            const tanh = Math.tanh;\n            const cosh = Math.cosh;\n            const asinh = Math.asinh;\n            const atanh = Math.atanh;\n            const acosh = Math.acosh;\n\n            const ceil = Math.ceil;\n            const floor = Math.floor;\n            const abs = Math.abs;\n            const exp = Math.exp; \n            const ln = Math.log;\n            const log = function (base, y) { return Math.log(y) / Math.log(base)};\n\n            const e = Math.E;\n            const pi = Math.PI;\n            \n            return "+this.FunctionizeCalls(t)+";\n            \n            ")},t.prototype.FunctionizeCalls=function(t){var n=this;return console.log(t),t.replace(/([a-z]+)([1-9]*)\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/g,function(t,e,i,r){return console.log(e),n.math_func.indexOf(e)>=0?e+i+"("+n.FunctionizeCalls(r)+")":"funcs."+(e+i)+".array("+n.FunctionizeCalls(r)+", funcs)"})},t.prototype.clean=function(t){for(var n=this,e=/([^a-z\/])\(([0-9x]+)\)/gi;e.test(t);)t=t.replace(e,function(t,n,e){return n+e});return t=t.replace(/\*([0-9])/gi,function(t,n){return 1==n?"":t}),t=t.replace(/\^([0-9])/gi,function(t,n){return 1==n?"":t}),t=t.replace(/\$([0-9]+)/g,function(t){return"("+n.partials[t]+")"})},t.prototype.tokenize=function(t){var n=this;if("number"==typeof t&&(t=t.toString()),0==this.check(t))throw new o("Invalid expression given");t=this.prepareExpression(t);var e=function(t,n){for(var e=["sin","tan","cos","asin","atan","acos","cos","sinh","tanh","cosh","asinh","atanh","acosh","cosh","ceil","floor","abs","exp","ln","log","sqrt"],i=0;i<e.length;i++){var r=e[i];if(0==t.indexOf(r))return 1!=n||r}return!1};if(t=t.trim(),isNaN(t)){if("x"==t)return{type:"variable",value:"x"};if(t.indexOf("+")>=0){var i=t.split("+"),r=[];return i.forEach(function(t){r.push(n.tokenize(t))}),{type:"plus",value:r}}if(t.indexOf("-")>=0){var i=t.split("-"),a=[];return i.forEach(function(t,e){t=t.trim(),0==e&&""==t?a.push(n.tokenize(0)):a.push(n.tokenize(t))}),{type:"minus",value:a}}if(t.indexOf("*")>=0){var i=t.split("*"),s=[];return i.forEach(function(t){s.push(n.tokenize(t))}),{type:"times",value:s}}if(t.indexOf("/")>=0){var i=t.split("/");return{type:"over",value:[this.tokenize(i[0]),this.tokenize("("+function(t){return t.shift(),t}(i).join(")*(")+")")]}}if(1==/^\$([0-9]+)$/.test(t))return this.tokenize(this.partials[t]);if(t.indexOf("^")>0){var c=t.split("^");if(2==c.length)return{type:"power",value:[this.tokenize(c[0]),this.tokenize(c[1])]};throw new Error("Unexpected expression")}if(1==e(t)){var u=e(t,!0);return{type:"function",value:u,args:this.tokenize(t.replace(u,""))}}if(t.indexOf(",")>=0){var c=t.split(",");return c.map(function(t){return n.tokenize(t)})}throw new Error("Could not parse expression "+t)}return{type:"number",value:t}},t}();n.default=r;var o=function(t){function n(){var n=null!==t&&t.apply(this,arguments)||this;return n.type="IE",n}return i(n,t),n}(Error);n.InvalidExpressionError=o;var a=function(t){function n(){var n=null!==t&&t.apply(this,arguments)||this;return n.ce=[],n.type="MathObject",n}return i(n,t),n.prototype.derivative=function(t){var n=this;if(0==this.check(t))throw new o("Invalid expression given");if(t=this.prepareExpression(t),t.indexOf("+")>=0){var e=t.split("+");return t="",(e.forEach(function(e){return t+=n.derivative(e)+"+"}),"+"==t[t.length-1]&&(t=t.slice(0,-1)),isNaN(this.Functionize(t)(NaN)))?t=this.clean(t):this.Functionize(t)(NaN)}if(t.indexOf("-")>=0){var e=t.split("-");return t="",(e.forEach(function(e){return t+=n.derivative(e)+"-"}),"-"==t[t.length-1]&&(t=t.slice(0,-1)),isNaN(this.Functionize(t)(NaN)))?t=this.clean(t):this.Functionize(t)(NaN)}if(t.indexOf("*")>=0){var i=t.split("*").sort();return t="",(i.forEach(function(e,r){var o=n.getAllExpect(i,r),a=o.join("*"),s=n.derivative(e);o.indexOf("0")>=0||0!=n.Functionize(a)(NaN)&&0!=n.Functionize(s)(NaN)&&(t+=s+"*"+o.join("*")+"+")}),"+"==t[t.length-1]&&(t=t.slice(0,-1)),isNaN(this.Functionize(t)(NaN)))?t=this.clean(t):this.Functionize(t)(NaN)}if(t.indexOf("/")>=0){var e=t.split("/"),r=e.slice();r.shift();var a="("+r.join(")*(")+")",s="("+this.derivative(e[0])+")*"+a+"-"+this.derivative(a)+"*("+e[0]+")";return t="("+s+")/(("+a+")^2)",isNaN(this.Functionize(t)(NaN))?t=this.clean(t):this.Functionize(t)(NaN)}if(isNaN(t)){if("x"==t)return 1;if(t.indexOf("^")>=1){var c=t.split("^");return this.clean(c[1]+"*"+c[0]+"^("+(isNaN(this.Functionize(c[1]+"-1")(NaN))?c[1]+"-1":this.Functionize(c[1]+"-1")(NaN))+")*("+this.derivative(c[0])+")")}if(1==/^\$([0-9]+)$/.test(t)){var u=this.partials[t];return/^\$([0-9]+)$/.test(u)?"("+this.derivative(this.partials[u])+")":"("+this.derivative(u)+")"}if(1==/^sin\$([0-9]+)$/.test(t)){var h=t.replace("sin","");return this.clean("cos("+this.partials[h]+")*("+this.derivative(this.partials[h])+")")}if(1==/^cos\$([0-9]+)$/.test(t)){var h=t.replace("cos","");return this.clean("-sin("+this.partials[h]+")*("+this.derivative(this.partials[h])+")")}throw console.log(t),new Error("Something went wrong width ")}return"0"},n.prototype.getAllExpect=function(t,n){var e=[];return t.forEach(function(t,i){i!=n&&e.push(t)}),e},n.prototype.getDomF=function(t,n){var e=this;if(void 0===n&&(n=!0),1==n&&(this.ce=[]),"plus"===t.type||"minus"===t.type||"times"===t.type){t.value.forEach(function(t){e.getDomF(t)})}else"over"==t.type?this.ce.push(JSON.stringify(t.value[1])+" not null"):"function"==t.type&&"sqrt"==t.value&&this.ce.push(JSON.stringify(t.args)+">=0");if(!0===n)return 0===this.ce.length?"R":"ce : "+this.ce.join("\n")},n}(r);n.MathObject=a}});