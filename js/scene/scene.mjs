import {PerspectiveCamera, Scene} from '../lib/three.module.js';

export default function initScene() {
    const scene = new Scene();
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new PerspectiveCamera(25, aspect);
    camera.position.z = 5;
    return {scene, camera};
}