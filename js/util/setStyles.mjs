/**
 * @param {Object} styles
 * @param {HTMLElement} element
 */
export default function setStyles(styles, element) {
    Object.keys(styles).forEach(
        cssPropertyName => {
            if (styles[cssPropertyName] === null) {
                element.style.removeProperty(cssPropertyName);
            } else {
                element.style[cssPropertyName] = styles[cssPropertyName].toString();
            }
        }
    );
}