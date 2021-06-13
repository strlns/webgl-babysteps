import {AmbientLight} from "../lib/three.module.js";

export default function addAmbientLight(
    scene,
    color = 0x4f2a5c
) {
    const light = new AmbientLight(color);
    scene.add(light);
}