import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { upLoadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken;
    const refreshToken = await user.generateRefreshToken;
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong when generating access and refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  //validation - not empty
  //check if user is already registered or existing
  //check for images and avatar
  //upload them to the cloudnary server
  //create user object - create entry in db
  //remove password and refresh token field from response
  // chech for user creation
  //return the response

  const { username, email, password, fullname } = req.body;

  //verify the output
  // console.log("username: ", username);
  // console.log("fullname: ", fullname);
  // console.log("email: ", email);
  // console.log("password: ", password);

  // if statement can be ues to check all the validation statements one by one
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    //
    throw new ApiError(400, "All Fields is required");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  // check if user is already registered or not existing
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // upload images to cloudinary
  const avatarLocalPath = req.files?.avatar[0]?.path;
  console.log(avatarLocalPath);
  // console.log(req.files);   // see the response from req.files

  // validation for the upload cover image to cloudinary
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;
  // console.log(coverImageLocalPath);

  // const coverImageLocalPath = req.files?.coverImage?.[0]?.path ?? null;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  // validation for avatar and cover image is missing here
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }
  // if (!coverImageLocalPath) {
  //   throw new ApiError(400, "Cover image is required");
  // }

  // upload avatar to cloudinary

  const avatarUploadResult = await upLoadCloudinary(avatarLocalPath);
  const coverImageUploadResult = await upLoadCloudinary(coverImageLocalPath);

  if (!avatarUploadResult) {
    throw new ApiError(400, "Error while uploading avatar to cloudinary");
  }

  // if (!coverImageUploadResult) {
  //     throw new ApiError(500, "Error while uploading cover image to cloudinary");
  // }

  const uesr = await User.create({
    username: username.toLowerCase(),
    fullname,
    email,
    password,
    avatar: avatarUploadResult.url, // avatar url for avatar upload request
    coverImage: coverImageUploadResult?.url || "",
  });

  const createdUser = await User.findById(uesr._id).select(
    "-password -refreshToken"
  );

  // check if user creation is successful
  if (!createdUser) {
    throw new ApiError(500, "Somthing went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user is successfully registered"));
  4;
});

// User Login

const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  //userName or email login authentication
  //find the user
  // check password
  //access and refresh token
  // send cookies
  // return response

  const { username, email, password } = req.body;

  if (!username || !email) {
    // login is varified by either username or email
    throw new ApiError(400, "Username or Email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // check password
  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    uesr._id
  );

  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return response
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(
      200, 
     { 
      user: loggedinUser, accessToken, refreshToken, 
    },
     "User is logged in successfully"
    )
  );
});


// logOut User

const logoutUser = asyncHandler(async(req, res) => {
  // req.cookies -> access and refresh token
  // remove cookies
  // return response

  await User.findByIdAndUpdate(
    req.user._id,
   {
    $set: { 
      refreshToken: null,
    }
   },
   {
    new: true,
    runValidators: true,
    select: "-password -refreshToken",
   },
   
  )

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res.status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(
    new ApiResponse(
      200,
      null,
      "User is logged out successfully"
    )
  );

})



// export default registerUser;

export { 
  registerUser, 
  loginUser,
  logoutUser,
};
