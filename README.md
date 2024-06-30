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
                                    

ER DIAGRAM - DATABASE

+-----------+  +-----------+  +-----------+  +-----------+  +-----------+
|   Users   |  |   Posts   |  | Comments  |  |   Likes   |  |Relationship|
+-----------+  +-----------+  +-----------+  +-----------+  +-----------+
| - id (PK) |  | - id (PK) |  | - id (PK) |  | - id (PK) |  | - id (PK) |
| - username|  | - userId  |  | - userId  |  | - userId  |  | - follower|
| - email   |  | - descr.  |  | - postId  |  | - postId  |  | - follower|
| - password|  | - created |  | - desc    |  | - created |  | - follow. |
| - name    |  | - img     |  | - created |  +-----------+  | - follow. |
| - city    |  +-----------+  +-----------+                +-----------+
| - website |  
| - profPic |  
| -coverPic |  
| - cr. date|  
+-----------+  









SQL QUERY FOR MYSQL WORKBENCH

GRANT ALL PRIVILEGES ON *.* TO 'sunpreet'@'localhost';
FLUSH PRIVILEGES;
CREATE DATABASE  socialmedia;
SHOW DATABASES;
USE socialmedia;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255),
    website VARCHAR(255),
    profilePic VARCHAR(255),
    coverPic VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    description TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    postId INT NOT NULL,
    description TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    postId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE relationships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    followerUserId INT NOT NULL,
    followedUserId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (followerUserId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (followedUserId) REFERENCES users(id) ON DELETE CASCADE
);


https://docs.google.com/document/d/1wXQoI79-wo0-1CGgIauW3fuU-JTyw5AG/edit?usp=sharing&ouid=113109488667119567302&rtpof=true&sd=true


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



