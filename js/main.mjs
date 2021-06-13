import throwIfNoWebGl from "./webgl-availability/throwIfNoWebGl.mjs";
import initScene from "./scene/scene.mjs";
import {cube} from "./polyeder/polyeder.mjs";
import Renderer from "./scene/renderer.mjs";
import {DirectionalLight, DirectionalLightHelper} from "./lib/three.module.js";

throwIfNoWebGl();
document.addEventListener('DOMContentLoaded', () => {
    const {scene, camera} = initScene();
    scene.add(cube);
    const renderer = new Renderer(camera, scene);
    const light = new DirectionalLight(0xffafff, 5);
    light.position.set(10, 5, 0);
    light.target.position.set(2.5, 1, 1);
    const lightHelper = new DirectionalLightHelper(light);
    scene.add(lightHelper);
    scene.add(light)
    scene.add(light.target)
    const updateLight = () => {
        light.target.updateMatrixWorld();
        lightHelper.update()
    }
    updateLight()
    camera.updateProjectionMatrix()
    renderer.startRendering(
        (frame) => {
            cube.rotation.x += 0.01
            cube.rotation.y += 0.01
            if (frame % 64 > 32) {
                cube.rotation.y -= 0.1
            }
        }
    );
})