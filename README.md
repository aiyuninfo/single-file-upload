# single-file-upload
单文件上传组件<br>

```
bower install aiyun-single-file-upload --save
```

```Javascript

(function () {
    'use strict';

    angular.module("app",['aiyun.single.file.upload'])
        .run(run);

    run.$inject = [];

    function run() {

    }

    angular.module("app").controller("appController",AppController);
    AppController.$inject = ["$scope"];
    function AppController($scope) {
        var vm = this;
        vm.isSingle = false;
        vm.url = 'http://localhost:8081/web/fileUpload';
        vm.files = "abc.png";
        vm.getAllFiles = function (fileList) {
            console.log(vm.files);
        }
    }
})();
```

```HTML
<div class="container" ng-controller="appController as vm">
    {{vm.files}}
    <br>
    <single-file-upload upload-url="{{vm.url}}" file-url="vm.files"></single-file-upload>
</div>
```
