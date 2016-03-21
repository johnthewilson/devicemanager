
'Use Strict';
angular.module('App')
/*
     |--------------------------------------------------------------------------
     | Devices Controller
     |--------------------------------------------------------------------------
     |
     | Controller calling the device list from our device Factory and updating the View.
     |
     */
    .controller('devicesController', function ($scope,$location, $state,$localStorage, $http, $ionicModal, Auth, FURL, Utils, devicesFactory) {


    $scope.device ={
       uid : Auth.user.uid
    };

    devicesFactory.get($localStorage.userid).then(function (data) {
        console.log(data);
        $scope.devices=data;
    });

    $scope.logOut = function () {
        Auth.logout();
        $location.path("/login");
    }
    $ionicModal.fromTemplateUrl('templates/newDevice.html', { scope: $scope }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.closeNew = function () {
        $scope.modal.hide();
    };
    $scope.newTodo = function () {
        $scope.modal.show();
    };
    $scope.addDevice = function (device) {

        device.uid = Auth.user.uid;
        console.log(device);
        devicesFactory.post(device).then(function() {
            $scope.modal.hide();
            $scope.device.name="";
            $scope.device.number="";
        })
    };
    $scope.deleteDevice = function (id) {
        console.log(id);
        //$scope.devices.$remove(id);
        devicesFactory.delete($scope.devices,id);

    }
    $scope.logOut = function () {
        Auth.logout();
        $location.path("/login");
    }

});
