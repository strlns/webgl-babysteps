/**
 *
 * @param {Renderer} renderer
 * @param {Function[]} callbacks
 */
export const resizeHandler = (renderer, callbacks = []) => () => {
    renderer.renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.camera.aspect = window.innerWidth / window.innerHeight;
    renderer.camera.updateProjectionMatrix();
    for (const fn of callbacks) {
        fn.call(null, renderer)
    }
};