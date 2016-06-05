'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl as view'
  });
}])

.controller('View3Ctrl', ['$http', '$timeout', '$scope', '$window', function($http, $timeout, $scope, $window) {
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

    $scope.getImageData = function() {
        /*var rating = $scope.unrated==true?'':'&rating=pg';*/
        var rating = '';
        
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
                if ((response.data && response.data.data) && (parseInt(response.data.data.image_width) < 160 || parseInt(response.data.data.image_frames > 200))) {
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
                /*push video into local buffer array*/
                vids.push($scope.preImage);
                $scope.timer = length *500;
                
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
        /*If the new image is not ready pick one from earlier*/
        if($scope.preImage == $scope.image){
            $scope.image = vids[Math.floor((Math.random() * vids.length))];
            $scope.getImageData();
            return
        }
        /*Check if screen is paused*/
        if (screenPaused == false) {
            $scope.image = $scope.preImage;
        } else {
            $scope.image = $scope.image;
        }
        /*Set the timer to get teh next image*/
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
            arr= ['butt','ass', 'boobs', 'tits','titties', 'dance', 'strippers', 'strip+club',  'big+ass', 'dat+ass', 'pornstar', 'da+club', 'twerk', 'ho', 'back+dat+ass+up'];
            int = Math.floor((Math.random() * arr.length));
            return $scope.tag = tag = arr[int]+apiKey;
        } else if(aud.currentTime > 200 && aud.currentTime < 230){
            /*I'm a Soldier*/
            arr= ['drop','ass','fall'];
            int = Math.floor((Math.random() * arr.length));
            return $scope.tag = tag = arr[int]+apiKey;
        } else if(aud.currentTime > 230 && aud.currentTime < 385){
            timerRule = true;
            arr= ['butts','ass', 'boobs', 'titties', 'dance','twerk', 'strippers', 'strip+club','strip', 'clap'];
            int = Math.floor((Math.random() * arr.length));
            return tag = arr[int]+apiKey;
        } 
        else {
            return '';
        }
    }
    
    
    
    
}]);




