"use strict"


/**
* angcms.controlllers Module
*
* Description
*/
angular.module('angcms.controllers', []).
 
controller('AdminPagesCtrl', ['$scope', '$log', 'pagesFactory', function($scope, $log , pagesFactory){
	
	 pagesFactory.getPages().then(
      function(response) {
        $scope.allPages = response.data;
      },
      function(err) {
        $log.error(err);
      });

      $scope.deletePage = function(id) {
        pagesFactory.deletePage(id);
      };

}]).
 controller('AdminLoginCtrl', ['$scope', '$location', '$cookies', 'AuthService','$log','flashMessageService','$rootScope',
      function($scope, $location, $cookies, AuthService, $log,flashMessageService, $rootScope) {
        $scope.credentials = {
          username: '',
          password: ''
        };
        $scope.login = function(credentials) {
          AuthService.login(credentials).then(
            function(res, err) {
              $cookies.loggedInUser = res.data.username;
              $rootScope.$broadcast('USER_DETAILS', $cookies.loggedInUser);
              $location.path('/admin/pages');
            },
            function(err) {
              flashMessageService.setMessage(err.data);
			        $log.log(err);
            });
          };
      }
  ]).controller('AddEditPageCtrl', ['$scope', '$log', 'pagesFactory', '$stateParams', '$location', 'flashMessageService', '$filter',
        function($scope, $log, pagesFactory, $stateParams, $location, flashMessageService, $filter) {
        $scope.pageContent = {};
        $scope.pageContent.id = $stateParams.id;
        $scope.heading = "Add a New Page";
        $scope.updateURL=function(){
            $scope.pageContent.url = $filter('formatURL')($scope.pageContent.title);
        }
        if ($scope.pageContent.id !== 0) {
          $scope.heading = "Update Page";
          pagesFactory.getAdminPageContent($scope.pageContent.id).then(
              function(response) {
                $scope.pageContent = response.data;
                $log.info($scope.pageContent);
              },
              function(err) {
                $log.error(err);
              });
        }

        $scope.savePage = function() {
          pagesFactory.savePage($scope.pageContent).then(
            function() {
              flashMessageService.setMessage("Page Saved Successfully");
              $location.path('/admin/pages');
            },
            function(err) {
              flashMessageService.setMessage(err.data);
            }
          );
        };
    }
]).controller('AppCtrl', ['$scope','AuthService','flashMessageService','$location','$cookies', '$rootScope',
      function($scope,AuthService,flashMessageService,$location, $cookies, $rootScope) {
        $scope.site = {
            logo: "img/angcms-logo.png",
            footer: "Copyright 2014 Angular CMS"
        };
        $scope.logout = function() {
            AuthService.logout().then(
              function() {
                $cookies.loggedInUser = '';
                $scope.$emit("USER_DETAILS", $cookies.loggedInUser);
               
                $location.path('/login');
                flashMessageService.setMessage("Successfully logged out");

              }, function(err) {
                  console.log('there was an error tying to logout');
              });
          };
    }
]).controller('PageCtrl',  [ '$scope','pagesFactory', '$stateParams' ,'$sce', function($scope, pagesFactory, $stateParams, $sce) {
    var url = $stateParams.url;
  
    pagesFactory.getPageContent(url).then(
      function(response) {
          $scope.pageContent = {};
          $scope.pageContent.title = response.data[0].title;
          $scope.pageContent.content = $sce.trustAsHtml(response.data[0].content);
      }, function() {
        console.log('error fetching data');
      });
    }]);