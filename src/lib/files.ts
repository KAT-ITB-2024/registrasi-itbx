import { PutBucketCorsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { FolderEnum, s3Client } from "~/server/bucket";
import { v4 as uuidv4 } from "uuid";
import sanitize from "sanitize-filename";
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

const uploadFile = async (file: File, fileName: string, folder: FolderEnum) => {
  try {
    const fileUUID = uuidv4();
    const sanitizedFileName = sanitize(fileName);
    const sanitizedFilename = `${fileUUID}-${sanitizedFileName}`;

    const fileContent = Buffer.from(await file.arrayBuffer());

    const putObjectCommand = new PutObjectCommand({
      Bucket: "oskm-itb",
      Key: folder + "/" + sanitizedFilename,
      Body: fileContent,
    });

    // Upload the file
    const response = await s3Client.send(putObjectCommand);

    return sanitizedFilename;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export { uploadFile };
