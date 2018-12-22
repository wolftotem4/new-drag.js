import { DropZoneArguments } from "..";
import { EVENT_DRAGOVER, EVENT_DRAGEND } from "./dropzone_event";

class DropZoneDom
{
    args : DropZoneArguments

    constructor(args : DropZoneArguments)
    {
        this.args = args
    }

    registerEventListeners()
    {
        this.args.element.addEventListener(EVENT_DRAGOVER, () => {
            this.addClassName(this.getDragOverClass());
        }, false);

        this.args.element.addEventListener(EVENT_DRAGEND, () => {
            this.removeClassName(this.getDragOverClass());
        }, false);
    }

    /**
     * @returns {string}
     */
    getDragOverClass() : string
    {
        return this.args.options.cssClass && this.args.options.cssClass.dragover || 'dragover';
    }

    /**
     * @param  {string}  className
     * @return {this}
     */
    addClassName(className: string) : this
    {
        var classNames = this.getClassNames();
        if (classNames.indexOf(className) == -1) {
            classNames.push(className);
            this.setClassNames(classNames);
        }
        return this
    }

    /**
     * @param  {string}  className
     * @return {this}
     */
    removeClassName(className: string) : this
    {
        var classNames = this.getClassNames(), index : number;
        if ((index = classNames.indexOf(className)) > -1) {
            classNames.splice(index, 1);
            this.setClassNames(classNames);
        }
        return this
    }

    /**
     * @return string[]
     */
    getClassNames() : string[]
    {
        return this.args.element.className && this.args.element.className.split(' ') || [];
    }

    setClassNames(classNames : string[]) : this
    {
        this.args.element.className = classNames.join(' ');
        return this
    }
}

export default DropZoneDom
