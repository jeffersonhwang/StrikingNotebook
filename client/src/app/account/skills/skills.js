var skills = angular.module('account.skills', ['ngRoute', 'security.authorization', 'xeditable', 'services.accountResource']);
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

skills.controller('SkillsCtrl', ['$scope', '$http', '$timeout', 'editableOptions', 'accountResource',
  function($scope, $http, $timeout, editableOptions, accountResource) {
    $scope.searchText = '';
    $scope.skillDivisions = [];
    $scope.masteryLevels = ["Awkward", "Comfortable", "Mastered"];
    $scope.saved = null;

    var userId = 1;
    // editable options settings
    editableOptions.theme = 'bs3';
    editableOptions.icon_set = 'font-awesome';

    $scope.loadSkills = function() {
      accountResource.getAccountDetails().then(function(res) {
        userId = res.account._id;
        $http.get('/api/profile/skills/' + userId).then(function(res) {
          $scope.skillDivisions = res.data.skills.divisions;
        });
      });
    };

    $scope.save = function() {
      $http.put('/api/profile/skills/' + userId, $scope.skillDivisions)
        .then(function(res) {
          $scope.saved = res.status === 200;

          $timeout(function() {
            $scope.saved = !$scope.saved;
            $scope.$apply();
          }, 2500);
        });
    };

    $scope.removeSkill = function(rootIndex, parentIndex, index) {
      $scope.skillDivisions[rootIndex].categories[parentIndex].types.splice(index, 1);
    };

    $scope.loadSkills();
  }
])
.directive("addTechniqueButton", function() {
  return {
    restrict: "E",
    replace: true,
    template: "<button add-technique class=\"btn btn-info\">Add Technique</button>"
  };
})
.directive("addTechnique", function($compile) {
  return function($scope, element, attrs) {
    element.bind("click", function() {
      $scope.category.types.push({
        "name": "Technique",
        "notes": "",
        "mastery": ""
      });
      $scope.$apply();
      console.log("Added a new type!");
    });
  };
});
