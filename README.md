# Janhavi — 3D Interactive Journey & Engineering Portfolio 🚗☀️

An immersive, uniquely colorful, and cheerful 3D interactive portfolio website built with **Three.js**, **Tailwind CSS**, and modern JavaScript. Users can drive a cute 3D car along a winding road through Janhavi's academic, internship, and research milestones!

![Theme](https://img.shields.io/badge/Theme-3D%20Interactive%20Journey-orange?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20Three.js%20%7C%20TailwindCSS-yellow?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)

---

## 🚗 The 3D Interactive World & Gameplay

1. **Stylized 3D Environment**: A winding road stretching through gentle rolling green hills, stylized low-poly trees, distant mountains in soft peach and lavender hues, and floating clouds under a warm sunny sky.
2. **The Vehicle**: A cute low-poly car equipped with rotating wheels, glowing headlights, cabin windows, and smooth driving physics.
3. **Controls**:
   - **Mouse**: Click & hold anywhere in the 3D scene (or click the on-screen **▲ Hold to Drive** pedal) to accelerate forward.
   - **Keyboard**: Press and hold the **Up Arrow** (`↑`) or **`W`** key to accelerate forward; use **Down Arrow** (`↓`) or **`S`** to reverse.
   - **On-Screen HUD**: Quick-jump milestone stepper bar with real-time speed, completion percentage, and reverse pedal.

---

## 🏁 Milestones & Checkpoints along the Road

As the car cruises along the road, it reaches interactive 3D arches that trigger detailed expandable milestone cards (complete with **photo placeholder slots** for future image uploads):

1. **Schooling**: Completed schooling from PSBA English School, Aurangabad.
2. **Engineering**: Engineering at MITAOE (MIT Academy of Engineering), Pune (CGPA: 8.41/10).
3. **1st Year**: Explored 3D design, Arduino, Raspberry Pi, competitions, and extracurriculars.
4. **Second Year**: Summer internship at Coppercloud — VLSI, embedded systems, and computer vision.
5. **Third Year**: R&D Intern at Coppercloud — zari textile defect detection (~300 µm precision), QR recognition on thermocol, and published research on DIPlib.
6. **Fourth Year**: Summer intern at Clarity Lab, IIT Jodhpur — 360-degree panorama stitching and visual SLAM on edge. Explored Jodhpur.
7. **Current / Next Milestone**: Research intern at IIT Jodhpur — point cloud digital twins from monocular video streams.

---

## 📁 File Structure

```text
portfolio/
├── index.html           # 3D Journey Canvas stage, HUD, milestones & portfolio sections
├── style.css            # Soft cheerful palette, 3D viewport, pedals & milestone modals
├── script.js            # Three.js 3D world engine, road spline, car physics & modals
├── resume.pdf           # Downloadable curriculum vitae
├── README.md            # Documentation & deployment guide
├── .gitignore           # Standard git ignore definitions
└── assets/
    └── profile.png      # Avatar image
```

---

## 📸 How to Add Photos to Your Milestone Cards

In `assets/`, place your milestone photos (e.g. `school.jpg`, `mitaoe.jpg`, `coppercloud.jpg`, `iitj.jpg`). Then, in `script.js` inside `MILESTONES_DATA`, you can simply add `image: "assets/your-photo.jpg"` or replace the placeholder in `index.html`.

---

## 🚀 How to Run Locally

Because this project is built with vanilla web technologies, no build step or node package manager is required.

### Quick Local Server:
```powershell
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

---

## 🐙 How to Push to GitHub & Deploy to GitHub Pages

1. **Create a new repository** on [GitHub](https://github.com/new) named `portfolio` (keep it Public, uncheck all template files).
2. In your terminal inside `F:\portfolio`, run:
   ```powershell
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
   git branch -M main
   git push -u origin main
   ```
3. In your GitHub repository **Settings > Pages**, choose **Deploy from a branch**, select `main` branch, and click **Save**.
4. Your 3D journey website will be live in 1-2 minutes!
