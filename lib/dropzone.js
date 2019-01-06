import { DropZoneOptions, DropZoneDropCallback, DropZoneFallback } from "..";
import DropZoneEvent, { EVENT_DROP, EVENT_ERR } from "./dropzone_event";
import DropZoneDom from "./dropzone_dom";

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

        this.events = new DropZoneEvent(element, options);
        this.dom = new DropZoneDom(element, options);

        this._init();
    }

    /**
     * @private
     */
    _init()
    {
        this.events.registerEventListeners();
        this.dom.registerEventListeners();
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
}

export default DropZone
