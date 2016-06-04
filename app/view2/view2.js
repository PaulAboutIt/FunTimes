'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$http', '$timeout', '$scope', '$window', function($http, $timeout, $scope, $window) {
    
    var length = 2000;
    var aud = document.getElementById("myAudio");
    var gif = document.getElementById("gif");
    $scope.timer = 2000;
    var tag = '';
    var timerRule = true;
    var api = 0;
    var mobile = true;
    var urls = [
        'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='/*,*/
        /*'http://replygif.net/api/gifs?tag=',*/
        /*'https://api.popkey.co/v2/media/random?q='*/
    ];
    $scope.$watch(function(){
        return $window.innerWidth;
    }, function(value) {
        if (value > 600) {
            mobile = false;
        } else {
            mobile = true;
        }
    });
    $scope.rating = '&rating=pg';
    $scope.getImageData = function() {
        var rating = $scope.unrated==true?'':'&rating=pg';
        $http({
          method: 'GET',
          url: urls[api] + tag + rating
        }).then(function successCallback(response) {
                /*If puased*/
                if(aud.paused){
                    $scope.getImageData();
                    return
                }
                /*If image does not work try again*/
                if (response.data && response.data.data && api == 0 && parseInt(response.data.data.image_width) < 160) {
                    $scope.getImageData();
                    return;
                }
                /*Check the frame ount and set the timer length*/
                length = parseInt(response.data.data.image_frames);
                /*Load the image into the DOM*/
                if(mobile == false) {
                    $scope.preImage = response.data.data.image_original_url;
                } else {
                    $scope.preImage = response.data.data.fixed_height_downsampled_url;
                }
                
                /*Set the length of the image loop based on the frame count*/
                if(length > 300)
                    $scope.timer = length *95;
                else 
                    $scope.timer = length *190;
                if ($scope.timer < 800)
                    $scope.timer = 2200;
                if ($scope.timer > 4200 && timerRule == true)
                    $scope.timer = 4200;
                /*Choose the api for the next image at random from the list of gif API's*/
                api = Math.floor((Math.random() * urls.length));
                /*When the gif loads start the timer and display the gif*/
                
          }, function errorCallback(response) {
                api = Math.floor((Math.random() * urls.length));
                $scope.getImageData();
                return
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
        
    };
    gif.onload = function() {
        if (screenPaused == false) {
            
            $scope.image = $scope.preImage;
        } else {
            return
        }
        $timeout(function(){
            setTag(api);

            /*Get the next image data*/
            $scope.getImageData();
        }, $scope.timer); 
    }
    $scope.getImageData();
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
            arr= ['espanol','samba','salsa','get up','clap', 'mamacita', 'senorita', 'punta'];
            int = Math.floor((Math.random() * arr.length));
            return tag = '&tag=' + arr[int];
        } 
        else {
            return '';
        }
    }
    
    
    
    
    
    
}]);