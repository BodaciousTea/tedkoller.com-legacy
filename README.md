# Ted Koller legacy portfolio

This repository preserves the previous version of Ted Koller's portfolio. The
site is a statically exported Next.js application configured to live at:

<https://tedkoller.com/legacy/>

The source was recovered from the `backup-old-site` branch of
`BodaciousTea/BodaciousTea.github.io`, under `Websites/tedkoller`.

## Local development

```bash
npm ci
npm run dev
```

Open <http://localhost:3000/legacy/>.

## Production build

```bash
npm run build
```

The static site is written to `out/`. Because `tedkoller.com` is served by the
`BodaciousTea.github.io` user site, the exported files are published to the
`legacy/` directory of that repository. Keeping the source here avoids mixing
the archived Next.js project into the current static portfolio.
