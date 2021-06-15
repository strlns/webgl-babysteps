import setStyles from "../util/setStyles.mjs";
import {BaseControl} from "./BaseControl.mjs";

const DEFAULT_IF_NOT_GIVEN = 0;

export default class RangeSlider extends BaseControl {
    /**
     * @type number
     */
    value;

    /**
     * @type HTMLInputElement
     */
    domElement;

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
        super();
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

    onChange(callbackFn) {
        const handler = event => {
            this.value = event.target.value;
            callbackFn.call(null, this.value);
        };
        this.domElement.addEventListener('change', handler);
        this.domElement.addEventListener('input', handler);
    }
}