import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { FolderEnum, s3Client } from "~/server/bucket";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { env } from "~/env";

export const StorageRouter = createTRPCRouter({
  genereateURLForUpload: publicProcedure
    .input(
      z.object({
        folder: z.nativeEnum(FolderEnum),
        fileName: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const fileUrl = await getSignedUrl(
          s3Client,
          new GetObjectCommand({
            Bucket: env.NEXT_PUBLIC_DO_BUCKET_NAME,
            Key: input.folder + "/" + input.fileName,
          }),
          { expiresIn: 3600 * 24 * 7 },
        );

        return fileUrl;
      } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
      }
    }),
});
