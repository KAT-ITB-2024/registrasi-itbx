import { PutObjectCommand } from "@aws-sdk/client-s3";
import { FolderEnum, s3Client } from "~/server/bucket";
import { v4 as uuidv4 } from "uuid";
import sanitize from "sanitize-filename";

const uploadFile = async (file: File, fileName: string, folder: FolderEnum) => {
  try {
    const fileUUID = uuidv4();
    const sanitizedFileName = sanitize(fileName);
    const sanitizedFilename = `${fileUUID}-${sanitizedFileName}.zip`;

    const fileContent = Buffer.from(await file.arrayBuffer());

    const putObjectCommand = new PutObjectCommand({
      Bucket: "oskm-itb",
      Key: folder + "/" + sanitizedFilename,
      Body: fileContent,
    });

    // Upload the file
    await s3Client.send(putObjectCommand);

    return sanitizedFilename;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Rethrow the error to handle it in the caller
  }
};

export { uploadFile };
