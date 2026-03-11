# ctrl+r site

Next.js 16 website voor ctrl+r met:
- Publieke conversiegerichte website
- Sanity CMS-beheeromgeving (`/studio`)
- SEO-routes (`/sitemap.xml`, `/robots.txt`)
- Draft preview flow

## Snel starten

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Omgevingsvariabelen

Maak een `.env.local` met minimaal:

```bash
NEXT_PUBLIC_SITE_URL=https://ctrl-r-nine.vercel.app
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
SANITY_API_WRITE_TOKEN=your_write_token
SANITY_PREVIEW_SECRET=choose_a_long_secret
```

Als Sanity-variabelen ontbreken gebruikt de site automatische fallback-content.

## Content beheren

1. Ga naar `/studio`.
2. Bewerk content in `Site-instellingen`, `Homepage`, `Dienst`, `Projectcase`, `CTA` en `Contactinformatie`.
3. Publiceer je wijzigingen.

Lokale editor draaien:

```bash
npm run sanity:studio
```

Starter-content aanmaken (veilig; overschrijft niets bestaands):

```bash
npm run sanity:seed
```

`sanity:seed` leest automatisch variabelen uit `.env.local`.

Sanity-connectie en required env testen:

```bash
npm run sanity:check
```

Productie-URL in Sanity `siteSettings` synchroniseren:

```bash
npm run sanity:sync-site-url:prod
```

De Studio is ingericht voor niet-technische redactie met vaste secties:
- Site-instellingen (singleton)
- Homepage (singleton)
- Contactinformatie (singleton)
- CTA's
- Diensten
- Projectcases

## Redactieworkflow (Sprint 2)

1. Start de site lokaal (`npm run dev`) en Sanity Studio (`npm run sanity:studio`).
2. Draai eenmalig `npm run sanity:seed` voor basiscontent.
3. Pas content aan in Studio en klik op `Publish`.
4. Open de website en controleer homepage + `/work`.
5. Controleer concepten via preview-URL en publiceer pas na review.

## Preview flow

- Preview aanzetten:
  `/api/draft/enable?secret=JOUW_SECRET&redirect=/`
- Preview uitzetten:
  `/api/draft/disable`

Gebruik voor `JOUW_SECRET` dezelfde waarde als `SANITY_PREVIEW_SECRET`.

## Automatische Studio deploys

Bij wijzigingen in `src/sanity/**` of `sanity.config.ts` draait GitHub Actions automatisch een `sanity deploy`.

Benodigd:
- GitHub repository secret `SANITY_AUTH_TOKEN` met deploy-rechten voor project `dxucanzd`.

## Kwaliteitsbasis

- Security headers staan in `next.config.ts`.
- Structured data (`Organization`, `WebSite`) staat op de homepage.
- Elke publieke route heeft metadata + canonical.
