//RClone
//Fadi Tawfig
//LM: 03/01/2015  

var app = angular.module('RClone', ['ui.router']); 

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) 
    {
        $stateProvider.state('home', { url: '/home', templateUrl: 'home.html', controller: 'MainCtrl'});
        
        $stateProvider.state('nav', { url: '/nav', templateUrl: 'navbar.html'});
        
        $stateProvider.state('posts', { url: '/post/{id}', templateUrl: 'post.html', controller: 'PostCtrl'});
        
        $urlRouterProvider.otherwise('home');
    }]);

app.factory('posts', 
    [function() 
    {
        var o = {
            posts: []
        };
        
        //Test posts
        o.posts = [
            {id: 0, title: 'Youtube', points: 52, link: "http://www.youtube.com", comments: []},
            {id: 1, title: 'Reddit', points: 4, link: "http://www.reddit.com", comments: []},
            {id: 2, title: 'Google', points: 1977, link: "http://google.com", comments: []},
            {id: 3, title: 'post 4', points: 42, comments: []},
            {id: 4, title: 'post 5', points: 47, comments: []}
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
            
            //Add post to array with test comments
            
            this.posts.push({id: this.posts.length, title: postTitle, points: 0, link: postLink, 
                                comments: 
                                [
                                    {author: "Fadi", text: "Real shit", points: 0},
                                    {author: "Long", text: "This is me typing a sentance. I am typing another sentance. I am trying to see what a longer comment will look like. Swear words, swear words, swear words.", points: 11}
                                ]
                            });

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
            return;
        };
        
        o.addComment = function(userName, commentText, postId)
        {
            //userName and commentText may not be empty
            if(!userName || userName === '' || !commentText || commentText === '')
            {
                return;
            }
            
            this.posts[postId].comments.push({author: userName, text: commentText, points: 0});
            
            return;
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

app.controller('PostCtrl', [
    '$scope',
    '$stateParams',
    'posts',
    function($scope, $stateParams, posts) 
    {
        $scope.post = posts.posts[$stateParams.id];
        
        $scope.incrementPoints = function(comment) 
        {
            posts.incrementPoints(comment);
            return;
        };
        
        $scope.decrementPoints = function(comment)
        {
            posts.decrementPoints(comment);
            return;
        };
        
        $scope.addComment = function()
        {
            posts.addComment($scope.userName, $scope.commentText, $stateParams.id);
            
//            $scope.userName = '';
//            $scope.commentText = '';
            
            return;
        };
        
    }]);
