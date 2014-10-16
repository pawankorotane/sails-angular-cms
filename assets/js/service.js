"use strict"


/**
*  Module
*
* Description
*/
angular.module('angcms.services', []).
factory('pagesFactory', ['$http', function($http){
	return {
      getPages: function() {
        return $http.get('/page');
      },

      savePage: function(pageData) {
        var id = pageData.id;
        

        if (id == 0) {
          return $http.post('/page/create', pageData);
        } else {
          return $http.put('/page/update/'+id, pageData);
        }
      },
      deletePage: function(id) {
        return $http.delete('/page/' + id);
      },
      getAdminPageContent: function(id) {
        
          return $http.get('/page/find/'+id);
        
        
      },
      getPageContent: function(url) {
        return $http.get('/page/?url=' + url + '&limit=1');
      },
    };
  
}]).
	factory('AuthService', ['$http', function($http) {
	  return {
	    login: function(credentials) {
	      return $http.post('/login', credentials);
	    },
	    logout: function() {
	      return $http.get('/logout');
	    }
  };
}]).factory('myHttpInterceptor', ['$q', '$location', function($q, $location) {
    return {
        response: function(response) {
            return response;
        },
        responseError: function(response) {
            if (response.status === 401) {
                $location.path('/login');
                return $q.reject(response);
            }
            return $q.reject(response);
        }
    };
}]);