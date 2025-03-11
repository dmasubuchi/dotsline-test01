# DotsGames ID System Setup Guide

This document provides detailed instructions for setting up and running the DotsGames ID system.

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

1. Clone the repository
```bash
git clone https://github.com/dmasubuchi/dotsline-test01.git
cd dotsline-test01
```

2. Install dependencies
```bash
npm install
```

## Development

### Starting the Development Server

```bash
npm run dev
```

This will start the Vite development server, typically on port 5173. You can access the application by opening your browser and navigating to http://localhost:5173 (or the URL shown in your terminal).

### Building for Production

```bash
npm run build
```

This will create a production-ready build in the `dist` directory.

### Previewing the Production Build

```bash
npm run preview
```

This will serve the production build locally for testing.

## Project Structure

```
dotsline-test01/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # React components
│   │   ├── auth/        # Authentication components
│   │   ├── common/      # Shared components
│   │   ├── dashboard/   # Dashboard components
│   │   ├── layout/      # Layout components
│   │   ├── platform-linking/ # Platform linking components
│   │   ├── profile/     # Profile components
│   │   └── ui/          # UI components
│   ├── contexts/        # React contexts
│   ├── App.tsx          # Main application component
│   ├── index.css        # Global styles
│   └── main.tsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Configuration

### Tailwind CSS

The project uses Tailwind CSS for styling. The configuration is in `tailwind.config.js`.

### TypeScript

TypeScript configuration is in `tsconfig.json`.

### Vite

Vite configuration is in `vite.config.ts`.

## Testing

Currently, the project uses manual testing. You can test the application by:

1. Starting the development server
2. Navigating to the application in your browser
3. Testing the various features:
   - User registration and login
   - Password reset
   - Profile management
   - Platform linking
   - Language switching

## Troubleshooting

### Common Issues

#### Port Already in Use

If port 5173 is already in use, Vite will automatically try another port. Look for the URL in the terminal output.

#### Missing Dependencies

If you encounter errors about missing dependencies, try:

```bash
npm install
```

#### Build Errors

If you encounter build errors, check:

1. Node.js version (should be v18+)
2. npm version (should be v9+)
3. That all dependencies are installed correctly

## Deployment

For deployment, you can:

1. Build the application using `npm run build`
2. Deploy the contents of the `dist` directory to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)
