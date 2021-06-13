import {WebGLRenderer} from "../lib/three.module.js";
import {resizeHandler} from "./resizeHandler.mjs";

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

    constructor(camera, scene) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = new WebGLRenderer();
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    startRendering(callback) {
        document.body.appendChild(this.renderer.domElement);
        const animate = () => {
            requestAnimationFrame(animate);
            if (callback) {
                callback(this.frame);
            }
            this.renderer.render(this.scene, this.camera);
            this.frame++;
        }
        animate();
        window.addEventListener('resize', resizeHandler(this))
    }
}