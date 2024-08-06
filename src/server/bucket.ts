import { S3 } from "@aws-sdk/client-s3";
import { env } from "~/env";

export enum FolderEnum {
  ITBGOTTALENT = "itbGotTalent",
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

// const s3Client = new S3({
//   forcePathStyle: false,
//   region: "us-east-1",
//   endpoint: "https://sgp1.digitaloceanspaces.com",
//   credentials: {
//     accessKeyId: "DO00AWLTKLE37YQAKZUF",
//     secretAccessKey: "gEopqH2JTEVnlamhiAdSDLGiWdRpqjDheapFFfEpCcU",
//   },
// });

export { s3Client };
