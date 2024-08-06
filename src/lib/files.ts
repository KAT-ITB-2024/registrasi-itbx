import { PutBucketCorsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "~/server/bucket";
import { env } from "~/env";
// import axios, { type AxiosProgressEvent } from "axios";

// export enum FolderEnum {
//   PROFILE = "profile",
//   ASSIGNMENT = "assignment",
//   MATERIAL = "material"
// }

// export enum AllowableFileTypeEnum {
//   PDF = "application/pdf",
//   PNG = "image/png",
//   JPEG = "image/jpeg"
// }

// export const uploadFile = async (
//   url: string,
//   file: File,
//   type: AllowableFileTypeEnum,
//   onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
// ) => {
//   const axiosInstance = axios.create();

//   await axiosInstance.put<null>(url, file, {
//     headers: {
//       "Content-Type": type
//     },
//     onUploadProgress
//   });
// };

// export const downloadFile = async (
//   url: string,
//   onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
// ) => {
//   const axiosInstance = axios.create();

//   const response = await axiosInstance.get<Blob>(url, {
//     responseType: "blob",
//     onDownloadProgress
//   });

//   return response.data;
// };

const uploadFile = async (file: File, fileName: string) => {
  try {
    const fileContent = Buffer.from(await file.arrayBuffer());

    const putObjectCommand = new PutObjectCommand({
      Bucket: "oskm-itb",
      Key: fileName,
      Body: fileContent,
    });

    // Upload the file
    console.log("tes1");
    const response = await s3Client.send(putObjectCommand);
    console.log("tes2");

    // Construct the URL of the uploaded file
    const fileUrl = `https://${process.env.DO_BUCKET_NAME}.${process.env.DO_ORIGIN_ENDPOINT}/itbGotTalent/${fileName}`;

    console.log("File uploaded successfully:", response);
    console.log("File URL:", fileUrl);

    return fileUrl; // Return the URL for further use
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export { uploadFile };
