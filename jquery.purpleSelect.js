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
     * Proxy object, implementing interface for select - replacer events
     * @param parent Original select
     * @param options Options for this selector replacement instance
     * @constructor
     */
    var PurpleSelect = function (parent, options) {
        this.parent = parent;
        this.$parent = $(parent);
        this.options = options;
        if (
            (this.items = this._parseSelect(this.$parent)) &&
            (this.$replacement = this._$buildDOM()) &&
            (this.setEventListener())
        ) {
            this.afterInit();
        }
    }

    PurpleSelect.prototype.afterInit = function () {
        this.$parent.hide().after(this.$replacement);
        this.options.afterInit();
    }

    /**
     *
     * @private
     */
    PurpleSelect.prototype._parseSelect = function ($select) {
        if (!$select.is('select')) {
            return false;
        }
        var items = [];
        $select.find('option').each(function () {
            var item = {},
                optgroup = {},
                victim,
                $me = $(this),
                lastItem = items.length;
            if ($me.parent().is('optgroup')) {
                if ((!lastItem) || (items[lastItem - 1].type == 'option')) {
                    optgroup.type = 'optgroup';
                    optgroup.label = $me.parent('optgroup').attr('label');
                    optgroup.value = 0;
                    optgroup.items = [];
                    items.push(optgroup);
                    lastItem++;
                }
                victim = items[lastItem - 1].items;
            } else {
                victim = items;
            }
            item.type = 'option';
            item.label = $me.html();
            item.value = $me.val();
            victim.push(item);
        });

        console.log(items);

        return items;
    }

    /**
     *
     * @return {*}
     * @private
     */
    PurpleSelect.prototype._$buildDOM = function () {
        var $container = $('<div />', {
            class: this.options.instanceClassName/*,
            css: {
                width: this.$parent.width(),
                position: 'relative'
            }*/
        });

//        There should be created all wrapper Elements, i.e. scroll, wrapper, hidden inputs, if any, etc.
        // ***************************************************
//        this.items.each(function (index, item) {
//            if (item.type == 'optgroup') {
//                $(this).wrap('<div class="optgroup" />');
//            } else if (item.type == 'option') {
//                $(this).wrap('<div class="option" />');
//            }
//        })
        for(var i = 0; i < this.items.length; i++){
            if(this.item[i].type == 'optgroup'){

            } else if {

            }
        }
         // **************************************************
//            selectOptions = this.$parent.children('option'),
//            targetHeight = this.$parent.height(),
//            placeholder = (this.options.instancePlaceholder)? this.options.instancePlaceholder : $(selectOptions[0]).text();
//        $container.append(
//            '<div class="currentVal" style="position: absolute; padding: 0 5px; top: 0; border: 1px solid purple; width: 100%; height: ' + targetHeight + 'px;">' + placeholder + '</div>' +
//            '<div class="purpleList" style="position: absolute; padding: 0 5px; border: 1px solid purple; width: 100%; display: none; top: ' + targetHeight + 'px;">' +
//            selectOptions.map(
//                function(){
//                    return $(this).wrapInner('<div style="height: ' + targetHeight + 'px;" />').html()
//                }).get().join('')
//            + '</div>'
//        );
        return $container;
    }

    /**
     * Iterator function, used to apply required methods to all victims, passed as context ("this" is jQuery object).
     * There's no need to change it's code.
     * @param {Object} options User specified options, required for specific plugin evocation
     * @return {*}
     */
    $.fn.purpleSelect = function (options) {
        // Extending empty object with default options of plugin and user specified options
        options = $.extend({}, $.fn.purpleSelect.defaultOptions, options);
        return $(this).each(function () {
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
        instanceClassName: 'purpleSelect',
        instanceType: 'normal',
        instancePlaceholder: false,
        afterInit: function () {return true}
    };

    /**
     * Implements any required validity checks for HTML element, used as base for purpleSelect instance
     * @param {HTMLElement} element
     * @return {boolean}
     */
    $.fn.purpleSelect.isElementValid = function (element) {
        console.log('Element: ');
        console.log(element);
        if($(element).is('select')){
            return true;
        }
    };

    /**
     * Heart of plugin: this function is applied to any valid element in jQuery collection, passed as context to
     * purpleSelect method.
     * @param {Object} options Full set of options, already extended with user defined ones
     * @this {HTMLElement}
     * @return {*}
     */


    $.fn.purpleSelect.wrapSelect = function (options) {

        console.log($(this));
        this.purpleSelect = new PurpleSelect (this, options);

//        $(this).replaceWith(this.purpleSelect.$replacement);

        console.log('Options:');
        console.log(options);

        console.log('Victim select:');
        console.log(this)

        return this;
    };

    PurpleSelect.prototype.setEventListener = function(){
//        this.$replacement.children('.currentVal').click(function(){
//            $(this).siblings('.purpleList').toggle();
//        });

//        this.$replacement.find('.purpleList').children()
//            .hover(
//                function(){
//                    $(this).css({
//                        'background-color': 'purple',
//                        'color': 'white'
//                    });
//                },
//                function(){
//                    $(this).css({
//                        'background-color': 'white',
//                        'color': 'black'
//                    });
//                })
//            .click(function(){
//                $(this).parent().siblings('.currentVal').text($(this).text());
//                $(this).parent().siblings('.purplePlaceholder').hide();
//                $(this).add($(this).parent()).hide();
//                $(this).siblings().filter(function(){
//                    return $(this).css('display') == 'none';
//                }).show();
//            });
    };

})(jQuery, window);

/**
 * Fictive class for future documenting purposes
 * @class
 * @name $.fn
 */