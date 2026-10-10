/* ==========================================================================
   Janhavi's Portfolio - Interactive JavaScript Engine
   Includes: Three.js 3D Interactive Canvas, Confetti, 3D Card Tilt,
             Project Filter, Deep-Dive Modals & Toast Feedback.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThreeHero();
  initRoleCycler();
  initConfettiTriggers();
  initCardTilt();
  initProjectFilters();
  initProjectModal();
  initContactForm();
  initCopyEmail();
  initMobileNav();
  initScrollSpy();
});

/* --------------------------------------------------------------------------
   1. Three.js Interactive 3D Playful Hero Canvas
   -------------------------------------------------------------------------- */
function initThreeHero() {
  const container = document.getElementById('three-hero-container');
  const canvas = document.getElementById('three-hero-canvas');
  if (!container || !canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 8.5;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  // Cheerful Pastel Lighting
  const ambientLight = new THREE.AmbientLight(0xfff8eb, 1.4);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 1.6);
  mainLight.position.set(5, 8, 6);
  scene.add(mainLight);

  const coralLight = new THREE.PointLight(0xff6b6b, 2.2, 20);
  coralLight.position.set(-4, -2, 3);
  scene.add(coralLight);

  const mintLight = new THREE.PointLight(0x34d399, 1.8, 20);
  mintLight.position.set(4, -3, 2);
  scene.add(mintLight);

  const lavenderLight = new THREE.PointLight(0xa78bfa, 2.0, 20);
  lavenderLight.position.set(0, 4, -2);
  scene.add(lavenderLight);

  // Group for all floating objects
  const objectsGroup = new THREE.Group();
  scene.add(objectsGroup);

  // Playful Shaders / Materials (Silky Pastel Finish)
  const matSunshine = new THREE.MeshPhysicalMaterial({
    color: 0xfbbf24,
    emissive: 0xd97706,
    emissiveIntensity: 0.15,
    roughness: 0.25,
    metalness: 0.1,
    clearcoat: 0.8,
    clearcoatRoughness: 0.15
  });

  const matCoral = new THREE.MeshPhysicalMaterial({
    color: 0xff6b6b,
    roughness: 0.2,
    metalness: 0.15,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1
  });

  const matMint = new THREE.MeshPhysicalMaterial({
    color: 0x34d399,
    roughness: 0.3,
    metalness: 0.05,
    clearcoat: 0.6,
    clearcoatRoughness: 0.2
  });

  const matLavender = new THREE.MeshPhysicalMaterial({
    color: 0xa78bfa,
    roughness: 0.25,
    metalness: 0.2,
    clearcoat: 0.7,
    clearcoatRoughness: 0.15
  });

  const matChromeSensor = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.85,
    roughness: 0.15
  });

  // 1. Central Cheerful "Perception Sensor Orb"
  const sensorGroup = new THREE.Group();

  const coreGeo = new THREE.SphereGeometry(1.2, 48, 48);
  const coreMesh = new THREE.Mesh(coreGeo, matLavender);
  sensorGroup.add(coreMesh);

  // Outer Sensor Ring / Donut
  const ringGeo = new THREE.TorusGeometry(1.7, 0.16, 24, 64);
  const ringMesh = new THREE.Mesh(ringGeo, matSunshine);
  ringMesh.rotation.x = Math.PI / 3;
  sensorGroup.add(ringMesh);

  // Cross Gimbal Ring (SLAM Coordinate Ring)
  const gimbalGeo = new THREE.TorusGeometry(2.1, 0.08, 16, 64);
  const gimbalMesh = new THREE.Mesh(gimbalGeo, matChromeSensor);
  gimbalMesh.rotation.y = Math.PI / 2.5;
  sensorGroup.add(gimbalMesh);

  // Optical Camera Sensor Eye
  const lensGeo = new THREE.CylinderGeometry(0.45, 0.5, 0.4, 32);
  const lensMesh = new THREE.Mesh(lensGeo, matChromeSensor);
  lensMesh.rotation.x = Math.PI / 2;
  lensMesh.position.z = 1.1;
  sensorGroup.add(lensMesh);

  const lensGlassGeo = new THREE.SphereGeometry(0.35, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.5);
  const matLensGlass = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.3,
    roughness: 0.1,
    transmission: 0.9,
    thickness: 0.5
  });
  const lensGlass = new THREE.Mesh(lensGlassGeo, matLensGlass);
  lensGlass.rotation.x = Math.PI / 2;
  lensGlass.position.z = 1.25;
  sensorGroup.add(lensGlass);

  objectsGroup.add(sensorGroup);

  // 2. Playful Floating Companions
  // Big Yellow Donut
  const donutGeo = new THREE.TorusGeometry(0.8, 0.35, 24, 48);
  const donutMesh = new THREE.Mesh(donutGeo, matSunshine);
  donutMesh.position.set(2.8, 1.8, -0.5);
  donutMesh.rotation.x = 0.8;
  objectsGroup.add(donutMesh);

  // Cheerful Coral Sphere
  const coralSphereGeo = new THREE.SphereGeometry(0.65, 36, 36);
  const coralSphereMesh = new THREE.Mesh(coralSphereGeo, matCoral);
  coralSphereMesh.position.set(-2.8, -1.4, 0.5);
  objectsGroup.add(coralSphereMesh);

  // Mint Geometric Crystal (Icosahedron)
  const mintIcoGeo = new THREE.IcosahedronGeometry(0.7, 0);
  const mintIcoMesh = new THREE.Mesh(mintIcoGeo, matMint);
  mintIcoMesh.position.set(2.7, -1.9, 0.2);
  objectsGroup.add(mintIcoMesh);

  // Mini Satellite / Tracking Node (SLAM feature marker)
  const satGeo = new THREE.SphereGeometry(0.3, 24, 24);
  const satMesh = new THREE.Mesh(satGeo, matCoral);
  satMesh.position.set(-2.6, 2.1, -0.2);
  objectsGroup.add(satMesh);

  // Small Torus floating gently
  const smallTorusGeo = new THREE.TorusGeometry(0.4, 0.15, 16, 32);
  const smallTorusMesh = new THREE.Mesh(smallTorusGeo, matLavender);
  smallTorusMesh.position.set(-1.2, 2.7, -0.8);
  objectsGroup.add(smallTorusMesh);

  // Mouse Parallax & Interaction Tracking
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let bounceScale = 1;

  window.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    if (e.clientY < rect.top - 100 || e.clientY > rect.bottom + 100) return;
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    targetRotationY = x * 0.45;
    targetRotationX = y * 0.35;
  });

  // Click canvas for playful bounce + mini confetti
  canvas.addEventListener('click', (e) => {
    bounceScale = 1.25;
    if (typeof confetti === 'function') {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || rect.left + rect.width / 2) / window.innerWidth;
      const y = (e.clientY || rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { x, y },
        colors: ['#FBBF24', '#FF6B6B', '#34D399', '#A78BFA', '#38BDF8']
      });
    }
  });

  // Responsive Resize
  function handleResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    if (width < 640) {
      camera.position.z = 11;
    } else if (width < 1024) {
      camera.position.z = 9.5;
    } else {
      camera.position.z = 8.5;
    }
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  handleResize();
  window.addEventListener('resize', handleResize);

  // Animation Loop with Visibility Optimization
  let isVisible = true;
  const observer = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.1 });
  observer.observe(container);

  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    const elapsedTime = clock.getElapsedTime();

    // Smooth Lerping for Mouse Parallax
    objectsGroup.rotation.y += (targetRotationY - objectsGroup.rotation.y) * 0.05;
    objectsGroup.rotation.x += (targetRotationX - objectsGroup.rotation.x) * 0.05;

    // Gentle Floating Motion
    sensorGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.18;
    sensorGroup.rotation.y = elapsedTime * 0.4;
    ringMesh.rotation.z = elapsedTime * 0.5;
    gimbalMesh.rotation.x = elapsedTime * 0.35;

    // Orbiting Floating Objects
    donutMesh.position.y = 1.8 + Math.cos(elapsedTime * 1.4) * 0.25;
    donutMesh.rotation.x = elapsedTime * 0.6;
    donutMesh.rotation.y = elapsedTime * 0.8;

    coralSphereMesh.position.y = -1.4 + Math.sin(elapsedTime * 1.8) * 0.2;
    coralSphereMesh.position.x = -2.8 + Math.cos(elapsedTime * 1.2) * 0.15;

    mintIcoMesh.position.y = -1.9 + Math.cos(elapsedTime * 1.6) * 0.22;
    mintIcoMesh.rotation.x = elapsedTime * 0.5;
    mintIcoMesh.rotation.y = elapsedTime * 0.7;

    satMesh.position.y = 2.1 + Math.sin(elapsedTime * 2.0) * 0.18;
    smallTorusMesh.rotation.x = elapsedTime * 0.9;
    smallTorusMesh.rotation.z = elapsedTime * 0.6;

    // Elastic bounce decay
    if (bounceScale > 1) {
      bounceScale += (1 - bounceScale) * 0.08;
    }
    sensorGroup.scale.set(bounceScale, bounceScale, bounceScale);

    renderer.render(scene, camera);
  }

  animate();
}

/* --------------------------------------------------------------------------
   2. Dynamic Hero Role Cycler (Typing / Morphing)
   -------------------------------------------------------------------------- */
function initRoleCycler() {
  const roleEl = document.getElementById('hero-dynamic-role');
  if (!roleEl) return;

  const roles = [
    "Computer Vision & 3D Perception Engineer",
    "Visual SLAM & Edge AI Researcher",
    "Sensor-to-Silicon Firmware Developer",
    "Bionic Robotics & Perception Specialist"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      roleEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      roleEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();
}

/* --------------------------------------------------------------------------
   3. Confetti Micro-Interactions
   -------------------------------------------------------------------------- */
function triggerCheerConfetti(e) {
  if (typeof confetti !== 'function') return;

  let x = 0.5;
  let y = 0.5;
  if (e && e.clientX && e.clientY) {
    x = e.clientX / window.innerWidth;
    y = e.clientY / window.innerHeight;
  }

  confetti({
    particleCount: 50,
    spread: 70,
    origin: { x, y },
    colors: ['#FBBF24', '#FF6B6B', '#10B981', '#8B5CF6', '#38BDF8', '#F43F5E']
  });
}

function initConfettiTriggers() {
  const cheerBtns = document.querySelectorAll('.trigger-confetti');
  cheerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      triggerCheerConfetti(e);
    });
  });

  const celebrationStickers = document.querySelectorAll('.interactive-sticker');
  celebrationStickers.forEach(sticker => {
    sticker.addEventListener('click', (e) => {
      triggerCheerConfetti(e);
      showToast("✨ Yay! Thanks for smiling!");
    });
  });
}

/* --------------------------------------------------------------------------
   4. 3D Card Hover Perspective Physics
   -------------------------------------------------------------------------- */
function initCardTilt() {
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* --------------------------------------------------------------------------
   5. Projects Data & Detailed Modals
   -------------------------------------------------------------------------- */
const PROJECTS_DATA = {
  orb_slam3: {
    title: "ORB-SLAM3 Optimization on Raspberry Pi 4B + CNN-Based Loop Closing",
    domain: "SLAM / Robotics / Edge AI",
    badgeColor: "yellow",
    summary: "Deployed and benchmarked ORB-SLAM3 on resource-constrained ARM hardware, and investigated replacing Bag-of-Words loop closure with a CNN-based place-recognition approach.",
    whyItMatters: "Demonstrates deep proficiency inside a complex research C++ codebase on embedded Linux with real-world performance engineering — not just high-level model training.",
    hardware: "Raspberry Pi 4B, Jetson Orin Nano, Custom Stereo Camera Rig",
    techStack: ["C++", "ORB-SLAM3", "Pangolin", "DBoW2", "g2o", "Sophus", "ONNX Runtime", "ARM NEON", "OpenMP", "MATLAB Stereo Calibrator"],
    highlights: [
      "Ran ORB-SLAM3 in stereo and stereo-inertial configurations directly on Raspberry Pi 4B and Jetson Orin Nano.",
      "Built the full dependency stack from source: Pangolin, DBoW2, g2o, Sophus with ARM architecture tuning.",
      "Created and calibrated custom stereo camera datasets; debugged Stereo.T_c1_c2 convention differences between MATLAB and ORB-SLAM3 configs.",
      "Benchmarked against published EuRoC datasets; instrumented C++ code for FPS logging and Absolute Trajectory Error (ATE) computation.",
      "Leveraged ARM-specific optimizations (-O3, architecture tuning, NEON/SIMD vectorization, and OpenMP multi-threading).",
      "Explored CNN-based place recognition for robust visual loop closing via ONNX Runtime inference."
    ],
    metrics: "Benchmarked on EuRoC dataset; achieved real-time execution with ARM NEON vectorization.",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },

  defect_detection: {
    title: "Industrial Defect Detection — Metal-Plated Thread / Textile Inspection",
    domain: "Industrial AI / Computer Vision / Deployed",
    badgeColor: "coral",
    summary: "End-to-end industrial inspection system classifying metal-plated thread as defective / non-defective, deployed for a US-based manufacturer with live camera feed and factory signalling.",
    whyItMatters: "A production-grade industrial perception pipeline covering high-speed image acquisition, preprocessing, sub-pixel measurement, inference, and factory-floor debounce logic.",
    hardware: "Industrial CMOS Camera, Industrial Edge Gateway, Factory PLC signalling interface",
    techStack: ["Python", "OpenCV", "Random Forest", "Lab Colour Space", "CLAHE", "Flask", "MQTT", "ZeroMQ"],
    highlights: [
      "Curated dataset of ~1,407 high-resolution industrial textile images with binary defective / non-defective classification.",
      "Engineered a robust preprocessing pipeline: Lab colour space → CLAHE → b-channel analysis → thresholding → ROI extraction → normalization & padding.",
      "Trained an optimized Random Forest classifier delivering 92.9% validation and 93.97% test accuracy.",
      "Built a responsive Flask web inspection dashboard with real-time camera streaming.",
      "Integrated MQTT for distributed status communication and added custom debounce logic for rock-solid stability in production.",
      "Follow-up research: currently extending to deep transfer-learning models to benchmark against classical methods for publication."
    ],
    metrics: "~300 µm measurement accuracy | 93.97% test accuracy on factory floor",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },

  stm32_turbulence: {
    title: "STM32 Aircraft Turbulence & Abnormal-Motion Detection",
    domain: "Embedded / Edge AI / Signal Processing",
    badgeColor: "mint",
    summary: "A sensor-to-inference embedded pipeline that detects abnormal aircraft motion (e.g., severe turbulence) across flight phases using an IMU on an STM32 ARM Cortex-M4 microcontroller.",
    whyItMatters: "Complete end-to-end embedded engineering: low-level hardware interrupts, DMA/ADC signal conditioning, and on-device tinyML inference without cloud dependency.",
    hardware: "STM32F411RE Nucleo Board, MPU6050 6-DOF IMU, FTDI UART Bridge",
    techStack: ["C / C++", "STM32CubeIDE", "HAL Drivers", "Timers & Interrupts", "NanoEdge AI Studio", "Signal Processing"],
    highlights: [
      "Architected interrupt-driven data acquisition on STM32F411RE utilizing hardware timers, ADC, GPIO interrupts, and UART logging.",
      "Collected vibration & acceleration telemetry across 8 motion classes: normal/abnormal across runway taxi, takeoff, cruise flight, and landing.",
      "Deployed NanoEdge AI Studio on-device anomaly detection and classification directly inside STM32 SRAM/Flash constraints.",
      "Optimized power and execution cycles through non-blocking ring buffers and interrupt service routines."
    ],
    metrics: "Sub-millisecond inference time on ARM Cortex-M4; 8 distinct motion classes",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },

  bionic_prosthetic: {
    title: "Myoelectric Bionic Prosthetic Arm with Gesture Recognition",
    domain: "Biomedical / Robotics / Embedded Systems",
    badgeColor: "lavender",
    summary: "A functional bionic prosthetic-arm prototype controlled by user muscle activity — surface EMG signals are classified in real-time into gestures that actuate articulated servos.",
    whyItMatters: "Direct intersection of biomedical signal processing, machine learning, and multi-actuator mechanical kinematics to restore assistive functionality.",
    hardware: "MyoWare 2.0 EMG Sensors, Raspberry Pi / Arduino UNO, PCA9685 16-Channel PWM Driver, MG996R & SG90 Servos",
    techStack: ["Embedded C++", "Python", "Biomedical Signal Processing", "PCA9685 I2C", "Feature Extraction", "Supervised ML"],
    highlights: [
      "Acquired surface electromyography (sEMG) biosignals using MyoWare 2.0 electrodes placed over forearm muscle groups.",
      "Performed real-time filtering, envelope detection, and time-domain feature extraction.",
      "Achieved 97% recognition accuracy across 7 distinct hand gestures (fist, open palm, pinch, point, thumbs-up, wrist flex, extension).",
      "Drove multiple high-torque robotic finger actuators via PCA9685 PWM driver over I2C with smooth acceleration profiles."
    ],
    metrics: "97% gesture recognition accuracy across 7 hand gestures",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },

  diabetic_retinopathy: {
    title: "Explainable Attention-Based Ensemble for Diabetic Retinopathy Detection",
    domain: "Medical AI / Deep Learning / Explainable AI",
    badgeColor: "coral",
    summary: "Proposed deep learning framework for automated diabetic retinopathy detection and severity grading from retinal fundus images with attention-guided clinical explainability.",
    whyItMatters: "Combines cutting-edge attention mechanisms with multimodal clinical explainability (Grad-CAM), helping ophthalmologists verify AI diagnoses.",
    hardware: "High-performance GPU Compute (Google Colab / Local workstation)",
    techStack: ["PyTorch", "Vision Transformers", "CNNs", "Attention Mechanisms", "Grad-CAM", "Feature Fusion", "APTOS 2019 Dataset"],
    highlights: [
      "Engineered feature fusion ensemble combining convolutional backbones with spatial and channel attention mechanisms.",
      "Targets both binary screening (normal vs diseased) and fine-grained 5-class clinical severity grading.",
      "Built-in clinical explainability with Grad-CAM and attention map visualizations highlighting microaneurysms, hemorrhages, and hard exudates.",
      "Prior groundwork on APTOS 2019 dataset using 103 hand-crafted lesion, vascular, and texture features with XGBoost & SVM (~74% accuracy)."
    ],
    metrics: "Comprehensive 5-tier clinical severity classification with visual attention heatmaps",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },

  mars_sfs: {
    title: "Mars Digital Elevation Model (DEM) Generation via Shape-from-Shading",
    domain: "Computer Vision / Remote Sensing / Planetary Science",
    badgeColor: "yellow",
    summary: "Generating high-resolution Martian 3D digital elevation models from single orbital satellite images using physics-based photometric shape-from-shading (SfS).",
    whyItMatters: "Unites physics-based planetary reflectance modeling, numerical PDE optimization, and scientific planetary raster computing.",
    hardware: "Planetary Science Raster Workstation",
    techStack: ["Python", "NASA CTX / HiRISE", "Hapke & Lambertian Reflectance", "Plotly 3D", "Scientific Computing", "GDAL"],
    highlights: [
      "Processed raw NASA CTX orbital tiles (e.g., tile V22_088343_1747_XN_05S061W) and HiRISE high-resolution imagery.",
      "Implemented Shape-from-Shading utilizing both Lambertian and non-linear Hapke planetary photometric reflectance models.",
      "Developed iterative numerical refinement pipeline: brightness → surface slope → height integration → surface normals → predicted radiance.",
      "Rendered interactive 3D terrain mesh visualizations with Plotly, overcoming memory constraints on massive raster files."
    ],
    metrics: "Continuous 3D topography generation from single-image Martian satellite imagery",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },

  panoramic_stitching: {
    title: "Four-Camera Real-Time Panoramic Stitching on Raspberry Pi",
    domain: "Embedded Vision / Edge Streaming / Systems",
    badgeColor: "mint",
    summary: "Headless real-time panoramic stitching system running on a Raspberry Pi, streaming stitched multi-camera video over ZeroMQ and WebSockets to downstream depth estimation.",
    whyItMatters: "Demonstrates advanced multi-threaded video pipeline design, headless camera calibration, and low-latency IPC under strict SBC compute budgets.",
    hardware: "Raspberry Pi 4B, 3x USB (V4L2) Cameras + 1x CSI Camera (Picamera2)",
    techStack: ["Python", "FastAPI", "Uvicorn", "WebSockets", "ZeroMQ (port 5555)", "SIFT", "Remap Warping", "MiDaS Depth"],
    highlights: [
      "Synchronized 4 heterogeneous cameras (3 USB V4L2 + 1 CSI Picamera2) in an evolved multi-camera panoramic rig.",
      "Precomputed homography matrices using SIFT with disk persistence, feather alpha blending, and precomputed remap warping for maximum FPS.",
      "Broadcasted video frames via ZeroMQ PUB socket (port 5555) alongside a lightweight FastAPI WebSocket browser control interface.",
      "Integrated MiDaS monocular depth estimation pipeline with custom seam inpainting to handle irregular multi-lens border crops."
    ],
    metrics: "Real-time headless multi-camera stitching with zero-copy local IPC streaming",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },

  stereo_depth: {
    title: "Stereo Depth Mapping Pipeline with Disparity Filtering",
    domain: "Computer Vision / 3D Reconstruction",
    badgeColor: "sky",
    summary: "Stereo camera depth estimation utilizing StereoSGBM with Weighted Least Squares (WLS) filtering for clean, metric disparity and depth point clouds.",
    whyItMatters: "Solid foundation in epipolar geometry, stereo rectification, calibration matrices, and sub-pixel disparity matching.",
    hardware: "Synchronized Dual Camera Baseline Rig",
    techStack: ["Python", "OpenCV", "StereoSGBM", "WLS Fast Global Smoother", "Camera Calibration", "Epipolar Geometry"],
    highlights: [
      "Calibrated baseline cameras using chessboard calibration with epipolar validation and rectification matrices.",
      "Implemented StereoSGBM with fine-tuned block size, disparity search range, and uniqueness ratios.",
      "Integrated WLS (Weighted Least Squares) filtering to eradicate disparity noise and edge bleeding.",
      "Generated false-color colourized depth maps and point cloud exports."
    ],
    metrics: "Crisp disparity boundaries with sub-pixel depth resolution",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },

  monocular_depth: {
    title: "Monocular Depth Estimation & 3D Point Cloud Lifting",
    domain: "3D Vision / Deep Learning / Digital Twins",
    badgeColor: "lavender",
    summary: "Recovering dense depth from monocular video feeds using MiDaS and lifting 2D frames into dense 3D point clouds. Exploring VGGT feed-forward 3D reconstruction and SAM point-cloud segmentation.",
    whyItMatters: "Directly powers current monocular digital-twin research at IIT Jodhpur, turning regular smartphones/single cameras into 3D spatial models.",
    hardware: "Edge SBCs & CUDA GPU Accelerators",
    techStack: ["MiDaS", "VGGT (CVPR 2025)", "Segment Anything (SAM)", "Open3D", "PyTorch", "Point Cloud Segmentation"],
    highlights: [
      "Inferred relative depth maps from continuous monocular video and reprojected into metric 3D point cloud coordinate frames.",
      "Explored VGGT (Visual Geometry Grounded Transformer) on custom indoor room datasets.",
      "Integrated Segment Anything (SAM) for zero-shot semantic segmentation over 3D point clouds.",
      "Applied to ongoing 3D digital-twin R&D project at IIT Jodhpur."
    ],
    metrics: "Dense zero-shot point cloud generation from single RGB cameras",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },

  sand_grain: {
    title: "Sand Grain Size Measurement & Spatial Mapping",
    domain: "Computer Vision / Metrology / Image Processing",
    badgeColor: "yellow",
    summary: "Automated micro-granulometry system measuring granular particles from macro images with real-world physical calibration via QR-code reference markers.",
    whyItMatters: "Solves physical metrology challenges by bridging pixel coordinates with real-world millimeters through optical fiducials.",
    hardware: "Optical Macro Camera Rig, Reference Calibration Targets",
    techStack: ["Python", "OpenCV", "Fiducial QR Scaling", "Morphological Filtering", "Contour Analysis", "Statistical Distribution"],
    highlights: [
      "Developed an automated pipeline using QR-code fiducial reference markers to calculate instantaneous pixel-to-millimeter scale factors.",
      "Applied adaptive thresholding and watershed segmentation to isolate individual overlapping sand grains.",
      "Extracted morphological parameters (Feret diameter, aspect ratio, circularity, sieve size distribution curves).",
      "Generated spatial granulometry heatmaps for geotechnical and material quality control."
    ],
    metrics: "Micron-level grain distribution mapping with automatic scale calibration",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },

  qr_augmentation: {
    title: "Robust QR Code Augmentation Pipeline for Machine Vision",
    domain: "Computer Vision / Synthetic Data / Robustness",
    badgeColor: "mint",
    summary: "Synthetic dataset generation pipeline applying realistic physical, optical, and environmental distortions to QR barcodes while mathematically guaranteeing finder-pattern decodability.",
    whyItMatters: "Crucial for training robust industrial barcode readers that survive harsh lighting, scratches, and perspective skew in logistics hubs.",
    hardware: "Standard Workstation",
    techStack: ["Python", "NumPy", "OpenCV", "Synthetic Image Generation", "Adaptive Kernel Scaling"],
    highlights: [
      "Simulated real-world degradation: motion blur, glare, sensor noise, perspective affine shearing, and partial occlusion.",
      "Implemented module-size-adaptive kernel scaling to preserve finder-pattern geometrical integrity during intense distortion.",
      "Built batch data generator feeding tens of thousands of augmented barcodes into computer vision training pipelines."
    ],
    metrics: "10,000+ synthetic augmented test samples generated with verified finder patterns",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },

  supporting_projects: {
    title: "Hardware & Systems Engineering Highlights",
    domain: "Embedded Systems / Network Security / Electronics",
    badgeColor: "sky",
    summary: "A curated trio of focused engineering solutions spanning pure pixel analysis, network security simulation, and bare-metal STM32 sensor HAL drivers.",
    whyItMatters: "Demonstrates versatility across algorithmic edge cases (OCR without neural networks) and low-level I2C/SPI embedded protocols.",
    hardware: "STM32 Nucleo, BH1750FVI Ambient Light, HTU21D Temp/Humidity, MPU6050",
    techStack: ["C / STM32 HAL", "Python", "FastAPI", "Cisco Packet Tracer", "Otsu Thresholding"],
    highlights: [
      "7-Segment LED Display Reader: Zero-dependency pixel analysis without heavy OCR libraries using Otsu thresholding, projection-profile digit localization, and a lookup-table state classifier.",
      "Cold-Storage Intrusion Detection System (IDS): Simulated secure warehouse environment in Cisco Packet Tracer interconnected with a custom Python FastAPI telemetry server.",
      "Embedded Sensor Study Series: Author of bare-metal HAL implementation guides and register maps for STM32 with BH1750FVI, HTU21D, and MPU6050 sensors."
    ],
    metrics: "3 standalone embedded & networking implementations",
    githubLink: "https://github.com/janhavi-pohnerkar"
  }
};

/* --------------------------------------------------------------------------
   6. Project Filtering System
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterChips = document.querySelectorAll('.filter-chip');
  const projectCards = document.querySelectorAll('.project-item');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterValue = chip.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || cardCategories.includes(filterValue)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. Project Detail Modal System
   -------------------------------------------------------------------------- */
function initProjectModal() {
  const modalOverlay = document.getElementById('project-modal-overlay');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const detailBtns = document.querySelectorAll('.view-project-detail');

  if (!modalOverlay) return;

  function openModal(projectId) {
    const data = PROJECTS_DATA[projectId];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-domain').textContent = data.domain;
    document.getElementById('modal-summary').textContent = data.summary;
    document.getElementById('modal-why').textContent = data.whyItMatters;
    document.getElementById('modal-hardware').textContent = data.hardware;
    document.getElementById('modal-metric').textContent = data.metrics;

    // Tech Tags
    const tagsContainer = document.getElementById('modal-tech-tags');
    tagsContainer.innerHTML = '';
    data.techStack.forEach(tech => {
      const tagPill = document.createElement('span');
      tagPill.className = 'badge-pill badge-yellow';
      tagPill.textContent = tech;
      tagsContainer.appendChild(tagPill);
    });

    // Highlights Bullets
    const highlightsContainer = document.getElementById('modal-highlights');
    highlightsContainer.innerHTML = '';
    data.highlights.forEach(item => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-2 text-slate-700 text-sm leading-relaxed';
      li.innerHTML = `<span class="text-amber-500 font-bold text-base leading-none mt-0.5">✦</span> <span>${item}</span>`;
      highlightsContainer.appendChild(li);
    });

    // Modal GitHub Button
    const modalGithubBtn = document.getElementById('modal-github-link');
    if (modalGithubBtn) {
      modalGithubBtn.href = data.githubLink;
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project');
      openModal(id);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   8. Contact Form Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const successBox = document.getElementById('contact-form-success');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;
    const message = form.querySelector('[name="message"]').value;

    if (!name || !email || !message) {
      showToast("⚠️ Please fill in all required fields!");
      return;
    }

    // Cheerful Feedback
    if (successBox) {
      successBox.classList.remove('hidden');
    }
    form.reset();

    // Trigger celebratory confetti
    triggerCheerConfetti(e);
    showToast("💌 Message prepared! Looking forward to connecting!");
  });
}

/* --------------------------------------------------------------------------
   9. Copy Email & Toast Notifications
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('portfolio-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'portfolio-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function initCopyEmail() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  const emailToCopy = "janhavi.pohnerkar@gmail.com";

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      navigator.clipboard.writeText(emailToCopy).then(() => {
        showToast("Copied janhavi.pohnerkar@gmail.com to clipboard! 📬");
        triggerCheerConfetti(e);
      }).catch(() => {
        showToast("Email: janhavi.pohnerkar@gmail.com");
      });
    });
  });
}

/* --------------------------------------------------------------------------
   10. Mobile Menu Navigation
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const menu = document.getElementById('mobile-nav-menu');
  const navLinks = document.querySelectorAll('.mobile-link');

  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    const isHidden = menu.classList.contains('hidden');
    if (isHidden) {
      menu.classList.remove('hidden');
    } else {
      menu.classList.add('hidden');
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

/* --------------------------------------------------------------------------
   11. Scroll Spy & Navbar Highlight
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-amber-600', 'font-bold');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('text-amber-600', 'font-bold');
          }
        });
      }
    });
  });
}
