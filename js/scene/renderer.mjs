import {WebGLRenderer} from "../lib/three.module.js";

export default class Renderer {
    camera;
    scene;
    /**
     * @type WebGLRenderer
     */
    renderer;
    frame = 0;

    constructor(camera, scene) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = new WebGLRenderer();
        this.renderer.shadowMap = true;
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
    }
}