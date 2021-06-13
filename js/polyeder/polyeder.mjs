import {BoxGeometry, Mesh, MeshPhongMaterial} from "../lib/three.module.js";

const geometry = new BoxGeometry();
const material = new MeshPhongMaterial({color: 0x9920aa});
export const cube = new Mesh(geometry, material);