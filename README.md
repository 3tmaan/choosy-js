# choosy-js

`choosy-js` is a Custom Dropdown component for Javascript.

## Installation

`npm i choosy-js`

## Usage

```JS
import Choosy from 'choosy-js';

// Create a new instance from Choosy
const choosyDropDown = new Choosy('<target-selector>');

// Call Choosy's render method with a given data as parameter
const renderer = choosyDropDown.render('<data-to-populate-your-choosy>');

// Append to an element in the DOM
document.getElementById('<target-selector>').innerHTML = renderer;
```
