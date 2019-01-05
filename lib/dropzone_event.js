import { DropZoneArguments } from "..";
import DragJsDataTransfer from "./dragjs_datatransfer";
import { isSupported } from "./dragjs";

class DropZoneEvent
{
    /**
     * @param {DropZoneArguments} args 
     */
    constructor(args)
    {
        this.args = args;
        this.dragEnterCounter = 0;
    }

    registerEventListeners()
    {
        if (isSupported()) {
            this.args.element.addEventListener('dragover', this._dragOver.bind(this), false);
            this.args.element.addEventListener('dragenter', this._dragEnter.bind(this), false);
            this.args.element.addEventListener('dragleave', this._dragLeave.bind(this), false);
            this.args.element.addEventListener('drop', this._drop.bind(this), false);
        }
    }

    /**
     * @private
     *
     * @param {Event} e
     */
    _dragOver(e)
    {
        let dataTransfer = this._toFileDataTransfer(e)
        if (dataTransfer) {
            dataTransfer.dropEffect = "copy"
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
            this.args.element.dispatchEvent(new CustomEvent(EVENT_DRAGENTER));
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
        this.args.element.dispatchEvent(new CustomEvent(EVENT_DRAGLEAVE));
    }

    /**
     * @private
     * 
     * @param {Event} e
     */
    _drop(e)
    {
        let originalDataTransfer = this._toFileDataTransfer(e)

        if (originalDataTransfer) {
            this.dragEnterCounter = 0;
            this._raiseEventDragLeave();

            let dataTransfer = new DragJsDataTransfer(originalDataTransfer)

            dataTransfer.getFiles().then((files) => {
                if (files.length) {
                    this.args.element.dispatchEvent(new CustomEvent(EVENT_DROP, {
                        detail: {files}
                    }))
                }
            }, (reason) => {
                var notPrevented = this.args.element.dispatchEvent(new CustomEvent(EVENT_ERR, {
                    cancelable: true, 
                    detail: {reason}
                }));
                if (notPrevented) {
                    console.error(reason);
                }
            })
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

export default DropZoneEvent;
export const EVENT_DRAGENTER = 'dropzone-dragenter';
export const EVENT_DRAGLEAVE = 'dropzone-dragleave';
export const EVENT_DROP = 'dropzone-drop';
export const EVENT_ERR = 'dropzone-error';
