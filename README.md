# Letterboîte - Movie List Manager

A web application for managing movie lists using TMDB API, built with vanilla JavaScript and Bootstrap.

Letterboîte is a small front-end project that I made for school. Its purpose was to enhance my JavaScript skills to create dynamic responsive front-end environnements and using API implementation. It is a parody of the unfamous website [letterboxd](https://letterboxd.com/).

## Features

- Browse popular movies
- Search movies globally
- Create and manage custom movie lists
- Offline list storage
- Multi-language support (FR/EN/DE/ES)
- Detailed movie information
- Watchlist functionality

## Requirements 

- You will need a TMDB API access token, you can create one by following [these instructions](https://developer.themoviedb.org/docs/getting-started).
- You will also need Node.js (version 20) and npm : here's how to [install them](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

- **If you don't have Node.js v20, [install NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) and use version 20 by doing this :**
```bash
nvm install 20
```
then check if you're using the good version by typing 
```bash
node -v
```
if it returns 
```bash
v20.18.1
```
then you are all set !


## Installation

1. Clone the repository
```bash
git clone https://github.com/mtkuwav/letterboite.git
```

2. Install dependencies
```bash
npm install
```


## Usage

### Development
```bash
npm run start
```
Starts development server at http://127.0.0.1:9090, it should automatically open a tab in your default browser.

### Production Build
```bash
npm run dist
```

### Lint Code
```bash
npm run lint
```

## Technical Stack

- Vanilla JavaScript
- Bootstrap 5
- Webpack
- TMDB API
- ESLint
- SCSS

## API Documentation

The application uses TMDB API v3. You can find the doc [here](https://developer.themoviedb.org/).

- `/movie/popular-films` - Get popular movies
- `/movie/{id}` - Get movie details

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
