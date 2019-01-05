export interface DropZoneDropCallback
{
    (files : File[] | FileList): void
}

export interface DropZoneFallback
{
    (reason : any): void
}

export interface DropZoneArguments
{
    element: HTMLElement,
    options: DropZoneOptions
}

export interface DropZoneOptions
{
    cssClass?: DropZoneClass
}

export interface DropZoneClass
{
    dragover?: string
}

export interface Entry
{
    isFile: boolean
}

export interface FileEntry extends Entry
{
    file(successCallback: FileEntrySuccessCallback, errorCallback?: any) : void
}

export interface FileEntrySuccessCallback
{
    (file: File) : void
}

export interface DirectoryEntry extends Entry
{
    createReader() : DirectoryReader
}

export interface DirectoryReader
{
    readEntries(successCallback: ReadEntriesSuccessCallback, errorCallback?: any): void
}

export interface ReadEntriesSuccessCallback
{
    (entry: Entry[]): void
}

