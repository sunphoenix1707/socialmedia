import { db } from "../connect.js"
import jwt  from "jsonwebtoken";
export const getLikes=(req,res)=>{

    const q = "SELECT userId from likes WHERE postId = ?";

db.query(q, [req.query.postId], (err, data) => {
if (err) return res.status(500).json(err);
return res.status(200).json(data.map(like=>like.userId));
});
}
export const  addLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const postId = req.body.postid;

        // Check if the user has a relationship with the author of the post
        const checkRelationshipQuery = `
        SELECT followedUserId
        FROM relationships
        WHERE followerUserId = ? AND followedUserId = (
            SELECT userId FROM posts WHERE id = ? LIMIT 1
        )
        
        `;

        db.query(checkRelationshipQuery, [userInfo.id, postId], (err, relationshipData) => {
            if (err) return res.status(500).json(err);
            if (relationshipData.length === 0) return res.status(403).json("You are not following or have a relationship with this user");

            // Check if the user has already liked the post
            const checkLikeQuery = "SELECT * FROM likes WHERE userId = ? AND postId = ?";
            db.query(checkLikeQuery, [userInfo.id, postId], (err, likeData) => {
                if (err) return res.status(500).json(err);

                if (likeData.length > 0) {
                    // User has already liked the post, so remove the like (unlike)
                    const deleteLikeQuery = "DELETE FROM likes WHERE userId = ? AND postId = ?";
                    db.query(deleteLikeQuery, [userInfo.id, postId], (err, data) => {
                        if (err) return res.status(500).json(err);
                        return res.status(200).json("Like has been removed");
                    });
                } else {
                    // User has not liked the post, so add the like
                    const insertLikeQuery = "INSERT INTO likes (`userId`, `postId`) VALUES (?, ?)";
                    db.query(insertLikeQuery, [userInfo.id, postId], (err, data) => {
                        if (err) return res.status(500).json(err);
                        return res.status(200).json("Like has been added");
                    });
                }
            });
        });
    });
}



export const deleteLike=(req,res)=>{

    
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
          if (err) return res.status(403).json("Token is not valid!");
  
          const q = "DELETE FROM likes WHERE `userId`= ? AND `postId`= ?"// userid fetched from access token

          db.query(q, [userInfo.id,req.params.postId], (err, data) => {
          if (err) return res.status(500).json(err);
          if(data.affectedRows>0) return res.status(200).json("like has been deleted")
          return res.status(403).json("You cannot dislike");
          });
    });


}