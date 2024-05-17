import express  from "express";
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import postRoutes from "./routes/posts.js"
import relationshipRoutes from "./routes/relationships.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
const app=express()


//middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/comment",commentRoutes)
app.use("/api/like",likeRoutes)
app.use("/api/relationship",relationshipRoutes)



const port=8800
app.listen(port,()=>{
    console.log("Backend server running At port",port)
})