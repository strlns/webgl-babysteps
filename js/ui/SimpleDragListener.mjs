import {
    Vector2,
} from '../lib/three.mjs';

/**
 * Starting point was dumbing down this example,
 * https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_drag.html
 * but we only need simple (x,y) mouse/touch data with approximate "distance".
 * Mix of closure and ES2015 class, everything is done in constructor. This could be cleaned up.
 */
class SimpleDragListener {
    /**
     *
     * @param {HTMLElement} _domElement
     * @param {Function} callback
     */
    constructor(_domElement, callback = null) {

        const _direction = new Vector2();
        const _callbacks = [];

        let _isPointerDown = false;
        let _posAtPointerDown = [0, 0];

        function activate() {

            _domElement.addEventListener('pointermove', onPointerMove);
            _domElement.addEventListener('pointerdown', onPointerDown);
            _domElement.addEventListener('pointerup', onPointerCancel);
            _domElement.addEventListener('pointerleave', onPointerCancel);
            _domElement.addEventListener('touchmove', onTouchMove, {passive: false});
            _domElement.addEventListener('touchstart', onTouchStart, {passive: false});
            _domElement.addEventListener('touchend', onTouchEnd);

            _domElement.style.cursor = 'grab';

            resetPosAtPointerDown();

            if (callback) {
                _callbacks.push(callback);
            }

        }

        function deactivate() {

            _domElement.removeEventListener('pointermove', onPointerMove);
            _domElement.removeEventListener('pointerdown', onPointerDown);
            _domElement.removeEventListener('pointerup', onPointerCancel);
            _domElement.removeEventListener('pointerleave', onPointerCancel);
            _domElement.removeEventListener('touchmove', onTouchMove);
            _domElement.removeEventListener('touchstart', onTouchStart);
            _domElement.removeEventListener('touchend', onTouchEnd);

            _domElement.style.cursor = '';

        }

        function removeCallback(callbackFn) {
            const index = _callbacks.indexOf(callbackFn);
            if (index !== -1) {
                _callbacks.splice(index, 1);
            }
        }

        function addCallback(callbackFn) {
            _callbacks.push(callbackFn);
        }

        function onPointerMove(event) {

            event.preventDefault();
            onMouseMove(event);

        }

        function onMouseMove(event) {
            if (_isPointerDown) {
                handleMove(event);
            }
        }

        function handleMove(event) {

            const rect = _domElement.getBoundingClientRect();

            _direction.x = (event.clientX - _posAtPointerDown[0]) / rect.width;
            _direction.y = -(event.clientY - _posAtPointerDown[1]) / rect.height;
            //wasteful, doesn't matter.
            _callbacks.forEach(
                callback => callback.call(this, _direction)
            );

        }

        function onPointerDown(event) {

            event.preventDefault();

            _isPointerDown = true;
            _posAtPointerDown = [event.clientX, event.clientY];

        }

        function resetPosAtPointerDown() {
            const rect = _domElement.getBoundingClientRect();
            _posAtPointerDown = [rect.x + rect.width / 2, rect.y + rect.height / 2];
        }

        function onPointerCancel(event) {

            event.preventDefault();
            _isPointerDown = false;
            resetPosAtPointerDown();
        }

        function onTouchMove(event) {

            event.preventDefault();
            if (_isPointerDown) {
                event = event.changedTouches[0];
                handleMove(event);
            }

        }

        function onTouchStart(event) {

            event.preventDefault();
            event = event.changedTouches[0];
            handleMove(event);

        }

        function onTouchEnd(event) {

            event.preventDefault();

            _domElement.style.cursor = 'auto';

        }

        activate();
        this.enabled = true;

        // mix of closure and ES2015 class, everything is done in constructor. this could be cleaned up.

        // API

        this.addCallback = addCallback;
        this.removeCallback = removeCallback;
        this.activate = activate;
        this.deactivate = deactivate;

    }

}

export {SimpleDragListener};
