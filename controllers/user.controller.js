import User from "../model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//for access token, refresh token
import dotenv from 'dotenv';
import Token from "../model/token.model.js";
dotenv.config();

export const signupUser=async (req,res)=>{
    try{
        //OLD SYNTAX
        // const salt=await bcrypt.genSalt(10);
        // const hashedPassword=await bcrypt.hash(req.body.password,salt);
        // new password=salt(random generated string of length specified)+hash(hashed string of the original password)
        // salt generate random strings everytime
        // hash generate random strings everytime for same password
        const hashedPassword=await bcrypt.hash(req.body.password,10);
        const user={
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
        };
        //console.log(user);
        const newUser = new User(user);//validation
        await newUser.save();
        return res.status(200).json({message:"User registered successfully!"});

    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"ERROR occured while registering user"});
    }
}


export const loginUser=async (req,res)=>{
    let user=await User.findOne({username: req.body.username});
    if(!user){
        return res.status(400).json({message:"Username does not exist!"});
    }
    try{
        let match=await bcrypt.compare(req.body.password,user.password)
        if(match){
            //secret_key+body=accessToken
            //to generate the secret key, write node in terminal, then write require('crypto').randomBytes(64).toString('hex')
            const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY, {expiresIn : '15m'});
            const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);

            //when the access token expires(here 15 mins), the next access token is generated with the help of refresh access token
            //we have to store the refresh tokens of users, so we have to make a new model in database for it

            const newToken = new Token({token: refreshToken});//validation
            await newToken.save();//refresh token gets saved in the database

            return res.status(200).json({accessToken:accessToken, refreshToken:refreshToken, name:user.name, username: user.username});
        }
        else{
            return res.status(400).json({message:"Password does not match!"});
        }

    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"ERROR occured while signing in"});
    }
}