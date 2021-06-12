export const isWebGlAvailable = () => {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl'));
}