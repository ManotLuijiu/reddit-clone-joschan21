/* eslint-disable no-console */
import { getToken } from 'next-auth/jwt';
import { type FileRouter, createUploadthing } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(async (req) => {
      const user = await getToken({ req });

      if (!user) throw new Error('ไม่มีสิทธิ์ในการเข้าถึง');

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId: ", metadata.userId)
      console.log("File URL ", file.url)
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
