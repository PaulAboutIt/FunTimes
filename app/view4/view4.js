'use strict';

angular.module('myApp.view4', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view4', {
    templateUrl: 'view4/view4.html',
    controller: 'View4Ctrl as view'
  });
}])

.controller('View4Ctrl', ['$http', '$timeout', '$scope', '$window', function($http, $timeout, $scope, $window) {
    var length = 2000;
    var aud = document.getElementById("myAudio");
    var gif = document.getElementById("gif");
    var scr = document.getElementById("screen");
    var third = null;
    var vids = [];
    $scope.timer = 2000;
    var tag = 'strippers';
    /*$scope.image = './view1/funtimes.jpg';*/
    var timerRule = true;
    var api = 0;
    var apiKey = '&api-key=39YAprx5Yi';
    var mobile = true;
    $scope.$watch(function(){
        return $window.innerWidth;
    }, function(value) {
        if (value > 600) {
            mobile = false;
        } else {
            mobile = true;
        }
    });
    var urls = [
        'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='/*,*/
        /*'http://replygif.net/api/gifs?tag=',*/
        /*'https://api.popkey.co/v2/media/random?q='*/
    ];
    
    
    $scope.getList = function() {
        
        
        $http({
          method: 'GET',
          url: 'http://a.4cdn.org/gif/catalog.json'
        }).then(function successCallback(response) {
                
                for(var i=0; i<response.threads.length;i++){
                    if(response.threads[i].ext=='.gif') {
                        
                        vids.push('https://i.4cdn.org/gif/'+response.threads[i].tim +'.gif');    
                    }
                    for(var n=0; n<response.threads[i].last_replies[n]; n++) {
                        if(response.threads[i].last_replies[n].ext=='.gif') {
                            vids.push('https://i.4cdn.org/gif/'+response.threads[i].last_replies[n].tim +'.gif');
                            
                        }
                    }
                    
                }
                
                
                $scope.timer = 4200;
                
                
          }, function errorCallback(response) {
                /*api = Math.floor((Math.random() * urls.length));*/
                /*$scope.getImageData();*/
                return
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
        
    };
    $scope.getList();
    $scope.image = '';
    $timeout(function(){
            
            /*Get the next image data*/
            
            $scope.image = vids[Math.floor((Math.random() * vids.length))];
            
        }, 4000); 
    
    
    
}]);




