# choosy-js

`choosy-js` is a Custom Dropdown component for Javascript.

## Installation

`npm i choosy-js`

## Usage

### Import the module

```JS
import Choosy from 'choosy-js';
````

### Create a new instance with the target ID selector

```JS
const choosyDropDown = new Choosy('<target-id>');
```

### Call the module's render method with a given data

```JS
const renderer = choosyDropDown.render({
    data: '<data-to-populate-choosy>'
});
```

`Choosy` is expecting **id** and **label** as default properties of the object data. Nevertheless, you can define your custom properties in order to match your object data, e.g.:

```JS
const renderer = choosyDropDown.render({
    ...
    properties: ['key', 'value'],
});
```

In case you want to have a defaut value to be selected by default, you just need to add `defaultValue` property to the render method and pass your value.

```JS
const renderer = choosyDropDown.render({
    ...
    defaultValue: '<default-value>',
});
```

### Append to an element in the DOM

```JS
document.getElementById('<target-selector>').innerHTML = renderer;
```
