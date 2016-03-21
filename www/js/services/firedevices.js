angular.module('App')

    /*
     |--------------------------------------------------------------------------
     | FirebaseDataFactory
     |--------------------------------------------------------------------------
     |
     | Factory to help us do firebase related methods to GET, POST, PUT, DELETE
     | data on the server.
     |
     */

    .factory('devicesFactory', ['$http', '$q','$firebaseArray', 'Firebase', 'FURL', function($http, $q, $firebaseArray,  Firebase, FURL) {

        var ref = new Firebase(FURL).child('devices');
        var factory = {};
        var deferred = $q.defer();

        factory.get = function(uid) {
            //var list = $firebaseArray(ref);
            var query = ref.orderByChild("uid").equalTo(uid);
            console.log(uid);
            var syncArray = $firebaseArray(query);
            syncArray.$loaded()
                .then(function(devices) {
                    deferred.resolve(devices);
                })
                .catch(function(error) {
                    deferred.resolve(error);
                });
            return deferred.promise;
        };

        factory.post = function(device) {
            var list = $firebaseArray(ref);
            list.$add(device).then(function() {
                deferred.resolve();
            });
            return deferred.promise;
        };

        factory.delete =function(arr,id){
            arr.$remove(id)
               .then(function(ref) {
               console.log(ref);
            });
        }
        return factory;
    }]);