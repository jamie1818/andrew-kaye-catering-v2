# Andrew Kaye Catering — new website design

Date: 30 October 2026
Status: built in this session under stated assumptions (no user Q&A was possible)

## What this is

A replacement for andrewkayecatering.co.uk: a small, fast, static marketing site for a
London event caterer established in 2010. The business caters in homes, marquees and
venues (weddings, bar and bat mitzvahs, birthdays, dinner parties) and sells through
email and phone enquiries. The site's one job is to make a host confident enough to
get in touch.

## What was reused from the old site

- All copy (intro, about, five client letters, contact details, company number).
- The six menus, previously PDF-only, now rendered as HTML on a menus page with the
  original PDFs still downloadable.
- All 32 gallery photos plus 6 feature photos, and the signature logo.
- Montserrat, the existing brand sans, kept for body text for continuity.

## Assumptions made (change any of these)

1. Static HTML/CSS/JS with no build step, so it can be uploaded to any host.
2. Four pages: Home, Menus, Gallery, Contact. About and testimonials live on Home.
3. The enquiry form opens the visitor's email app with details prefilled (no backend).
   README explains how to switch to Formspree or Netlify Forms.
4. No prices on the site, matching the current site.
5. Service area stated as "London", matching the current site title.
6. Google Analytics tag not carried over (old UA property is retired).

## Design direction

- Palette: deep pine green as the brand dark, warm paper white as the light surface,
  saffron as a sparing accent (the menus feature saffron rice). Light and dark themes.
- Type: Cormorant (light serif, echoes the logo's classical caps) for display;
  Montserrat for body and controls.
- Layout: left-aligned editorial layout. Every client photo is portrait, so the design
  uses tall image columns rather than cropped landscape banners. The hero is a trio of
  tall photographs under a large light headline.
- Testimonials are presented as what they are: letters addressed to Andrew.
- Menus page: all six menus on one page with a sticky in-page menu, PDF link per menu.
- Gallery: lightweight custom lightbox, keyboard accessible, no library.

## Files

```
site/
  index.html  menus.html  gallery.html  contact.html
  css/site.css   js/site.js
  images/ (feature photos, gallery/01-32.jpg, logo.png, logo-mark.png)
  menus/ (six PDFs)
  favicon.ico
README.md (how to deploy and edit)
```

## Out of scope

Online ordering, a CMS, pricing, a blog, and third-party embeds (maps, Instagram feed).
