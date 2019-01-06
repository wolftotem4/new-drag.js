import { EVENT_DRAGENTER, EVENT_DRAGLEAVE } from "./dropzone_event";

class DropZoneDom
{
    /**
     * @param {HTMLElement} elem
     * @param {DropZoneOptions} options
     */
    constructor(elem, options)
    {
        this.element = elem
        this.options = options
    }

    registerEventListeners()
    {
        this.element.addEventListener(EVENT_DRAGENTER, () => {
            this.addClassName(this.getDragOverClass());
        }, false);

        this.element.addEventListener(EVENT_DRAGLEAVE, () => {
            this.removeClassName(this.getDragOverClass());
        }, false);
    }

    /**
     * @returns {string}
     */
    getDragOverClass()
    {
        return this.options.cssClass && this.options.cssClass.dragover || 'is-dragover';
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
        return this.element.className && this.element.className.split(' ') || [];
    }

    /**
     * 
     * @param  {string[]}  classNames
     * @return {this}
     */
    setClassNames(classNames)
    {
        this.element.className = classNames.join(' ');
        return this
    }
}

export default DropZoneDom
