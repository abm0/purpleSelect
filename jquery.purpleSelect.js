/**
 * SEF (self-executed function), extending $.fn object (a prototype of jQuery object) with purpleSelect method.
 * jQuery, window arguments used to avoid their possible redefinition by dark side. Missed third parameter used
 * to create an "excellent undefined": pure, clean and absolutely undefined.
 *
 * Also, any methods, defined inside this SEF would be safely stored in closure, so they wouldn't interfere with
 * any code outside of SEF. For additional safety I suggest to use "name spaces", i.e.:
 * "$.fn.purpleSelect.someMethod" or "$.fn.purpleSelect.someConst" instead of "someMethod" and "someConst".
 */
(function ($, window, undefined) {

    /**
     * Iterator function, used to apply required methods to all victims, passed as context ("this" is jQuery object).
     * There's no need to change it's code.
     * @param {Object} options User specified options, required for specific plugin evocation
     * @return {*}
     */
    $.fn.purpleSelect = function (options) {
        // Extending empty object with default options of plugin and user specified options
        options = $.extend({}, $.fn.purpleSelect.defaultOptions, options);
        return this.each(function () {
            if ($.fn.purpleSelect.isElementValid(this)) {
                $.fn.purpleSelect.wrapSelect.call(this, options);
            }
            return true;
        });
    };

    /**
     * Default options
     * @const
     */
    $.fn.purpleSelect.defaultOptions = {
        instanceClassName: 'purpleSelect'
    };

    /**
     * Implements any required validity checks for HTML element, used as base for purpleSelect instance
     * @param {HTMLElement} element
     * @return {boolean}
     */
    $.fn.purpleSelect.isElementValid = function (element) {
        console.log('Element: ');
        console.log(element);
        return true;
    };

    /**
     * Heart of plugin: this function is applied to any valid element in jQuery collection, passed as context to
     * purpleSelect method.
     * @param {Object} options Full set of options, already extended with user defined ones
     * @this {HTMLElement}
     * @return {*}
     */
    $.fn.purpleSelect.wrapSelect = function (options) {
        console.log('Options:');
        console.log(options);

        console.log('Victim select:');
        console.log(this);
        return this;
    };

})(jQuery, window);

/**
 * Fictive class for future documenting purposes
 * @class
 * @name $.fn
 */