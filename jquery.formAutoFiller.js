/**
 * Author: Nicholas Suski
 * Date: 06/10/2015
 * Version: 1.0.0
 * Options: replaceOld - boolean | dictionary - Object
 * Public Methods: formAutoFiller()
 * Usage Example:  $('form').formAutoFiller({ replaceOld: true, dictionary:{"first_name": "William","last_name": "Testerguy" } });
*/
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module depending on jQuery.
		define(['jquery'], factory);
	} else {
		// No AMD. Register plugin with global jQuery object.
		factory(jQuery);
	}
}(function ($) {
	"use strict";
	
	var FormAutoFillerObject = function (element, options) {
		this.form = $(element);
		this.options = $.extend(false, {}, $.fn.formAutoFiller.defaults, options);
		this._init();
	};	

	FormAutoFillerObject.prototype = {
		/**
		 * Start our app
		 * @private
		 */
		_init: function() {
			var self = this;
			$.each(this.options.dictionary, function(key, value) {
				var $el = self.form.find('input[name="' + key + '"]');
				if ( self.options.replaceOld || ! $el.val() ) {
					$el.val(value);
				}
			});
		},

		/**
		 * Sets multiple options on the plugin
		 * @private
		 * @return  {object} current instance of the plugin
		 */
		_setOptions: function (options) {
			var self = this;
			$.each(options, function (key, value) {
				self._setOption(key, value);
			});

			return this;
		},

		/**
		 * Sets an option on the plugin
		 * @private
		 * @return  {object} current instance of the plugin
		 */
		_setOption: function (key, value) {
			this.options[key] = value;
			
			return this;
		},

		/**
		 * Gets the plugin instance
		 * @public
		 * @return  {object} current instance of the plugin
		 */
		widget: function () {
			return this;
		},

		/**
		 * Gets/Sets an option for the plugin
		 * @public
		 * @return  {*} Either the value of the option or the current instance of the plugin
		 */
		option: function(key, value) {
			var options = key;
			if (arguments.length === 0) {
				// don't return a reference to the internal hash
				return $.extend( {}, this.options );
			}

			if (typeof key === "string") {
				if (value === undefined) {
					return this.options[key];
				}
				options = {};
				options[key] = value;
			}
			this._setOptions(options);

			return this;
		}
	};

	$.fn.formAutoFiller = function (option) {
		var isMethodCall = typeof option === "string",
			args = Array.prototype.slice.call(arguments, 1),
			returnValue = this;
		// prevent calls to internal methods
		if (isMethodCall && option.charAt(0) === "_") {
			return returnValue;
		}

		// call internal method
		if (isMethodCall) {
			this.each(function() {
				var instance = $(this).data('formAutoFiller'),
					methodValue = instance && $.isFunction(instance[option]) ? instance[ option ].apply(instance, args) : instance;
				if (instance && methodValue && methodValue !== undefined) {
					returnValue = methodValue;
					return false;
				}
				return false;
			});
		} 
		// instantiate plugin
		else {
			this.each(function () {
				var $this = $(this),
					data = $this.data('formAutoFiller'),
					options = typeof option === 'object' && option;
				if (!data) {
					$this.data('formAutoFiller', (data = new FormAutoFillerObject(this, options)));
				}
			});
		}

		return returnValue;
	};

	$.fn.formAutoFiller.defaults = {
		replaceOld: false,
		dictionary: {}
	};

	$.fn.formAutoFiller.Constructor = FormAutoFillerObject;

}));
