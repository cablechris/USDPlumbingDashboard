# USD Plumbing Dashboard

A Next.js dashboard for monitoring financial market liquidity signals.

## Features

- Real-time monitoring of financial indicators
- Status indicators with color coding
- Threshold-based alerts
- Automatic data refresh

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at http://localhost:3000.

### Building for Production

```bash
# Build the app
npm run build

# Start production server
npm start
```

## Project Structure

```
/
├── components/       # React components
├── constants/        # Application constants
├── lib/              # Utility functions
├── pages/            # Next.js pages
│   ├── api/          # API routes
│   └── ...           # Page components
├── public/           # Static assets
├── styles/           # Global styles
├── types/            # TypeScript type definitions
└── ...               # Config files
```

## Troubleshooting

### EPERM Issues in Development

If you encounter `EPERM` errors during development:

1. Stop the development server
2. Delete the `.next` directory: `rm -rf .next`
3. Restart the server: `npm run dev`

## License

This project is licensed under the MIT License. 