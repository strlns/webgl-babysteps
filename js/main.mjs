import throwIfNoWebGl from "./webgl-availability/throwIfNoWebGl.mjs";
import initScene from "./scene/initScene.mjs";
import {Cube} from "./polyeder/polyeder.mjs";
import Renderer from "./renderer/Renderer.mjs";
import addDirectionalLight from "./light/addDirectionalLight.mjs";
import addAmbientLight from "./light/addAmbientLight.mjs";
import RangeSlider from "./controls/RangeSlider.mjs";

throwIfNoWebGl();

let rotationSpeed = 1;

const FRAMERATE = 60;

document.addEventListener('DOMContentLoaded', () => {
    const {scene, camera} = initScene();
    const renderer = new Renderer(camera, scene);
    addAmbientLight(scene);
    addDirectionalLight(scene);
    const cube = Cube(.75);
    scene.add(cube);
    camera.updateProjectionMatrix();
    renderer.registerCallback(cubeRotationCallback(cube));
    const getNewTargetColor = () => Math.floor(cube.material.color.getHex() + Math.random() * 0xffffff) % 0xffffff;
    let targetColor = getNewTargetColor();
    renderer.registerCallback((frame) => {
        if (frame % FRAMERATE === 1) {
            targetColor = getNewTargetColor();
        }
        const currentColor = cube.material.color.getHex();
        cube.material.color.setHex(
            Math.floor((targetColor - currentColor) / 2) / scaledFramerate()
        );
    });
    renderer.startRendering();
    const speedControl = addSpeedControl(renderer.renderer.domElement.parentNode);
    speedControl.onChange(value => {
        rotationSpeed = value;
    });
});

function addSpeedControl(parentNode) {
    const speedControl = new RangeSlider(
        0.25,
        4,
        0.25,
        1
    );
    speedControl.attachToElement(parentNode);
    speedControl.setStyles({
        maxWidth: '50vw',
        minWidth: '200px',
        width: '24rem'
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
    );
    speedControl.setLabel('Speed');
    return speedControl;
}

const scaledFramerate = () => Math.floor(FRAMERATE / rotationSpeed);

/**
 * get rotation to add for a single frame to achieve
 * one quarter rotation per second.
 */
const quarterRotationFrame = () => 0.5 * Math.PI / scaledFramerate();

const rotationInterval = (frame, parts) => Math.floor(frame % (scaledFramerate() * parts));

const roundToNearestQuarterRotation = (radian) => {
    return Math.round(radian / (Math.PI * 0.5)) * Math.PI * 0.5;
};

const cubeRotationCallback = cube => frame => {
    const isInFirstHalfOfInterval = rotationInterval(frame, 2) > (scaledFramerate() - 1);
    if (isInFirstHalfOfInterval) {
        cube.rotation.y = roundToNearestQuarterRotation(cube.rotation.y);
        cube.rotation.x += quarterRotationFrame();
    } else {
        cube.rotation.x = roundToNearestQuarterRotation(cube.rotation.x);
        cube.rotation.y += quarterRotationFrame();
    }
};