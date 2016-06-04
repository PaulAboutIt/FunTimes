'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl as view'
  });
}])

.controller('View1Ctrl', ['$http', '$timeout', '$scope', '$window', function($http, $timeout, $scope, $window) {
    var length = 2000;
    var aud = document.getElementById("myAudio");
    var gif = document.getElementById("gif");
    var scr = document.getElementById("screen");
    var third = null;
    $scope.timer = 2000;
    var tag = '';
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

    $scope.getImageData = function() {
        var rating = $scope.unrated==true?'':'&rating=pg';
        
        $http({
          method: 'GET',
          url: urls[api] + tag + rating + apiKey
        }).then(function successCallback(response) {
                
                if(aud.paused == true && loadedAudio == true){
                    /*get the next image incase user unpauses*/
                    //$scope.getImageData();
                    $timeout(function(){
                        /*screen.setup();*/
                        setTag(api);
                        /*screen.trigger(); */   
                        /*Get the next image data*/
                        $scope.getImageData();
                    }, 2000); 
                    return
                }
                    
                /*If image does not work try again*/
                if ((response.data && response.data.data) && (parseInt(response.data.data.image_width) < 160 || parseInt(response.data.data.image_frames > 60))) {
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
                
                $scope.timer = length *100;
                
                if ($scope.timer > 2200)
                    $scope.timer = 2200;
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
        console.log(aud.currentTime)
        if (screenPaused == false) {
            $scope.image = $scope.preImage;
        } else {
            $scope.image = $scope.image;
        }


        $timeout(function(){
            /*screen.setup();*/
            setTag(api);
            /*screen.trigger(); */   
            /*Get the next image data*/
            $scope.getImageData();
        }, $scope.timer); 
    }
    $scope.getImageData();
    function setTag(id) {
        var arr = [];
        
        var int = Math.floor((Math.random() * 7));
        if(aud.currentTime < 26){
            /*It's OK Now*/
            arr= ['soul','Stevie Wonder', 'rnb'];
            int = Math.floor((Math.random() * arr.length));
            return $scope.tag = tag = arr[int];
        } else if(aud.currentTime > 23 && aud.currentTime < 28){
            /*People*/
            return $scope.tag = tag = 'people';
        } else if(aud.currentTime > 28 && aud.currentTime < 33){
            /*Keep on Learning*/
            return $scope.tag = tag = 'learn';
        } else if(aud.currentTime > 33 && aud.currentTime < 36){
            return $scope.tag = tag = 'war';
        } else if(aud.currentTime > 36 && aud.currentTime < 42){
            return $scope.tag = tag = 'earth';
        } else if(aud.currentTime > 42 && aud.currentTime < 51){
            return $scope.tag = tag = 'time lapse';
        } else if(aud.currentTime > 51 && aud.currentTime < 56){
            return $scope.tag = tag = 'money';
        } else if(aud.currentTime > 58 && aud.currentTime < 65){
            return $scope.tag = tag = 'lie';
        } else if(aud.currentTime > 65 && aud.currentTime < 67){
            return $scope.tag = tag = 'dead';
        } else if(aud.currentTime > 67 && aud.currentTime < 75){
            return $scope.tag = tag = 'earth';
        } else if(aud.currentTime > 75 && aud.currentTime < 85){
            return $scope.tag = tag = 'time lapse';
        } else if(aud.currentTime > 85 && aud.currentTime < 105){
            arr= ['soul','Stevie Wonder', 'rnb'];
            int = Math.floor((Math.random() * arr.length));
            return $scope.tag = tag = arr[int];
        } else if(aud.currentTime > 105 && aud.currentTime < 113){
            return $scope.tag = tag = 'teachers';
        } else if(aud.currentTime > 113 && aud.currentTime < 123){
            return $scope.tag = tag = 'preacher';
        }  else if(aud.currentTime > 123 && aud.currentTime < 126){
            return $scope.tag = tag = 'earth';
        } else if(aud.currentTime > 126 && aud.currentTime < 131){
            return $scope.tag = tag = 'slow motion';
        } else if(aud.currentTime > 131 && aud.currentTime < 140){
            return $scope.tag = tag = 'lovers';
        } else if(aud.currentTime > 140 && aud.currentTime < 150){
            return $scope.tag = tag = 'believe';
        } else if(aud.currentTime > 150 && aud.currentTime < 160){
            return $scope.tag = tag = 'sleep';
        } else if(aud.currentTime > 160 && aud.currentTime < 170){
            return $scope.tag = tag = 'slow motion';
        } else if(aud.currentTime > 170 && aud.currentTime < 184){
            arr= ['soul','Stevie Wonder', 'rnb'];
            int = Math.floor((Math.random() * arr.length));
            return $scope.tag = tag = arr[int];
        } else if(aud.currentTime > 184 && aud.currentTime < 300){
            arr= ['win','Stevie Wonder', 'ftw', 'clap'];
            int = Math.floor((Math.random() * arr.length));
            return $scope.tag = tag = arr[int];
        }
        else {
            return '';
        }
    }
    
    
    
    
}]);