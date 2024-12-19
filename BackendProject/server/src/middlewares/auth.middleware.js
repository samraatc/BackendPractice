import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

export const  verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookie?.accessToken || req.header('authorization')?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Not authenticated, token required");
        }
        
        // decoding the access token 
        const decoteToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoteToken?._id)
        .select("-password -refreshToken")
    
        // verify the authorization token against the token provided in the request parameters 
        if (!user) {
            throw new ApiError(401, "Not authenticated, token is invalid");
        }
    
        req.user = user;
        next();
        
    } catch (error) {
        throw new ApiError(401,"Authentication failed");

    }


})