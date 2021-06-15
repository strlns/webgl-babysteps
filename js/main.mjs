import throwIfNoWebGl from "./webgl-availability/throwIfNoWebGl.mjs";
import initScene from "./scene/initScene.mjs";
import {Cube} from "./polyeder/polyeder.mjs";
import Renderer from "./renderer/Renderer.mjs";
import addDirectionalLight from "./light/addDirectionalLight.mjs";
import addAmbientLight from "./light/addAmbientLight.mjs";
import RangeSlider from "./controls/RangeSlider.mjs";
import ColorTransition from "./util/ColorTransition.mjs";
import PauseButton from "./controls/PauseButton.mjs";

throwIfNoWebGl();

let rotationSpeed = 1;

let paused = false;

const FRAMERATE = 60;

const CONTROLS_MARGIN = '1rem';

document.addEventListener('DOMContentLoaded', () => {
    const {scene, camera} = initScene();
    const renderer = new Renderer(camera, scene);
    addAmbientLight(scene);
    addDirectionalLight(scene);
    const cube = Cube(.75);
    scene.add(cube);
    camera.updateProjectionMatrix();
    const getNewTargetColor = () => Math.floor(cube.material.color.getHex() + Math.random() * 0xffffff) % 0xffffff;
    const getTransition = () => new ColorTransition(
        cube.material.color.getHex(),
        getNewTargetColor(),
        scaledFramerate()
    );
    let transition = getTransition();
    renderer.registerCallback(cubeRotationCallback(cube));
    renderer.registerCallback((frame) => {
        if (paused) return;
        if (frame % scaledFramerate() === 1) {
            transition = getTransition()
        }
        cube.material.color.setHex(
            transition.step()
        )

    });
    renderer.startRendering();
    const speedControl = addSpeedControl(renderer.getCanvasParent());
    speedControl.onChange(value => {
        rotationSpeed = value;
    });
    const pauseBtn = addPauseButton(renderer.getCanvasParent());
    pauseBtn.onClick(() => paused = !paused);
});

function addPauseButton(parentNode) {
    const btn = new PauseButton();
    btn.setLabel('⏸');
    btn.domElement.title = 'PAUSE';
    btn.setWrapperStyles(
        {
            ...wrapperBaseStyles,
            right: CONTROLS_MARGIN
        }
    );
    btn.setStyles(
        {
            fontSize: '1.5rem',
            color: '#fff',
            border: '1px solid #fff',
            boxShadow: '2px inset #afafaf',
            padding: '.25em',
            backgroundColor: '#000',
            borderRadius: '.25em',
            cursor: 'pointer'
        }
    );
    btn.attachToElement(parentNode);
    return btn;
}

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
            ...wrapperBaseStyles,
            left: '1rem',
            flexDirection: 'column'
        }
    );
    speedControl.setLabel('Speed');
    return speedControl;
}

const wrapperBaseStyles = {
    position: 'absolute',
    top: '1rem',
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.5rem'
}

const scaledFramerate = () => Math.floor(FRAMERATE / rotationSpeed);

/**
 * get rotation to add for a single frame to achieve
 * one quarter rotation per interval (one second at speed=1 and 60fps).
 */
const quarterRotationFrame = () => 0.5 * Math.PI / scaledFramerate();

const rotationInterval = (frame, parts) => Math.floor(frame % (scaledFramerate() * parts));

const roundToNearestQuarterRotation = (radian) => {
    return Math.round(radian / (Math.PI * 0.5)) * Math.PI * 0.5;
};

const cubeRotationCallback = cube => frame => {
    if (paused) return;
    const isInFirstHalfOfInterval = rotationInterval(frame, 2) > (scaledFramerate() - 1);
    if (isInFirstHalfOfInterval) {
        cube.rotation.y = roundToNearestQuarterRotation(cube.rotation.y);
        cube.rotation.x += quarterRotationFrame();
    } else {
        cube.rotation.x = roundToNearestQuarterRotation(cube.rotation.x);
        cube.rotation.y += quarterRotationFrame();
    }
};