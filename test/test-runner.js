(function ($) {
  'use strict';

  module('init');

  test('applies css classes', function () {
    var $chooser = $('#chooser').chooser({ data: ['item'] });

    ok($chooser.hasClass('bootstrap-chooser'));
  });

  test('creates dropdown', function () {
    var $chooser = $('#chooser').chooser({ data: ['item'] });

    equal($chooser.find('.bootstrap-chooser-dropdown').length, 1, 'creates dropdown container');
    equal($chooser.find('.bootstrap-chooser-dropdown li.option').length, 1, 'creates a list item for each data item');
  });

  test('creates input control', function () {
    var $chooser = $('#chooser').chooser({ data: ['item'] });

    equal($chooser.find('.bootstrap-chooser-control').length, 1, 'creates control container');
    equal($chooser.find('.bootstrap-chooser-control input').length, 1, 'create text search input');
  });

  module('options');

  test('defaults', function () {
    var $chooser = $('#chooser');
    var options = $chooser.chooser().data('plugins.bootstrap-chooser').options;

    ok(options, 'options setup correctly');
    equal(options.placeholder, 'Choose...', 'default placeholder option is set');
    equal(options.labelClass, 'info', 'default labelClass option is set');
    equal(options.data.length, 0, 'default data option is set');
    equal(options.max, null, 'default max option is set');
    equal(options.select, null, 'default select option is set');
  });

  module('methods');

  test('`selections`', function () {
    var data = ['test1', 'test2', 'test3'];
    var $chooser = $('#chooser').chooser({ data: data });
    var instance = $chooser.chooser().data('plugins.bootstrap-chooser');
    instance._addSelection($chooser.find('li.option').first());

    equal($chooser.chooser('selections').length, 1, 'one item selected');
    equal($chooser.chooser('selections')[0].text, data[0], 'first item is the one selected');
  });

  test('`update`', function () {
    var newData = ['new1', 'new2'];
    var $chooser = $('#chooser').chooser({ data: ['test1', 'test2', 'test3'] });
    var instance = $chooser.chooser().data('plugins.bootstrap-chooser');
    $chooser.chooser('update', newData);

    deepEqual(instance.data, newData, 'new data set');
  });

  test('`destroy`', function () {
    var $chooser = $('#chooser').chooser();
    $chooser.chooser('destroy');

    equal($chooser.data('plugins.bootstrap-chooser'), null, 'plugin destroyed on element');
  });

}(window.jQuery));
