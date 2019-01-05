import { DropZoneArguments } from "..";
import { EVENT_DRAGENTER, EVENT_DRAGLEAVE } from "./dropzone_event";

class DropZoneDom
{
    /**
     * @param {DropZoneArguments} args 
     */
    constructor(args)
    {
        this.args = args
    }

    registerEventListeners()
    {
        this.args.element.addEventListener(EVENT_DRAGENTER, () => {
            this.addClassName(this.getDragOverClass());
        }, false);

        this.args.element.addEventListener(EVENT_DRAGLEAVE, () => {
            this.removeClassName(this.getDragOverClass());
        }, false);
    }

    /**
     * @returns {string}
     */
    getDragOverClass()
    {
        return this.args.options.cssClass && this.args.options.cssClass.dragover || 'is-dragover';
    }

    /**
     * @param  {string}  className
     * @return {this}
     */
    addClassName(className)
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
    removeClassName(className)
    {
        var classNames = this.getClassNames();
        /**
         * @type {number}
         */
        var index;
        if ((index = classNames.indexOf(className)) > -1) {
            classNames.splice(index, 1);
            this.setClassNames(classNames);
        }
        return this
    }

    /**
     * @return {string[]}
     */
    getClassNames()
    {
        return this.args.element.className && this.args.element.className.split(' ') || [];
    }

    /**
     * 
     * @param  {string[]}  classNames
     * @return {this}
     */
    setClassNames(classNames)
    {
        this.args.element.className = classNames.join(' ');
        return this
    }
}

export default DropZoneDom
