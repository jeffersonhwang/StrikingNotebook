var skills = angular.module('account.skills', ['ngRoute', 'security.authorization', 'xeditable']);
skills.config(['$routeProvider', 'securityAuthorizationProvider', function($routeProvider, securityAuthorizationProvider){
  $routeProvider
    .when('/account/skills', {
      templateUrl: 'account/skills/skills.tpl.html',
      controller: 'SkillsCtrl',
      title: 'skills',
      resolve: {
        authenticatedUser: securityAuthorizationProvider.requireAuthenticatedUser
      }
    });
}]);

skills.controller('SkillsCtrl', ['$scope', '$http', 'editableOptions',
  function($scope, $http, editableOptions) {
    $scope.skillDivisions = [];
    $scope.masteryLevels = ["Awkward", "Comfortable", "Mastered"];

    // editable options settings
    editableOptions.theme = 'bs2';

    $scope.loadSkills = function() {
      $http.get('/api/profile/skills/1').then(function(res) {
        $scope.skillDivisions = res.data.skills.divisions;
      });
    };

    $scope.save = function() {
      $http.put('/api/profile/skills/1', $scope.skillDivisions)
        .then(function(res) {
          if (res.status === 200) {
            console.log("Saved!");
          }
          else {
            console.log("Failed to save!");
          }
        });
    };


    $scope.loadSkills();
  }
])
.directive("addTechniqueButton", function() {
  return {
    restrict: "E",
    replace: true,
    template: "<button add-technique>Add Technique</button>"
  };
})
.directive("addTechnique", function($compile) {
  return function($scope, element, attrs) {
    element.bind("click", function() {
      $scope.category.types.push({
        "name": "",
        "notes": "",
        "mastery": ""
      });
      $scope.$apply();
      console.log("Added a new type!");
    });
  };
});