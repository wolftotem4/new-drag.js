# new-drag.js

## Introduction

A file drag-and-drop plugin for browser.

## Features

* A pure library.
* Lightweight (Minimized drag.js ~6.84 KiB)
* Folders upload

## Basic Usage

### Upload Files with axios

```html
<style>
#droparea {
  width: 300px;
  height: 300px;
  background: #ccc;
  color: #333;
}

#droparea.is-dragover {
  background: #dedede;
}
</style>
<div id="droparea">Drag and Drop Files Here</div>
<script src="dragjs.js"></script>
<script>
var elem = document.getElementById('droparea');
var dragzone = new DragJs.DropZone(elem);

dragzone.listenOnDrop(function (files) {
  /* 'files[]' is the HTTP POST field name you like. */
  var formData = DragJs.utils.toFormData(files, 'files[]');

  /* Or you like to do the job by yourself. */
  // var formData = new FormData();
  // for (var i = 0; i < files.length; i++) {
  //   var file = files[i];
  //   var relativePath = file.xRelativePath || file.webkitRelativePath || file.name;
  //   formData.append('files[]', file, relativePath);
  // }

  // Appending more POST data.
  // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
  formData.append('field1', 'Hello World!');
  formData.append('action', 'upload');

  axios({
    method: 'post',
    url: 'upload.php',
    data: formData,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
  });
});
</script>
```

### Upload Files with jQuery

```html
<style>
#droparea {
  width: 300px;
  height: 300px;
  background: #ccc;
  color: #333;
}

#droparea.is-dragover {
  background: #dedede;
}
</style>
<div id="droparea">Drag and Drop Files Here</div>
<script src="dragjs.js"></script>
<script>
(function($) {
  var elem = document.getElementById('droparea');
  var dragzone = new DragJs.DropZone(elem);

  $(elem).on('dropzone-drop', function (e) {
    var files = e.detail.files;

    /* 'files[]' is the HTTP POST field name you like. */
    var formData = DragJs.utils.toFormData(files, 'files[]');

    /* Or you like to do the job by yourself. */
    // var formData = new FormData();
    // for (var i = 0; i < files.length; i++) {
    //   var file = files[i];
    //   var relativePath = file.xRelativePath || file.webkitRelativePath || file.name;
    //   formData.append('files[]', file, relativePath);
    // }

    // Appending more POST data.
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
    formData.append('field1', 'Hello World!');
    formData.append('action', 'upload');

    $.ajax({
      type: 'post',
      url: 'upload.php',
      data: formData,
      contentType: false,
      processData: false
    });
  });
})(jQuery);
</script>
```

## CSS class

### Usage
```html
<style>
#droparea {
  /* default style */
  background: #dedede;
}

#droparea.is-dragover {
  /* dragover triggered! */
  background: #ccc;
}
</style>

<div id="droparea" style="width: 300px; height: 300px;">
  /* Drag and Drop Files Here. */
</div>
```

### Customize class name

```js
var elem = document.getElementById('dropzone');
var dropzone = new DragJs.DropZone(elem, {
  cssClass: {
    dragover: "my-dragover-class"
  }
});
```

## INPUT tag upload

```html
<input type="file" id="input_files" multiple>
<script src="dragjs.js"></script>
<script>
function upload(files) {
  axios({
    method: 'post',
    url: 'upload.php',
    data: DragJs.utils.toFormData(files, 'files[]'),
    config: { headers: {'Content-Type': 'multipart/form-data' }}
  });
}

var input = document.getElementById('input_files');

input.addEventListener('change', function () {
  upload(elem.files);
}, false);
</script>
```

## Browser Support

* Internet Explorer 10+ (Promise & attachEvent polyfills required.)
* Microsoft Edge
* Google Chrome
* Mozilla Firefox

## Alternative

* new-drag.js-closure ([GitHub](https://github.com/wolftotem4/new-drag.js-closure), [npm](https://www.npmjs.com/package/new-drag.js-closure)) - Coded in Google Closure

