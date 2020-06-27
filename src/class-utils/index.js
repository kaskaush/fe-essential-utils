/**
 * Returns a singleton instance of given class.
 *
 * @param {class} classInstance instance of the class
 * @param {string} id custom id for the class
 * @returns {class} singleton class instance
 */
const getSingleTonInstance = (classInstance, id) => {
    window[`__tmp__${id}`] = window[`__tmp__${id}`] || new classInstance();
    return window[`__tmp__${id}`];
};

export const ClassUtils = { getSingleTonInstance };
