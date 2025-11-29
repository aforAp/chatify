import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import cookie from "cookie-parser";
//for the password hashing
import "dotenv/config";

export const signup = async (req, res) => {
const {fullName, email,password} = req.body;

try {
  if(!fullName || !email || !password) {
    return res.status(400).json({
      message: "All fields are required"
    })

  }
  if(password.length < 6) {
    return res.status(400).json({
      message: "password must be at least 6 characters"
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format"
    });
  }
  const user = await User.findOne({email});
  if(user) return res.status(400).json({
    message: "email already exists"
  })
  const salt = await bcrypt.genSalt(10);
  //genSalt will add the random string to the password and it was secure 10 was krmreo enough fro the secure protocol

  const hashedPassword = await bcrypt.hash(password, salt);
   const newUser = new User({
    fullName,
    email,
    password: hashedPassword
   })

   if(newUser) {
    //presists the user and save it
    const savedUser = await newUser.save();
      generateToken(savedUser._id, res)
      await newUser.save()
      //it means data was saved successfully
     res.status(201).json({
      _id: newUser._id,
      fullName:newUser.fullName,
      email:newUser.email,
      profilePic:newUser.profilePic,
     })

     try {
      await sendWelcomeEmail(savedUser.email, savedUser.fullName, process.env.CLIENT_URL);
     } catch(error) {
       console.error("Failed to send welcome email:", error);
     }
   } else{
    res.status(400).json({message: "Invalid user data"})
   }
} catch (error) {
  console.log("Error in signup controller", error)
  res.status(500).json({
    message: "Internal server error"
  })
}
};

export const login = async (req, res) => {
   const {email, password} = req.body;
   console.log(email, password);
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
   try{
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({
      message: "Invalid Credentials"
      //never tell the mailicous user which one was invalid
      
    })
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    //bcrypt will decrypt the encrypted code 
      if(!isPasswordCorrect) return res.status(400).json({
      message: "Invalid Credentials" 
    });
    generateToken(user._id, res)
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
   } catch(error) {
      console.error("Error in login controller");
      res.status(500).json({
        message: "Internal server error"
      });
   }
};
//it will remove the cookie from the console note it
export const logout = async(_, res) => {
  res.cookie("jwt", "", {maxAge: 0})
  res.status(200).json({
    message: "Logged out successfully"
  })

};
