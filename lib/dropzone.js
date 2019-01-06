import { DropZoneOptions, DropZoneDropCallback, DropZoneFallback } from "..";
import { listen, EVENT_DROP, EVENT_ERR } from "./event";
import { cssDragOver } from "./style";
import { isSupported } from "./dragjs";

class DropZone
{
    /**
     * @param {HTMLElement} element
     * @param {DropZoneOptions} options
     */
    constructor(element, options = {})
    {
        this.element = element;
        this.options = options;

        if (isSupported()) {
            listen(element, true);
            cssDragOver(element, this.getDragOverClass());
        }
    }

    /**
     * 
     * @param  {DropZoneDropCallback}  callback
     * @param  {DropZoneFallback=}  fallback
     * @return {this}
     */
    listenOnDrop(callback, fallback)
    {
        this.element.addEventListener(EVENT_DROP, function (e) {
            callback(e.detail.files);
        }, false);

        if (fallback) {
            this.element.addEventListener(EVENT_ERR, function (e) {
                e.preventDefault();
                fallback(e.detail.reason);
            })
        }

        return this
    }

    /**
     * @return {Promise<File[] | FileList>}
     */
    getDropFiles()
    {
        return new Promise((resolve, reject) => {
            this.element.addEventListener(EVENT_DROP, function (e) {
                resolve(e.detail.files);
            }, false);
        })
    }

    /**
     * @returns {string}
     */
    getDragOverClass()
    {
        return this.options.cssClass && this.options.cssClass.dragover || 'is-dragover';
    }
}

export default DropZone
