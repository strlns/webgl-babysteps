/**
 *
 * @param {Renderer} renderer
 */
export const resizeHandler = (renderer) => () => {
    renderer.renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.camera.aspect = window.innerWidth / window.innerHeight;
    renderer.camera.updateProjectionMatrix();
};