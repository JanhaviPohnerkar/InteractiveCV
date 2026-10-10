# Janhavi — Personal Engineering Portfolio Website ☀️

A stunning, uniquely colorful, and cheerful personal portfolio website showcasing perception systems, visual SLAM, embedded firmware, edge AI, and robotics.

![Theme](https://img.shields.io/badge/Vibe-Vibrant%20%26%20Cheerful-orange?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20TailwindCSS%20%7C%20Three.js-yellow?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)

---

## 🌟 Key Highlights & Design Features

- **Vibrant & Cheerful Aesthetic**: Warm sunshine yellows, vibrant corals, friendly pastel mints, and soft lavender gradients over a clean, crisp off-white canvas.
- **Interactive 3D Hero Canvas**: Built with lightweight Three.js, featuring floating pastel toruses, spheres, and an interactive perception sensor node reacting smoothly to mouse parallax and click physics.
- **Playful Micro-Interactions**: Celebratory pastel confetti explosions (`canvas-confetti`), 3D perspective hover cards, and bouncy spring easing.
- **Complete Project Deep-Dives**: 12 detailed engineering projects including ORB-SLAM3 on Raspberry Pi 4B, US industrial textile defect detection (~300 µm precision), STM32 turbulence detection, EMG bionic prosthetic arm (97% accuracy), and Mars shape-from-shading.
- **Deep-Dive Modals & Interactive Filters**: Filter by domain (`SLAM & Robotics`, `Computer Vision`, `Embedded & Edge AI`, `Medical & Science`, `Deployed Systems`) with detailed modal views.
- **Production-Ready & Fully Responsive**: Optimized for smooth 60fps performance on mobile, tablet, and desktop with zero build step required.

---

## 📂 File Structure

```text
portfolio/
├── index.html           # Main markup & structured sections
├── style.css            # Cheerful color variables, 3D tilt styles, bouncy animations
├── script.js            # Three.js 3D canvas, confetti engine, filters, modals & toast
├── resume.pdf           # Downloadable curriculum vitae
├── .gitignore           # Standard git ignore definitions
├── README.md            # Documentation & deployment guide
└── assets/
    └── profile.png      # Profile avatar
```

---

## 🚀 How to Run Locally

Because this is built with vanilla HTML5, modern CSS3, and vanilla JavaScript, no compilation or npm build is required!

### Option 1: Direct Browser Launch
Double click `index.html` to open it in your default web browser.

### Option 2: Local HTTP Server (Recommended)
You can serve the folder using any lightweight local server:

**Using Python:**
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

**Using VS Code Live Server:**
Right click `index.html` and click **"Open with Live Server"**.

---

## 🐙 How to Push to GitHub & Make Live (GitHub Pages)

### Step 1: Create a New GitHub Repository
1. Go to [GitHub](https://github.com) and sign in.
2. Click **New Repository** (or visit https://github.com/new).
3. Name your repository (e.g., `portfolio` or `<your-username>.github.io`).
4. Set it to **Public** and **do NOT** initialize with README or .gitignore (we already have those).
5. Click **Create repository**.

### Step 2: Push Local Commits to GitHub
In PowerShell or your terminal inside this folder (`F:\portfolio`):

```powershell
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<REPO_NAME>.git
git branch -M main
git push -u origin main
```

### Step 3: Enable Free GitHub Pages Hosting
1. In your GitHub repository, click on **Settings** (top navigation tab).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment > Source**, select **Deploy from a branch**.
4. Set the branch to `main` and folder to `/ (root)`, then click **Save**.
5. Within 1–2 minutes, your website will be live at:
   `https://<YOUR_GITHUB_USERNAME>.github.io/<REPO_NAME>/`

---

## 📧 Contact & Links

- **Email**: `janhavi.pohnerkar@gmail.com`
- **Location**: Pune, Maharashtra, India
- **Status**: Open to internships and R&D roles in industrial perception, edge AI, and robotics.
