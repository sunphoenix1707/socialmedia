import { db } from "../connect.js";
import moment from "moment";
import jwt from "jsonwebtoken"
export const getComments=(req,res)=>{
  
                  const q = `SELECT c.*, u.id AS userId, name, profilePic
                    FROM comments AS c
                    JOIN users AS u ON (u.id = c.userId)
                    WHERE c.postId= ?
                    ORDER BY c.createdAt DESC
          `;
  
         db.query(q, [req.query.postId], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json(data);
          });
}

// export const addComment = (req, res) => {
//   const token = req.cookies.accessToken;
//   if (!token) return res.status(401).json("not logged in");

//   jwt.verify(token, "secretkey", (err, userInfo) => {
//     if (err) return res.status(403).json("Token is not valid!");

//     const q = "INSERT INTO comments (`description`, `createdAt`, `userid`, `postid`) VALUES (?)";

//     const values = [
//       req.body.description,
//       moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
//       userInfo.id,
//       req.body.postId,
//     ];

//     db.query(q, [values], (err, data) => {
//       if (err) return res.status(500).json(err);
//       return res.status(200).json("Comment has been added");
//     });
//   });
// };
export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const postId = req.body.postId;

      // Check if the user has a relationship with the author of the post
      const checkRelationshipQuery = `
          SELECT followerUserId
          FROM relationships
          WHERE followerUserId = ? AND followedUserId = (
              SELECT userId FROM posts WHERE id = ? LIMIT 1
          )
      `;

      db.query(checkRelationshipQuery, [userInfo.id, postId], (err, relationshipData) => {
          if (err) return res.status(500).json(err);
          if (relationshipData.length === 0) return res.status(403).json("You are not following or have a relationship with this user");

          // Proceed with adding the comment
          const q = "INSERT INTO comments (`description`, `createdAt`, `userId`, `postId`) VALUES (?)";
          const values = [
              req.body.description,
              moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
              userInfo.id,
              postId,
          ];

          db.query(q, [values], (err, data) => {
              if (err) return res.status(500).json(err);
              return res.status(200).json("Comment has been added");
          });
      });
  });
};
export const deleteComment=(req,res)=>{

}

export const updateComment=(req,res)=>{

}