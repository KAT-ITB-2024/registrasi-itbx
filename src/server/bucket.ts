import { S3 } from "@aws-sdk/client-s3";
import { env } from "~/env";

const s3Client = new S3({
  forcePathStyle: false,
  endpoint: env.DO_ORIGIN_ENDPOINT,
  credentials: {
    accessKeyId: env.DO_ACCESS_KEY ?? "",
    secretAccessKey: env.DO_SECRET_KEY ?? "",
  },
});

export { s3Client };
