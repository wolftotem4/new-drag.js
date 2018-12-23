import DropZone from "./dropzone";
import { toFormData, relativePath } from "./utils";

/**
 * @return {boolean}
 */
export function isSupported() {
    return typeof FileList !== 'undefined'
}
export { DropZone }
export const utils = { toFormData, relativePath }
