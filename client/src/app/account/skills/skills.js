var skills = angular.module('account.skills', ['ngRoute', 'security.authorization']);
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

// make it into tabs later
// offense -> Punches, Kicks, Elbows, Knees
 
// progress bar for skills
// skills.directive('ProgressBar', [
//   function() {
//     return {
//       restrict: 'A',
//       scope: {
//         ''
//       },
//     };
//   }
// ]);

skills.controller('SkillsCtrl', ['$scope', '$http', 
  function($scope, $http) {
    $scope.skillDivisions = [];

    $scope.loadSkills = function() {
      $http.get('/api/profile/skills/1')
        .then(function(res) {
          $scope.skillDivisions = res.data.skills.division;
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

    $scope.update = function(skills) {
      $scope.skillDivisions = angular.copy(skills);
    };

    $scope.loadSkills();
  }
]);