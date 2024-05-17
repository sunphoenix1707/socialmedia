import express from "express"
import {getComments,deleteComment,updateComment, addComment} from "../controllers/comment.js"
const router=express.Router()

router.get("/getcomments",getComments)
router.delete("/delcomment",deleteComment)
router.post("/addcomment",addComment)
router.put("/updatecomment",updateComment)


export default router