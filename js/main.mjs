import throwIfNoWebGl from "./webgl-availability/throwIfNoWebGl.mjs";
import initScene from "./scene/initScene.mjs";
import {cube} from "./polyeder/polyeder.mjs";
import Renderer from "./renderer/Renderer.mjs";
import addDirectionalLight from "./light/addDirectionalLight.mjs";
import addAmbientLight from "./light/addAmbientLight.mjs";

throwIfNoWebGl();
document.addEventListener('DOMContentLoaded', () => {
    const {scene, camera} = initScene();
    scene.add(cube);
    const renderer = new Renderer(camera, scene);
    addAmbientLight(scene);
    addDirectionalLight(scene);
    camera.updateProjectionMatrix();
    renderer.registerCallback(cubeRotationCallback);
    renderer.startRendering();
});

function cubeRotationCallback(frame) {
    if (frame % 64 > 32) {
        cube.rotation.y -= 0.1;
    } else {
        cube.rotation.y += 0.01;
    }
    if (frame % 256 > 128) {
        cube.rotation.x -= 0.1;
    } else {
        cube.rotation.x += 0.01;
    }
}