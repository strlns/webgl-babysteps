import setStyles from "../util/setStyles.mjs";

const DEFAULT_IF_NOT_GIVEN = 0;

export default class RangeSlider {
    /**
     * @type number
     */
    value;

    /**
     * @type HTMLInputElement
     */
    domElement;

    /**
     * @type HTMLDivElement
     */
    wrapper;


    getValue() {
        return this.value;
    }

    /**
     *
     * @param {number} value
     */
    setValue(value) {
        this.value = value;
    }

    /**
     * @param {string} label
     */
    setLabel(label) {
        const labelEl = document.createElement('LABEL');
        labelEl.innerText = label;
        this.wrapper.appendChild(labelEl);
        setStyles({
            right: 0,
            bottom: '100%'
        }, labelEl);
    }

    constructor(min = 0, max = 100, step = 1, defaultValue = DEFAULT_IF_NOT_GIVEN) {
        this.value = defaultValue;
        this.wrapper = document.createElement('DIV');
        this.domElement = document.createElement('INPUT');
        this.domElement.id = Math.random().toString().replace(/0\./, '').slice(0, 12);
        this.domElement.type = 'range';
        this.domElement.value = this.value.toString();
        this.domElement.min = min.toString();
        this.domElement.max = max.toString();
        this.domElement.step = step.toString();
    }

    /**
     * @param {Node & ParentNode} parent
     */
    attachToElement(parent) {
        this.wrapper.appendChild(this.domElement);
        parent.appendChild(this.wrapper);
    }

    destroy() {
        this.domElement.parentNode.removeChild(this.domElement);
    }

    onChange(callbackFn) {
        const handler = event => {
            this.value = event.target.value;
            callbackFn.call(null, this.value);
        };
        this.domElement.addEventListener('change', handler);
        this.domElement.addEventListener('input', handler);
    }

    setStyles(styles) {
        setStyles(styles, this.domElement);
    }

    setWrapperStyles(styles) {
        setStyles(styles, this.wrapper);
    }
}