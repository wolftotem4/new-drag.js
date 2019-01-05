!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.DragJs=t():e.DragJs=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";n.r(t);n(0);var r={itemList:{travel:function(e){for(var t=[],n=0;n<e.length;n++){var a=e[n].webkitGetAsEntry();a&&t.push(a)}return r.entry.travel(t,"")}},entry:{travel:function(e,t){return Promise.all(e.map(function(e){if(e.isFile){var n=e;return r.fileEntry.get(n,t)}var a=e;return r.dirEntry.travel(a,t)})).then(function(e){return Array.prototype.concat.apply([],e)})}},fileEntry:{get:function(e,t){return r.fileEntry._file(e).then(function(e){return e.xRelativePath=t+e.name,[e]})},_file:function(e){return new Promise(function(t,n){return e.file(t,n)})}},dirEntry:{travel:function(e,t){return r.dirEntry._read(e.createReader()).then(function(n){return r.entry.travel(n,t+e.name+"/")})},_read:function(e){return new Promise(function(t,n){e.readEntries(function(a){a.length?r.dirEntry._read(e).then(function(e){t(a.concat(e))},n):t([])},n)})}}},a=r;function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var s=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.originalDataTransfer=t}var t,n,r;return t=e,r=[{key:"event2NativeDataTransfer",value:function(e){return e instanceof DragEvent&&e.dataTransfer||null}},{key:"getContainFiles",value:function(e){var t=e.types;return!t||(t instanceof DOMStringList?t.contains("Files"):t.indexOf("Files")>-1)}}],(n=[{key:"getFiles",value:function(){if(!this.originalDataTransfer)return Promise.resolve([]);var e=this.originalDataTransfer;if(e.items){var t=e.items;return a.itemList.travel(t)}return Promise.resolve(e.files)}}])&&i(t.prototype,n),r&&i(t,r),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var u=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.args=t,this.dragEnterCounter=0}var t,n,r;return t=e,(n=[{key:"registerEventListeners",value:function(){y()&&(this.args.element.addEventListener("dragover",this._dragOver.bind(this),!1),this.args.element.addEventListener("dragenter",this._dragEnter.bind(this),!1),this.args.element.addEventListener("dragleave",this._dragLeave.bind(this),!1),this.args.element.addEventListener("drop",this._drop.bind(this),!1))}},{key:"_dragOver",value:function(e){var t=this._toFileDataTransfer(e);t&&(t.dropEffect="copy")}},{key:"_dragEnter",value:function(e){this._toFileDataTransfer(e)&&0==this.dragEnterCounter++&&this.args.element.dispatchEvent(new CustomEvent(l))}},{key:"_dragLeave",value:function(e){this._toFileDataTransfer(e)&&0==--this.dragEnterCounter&&this._raiseEventDragLeave()}},{key:"_raiseEventDragLeave",value:function(){this.args.element.dispatchEvent(new CustomEvent(f))}},{key:"_drop",value:function(e){var t=this,n=this._toFileDataTransfer(e);n&&(this.dragEnterCounter=0,this._raiseEventDragLeave(),new s(n).getFiles().then(function(e){e.length&&t.args.element.dispatchEvent(new CustomEvent(c,{detail:{files:e}}))},function(e){t.args.element.dispatchEvent(new CustomEvent(v,{cancelable:!0,detail:{reason:e}}))&&console.error(e)}))}},{key:"_toFileDataTransfer",value:function(e){var t=s.event2NativeDataTransfer(e);if(!!t&&s.getContainFiles(t))return e.preventDefault(),t}}])&&o(t.prototype,n),r&&o(t,r),e}(),l="dropzone-dragenter",f="dropzone-dragleave",c="dropzone-drop",v="dropzone-error";function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var h=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.args=t}var t,n,r;return t=e,(n=[{key:"registerEventListeners",value:function(){var e=this;this.args.element.addEventListener(l,function(){e.addClassName(e.getDragOverClass())},!1),this.args.element.addEventListener(f,function(){e.removeClassName(e.getDragOverClass())},!1)}},{key:"getDragOverClass",value:function(){return this.args.options.cssClass&&this.args.options.cssClass.dragover||"is-dragover"}},{key:"addClassName",value:function(e){var t=this.getClassNames();return-1==t.indexOf(e)&&(t.push(e),this.setClassNames(t)),this}},{key:"removeClassName",value:function(e){var t,n=this.getClassNames();return(t=n.indexOf(e))>-1&&(n.splice(t,1),this.setClassNames(n)),this}},{key:"getClassNames",value:function(){return this.args.element.className&&this.args.element.className.split(" ")||[]}},{key:"setClassNames",value:function(e){return this.args.element.className=e.join(" "),this}}])&&d(t.prototype,n),r&&d(t,r),e}();function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var p=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.element=t,this.options=n,this.events=new u({element:t,options:n}),this.dom=new h({element:t,options:n}),this._init()}var t,n,r;return t=e,(n=[{key:"_init",value:function(){this.events.registerEventListeners(),this.dom.registerEventListeners()}},{key:"listenOnDrop",value:function(e,t){return this.element.addEventListener(c,function(t){e(t.detail.files)},!1),t&&this.element.addEventListener(v,function(e){e.preventDefault(),t(e.detail.reason)}),this}},{key:"getDropFiles",value:function(){var e=this;return new Promise(function(t,n){e.element.addEventListener(c,function(e){t(e.detail.files)},!1)})}}])&&g(t.prototype,n),r&&g(t,r),e}();function m(e){return e.xRelativePath||e.webkitRelativePath||e.name}function y(){return"undefined"!=typeof FileList}n.d(t,"isSupported",function(){return y}),n.d(t,"utils",function(){return E}),n.d(t,"DropZone",function(){return p});var E={toFormData:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"files[]",n=new FormData;if(e instanceof File)n.append(t,e,m(e));else for(var r=0;r<e.length;r++){var a=e[r];n.append(t,a,m(a))}return n},relativePath:m}}])});
//# sourceMappingURL=dragjs.js.map