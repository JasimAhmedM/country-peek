# CountryPeek

CountryPeek is a React application for searching and exploring countries using the RestCountries API. It includes live search, region filtering, sorting, a dark/light theme, country detail pages, and a persistent favourites list.

## Live Demo
https://jasimahmedm.github.io/country-peek

## Features
- Search countries by name with live results and debounce
- Filter by region and sort by name or population
- View a full country profile with flag, languages, currencies, and borders
- Toggle between light and dark themes across the entire app
- Save favourite countries to a persistent list backed by localStorage
- Responsive layout and keyboard-friendly interactions

## Tech Stack
- React
- Vite
- React Router v7
- CSS custom properties
- useReducer + localStorage persistence
- GitHub Pages deployment

## Run Locally
1. Install dependencies
```bash
npm install
```
2. Start the dev server
```bash
npm run dev
```
3. Open the local URL shown in the terminal

## Deploy
Build and deploy to GitHub Pages:
```bash
npm run deploy
```

## Notes
This app uses hash-based routing to support client-side navigation on GitHub Pages.
