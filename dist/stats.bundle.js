/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Parser = /** @class */ (function () {
    function Parser() {
        this.partials = {};
        this.type = 'parser';
    }
    /**
     * Initialise a parsing task
     * @param {String} expression the expression that has to be parsed
     */
    Parser.prototype.parse = function (expression) {
        var _this = this;
        if (typeof expression == 'number') {
            //@ts-ignore
            expression = expression.toString();
        }
        // 1) We have to check wheter or not the expression is valid
        if (this.check(expression) == false) {
            throw new InvalidExpressionError('Invalid expression given');
        }
        // 2) We convert ...(....) into ...$1 and $1 = ....
        expression = this.prepareExpression(expression);
        // 3) We really parse the expression
        // We transform math functions into valid js code
        expression = expression.replace(/sqrt\$([0-9]+)/i, function (e, $1) { return "Math.pow($" + $1 + ", 0.5)"; });
        /*expression = expression.replace(/derivée\$([0-9]+)/i,
            (e, $1) => `()`);*/
        // We tranform exponants into Math.pow()
        expression = expression.replace(/([\$0-9x]+)\^([\$0-9x]+)/gi, function (e, $1, $2) { return "Math.pow(" + $1 + ", " + $2 + ")"; });
        // We rebuild the complete expression
        expression = expression.replace(/\$([0-9]+)/gi, function (e, $1) { return '(' + _this.parse(_this.partials['$' + $1]) + ')'; });
        expression = this.clean(expression);
        return expression;
    };
    /**
     * Checks if the number of ( is equal to the number of )
     * @param exp the expression to check
     */
    Parser.prototype.check = function (exp) {
        var open_brackets_number = exp.split('(').length;
        var close_brackets_number = exp.split(')').length;
        if (open_brackets_number == close_brackets_number) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * PrepareExpression
     */
    Parser.prototype.prepareExpression = function (exp) {
        var _this = this;
        exp = exp.replace(/²/gi, '^2');
        exp = exp.replace(/³/gi, '^2');
        exp = exp.replace(/X/g, 'x');
        var processed_exp = '';
        var parenthesis_level = 0;
        var buffer = '';
        for (var i = 0; i < exp.length; i++) {
            var char = exp[i];
            var e = '$' + (Object.keys(this.partials).length + 1);
            if (parenthesis_level >= 1) {
                if (char == ')') {
                    parenthesis_level -= 1;
                    if (parenthesis_level == 0) {
                        this.partials[e] = buffer;
                        buffer = '';
                    }
                    else {
                        buffer += char;
                    }
                }
                else {
                    if (char == '(') {
                        parenthesis_level += 1;
                    }
                    buffer += char;
                }
            }
            else {
                if (char == '(') {
                    parenthesis_level += 1;
                    processed_exp += e;
                }
                else {
                    processed_exp += char;
                }
            }
        }
        processed_exp = processed_exp.replace(/([0-9]+)x\^([\$0-9]+)/gi, function (exp, $1, $2) {
            var e = '$' + (Object.keys(_this.partials).length + 1);
            _this.partials[e] = $1 + "*x^" + $2;
            return e;
        });
        processed_exp = processed_exp.replace(/([0-9]+)x/gi, function (exp, $1) {
            var e = '$' + (Object.keys(_this.partials).length + 1);
            _this.partials[e] = $1 + "*x";
            return e;
        });
        return processed_exp;
    };
    Parser.prototype.getComputedValue = function (value) {
        var math = new MathObject();
        if (value.indexOf('dérivée ') == 0) {
            value = math.derivative(value.replace('dérivée ', ''));
        }
        else if (value.indexOf('dérivée_seconde ') == 0) {
            value = math.derivative(math.derivative(value.replace('dérivée_seconde ', '')));
        }
        return value;
    };
    /**
     * Creates a function to run the expression
     */
    Parser.prototype.Functionize = function (exp, parse) {
        if (parse === void 0) { parse = true; }
        if (parse == true) {
            exp = this.parse(exp);
        }
        return new Function('x', "\n            let sin = Math.sin;\n            let tan = Math.tan;\n            let cos = Math.cos;\n            let asin = Math.asin;\n            let atan = Math.atan;\n            let acos = Math.acos;\n\n            let sinh = Math.sinh;\n            let tanh = Math.tanh;\n            let cosh = Math.cosh;\n            let asinh = Math.asinh;\n            let atanh = Math.atanh;\n            let acosh = Math.acosh;\n\n            let ceil = Math.ceil;\n            let floor = Math.floor;\n            let abs = Math.abs;\n            let exp = Math.exp;\n            let log = Math.log;\n            \n            let e = Math.E;\n            let pi = Math.PI;\n            \n            return " + exp + ";\n            \n            ");
    };
    /**
     * CleanUp
     */
    Parser.prototype.clean = function (expression) {
        var _this = this;
        var pattern = /\(([0-9x]+)\)/gi;
        while (pattern.test(expression)) {
            expression = expression.replace(pattern, function (e, $1) { return $1; });
        }
        expression = expression.replace(/\*([0-9])/gi, function (e, $1) { return ($1 == 1 ? '' : e); });
        expression = expression.replace(/\^([0-9])/gi, function (e, $1) { return ($1 == 1 ? '' : e); });
        expression = expression.replace(/\$([0-9]+)/g, function (e) {
            return "(" + _this.partials[e] + ")";
        });
        return expression;
    };
    return Parser;
}());
exports.default = Parser;
var InvalidExpressionError = /** @class */ (function (_super) {
    __extends(InvalidExpressionError, _super);
    function InvalidExpressionError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'IE';
        return _this;
    }
    return InvalidExpressionError;
}(Error));
exports.InvalidExpressionError = InvalidExpressionError;
var MathObject = /** @class */ (function (_super) {
    __extends(MathObject, _super);
    function MathObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ce = '';
        _this.type = 'MathObject';
        return _this;
    }
    MathObject.prototype.derivative = function (expression) {
        var _this = this;
        // 1) We have to check wheter or not the expression is valid
        if (this.check(expression) == false) {
            throw new InvalidExpressionError('Invalid expression given');
        }
        // 2) We convert ...(....) into ...$1 and $1 = ....
        expression = this.prepareExpression(expression);
        // 3) Wa have to split the expression into small pieces and check step by step
        if (expression.indexOf('+') >= 0) {
            var spl = expression.split('+');
            expression = '';
            spl.forEach(function (s) { return (expression += _this.derivative(s) + "+"); });
            if (expression[expression.length - 1] == '+')
                expression = expression.slice(0, -1);
            if (!isNaN(this.Functionize(expression)(NaN)))
                return this.Functionize(expression)(NaN);
            expression = this.clean(expression);
            return expression;
        }
        if (expression.indexOf('-') >= 0) {
            var spl = expression.split('-');
            expression = '';
            spl.forEach(function (s) { return (expression += _this.derivative(s) + "-"); });
            if (expression[expression.length - 1] == '-')
                expression = expression.slice(0, -1);
            if (!isNaN(this.Functionize(expression)(NaN)))
                return this.Functionize(expression)(NaN);
            expression = this.clean(expression);
            return expression;
        }
        if (expression.indexOf('*') >= 0) {
            var spl_1 = expression.split('*').sort();
            expression = '';
            spl_1.forEach(function (s, i) {
                var others = _this.getAllExpect(spl_1, i);
                var join = others.join('*');
                var derivative = _this.derivative(s);
                if (others.indexOf('0') >= 0)
                    return;
                if (_this.Functionize(join)(NaN) == 0)
                    return;
                if (_this.Functionize(derivative)(NaN) == 0)
                    return;
                expression += derivative + "*" + others.join('*') + "+";
            });
            if (expression[expression.length - 1] == '+')
                expression = expression.slice(0, -1);
            if (!isNaN(this.Functionize(expression)(NaN)))
                return this.Functionize(expression)(NaN);
            expression = this.clean(expression);
            return expression;
        }
        if (expression.indexOf('/') >= 0) {
            var spl = expression.split('/');
            var spl_copy = spl.slice();
            spl_copy.shift();
            var bottom = "(" + spl_copy.join(')*(') + ")";
            var top_1 = "(" + this.derivative(spl[0]) + ")*" + bottom + "-" + this.derivative(bottom) + "*(" + spl[0] + ")";
            expression = "(" + top_1 + ")/((" + bottom + ")^2)";
            if (!isNaN(this.Functionize(expression)(NaN)))
                return this.Functionize(expression)(NaN);
            expression = this.clean(expression);
            return expression;
        }
        //@ts-ignore
        if (!isNaN(expression)) {
            // Derivative of a number is always equal to 0
            return '0';
        }
        else if (expression == 'x') {
            // Derivative of x is always equal to 1
            return 1;
        }
        else if (expression.indexOf('^') >= 1) {
            // Derivative of x^n is equal to n(x)^(n-1) * (x)'
            var parts = expression.split('^');
            return this.clean(parts[1] + "*" + parts[0] + "^(" + (!isNaN(this.Functionize(parts[1] + '-1')(NaN))
                ? this.Functionize(parts[1] + '-1')(NaN)
                : parts[1] + '-1') + ")*(" + this.derivative(parts[0]) + ")");
        }
        else if (/^\$([0-9]+)$/.test(expression) == true) {
            // This replaces $.. into the expression
            var part = this.partials[expression];
            if (/^\$([0-9]+)$/.test(part))
                return "(" + this.derivative(this.partials[part]) + ")";
            else
                return "(" + this.derivative(part) + ")";
        }
        else if (/^sin\$([0-9]+)$/.test(expression) == true) {
            var partial = expression.replace('sin', '');
            return this.clean("cos(" + this.partials[partial] + ")*(" + this.derivative(this.partials[partial]) + ")");
        }
        else if (/^cos\$([0-9]+)$/.test(expression) == true) {
            var partial = expression.replace('cos', '');
            return this.clean("-sin(" + this.partials[partial] + ")*(" + this.derivative(this.partials[partial]) + ")");
        }
        else {
            console.log(expression);
            throw new Error('Something went wrong width ');
        }
    };
    MathObject.prototype.getAllExpect = function (array, i) {
        var res = [];
        array.forEach(function (e, index) {
            if (index != i) {
                res.push(e);
            }
        });
        return res;
    };
    MathObject.prototype.getDomF = function (expression, clear) {
        var _this = this;
        if (clear === void 0) { clear = true; }
        if (clear == true) {
            this.ce = '';
        }
        // 1) We have to check wheter or not the expression is valid
        if (this.check(expression) == false) {
            throw new InvalidExpressionError('Invalid expression given');
        }
        // 2) We convert ...(....) into ...$1 and $1 = ....
        expression = this.prepareExpression(expression);
        if (expression.indexOf('+') >= 0) {
            var spl = expression.split('+');
            spl.forEach(function (s) { return _this.getDomF(s, false); });
            return this.realGetDomF();
        }
        if (expression.indexOf('-') >= 0) {
            var spl = expression.split('-');
            spl.forEach(function (s) { return _this.getDomF(s, false); });
            return this.realGetDomF();
        }
        if (expression.indexOf('*') >= 0) {
            var spl = expression.split('*');
            spl.forEach(function (s) { return _this.getDomF(s, false); });
            return this.realGetDomF();
        }
        if (expression.indexOf('/') >= 0) {
            var spl = expression.split('/');
            var spl_copy = spl.slice();
            spl_copy.shift();
            var bottom = "(" + spl_copy.join(')*(') + ")";
            this.ce += '\n' + this.clean(bottom) + ' != 0';
            this.getDomF(bottom, false);
            return this.realGetDomF();
        }
        if (/^\$([0-9]+)$/.test(expression) == true) {
            var part = this.partials[expression];
            this.getDomF(part, false);
            return this.realGetDomF();
        }
        return this.realGetDomF();
    };
    MathObject.prototype.realGetDomF = function () {
        if (this.ce.trim() == '') {
            return 'R';
        }
        else {
            return 'CE: ' + this.ce;
        }
    };
    return MathObject;
}(Parser));
exports.MathObject = MathObject;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(3);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var canvas = /** @class */ (function () {
    function canvas(canvas) {
        var _this = this;
        this.center_x = 0;
        this.center_y = 0;
        this.x_unit = 50;
        this.y_unit = 50;
        this.stored = {};
        this.pathes = {};
        canvas.height = canvas.scrollHeight;
        canvas.width = canvas.scrollWidth;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.init();
        var start;
        var down = false;
        //When the user starts an action on the canvas.
        canvas.addEventListener('mousedown', function (e) {
            down = true;
            start = { x: e.pageX, y: e.pageY };
            canvas.style.cursor = 'grabbing';
        });
        canvas.addEventListener('touchstart', function (e) {
            down = true;
            start = {
                x: e.touches.item(0).clientX,
                y: e.touches.item(0).clientY
            };
        });
        // When the user moves on the surface of the canvas.
        canvas.addEventListener('mousemove', function (e) {
            if (down == true) {
                var new_start = { x: e.pageX, y: e.pageY };
                var old = start;
                var drawn = _this.move(old, new_start);
                if (drawn) {
                    start = new_start;
                }
            }
        });
        canvas.addEventListener('touchmove', function (e) {
            e.preventDefault();
            if (down == true) {
                var new_start = {
                    x: e.touches.item(0).clientX,
                    y: e.touches.item(0).clientY
                };
                var old = start;
                var drawn = _this.move(old, new_start);
                if (drawn) {
                    start = new_start;
                }
            }
        });
        //When the user stops clicking on teh surface
        canvas.addEventListener('mouseup', function (e) {
            down = false;
            canvas.style.cursor = 'grab';
        });
        canvas.addEventListener('touchend', function (e) {
            down = false;
        });
        window.addEventListener('resize', function (e) {
            _this.reload();
        });
        canvas.addEventListener('mousewheel', function (e) {
            var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
            _this.zoom(delta);
        });
        canvas.addEventListener('DOMMouseScroll', function (e) {
            var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
            _this.zoom(delta);
        });
    }
    canvas.prototype.zoom = function (delta) {
        if (this.x_unit + delta * 10 > 10) {
            this.x_unit += delta * 10;
        }
        if (this.y_unit + delta * 10 > 10) {
            this.y_unit += delta * 10;
        }
        this.reload();
    };
    canvas.prototype.init = function () {
        this.canvas.height = this.canvas.scrollHeight;
        this.canvas.width = this.canvas.scrollWidth;
        this.draw();
    };
    canvas.prototype.draw = function () {
        this.drawGrid();
    };
    canvas.prototype.drawGrid = function () {
        var max = Math.max(this.canvas.height, this.canvas.width);
        max = max / Math.min(this.x_unit, this.y_unit);
        // Clears the view
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.fillStyle = '#fafafa';
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fill();
        this.ctx.closePath();
        var to = Math.floor(this.center_x + max);
        var xpos = Math.floor(this.center_x - max);
        while (xpos < to) {
            this.drawLine(this.getRelativePositionX(xpos), this.getRelativePositionY(Math.floor(this.center_y + max)), this.getRelativePositionX(xpos), this.getRelativePositionY(Math.floor(this.center_y - max)), Math.floor(xpos) == 0 ? 'black' : undefined);
            this.ctx.beginPath();
            this.ctx.font = '15px Sans Serif';
            this.ctx.fillStyle = 'gray';
            this.ctx.fillText(xpos.toString(), this.getRelativePositionX(xpos), this.getRelativePositionY(0) + 15);
            this.ctx.closePath();
            xpos++;
        }
        to = Math.floor(this.center_y + max);
        var ypos = Math.floor(this.center_y - max);
        while (ypos < to) {
            this.drawLine(this.getRelativePositionX(Math.floor(this.center_x + max)), this.getRelativePositionY(ypos), this.getRelativePositionX(Math.floor(this.center_x - max)), this.getRelativePositionY(ypos), Math.floor(ypos) == 0 ? 'black' : undefined);
            this.ctx.beginPath();
            this.ctx.font = '15px Sans Serif';
            this.ctx.fillStyle = 'gray';
            this.ctx.fillText(ypos.toString(), this.getRelativePositionX(0) -
                ypos.toString().length * 15 / 2 -
                5, this.getRelativePositionY(ypos));
            this.ctx.closePath();
            ypos++;
        }
        // The program will be able to trace points
        // this.point(this.getRelativePositionX(0), this.getRelativePositionY(0));
    };
    canvas.prototype.move = function (previous, now) {
        var diff_x = previous.x - now.x;
        var diff_y = previous.y - now.y;
        if (Math.sqrt(Math.pow(diff_x, 2) + Math.pow(diff_y, 2)) > 10) {
            this.center_x += diff_x / this.x_unit;
            this.center_y -= diff_y / this.y_unit;
            this.reload();
            return true;
        }
    };
    canvas.prototype.drawLine = function (x, y, x2, y2, color, width) {
        this.ctx.beginPath();
        if (color == undefined) {
            this.ctx.strokeStyle = '#eee';
        }
        else {
            this.ctx.strokeStyle = color;
        }
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x2, y2);
        if (width == undefined) {
            this.ctx.lineWidth = 1;
        }
        else {
            this.ctx.lineWidth = width;
        }
        this.ctx.stroke();
    };
    canvas.prototype.getRelativePositionX = function (point) {
        return (this.canvas.width / 2 +
            point * this.x_unit -
            this.center_x * this.x_unit);
    };
    canvas.prototype.getRelativePositionY = function (point) {
        return (this.canvas.height / 2 -
            point * this.y_unit +
            this.center_y * this.y_unit);
    };
    canvas.prototype.drawFromFunc = function (func, color, isPreview) {
        if (color === void 0) { color = undefined; }
        if (isPreview === void 0) { isPreview = false; }
        if (!color) {
            var letters = '0123456789ABCDEF';
            color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
        }
        var display_size = this.canvas.width / 2 / this.x_unit;
        var x = this.center_x - display_size;
        var last = undefined;
        var label = func;
        var was_defined = true;
        if (this.pathes[label] == undefined) {
            this.pathes[label] = {};
            was_defined = false;
        }
        while (x < this.center_x + display_size) {
            var pos = void 0;
            var new_y = void 0;
            var new_x = void 0;
            if (was_defined == true && this.pathes[label][x] != undefined) {
                new_y = this.getRelativePositionY(this.pathes[label][x]);
                new_x = this.getRelativePositionX(x);
            }
            else {
                pos = this.getFor(x, func, label);
                this.pathes[label][x] = pos;
                new_y = this.getRelativePositionY(pos);
                new_x = this.getRelativePositionX(x);
            }
            if (last != undefined) {
                this.drawLine(new_x, new_y, last.x, last.y, color, 2);
            }
            last = {
                x: new_x,
                y: new_y
            };
            if (isPreview == true) {
                x += 0.5;
            }
            else {
                x += 0.05;
            }
            //x+= this.x_unit /500;
        }
        return color;
    };
    canvas.prototype.getFor = function (start, func, label) {
        if (this.stored[label] == undefined) {
            this.stored[label] = {};
        }
        if (this.stored[label][start] != undefined) {
            return this.stored[label][start];
        }
        else {
            this.stored[label][start] = func(start);
            return this.stored[label][start];
        }
    };
    canvas.prototype.reload = function (fdata) {
        var _this = this;
        if (fdata != undefined) {
            this.funcs = fdata;
        }
        this.init();
        var data = Object.keys(this.fdata);
        requestAnimationFrame(function () {
            data.forEach(function (key) {
                if (_this.fdata[key].visible == true) {
                    _this.drawFromFunc(_this.fdata[key].array, _this.fdata[key].color);
                }
            });
        });
    };
    canvas.prototype.point = function (x, y) {
        x = this.getRelativePositionX(x);
        y = this.getRelativePositionX(y);
        this.ctx.beginPath();
        this.ctx.arc(x, y, 5, 0, 2 * Math.PI, true);
        this.ctx.fill();
    };
    Object.defineProperty(canvas.prototype, "funcs", {
        set: function (fdata) {
            this.fdata = fdata;
        },
        enumerable: true,
        configurable: true
    });
    return canvas;
}());
exports.default = canvas;


/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(16);
var canvas_1 = __webpack_require__(11);
var parser_v2_1 = __webpack_require__(0);
var canvas = new canvas_1.default(document.querySelector('canvas'));
var parser = new parser_v2_1.default();
canvas.init();
canvas.funcs = {};
/*canvas.funcs = {
    visible: true,
    color: color,
    array: func,
    exp: value,
    initial: initial
};
canvas.drawFromFunc(parser.Functionize('x^2', true));*/


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(17);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./stats.scss", function() {
		var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./stats.scss");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "canvas {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  height: 50vh;\n  width: 100%; }\n\n.container {\n  position: fixed;\n  top: 50vh;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background: #eee;\n  overflow: auto; }\n", ""]);

// exports


/***/ })
/******/ ]);