import express from "express"
import {addLike,getLikes,deleteLike} from "../controllers/like.js"
const router=express.Router()

router.post("/addlike",addLike)
router.get("/getlikes",getLikes)
router.delete("/deletelike/:id",deleteLike)


export default router