import {WebGLRenderer} from "../lib/three.mjs";
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
        this.renderer = new WebGLRenderer({
            antialias: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    resetFrame() {
        this.frame = 0;
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
        window.addEventListener('resize', resizeHandler(this, this.resizeCallbacks));
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

    unregisterResizeCallback(callback) {
        const index = this.resizeCallbacks.indexOf(callback);
        if (index !== -1) {
            this.resizeCallbacks.splice(index, 1);
        }
    }

    getCanvasParent() {
        return this.renderer.domElement.parentNode;
    }
}