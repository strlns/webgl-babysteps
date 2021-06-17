// noinspection JSBitwiseOperatorUsage

/**
 * Simple color transition utility.
 * @author Moritz Rehbach
 *
 * Just "pop" values using the step() method,
 * and specify in advance how many steps the transition should take.
 * Timing must be managed externally, e.g. using requestAnimationFrame.
 *
 * If steps should be skipped, use the step() method and discard the result, or add a skip() method.
 */
export default class ColorTransition {
    /**
     * @type number
     * Color value to transition from
     */
    startColor;
    /**
     * @type number
     * Color value to transition to
     */
    endColor;

    /**
     * @type number
     * Number of steps the transition should take (e.g. frames)
     */
    steps;

    /**
     * @private
     * @type number
     */
    currentColor;

    redDiff;
    greenDiff;
    blueDiff;

    redComponentRatio;
    greenComponentRatio;
    blueComponentRatio;

    /**
     * @param startColor
     * @param endColor
     * @param steps
     */
    constructor(startColor, endColor, steps) {
        this.steps = steps;
        this.startColor = startColor;
        this.endColor = endColor;

        this.currentColor = this.startColor;

        this.redDiff = (this.endColor & RED) - (this.startColor & RED);
        this.greenDiff = (this.endColor & GREEN) - (this.startColor & GREEN);
        this.blueDiff = (this.endColor & BLUE) - (this.startColor & BLUE);

        this.redComponentRatio = this.redDiff / (this.redDiff + this.greenDiff + this.blueDiff);
        this.greenComponentRatio = this.greenDiff / (this.redDiff + this.greenDiff + this.blueDiff);
        this.blueComponentRatio = this.greenDiff / (this.redDiff + this.greenDiff + this.blueDiff);
    }

    /**
     * Advance transition by one step and return intermediate color.
     * @return number Current hex color value
     */
    step() {
        this.currentColor += (this.redComponentRatio * (this.redDiff / this.steps)) & RED;
        this.currentColor += (this.greenComponentRatio * (this.greenDiff / this.steps)) & GREEN;
        this.currentColor += (this.blueComponentRatio * (this.blueDiff / this.steps)) & BLUE;
        return Math.floor(this.currentColor);
    }
}

const RED = 0xff0000;
const GREEN = 0x00ff00;
const BLUE = 0x0000ff;