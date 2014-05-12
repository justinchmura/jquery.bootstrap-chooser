(function ($) {
  'use strict';

  $.chooser = function (el, options) {

    // -----------------------------------------------------------------------------------------------------------
    // Setup
    // -----------------------------------------------------------------------------------------------------------

    var base = this;
    base.$el = $(el);
    base.el = el;
    base.$el.data('chooser', base);
    base.selected = [];
    base.public = {};

    // -----------------------------------------------------------------------------------------------------------
    // Init
    // -----------------------------------------------------------------------------------------------------------

    base.init = function () {
      base.options = $.extend({}, $.chooser.defaultOptions, options);

      base.$el.addClass('bootstrap-chooser');

      if ($.isArray(base.options.data)) {
        base.data = base.options.data;
      } else if ($.isFunction(base.options.data)) {
        base.data = base.options.data();
      }

      base.unfiltered = base.data.slice();

      base._createSearchField();
      base._createDropdown();

      base.$control.on('click.bootstrap-chooser', function () {
        base.$control.addClass('active');
        base.$input.focus();
        base.$dropdown.addClass('active');
      });
      base.$dropdown.on('click.bootstrap-chooser', 'li.option', function () {
        base._addSelection($(this));
        base._closeDropdown();
      });
      base.$control.on('click.bootstrap-chooser', '.choice button.close', function (e) {
        var index = $(this).data('index');
        console.log($(this).data('index'));
        for (var i = base.selected.length - 1; i >= 0; i -= 1) {
          if (base.selected[i].index === index) {
            base.selected.splice(i, 1);
          }
        }
        base._applySelected();
        e.preventDefault();
        return false;
      });
      base.$control.on('input', 'li.search-field input', function () {
        var search = $(this).val();
        base._search(search);
      });
      $(document).on('click.bootstrap-chooser', function (e) {
        if (!base.$el.is($(e.target).closest('.bootstrap-chooser'))) {
          base._closeDropdown();
        }
      });
    };

    // -----------------------------------------------------------------------------------------------------------
    // Public
    // -----------------------------------------------------------------------------------------------------------

    base.public.update = function (data) {
      if ($.isArray(data)) {
        base.data = data.slice();
      } else if ($.isFunction(data)) {
        base.data = data();
      } else {
        return;
      }
      if (base.$input.val().length > 0) {
        base.$input.val('');
      }
      base.unfiltered = base.data.slice();
      base._closeDropdown();
      base.selected = [];
      base._applySelected();
      base._resetDropdown();
    };

    base.public.destroy = function () {
      base._closeDropdown();
      base.selected = [];
      base._applySelected();
      base.$control.off('click.bootstrap-chooser');
      base.$dropdown.off('click.bootstrap-chooser', 'li.choice');
      base.$control.off('click.bootstrap-chooser', '.choice button.close');
      base.$control.removeClass('form-control');
      base.$el.removeClass('chooser');
      base.$el.removeData('plugins.bootstrap-chooser');
      base.$el.html('');
      $(document).off('click.bootstrap-chooser');
    };

    base.public.selections = function () {
      return base.selected;
    };

    // -----------------------------------------------------------------------------------------------------------
    // Private
    // -----------------------------------------------------------------------------------------------------------

    base._applySelected = function () {
      $('li.choice', base.$control).remove();
      base.selected.forEach(function (item) {
        var $close = $('<button/>').attr({
          'type': 'button',
          'class': 'close',
          'aria-hidden': 'true'
        }).data('index', item.index).html('&times;');
        var $label = $('<span/>').addClass('label label-' + base.options.labelClass).text(item.text);
        var $item = $('<li/>').addClass('choice').data('index', item.index);
        $close.appendTo($label);
        $label.appendTo($item);
        $item.insertBefore($('li.search-field', base.$control));
      });
      $('li', base.$dropdown).removeClass('chosen').addClass('option').each(function () {
        var index = $(this).data('index');
        var $item = $(this);
        base.selected.forEach(function (item) {
          if (item.index === index) {
            $item.removeClass('option').addClass('chosen');
          }
        });
      });
    };

    base._addSelection = function ($elem) {
      var index, selected;
      if (!base.options.max || base.selected.length < base.options.max) {
        selected = $elem.text();
        if (selected) {
          index = base.unfiltered.indexOf(selected);
          if (index !== -1) {
            base.selected.push({
              index: index,
              text: base.unfiltered[index]
            });
            if (base.$input.val().length > 0) {
              base.$input.val('');
              base.data = base.unfiltered.slice();
              base._resetDropdown();
            }
            base._applySelected();
            if ($.isFunction(base.options.select)) {
              base.options.select();
            }
          }
        }
      }
    };

    base._createSearchField = function () {
      base.$el.html('<div class=\'bootstrap-chooser-control form-control\'><ul><li class=\'search-field\'></li></ul></div>');
      $('<input/>').attr({
        type: 'search',
        placeholder: base.options.placeholder,
        autocomplete: 'off'
      }).appendTo($('li.search-field', base.$el));
    };

    base._search = function (search) {
      base.data = base.unfiltered.slice();
      if (search.length > 0) {
        search = search.toLowerCase();
        base.data = base.data.filter(function (x) {
          return x.toLowerCase().indexOf(search) !== -1;
        });
      } else {
        base.data = base.unfiltered.slice();
      }
      base._resetDropdown();
      $('li', base.$dropdown).each(function () {
        var item = $(this).text();
        if (base.selected.map(function (x) {
          return x.text;
        }).indexOf(item) !== -1) {
          $(this).removeClass('option').addClass('chosen');
        }
      });
    };

    base._createDropdown = function () {
      base.$control = $('.bootstrap-chooser-control', base.$el);
      base.$input = $('li.search-field input', base.$control);
      $('<div/>').html('<ul></ul>').addClass('bootstrap-chooser-dropdown').insertAfter(base.$control);
      base.$dropdown = $('.bootstrap-chooser-dropdown', base.$el);
      base.$dropdown.hide();
      base._resetDropdown();
    };

    base._resetDropdown = function () {
      $('ul', base.$dropdown).html('');
      base.data.forEach(function (option, i) {
        $('<li/>').text(option).data('index', i).addClass('option').appendTo($('ul', base.$dropdown));
      });
    };

    base._closeDropdown = function () {
      base.$control.removeClass('active');
      base.$dropdown.removeClass('active');
    };

    base.init();
  };

  $.chooser.defaultOptions = {
    placeholder: 'Choose...',
    labelClass: 'info',
    data: [],
    max: null,
    select: null
  };

  $.fn.chooser = function (option) {
    var args = Array.prototype.slice.call(arguments, 0);
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('plugins.bootstrap-chooser');
      var options = typeof option === 'object' && option;
      if (!data && option === 'destroy') {
        return;
      } else if (!data) {
        $this.data('plugins.bootstrap-chooser', new $.chooser(this, options));
      } else if (typeof option === 'string') {
        args.splice(0, 1);
        return data.public[option].apply(data, args);
      }
    });
  };
})(window.jQuery);
