# dictionary-ui

## Initialize Next.js application

Download [↑ Node.js](https://nodejs.org/en).

Create [↑ Next.js](https://nextjs.org/docs/getting-started/installation) application:

```csharp
npx create-next-app@latest
```

## Run locally

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Run in Docker

```bash
docker run -p 3000:3000 mialkin/dictionary-ui:1.0.0
```