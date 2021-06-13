import throwIfNoWebGl from "./webgl-availability/throwIfNoWebGl.mjs";
import initScene from "./scene/scene.mjs";
import {cube} from "./polyeder/polyeder.mjs";
import Renderer from "./scene/renderer.mjs";
import addDirectionalLight from "./light/addDirectionalLight.js";
import addAmbientLight from "./light/addAmbientLight.js";

throwIfNoWebGl();
document.addEventListener('DOMContentLoaded', () => {
    const {scene, camera} = initScene();
    scene.add(cube);
    const renderer = new Renderer(camera, scene);
    addAmbientLight(scene)
    addDirectionalLight(scene)
    camera.updateProjectionMatrix()
    renderer.startRendering(
        (frame) => {
            if (frame % 64 > 32) {
                cube.rotation.y -= 0.1
            } else {
                cube.rotation.y += 0.01
            }
            if (frame % 256 > 128) {
                cube.rotation.x -= 0.1
            } else {
                cube.rotation.x += 0.01
            }
        }
    );
})