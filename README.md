# 🚀 GitHub Profile Comparer

A sleek, modern web application to compare GitHub developer profiles side-by-side with beautiful visualizations and real-time analytics.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.10-38bdf8.svg)

## ✨ Features

- **Profile Comparison** - Compare up to 4 GitHub profiles simultaneously
- **Visual Analytics** - Interactive charts displaying stars, PRs, and repositories
- **Tech Stack Analysis** - Detailed breakdown of programming languages used
- **Real-time Data** - Fetches live data from GitHub API
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop
- **Dark Theme** - Eye-friendly full black UI with neon accents and animations

## 🛠️ Tech Stack

- **Frontend:** React 18.3, TailwindCSS
- **Charts:** Chart.js, React-ChartJS-2
- **API:** GitHub REST API v3
- **Styling:** Custom CSS animations, Glass-morphism effects
- **Build Tool:** React Scripts

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/profile-comparer.git
   cd profile-comparer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_GITHUB_TOKEN=your_github_personal_access_token
   ```
   
   > Get your GitHub token from [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

1. Enter your GitHub profile URL in the main input field
2. Select the number of profiles you want to compare (1-3)
3. Enter the comparison profile URLs
4. Click **"Start Comparison"** to analyze
5. View interactive charts and detailed statistics

## 📱 Screenshots

<img width="1903" height="872" alt="Screenshot (85)" src="https://github.com/user-attachments/assets/b114928d-ed18-4a9e-ad01-867bb421ec09" />
<img width="1901" height="872" alt="Screenshot (86)" src="https://github.com/user-attachments/assets/0ae2385e-5ac9-4753-9005-7cd2e8ab9bcc" />
<img width="1903" height="1080" alt="Screenshot (87)" src="https://github.com/user-attachments/assets/8c66a4b9-5af8-46ad-87c5-ea38f185e48a" />


## 🚀 Build for Production

```bash
npm run build
```

The optimized production build will be created in the `build/` directory.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- GitHub API for providing developer data
- Chart.js for beautiful visualizations
- React community for amazing tools and libraries

---

**Made with ⚡ by developers, for developers**
