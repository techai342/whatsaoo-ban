# WhatsApp Support — React + Vite

A Vite + React conversion of the provided HTML "WhatsApp Support | Account Recovery Tool". This is intentionally minimal and uses the Tailwind CDN for quick setup so you can deploy to Vercel quickly and continue enhancing the project afterward.

## Quick start

1. Install
   - Node 18+ recommended.
   - Run:
     ```
     npm install
     ```

2. Run locally
   ```
   npm run dev
   ```
   Open http://localhost:5173

3. Build
   ```
   npm run build
   ```

4. Preview production build locally
   ```
   npm run preview
   ```

## Deploy to Vercel (quick)

- Option A (recommended): Push this repo to GitHub, then:
  1. Go to https://vercel.com/new
  2. Import your GitHub repo.
  3. Framework Preset: Vite
  4. Leave build & output settings as defaults (Vercel detects `npm run build`).
  5. Deploy.

- Option B: Use Vercel CLI
  1. Install: `npm i -g vercel`
  2. Run: `vercel` (follow prompts)
  3. To publish: `vercel --prod`

## How to enhance after deployment

- Add new components under `src/components/`
- Add routes with `react-router` if you want multiple pages
- Replace Tailwind CDN with a proper PostCSS + Tailwind config for production:
  - `npm i -D tailwindcss postcss autoprefixer`
  - `npx tailwindcss init -p`
  - Configure `tailwind.config.cjs` and import `@tailwind` directives in CSS
- Commit changes and push to your repo — Vercel will auto-deploy on pushes (if connected to your Git provider).

## Notes

- This project uses Tailwind via CDN to avoid adding PostCSS/Tailwind build steps for a quick deploy. For a robust production setup (smaller CSS bundle, purge, etc.) switch to an installed Tailwind workflow.
- Mail sending is done via a `mailto:` link, opening the user's email client with the prefilled subject/body (same behavior as original HTML).