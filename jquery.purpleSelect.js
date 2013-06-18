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
        this.items = this._parseSelect(this.$parent);
        this.$replacement = this._$buildDOM();
        this.setEventListener();

//        if (
//            (this.items = this._parseSelect(this.$parent)) &&
//            (this.$replacement = this._$buildDOM()) &&
//            (this.setEventListener())
//        ) {
            this.afterInit();
//        }
    }

    PurpleSelect.prototype.afterInit = function () {
        console.log('ACHTUNG!');
        console.log(this.$replacement);
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
        // объявляем массив-контейнер для распарсенного селекта
        var parsedDom = [],
        // временный объект для каждой группы опций
            group = {
                type: 'optgroup',
                items: []
            },
        // временный объект для каждой опции
            option = {
                type: 'option'
            };
        $select.find('option').each(function () {
            var $me = $(this);
            // TODO: проверять disabled
            // присваиваем свойствам объекта опции html и значение опции, к которой обращаемся в данный момент
            option.label = $me.html();
            option.value = $me.val();
            // если опция находится в группе опций
            if($me.parent().is('optgroup')){
                // добавляем опцию в глобальную группу опций
                group.items.push($.extend({}, option));
                group.label = $me.parent().attr('label');
                // если опция - последняя в группе
                if(!$me.next().length){
                    // добавляем группу с опциями в глобальный массив - контейнер
                    parsedDom.push($.extend({}, group));
                    group.label = '';
                    // очищаем массив опций в группе
                    group.items = [];
                }
                // если опция находится в селекте
            } else {
                //  добавляем опцию в глобальный контейнер
                parsedDom.push($.extend({}, option));
            }
        });

        console.log('final parsed dom: ');
        console.log(parsedDom);

        return parsedDom;
    }


    /**
     * Returns class name for given type of customized element
     * @param itemType
     * @return {string}
     * @private
     */
    PurpleSelect.prototype._DOMclass = function (itemType) {
        var className = 'purple-select__' + itemType;
        return className;
    }

    /**
     *
     * @return {*}
     * @private
     */
    PurpleSelect.prototype._$buildDOM = function () {
        var $container = $('<div />', {
            class: this.options.instanceClassName
        });
//        There should be created all wrapper Elements, i.e. scroll, wrapper, hidden inputs, if any, etc.
        for (var i in this.items){
            var $tempItem = $();
            if(this.items[i].type == 'optgroup') {
                // $tempItem = MAGIC(this.items[i]); - функция MAGIC берет в качестве параметра объект и возвращает дом-элемент заданного класса и, если надо, с нужным текстом
                $tempItem = $('<div />', {
                    class: this._DOMclass(this.items[i].type)
                });
                for (var j in this.items[i].items) {
                    // $tempItem = MAGIC(this.items[i]);
                    var $tempSubItem = $('<div />', {
                        class: this._DOMclass(this.items[i].items[j].type),
                        text: this.items[i].items[j].label
                    });
                    $tempItem.append($tempSubItem);
                }
            } else {
                // $tempItem = MAGIC(this.items[i]);
                $tempItem = $('<div />', {
                    class: this._DOMclass(this.items[i].type),
                    text: this.items[i].label
                });
            }
            $container.append($tempItem);
        }

        console.log('constructed DOM: ');
        console.log($container);

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

        console.log('Options:');
        console.log(options);

        console.log('Victim select:');
        console.log(this)

        return this;
    };

    PurpleSelect.prototype.setEventListener = function(){
    };

})(jQuery, window);

/**
 * Fictive class for future documenting purposes
 * @class
 * @name $.fn
 */