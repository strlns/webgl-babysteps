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

    /**
     * @type HTMLLabelElement
     */
    label;

    constructor() {
        this.wrapper = document.createElement('DIV');
    }

    /**
     * @param {Node & ParentNode} parent
     */
    attachToElement(parent) {
        this.wrapper.appendChild(this.domElement);
        parent.appendChild(this.wrapper);
        //Call setters again because of possible side-effects affecting e.g. the DOM element.
        //This was a weird exercise and bad idea :o)
        Object.getOwnPropertyNames(this).forEach(key => {
                if (key.indexOf('_') === 0) {
                    const classPropName = key.slice(1);
                    const descriptor = Object.getOwnPropertyDescriptor(
                        Object.getPrototypeOf(this),
                        key.slice(1)
                    );
                    if (typeof descriptor.set === 'function') {
                        /*eslint-disable-next-line no-self-assign*/
                        this[classPropName] = this[classPropName];
                    }
                }
            }
        );
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
    setLabel(label) {
        if (this.label !== undefined) {
            document.removeChild(this.label);
        }
        this.label = document.createElement('LABEL');
        this.label.innerText = label;
        if (this.domElement && this.domElement.id !== undefined) {
            this.label.setAttribute('for', this.domElement.id);
        }
        this.wrapper.appendChild(this.label);
    }
}