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
                if(parseInt(response.data.data.image_height) < 175) {
                    $scope.getImage();
                    return;
                }
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
                api = Math.floor((Math.random() * urls.length));
                $scope.getImage();
                return
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
            arr= ['dance','ok', 'tribe', 'tribal', 'okay', 'ok now', 'girl power','africa','dance crew', 'break dance', 'girl'];
            int = Math.floor((Math.random() * arr.length));
            return $scope.tag = tag = arr[int]+apiKey;
        } else if(aud.currentTime > 160 && aud.currentTime < 240){
            /*I'm a Soldier*/
            arr= ['soldier','war','fight','struggle','guns', 'ninja', 'explosion', 'battle', 'fighting', 'slapping', 'military', 'wwii', 'platoon', 'squad'];
            int = Math.floor((Math.random() * arr.length));
            return $scope.tag = tag = arr[int]+apiKey;
        } else if(aud.currentTime > 240 && aud.currentTime < 585){
            timerRule = false;
            arr= ['nasa','technology','science','space','mind blown', 'wow', 'animation', 'robot', 'glitch', 'illustration', 'loop', 'pixel'];
            int = Math.floor((Math.random() * arr.length));
            return tag = arr[int]+apiKey;
        } else if(aud.currentTime > 585 && aud.currentTime < 730){
            timerRule = true;
            arr= ['bruce lee','lucy','sushi','anime', 'japan', 'tokyo', 'asian', 'dbz', 'japanese', 'kung fu'];
            int = Math.floor((Math.random() * arr.length));
            return tag = arr[int]+apiKey;
        } else if(aud.currentTime > 730 && aud.currentTime < 895){
            timerRule = false;
            arr= ['beach','jamaica','take it easy','slow motion','time', 'bikini', '420', 'splash'];
            int = Math.floor((Math.random() * arr.length));
            return tag = arr[int]+apiKey;
        } else if(aud.currentTime > 895 && aud.currentTime < 1168){
            timerRule = false;
            arr= ['bernie sanders','porn','drugs','money','win', 'donald trump', 'oil', 'animation', 'cash', 'omg'];
            int = Math.floor((Math.random() * arr.length));
            return tag = arr[int]+apiKey;
        } else if(aud.currentTime > 1168 && aud.currentTime < 1400){
            timerRule = true;
            arr= ['do it','want','i dont know','strippers', 'sex', 'boobs', 'pornstar', 'trippy', 'wow', 'sexy', 'tits', 'butt', 'horny'];
            int = Math.floor((Math.random() * arr.length));
            return tag = arr[int]+apiKey;
        } else if(aud.currentTime > 1400 && aud.currentTime < 1725){
            timerRule = true;
            arr= ['funk','dance party','going out','aww yeah','ftw', 'dance floor', 'get down'];
            int = Math.floor((Math.random() * arr.length));
            return tag = arr[int]+apiKey;
        } else if(aud.currentTime > 1725 && aud.currentTime < 1825){
            arr= ['drums','conga','bass player','the beat','clap', 'rhythm', 'bass', 'music', 'drum', 'drummer'];
            int = Math.floor((Math.random() * arr.length));
            return tag = '&tag=' + arr[int];
        } else if(aud.currentTime > 1825 && aud.currentTime < 1900){
            arr= ['the count','ten','star over','1 2 3','counting', '', 'one two three', 'love'];
            int = Math.floor((Math.random() * arr.length));
            return tag = arr[int]+apiKey+apiKey;
        }
        else {
            return '';
        }
    }
    
    
    
    
}]);