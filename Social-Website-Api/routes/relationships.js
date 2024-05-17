import express from "express"
import {getRelationship,addRelationship,deleteRelationship} from "../controllers/relationship.js"
const router=express.Router()

router.get("/getrelation",getRelationship)
router.delete("/deleterelation",deleteRelationship)
router.post("/addrelation",addRelationship)




export default router