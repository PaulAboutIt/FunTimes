'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$http', '$timeout', '$scope', function($http, $timeout, $scope) {
    var length = 2000;
    var aud = document.getElementById("myAudio");
    $scope.timer = 2000;
    var tag = '';
    $scope.getImage = function() {
        $http({
          method: 'GET',
          url: 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC' + tag
        }).then(function successCallback(response) {
                
                console.log(aud.currentTime);
                setTag();
                
                    $scope.image = response.data.data.image_original_url;
                
                length = parseInt(response.data.data.image_frames);
                $scope.timer = length *190;
                if ($scope.timer > 6000)
                    $scope.timer = 6000;
                $timeout(function(){
                    $scope.$apply(function () {
                        $scope.getImage();
                    });
                    
                }, $scope.timer);                            
                
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
        
    };
    $scope.getImage();
    function setTag() {
        var arr = [];
        var int = Math.floor((Math.random() * 5));
        if(aud.currentTime < 165){
            /*It's OK Now*/
            arr= ['dancing+girl','ok','girl+power','africa','dance+crew']
            return tag = '&tag=' + arr[int];
        } else if(aud.currentTime > 165 && aud.currentTime < 240){
            /*I'm a Soldier*/
            arr= ['soldier','war','fight','struggle','guns']
            return tag = '&tag=' + arr[int];
        } else if(aud.currentTime > 240 && aud.currentTime < 585){
            arr= ['cosmic','time+space','science','space','mind+blown']
            return tag = '&tag=' + arr[int];
        } else if(aud.currentTime > 585 && aud.currentTime < 730){
            arr= ['bruce lee','lucy','sushi','anime','japan']
            return tag = '&tag=' + arr[int];
        } else if(aud.currentTime > 730 && aud.currentTime < 895){
            arr= ['beach','jamaica','take+it+easy','slow+motion','time']
            return tag = '&tag=' + arr[int];
        } else if(aud.currentTime > 895 && aud.currentTime < 1168){
            arr= ['bernie+sanders','porn','drugs','money','lol']
            return tag = '&tag=' + arr[int];
        } else if(aud.currentTime > 1168 && aud.currentTime < 1400){
            arr= ['secret','doin+it','want+it','i+dont+know','strippers']
            return tag = '&tag=' + arr[int];
        } else if(aud.currentTime > 1400 && aud.currentTime < 1725){
            arr= ['funk','dance+party','going+out','aww+yeah','ftw']
            return tag = '&tag=' + arr[int];
        } else if(aud.currentTime > 1725 && aud.currentTime < 1825){
            arr= ['drums','conga','bass+player','the+beat','clap']
            return tag = '&tag=' + arr[int];
        } else if(aud.currentTime > 1825 && aud.currentTime < 1900){
            arr= ['the+count','ten','start+over','1+2+3','counting']
            return tag = '&tag=' + arr[int];
        }
        else {
            return '';
        }
    }
    
    
    
    
}]);