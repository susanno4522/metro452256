/* Update on: 26/01/2018 11:08:47 Metrofood */
"use strict";

jQuery.extend(jQuery.easing, {
	easeInOutQuad: function easeInOutQuad(x, t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * (--t * (t - 2) - 1) + b;
	}
});

$.fn.panDown = function (callback) {
	var _this = this;

	this.show();
	this.removeClass("anim--panUp").addClass("anim--panDown");

	this.css("pointer-events", "none");

	this.off("animationend").on("animationend", function (event) {
		if (event.originalEvent.animationName == "panDown") {
			_this.css("pointer-events", "all");

			if (typeof callback == "function") {
				callback.call(_this, event);
			}
		}
	});

	return this;
};

$.fn.panUp = function (callback) {
	var _this2 = this;

	this.removeClass("anim--panDown").addClass("anim--panUp");

	this.css("pointer-events", "none");

	this.on("animationend", function (event) {
		if (event.originalEvent.animationName == "panUp") {
			_this2.css("pointer-events", "all");

			_this2.hide().removeClass("anim--panUp").off("animationend");

			if (typeof callback == "function") {
				callback.call(_this2, event);
			}
		}
	});

	return this;
};

$.fn.showScale = function (callback) {
	var _this3 = this;

	this.show();
	this.removeClass("anim--hideScale").addClass("anim--showScale");

	this.css("pointer-events", "none");

	this.off("animationend").on("animationend", function (event) {
		if (event.originalEvent.animationName == "showScale") {
			_this3.css("pointer-events", "all");

			if (typeof callback == "function") {
				callback.call(_this3, event);
			}
		}
	});

	return this;
};

$.fn.hideScale = function (callback) {
	var _this4 = this;

	this.removeClass("anim--showScale").addClass("anim--hideScale");

	this.css("pointer-events", "none");

	this.on("animationend", function (event) {
		if (event.originalEvent.animationName == "hideScale") {
			_this4.css("pointer-events", "all");

			_this4.hide().removeClass("anim--hideScale").off("animationend");

			if (typeof callback == "function") {
				callback.call(_this4, event);
			}
		}
	});

	return this;
};

function actionModifier(action, $elements, modifiers, block) {
	if (typeof modifiers == "undefined" || modifiers == "") return $elements;

	var isUndefinedBlock = typeof block == "undefined";
	action += "Class";

	return $elements.each(function (index, element) {
		if (isUndefinedBlock) block = element.className.split(" ")[0];else block = block.replace(/\./g, "");

		var modifierClasses = modifiers.split(" ").map(function (modifier) {
			return block + "--" + modifier;
		}).join(" ");

		$(element)[action](modifierClasses);
	});
}

$.fn.addModifier = function (modifiers, block) {
	return actionModifier("add", this, modifiers, block);
};

$.fn.removeModifier = function (modifiers, block) {
	return actionModifier("remove", this, modifiers, block);
};

$.fn.toggleModifier = function (modifiers, block) {
	return actionModifier("toggle", this, modifiers, block);
};

$.fn.hasModifier = function (modifier, block) {
	if (typeof modifier == "undefined" || modifier == "") return false;

	var result = false;

	this.each(function (index, element) {
		if (typeof block == "undefined") block = element.className.split(" ")[0];else block = block.replace(/\./g, "");

		result = $(element).hasClass(block + "--" + modifier);

		return !result;
	});

	return result;
};

$.fn.showFlex = function () {
	if (!this.length) {
		return;
	}

	var dispValue = ['flex', '-webkit-flex', '-webkit-box', '-moz-box', '-ms-flexbox'];

	this.get().forEach(function (elem) {
		dispValue.some(function (value) {
			elem.style.display = value;

			if (window.getComputedStyle(elem, null).display === value) {
				return true;
			}
		});
	});

	return this;
};

function showOverlay(element, data) {
	element = $(element);
	var id = element.attr("id");

	element.fadeIn(250, "easeInOutQuad").showFlex();

	$("html").addClass("scroll-lock");
	$("body").addClass("overlay-open  scroll-lock");
	$(window).trigger("showOverlay", [id, data]);
}

function hideOverlay(element, callback) {
	element = $(element);
	var id = element.attr("id");

	callback = callback || function () {};

	element.fadeOut(timeFx, easing, callback);
	$("html").removeClass("scroll-lock");
	$("body").removeClass("overlay-open  scroll-lock");
	$(window).trigger("hideOverlay", id);
}

function lessThan(number1, number2) {
	return (number1 - number2) / Math.abs(number1 - number2) == -1;
}

function storeSelection() {

	var wongActiveStores = ["Barranco", "Miraflores", "Surquillo"];

	var setStoreLocality = function setStoreLocality(storeLocality) {
		Fizzmod.Utils.setCookie("store-locality", encodeURI(storeLocality), 30);

		var $activeStoreLabel = [$("#active-store-label-mobile"), $("#active-store-label"), $("#active-store-name-label"), $(".store-name")];

		$activeStoreLabel.forEach(function (e) {
			return e.text("Wong" + " " + storeLocality);
		});

		if (wongActiveStores.indexOf(storeLocality) == -1) {
			window.location.href = "https://www.wong.com.pe";

			Fizzmod.Utils.setCookie("store-locality", "", 30);
		}
	};

	var onSubmitStore = function onSubmitStore() {
		var localitySelect = $("#locality-select");
		var storeLocality = localitySelect.val();
		setStoreLocality(storeLocality);

		hideOverlay("#store-locality");
	};

	$(document).on("click", "#submit-store-locality", function (event) {
		return onSubmitStore(event);
	});

	$(document).on("change", "#locality-select", function () {
		$("#submit-store-locality").attr("disabled", false);
	});

	$(window).on("showOverlay", function (event, id) {
		if (id == "store-locality") {
			$("#locality-select").select2({
				minimumResultsForSearch: Infinity,
				theme: "gray-border-select max-top",
				placeholder: "Selecciona un distrito"
			});
		}
	});

	var storeLocality = decodeURI(Fizzmod.Utils.getCookie("store-locality"));

	if (storeLocality != "") {
		setStoreLocality(storeLocality);
	}
}

function setVtexIdLocale() {
	$(window).on('rendered.vtexid', function (event) {
		var locale = vtex.vtexid.locale;


		var customLocale = {
			"es": {
				"confirmChangePswdText": "Ingrese una nueva contraseña y luego enviaremos la clave de seguridad a tu correo"
			}
		};

		lodash.merge(locale, customLocale);

		Fizzmod.Utils.setCookie("i18next", "es", 30, true);
		i18n.setLng('es', { fixLng: true }, function (es) {
			$("#vtexIdContainer").i18n();
		});
	});
}

window.janis = {

	DOMAIN: 'janis.fizzmod.com',
	BASE_URL: 'https://janis.fizzmod.com',

	BASE_HEADERS: {
		'Janis-Client': 'wongfood'
	},
	PORT: 3002,

	GET_STORES: '/api/store/get',

	GET_SLAS: '/api/v2/shipping/get-slas',
	GET_STORE_DELIVERY: '/api/delivery_range/get',
	GET_DELIVERY_PLANNING: '/api/v2/delivery-planning/get',

	GET_GEO_SHAPE_NAMES: '/api/v2/shipping/geo-shape-names',
	GET_GEO_SHAPE_CORDINATES: '/api/v2/shipping/geo-shape-coordinates',
	GET_GEO_SHAPES_CORDINATES: '/api/v2/shipping/geo-shapes-coordinates',

	GET_RECIPES: '/api/recipe/search',
	GET_INGREDIENTS: '/api/recipe/ingredients',
	GET_TAGS: '/api/recipe/tags',
	GET_RESTRICTIONS: '/api/recipe/restrictions',
	GET_GIFT_WRAPS: '/api/gift_wrap/get',

	NEWSLETTER_SUBSCRIBE: '/api/newsletter/insert'
};

window.janisV2 = {

	BASE_URL: 'https://janis.in',

	BASE_HEADERS: {
		'Janis-Client': 'wongfood'
	},

	GET_SLAS: '/api/v2/shipping/get-slas',
	HAS_SLAS: '/api/v2/shipping/has-slas',
	GET_STORE_DELIVERY: '/api/delivery_range/get',
	GET_DELIVERY_PLANNING: '/api/v2/delivery-planning/get',

	GET_GEO_SHAPE_NAMES: '/api/v2/shipping/geo-shape-names',
	GET_GEO_SHAPE_CORDINATES: '/api/v2/shipping/geo-shape-coordinates',
	GET_GEO_SHAPES_CORDINATES: '/api/v2/shipping/geo-shapes-coordinates',

	GET_EMAIL_BY_DOC: '/api/v2/customer/get-email-by-doc',
	UPDATE_MIGRATION_STATUS: '/api/v2/customer/update-migration-status',

	GET_SHOP_LIST: '/api/v2/shop-list/get'
};
