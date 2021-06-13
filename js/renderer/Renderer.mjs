import {WebGLRenderer} from "../lib/three.module.js";
import {resizeHandler} from "../scene/resizeHandler.mjs";

export default class Renderer {
    camera;
    scene;

    /**
     * @type WebGLRenderer
     */
    renderer;
    frame = 0;

    /**
     * @type resizeHandler
     */
    resizeHandler;

    renderCallbacks = [];

    resizeCallbacks = [];


    constructor(camera, scene) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = new WebGLRenderer();
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    startRendering() {
        document.body.appendChild(this.renderer.domElement);
        const animate = () => {
            requestAnimationFrame(animate);
            for (const fn of this.renderCallbacks) {
                fn.call(this, this.frame);
            }
            this.renderer.render(this.scene, this.camera);
            this.frame++;
        };
        animate();
        window.addEventListener('resize', resizeHandler(this));
    }

    registerCallback(callback) {
        this.renderCallbacks.push(callback);
    }

    unregisterCallback(callback) {
        const index = this.renderCallbacks.indexOf(callback);
        if (index !== -1) {
            this.renderCallbacks.splice(index, 1);
        }
    }

    registerResizeCallback(callback) {
        this.resizeCallbacks.push(callback);
    }

    unregisterResizeerCallback(callback) {
        const index = this.resizeCallbacks.indexOf(callback);
        if (index !== -1) {
            this.resizeCallbacks.splice(index, 1);
        }
    }
}