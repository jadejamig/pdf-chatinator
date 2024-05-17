import { pc } from "@/lib/pinecone";
import prisma from "@/prisma/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import * as z from "zod";

const f = createUploadthing({
  errorFormatter: (err) => {
    return {
      message: err.message,
      zodError: err.cause instanceof z.ZodError ? err.cause.flatten() : null,
    };
  },
});
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pdfUploader: f( { pdf: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({req}) => {
      // This code runs on your server before upload

      const { getUser } = getKindeServerSession();
      const user = await getUser();
      
       // If you throw, the user will not be able to upload
      if (!user || !user.id) throw new UploadThingError("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      
      return { userId: user.id };
    })
    // .onUploadError((e) => {
    //   // Do something on error
    //   console.log("Error here")
    // })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
  
      const createdFile = await prisma.file.create({
        data: {
            name: file.name,
            uploadStatus: "SUCCESS",
            url: file.url,
            key: file.key,
            userId: metadata.userId
        }
      })

      // indexing pdf
      try {
        const response = await fetch(file.url);
        const blob = await response.blob();
        
        const loader =  new PDFLoader(blob);

        const pageLevelDocs = await loader.load();
        // const pagesAmt = pageLevelDocs.length;

        // Vectorize and index pdf
        const pineconeIndex = pc.index(process.env.PINECONE_INDEX!)

        const embeddings = new OpenAIEmbeddings();

        await PineconeStore.fromDocuments(
          pageLevelDocs,
          embeddings,
          {
            pineconeIndex: pineconeIndex,
            namespace: createdFile.id
          }
        )

      } catch {
        
      }
 
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    })
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;