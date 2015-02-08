/**
 * Created by denz0045 on 2/5/15.
 */
'use strict';

angular.module("appModule")
    .controller('GPACtrl', function($scope, $http){
        console.log("GPA controller loaded!");

        $scope.textFieldClasses = "";

        $scope.textFieldCredits = "";

        $scope.textFieldGrade = "";
        // Normally, data like this would be stored in a database, and this controller would issue an http:get request for it.
        $scope.data = [
            //used for testing purposes
            //{text:"cat",weight:3},
            //{text:"dog",weight:6}
        ];

        $scope.getGPA = function(){
            $http.get('api/gpaDatabase').success(function(GPA) {
                $scope.data = GPA;
            });
        };


        $scope.addClassInfo = function(){
            if($scope.textFieldClasses.length >= 1) {
                $http.post('api/gpaDatabase', {classes: $scope.textFieldClasses, grade: $scope.textFieldGrade, credits:$scope.textFieldCredits}).success(function(){
                    $scope.getGPA();
                });
                $scope.textFieldClasses = "";
                $scope.textFieldGrade = "";
                $scope.textFieldCredits = "";
            }
        };

        $scope.removeData = function(index){
            $http.delete('/api/gpaDatabase/' + $scope.data[index]._id).success(function(){
                $scope.getGPA();
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
