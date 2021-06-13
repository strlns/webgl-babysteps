import {isWebGlAvailable} from "./isWebGlAvailable.mjs";

export default function throwIfNoWebGl() {
    if (!isWebGlAvailable()) {
        const msg = 'WebGL is unsupported in your browser';
        document.body.innerHTML = `<h1 style="red">${msg}</h1>`;
        throw new Error(msg);
    }
}