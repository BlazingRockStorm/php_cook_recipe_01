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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
/******/ })
/************************************************************************/
/******/ ({

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(48);


/***/ }),

/***/ 48:
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//forms
;(function ($) {
	$.fn.forms = function (o) {
		return this.each(function () {
			var th = $(this),
			    _ = th.data('forms') || {
				errorCl: 'error',
				emptyCl: 'empty',
				invalidCl: 'invalid',
				notRequiredCl: 'notRequired',
				successCl: 'success',
				successShow: '4000',
				mailHandlerURL: '#',
				ownerEmail: '#',
				stripHTML: true,
				smtpMailServer: 'localhost',
				targets: 'input,textarea',
				controls: 'a[data-type=reset],a[data-type=submit]',
				validate: true,
				rx: {
					".name": { rx: /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/, target: 'input' },
					".state": { rx: /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/, target: 'input' },
					".email": { rx: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i, target: 'input' },
					".phone": { rx: /^\+?(\d[\d\-\+\(\) ]{5,}\d$)/, target: 'input' },
					".fax": { rx: /^\+?(\d[\d\-\+\(\) ]{5,}\d$)/, target: 'input' },
					".message": { rx: /.{20}/, target: 'textarea' }
				},
				preFu: function preFu() {
					_.labels.each(function () {
						var label = $(this),
						    inp = $(_.targets, this),
						    defVal = inp.val(),
						    trueVal = function () {
							var tmp = inp.is('input') ? (tmp = label.html().match(/value=['"](.+?)['"].+/), !!tmp && !!tmp[1] && tmp[1]) : inp.html();
							return defVal == '' ? defVal : tmp;
						}();
						trueVal != defVal && inp.val(defVal = trueVal || defVal);
						label.data({ defVal: defVal });
						inp.bind('focus', function () {
							inp.val() == defVal && (inp.val(''), _.hideEmptyFu(label), label.removeClass(_.invalidCl));
						}).bind('blur', function () {
							_.validateFu(label);
							if (_.isEmpty(label)) inp.val(defVal), _.hideErrorFu(label.removeClass(_.invalidCl));
						}).bind('keyup', function () {
							label.hasClass(_.invalidCl) && _.validateFu(label);
						});
						label.find('.' + _.errorCl + ',.' + _.emptyCl).css({ display: 'block' }).hide();
					});
					_.success = $('.' + _.successCl, _.form).hide();
				},
				isRequired: function isRequired(el) {
					return !el.hasClass(_.notRequiredCl);
				},
				isValid: function isValid(el) {
					var ret = true;
					$.each(_.rx, function (k, d) {
						if (el.is(k)) ret = d.rx.test(el.find(d.target).val());
					});
					return ret;
				},
				isEmpty: function isEmpty(el) {
					var tmp;
					return (tmp = el.find(_.targets).val()) == '' || tmp == el.data('defVal');
				},
				validateFu: function validateFu(el) {
					el.each(function () {
						var th = $(this),
						    req = _.isRequired(th),
						    empty = _.isEmpty(th),
						    valid = _.isValid(th);

						if (empty && req) _.showEmptyFu(th.addClass(_.invalidCl));else _.hideEmptyFu(th.removeClass(_.invalidCl));

						if (!empty) if (valid) _.hideErrorFu(th.removeClass(_.invalidCl));else _.showErrorFu(th.addClass(_.invalidCl));
					});
				},
				getValFromLabel: function getValFromLabel(label) {
					var val = $('input,textarea', label).val(),
					    defVal = label.data('defVal');
					return label.length ? val == defVal ? 'nope' : val : 'nope';
				},
				submitFu: function submitFu() {
					_.validateFu(_.labels);
					if (!_.form.has('.' + _.invalidCl).length) $.ajax({
						type: "POST",
						url: _.mailHandlerURL,
						data: {
							name: _.getValFromLabel($('.name', _.form)),
							email: _.getValFromLabel($('.email', _.form)),
							phone: _.getValFromLabel($('.phone', _.form)),
							fax: _.getValFromLabel($('.fax', _.form)),
							state: _.getValFromLabel($('.state', _.form)),
							message: _.getValFromLabel($('.message', _.form)),
							owner_email: _.ownerEmail,
							stripHTML: _.stripHTML
						},
						success: function success() {
							_.showFu();
						}
					});
				},
				showFu: function showFu() {
					_.success.slideDown(function () {
						setTimeout(function () {
							_.success.slideUp();
							_.form.trigger('reset');
						}, _.successShow);
					});
				},
				controlsFu: function controlsFu() {
					$(_.controls, _.form).each(function () {
						var th = $(this);
						th.bind('click', function () {
							_.form.trigger(th.data('type'));
							return false;
						});
					});
				},
				showErrorFu: function showErrorFu(label) {
					label.find('.' + _.errorCl).slideDown();
				},
				hideErrorFu: function hideErrorFu(label) {
					label.find('.' + _.errorCl).slideUp();
				},
				showEmptyFu: function showEmptyFu(label) {
					label.find('.' + _.emptyCl).slideDown();
					_.hideErrorFu(label);
				},
				hideEmptyFu: function hideEmptyFu(label) {
					label.find('.' + _.emptyCl).slideUp();
				},
				init: function init() {
					_.form = _.me;
					_.labels = $('label', _.form);

					_.preFu();

					_.controlsFu();

					_.form.bind('submit', function () {
						if (_.validate) _.submitFu();else _.form[0].submit();
						return false;
					}).bind('reset', function () {
						_.labels.removeClass(_.invalidCl);
						_.labels.each(function () {
							var th = $(this);
							_.hideErrorFu(th);
							_.hideEmptyFu(th);
						});
					});
					_.form.trigger('reset');
				}
			};
			_.me || _.init(_.me = th.data({ forms: _ }));
			(typeof o === 'undefined' ? 'undefined' : _typeof(o)) == 'object' && $.extend(_, o);
		});
	};
})(jQuery);
$(window).load(function () {
	$('#form').forms({
		ownerEmail: '#'
	});
});

/***/ })

/******/ });