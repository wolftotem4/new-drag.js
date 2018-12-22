import { DropZoneOptions, DropZoneDropCallback } from "..";
import DropZoneEvent, { EVENT_DROP } from "./dropzone_event";
import DropZoneDom from "./dropzone_dom";

class DropZone
{
    element: HTMLElement;

    options: DropZoneOptions;

    events: DropZoneEvent;

    dom: DropZoneDom;

    /**
     * @param {HTMLElement} element
     * @param {DropZoneOptions} options
     */
    constructor(element: HTMLElement, options: DropZoneOptions = {})
    {
        this.element = element;
        this.options = options;

        this.events = new DropZoneEvent({ element, options });
        this.dom = new DropZoneDom({ element, options });

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
     * @return {this}
     */
    listenOnDrop(callback : DropZoneDropCallback) : this
    {
        this.element.addEventListener(EVENT_DROP, function (e : CustomEvent) {
            callback(e.detail.files);
        }, false);
        return this
    }

    /**
     * @return {Promise<File[] | FileList>}
     */
    getDropFiles() : Promise<File[] | FileList>
    {
        return new Promise((resolve, reject) => {
            this.element.addEventListener(EVENT_DROP, function (e : CustomEvent) {
                resolve(e.detail.files);
            }, false);
        })
    }
}

export default DropZone
