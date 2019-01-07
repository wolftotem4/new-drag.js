import DropZone from "./dropzone";
import { toFormData, relativePath } from "./utils";
import { listen } from './event';
import { cssDragOver } from './style';

/**
 * @return {boolean}
 */
export function isSupported() {
    if (typeof FileList !== 'undefined' && typeof Promise !== 'undefined') {
        try {
            // IE has problems with .preventDefault() on custom events
            // http://stackoverflow.com/questions/23349191
            var ce = new window.CustomEvent('test', { cancelable: true });
            ce.preventDefault();
            return (ce.defaultPrevented === true);
        } catch (e) {
            return false;
        }
    }

    return false;
}
export { DropZone }
export const utils = { toFormData, relativePath }
export const event = { listen }
export const style = { cssDragOver }
