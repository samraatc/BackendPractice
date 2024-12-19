import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an image

const upLoadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload the cloudinary image
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      // eager: [{ width: 500, height: 500, crop: "fill" }],
    });

    // file has been uploaded successfully
    // console.log("File has been Uploaded cloudinary", response.url);
    // remove or unlink the avatar image from server after the image is successfully uploaded
    fs.unlinkSync(localFilePath);
    return response;

  } catch (error) {
    // remove temporary file from the server when upload complete or fail
    fs.unlinkSync(localFilePath); 
    return null;
  }
};

// const uploadResult = await cloudinary.uploader
//   .upload(
//     "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
//     {
//       public_id: "shoes",
//     }
//   )
//   .catch((error) => {
//     console.log(error);
//   });

// console.log(uploadResult);

export { upLoadCloudinary };
