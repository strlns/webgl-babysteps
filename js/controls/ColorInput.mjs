import {BaseControl} from "./BaseControl.mjs";
import {DEFAULT_CUBE_COLOR} from "../polyeder/polyeder.mjs";
import setStyles from "../util/setStyles.mjs";
import {getNewElementId} from "../util/getNewElementId.mjs";

/**
 *
 * @param {string} str
 * @returns {number}
 */
const parseHexString = (str) => {
    const valueToParse = str.indexOf('#') === 0 ? str.slice(1, 7) : str;
    return parseInt(valueToParse, 16);
}

export default class ColorInput extends BaseControl {
    /**
     * @type {number}
     * @private
     */
    _value = DEFAULT_CUBE_COLOR;

    get value() {
        return this._value;
    }

    set value(value) {
        if (typeof value === 'number') {
            this._value = value;
        } else if (typeof value === 'string') {
            this._value = parseHexString(value);
        }
    }

    /**
     * @type HTMLInputElement
     */
    domElement;


    /**
     * @param {string} label
     */
    addLabel(label) {
        const labelEl = document.createElement('LABEL');
        labelEl.innerText = label;
        labelEl.setAttribute('for', this.domElement.id);
        this.wrapper.appendChild(labelEl);
        setStyles({
            right: 0,
            bottom: '100%'
        }, labelEl);
    }

    constructor() {
        super();
        this._value = DEFAULT_CUBE_COLOR;
        this.wrapper = document.createElement('DIV');
        this.domElement = document.createElement('INPUT');
        this.domElement.id = getNewElementId();
        this.domElement.type = 'color';
        this.domElement.value = `#${this._value.toString(16)}`;
    }

    onChange(callbackFn) {
        const handler = event => {
            this._value = parseHexString(event.target.value);
            callbackFn.call(null, this._value);
        };
        this.domElement.addEventListener('change', handler);
        this.domElement.addEventListener('input', handler);
    }

}