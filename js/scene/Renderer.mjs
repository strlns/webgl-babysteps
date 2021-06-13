import {WebGLRenderer} from "../lib/three.module.js"
import {resizeHandler} from "./resizeHandler.mjs"

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

    callbacks = [];

    constructor(camera, scene) {
        this.camera = camera
        this.scene = scene
        this.renderer = new WebGLRenderer()
        this.renderer.shadowMap.enabled = true
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    startRendering() {
        document.body.appendChild(this.renderer.domElement)
        const animate = () => {
            requestAnimationFrame(animate)
            for (const fn of this.callbacks) {
                fn.call(this, this.frame)
            }
            this.renderer.render(this.scene, this.camera)
            this.frame++
        }
        animate()
        window.addEventListener('resize', resizeHandler(this))
    }

    registerCallback(callback) {
        this.callbacks.push(callback)
    }

    unregisterCallback(callback) {
        const index = this.callbacks.indexOf(callback)
        if (index !== -1) {
            this.callbacks.splice(index, 1)
        }
    }
}