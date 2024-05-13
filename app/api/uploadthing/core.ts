import prisma from "@/prisma/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone"
import { pc } from "@/lib/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";

const f = createUploadthing();
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pdfUploader: f( { pdf: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
    
      const { getUser } = getKindeServerSession();
      const user = await getUser();
      
       // If you throw, the user will not be able to upload
      if (!user || !user.id) throw new UploadThingError("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
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

        const pagesAmt = pageLevelDocs.length;

        // Vectorize and index pdf
        const pineconeIndex = pc.index('pdf-chatinator')

        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
        });

        await PineconeStore.fromDocuments(
          pageLevelDocs,
          embeddings,
          {pineconeIndex: pineconeIndex,
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