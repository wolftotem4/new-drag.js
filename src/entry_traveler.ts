/**
 * @param  {any}  reader
 * @return {Promise<File[]>}
 */
function travelDirEntry(reader : any) : Promise<File[]>
{
    return new Promise((resolve, reject) => {
        reader.readEntries((entries : any[]) => {
            if (entries.length) {
                travelDirEntry(reader).then((sub) => {
                    resolve(entries.concat(sub));
                }, reject);
            } else {
                resolve([]);
            }
        }, reject);
    });
}

/**
 * 
 * @param  {any}  fileEntry
 * @param  {string}  path
 * @return {Promise<File[]>}
 */
function fileEntry(fileEntry : any, path : string) : Promise<File[]>
{
    return readFileEntry(fileEntry).then((file : any) => {
        file.xRelativePath = path + file.name;
        return [file];
    });
}

/**
 * @param {any}  dirEntry
 * @param {string}  path
 */
function dirEntry(dirEntry: any, path : string) : Promise<File[]>
{
    return readDirEntry(dirEntry).then((entries) => {
        return travelEntries(entries, path + dirEntry.name + "/")
    });
}

/**
 * @param  {any[]} entries 
 * @param  {string}  path
 * @return {Promise<File[]>}
 */
function travelEntries(entries : any[], path : string = "") : Promise<File[]>
{
    return Promise.all(entries.map((entry) => {
        return (entry.isFile) ? fileEntry(entry, path) : dirEntry(entry, path);
    })).then((array) => {
        return Array.prototype.concat.apply([], array);
    });
}

/**
 * @param  {any}  fileEntry
 * @return {Promise<File>}
 */
function readFileEntry(fileEntry : any) : Promise<File>
{
    return new Promise((resolve, reject) => fileEntry.file(resolve, reject));
}

/**
 * @param  {any}  dirEntry
 * @return {Promise<File[]>}
 */
function readDirEntry(dirEntry : any) : Promise<File[]>
{
    return travelDirEntry(dirEntry.createReader());
}

/**
 * @param  {DataTransferItemList}  items
 * @return {any[]}
 */
function getAsEntry(items: DataTransferItemList) : any[]
{
    var entries = [];

    for (var i = 0; i < items.length; i++) {
        var item = items[i];

        var entry = item.webkitGetAsEntry();

        if (entry) {
            entries.push(entry);
        }
    }

    return entries;
}

/**
 * 
 * @param  {DataTransferItemList}  items
 * @return {Promise<File[]}
 */
export function travelTransferItemList(items: DataTransferItemList) : Promise<File[]>
{
    return travelEntries(getAsEntry(items));
}
