'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$http', '$timeout', '$scope', function($http, $timeout, $scope) {
    
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
                /*if(response.length < 1) {
                    $scope.getImage();
                    return;
                }*/
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
        $scope.time = aud.currentTime;
        var arr = [];
        var apiKey = '';
        if(id == 1)
            apiKey = '&api-key=39YAprx5Yi';
        var int = Math.floor((Math.random() * 7));
        if(aud.currentTime < 203){
            /*It's OK Now*/
            arr= ['dance','prince', 'party', 'dance', 'funky', 'dance floor', 'disco','80s','dance party', 'break dance', 'boogie'];
            int = Math.floor((Math.random() * arr.length));
            return $scope.tag = tag = arr[int]+apiKey;
        } else if(aud.currentTime > 203 && aud.currentTime < 500){
            /*I'm a Soldier*/
            arr= ['art', 'psychedelic', 'drums', 'loop', 'pixel', 'digital', 'happy'];
            int = Math.floor((Math.random() * arr.length));
            return $scope.tag = tag = arr[int]+apiKey;
        } else if(aud.currentTime > 500 && aud.currentTime < 785){
            timerRule = true;
            arr= ['work', 'robot', 'cowboy', 'manly', 'muscles', 'understand', 'man'];
            int = Math.floor((Math.random() * arr.length));
            return tag = arr[int]+apiKey;
        } else if(aud.currentTime > 785 && aud.currentTime < 900){
            timerRule = true;
            arr= ['racing','fast car','tunnel','pattern', 'flash', 'synth'];
            int = Math.floor((Math.random() * arr.length));
            return tag = arr[int]+apiKey;
        } else if(aud.currentTime > 900 && aud.currentTime < 1000){
            timerRule = true;
            arr= ['flute','drummer', 'solo'];
            int = Math.floor((Math.random() * arr.length));
            return tag = arr[int]+apiKey;
        } else if(aud.currentTime > 1000 && aud.currentTime < 1355){
            timerRule = timerRule;
            arr= ['parade','swing dance','jazz','backup singers','flapper', 'stage', 'dont go', 'sepia'];
            int = Math.floor((Math.random() * arr.length));
            return tag = arr[int]+apiKey;
        } else if(aud.currentTime > 1355 && aud.currentTime < 1590){
            timerRule = true;
            arr= ['do it','want','i dont know','strippers', 'sex', 'boobs', 'trippy', 'wow', 'sexy', 'horny'];
            int = Math.floor((Math.random() * arr.length));
            return tag = arr[int]+apiKey;
        } else if(aud.currentTime > 1590 && aud.currentTime < 1825){
            timerRule = true;
            arr= ['robots','dance party','rap','win','ftw', 'dance floor', 'nice'];
            int = Math.floor((Math.random() * arr.length));
            return tag = arr[int]+apiKey;
        } else if(aud.currentTime > 1825){
            arr= ['mexico','samba','salsa','get up','clap', 'mamacita', 'senorita', 'punta'];
            int = Math.floor((Math.random() * arr.length));
            return tag = '&tag=' + arr[int];
        } 
        else {
            return '';
        }
    }
    
    
    
    
}]);