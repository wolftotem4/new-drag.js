export function toFormData(files : File | File[] | FileList, fieldName : string = "files[]") : FormData {
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

export function relativePath(file : any) : string {
    return file.xRelativePath || file.webkitRelativePath || file.name;
}