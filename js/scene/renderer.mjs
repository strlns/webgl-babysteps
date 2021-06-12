import {WebGLRenderer} from "../lib/three.module.js";

export default class Renderer {
    camera;
    scene;
    renderer;

    constructor(camera, scene) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    startRendering(callback) {
        document.body.appendChild(this.renderer.domElement);
        const animate = () => {
            requestAnimationFrame(animate);
            if (callback) {
                callback();
            }
            this.renderer.render(this.scene, this.camera);
        }
        animate();
    }
}