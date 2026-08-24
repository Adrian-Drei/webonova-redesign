# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Set the public production origin before building so canonical URLs, social
metadata, robots.txt, sitemap.xml, and structured data use the deployed domain:

```env
NUXT_PUBLIC_SITE_URL=https://www.webonova.com
NUXT_PUBLIC_FACEBOOK_APP_ID=your-meta-app-id
NUXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NUXT_PUBLIC_MICROSOFT_CLARITY_ID=your-clarity-project-id
```

Use the canonical HTTPS origin without a trailing slash.
The analytics scripts are omitted automatically when their IDs are blank or invalid.

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
