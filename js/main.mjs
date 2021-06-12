import throwIfNoWebGl from "./webgl-availability/throwIfNoWebGl.mjs";
import initScene from "./scene/scene.mjs";
import {cube} from "./polyeder/polyeder.mjs";
import Renderer from "./scene/renderer.mjs";

throwIfNoWebGl();
document.addEventListener('DOMContentLoaded', () => {
    const {scene, camera} = initScene();
    scene.add(cube);
    const renderer = new Renderer(camera, scene);
    renderer.startRendering(
        () => {
            cube.rotation.x += 0.01
            cube.rotation.y += 0.01
        }
    );
})