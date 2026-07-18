# Deployment

## Development

Install dependencies:

```sh
npm install
```

Start the Vite development server:

```sh
npm run dev
```

## Production

Create an optimized production build:

```sh
npm run build
```

The deployment target is Vercel. Configure the project to build with `npm run build` and publish Vite's generated `dist` directory.

## Environment Variables

Configure these variables locally in `.env.local` and in the Vercel project environment:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

These browser-facing values connect the application to Supabase. Access must still be restricted with appropriate Supabase Row Level Security policies.

Never commit secrets or local environment files to version control.
