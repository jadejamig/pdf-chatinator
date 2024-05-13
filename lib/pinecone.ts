import { Pinecone } from '@pinecone-database/pinecone';

// Instantiate a new Pinecone client, which will automatically read the
// env vars: PINECONE_API_KEY and PINECONE_ENVIRONMENT which come from
// the Pinecone dashboard at https://app.pinecone.io
export const pc = new Pinecone();
