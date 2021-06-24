import {AmbientLight} from "../lib/three.mjs";

export default function addAmbientLight(
    scene,
    color = 0xffffff
) {
    const light = new AmbientLight(color, 0.75);
    scene.add(light);
}