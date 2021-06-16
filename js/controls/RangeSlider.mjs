import {BaseControl} from "./BaseControl.mjs";
import {getNewElementId} from "../util/getNewElementId.mjs";

const DEFAULT_IF_NOT_GIVEN = 0;

export default class RangeSlider extends BaseControl {
    /**
     * @private
     * @type number
     */
    _value;

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
        this.domElement.value = this._value.toString();
    }

    /**
     * @type HTMLInputElement
     */
    domElement;

    constructor(min = 0, max = 100, step = 1, defaultValue = DEFAULT_IF_NOT_GIVEN) {
        super();
        this._value = defaultValue;
        this.domElement = document.createElement('INPUT');
        this.domElement.id = getNewElementId();
        this.domElement.type = 'range';
        this.domElement.value = this._value.toString();
        this.domElement.min = min.toString();
        this.domElement.max = max.toString();
        this.domElement.step = step.toString();
    }

    onChange(callbackFn) {
        const handler = event => {
            this._value = event.target.value;
            callbackFn.call(null, this._value);
        };
        this.domElement.addEventListener('change', handler);
        this.domElement.addEventListener('input', handler);
    }
}