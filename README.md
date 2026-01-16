# remote-admin

A default app for the [Cash Box](https://woodcashbox.com). Allows the user to enable or disable remote administration.

## Overview

This is a React-based application that can be installed and run through the Cash Box App Manager. It provides a simple interface for enabling or disabling remote administration features.

## Prerequisites

- Node.js v20.x or later
- npm

## Development

### Installation

Install dependencies:

```bash
npm install
```

### Running in Development

To run the app in development mode with hot-reload:

```bash
npm run dev
```

This will start a Vite development server (typically on port 5173). You can access the app at `http://localhost:5173`.

### Building for Production

To build the app for production:

```bash
npm run build
```

The built files will be in the `dist/` directory. This directory contains the static files that will be served by the Cash Box App Manager.

## Publishing to npm

Before publishing, ensure you have:

1. Updated the version in `package.json` (using semantic versioning)
2. Built the app: `npm run build`
3. Logged in to npm: `npm login`

Then publish:

```bash
npm publish --access public
```

**Note:** Scoped packages are private by default. Use `--access public` to make them public so the App Manager can discover and install them.

## Installing via Cash Box App Manager

Once published to npm, the app will automatically appear in the App Store:

1. Open the Cash Box App Manager in your browser
2. Navigate to the **App Store** (click "App Store" in the navigation)
3. Find "Remote Administration" in the list (it may take a few minutes to appear after publishing)
4. Click **Install** to install the app
5. Go to **Home** to see your installed app
6. Click on the app icon to launch it

## Project Structure

```
remote-admin/
├── package.json          # npm package configuration
├── app.config.json       # App metadata (displayName, icon)
├── vite.config.js        # Vite build configuration
├── index.html            # HTML entry point
├── src/
│   ├── main.jsx         # React entry point
│   └── App.jsx          # Main app component
├── public/
│   └── assets/
│       └── icon.png     # App icon (64x64 or larger)
└── dist/                # Build output (generated)
    ├── index.html
    └── assets/
```

## API Integration

The app includes placeholder API integration for fetching and updating remote administration status. The API endpoints are currently commented out in `src/App.jsx` and should be updated when the backend endpoints are implemented:

- **GET** `/api/remote-admin/status` - Fetch current remote admin status
- **POST** `/api/remote-admin/toggle` - Toggle remote admin status

## Updating the App

To update the app:

1. Make your changes
2. Update the version in `package.json` (e.g., `1.0.0` → `1.0.1`)
3. Build the app: `npm run build`
4. Publish: `npm publish --access public`
5. Users can update by uninstalling and reinstalling, or you can implement an update mechanism

## Troubleshooting

### App Not Appearing in App Store

- Ensure `"psf-pi-appliance-app"` is in the `keywords` array in `package.json`
- Wait a few minutes for npm registry updates
- Verify the package is public (`--access public`)

### Build Errors

- Ensure all dependencies are installed: `npm install`
- Check that Node.js version is v20.x or later
- Verify `vite.config.js` is correctly configured

### App Not Loading After Installation

- Verify `dist/index.html` exists after building
- Check that all asset paths are relative (not absolute)
- Review browser console for JavaScript errors

## License

MIT
