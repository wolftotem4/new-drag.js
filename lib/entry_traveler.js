import { Entry, FileEntry, DirectoryEntry, DirectoryReader } from '..'

const EntryTraveler = {
    itemList : {
        /**
         * @param  {DataTransferItemList}  itemList
         * @return {Promise<File[]>}
         */
        travel(itemList)
        {
            /**
             * @type {Entry[]}
             */
            let entries = [];
            for (let i = 0; i < itemList.length; i++) {
                let item = itemList[i];
                /** @type {Entry|null} */
                let entry = item.webkitGetAsEntry();

                if (entry) {
                    entries.push(entry);
                }
            }

            return EntryTraveler.entry.travel(entries, "");
        }
    },

    entry : {
        /**
         * @param  {Entry[]}  entries
         * @param  {string}  path
         * @return {Promise<File[]>}
         */
        travel(entries, path)
        {
            return Promise.all(entries.map(function (entry) {
                if (entry.isFile) {
                    /** @type {FileEntry} */
                    let fileEntry = entry;
                    return EntryTraveler.fileEntry.get(fileEntry, path);
                } else {
                    /** @type {DirectoryEntry} */
                    let dirEntry = entry;
                    return EntryTraveler.dirEntry.travel(dirEntry, path);
                }
            })).then((array) => {
                return Array.prototype.concat.apply([], array);
            });
        }
    },

    fileEntry : {
        /**
         * @param  {FileEntry}   entry
         * @param  {string}  path
         * @return {Promise<File[]>}
         */
        get(entry, path)
        {
            return EntryTraveler.fileEntry._file(entry).then((file) => {
                file['xRelativePath'] = path + file.name;
                return [file];
            });
        },

        /**
         * @param  {FileEntry}  entry
         * @return {Promise<File>}
         * @private
         */
        _file(entry)
        {
            return new Promise((resolve, reject) => entry.file(resolve, reject));
        }
    },

    dirEntry : {
        /**
         * @param  {DirectoryEntry}  entry
         * @param  {string}  path
         * @return {Promise<File[]>}
         */
        travel(entry, path)
        {
            return EntryTraveler.dirEntry._read(entry.createReader()).then((entries) => {
                return EntryTraveler.entry.travel(entries, path + entry.name + "/");
            });
        },

        /**
         * @param  {DirectoryReader}  reader
         * @return {Promise<Entry[]>}
         * @private
         */
        _read(reader)
        {
            return new Promise((resolve, reject) => {
                reader.readEntries((entries) => {
                    if (entries.length) {
                        EntryTraveler.dirEntry._read(reader).then((sub) => {
                            resolve(entries.concat(sub));
                        }, reject);
                    } else {
                        resolve([]);
                    }
                }, reject);
            });
        }
    }
};

export default EntryTraveler;