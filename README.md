# TimeBank Albuquerque

A static landing page for **TimeBank Albuquerque** (Albuquerque, NM), inspired by [TimeBank Boulder](https://timebankboulder.org/). Built with [Jekyll](https://jekyllrb.com/) for easy editing and hosted on **GitHub Pages**.

## Edit the site (no coding)

Almost all content is controlled by **`_config.yml`**. Edit that file to change:

- **Stats** – local hours, years in Albuquerque, member counts
- **Links** – Join URL, member login, newsletter, footer links, social media
- **Sample offers & requests** – the lists shown on the homepage
- **Quote** – the large quote in the middle of the page
- **Colors** – brand color, teal, dark blue, footer background (hex codes)

After editing, save and push to your GitHub repo; GitHub Pages will rebuild the site automatically.

## Run locally

1. Install Ruby (e.g. from [ruby-lang.org](https://www.ruby-lang.org/en/downloads/)).
2. run `gem install bundler` (if you don't have bundler installed)
3. In this folder, run:
   ```bash
   bundle install
   bundle exec jekyll serve
   ```
4. Open [http://localhost:4000](http://localhost:4000) in your browser.

For a **project site** (e.g. `username.github.io/abqhours`), `_config.yml` must have:

```yaml
baseurl: "/abqhours" # must match the repo name
url: "https://username.github.io"
```

If `baseurl` is wrong, CSS and other assets won’t load on GitHub Pages. Leave `baseurl: ""` only for a user/org site at the root (e.g. `username.github.io`).

## Deploy on GitHub Pages

1. Push this repo to GitHub.
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, choose **Source**: “GitHub Actions” (recommended) or “Deploy from a branch”.
   - **GitHub Actions**: Create a workflow that runs Jekyll (see [GitHub’s Jekyll workflow](https://github.com/actions/starter-workflows/blob/main/pages/jekyll.yml)) or use the simple workflow below.
   - **Branch**: set branch to `main` (or `gh-pages`) and folder to `/ (root)` or `/docs` if you use a `docs` folder.

### Optional: GitHub Actions workflow

Create `.github/workflows/jekyll.yml`:

```yaml
name: Jekyll build and deploy

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: "3.1"
          bundler-cache: true
      - run: bundle exec jekyll build --destination _site
      - uses: actions/upload-pages-artifact@v3

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then in the repo **Settings → Pages**, set **Source** to “GitHub Actions”. Pushing to `main` will build and publish the site.

## Project structure

- **`_config.yml`** – Site title, description, and all editable content (stats, links, offers, requests, quote, footer, social).
- **`_layouts/default.html`** – Main layout (top bar, header, footer).
- **`_includes/`** – Top bar, header, footer, and one include per section (hero, intro, offers/requests, quote, stats, join CTA).
- **`index.md`** – Homepage; pulls in the section includes.
- **`assets/css/style.css`** – Styles; uses CSS variables from `_config.yml` for brand colors.

To add or reorder sections, edit `index.md` and the corresponding `_includes/section_*.html` or `_config.yml`.

## License

See [LICENSE](LICENSE).
