//only if user is authenticated, let him post
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];//accessToken concat with Bearer
    const token = authHeader && authHeader.split(' ')[1];//take out accesstoken
    // console.log(authHeader);
    try{
        if (token == null) {
            return response.status(401).json({ msg: 'token is missing' });
        }
    
        jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
            if (error) {
                return response.status(403).json({ msg: 'invalid token' })
            }
    
            request.user = user;
            next();//so that now middleware passes the control to the next controller
        })
    }
    catch(error){
        return response.status(500).json({msg: error.msg});
    }
    
}