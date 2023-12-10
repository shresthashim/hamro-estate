
# Hamro Estate

A sleek real estate app powered by MongoDB, Express.js, React with Vite, and Node.js, with a stylish interface designed using Tailwind CSS. Discover, track, and secure property effortlessly. Creating a react application using Vite.

## Setting Up React Project with Vite

STEP 1: Create a new React project using Vite's Template 
```bash
npx create-vite@latest my-react-app --template react
```
STEP 2: Installing dependencies
```bash
npm install
```
STEP 3: Running the development server
```bash
npm run dev

> my-react-app@0.0.0 dev
> vite

  VITE v4.3.5  ready in 1225 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

## Installation

Install Tailwind CSS : 
Install tailwindcss via npm, and then run the init command to generate your tailwind.config.js file

```bash
npm install -D tailwindcss
npx tailwindcss init
```

Configure your template paths : 
Add the paths to all of your template files in your tailwind.config.js file.
```bash
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
Add the Tailwind directives to your CSS : 
Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.
```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```
## Run Locally

Clone the project

```bash
  git clone https://github.com/AsHim1123/hamro-estate
```

Go to the project directory

```bash
  cd hamro-estate
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Documentation

[Documentation](https://linktodocumentation)

