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
    var timerRule = true;
    $scope.getImage = function() {
        $http({
          method: 'GET',
          url: 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC' + tag
        }).then(function successCallback(response) {
                if (parseInt(response.data.data.image_width) < 160) {
                    $scope.getImage();
                    return;
                }
                $scope.image = response.data.data.image_original_url;
                length = parseInt(response.data.data.image_frames);
                $scope.timer = length *190;
                if ($scope.timer < 800)
                    $scope.timer = 2200;
                if ($scope.timer > 4200 && timerRule == true)
                    $scope.timer = 4200;
                $timeout(function(){
                    setTag();
                    $scope.getImage();
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
        if(aud.currentTime < 160){
            /*It's OK Now*/
            arr= ['dancing+girl','ok','girl+power','africa','dance+crew', 'break+dance']
            return tag = '&tag=' + arr[int];
        } else if(aud.currentTime > 160 && aud.currentTime < 240){
            /*I'm a Soldier*/
            arr= ['soldier','war','fight','struggle','guns', 'ninja']
            return tag = '&tag=' + arr[int];
        } else if(aud.currentTime > 240 && aud.currentTime < 585){
            timerRule = false;
            arr= ['nasa','technology','science','space','mind+blown', 'wow']
            return tag = '&tag=' + arr[int];
        } else if(aud.currentTime > 585 && aud.currentTime < 730){
            timerRule = true;
            arr= ['bruce+lee','lucy','sushi','anime','japan', 'tokyo']
            return tag = '&tag=' + arr[int];
        } else if(aud.currentTime > 730 && aud.currentTime < 895){
            timerRule = false;
            arr= ['beach','jamaica','take+it+easy','slow+motion','time', 'swim+suit']
            return tag = '&tag=' + arr[int];
        } else if(aud.currentTime > 895 && aud.currentTime < 1168){
            timerRule = false;
            arr= ['bernie+sanders','porn','drugs','money','win', 'donald+trump']
            return tag = '&tag=' + arr[int];
        } else if(aud.currentTime > 1168 && aud.currentTime < 1400){
            timerRule = true;
            arr= ['secret','doin+it','want+it','i+dont+know','strippers', 'sex']
            return tag = '&tag=' + arr[int];
        } else if(aud.currentTime > 1400 && aud.currentTime < 1725){
            timerRule = true;
            arr= ['funk','dance+party','going+out','aww+yeah','ftw']
            return tag = '&tag=' + arr[int];
        } else if(aud.currentTime > 1725 && aud.currentTime < 1825){
            arr= ['drums','conga','bass+player','the+beat','clap']
            return tag = '&tag=' + arr[int];
        } else if(aud.currentTime > 1825 && aud.currentTime < 1900){
            arr= ['the+count','ten','start+over','1-2-3','counting']
            return tag = '&tag=' + arr[int];
        }
        else {
            return '';
        }
    }
    
    
    
    
}]);