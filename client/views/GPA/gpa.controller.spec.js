/**
 * Created by denz0045 on 2/8/15.
 */
'use strict';

//=== Testing mainCtrl =============================================
describe('Testing controller: GPACtrl', function(){

    // load the controller's module
    beforeEach(module('appModule'));

    var GPACtrl, scope;

    // Initialize the controller and mock scope.
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        GPACtrl = $controller('GPACtrl', {
            $scope: scope
        });
    }));

    it('dummy test should pass', function(){
        expect(true).toEqual(true);
    });

    //This doesn't pass as the helperTestAddClasses() doesn't actually add to tdata, it does pass if the needed information is hard coded into data though
    it("should be able to calculate the proper gpa", function(){
        scope.helperTestAddClasses();
        expect(scope.calculateGPA() == 3.2).toEqual(true);
    });

    //This doesn't pass as the helperTestAddClasses() doesn't actually add to data
    it("should be able to add course info", function(){
        var initialLength = scope.data.length;
        console.log(initialLength);
        scope.helperTestAddClasses();
        console.log(initialLength);
        expect(scope.data.length > initialLength).toEqual(true);
    });
});
