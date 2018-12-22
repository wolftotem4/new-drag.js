import { travelTransferItemList } from "./entry_traveler";


class DragJsDataTransfer
{
    originalDataTransfer : DataTransfer | null;

    constructor(originalDataTransfer: DataTransfer | null = null)
    {
        this.originalDataTransfer = originalDataTransfer;
    }

    /**
     * @return {Promise<File[] | FileList>}
     */
    getFiles() : Promise<File[] | FileList>
    {
        if (! this.originalDataTransfer) {
            return Promise.resolve([]);
        }

        let dataTransfer = this.originalDataTransfer;

        if (dataTransfer.items) {
            let items = dataTransfer.items;

            return travelTransferItemList(items);
        } else {
            return Promise.resolve(dataTransfer.files);
        }
    }

    /**
     * @param  {Event}  event
     * @return {DataTransfer|null}
     */
    static event2NativeDataTransfer(event: Event) : DataTransfer | null
    {
        if (! (event instanceof DragEvent)) {
            return null;
        }

        return event.dataTransfer || null;
    }

    /**
     * @param  {DataTransfer}  dataTransfer
     * @return {boolean}
     */
    static getContainFiles(dataTransfer : DataTransfer) : boolean
    {
        let dataTransferTypes = dataTransfer.types;

        if (! dataTransferTypes) {
            // Unsupported Browser, we presume it was a file.
            return true;
        }

        if (dataTransferTypes instanceof DOMStringList) {
            return dataTransferTypes.contains('Files');
        } else {
            return dataTransferTypes.indexOf('Files') > -1;
        }
    }
}

export default DragJsDataTransfer;