# Digital Care Solutions

This repository contains the source for **Digital Care Solutions**, a Bengali-language landing page offering AI-driven digital marketing services for hospitals and clinics.

## Features
- Responsive layout built with [Tailwind CSS](https://tailwindcss.com) and Google Fonts.
- Mobile navigation menu and FAQ accordion handled by `main.js`.
- Contact and package order forms that submit to a Google Apps Script backend.
- Dynamic current year display in the footer.

## Getting Started
No build step is required. To preview the site locally:

1. Serve the repository root with any static file server, for example:
   ```bash
   npx serve .
   ```
2. Open `http://localhost:3000` in your browser.

Update the `scriptURL` constant in `main.js` with your own Google Apps Script URL to enable form submissions.

## Deployment
The project is configured for GitHub Pages with the custom domain defined in the `CNAME` file.

