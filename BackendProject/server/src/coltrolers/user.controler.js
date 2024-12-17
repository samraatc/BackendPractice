import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { upLoadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  //validation - not empty
  //check if user is already registered or existing
  //check for images and avtar
  //upload them to the cloudnary server
  //create user object - create entry in db
  //remove password and refresh token field from response
  // chech for user creation
  //return the response

  const { username, email, password, avatar, fullname } = req.body;
  console.log("email: ", email);

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    //
    throw new ApiError(400, "Fullname is required");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const avatarLocalPath = req.field?.avatar[0]?.path;
  console.log(avatarLocalPath);

  const coverImageLocalPath = req.field?.coverImage[0]?.path;
  console.log(coverImageLocalPath);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  // upload avatar to cloudinary

  const avatarUploadResult = await upLoadCloudinary(avatarLocalPath);
  const coverImageUploadResult = await upLoadCoverImage(coverImageLocalPath);

  if (!avatarUploadResult) {
    throw new ApiError(500, "Error while uploading avatar to cloudinary");
  }

  // if (!coverImageUploadResult) {
  //     throw new ApiError(500, "Error while uploading cover image to cloudinary");
  // }

  const uesr = User.create({
    username: username.toLowerCase(),
    fullname,
    email,
    password,
    avatar: avatarUploadResult.url,
    coverImage: coverImageUploadResult?.url || "",
  });

  const createdUser = await User.findById(uesr._id).select(
    "-password -refreshToken"
  );

  if (!createUser) {
    throw new ApiError(500, "Somthing went wrong while registering user");
  }

  res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createdUser,
        "user registration is successfully registered"
      )
    );4
});

// export default registerUser;

export { registerUser };
