import {BoxGeometry, Mesh, MeshBasicMaterial} from "../lib/three.module.js";

const geometry = new BoxGeometry();
const material = new MeshBasicMaterial({color: 0x9920aa})
export const cube = new Mesh(geometry, material);