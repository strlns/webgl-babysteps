import setStyles from "../util/setStyles.mjs";

export class BaseControl {
    /**
     * @type HTMLElement
     */
    domElement;

    /**
     * @type HTMLDivElement
     */
    wrapper;

    constructor() {
        this.wrapper = document.createElement('DIV');
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

    setStyles(styles) {
        setStyles(styles, this.domElement);
    }

    setWrapperStyles(styles) {
        setStyles(styles, this.wrapper);
    }

    /**
     * @param {string} label
     */
    addLabel(label) {
        const labelEl = document.createElement('LABEL');
        labelEl.innerText = label;
        if (this.domElement && this.domElement.id !== undefined) {
            labelEl.setAttribute('for', this.domElement.id);
        }
        this.wrapper.appendChild(labelEl);
        setStyles({
            right: 0,
            bottom: '100%'
        }, labelEl);
    }
}