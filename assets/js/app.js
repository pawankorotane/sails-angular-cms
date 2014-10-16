"use strict"


/**
*  Module
*
* Description
*/
angular.module('angcms', [ 'angcms.services','angcms.controllers', 'ui.bootstrap', 'ui.router','ngCookies','message.flash','angcms.filters','ui.tinymce']).
run(function($cookies, $location){
   
   // if($cookies.loggedInUser == ''){
     // $location.path('/login');
    //  return false;
   // }
}).
config(function ($httpProvider) {
    
    $httpProvider.interceptors.push('myHttpInterceptor');
}).config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    	$stateProvider.state('login',{
    			url : '/login',
    			templateUrl: '/templates/admin/login.html',
            	controller: 'AdminLoginCtrl'
    	}).state('admin',{
    		url : '/admin/pages',
    		templateUrl: '/templates/admin/pages.html',
            controller: 'AdminPagesCtrl'
    	}).state('adminedit',{
    		url :'/admin/add-edit-page/:id',
    		templateUrl: '/templates/admin/add-edit-page.html',
            controller: 'AddEditPageCtrl'
    	}).state('page_url',{
          url : "/:url",
          templateUrl :'/templates/page.html',
          controller : 'PageCtrl'
      });
        
        $urlRouterProvider.otherwise("/home");
       
    }
]).directive('messageFlash', [function() {
  return {
    controller: function($scope, flashMessageService, $timeout) {
      $scope.$on('NEW_MESSAGE', function() {
        $scope.message = flashMessageService.getMessage();
        $scope.isVisible = true;
        return $timeout(function() {
          $scope.isVisible = false;
          return $scope.message = '';
        }, 2500);
      })
    },
    template: '<p ng-if="isVisible" class="alert alert-info">{{message}}</p>'
    }
  }
]).directive('navBar', [
  function() {
    return {
      controller: function($scope, pagesFactory, $location) {
        var path = $location.path().substr(0, 6);
        if (path == "/admin") {
          $scope.navLinks = [{
            title: 'Pages',
            url: 'admin'
          }, {
            title: 'Site Settings',
            url: 'admin/site-settings'
          }, ];
        } else {
          pagesFactory.getPages().then(
            function(response) {
              $scope.navLinks = response.data;
            }, function() {

            });
          }
        },
        templateUrl: '/templates/nav.html'

      };
  }
]).directive('adminLogin', [
  function() {
    return {
      controller: function($scope, $rootScope, $cookies) {
        $scope.loggedInUser = '';
       $scope.$on('USER_DETAILS', function(event, data){
           $scope.loggedInUser = data;
        });
       if($scope.loggedInUser == ''){
        $scope.loggedInUser = $cookies.loggedInUser;
       }
       
      },
      templateUrl: '/templates/admin/admin-login.html'
    };
  }
]);