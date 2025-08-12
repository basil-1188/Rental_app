import User from "../models/models.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json('Username already exists');
      }
      if (existingUser.email === email) {
        return res.status(400).json('Email already registered');
      }
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ 
      username, 
      email, 
      password: hashedPassword,
      role 
    });
    
    await newUser.save();
    res.status(201).json('User created successfully');
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json('Registration failed');
  }
};

export const logins = async(req, res, next) => {
    const { email, password } = req.body;
    try {
        const validuser = await User.findOne({email});
        if(!validuser)
            return next(errorHandler(404,'User Not Found!'));

        const validPass = bcryptjs.compareSync(password, validuser.password);
        if(!validPass)
            return next(errorHandler(401,'Wrong Credentials!'));
        const token = jwt.sign({id: validuser._id},process.env.JWT_SECRET);
        const{ password: pass, ...rest } = validuser._doc;
        res.cookie('access_token',token, 
            {httpOnly: true})
            .status(200)
            .json(rest)
    } catch (error) {
        next(error);
    }
}

export const logout = async(req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('user has been logged out');
  } catch (error) {
    next(error);
  }
}