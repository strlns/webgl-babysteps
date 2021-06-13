import throwIfNoWebGl from "./webgl-availability/throwIfNoWebGl.mjs";
import initScene from "./scene/initScene.mjs";
import {cube} from "./polyeder/polyeder.mjs";
import Renderer from "./renderer/Renderer.mjs";
import addDirectionalLight from "./light/addDirectionalLight.mjs";
import addAmbientLight from "./light/addAmbientLight.mjs";
import RangeSlider from "./controls/RangeSlider.js";

throwIfNoWebGl();

let rotationSpeed = 1;

document.addEventListener('DOMContentLoaded', () => {
    const {scene, camera} = initScene();
    scene.add(cube);
    const renderer = new Renderer(camera, scene);
    addAmbientLight(scene);
    addDirectionalLight(scene);
    camera.updateProjectionMatrix();
    renderer.registerCallback(cubeRotationCallback);
    renderer.startRendering();
    const speedControl = addSpeedControl(renderer.renderer.domElement.parentNode);
    speedControl.onChange(value => {
        rotationSpeed = value
    })
});

function addSpeedControl(parentNode) {
    const speedControl = new RangeSlider(
        0.1,
        5,
        0.1,
        1
    );
    speedControl.attachToElement(parentNode);
    speedControl.setStyles({
        maxWidth: '12.5vw',
        minWidth: '100px',
        width: '8rem'
    });
    speedControl.setWrapperStyles(
        {
            position: 'absolute',
            left: '1rem',
            top: '1rem',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        }
    )
    speedControl.setLabel('Speed');
    return speedControl;
}

function cubeRotationCallback(frame) {
    if (frame % 64 > 32) {
        cube.rotation.y -= 0.1 * rotationSpeed;
    } else {
        cube.rotation.y += 0.01 * rotationSpeed;
    }
    if (frame % 256 > 128) {
        cube.rotation.x -= 0.1 * rotationSpeed;
    } else {
        cube.rotation.x += 0.01 * rotationSpeed;
    }
}