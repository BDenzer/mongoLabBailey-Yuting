/**
 * Created by denz0045 on 2/8/15.
 */
'use strict';

console.log("gpa.js loaded!");

angular.module("appModule")
    .config(function($stateProvider){
        $stateProvider
            .state('GPA', {
                url: '/gpa',
                templateUrl: 'views/GPA/GPA.html',
                controller: 'GPACtrl'
            });
    });
