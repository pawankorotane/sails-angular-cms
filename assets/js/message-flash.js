"use strict"


angular.module('message.flash', [])
.factory('flashMessageService', ['$rootScope',function($rootScope) {
  var message = '';
  return {
    getMessage: function() {
      return message;
    },
    setMessage: function(newMessage) {
      message = newMessage;
      $rootScope.$broadcast('NEW_MESSAGE');
    
}
  };
}]);