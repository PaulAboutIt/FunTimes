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
          url: urls[api] + tag + rating
        }).then(function successCallback(response) {
                
                if(aud.paused == true && loadedAudio == true){
                    /*get the next image incase user unpauses*/
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
                
                $scope.timer = length *100;
                if ($scope.timer < 800)
                    $scope.timer = 2200;
                if ($scope.timer > 6200 && timerRule == true)
                    $scope.timer = 6200;
                /*Choose the api for the next image at random from the list of gif API's*/
                api = Math.floor((Math.random() * urls.length));
                /*When the gif loads start the timer and display the gif*/
                gif.onload = function() {

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
          }, function errorCallback(response) {
                api = Math.floor((Math.random() * urls.length));
                $scope.getImageData();
                return
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
        
    };
    $scope.getImageData();
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
            arr= ['nasa','technology','science','space','mind blown', 'wow', 'animation', 'robot', 'glitch', 'illustration', 'loop'];
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
            arr= ['do it','want','i dont know','strippers', 'sex', 'boobs', 'pornstar', 'trippy', 'wow', 'sexy', 'horny'];
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