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
}