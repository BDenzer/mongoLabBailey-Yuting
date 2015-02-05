'use strict';

angular.module("appModule")
    .controller('mainCtrl', function($scope, $http){
        console.log("main controller loaded!");

        $scope.textField = "";

        $scope.textFieldWeight = "";
        // Normally, data like this would be stored in a database, and this controller would issue an http:get request for it.
        $scope.data = [
            //used for testing purposes
            //{text:"cat",weight:3},
            //{text:"dog",weight:6}
        ];

        $scope.getPets = function(){
            $http.get('api/pets').success(function(pets) {
                $scope.data = pets;
            });
        };


        $scope.addData = function(){
            if($scope.textField.length >= 1) {
                $http.post('api/pets', {text: $scope.textField, weight: $scope.textFieldWeight}).success(function(){
                    $scope.getPets();
                });
                $scope.textField = "";
                $scope.textFieldWeight = "";
            }
        };

        $scope.removeData = function(index){it('dummy test should pass', function(){
        expect(true).toEqual(true);
    });
            $http.delete('/api/pets/' + $scope.data[index]._id).success(function(){
                $scope.getPets();
            });
        };

        $scope.cat = function(str1, str2){
            return str1 + str2;
        };

        $scope.itemsInList = function(){
            return $scope.data.length;
        };

        $scope.returnHeaviest = function(){
            var maxWeight = 0;
            var name = "";
            for(var i = 0; i < $scope.data.length; i++){
                if(parseFloat($scope.data[i].weight) > maxWeight){
                    maxWeight =parseFloat($scope.data[i].weight);
                    name = $scope.data[i].text
                }
            }
            return name + " " + maxWeight;
            //return 5;
        };

    });