/**
 * @param {Object} styles
 * @param {HTMLElement} element
 */
export default function setStyles(styles, element) {
    for (const cssPropertyName of Object.keys(styles)) {
        if (styles[cssPropertyName] === null) {
            element.style.removeProperty(cssPropertyName);
        } else {
            element.style[cssPropertyName] = styles[cssPropertyName].toString();
        }
    }
}