import {DirectionalLight, DirectionalLightHelper} from "../lib/three.module.js"


export default function addDirectionalLight(
    scene,
    color = [0xffafff],
    intensity = 5,
    position = [10, 5, 0],
    targetPosition = [2.5, 1, 1]
) {
    const light = new DirectionalLight(color, intensity)
    light.position.set(...position)
    light.target.position.set(...targetPosition)
    const lightHelper = new DirectionalLightHelper(light)
    scene.add(lightHelper)
    scene.add(light)
    scene.add(light.target)
    const updateLight = () => {
        light.target.updateMatrixWorld()
        lightHelper.update()
    }
    updateLight()
}