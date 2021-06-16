import {BoxGeometry, Mesh, MeshPhongMaterial} from "../lib/three.module.js";

export const DEFAULT_CUBE_COLOR = 0x9920aa;

/**
 *
 * @param {number} width
 * @constructor
 */
export const Cube = (width) => {
    const material = new MeshPhongMaterial(
        {color: DEFAULT_CUBE_COLOR}
    );
    const geometry = new BoxGeometry(width, width, width);
    return new Mesh(geometry, material);
};