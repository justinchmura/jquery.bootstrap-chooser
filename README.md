# jQuery Bootstrap Token Chooser

![jQuery Bootstrap Token Chooser](http://justinchmura.com/wp-content/uploads/2014/06/jquery-bootstrap-token-chooser.png)

## Dependencies

Currently, this plugin is built on top of [jQuery 1.11/2](http://jquery.com/) and uses [Twitter Bootstrap 3](http://getbootstrap.com/).

## Example Usage

### HTML

```html
<div id="chooser"></div>
```

### jQuery

Use the plugin as follows:

```js
$('#chooser').chooser({
    data: ['option 1', 'option 2', 'option 3']
});
```

### Options

| 
| --------------|--------|----------|-------------|---------------------------------------|
| `placeholder` | string | optional | 'Choose...' | Placeholder text to show in the input |
| `labelClass` | string | optional | 'info' | Bootstrap label CSS class to apply to the tokens inside the input |
| `data` | array | required | [] | Array of string tokens to be the options |
| `max` | number | optional | null | Maximum number of selections allowed |
| `select` | function | optional | null | Callback invoked after a selection is made |

### CSS

All the CSS that is needed is provided in the stylesheet. Copy to wherever you need it.

## Installation

Reference the script file and the CSS stylesheet. Requires jQuery and Bootstrap. Bower installation coming soon.

## TODO

* Add meaningful tests
* Create Bower package

## License

This plugin is available under [the MIT license](http://mths.be/mit).
