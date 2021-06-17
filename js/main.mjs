import throwIfNoWebGl from "./webgl-availability/throwIfNoWebGl.mjs";
import initScene from "./scene/initScene.mjs";
import {Cube, DEFAULT_CUBE_COLOR} from "./polyeder/polyeder.mjs";
import Renderer from "./renderer/Renderer.mjs";
import addDirectionalLight from "./light/addDirectionalLight.mjs";
import addAmbientLight from "./light/addAmbientLight.mjs";
import RangeSlider from "./controls/RangeSlider.mjs";
import ColorTransition from "./util/ColorTransition.mjs";
import PauseButton from "./controls/PauseButton.mjs";
import ColorInput from "./controls/ColorInput.mjs";
import Checkbox from "./controls/Checkbox.mjs";
import setStyles from "./util/setStyles.mjs";

throwIfNoWebGl();

let rotationSpeed = 1;

let paused = false;

const FRAMERATE = 60;

const CONTROLS_MARGIN = '1rem';

let cubeColorFixed = DEFAULT_CUBE_COLOR;

let isColorCycling = true;

document.addEventListener('DOMContentLoaded', () => {
    const {scene, camera} = initScene();
    const renderer = new Renderer(camera, scene);
    addAmbientLight(scene);
    addDirectionalLight(scene);
    const cube = Cube(.75);
    scene.add(cube);
    camera.updateProjectionMatrix();
    const getNewRandomTargetColor = () => Math.floor(Math.random() * (0xffffff))
    const getTransition = () => new ColorTransition(
        cube.material.color.getHex(),
        getNewRandomTargetColor(),
        scaledFramerate()
    );
    let transition = getTransition();
    renderer.registerCallback(cubeRotationCallback(cube));
    renderer.registerCallback((frame) => {
        if (paused) return;
        if (frame % scaledFramerate() === 1) {
            if (isColorCycling) {
                transition = getTransition();
            }
        }
        if (isColorCycling) {
            cube.material.color.setHex(
                transition.step()
            );
        } else if (cube.material.color.getHex() !== cubeColorFixed) {
            cube.material.color.setHex(cubeColorFixed);
        }

    });
    renderer.startRendering();
    const speedControl = addSpeedControl(renderer.getCanvasParent());
    speedControl.onChange(value => {
        rotationSpeed = value;
    });
    const pauseBtn = addPauseButton(renderer.getCanvasParent());
    pauseBtn.onClick(() => paused = !paused);

    const colorControlWrap = document.createElement('DIV');
    setStyles({
        ...wrapperBaseStyles,
        position: 'absolute',
        right: CONTROLS_MARGIN,
        bottom: CONTROLS_MARGIN,
        minHeight: '4rem',
        justifyContent: 'space-between'
    }, colorControlWrap);
    renderer.getCanvasParent().appendChild(colorControlWrap);

    const cycleCheckbox = addCycleCheckbox(colorControlWrap);
    cycleCheckbox.onChange(val => {
        isColorCycling = val;
        colorInput.disabled = val;
    });

    const colorInput = addColorInput(colorControlWrap);
    colorInput.onChange(val => {
        cubeColorFixed = val;
    });
});

function addPauseButton(parentNode) {
    const btn = new PauseButton();
    btn.setLabel('⏸');
    btn.domElement.title = 'PAUSE';
    btn.setWrapperStyles(
        {
            ...wrapperBaseStyles,
            position: 'absolute',
            top: CONTROLS_MARGIN,
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

function addCycleCheckbox(parentNode) {
    const input = new Checkbox(true);
    input.setLabel('Cycle color randomly');
    input.setWrapperStyles({...wrapperBaseStyles, flexDirection: 'row'});
    input.setStyles({order: -1, marginRight: '0.5em'})
    input.attachToElement(parentNode);
    return input;
}

function addColorInput(parentNode) {
    const input = new ColorInput(DEFAULT_CUBE_COLOR, true);
    input.attachToElement(parentNode);
    input.setLabel('Set fixed color');
    input.setWrapperStyles({...wrapperBaseStyles, flexDirection: 'row'})
    setStyles({
        marginLeft: '.5em'
    }, input.label);
    return input;
}

function addSpeedControl(parentNode) {
    const speedControl = new RangeSlider(
        0.25,
        4,
        0.25,
        1
    );
    speedControl.setStyles({
        maxWidth: '50vw',
        minWidth: '200px',
        width: '24rem',
        top: CONTROLS_MARGIN,
    });
    speedControl.setWrapperStyles(
        {
            ...wrapperBaseStyles,
            position: 'absolute',
            top: CONTROLS_MARGIN,
            left: CONTROLS_MARGIN,
        }
    );
    speedControl.setLabel('Speed');
    speedControl.attachToElement(parentNode);
    return speedControl;
}


export const wrapperBaseStyles = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: '1.125rem'
};

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