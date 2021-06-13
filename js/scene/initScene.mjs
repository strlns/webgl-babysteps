import {PerspectiveCamera, Scene} from '../lib/three.module.js'

let aspect,
    scene,
    camera

export default function initScene() {
    scene = new Scene()
    aspect = window.innerWidth / window.innerHeight
    camera = new PerspectiveCamera(25, aspect)
    camera.position.z = 5
    return {scene, camera}
}
