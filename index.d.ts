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
