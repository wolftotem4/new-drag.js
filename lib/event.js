import DragJsDataTransfer from "./dragjs_datatransfer";

class DropZoneEvent
{
    /**
     * @param {HTMLElement} elem
     * @param {boolean} listenDrop
     */
    constructor(elem, listenDrop = false)
    {
        this.element = elem;
        this.dragEnterCounter = 0;
        this.listenDrop = listenDrop;

        elem['dragJsEventHandler'] = this

        this.element.addEventListener('dragover', this._dragOver.bind(this), false);
        this.element.addEventListener('dragenter', this._dragEnter.bind(this), false);
        this.element.addEventListener('dragleave', this._dragLeave.bind(this), false);
        this.element.addEventListener('drop', this._drop.bind(this), false);
    }

    /**
     * @private
     *
     * @param {Event} e
     */
    _dragOver(e)
    {
        if (this.listenDrop) {
            let dataTransfer = this._toFileDataTransfer(e)
            if (dataTransfer) {
                dataTransfer.dropEffect = "copy"
            }
        }
    }

    /**
     * @private
     *
     * @param {Event} e
     */
    _dragEnter(e)
    {
        let dataTransfer = this._toFileDataTransfer(e)

        if (dataTransfer && this.dragEnterCounter++ == 0) {
            this.element.dispatchEvent(new CustomEvent(EVENT_DRAGENTER));
        }
    }

    /**
     * @private
     *
     * @param {Event} e
     */
    _dragLeave(e)
    {
        let dataTransfer = this._toFileDataTransfer(e)

        if (dataTransfer && --this.dragEnterCounter == 0) {
            this._raiseEventDragLeave()
        }
    }

    /**
     * @private
     */
    _raiseEventDragLeave()
    {
        this.element.dispatchEvent(new CustomEvent(EVENT_DRAGLEAVE));
    }

    /**
     * @private
     * 
     * @param {Event} e
     */
    _drop(e)
    {
        this.dragEnterCounter = 0;
        this._raiseEventDragLeave();

        if (this.listenDrop) {
            let originalDataTransfer = this._toFileDataTransfer(e)

            if (originalDataTransfer) {
                let dataTransfer = new DragJsDataTransfer(originalDataTransfer)

                dataTransfer.getFiles().then((files) => {
                    if (files.length) {
                        this.element.dispatchEvent(new CustomEvent(EVENT_DROP, {
                            detail: {files}
                        }))
                    }
                }, (reason) => {
                    var notPrevented = this.element.dispatchEvent(new CustomEvent(EVENT_ERR, {
                        cancelable: true, 
                        detail: {reason}
                    }));
                    if (notPrevented) {
                        console.error(reason);
                    }
                })
            }
        }
    }

    /**
     * @private
     *
     * @param  {Event}  e
     * @return {DataTransfer | null}
     */
    _toFileDataTransfer(e)
    {
        let dataTransfer = DragJsDataTransfer.event2NativeDataTransfer(e);

        let containFiles = dataTransfer ? DragJsDataTransfer.getContainFiles(dataTransfer) : false;

        if (containFiles) {
            e.preventDefault();

            return dataTransfer;
        }
    }
}

/**
 * @param {HTMLElement} element
 * @param {boolean} listenDrop
 */
function listen(element, listenDrop = false) {
    if (! element['dragJsEventHandler']) {
        new DropZoneEvent(element, listenDrop);
    } else if (listenDrop) {
        /**
         * @type {DropZoneEvent}
         */
        let handler = element['dragJsEventHandler'];
        handler.listenDrop = listenDrop;
    }
}

export { DropZoneEvent, listen };
export const EVENT_DRAGENTER = 'dropzone-dragenter';
export const EVENT_DRAGLEAVE = 'dropzone-dragleave';
export const EVENT_DROP = 'dropzone-drop';
export const EVENT_ERR = 'dropzone-error';
