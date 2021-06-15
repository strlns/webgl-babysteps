import {BaseControl} from "./BaseControl.mjs";

export default class PauseButton extends BaseControl {
    /**
     * @param {string} label
     */
    setLabel(label) {
        this.domElement.innerText = label;
    }

    constructor() {
        super();
        this.domElement = document.createElement('BUTTON');
    }

    onClick(callbackFn) {
        const handler = () => {
            callbackFn.call(null);
        };
        this.domElement.addEventListener('click', handler);
    }
}