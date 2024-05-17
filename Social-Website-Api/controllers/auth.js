// import { db } from "../connect.js"
// import bcrypt from "bcryptjs"
// import jwt from "jsonwebtoken"
// export const register=(req,res)=>{

//     //Check if user exists
//     const q="SELECT * FROM users where username= ?"

//     db.query(q,[req.body.username],(err,data)=>{
//         if(err) return res.status(500).json(err)
//         if(data.length) return res.status(409).json("User already exists!")

//         //create a new user
//         //hash the password
//         const salt=bcrypt.genSaltSync(10)
//         const hashedPassword=bcrypt.hashSync(req.body.password,salt)

//         const q="INSERT INTO users (`username`,`email`,`password`,`name`) VALUE(?)"
//         const values=[req.body.username,req.body.email,hashedPassword,req.body.name]
//         db.query(q,[values],(err,data)=>{
//             if(err) return res.status(500).json(err);
//             return res.status(200).json("User has been created")
        
//         });
//     });
// }

// export const login=(req,res)=>{

//     const  q="SELECT * FROM users WHERE username= ?"
//     db.query(q,[req.body.username],(err,data)=>{
//         if(err) return res.status(500).json(err);
//         if(data.length===0) return res.status(404).json("User not found!");

//         const checkPassword=bcrypt.compareSync(req.body.password,data[0].password)

//         if(!checkPassword) return res.status(400).json("Wrong password or username")

        
//     const token=jwt.sign({id:data[0].id},"secretkey");

//     const {password,...others}=data[0]; //send everything else other than password
//     res.cookie("accessToken",token,{
//         httpOnly:true,
//     }).status(200).json(others);
//     })
    
// }

// export const logout=(req,res)=>{
//     res.clearCookie("accessToken",{
//         secure:true,
//         sameSite:"none"
//     }).status(200).json("User has been loged out")
    
// }
import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user
export const register = (req, res) => {
    // Log the incoming request body
    console.log("Received registration data:", req.body);

    // Check if all necessary fields are provided
    const { username, email, password, name } = req.body;
    if (!username || !email || !password || !name) {
        return res.status(400).json("All fields are required");
    }

    // Check if user already exists
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Insert the new user into the database
        const insertQuery = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUES (?)";
        const values = [username, email, hashedPassword, name];
        db.query(insertQuery, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created");
        });
    });
};

// Login an existing user
// export const login = (req, res) => {
//     const { username, password } = req.body;

//     // Log the incoming request body
//     console.log("Received login data:", req.body);

//     const q = "SELECT * FROM users WHERE username = ?";
//     db.query(q, [username], (err, data) => {
//         if (err) return res.status(500).json(err);
//         if (data.length === 0) return res.status(404).json("User not found!");

//         const checkPassword = bcrypt.compareSync(password, data[0].password);
//         if (!checkPassword) return res.status(400).json("Wrong password or username");

//         const token = jwt.sign({ id: data[0].id }, "secretkey");
//         const { password, ...others } = data[0];
//         res.cookie("accessToken", token, {
//             httpOnly: true,
//         }).status(200).json(others);
//     });
// };
// Login an existing user
// export const login = (req, res) => {
//     const { username, password } = req.body; // Extract username and password from the request body

//     // Log the incoming request body
//     console.log("Received login data:", req.body);

//     const q = "SELECT * FROM users WHERE username = ?";
//     db.query(q, [username], (err, data) => {
//         if (err) return res.status(500).json(err);
//         if (data.length === 0) return res.status(404).json("User not found!");

//         const userPassword = data[0].password; // Use a different name for the password from the database
//         const checkPassword = bcrypt.compareSync(password, userPassword); // Compare the request password with the database password
//         if (!checkPassword) return res.status(400).json("Wrong password or username");

//         const token = jwt.sign({ id: data[0].id }, "secretkey");
//         const { password: _, ...others } = data[0]; // Rename password to _ and exclude it from the others
//         res.cookie("accessToken", token, {
//             httpOnly: true,
//         }).status(200).json(others); // Respond with the user data excluding the password
//     });
// };
export const login = (req, res) => {
    const { username, password } = req.body; // Extract username and password from the request body

    // Log the incoming request body
    console.log("Received login data:", req.body);

    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        const userPassword = data[0].password; // Use a different name for the password from the database
        const checkPassword = bcrypt.compareSync(password, userPassword); // Compare the request password with the database password
        if (!checkPassword) return res.status(400).json("Wrong password or username");

        const token = jwt.sign({ id: data[0].id }, "secretkey");
        const { password: _, ...others } = data[0]; // Rename password to _ and exclude it from the others
        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json({ token, ...others }); // Respond with the generated token and the user data excluding the password
    });
};
// Logout a user
export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none",
    }).status(200).json("User has been logged out");
};
