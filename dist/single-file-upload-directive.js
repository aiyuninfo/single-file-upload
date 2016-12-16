/* globals $ */
(function() {
    'use strict';

    angular
        .module('aiyun.single.file.upload',['ngFileUpload'])
        .directive('singleFileUpload', fileUpload)
        .controller('fileUploadController',fileUploadController );

    fileUpload.$inject = [];
    fileUploadController.$inject = ['$scope','$timeout','Upload'];

    function fileUpload () {
        var directive = {
            replace: true,
            restrict: 'EA',
            // templateUrl:'template/single-file-upload.html',
            template : '<button class="btn btn-primary" type="file" ngf-select="uploadFiles($file, $invalidFiles)" ngf-max-size="3MB"><span class="glyphicon glyphicon-cloud-upload"></span>&nbsp;&nbsp;<span>Select File</span>&nbsp;&nbsp;[<span>{{fileUrl}}</span>]</button>',
            scope: {
                uploadUrl: '@',  //图片上传的地址
                fileUrl : "="
            },
            controller: 'fileUploadController',
            link : function (scope,iElem,iAttr,ngmodel) {

            }
        };
        return directive;
    }

    function fileUploadController($scope,$timeout,Upload){
        $scope.uploadFiles = function(file, errFiles) {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: $scope.uploadUrl,
                    data: {file: file}
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        $scope.fileUrl = response.data[0].path;
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        }
    }
})();
