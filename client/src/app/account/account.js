angular.module('account.index', ['ngRoute', 'security.authorization', 'services.accountResource']);
angular.module('account.index').config(['$routeProvider', 'securityAuthorizationProvider', function($routeProvider, securityAuthorizationProvider){
  $routeProvider
    .when('/account', {
      templateUrl: 'account/account.tpl.html',
      controller: 'AccountCtrl',
      title: 'account',
      resolve: {
        authenticatedUser: securityAuthorizationProvider.requireAuthenticatedUser
      }
    });
}]);
angular.module('account.index').controller('AccountCtrl', [ '$scope', 'accountResource',
  function($scope, accountResource){
    $scope.recentActivity = [];

    $scope.loadActivity = function() {
      accountResource.getRecentActivity().then(function(res) {
        $scope.recentActivity = res.activity;
      });
    };

    $scope.loadActivity();
  }]);
