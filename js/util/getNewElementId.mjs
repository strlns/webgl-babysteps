/**
 * no UUID, but enough here
 */
export const getNewElementId = () => Math.random().toString().replace(/0\./, '').slice(0, 12);

