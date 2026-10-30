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

## Where it is live

The site is published with GitHub Pages from this repository:

- Live site: https://jamie1818.github.io/andrew-kaye-catering-v2/
- Repository: https://github.com/jamie1818/andrew-kaye-catering-v2

The `main` branch holds the whole project. The `gh-pages` branch holds only the
contents of `site/`, and that is what GitHub Pages serves.

### Publish an update

After editing files in `site/` and committing to `main`, push both branches:

```
git push origin main
git subtree push --prefix site origin gh-pages
```

The live site updates a minute or so later.

### Use the real domain

In the repository settings, under Pages, add `andrewkayecatering.co.uk` as the
custom domain, then at the domain registrar point the domain at GitHub Pages
(a CNAME record for `www` to `jamie1818.github.io`, and A records for the bare
domain to GitHub's Pages IPs, listed in GitHub's Pages documentation).

### Host it elsewhere

Nothing on the site depends on a server, a database or a particular host. Upload
the **contents** of `site/` to the web root of any host (Netlify drop, Cloudflare
Pages, cPanel `public_html`) so that `index.html` sits at the top level.

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
