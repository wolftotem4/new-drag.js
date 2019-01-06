import { listen, EVENT_DRAGENTER, EVENT_DRAGLEAVE } from './event';
import { addClassName, removeClassName } from './dom';

/**
 * 
 * @param {HTMLElement} element 
 * @param {string} className 
 */
function cssDragOver(element, className) {
    listen(element);

    element.addEventListener(EVENT_DRAGENTER, () => {
        addClassName(element, className);
    }, false);

    element.addEventListener(EVENT_DRAGLEAVE, () => {
        removeClassName(element, className);
    }, false);
};

export { cssDragOver }
