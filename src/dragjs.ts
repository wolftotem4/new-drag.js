import DropZone from "./dropzone";
import { toFormData, relativePath } from "./utils";

export function isSupported() : boolean {
    return typeof FileList !== 'undefined'
}
export { DropZone }
export const utils = { toFormData, relativePath }
