Project : Social media - backend

/project-root
├── netlify
│   └── functions
│controllers └── api.js
├── src
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── routes
│   │   ├── userRoutes.js
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   ├── commentRoutes.js
│   │   ├── likeRoutes.js
│   │   └── relationshipRoutes.js
│   └── app.js
├── netlify.toml
└── package.json
                                    


Donot Follow REST URL CONVENTIONS::









   
  
   

Project ZIP FILE:





https://drive.google.com/file/d/1Afp20yyltTTx_4oW8Wnc4X_tlm1aii0I/view?usp=sharing


API


Post : http://localhost:8800/api/auth/register   

Post:  http://localhost:8800/api/auth/login   
Set jwt token in cookie
Body: {
    "username": "testuser5",
    "password": "password5123"
}

Post: http://localhost:8800/api/posts/addpost
Body:  {


    "description": "This is a test post5",
    "img": "http://example.com/image.jpg"
   
}

Post   : http://localhost:8800/api/comment/addcomment

{
    "description": "This is a test comment by user 4",
  "userId": 4,
  "postId": 1
 
}
Post : http://localhost:8800/api/like/addlike

If liked Again By User This toggles like become unlike
Body:  {
  "postid": 5
}


POST:  http://localhost:8800/api/relationship/addrelation

Body:  {
    "userId": 5
}

Get:  http://localhost:8800/api/posts/getallposts?userId=5

For  userId : 5

GET :  http://localhost:8800/api/like/getlikes?postId=1

DELETE: http://localhost:8800/api/comment/delcomment/1

Put  http://localhost:8800/api/comment/updatecomment/4

DELETE : http://localhost:8800/api/like/deletelike/1

DELETE :  http://localhost:8800/api/relationship/deleterelation?userId=5

There are many more API created Kindly look in the project Zip File For Reference



