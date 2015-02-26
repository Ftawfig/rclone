//RClone
//Fadi Tawfig
//LM: 02/25/2015  

var app = angular.module('RClone', []); 

app.controller('MainCtrl', [
    '$scope',
    function($scope)
    {
        $scope.test = 'Hello World!';
        
        $scope.posts = [
            {title: 'Youtube', points: 52, link: "http://www.youtube.com"},
            {title: 'post 2', points: 4},
            {title: 'Google', points: 1977, link: "http://google.com"},
            {title: 'post 4', points: 42},
            {title: 'post 5', points: 47}
        ];
        
        $scope.addPost = function()
        {
            if(!$scope.postTitle || $scope.postTitle === '') 
            {
                return;
            }
            
            //validate $scope.postLink
            if( $scope.postLink.substr(0, 7) !== "http://" ) 
            {
                //Add http:// prefix if not provided
                $scope.postLink = "http://" + $scope.postLink;
                //more validation later, this is enough to get links to work
            }
            
            $scope.posts.push({ title: $scope.postTitle, points: 0, link: $scope.postLink });
            $scope.postTitle = '';
            $scope.postLink = '';
            
            return;
        };
        
        $scope.incrementPoints = function(post)
        {
            post.points++;
            return;
        };
        
        $scope.decrementPoints = function(post)
        {
            post.points--;
            return;
        };
        
        //UI not yet implemented
        $scope.deletePost = function(post)
        {
            $scope.posts.pop(post);
        };
    }
    
]);
