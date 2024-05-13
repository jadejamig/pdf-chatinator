import { Pinecone } from '@pinecone-database/pinecone';

export const pc = new Pinecone({ 
    apiKey: process.env.PINECPNE_API_KEY!
});
