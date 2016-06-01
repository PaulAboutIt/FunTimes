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
    var api = 0;
    var urls = [
        'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='/*,*/
        /*'http://replygif.net/api/gifs?tag=',*/
        /*'https://api.popkey.co/v2/media/random?q='*/
    ];
    $scope.getImage = function() {
        
        $http({
          method: 'GET',
          url: urls[api] + tag
        }).then(function successCallback(response) {
                
                if (response.data && response.data.data && api == 0 && parseInt(response.data.data.image_width) < 160) {
                    $scope.getImage();
                    return;
                }
                if(response.length < 1) {
                    $scope.getImage();
                    return;
                }
                console.log(api)
                if (api == 0) {
                    length = parseInt(response.data.data.image_frames);
                    $scope.image = response.data.data.image_original_url;
                } else if (api == 1){   
                    $scope.image = response[Math.floor((Math.random() * response.length))].file;
                    length = 250;
                }
                if(length > 300)
                    $scope.timer = length *95;
                else 
                    $scope.timer = length *190;
                if ($scope.timer < 800)
                    $scope.timer = 2200;
                if ($scope.timer > 4200 && timerRule == true)
                    $scope.timer = 4200;
                $timeout(function(){
                    setTag(api);
                    $scope.getImage();
                }, $scope.timer);         
                api = Math.floor((Math.random() * urls.length));
                
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
        
    };
    $scope.getImage();
    function setTag(id) {
        var arr = [];
        var apiKey = '';
        if(id == 1)
            apiKey = '&api-key=39YAprx5Yi';
        var int = Math.floor((Math.random() * 7));
        if(aud.currentTime < 160){
            /*It's OK Now*/
            arr= ['dance','ok','girl+power','africa','dance+crew', 'break+dance', 'girl']
            return $scope.tag = tag = arr[int]+apiKey;
        } else if(aud.currentTime > 160 && aud.currentTime < 240){
            /*I'm a Soldier*/
            arr= ['soldier','war','fight','struggle','guns', 'ninja', 'explosion', 'battle']
            return $scope.tag = tag = arr[int]+apiKey;
        } else if(aud.currentTime > 240 && aud.currentTime < 585){
            timerRule = false;
            arr= ['nasa','technology','science','space','mind+blown', 'wow', '']
            return tag = arr[int]+apiKey;
        } else if(aud.currentTime > 585 && aud.currentTime < 730){
            timerRule = true;
            arr= ['bruce+lee','lucy','sushi','anime','japan', 'tokyo', 'asian']
            return tag = arr[int]+apiKey;
        } else if(aud.currentTime > 730 && aud.currentTime < 895){
            timerRule = false;
            arr= ['beach','jamaica','take+it+easy','slow+motion','time', 'bikini', '420']
            return tag = arr[int]+apiKey;
        } else if(aud.currentTime > 895 && aud.currentTime < 1168){
            timerRule = false;
            arr= ['bernie+sanders','porn','drugs','money','win', 'donald+trump', 'oil']
            return tag = arr[int]+apiKey;
        } else if(aud.currentTime > 1168 && aud.currentTime < 1400){
            timerRule = true;
            arr= ['secret','doin+it','want+it','i+dont+know','strippers', 'sex', 'boobs']
            return tag = arr[int]+apiKey;
        } else if(aud.currentTime > 1400 && aud.currentTime < 1725){
            timerRule = true;
            arr= ['funk','dance+party','going+out','aww+yeah','ftw', 'dance+floor', 'get+down']
            return tag = arr[int]+apiKey;
        } else if(aud.currentTime > 1725 && aud.currentTime < 1825){
            arr= ['drums','conga','bass+player','the+beat','clap', 'rhythm', 'bass']
            return tag = '&tag=' + arr[int];
        } else if(aud.currentTime > 1825 && aud.currentTime < 1900){
            arr= ['the+count','ten','start+over','1-2-3','counting', '', 'one+two+three']
            return tag = arr[int]+apiKey+apiKey;
        }
        else {
            return '';
        }
    }
    
    
    
    
}]);