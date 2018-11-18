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
/******/ 	return __webpack_require__(__webpack_require__.s = 49);
/******/ })
/************************************************************************/
/******/ ({

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(50);


/***/ }),

/***/ 50:
/***/ (function(module, exports) {

;(function ($) {
	function init(form, o) {
		var name = $('.name>input', form),
		    email = $('.email>input', form),
		    submit = $('a[data-type="submit"]', form),
		    msg_success = $('.success', form).hide(),
		    bl,
		    vl;

		o = $.extend({
			ownerEmail: '#',
			mailHandlerURL: '#'
		}, o);

		submit.click(function () {
			vl = true;
			name.add(email).trigger('keyup');
			if (!$('.invalid', form).length) sendRQ();
			return false;
		});

		form[form.on ? 'on' : 'bind']('keyup', function (e) {
			if (e.keyCode === 13) {
				name.add(email).data({ wtch: true }).trigger('keyup');
				if (!$('.invalid', form).length) {
					sendRQ();
					return false;
				} else {
					$('.invalid', form).focus();
				}
			}
		});

		name.add(email).data({ wtch: true }).each(function () {
			var th = $(this),
			    val = th.val();
			th.data({ defVal: val }).focus(function () {
				if (th.val() == val) th.val(''), th.parents('label').removeClass('invalid'), th.data({ wtch: false });
			}).blur(function () {
				if (th.val() == '') th.val(val);
				//,th.parents('label').removeClass('invalid')
				//else
				th.data({ wtch: true }).trigger('keyup');
			});
		})[name.on ? 'on' : 'bind']('keyup', function (e) {
			var th = $(this);
			if (th.data('wtch')) th.parents('label')[validate(th) ? 'removeClass' : 'addClass']('invalid');
		});

		function validate(el) {
			var rx = {
				"text": /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/,
				"email": /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
			},
			    val = el.val();
			return rx[el.attr('type')].test(val) && val !== el.data('defVal');
		}

		function sendRQ() {
			if (bl) return false;
			bl = true;
			$.ajax({
				type: "POST",
				url: o.mailHandlerURL,
				data: {
					name: name.length ? name.val() : email.val().split('@')[0],
					email: email.val(),
					owner_email: o.ownerEmail,
					sitename: o.sitename || o.ownerEmail.split('@')[1]
				},
				success: function success(e) {
					bl = false;
					msg_success.slideDown(400, function () {
						submit.focus();
						form.trigger('reset');
						name.add(email).data({ wtch: true });
						setTimeout(function () {
							msg_success.fadeOut(400);
						}, 1000);
					});
				}
			});
		}
	}

	$.fn.sForm = function (o) {
		return this.each(function () {
			init($(this), o);
		});
	};
})(jQuery);
$(window).load(function () {
	$('#newsletter').sForm({
		ownerEmail: '#',
		sitename: 'sitename.link'
	});
});

/***/ })

/******/ });