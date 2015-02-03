'use strict';

angular.module("appModule")
    .controller('mainCtrl', function($scope, $http){
        console.log("main controller loaded!");

        $scope.textField = "";

        $scope.textFieldWeight = "";
        // Normally, data like this would be stored in a database, and this controller would issue an http:get request for it.
        $scope.data = [
            {text: "fish", weight: 0},
            {text: "test", weight: 5},
            {text: "fish2", weight: 3}

        ];

        $scope.getPets = function(){
            $http.get('api/pets').success(function(pets) {
                $scope.data = pets;
            });
        };

        $scope.getPets();

        $scope.addData = function(){
            if($scope.textField.length >= 1) {
                $http.post('api/pets', {text: $scope.textField}).success(function(){
                    $scope.getPets();
                });
                $scope.textField = "";
                $scope.textFieldWeight = "";
            }
        };

        $scope.removeData = function(index){
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
            var maxWeight = $scope.data[0].weight;
            var name = $scope.data[0].text;
            for(var i = 1; i < $scope.data.length; i++){
                if($scope.data[i].weight > maxWeight){
                    maxWeight = $scope.data[i].weight;
                    name = $scope.data[i].text
                }
            }
            return name + " " + maxWeight;
        };

    });