import DropZone from "./dropzone";
import { toFormData, relativePath } from "./utils";
import { listen } from './event';
import { cssDragOver } from './style';

/**
 * @return {boolean}
 */
export function isSupported() {
    return typeof FileList !== 'undefined'
}
export { DropZone }
export const utils = { toFormData, relativePath }
export const event = { listen }
export const style = { cssDragOver }
