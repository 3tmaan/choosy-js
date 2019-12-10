import styles from './style.css';

export default class Choosy {
    constructor(target) {
        if(!target) {
            console.error("Error: The target 'id' is missing!");
            return;
        }
        this.container = document.getElementById(target);
        // This binding is necessary to make `this` work in the callback
        this.container.addEventListener('click', this.handleClick.bind(this));
    }

    /**
     * To scroll the element's parent container
     * to keep the selected option always visible
     * @param {element} selectedOption
     */
    scrollToOption(selectedOption) {
        if(!selectedOption) {
            return;
        }
        selectedOption.scrollIntoView();
    }

    /**
     * To handle the click events on the choosy
     * @param {*} event.target
     */
    handleClick({ target }) {
        const choosy = target.closest(`.${styles.choosy}`);

        if(choosy) {
            const placeholder = choosy.querySelector(`.${styles.placeholder}`);
            const prevOption = choosy.querySelector(`.${styles.itemSelected}`);
            const prevOptionkey = prevOption && prevOption.dataset.key || '';

            if(target.classList.contains(styles.placeholder)) {
                this.toggle(choosy, prevOption);
            }

            if(target.classList.contains(styles.item)) {
                this.close(choosy);

                const currentOption = {
                    key: target.dataset.key,
                    label: target.innerText.trim()
                }

                if(prevOptionkey === currentOption.key) {
                    return;
                }

                prevOption && prevOption.classList.remove(styles.itemSelected);
                target.classList.add(styles.itemSelected);

                placeholder.innerHTML = currentOption.label;
                this.container.firstElementChild.value = currentOption.key;
            }
        }
    }

    /**
     * Expand/show the choosy list and scroll
     * to the selected option
     * @param {element} choosy
     * @param {element} selectedItem
     */
    expand(choosy, selectedItem) {
        choosy.classList.add(styles.choosyExpanded);
        this.scrollToOption(selectedItem);
    }

    /**
     * Close the choosy list
     * @param {element} choosy
     */
    close(choosy) {
        choosy.classList.remove(styles.choosyExpanded)
    }

    /**
     * Toggle (show/hide) the choosy list
     * @param {element} choosy
     * @param {element} selectedItem
     */
    toggle(choosy, selectedItem) {
        const expanded = document.querySelector(`.${styles.choosyExpanded}`);

        if(choosy.classList.contains(styles.choosyExpanded) || expanded && expanded.classList.remove(styles.choosyExpanded)) {
            this.close(choosy);

            return;
        }

        this.expand(choosy, selectedItem);
    }

    /**
     * Render the choosy's layout
     * @param {objet} object.data
     * @param {array} object.properties
     * @param {string} object.defaultValue
     */
    render({data, properties = ['id', 'label'], defaultValue = null}) {
        const [args] = arguments;

        if(!args.hasOwnProperty('data')) {
            console.error("Error: The 'data' property is missing!");
            return '';
        }

        const [idKey, labelKey] = properties;
        let idVal = '', labelValue = '';

        if(defaultValue) {
            const [option] = data.filter((option) => option[idKey] === defaultValue);

            idVal = option[idKey];
            labelValue = option[labelKey];
        }

        return `
            <input type="hidden" name="${this.container.id}" value="${idVal}">
            <div class="${styles.choosy}">
                <div class="${styles.placeholder}">${labelValue}</div>
                <div class="${styles.optionList}">
                    ${
                        data && data.map(option => {
                            const selected = option[idKey] === idVal ? styles.itemSelected : ''

                            return `
                                <div class="${styles.item} ${selected}" data-key="${option[idKey]}">
                                    ${option[labelKey]}
                                </div>`
                            }
                        ).join("")
                    }
                </div>
            </div>`
    };
}