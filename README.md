# choosy-js

`choosy-js` is a Custom Dropdown component for Javascript.

## Installation

`npm i choosy-js`

## Usage

### Import the module

```JS
import Choosy from 'choosy-js';
```

### Create a new instance with the target ID selector

```JS
const choosyDropDown = new Choosy('[target-id]');
```

> `[target-id]` is the parent element's ID where **Choosy** will be injected into.

### Call the module's render method with a given options data

```JS
choosyDropDown.render({
    options: '[options-data]'
});
```

> `[options-data]` is *mondatory* and it matches the JSON data needed to set the **Choosy** options list.

**Choosy** is expecting `id` and `label` as default properties for the JSON object. Nonetheless, you can define your custom properties in order to match your object, e.g.:

```JS
choosyDropDown.render({
    ...
    properties: ['key', 'value'],
});
```

In case you want to have an **initial value** to be selected by default by **Choosy**, you just need to define `initialValue` property to the render method and pass your value.

```JS
choosyDropDown.render({
    ...
    initialValue: '[initial-value]',
});
```
