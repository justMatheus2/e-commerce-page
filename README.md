# Nova Electronics Storefront

A dark-mode e-commerce storefront built with React, Vite, and TypeScript. The app includes a responsive product grid, a mobile filter drawer, a cart modal with shipping rules, and a footer with store contact details and social links.

## Tech Stack

- React
- Vite
- TypeScript
- Lucide React
- CSS split by feature and component area

## Features

- Responsive storefront layout with sidebar filters on desktop
- Mobile-first filter drawer for smaller screens
- Product cards with images, pricing, and add-to-cart actions
- Cart modal with grouped items, subtotal, shipping message, and buy button
- Free shipping above $300 and a $30 shipping fee below that threshold
- Footer with address, contact details, and social media links

## GitHub Pages Deployment

This project is already configured for GitHub Pages.
A workflow is included at .github/workflows/deploy.yml.
The Vite base path is set automatically from the repository name during GitHub Actions builds.

## Getting Started

1. Install dependencies with npm install.
2. Start the dev server with npm run dev.
3. Build for production with npm run build.
4. Preview the production build with npm run preview.

## Deploy Steps

1. Push the project to a GitHub repository.
2. Make sure the default branch is main.
3. In GitHub, open Settings > Pages.
4. Set the source to GitHub Actions.
5. Push to main or run the deploy workflow manually from the Actions tab.

## Notes

If you rename the repository later, the GitHub Pages base path will adapt automatically during CI builds.
If you use a custom domain later, you may want to revisit the Vite base configuration.

## Scripts

- npm run dev
- npm run build
- npm run preview
