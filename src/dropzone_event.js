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
    }

    registerEventListeners()
    {
        "drag dragstart dragend dragover dragenter dragleave drop".split(" ").forEach((event) => {
            this.args.element.addEventListener(event, this._stopEventsPropagation.bind(this), false)
        });

        if (isSupported()) {
            "dragover dragenter".split(" ").forEach((event) => {
                this.args.element.addEventListener(event, this._dragOver.bind(this), false);
            })

            "dragleave dragend drop".split(" ").forEach((event) => {
                this.args.element.addEventListener(event, this._dragEnd.bind(this), false);
            })

            this.args.element.addEventListener('drop', this._drop.bind(this), false);
        }
    }

    /**
     * @private
     *
     * @param {Event} e
     */
    _stopEventsPropagation(e)
    {
        e.preventDefault();
        e.stopPropagation();
    }

    /**
     * @private
     *
     * @param {Event} e
     */
    _dragOver(e)
    {
        let dataTransfer = DragJsDataTransfer.event2NativeDataTransfer(e);

        let containFiles = dataTransfer ? DragJsDataTransfer.getContainFiles(dataTransfer) : false;

        if (containFiles) {
            this.args.element.dispatchEvent(new CustomEvent(EVENT_DRAGOVER));
        }
    }

    /**
     * @private
     */
    _dragEnd()
    {
        this.args.element.dispatchEvent(new CustomEvent(EVENT_DRAGEND));
    }

    /**
     * @private
     * 
     * @param {Event} e
     */
    _drop(e)
    {
        var dataTransfer = new DragJsDataTransfer(DragJsDataTransfer.event2NativeDataTransfer(e))

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

export default DropZoneEvent;
export const EVENT_DRAGOVER = 'dropzone-dragover';
export const EVENT_DRAGEND = 'dropzone-dragend';
export const EVENT_DROP = 'dropzone-drop';
export const EVENT_ERR = 'dropzone-error';
