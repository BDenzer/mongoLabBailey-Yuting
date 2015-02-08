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
            //{classes:"cat",credits:5, grade:"A"},
            //{classes:"dog",credits:4, grade:"B"},
            //{classes:"test",credits:1, grade:"F"}
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

        $scope.calculateGPA = function(){
            var top = 0;
            var bottom = 0;
            var result = 0;
            for (var i=0;i<$scope.data.length;i++) {
                top = top + Number($scope.data[i].credits)*Number($scope.changeToNumber($scope.data[i].grade));
                bottom=bottom + Number($scope.data[i].credits);
            }
            result = top/bottom;
            return result;
        };

        $scope.changeToNumber = function(grade){
            var result=0;
            switch(grade) {
                case "A":
                    return result=4.0;
                    break;
                case "B":
                   return  result = 3.0;
                    break;
                case "C":
                    return result=2.0;
                    break;
                case "D":
                    return result = 1.0;
                    break;
                case "F":
                    return result=0.0;
                    break;

            }
            return null;
        };

        $scope.helperTestAddClasses = function(){
            $scope.textFieldClasses = "CSci 3601";
            $scope.textFieldCredits = 5;
            $scope.textFieldGrades = "A";
            $scope.addClassInfo();
            $scope.textFieldClasses = "CSci 3401";
            $scope.textFieldCredits = 4;
            $scope.textFieldGrades = "B";
            $scope.addClassInfo();
            $scope.textFieldClasses = "class5";
            $scope.textFieldCredits = 1;
            $scope.textFieldGrades = "F";
            $scope.addClassInfo();
        };
    });
