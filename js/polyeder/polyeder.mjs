import {BoxGeometry, Mesh, MeshPhongMaterial} from "../lib/three.mjs";

export const DEFAULT_CUBE_COLOR = 0x9920aa;
/*
@todo Add actual polyeder, not only cube
 */
/**
 *
 * @param {number} width
 * @constructor
 *
 */
export const Cube = (width) => {
    const material = new MeshPhongMaterial(
        {color: DEFAULT_CUBE_COLOR}
    );
    const geometry = new BoxGeometry(width, width, width, 1, 16, 16);
    return new Mesh(geometry, material);
};