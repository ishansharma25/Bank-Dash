# Bank Dash

A responsive web application built with React that provides a seamless user experience across various devices. The application features a dashboard interface with authentication and is optimized for multiple viewport sizes.

## 🌐 Live Demo
[Bank Dash](https://bankboard.netlify.app/login#/login)

## 🔐 Demo Credentials
- Username: Admin
- Password: GDT

## 🛠️ Tech Stack
- React.js
- Chart.js/Apex Charts for data visualization
- Hash Router for navigation
- JSON data files for mock backend
- Tailwind CSS for styling

## 📱 Supported Viewports
The application is tested and optimized for the following viewport sizes:
- 1536 x 738 (Large Desktop)
- 1280 x 603 (Desktop)
- 428 x 936 (Large Mobile)
- 390 x 884 (Medium Mobile)
- 375 x 667 (Small Mobile)

## 📁 Project Structure

Frontend/
├── public/
├── src/
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── jsconfig.json
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── README.md
└── netlify.toml


## ✨ Features
- Responsive design that adapts to different screen sizes
- Secure authentication system
- Interactive dashboard with data visualization
- Cross-browser compatibility
- Fluid layouts for optimal viewing experience

## 🌐 Browser Compatibility
### Desktop Browsers
- Google Chrome
- Mozilla Firefox
- Safari
- Microsoft Edge

### Mobile Browsers
- Safari (iOS)
- Chrome (Android)

## 🚀 Getting Started

1. Clone the repository
bash
git clone [repository-url]


2. Navigate to the Frontend directory
bash
cd Frontend


3. Install dependencies
bash
npm install


4. Start the development server
bash
npm run dev


## 📝 Development Notes
- The application uses data.json files for each screen to simulate backend functionality
- All assets are managed through the project's asset system
- Navigation is handled exclusively through hash-router

## 🔨 Build
To create a production build:
bash
npm run build


## 📤 Deployment
The application is configured for deployment on Netlify with automatic builds and deployments.