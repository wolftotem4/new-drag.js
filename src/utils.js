/**
 * @param  {File | File[] | FileList}  files 
 * @param  {string}  fieldName 
 * @return {FormData}
 */
export function toFormData(files, fieldName = "files[]") {
    var formData = new FormData();

    if (files instanceof File) {
        formData.append(fieldName, files, relativePath(files));
    } else {
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            formData.append(fieldName, file, relativePath(file));
        }
    }

    return formData;
}

/**
 * @param  {any}  file
 * @return {string} 
 */
export function relativePath(file) {
    return file.xRelativePath || file.webkitRelativePath || file.name;
}