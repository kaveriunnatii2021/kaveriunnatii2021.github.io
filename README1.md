# Kaveri Unnatii Apartment Website

A mobile-friendly static website designed for free hosting with GitHub Pages.

## Included
- Home page
- About/community section
- Photo gallery
- Events section
- Community notices
- Contact section
- Mobile navigation
- Full-screen photo viewer
- Two Kaveri Unnatii photos already included

## Add more photos
Put additional JPG/PNG/WebP files into `images/`, then add another button like this inside the `.gallery` section in `index.html`:

```html
<button class="photo-card" data-full="images/your-photo.jpg">
  <img src="images/your-photo.jpg" alt="Description of photo">
  <span class="photo-caption">
    <strong>Album name</strong>
    <small>Short description</small>
  </span>
</button>
```

## Free publishing with GitHub Pages
1. Create a free GitHub account if you do not already have one.
2. Create a public repository, for example `kaveri-unnatii`.
3. Upload everything in this folder to the repository.
4. Open repository **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
6. GitHub will provide the public `github.io` website address.

GitHub Pages is a static hosting service and is available with GitHub Free for public repositories. The hosting/platform terms can change, so “free” should be understood as free under the current GitHub Pages offering; a custom domain such as `.com` or `.in` is normally a separate paid registration.

## Important
Because this is a public website, do not publish residents' private phone numbers, financial information, flat-specific records, or other sensitive information.
