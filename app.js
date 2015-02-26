//RClone
//Fadi Tawfig
//LM: 02/26/2015  

var app = angular.module('RClone', []); 

app.factory('posts', 
    [function() 
    {
        var o = {
            posts: []
        };
        
        //Test posts
        o.posts = [
            {title: 'Youtube', points: 52, link: "http://www.youtube.com"},
            {title: 'Reddit', points: 4, link: "http://www.reddit.com"},
            {title: 'Google', points: 1977, link: "http://google.com"},
            {title: 'post 4', points: 42},
            {title: 'post 5', points: 47}
        ];
        
        o.addPost = function(postTitle, postLink)
        {
            if(!postTitle || postTitle === '') 
            {
                return;
            }
            
            //validate $scope.postLink
            if(postLink && postLink.substr(0, 7) !== "http://") 
            {
                //Add http:// prefix if not provided
                postLink = "http://" + postLink;
                //more validation later, this is enough to get links to work
            }
            
            this.posts.push({ title: postTitle, points: 0, link: postLink});

            return;
        };
        
        o.incrementPoints = function(post)
        {
            post.points++;
            return;
        };
        
        o.decrementPoints = function(post)
        {
            post.points--;
            return;
        };
        
        //UI not yet implemented
        o.deletePost = function(post)
        {
            posts.posts.pop(post);
        };
        
        return o;
    }]);

app.controller('MainCtrl', [
    '$scope',
    'posts',
    function($scope, posts)
    {
        $scope.posts = posts.posts;
        
        $scope.addPost = function()
        {
            posts.addPost($scope.postTitle, $scope.postLink);
                        
            $scope.postTitle = '';
            $scope.postLink = '';
            
            return;
        };
        
        $scope.incrementPoints = function(post)
        {
            posts.incrementPoints(post);
            return;
        };
        
        $scope.decrementPoints = function(post)
        {
            posts.decrementPoints(post);
            return;
        };
        
        //UI not yet implemented
        $scope.deletePost = function(post)
        {
            posts.deletePost(post);
            return;
        };
    }
    
]);
