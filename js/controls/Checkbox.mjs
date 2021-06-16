import {BaseControl} from "./BaseControl.mjs";
import {getNewElementId} from "../util/getNewElementId.mjs";

export default class Checkbox extends BaseControl {
    /**
     * @private
     * @type boolean
     */
    _checked;
    get checked() {
        return this._checked;
    }

    set checked(value) {
        this._checked = value;
        this.domElement.checked = value;
    }

    /**
     * @type HTMLInputElement
     */
    domElement;

    constructor(checked = false) {
        super();
        this.domElement = document.createElement('INPUT');
        this.domElement.id = getNewElementId();
        this.domElement.type = 'checkbox';
        this.checked = checked;
    }

    /**
     *
     * @param {Function} callbackFn
     */
    onChange(callbackFn) {
        const handler = event => {
            this._value = event.target.checked;
            callbackFn.call(null, this._value);
        };
        this.domElement.addEventListener('change', handler);
        this.domElement.addEventListener('input', handler);
    }
}