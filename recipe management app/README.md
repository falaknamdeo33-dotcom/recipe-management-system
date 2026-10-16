# Gather & Graze — Recipe Book

A responsive React recipe manager built with Vite. Browse and search recipes, filter by cuisine or category, save favorites, and add, edit, or delete recipes. Recipe data and favorites are stored in your browser's local storage.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Verify a production build

```bash
npm run build
npm run preview
```

The production build is generated in `dist/`. It is intentionally excluded from Git; build it locally when needed.

## Notes

- Your recipes and favorites are saved in the current browser and are not synced between devices.
- Starter recipes include photo credits and license links where applicable.
