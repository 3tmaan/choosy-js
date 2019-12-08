import styles from './style.css';

export default class Choosy {
    constructor(target) {
        if(!target) {
            console.error("Defining a 'selector' for the 'Choosy' is mondatory");
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
     * To filter the given list by key
     * @param {*} list
     * @param {*} key
     */
    getOptionByKey(list, key) {
        return list.filter((option) => option.key === key);
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
     * @param {*} data
     */
    render(data, initKey = null, parentKey = null) {
        let list = data;
        let key;
        let name = '';

        if(parentKey) {
            list = list[parentKey];
        }
        if(initKey) {
            [{ key, name } = option] = this.getOptionByKey(list, initKey);
        }

        return `
            <input type="hidden" name="${this.container.id}" value="${name}">
            <div class="${styles.choosy}">
                <div class="${styles.placeholder}">${name}</div>
                <div class="${styles.optionList}">
                    ${
                        list && list.map(option => {
                            const selected = option.key === key ? styles.itemSelected : ''

                            return `
                                <div class="${styles.item} ${selected}" data-key="${option.key}">
                                    ${option.name}
                                </div>`
                            }
                        ).join("")
                    }
                </div>
            </div>`
    };
}