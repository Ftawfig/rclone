//RClone
//Fadi Tawfig
//LM: 03/01/2015  

var app = angular.module('RClone', ['ui.router']); 

//App configuaration
app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) 
    {
        //Create home state
        $stateProvider.state('home', { url: '/home', templateUrl: 'home.html', controller: 'MainCtrl'});
        
        //Create navbar state **Currently unused, might be useful in future?
        $stateProvider.state('nav', { url: '/nav', templateUrl: 'navbar.html'});
        
        //
        $stateProvider.state('posts', { url: '/post/{id}', templateUrl: 'post.html', controller: 'PostCtrl'});
        
        //Route to home state by default
        $urlRouterProvider.otherwise('home');
        
        return;
    }]);

//Posts service. Contains posts array and functions for creating, deleting and voting on posts.
app.factory('posts', 
    [function() 
    {
        var o = {
            posts: []
        };
        
        //Populate posts array with test data
        o.posts = [
            {id: 0, title: 'Youtube', points: 52, link: "http://www.youtube.com", comments: []},
            {id: 1, title: 'Reddit', points: 4, link: "http://www.reddit.com", comments: []},
            {id: 2, title: 'Google', points: 1977, link: "http://google.com", comments: []},
            {id: 3, title: 'post 4', points: 42, comments: []},
            {id: 4, title: 'post 5', points: 47, comments: []}
        ];
        
        //Add post function. Takes postTitle and postLink and creates a new post with 0 points.
        o.addPost = function(postTitle, postLink)
        {
            //New posts must have a title. A link is optional.
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
        
        //Increment the points of a post or comment by 1. Takes the post or comment object as a parameter.
        o.incrementPoints = function(post)
        {
            post.points++;
            return;
        };
        
        //Decrement the points of a post or comment by 1. Takes the post or comment object as a parameter.
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
        
        //Add a comment to a post. 
        o.addComment = function(userName, commentText, postId)
        {
            //userName and commentText may not be empty
            if(!userName || userName === '' || !commentText || commentText === '')
            {
                return;
            }
            
            //Add coomment to the post's comment array with starting score of 0 points. 
            this.posts[postId].comments.push({author: userName, text: commentText, points: 0});
            
            return;
        };
        
        return o;
    }]);

app.controller('MainCtrl', [
    '$scope',
    'posts',
    function($scope, postService)
    {
        //Bind $scope.posts with the posts service array of posts.
        $scope.posts = postService.posts;
        
        $scope.addPost = function()
        {
            postService.addPost($scope.postTitle, $scope.postLink);
                        
            $scope.postTitle = '';
            $scope.postLink = '';
            
            return;
        };
        
        $scope.incrementPoints = function(post)
        {
            postService.incrementPoints(post);
            return;
        };
        
        $scope.decrementPoints = function(post)
        {
            postService.decrementPoints(post);
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
    function($scope, $stateParams, postService) 
    {
        $scope.post = postService.posts[$stateParams.id];
        
        $scope.incrementPoints = function(comment) 
        {
            postService.incrementPoints(comment);
            return;
        };
        
        $scope.decrementPoints = function(comment)
        {
            postService.decrementPoints(comment);
            return;
        };
        
        $scope.addComment = function()
        {
            postService.addComment($scope.userName, $scope.commentText, $stateParams.id);
            
//            $scope.userName = '';
//            $scope.commentText = '';
            
            return;
        };
        
    }]);
