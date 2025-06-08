
# Hawk-Eye Dashboard Guardian

A comprehensive security monitoring dashboard for database vulnerability assessment and security testing.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Git installed

### Local Development

```bash
# Step 1: Clone the repository
git clone https://github.com/rohitcoder/hawk-eye.git

# Step 2: Navigate to the project directory
cd hawk-eye

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## 🏗️ Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 🚀 Deployment Options

### Option 1: Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel (first time only)
vercel login

# Deploy to Vercel
vercel

# For production deployment
vercel --prod
```

**OR** connect your GitHub repo to Vercel:
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect React/Vite settings
5. Click "Deploy"

### Option 2: Deploy to Netlify

```bash
# Method 1: Using Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Login to Netlify
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod --dir=dist
```

**OR** using Netlify web interface:
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist` folder after running `npm run build`
3. Or connect your GitHub repo for automatic deployments

### Option 3: Deploy to GitHub Pages

```bash
# Install gh-pages package
npm install --save-dev gh-pages

# Add these scripts to package.json:
# "homepage": "https://yourusername.github.io/hawk-eye",
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Deploy to GitHub Pages
npm run deploy
```

### Option 4: Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize Railway project
railway init

# Deploy
railway up
```

### Option 5: Deploy to Render

1. Connect your GitHub repo to [Render](https://render.com)
2. Create a new "Static Site"
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy

### Option 6: Self-Hosted Deployment

```bash
# Build the project
npm run build

# Copy dist folder contents to your web server
# Example for nginx:
sudo cp -r dist/* /var/www/html/

# Or using rsync:
rsync -avz dist/ user@yourserver:/var/www/html/
```

#### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### Option 7: Deploy with Docker

```bash
# Create Dockerfile in project root:
```

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run Docker container
docker build -t hawk-eye-dashboard .
docker run -p 80:80 hawk-eye-dashboard
```

## 🔧 Environment Variables

Create a `.env` file in the root directory for any environment-specific configurations:

```env
VITE_API_URL=your_api_url_here
VITE_APP_TITLE=Hawk-Eye Dashboard
```

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Shadcn/ui** - UI component library
- **Lucide React** - Icons
- **React Router** - Client-side routing
- **React Query** - Data fetching and state management

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**Build fails:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Port already in use:**
```bash
# Kill process on port 8080
npx kill-port 8080
# Or use a different port
npm run dev -- --port 3000
```

**Permission denied errors:**
```bash
# Fix npm permissions (macOS/Linux)
sudo chown -R $(whoami) ~/.npm
```

## 🔗 Useful Links

- [Lovable Project](https://lovable.dev/projects/43e30b7a-53e8-4dfc-a0f1-060f9777e4a0) - Edit this project visually
- [Deployment Guide](https://docs.lovable.dev/) - Comprehensive deployment documentation
- [Vite Documentation](https://vitejs.dev/) - Build tool documentation
- [React Documentation](https://react.dev/) - Framework documentation

---

Built with ❤️ using [Lovable](https://lovable.dev)
