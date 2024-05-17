## PDF Chatinator
Simple OpenAI GPT wrapper that uses the uploaded PDF's context in answering prompts. Naming was inspired by Dr. Doofenshmirtz 😂.

![pdf-chatinator](/public/pdf-chatinator.png)

![pdf-chatinator-dasjboard](/public/pdf-chatinator-dashboard.png)

![pdf-chatinator-file-view](/public/pdf-chatinator-file-view.png)

## Built With

-   Next JS 14
-   Typescript
-   Tailwind CSS
-   Shadcn
-   Supabase
-   Prisma
-   Kinde Auth
-   Upload Thing
-   Openai GPT Model
-   Vercel AI SDK
-   Pinecone
-   Langchain

## Features

-   User authentication with Kinde
-   File (pdf) upload API and storage using UploadThing
-   Intuitive UI with Shadcn and Tailwind
-   Mobile-first responsive design
-   PDF viewer using react-pdf
-   Pinecone to store pdf as vector data
-   Langchain for loading pdf to vector data
-   Vector similarity search with langchain (optimizes context)
-   OpenAI GPT-3.5-turbo model
-   Vercel AI SDK for response streaming feature

## Getting Started

To run the app locally:

1. Open your VSCode and clone the repository using this link:

```
https://github.com/jadejamig/pdf-chatinator.git
```
2. Open your terminal, make sure your current directory is in the root of the project and run the command below to install the dependencies inside **package.json**.

```
npm install
```

3. Create a *.env* file at the root directory of the project (same level as app folder) and instantiate it with the environment varialbes in *.env.example*.

```
KINDE_CLIENT_ID=
KINDE_CLIENT_SECRET=
KINDE_ISSUER_URL=
KINDE_SITE_URL=http://localhost:3000

KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/api/auth/success

# Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL=

# Direct connection to the database. Used for migrations.
DIRECT_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

PINECONE_API_KEY=
PINECONE_ENVIRONMENT=
PINECONE_INDEX=

OPENAI_API_KEY=
```

4. Setup a Kinde Auth account and project to get your Kinde client id, secret, and other links.

5. Setup a supabase account and project to get your supabase url and direct url.

6. Setup an uploadthing account and project to get your uploadthing secret and app id.

7. Setup a pinecone account and create an index to get the api key, environment and pinecone index values.

8. Setup an openai account to use APIs for their AI models. Free tier didn't work for me, I had to  buy $5 credits.

9. Once you get all thos environment variables, go and run this command in your terminal.

``` 
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.
