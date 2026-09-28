# Work2Base — Contractor Website

A one-page site for a freelance tech contractor offering **dashboards**, **websites / web pages**, and **IT support**.

Plain HTML, CSS, and JavaScript: no build step or framework.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page content: hero, services, process, portfolio, pricing, FAQ, contact |
| `styles.css` | Styling, responsive layout, automatic dark mode |
| `script.js` | Mobile menu, footer year, contact-form handling |
| `assets/favicon.svg` | Browser tab icon |

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Customize

1. **Business name.** Search for `Work2Base` in `index.html` and replace it.
2. **Email.** Replace `hello@example.com` in `index.html` and `CONTACT_EMAIL` in `script.js`.
3. **Prices.** Edit the Pricing section in `index.html`.
4. **Portfolio.** Replace the three example projects with real ones. To show an image, put it in `assets/` and swap the `.work-thumb` div for an `<img>`.
5. **Colors.** Change `--primary` and `--accent` at the top of `styles.css`.

## Receiving form submissions

The contact form currently opens the visitor's email app with the message filled in. To receive submissions directly instead, use a free form service such as [Formspree](https://formspree.io):

```html
<form id="contact-form" class="form" action="https://formspree.io/f/YOUR_ID" method="POST">
```

Then remove the `form.addEventListener("submit", ...)` block from `script.js`.

## Deploy (free options)

- **GitHub Pages:** Repo → Settings → Pages → deploy from branch `main`, folder `/ (root)`.
- **Netlify / Vercel / Cloudflare Pages:** connect the repo. There is no build command, and the publish directory is the root.
