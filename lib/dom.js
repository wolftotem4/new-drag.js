/**
 * @param  {HTMLElement}  element
 * @param  {string}  className
 */
function addClassName(element, className)
{
    var classNames = getClassNames(element);
    if (classNames.indexOf(className) == -1) {
        classNames.push(className);
        setClassNames(element, classNames);
    }
}

/**
 * @param  {HTMLElement}  element
 * @param  {string}  className
 */
function removeClassName(element, className)
{
    var classNames = getClassNames(element);
    /**
     * @type {number}
     */
    var index;
    if ((index = classNames.indexOf(className)) > -1) {
        classNames.splice(index, 1);
        setClassNames(element, classNames);
    }
}

/**
 * @param  {HTMLElement}  element
 * @return {string[]}
 */
function getClassNames(element)
{
    return element.className && element.className.split(' ') || [];
}

/**
 * @param  {HTMLElement}  element
 * @param  {string[]}  classNames
 */
function setClassNames(element, classNames)
{
    element.className = classNames.join(' ');
}

export { addClassName, removeClassName, getClassNames, setClassNames }
