# Andrew Kaye Catering website

A static website: plain HTML, CSS and JavaScript with no build step. Everything the
site needs is in the `site/` folder.

## Pages

| File | What it is |
| --- | --- |
| `site/index.html` | Home: hero, about, menu overview, occasions, client letters, gallery preview, contact |
| `site/menus.html` | All six menus written out, with the original PDFs linked |
| `site/gallery.html` | 38 photos with a lightbox |
| `site/contact.html` | Phone, email, Instagram and an enquiry form |

Shared files: `site/css/site.css`, `site/js/site.js`, `site/images/`, `site/menus/` (PDFs).

## Put it live

Upload the **contents** of the `site/` folder to the web root of any host, so that
`index.html` sits at the top level. Options that take a folder as-is:

- Netlify: drag the `site` folder onto app.netlify.com/drop.
- GitHub Pages, Cloudflare Pages, Vercel: point them at the `site` folder.
- Existing cPanel or FTP hosting: upload into `public_html`.

Then point the andrewkayecatering.co.uk domain at the new host. Nothing on the site
depends on a server, a database or a particular hosting company.

## Edit content

- **Copy and photos**: edit the HTML directly. Each `<img>` has `alt` text; keep it
  meaningful when swapping photos. Photos are portrait (3:4). Drop new ones into
  `site/images/gallery/` and add a line to `gallery.html`.
- **Menus**: edit the lists in `menus.html`. Each menu is a `<section class="menu">`
  with courses as `<div class="course">`. Replace the PDFs in `site/menus/` to update
  the downloads.
- **Contact details**: the phone numbers and email address appear in the header
  CTA, footer and contact page of every file. Search for `020 8866` and
  `info@andrewkayecatering` to find them all.
- **Colours and type**: the palette and fonts are tokens at the top of
  `site/css/site.css`. Light and dark themes are both defined there.

## Enquiry form

The form on `contact.html` opens the visitor's email app with the message filled in
(a `mailto:` link), so it works without any server. To receive enquiries without
relying on the visitor's email app:

1. Sign up for Formspree (formspree.io) or use Netlify Forms if hosting on Netlify.
2. In `contact.html`, add `action="https://formspree.io/f/YOUR_ID" method="POST"`
   to the `<form>` tag.
3. In `site/js/site.js`, delete the block that starts `/* Enquiry form`.

## Notes

- The old site's Google Analytics tag (a retired Universal Analytics property) was
  not carried over. Add a GA4 or Plausible snippet before `</head>` if wanted.
- The `docs/` folder holds the design notes from the rebuild.
