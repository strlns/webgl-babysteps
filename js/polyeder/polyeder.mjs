import {BoxGeometry, Mesh, MeshPhongMaterial} from "../lib/three.module.js";

/**
 *
 * @param {number} width
 * @constructor
 */
export const Cube = (width) => {
    const material = new MeshPhongMaterial(
        {color: 0x9920aa}
    );
    const geometry = new BoxGeometry(width, width, width);
    return new Mesh(geometry, material);
};