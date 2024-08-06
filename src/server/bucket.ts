import { S3 } from "@aws-sdk/client-s3";

// const s3Client = new S3({
//   forcePathStyle: false,
//   region: process.env.DO_REGION,
//   endpoint: process.env.DO_ORIGIN_ENDPOINT,
//   credentials: {
//     accessKeyId: process.env.DO_ACCESS_KEY ?? "",
//     secretAccessKey: process.env.DO_SECRET_KEY ?? "",
//   },
// });

const s3Client = new S3({
  forcePathStyle: false,
  region: "us-east-1",
  endpoint: "https://sgp1.digitaloceanspaces.com",
  credentials: {
    accessKeyId: "DO00AWLTKLE37YQAKZUF",
    secretAccessKey: "gEopqH2JTEVnlamhiAdSDLGiWdRpqjDheapFFfEpCcU",
  },
});

export { s3Client };
