import './index.css';

const styles = {
    choosy: "choosy",
    choosyExpanded: "choosyExpanded",
    optionList: "optionList",
    placeholder: "placeholder",
    item: "item",
    itemSelected: "itemSelected"
}

export default class Choosy {
    constructor(target) {
        if(!target) {
            throw new Error("Error: The target 'id' is missing!");
        }
        this.container = document.getElementById(target);
        document.addEventListener("mousedown", this.handleClick.bind(this))
    }

    /**
     * To handle the click events on the choosy
     * @param {*} {target}
     */
    handleClick({ target }) {
        const choosy = this.container.querySelector(`.${styles.choosy}`)
        const prevOption = choosy && choosy.querySelector(`.${styles.itemSelected}`);

        if (this.container.contains(target)) {
            const input = this.container.firstElementChild;
            const placeholder = choosy.querySelector(`.${styles.placeholder}`)

            if(target.classList.contains(styles.item)) {
                const newOption = {
                    key: target.dataset.key,
                    label: target.innerText.trim()
                }

                prevOption && prevOption.classList.remove(styles.itemSelected);
                target.classList.add(styles.itemSelected);

                input.value = newOption.key;
                placeholder.innerHTML = newOption.label;
            }
            choosy.classList.toggle(styles.choosyExpanded);
            prevOption && prevOption.scrollIntoView();
        } else {
            choosy && choosy.classList.remove(styles.choosyExpanded)
        }
    }

    /**
     * Render Choosy's layout
     * @param {objet} {options}
     * @param {array} {properties}
     * @param {string} {initialValue}
     */
    render({options, properties = ['id', 'label'], initialValue = null}) {
        const [args] = arguments;

        if(!args.hasOwnProperty('options')) {
            throw new Error("Error: The 'options' property is missing!");
        }

        const [idKey, labelKey] = properties;
        let idVal = '', labelValue = '';

        if(initialValue) {
            const [option] = options.filter((option) => option[idKey] === initialValue);

            idVal = option[idKey];
            labelValue = option[labelKey];
        }

        const template = `<input type="hidden" name="${this.container.id}" value="${idVal}">
        <div class="${styles.choosy}">
            <div class="${styles.placeholder}">${labelValue}</div>
            <div class="${styles.optionList}">
                ${
                    options && options.map(option => `
                        <div class="${styles.item} ${option[idKey] === idVal && styles.itemSelected}" data-key="${option[idKey]}">${option[labelKey]}</div>`
                    ).join('')
                }
            </div>
        </div>`;

        this.container.innerHTML = template;
    };
}