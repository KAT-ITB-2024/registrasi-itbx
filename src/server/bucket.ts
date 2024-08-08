import { S3 } from "@aws-sdk/client-s3";
import { env } from "~/env";

export enum FolderEnum {
  ITBGOTTALENT = "itbGotTalent",
  COMMITMENT = "commitment",
  PAYMENT = "payment",
}

const s3Client = new S3({
  forcePathStyle: false,
  region: env.NEXT_PUBLIC_DO_REGION,
  endpoint: env.NEXT_PUBLIC_DO_ORIGIN_ENDPOINT,
  credentials: {
    accessKeyId: env.NEXT_PUBLIC_DO_ACCESS_KEY ?? "",
    secretAccessKey: env.NEXT_PUBLIC_DO_SECRET_KEY ?? "",
  },
});

export { s3Client };
