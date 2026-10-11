/* ==========================================================================
   Janhavi's 3D World - Bruno Simon Minimal Clay Environment
   Featuring:
   - "SIMPLIFIED NEUTRAL ADVENTURER - GIRL" Character
     * Black hair & black swept-back ponytail
     * Green and brown dress (green tunic with brown trim & inner shirt)
     * Olive shorts & backpack with rolled sleeping mat
     * Wooden hiking walking stick in hand
     * Sturdy hiking boots
     * Responsive brisk walking speed & smooth procedural gait
   - Road lying strictly PARALLEL to the ground (Flat horizontal ribbon)
   - Big 3D Extruded White Sculpture: "JANHAVI"
   - 7 Stylized Architectural Milestone Buildings along the road
   - Small minimal on-screen popups when buildings are clicked or approached
   - Scattered low-poly trees and white chalk rocks
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initBrunoWorld();
});

/* --------------------------------------------------------------------------
   1. MILESTONES DATA
   -------------------------------------------------------------------------- */
const MILESTONES_DATA = [
  {
    id: "schooling",
    step: 1,
    title: "Schooling at PSBA English School",
    location: "Aurangabad, Maharashtra",
    period: "Foundation Years",
    summary: "Completed schooling from PSBA English School, Aurangabad with strong fundamentals in mathematics, physics, and an early passion for technology and robotics.",
    skills: ["Mathematics", "Physics", "Analytical Thinking", "Early Robotics"],
    bannerTitle: "PSBA ACADEMY",
    bannerSubtitle: "Foundation & Science",
    bannerBg: "#EE4B3B",
    details: {
      category: "Education & Roots",
      tagline: "Laying the Mathematical & Scientific Foundations",
      highlight: "Excellence in STEM fundamentals and science fairs",
      description: "Nurtured curiosity for building things from an early age in Aurangabad. Built solid analytical problem-solving skills, participated in physics exhibitions, and discovered an enduring passion for electronics, computers, and mechanical robotics.",
      achievements: [
        "Consistent academic excellence in Mathematics and Natural Sciences",
        "Participated in regional Science and Technology fairs",
        "Discovered foundational interest in programming & embedded engineering"
      ]
    }
  },
  {
    id: "engineering",
    step: 2,
    title: "Engineering at MITAOE",
    location: "MIT Academy of Engineering, Pune",
    period: "Class of 2027",
    summary: "Commenced B.Tech in Electronics & Telecommunication Engineering. Maintained 8.41/10 CGPA while mastering embedded systems and digital signal processing.",
    skills: ["Circuit Theory", "Digital Signals", "8.41 CGPA", "Embedded C"],
    bannerTitle: "MITAOE CAMPUS",
    bannerSubtitle: "B.Tech ENTC • 8.41 CGPA",
    bannerBg: "#3B82F6",
    details: {
      category: "Undergraduate Studies",
      tagline: "Electronics & Telecommunication Engineering",
      highlight: "8.41 / 10.0 CGPA • Core Engineering Distinction",
      description: "Undergraduate degree focusing on hardware-software co-design, microcontrollers, signal processing, and robotics. Built hands-on lab prototypes and bridged theoretical communications with applied computing.",
      achievements: [
        "Maintained strong academic record with 8.41 CGPA across core semesters",
        "Mastered digital communication, microprocessors, and control theory",
        "Led project teams in department hackathons and technical symposiums"
      ]
    }
  },
  {
    id: "year1",
    step: 3,
    title: "1st Year — Exploration & Prototyping",
    location: "MITAOE Labs",
    period: "First Year B.Tech",
    summary: "Explored diverse engineering domains including 3D CAD design, Arduino microcontrollers, and Raspberry Pi. Participated in competitions and extracurriculars.",
    skills: ["3D CAD Design", "Arduino", "Raspberry Pi", "Hackathons"],
    bannerTitle: "MAKER LAB 01",
    bannerSubtitle: "CAD & Rapid Prototyping",
    bannerBg: "#D97706",
    details: {
      category: "Hands-on Innovation",
      tagline: "Rapid Prototyping & Sensor Systems",
      highlight: "Autonomous bots, CAD enclosures & IoT systems",
      description: "First year was dedicated to active exploration: designed mechanical parts in CAD, programmed microcontrollers, wired sensor arrays, and competed in hackathons building smart automation gizmos.",
      achievements: [
        "Designed 3D-printable chassis and mechanical assemblies in CAD",
        "Programmed Arduino & Raspberry Pi sensor telemetry and automation kits",
        "Competed in university-level innovation and robotics hackathons"
      ]
    }
  },
  {
    id: "year2",
    step: 4,
    title: "Second Year — Coppercloud Internship",
    location: "Coppercloud Solutions, Pune",
    period: "Summer Internship",
    summary: "Summer internship at Coppercloud diving into VLSI fundamentals, embedded firmware, and computer vision algorithms for industrial automation.",
    skills: ["Coppercloud Intern", "VLSI", "Embedded Systems", "Computer Vision"],
    bannerTitle: "COPPERCLOUD HQ",
    bannerSubtitle: "Embedded & Edge Vision",
    bannerBg: "#0284C7",
    details: {
      category: "Industrial R&D Internship",
      tagline: "Embedded Firmware & Vision Systems",
      highlight: "Bridging embedded silicon with industrial computer vision",
      description: "Worked directly on industry-grade embedded pipelines, learning low-level device communication, digital logic, and camera sensor integration for fast image acquisition in smart manufacturing environments.",
      achievements: [
        "Hands-on development with industrial camera interfaces and edge processors",
        "Integrated VLSI and firmware architectures for real-time sensor processing",
        "Laid the technical groundwork for textile inspection and defect AI"
      ]
    }
  },
  {
    id: "year3",
    step: 5,
    title: "Third Year — Coppercloud R&D & DIPlib Paper",
    location: "Coppercloud R&D",
    period: "Third Year B.Tech",
    summary: "Continued as R&D Intern at Coppercloud — engineered factory-deployed zari textile defect detection (~300 µm accuracy), QR recognition on thermocol, and published a research paper on DIPlib.",
    skills: ["Zari Defect Detection", "QR on Thermocol", "DIPlib Paper", "Deployed AI"],
    bannerTitle: "FACTORY AI LAB",
    bannerSubtitle: "DIPlib Paper • Defect AI",
    bannerBg: "#059669",
    details: {
      category: "Published Research & Industrial AI",
      tagline: "Sub-Millimeter Industrial Vision & Defect Recognition",
      highlight: "Published Research Paper on DIPlib • Factory deployed",
      description: "Engineered robust production algorithms deployed on active factory assembly lines. Solved difficult optical challenges including high-speed zari thread defect inspection (accuracy ~300 micrometers) and damaged QR identification on porous thermocol surfaces.",
      achievements: [
        "Published research paper on DIPlib-accelerated image analysis pipelines",
        "Deployed real-time zari thread defect detection with ~300 µm precision",
        "Designed fault-tolerant QR recognition pipeline for rough thermocol packaging"
      ]
    }
  },
  {
    id: "year4",
    step: 6,
    title: "Fourth Year — Clarity Lab, IIT Jodhpur",
    location: "Clarity Lab, IIT Jodhpur",
    period: "Summer Research",
    summary: "Summer intern at Clarity Lab, IIT Jodhpur — engineered real-time 360-degree panoramic video stitching and embedded visual SLAM systems on resource-constrained edge hardware. Explored Jodhpur.",
    skills: ["Clarity Lab IITJ", "360° Panoramas", "Visual SLAM on Edge", "ORB-SLAM3"],
    bannerTitle: "CLARITY LAB IITJ",
    bannerSubtitle: "360° Panoramic SLAM",
    bannerBg: "#C2410C",
    details: {
      category: "Premier Research Internship",
      tagline: "Panoramic Computer Vision & Spatial Mapping",
      highlight: "Real-time 360° video stitching & Edge SLAM",
      description: "Conducted high-impact spatial AI research at Clarity Lab, IIT Jodhpur. Developed end-to-end edge-optimized pipelines for multi-camera 360-degree cylindrical and equirectangular stitching, integrated with simultaneous localization and mapping (SLAM).",
      achievements: [
        "Implemented real-time 360° panoramic multi-stream video stitching",
        "Benchmarked and optimized Visual SLAM (ORB-SLAM3) on embedded edge compute",
        "Formulated spatial tracking methods under dynamic environmental constraints"
      ]
    }
  },
  {
    id: "current",
    step: 7,
    title: "Current — Research Intern at IIT Jodhpur",
    location: "IIT Jodhpur",
    period: "Ongoing Research",
    summary: "Research intern at IIT Jodhpur — currently spearheading research in 3D point cloud generation and spatial digital twins directly from monocular video streams.",
    skills: ["Point Cloud Digital Twins", "Monocular Video 3D", "VGGT Reconstruction", "SAM 3D"],
    bannerTitle: "DIGITAL TWIN LAB",
    bannerSubtitle: "Monocular 3D Point Clouds",
    bannerBg: "#7C3AED",
    details: {
      category: "Frontier 3D Spatial Research",
      tagline: "Neural 3D Reconstruction & Spatial Digital Twins",
      highlight: "Dense point clouds from single-camera video streams",
      description: "Spearheading cutting-edge spatial computing research at IIT Jodhpur. Transforming uncalibrated monocular camera videos into dense, metrically coherent 3D point cloud digital twins using modern geometric priors, VGGT, and neural spatial representations.",
      achievements: [
        "Developing end-to-end pipelines from monocular video to interactive 3D digital twins",
        "Researching feature-correspondence, pose estimation, and neural spatial representations",
        "Creating real-world interactive 3D asset reconstructions for robotics & simulation"
      ]
    }
  }
];

/* --------------------------------------------------------------------------
   2. WORLD ENGINE GLOBALS
   -------------------------------------------------------------------------- */
let scene, camera, renderer;
let characterGroup, characterBody, characterHead, ponytailMesh;
let leftLegPivot, rightLegPivot, leftArmPivot, rightArmPivot, walkingStickMesh;
let buildingMeshes = [];
let townBuildingMeshes = [];
let roadPoints = [];
let roadCurve = null;
let roadLength = 0;
let activePopupId = null;
let milestoneThresholds = [];
const milestoneVisited = new Set();
let projectThresholds = [];
const projectVisited = new Set();
let cloudGroups = [];
let worldAnimals = [];
let billboardArrows = [];

/* --------------------------------------------------------------------------
   PROJECT BUILDINGS IN THE SURROUNDING TOWN (WITH LOGO BANNERS)
   -------------------------------------------------------------------------- */
const PROJECT_BUILDINGS_DATA = [
  {
    id: "proj_slam",
    title: "ORB-SLAM3 on Raspberry Pi 4B + CNN Loop Closing",
    badge: "STEREO SLAM",
    icon: "🌐",
    logoPath: "assets/01_orb_slam3.png",
    themeColor: "#2563EB",
    pos: { x: -30, z: -370 },
    rot: 0.45,
    roofType: "dome",
    wallColor: 0xEDE9FE,
    roofColor: 0x2563EB,
    fenceType: "circuit",
    skills: ["ORB-SLAM3", "Raspberry Pi 4B", "Stereo-Inertial", "ARM Optimization", "ONNX Runtime", "CNN Loop Closure"],
    details: {
      category: "Embedded Spatial AI & Robotics",
      tagline: "Stereo and Stereo-Inertial SLAM with Neural Loop Closing on ARM",
      highlight: "Real-time edge visual odometry optimized with ONNX Runtime on Cortex-A72",
      description: "Engineered and deployed an edge stereo-inertial SLAM pipeline on Raspberry Pi 4B. Integrated CNN-based visual place recognition and loop closure verification using ONNX Runtime, delivering metric loop corrections without drifting over long trajectories.",
      achievements: [
        "Ported and optimized ORB-SLAM3 algorithms on Raspberry Pi 4B with ARM NEON acceleration",
        "Implemented CNN-based deep loop-closing verification running via ONNX Runtime",
        "Benchmarked stereo and stereo-inertial sensor pipelines under dynamic lighting constraints"
      ]
    }
  },
  {
    id: "proj_turbulence",
    title: "STM32 Aircraft Turbulence Detection",
    badge: "AERO SENSING",
    icon: "✈️",
    logoPath: "assets/02_stm32_turbulence.png",
    themeColor: "#0284C7",
    pos: { x: -38, z: -410 },
    rot: 0.35,
    roofType: "flat_tech",
    wallColor: 0xE0F2FE,
    roofColor: 0x0284C7,
    fenceType: "circuit",
    skills: ["STM32", "MPU6050 IMU", "Interrupt Acquisition", "NanoEdge AI", "Embedded C", "Real-Time Telemetry"],
    details: {
      category: "Avionics & Embedded Edge AI",
      tagline: "Microcontroller In-Flight Turbulence Detection using NanoEdge AI",
      highlight: "Interrupt-driven 6-DoF inertial acquisition with millisecond anomaly scoring",
      description: "Developed an embedded avionics sensing node for aircraft turbulence characterization. Powered by an STM32 microcontroller and MPU6050 6-axis IMU with interrupt-driven telemetry and onboard NanoEdge AI anomaly classification models.",
      achievements: [
        "Configured high-frequency interrupt-driven DMA telemetry acquisition for MPU6050",
        "Trained and deployed NanoEdge AI machine learning models directly on microcontroller flash",
        "Classified clear-air turbulence vs aerodynamic vibration patterns with high reliability"
      ]
    }
  },
  {
    id: "proj_mars_dem",
    title: "Mars DEM Generation using Shape-from-Shading",
    badge: "MARS DEM",
    icon: "🪐",
    logoPath: "assets/03_mars_dem.png",
    themeColor: "#C2410C",
    pos: { x: 10, z: -450 },
    rot: -0.35,
    roofType: "pitched",
    wallColor: 0xFFEDD5,
    roofColor: 0xC2410C,
    fenceType: "wireframe",
    skills: ["Shape-from-Shading", "CTX / HiRISE Imagery", "Lambertian Reflectance", "Hapke Model", "Planetary Photometry", "3D Elevation Maps"],
    details: {
      category: "Planetary Remote Sensing & Photometry",
      tagline: "High-Resolution Martian Elevation Models from Monocular Satellite Imagery",
      highlight: "Hapke photometric inversion resolving sub-meter crater topography",
      description: "Pioneered photometric stereo and Shape-from-Shading (SfS) reconstruction algorithms for CTX and HiRISE Martian orbital datasets. Applied both Lambertian and complex Hapke photometric reflectance models to reconstruct digital elevation models (DEMs).",
      achievements: [
        "Processed high-resolution NASA CTX and HiRISE imagery for crater basin mapping",
        "Formulated nonlinear Hapke photometric model inversions accounting for atmospheric haze",
        "Generated dense 3D elevation topographies exceeding traditional stereo-pair coverage"
      ]
    }
  },
  {
    id: "proj_retinopathy",
    title: "Explainable Attention Ensemble for Diabetic Retinopathy",
    badge: "MEDICAL AI",
    icon: "👁️",
    logoPath: "assets/04_diabetic_retinopathy_ai.png",
    themeColor: "#E11D48",
    pos: { x: 34, z: -490 },
    rot: -0.4,
    roofType: "pitched",
    wallColor: 0xFFE4E6,
    roofColor: 0xE11D48,
    fenceType: "wooden",
    skills: ["Medical Imaging", "Attention Mechanisms", "Feature Fusion", "Explainable AI", "Severity Grading", "PyTorch"],
    details: {
      category: "Healthcare AI & Computer Vision",
      tagline: "Multi-Stage Detection & Severity Grading with Clinically Interpretable Heatmaps",
      highlight: "Spatial attention ensemble achieving clinical-grade lesion sensitivity",
      description: "Designed a multi-branch deep learning ensemble with explainable spatial attention mechanisms for early diabetic retinopathy detection and severity staging from fundus photography.",
      achievements: [
        "Implemented multi-scale feature fusion layers across diverse neural architectures",
        "Achieved high diagnostic accuracy across 5 distinct clinical severity grades",
        "Integrated Grad-CAM and self-attention saliency maps for clinical interpretability"
      ]
    }
  },
  {
    id: "proj_textile",
    title: "Textile / Metal-Plated Thread Defect Detection",
    badge: "THREAD DEFECT",
    icon: "🧵",
    logoPath: "assets/05_textile_defect_detection.png",
    themeColor: "#059669",
    pos: { x: 42, z: -530 },
    rot: -0.45,
    roofType: "solar_cottage",
    wallColor: 0xDCFCE7,
    roofColor: 0x059669,
    fenceType: "circuit",
    skills: ["CIELab / CLAHE", "Random Forest (~94%)", "Flask", "MQTT", "Edge Machine Vision", "Industrial IoT"],
    details: {
      category: "Industrial Quality Automation",
      tagline: "Real-Time Metal Thread Inspection System with ~94% Accuracy",
      highlight: "Sub-millimeter flaw classification running via Flask and MQTT streams",
      description: "Built an automated optical inspection pipeline for conductive metal-plated threads. Utilizes CIELab color space transformation and Contrast Limited Adaptive Histogram Equalization (CLAHE) feeding an optimized Random Forest classifier (~94% test accuracy).",
      achievements: [
        "Constructed robust color-invariant edge filters resilient to specular metallic reflections",
        "Achieved ~94% test classification accuracy on microscopic coating discontinuities",
        "Integrated Flask web dashboard and MQTT messaging for real-time factory floor alerts"
      ]
    }
  },
  {
    id: "proj_bionic_arm",
    title: "Myoelectric Bionic Prosthetic Arm",
    badge: "BIONIC ARM",
    icon: "🦾",
    logoPath: "assets/06_bionic_prosthetic_arm.png",
    themeColor: "#7C3AED",
    pos: { x: -32, z: -590 },
    rot: 0.38,
    roofType: "gear_lab",
    wallColor: 0xF3E8FF,
    roofColor: 0x7C3AED,
    fenceType: "circuit",
    skills: ["MyoWare EMG", "PCA9685 PWM", "Arduino", "Raspberry Pi", "3D Printing & Biomechatronics", "Prosthetic Control"],
    details: {
      category: "Biomechatronics & Assistive Technology",
      tagline: "EMG-Controlled Multi-Grip Bionic Hand with Multi-Channel Actuation",
      highlight: "Real-time surface electromyography decoding with proportional grip actuation",
      description: "Engineered a low-cost, high-dexterity myoelectric bionic arm prosthetic. Captures surface muscle potentials using MyoWare EMG sensors, processed in real-time through Arduino and Raspberry Pi to actuate multiple fingers via PCA9685 I2C servo drivers.",
      achievements: [
        "Calibrated adaptive thresholding and pattern recognition for varied user muscle profiles",
        "Controlled multi-degree-of-freedom tendon cables with 16-channel PCA9685 PWM drivers",
        "Designed lightweight, ergonomically articulated 3D printed mechanical finger assemblies"
      ]
    }
  },
  {
    id: "proj_depth_3d",
    title: "Monocular Depth Estimation & 3D Point Clouds",
    badge: "3D POINT CLOUD",
    icon: "🧊",
    logoPath: "assets/07_monocular_depth_point_cloud.png",
    themeColor: "#4F46E5",
    pos: { x: -36, z: -645 },
    rot: 0.42,
    roofType: "wireframe_frame",
    wallColor: 0xEEF2FF,
    roofColor: 0x4F46E5,
    fenceType: "wireframe",
    skills: ["MiDaS", "Dense Point Clouds", "Camera Intrinsic Calibration", "Open3D", "PCL", "Depth Disparity"],
    details: {
      category: "Spatial AI & 3D Reconstruction",
      tagline: "Dense Metric 3D Point Cloud Generation from Single RGB Images",
      highlight: "Zero-shot transformer depth estimation with camera intrinsic reprojection",
      description: "Constructed an automated 3D spatial reconstruction pipeline taking uncalibrated monocular photos and generating dense, metrically colored 3D point cloud assets using deep transformer depth networks (MiDaS) and pinhole projection matrices.",
      achievements: [
        "Inferred relative depth disparities and normalized metric spatial scale from single images",
        "Formulated back-projection geometry transforming 2D pixels into dense 3D colored point clouds",
        "Exported industry-standard PLY/PCD formats for CAD, robotics, and interactive Three.js scenes"
      ]
    }
  },
  {
    id: "proj_sand_grain",
    title: "Sand Grain Size Measurement & Mapping",
    badge: "SAND GRAIN",
    icon: "🏖️",
    logoPath: "assets/05_textile_defect_detection.png",
    themeColor: "#D97706",
    pos: { x: 30, z: -700 },
    rot: -0.36,
    roofType: "pitched",
    wallColor: 0xFEF3C7,
    roofColor: 0xD97706,
    fenceType: "wooden",
    skills: ["QR Scale Calibration", "Granulometry", "Morphological Segmentation", "Automated Particle Mapping", "OpenCV", "Geospatial Data"],
    details: {
      category: "Computer Vision & Granulometry",
      tagline: "Automated Granulometric Sizing with QR-Based Metric Scale Calibration",
      highlight: "In-situ field particle measurement with sub-millimeter precision",
      description: "Engineered an in-situ optical particle sizing system for geotechnical and environmental sand samples. Uses fiducial QR code scale markers to establish real-world pixel-to-millimeter ratios, paired with watershed morphological segmentation.",
      achievements: [
        "Implemented automatic QR code detection and perspective rectification for exact metric scale",
        "Segmented thousands of overlapping sand grains using adaptive watershed algorithms",
        "Generated granulometric size distribution curves (D10, D50, D90) and geospatial variance maps"
      ]
    }
  },
  {
    id: "proj_multi_cam",
    title: "Raspberry Pi Multi-Camera Stitching & Streaming",
    badge: "360° STREAM",
    icon: "📹",
    logoPath: "assets/08_multi_camera_stitching.png",
    themeColor: "#0891B2",
    pos: { x: 32, z: -750 },
    rot: -0.4,
    roofType: "flat_tech",
    wallColor: 0xECFEFF,
    roofColor: 0x0891B2,
    fenceType: "circuit",
    skills: ["3- & 4-Camera RPi Setup", "ZMQ Messaging", "FastAPI Streaming", "Real-Time Panorama", "Hardware H.264", "Multi-Threaded Video"],
    details: {
      category: "Multi-Sensor Video Streaming",
      tagline: "Synchronized 3- and 4-Camera Panoramic Stitching & Low-Latency Streaming",
      highlight: "ZeroMQ socket distribution and FastAPI live panoramic web streaming",
      description: "Built an embedded panoramic imaging system linking 3 and 4 synchronized Raspberry Pi camera modules. Features low-latency image acquisition, homography-based cylindrical image stitching, and ZeroMQ transport feeding high-throughput FastAPI streaming services.",
      achievements: [
        "Configured multi-camera hardware trigger synchronization on Raspberry Pi boards",
        "Optimized cylindrical projection and seam blending for 360° panoramic output",
        "Streamed ultra-low-latency stitched video over ZeroMQ pipelines to web clients via FastAPI"
      ]
    }
  }
];

// Character State & Movement (Automatic Path Following!)
const charState = {
  progress: 0,            // 0.0 to 1.0 along the road path
  lateralOffset: 0,       // -1.8 to +1.8 across road lane
  x: 0,
  z: 0,
  rotation: Math.PI,      // Automatically driven by road tangent
  speed: 0,
  maxWalkSpeed: 14.0,     // Snappy, brisk walking speed (world units / sec)
  maxBackSpeed: -8.0,     // Reverse speed
  accel: 28.0,            // Fast response acceleration
  friction: 0.85,
  turnSpeed: 0.072,
  walkCycle: 0,
  isWalking: false
};

const input = {
  forward: false,
  backward: false,
  left: false,
  right: false
};

/* --------------------------------------------------------------------------
   3. THREE.JS INITIALIZATION
   -------------------------------------------------------------------------- */
function initBrunoWorld() {
  const container = document.getElementById('world-viewport');
  const canvas = document.getElementById('world-canvas');
  if (!container || !canvas || typeof THREE === 'undefined') return;

  // Scene & Atmosphere: Cheerful Sky Blue Sky with Gentle Distance Fog
  scene = new THREE.Scene();
  const skyColor = new THREE.Color(0x7EC8E3); // Cheerful, vibrant yet gentle sky blue
  scene.background = skyColor;
  scene.fog = new THREE.FogExp2(0x89D2EC, 0.0018); // Soft distant atmospheric fog

  // Camera: Isometric Cinematic Perspective (Zoomed out with lowered elevation for clear billboard visibility)
  const aspect = container.clientWidth / container.clientHeight;
  camera = new THREE.PerspectiveCamera(44, aspect, 0.5, 1400);
  camera.position.set(-18, 13.5, 22);

  // Renderer with Soft Shadows
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Cheerful Natural Sunlight & Sky/Ground Bounce
  const ambientLight = new THREE.AmbientLight(0xFFF9EE, 1.05); // Warm glowing sunlight ambient
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0x7EC8E3, 0x9E5630, 0.85); // Sky blue to rich warm muddy ground bounce
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xFFF7E6, 1.55); // Golden sunny directional light
  sunLight.position.set(-45, 75, 40);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.camera.near = 10;
  sunLight.shadow.camera.far = 350;
  const shadowD = 65;
  sunLight.shadow.camera.left = -shadowD;
  sunLight.shadow.camera.right = shadowD;
  sunLight.shadow.camera.top = shadowD;
  sunLight.shadow.camera.bottom = -shadowD;
  sunLight.shadow.bias = -0.0005;
  scene.add(sunLight);

  // 1. Dual-Tone Terrain: Warm Terracotta Earth for Journey, Sleek Tech Indigo for Projects Boulevard
  // 1A. Milestone Section Ground (Warm Muddy Terracotta Earth: z = +200 to -325)
  const milestoneGroundGeo = new THREE.PlaneGeometry(1600, 580);
  milestoneGroundGeo.rotateX(-Math.PI / 2);
  const milestoneGroundMat = new THREE.MeshStandardMaterial({
    color: 0x9E5630, // Rich warm muddy earth terracotta / clay soil
    roughness: 0.90,
    metalness: 0.0
  });
  const milestoneGround = new THREE.Mesh(milestoneGroundGeo, milestoneGroundMat);
  milestoneGround.position.set(0, -0.01, -40);
  milestoneGround.receiveShadow = true;
  scene.add(milestoneGround);

  // 1B. Project Showcase Boulevard Ground (Deep Tech Slate / Electric Cobalt Earth: z = -325 to -950)
  const projectGroundGeo = new THREE.PlaneGeometry(1600, 650);
  projectGroundGeo.rotateX(-Math.PI / 2);
  const projectGroundMat = new THREE.MeshStandardMaterial({
    color: 0x1E293B, // Deep tech slate / midnight navy foundation
    roughness: 0.85,
    metalness: 0.1
  });
  const projectGround = new THREE.Mesh(projectGroundGeo, projectGroundMat);
  projectGround.position.set(0, 0, -640);
  projectGround.receiveShadow = true;
  scene.add(projectGround);

  // 1C. Tech Boulevard Transition Carpet / Apron at Archway (z = -325)
  const apronGeo = new THREE.BoxGeometry(26, 0.04, 22);
  const apronMat = new THREE.MeshStandardMaterial({
    color: 0x0F172A,
    roughness: 0.7
  });
  const apron = new THREE.Mesh(apronGeo, apronMat);
  apron.position.set(0, 0.01, -325);
  apron.receiveShadow = true;
  scene.add(apron);

  // 2. Build 3D Extruded Text "JANHAVI" at Spawn
  buildBigSculpturalText();

  // 3. Build Road Network (Strictly PARALLEL to the ground!)
  buildClayRoad();

  // 4. Build 7 Milestone Buildings along the Road
  buildMilestoneBuildings();

  // 4B. Build Grand Gateway Archway ("MY PROJECTS" Entrance Portal at z = -286)
  buildProjectsWelcomeArchway();

  // 5. Build Scattered Low-Poly Trees and White Chalk Rocks
  buildFoliageAndRocks();

  // 6. Build the Adventurer Girl Character (Black hair, green & brown dress!)
  buildAdventurerCharacter();

  // 7. Build Fluffy Low-Poly Sky Clouds drifting peacefully overhead
  buildSkyClouds();

  // 8. Build Directional Scenic Biomes: Dreamy Horizon Hills (North), Dense Forest (West), and Ponds & Lakes (East)
  buildScenicBiomes();

  // 9. Build Animated Wildlife: Hopping Rabbits, Grazing Deer, and Swimming Ducks
  buildAnimatedWildlife();

  // 10. Setup Controls & Raycasting
  setupWorldControls(container);

  // 11. OrbitControls — enabled when character is idle for free camera panning
  if (typeof THREE.OrbitControls !== 'undefined') {
    window.orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    window.orbitControls.enableDamping = true;
    window.orbitControls.dampingFactor = 0.08;
    window.orbitControls.enableZoom = true;
    window.orbitControls.enablePan = true;
    window.orbitControls.enabled = true; // start enabled (character is idle)
  }

  // Window Resize
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = Math.min(clock.getDelta(), 0.1);

    updateCharacterPhysics(delta);
    updateCameraFollow();
    updatePopupScreenPosition();
    updateSkyClouds(delta);
    updateAnimatedWildlife(delta);

    // Gently bob billboard indicator arrows up and down
    if (billboardArrows && billboardArrows.length) {
      const now = Date.now() * 0.004;
      billboardArrows.forEach(arr => {
        arr.position.y = arr.userData.baseY + Math.sin(now + arr.userData.phase) * 0.28;
      });
    }

    if (window.orbitControls) window.orbitControls.update();

    renderer.render(scene, camera);
  }

  animate();
}

/* --------------------------------------------------------------------------
   4. BIG 3D EXTRUDED TEXT "JANHAVI"
   -------------------------------------------------------------------------- */
function buildBigSculpturalText() {
  const textGroup = new THREE.Group();
  textGroup.position.set(0, 0, 7.5);

  const letterMat = new THREE.MeshStandardMaterial({
    color: 0xFBBF24, // Warm cheerful golden honey clay (replaces plain white)
    roughness: 0.4,
    metalness: 0.05
  });

  function stroke(w, h, d, x, y, z) {
    const geo = new THREE.BoxGeometry(w, h, d);
    const m = new THREE.Mesh(geo, letterMat);
    m.position.set(x, y + h / 2, z);
    m.castShadow = true;
    m.receiveShadow = true;
    return m;
  }

  const thick = 0.55;
  const h = 2.4;
  const bar = 0.45;

  // J
  const gJ = new THREE.Group();
  gJ.position.x = -8.2;
  gJ.add(stroke(bar, h, thick, 0.45, 0, 0));
  gJ.add(stroke(1.2, bar, thick, -0.1, 0, 0));
  gJ.add(stroke(bar, 0.9, thick, -0.65, 0, 0));
  gJ.add(stroke(1.4, bar, thick, 0, h - bar, 0));
  textGroup.add(gJ);

  // A
  const gA1 = new THREE.Group();
  gA1.position.x = -5.4;
  const legLeft = stroke(bar, h, thick, -0.55, 0, 0);
  legLeft.rotation.z = -0.12;
  const legRight = stroke(bar, h, thick, 0.55, 0, 0);
  legRight.rotation.z = 0.12;
  gA1.add(legLeft);
  gA1.add(legRight);
  gA1.add(stroke(1.2, bar, thick, 0, h - bar, 0));
  gA1.add(stroke(1.0, bar, thick, 0, 1.0, 0));
  textGroup.add(gA1);

  // N
  const gN = new THREE.Group();
  gN.position.x = -2.6;
  gN.add(stroke(bar, h, thick, -0.65, 0, 0));
  gN.add(stroke(bar, h, thick, 0.65, 0, 0));
  const diagN = stroke(bar, h * 1.1, thick, 0, -0.1, 0);
  diagN.rotation.z = -0.48;
  gN.add(diagN);
  textGroup.add(gN);

  // H
  const gH = new THREE.Group();
  gH.position.x = 0.2;
  gH.add(stroke(bar, h, thick, -0.65, 0, 0));
  gH.add(stroke(bar, h, thick, 0.65, 0, 0));
  gH.add(stroke(1.2, bar, thick, 0, 1.1, 0));
  textGroup.add(gH);

  // A
  const gA2 = new THREE.Group();
  gA2.position.x = 3.0;
  const legL2 = stroke(bar, h, thick, -0.55, 0, 0);
  legL2.rotation.z = -0.12;
  const legR2 = stroke(bar, h, thick, 0.55, 0, 0);
  legR2.rotation.z = 0.12;
  gA2.add(legL2);
  gA2.add(legR2);
  gA2.add(stroke(1.2, bar, thick, 0, h - bar, 0));
  gA2.add(stroke(1.0, bar, thick, 0, 1.0, 0));
  textGroup.add(gA2);

  // V
  const gV = new THREE.Group();
  gV.position.x = 5.8;
  const legVL = stroke(bar, h * 1.05, thick, -0.45, 0, 0);
  legVL.rotation.z = 0.22;
  const legVR = stroke(bar, h * 1.05, thick, 0.45, 0, 0);
  legVR.rotation.z = -0.22;
  gV.add(legVL);
  gV.add(legVR);
  textGroup.add(gV);

  // I
  const gI = new THREE.Group();
  gI.position.x = 8.2;
  gI.add(stroke(bar, h, thick, 0, 0, 0));
  gI.add(stroke(1.2, bar, thick, 0, h - bar, 0));
  gI.add(stroke(1.2, bar, thick, 0, 0, 0));
  textGroup.add(gI);

  scene.add(textGroup);
}

/* --------------------------------------------------------------------------
   4B. GRAND PROJECTS GATEWAY ARCHWAY ("JANHAVI'S PROJECTS" PORTAL)
   An impressive architectural portal gate spanning the road at z = -286
   -------------------------------------------------------------------------- */
function buildProjectsWelcomeArchway() {
  const gateGroup = new THREE.Group();
  gateGroup.position.set(0, 0, -325); // Positioned in the scenic buffer boulevard between Milestone 7 and Project 1
  gateGroup.rotation.y = 0; // Spans directly across the road heading south

  // Materials: Deep midnight slate pylons, electric cyan neon trims & warm golden glowing sign
  const pillarMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.4, metalness: 0.3 });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0x38BDF8, emissive: 0x0284C7, emissiveIntensity: 0.7 });
  const beamMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.35, metalness: 0.4 });
  const goldSignMat = new THREE.MeshStandardMaterial({ color: 0xF59E0B, emissive: 0xD97706, emissiveIntensity: 0.6 });

  // 1. Two Massive Gateway Support Pillars (Left & Right)
  const pillarW = 1.4, pillarH = 9.2, pillarD = 1.6;
  const span = 11.0; // Clear span over the 5.6m road and verges

  [-span / 2, span / 2].forEach((px, idx) => {
    // Pedestal base
    const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.9, 2.4), pillarMat);
    baseMesh.position.set(px, 0.45, 0);
    baseMesh.castShadow = true;
    gateGroup.add(baseMesh);

    // Glowing cyan base rim
    const rimMesh = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.16, 2.5), trimMat);
    rimMesh.position.set(px, 0.92, 0);
    gateGroup.add(rimMesh);

    // Main column
    const colMesh = new THREE.Mesh(new THREE.BoxGeometry(pillarW, pillarH, pillarD), pillarMat);
    colMesh.position.set(px, 0.9 + pillarH / 2, 0);
    colMesh.castShadow = true;
    gateGroup.add(colMesh);

    // Vertical glowing light strips running up each pillar
    const stripL = new THREE.Mesh(new THREE.BoxGeometry(0.12, pillarH - 1.2, 0.1), trimMat);
    stripL.position.set(px, 0.9 + pillarH / 2, pillarD / 2 + 0.05);
    gateGroup.add(stripL);

    // Top capital block
    const capMesh = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.8, 2.0), pillarMat);
    capMesh.position.set(px, 0.9 + pillarH + 0.4, 0);
    gateGroup.add(capMesh);

    // Top beacon orb
    const beaconGeo = new THREE.SphereGeometry(0.5, 12, 12);
    const beaconMat = new THREE.MeshStandardMaterial({ color: 0x38BDF8, emissive: 0x38BDF8, emissiveIntensity: 1.2 });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.set(px, 0.9 + pillarH + 1.2, 0);
    gateGroup.add(beacon);
  });

  // 2. Heavy Overhead Span Girders
  const topGirder = new THREE.Mesh(new THREE.BoxGeometry(span + 3.2, 1.4, 1.8), beamMat);
  topGirder.position.set(0, 9.8, 0);
  topGirder.castShadow = true;
  gateGroup.add(topGirder);

  const lowerGirder = new THREE.Mesh(new THREE.BoxGeometry(span + 1.0, 0.6, 1.2), beamMat);
  lowerGirder.position.set(0, 8.6, 0);
  gateGroup.add(lowerGirder);

  // Horizontal neon accent bars running across the girders
  const neonBarF = new THREE.Mesh(new THREE.BoxGeometry(span + 2.4, 0.14, 0.1), trimMat);
  neonBarF.position.set(0, 9.8, 0.95);
  gateGroup.add(neonBarF);

  const neonBarB = new THREE.Mesh(new THREE.BoxGeometry(span + 2.4, 0.14, 0.1), trimMat);
  neonBarB.position.set(0, 9.8, -0.95);
  gateGroup.add(neonBarB);

  // 3. Crisp High-Resolution Canvas Signboards ("⚡ PROJECTS SHOWCASE ⚡")
  function createGateSignTexture(subText) {
    const cvs = document.createElement('canvas');
    cvs.width = 1200;
    cvs.height = 340;
    const ctx = cvs.getContext('2d');

    // Rich Dark Sapphire Badge Background
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, 1200, 340);

    // Glowing border
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 14;
    ctx.strokeRect(10, 10, 1180, 320);

    // Inner gold pinstripe
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 4;
    ctx.strokeRect(26, 26, 1148, 288);

    // Top Sub-badge
    ctx.fillStyle = '#38BDF8';
    ctx.font = '800 36px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(subText || 'WELCOME TO', 600, 78);

    // Main Big Bold Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 84px "Outfit", sans-serif';
    ctx.fillText('MY PROJECTS', 600, 185);

    // Bottom Tagline
    ctx.fillStyle = '#F59E0B';
    ctx.font = '700 36px "Outfit", sans-serif';
    ctx.fillText('ENGINEERING & AI INNOVATIONS', 600, 275);

    const tex = new THREE.CanvasTexture(cvs);
    tex.generateMipmaps = true;
    tex.needsUpdate = true;
    return tex;
  }

  const signFrontTex = createGateSignTexture('WELCOME TO');
  const signBackTex = createGateSignTexture('EXPLORE');

  const signMatFront = new THREE.MeshLambertMaterial({
    map: signFrontTex,
    emissive: 0xFFFFFF,
    emissiveMap: signFrontTex,
    emissiveIntensity: 0.35
  });

  const signMatBack = new THREE.MeshLambertMaterial({
    map: signBackTex,
    emissive: 0xFFFFFF,
    emissiveMap: signBackTex,
    emissiveIntensity: 0.35
  });

  const signW = 8.8, signH = 2.4;
  const signFront = new THREE.Mesh(new THREE.PlaneGeometry(signW, signH), signMatFront);
  signFront.position.set(0, 9.8, 0.98);
  gateGroup.add(signFront);

  const signBack = new THREE.Mesh(new THREE.PlaneGeometry(signW, signH), signMatBack);
  signBack.position.set(0, 9.8, -0.98);
  signBack.rotation.y = Math.PI;
  gateGroup.add(signBack);

  // 4. Twin Welcome Flag Banners on the outer columns
  [-span / 2 - 1.8, span / 2 + 1.8].forEach(fx => {
    const flagPole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 6.5, 6), beamMat);
    flagPole.position.set(fx, 3.25, 0);
    gateGroup.add(flagPole);

    const bannerMat = new THREE.MeshStandardMaterial({ color: 0x2563EB, roughness: 0.5, side: THREE.DoubleSide });
    const banner = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 3.4), bannerMat);
    banner.position.set(fx + 0.8, 4.6, 0);
    gateGroup.add(banner);
  });

  scene.add(gateGroup);
}

/* --------------------------------------------------------------------------
   5. ROAD PATHWAY — STRICTLY PARALLEL TO GROUND (FLAT HORIZONTAL RIBBON)
   -------------------------------------------------------------------------- */
function buildClayRoad() {
  roadPoints = [
    // Entrance & PSBA School
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -18),
    new THREE.Vector3(14, 0, -35),
    // MITAOE Campus
    new THREE.Vector3(25, 0, -58),
    new THREE.Vector3(12, 0, -85),
    // 1st Year Maker Lab
    new THREE.Vector3(-12, 0, -110),
    new THREE.Vector3(-22, 0, -140),
    // Coppercloud HQ
    new THREE.Vector3(-8, 0, -170),
    // Coppercloud R&D
    new THREE.Vector3(16, 0, -200),
    // Clarity Lab IITJ
    new THREE.Vector3(20, 0, -235),
    // 3D Digital Twin Lab (Last Milestone at z = -270)
    new THREE.Vector3(0, 0, -270),

    // --- Spacious Scenic Transition Zone & Portal Gateway ---
    new THREE.Vector3(0, 0, -295),
    new THREE.Vector3(0, 0, -325), // Grand "MY PROJECTS" Welcome Archway Portal & Terrain Transition Threshold

    // --- Extended Curvy Project Showcase Boulevard ---
    // Turn 1: Gentle curve out towards Project 1 & 2
    new THREE.Vector3(-16, 0, -360),
    new THREE.Vector3(-24, 0, -400),
    // Turn 2: Sweeping eastward curve passing Projects 3 & 4
    new THREE.Vector3(-8, 0, -440),
    new THREE.Vector3(16, 0, -480),
    new THREE.Vector3(26, 0, -520),
    // Turn 3: S-curve westwards passing Projects 5 & 6
    new THREE.Vector3(10, 0, -560),
    new THREE.Vector3(-18, 0, -600),
    new THREE.Vector3(-22, 0, -640),
    // Turn 4: Final graceful curve towards Grand Tech Plaza (Projects 7, 8 & 9)
    new THREE.Vector3(-4, 0, -680),
    new THREE.Vector3(18, 0, -720),
    new THREE.Vector3(14, 0, -755),
    new THREE.Vector3(0, 0, -790)
  ];

  roadCurve = new THREE.CatmullRomCurve3(roadPoints);
  roadLength = roadCurve.getLength();
  const roadWidth = 5.6; // Slightly wider, spacious road
  const segments = 520;

  // Custom flat horizontal ribbon geometry lying completely flat on XZ plane
  const vertices = [];
  const uvs = [];
  const indices = [];

  const UP = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const pt = roadCurve.getPointAt(t);
    const tangent = roadCurve.getTangentAt(t).normalize();
    // Horizontal normal in the XZ plane perpendicular to the tangent
    const side = new THREE.Vector3().crossVectors(tangent, UP).normalize();

    // Left and right edges lying horizontally flat on the ground (Y = 0.025)
    const leftPt = pt.clone().sub(side.clone().multiplyScalar(roadWidth / 2));
    const rightPt = pt.clone().add(side.clone().multiplyScalar(roadWidth / 2));

    leftPt.y = 0.025;
    rightPt.y = 0.025;

    vertices.push(leftPt.x, leftPt.y, leftPt.z);
    vertices.push(rightPt.x, rightPt.y, rightPt.z);

    uvs.push(0, t);
    uvs.push(1, t);

    if (i < segments) {
      const baseIdx = i * 2;
      indices.push(baseIdx, baseIdx + 1, baseIdx + 2);
      indices.push(baseIdx + 1, baseIdx + 3, baseIdx + 2);
    }
  }

  const roadGeo = new THREE.BufferGeometry();
  roadGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  roadGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  roadGeo.setIndex(indices);
  roadGeo.computeVertexNormals();

  const roadMat = new THREE.MeshStandardMaterial({
    color: 0x334155, // Clean modern dark asphalt road from reference
    roughness: 0.75,
    metalness: 0.05,
    side: THREE.DoubleSide
  });

  const roadMesh = new THREE.Mesh(roadGeo, roadMat);
  roadMesh.receiveShadow = true;
  scene.add(roadMesh);

  // Lush green grass verge ribbon lining both sides of the path
  const grassVergeWidth = 8.6; // Extends beyond roadWidth (5.0) on both sides
  const grassVertices = [];
  const grassUvs = [];
  const grassIndices = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const pt = roadCurve.getPointAt(t);
    const tangent = roadCurve.getTangentAt(t).normalize();
    const side = new THREE.Vector3().crossVectors(tangent, UP).normalize();

    const gLeft = pt.clone().sub(side.clone().multiplyScalar(grassVergeWidth / 2));
    const gRight = pt.clone().add(side.clone().multiplyScalar(grassVergeWidth / 2));

    gLeft.y = 0.015;
    gRight.y = 0.015;

    grassVertices.push(gLeft.x, gLeft.y, gLeft.z);
    grassVertices.push(gRight.x, gRight.y, gRight.z);

    grassUvs.push(0, t);
    grassUvs.push(1, t);

    if (i < segments) {
      const baseIdx = i * 2;
      grassIndices.push(baseIdx, baseIdx + 1, baseIdx + 2);
      grassIndices.push(baseIdx + 1, baseIdx + 3, baseIdx + 2);
    }
  }

  const grassVergeGeo = new THREE.BufferGeometry();
  grassVergeGeo.setAttribute('position', new THREE.Float32BufferAttribute(grassVertices, 3));
  grassVergeGeo.setAttribute('uv', new THREE.Float32BufferAttribute(grassUvs, 2));
  grassVergeGeo.setIndex(grassIndices);
  grassVergeGeo.computeVertexNormals();

  const grassVergeMat = new THREE.MeshStandardMaterial({
    color: 0x4ADE80, // Fresh lush emerald spring grass
    roughness: 0.82,
    side: THREE.DoubleSide
  });

  const grassVergeMesh = new THREE.Mesh(grassVergeGeo, grassVergeMat);
  grassVergeMesh.receiveShadow = true;
  scene.add(grassVergeMesh);

  // 3D Lush grass tufts and wildflower blades sprouting along the path edges
  const pathGrassMat = new THREE.MeshStandardMaterial({ color: 0x22C55E, roughness: 0.75, flatShading: true });
  const flowerSproutMat = new THREE.MeshStandardMaterial({ color: 0xD9776E, roughness: 0.7 }); // Warm muddy terracotta rose blossoms

  for (let g = 0; g < 220; g++) {
    const t = g / 220;
    const pt = roadCurve.getPointAt(t);
    const tangent = roadCurve.getTangentAt(t).normalize();
    const side = new THREE.Vector3().crossVectors(tangent, UP).normalize();

    // Alternate left and right side of road with natural random spacing
    const sideSign = (g % 2 === 0 ? 1 : -1);
    const distFromCenter = (roadWidth / 2) + 0.6 + ((g % 4) * 0.45);
    const grassPos = pt.clone().add(side.clone().multiplyScalar(sideSign * distFromCenter));

    const tuft = new THREE.Group();
    tuft.position.set(grassPos.x, 0, grassPos.z);

    // 3 small cone blades
    for (let b = 0; b < 3; b++) {
      const blade = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.65 + (b % 3) * 0.2, 4), pathGrassMat);
      blade.position.set((b - 1) * 0.16, 0.35, 0);
      blade.rotation.z = (b - 1) * 0.22;
      blade.castShadow = true;
      tuft.add(blade);
    }

    // Occasional tiny flower in the grass
    if (g % 5 === 0) {
      const fl = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18, 0), flowerSproutMat);
      fl.position.set(0, 0.55, 0.08);
      tuft.add(fl);
    }

    scene.add(tuft);
  }

  // Dashed white center markings lying flat on the road surface
  const dashCount = 140;
  const dashGeo = new THREE.PlaneGeometry(0.28, 1.8);
  dashGeo.rotateX(-Math.PI / 2); // Lies flat on the ground!
  const dashMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });

  for (let i = 0; i < dashCount; i++) {
    const t = i / dashCount;
    const pt = roadCurve.getPointAt(t);
    const tangent = roadCurve.getTangentAt(t).normalize();

    const dash = new THREE.Mesh(dashGeo, dashMat);
    dash.position.set(pt.x, 0.035, pt.z);
    const angle = Math.atan2(tangent.x, tangent.z);
    dash.rotation.y = angle;
    scene.add(dash);
  }
}

/* --------------------------------------------------------------------------
   5.5 LOGO BADGE BANNER TEXTURE GENERATOR (INSPIRED BY REFERENCE IMAGE)
   Creates small square logo banners with white cards, dark borders, and icons
   -------------------------------------------------------------------------- */
function createLogoBadgeBannerTexture(proj) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  function drawCard(img) {
    // Crisp clean billboard face
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 1024, 768);

    // Accent framing border matching project theme color
    ctx.strokeStyle = proj.themeColor || '#2563EB';
    ctx.lineWidth = 22;
    ctx.strokeRect(11, 11, 1002, 746);

    // Inner subtle border
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 964, 708);

    if (img && img.width > 0 && img.height > 0) {
      // Draw custom project logo image prominently in center with padding
      const maxW = 900;
      const maxH = 550;
      const scale = Math.min(maxW / img.width, maxH / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = (1024 - dw) / 2;
      const dy = 50 + (maxH - dh) / 2;

      ctx.drawImage(img, dx, dy, dw, dh);
    } else {
      // High-visibility fallback icon
      ctx.font = '200px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(proj.icon || '🚀', 512, 320);
    }

    // Bold title banner bar at the bottom
    ctx.fillStyle = proj.themeColor || '#0F172A';
    ctx.fillRect(36, 610, 952, 120);

    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '900 44px "Outfit", system-ui, sans-serif';
    ctx.fillText(proj.badge || proj.title, 512, 670);
  }

  // Draw initial canvas immediately so billboard is never blank or black
  drawCard(null);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  // Load custom logo image asynchronously and update canvas
  if (proj.logoPath) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      drawCard(img);
      texture.needsUpdate = true;
    };
    img.onerror = () => {
      console.warn(`Failed to load logo image: ${proj.logoPath}, keeping procedural card`);
    };
    img.src = proj.logoPath;
  }

  return texture;
}

/* --------------------------------------------------------------------------
   6. 7 STYLIZED ARCHITECTURAL MILESTONE BUILDINGS (WITH INTERACTIVE PROJECT BANNERS)
   -------------------------------------------------------------------------- */
function buildMilestoneBuildings() {
  const buildingConfigs = [
    {
      id: "schooling",
      pos: new THREE.Vector3(19, 0, -35),
      rotY: -0.35,
      type: "school",
      color: 0xE8A598, // Soft terracotta blush
      roofColor: 0xB56555,
      label: "1. PSBA School"
    },
    {
      id: "engineering",
      pos: new THREE.Vector3(18, 0, -85),
      rotY: -0.2,
      type: "university",
      color: 0xF7F6F2,
      roofColor: 0x6A8CAF, // Soft dusty slate blue
      label: "2. MITAOE Campus"
    },
    {
      id: "year1",
      pos: new THREE.Vector3(-18, 0, -110),
      rotY: 0.4,
      type: "makerLab",
      color: 0xE6C280, // Soft warm sand/ochre
      roofColor: 0x64748B,
      label: "3. 1st Yr Maker Lab"
    },
    {
      id: "year2",
      pos: new THREE.Vector3(-15, 0, -170),
      rotY: 0.25,
      type: "corporate",
      color: 0x93B5C6, // Soft dusty sky
      roofColor: 0x567D94,
      label: "4. Coppercloud HQ"
    },
    {
      id: "year3",
      pos: new THREE.Vector3(22, 0, -200),
      rotY: -0.4,
      type: "rdLab",
      color: 0x9BB8A2, // Soft muted sage
      roofColor: 0x5C8065,
      label: "5. Coppercloud R&D"
    },
    {
      id: "year4",
      pos: new THREE.Vector3(26, 0, -235),
      rotY: -0.25,
      type: "clarityLab",
      color: 0xE5B899, // Gentle muted apricot
      roofColor: 0xB57650,
      label: "6. Clarity Lab IITJ"
    },
    {
      id: "current",
      pos: new THREE.Vector3(-8, 0, -270),
      rotY: 0.35,
      type: "digitalTwin",
      color: 0xC5B4E3, // Gentle pastel lavender
      roofColor: 0x8C74B2,
      label: "7. 3D Digital Twin Lab"
    }
  ];

  buildingConfigs.forEach(cfg => {
    const bGroup = new THREE.Group();
    bGroup.position.copy(cfg.pos);
    bGroup.rotation.y = cfg.rotY;

    createProceduralBuilding(bGroup, cfg);

    const plinthGeo = new THREE.BoxGeometry(9, 0.25, 9);
    const plinthMat = new THREE.MeshStandardMaterial({ color: 0xD8B28A, roughness: 0.85 }); // Warm biscuit sandstone foundation
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.y = 0.12;
    plinth.receiveShadow = true;
    bGroup.add(plinth);

    // Clean, elegant roadside milestone signpost
    const signPostGeo = new THREE.BoxGeometry(0.18, 1.2, 0.18);
    const signBoardGeo = new THREE.BoxGeometry(3.6, 0.8, 0.15);
    const signMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.4 });
    const postMat = new THREE.MeshStandardMaterial({ color: 0x64748B, roughness: 0.8 });

    const post1 = new THREE.Mesh(signPostGeo, postMat);
    post1.position.set(-1.4, 0.6, 4.5);
    bGroup.add(post1);

    const post2 = new THREE.Mesh(signPostGeo, postMat);
    post2.position.set(1.4, 0.6, 4.5);
    bGroup.add(post2);

    const board = new THREE.Mesh(signBoardGeo, signMat);
    board.position.set(0, 1.2, 4.5);
    board.castShadow = true;
    bGroup.add(board);

    bGroup.userData = {
      isBuilding: true,
      milestoneId: cfg.id,
      anchorPos: cfg.pos.clone().add(new THREE.Vector3(0, 4.5, 0))
    };

    scene.add(bGroup);
    buildingMeshes.push(bGroup);
  });

  // Compute progress thresholds for each building along the road curve
  if (roadCurve) {
    const samplePoints = roadCurve.getPoints(300);
    milestoneThresholds = buildingConfigs.map(cfg => {
      let nearestT = 0;
      let minDist = Infinity;
      samplePoints.forEach((p, i) => {
        const d = p.distanceTo(cfg.pos);
        if (d < minDist) {
          minDist = d;
          nearestT = i / (samplePoints.length - 1);
        }
      });
      return nearestT;
    });
  }
}

function createProceduralBuilding(group, cfg) {
  const wallMat = new THREE.MeshStandardMaterial({ color: cfg.color, roughness: 0.6 });
  const roofMat = new THREE.MeshStandardMaterial({ color: cfg.roofColor, roughness: 0.5 });
  const windowMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.2 });
  const doorMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.5 });

  if (cfg.type === "school") {
    const body = new THREE.Mesh(new THREE.BoxGeometry(6.5, 4.0, 5.5), wallMat);
    body.position.y = 2.0;
    body.castShadow = true;
    group.add(body);

    const roof = new THREE.Mesh(new THREE.ConeGeometry(4.8, 2.4, 4), roofMat);
    roof.position.y = 5.2;
    roof.rotation.y = Math.PI / 4;
    group.add(roof);

    const tower = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.2, 1.6), wallMat);
    tower.position.y = 6.2;
    group.add(tower);

    const bellRoof = new THREE.Mesh(new THREE.ConeGeometry(1.3, 1.4, 4), roofMat);
    bellRoof.position.y = 7.8;
    bellRoof.rotation.y = Math.PI / 4;
    group.add(bellRoof);

    const door = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.0, 0.2), doorMat);
    door.position.set(0, 1.0, 2.8);
    group.add(door);
  }
  else if (cfg.type === "university") {
    const body = new THREE.Mesh(new THREE.BoxGeometry(7.5, 4.8, 6.0), wallMat);
    body.position.y = 2.4;
    body.castShadow = true;
    group.add(body);

    const pillarMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.3 });
    [-1.8, -0.6, 0.6, 1.8].forEach(x => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 4.2, 12), pillarMat);
      col.position.set(x, 2.1, 3.4);
      col.castShadow = true;
      group.add(col);
    });

    const pediment = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.5, 1.2), pillarMat);
    pediment.position.set(0, 4.4, 3.4);
    group.add(pediment);

    const roof = new THREE.Mesh(new THREE.BoxGeometry(7.8, 0.8, 6.4), roofMat);
    roof.position.y = 5.2;
    roof.castShadow = true;
    group.add(roof);
  }
  else if (cfg.type === "makerLab") {
    const body = new THREE.Mesh(new THREE.BoxGeometry(6.2, 3.6, 5.8), wallMat);
    body.position.y = 1.8;
    body.castShadow = true;
    group.add(body);

    const solarRoof = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.3, 4.2), roofMat);
    solarRoof.position.set(0, 4.1, 0);
    solarRoof.rotation.x = -0.3;
    group.add(solarRoof);

    const vent = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 1.6, 8), roofMat);
    vent.position.set(2.0, 4.6, -1.5);
    group.add(vent);
  }
  else if (cfg.type === "corporate") {
    const body = new THREE.Mesh(new THREE.BoxGeometry(6.0, 6.0, 5.2), wallMat);
    body.position.y = 3.0;
    body.castShadow = true;
    group.add(body);

    for (let f = 1; f <= 3; f++) {
      const glassBand = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.8, 0.1), windowMat);
      glassBand.position.set(0, f * 1.5, 2.65);
      group.add(glassBand);
    }

    const canopy = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.15, 1.4), roofMat);
    canopy.position.set(0, 1.8, 3.2);
    group.add(canopy);
  }
  else if (cfg.type === "rdLab") {
    const body = new THREE.Mesh(new THREE.BoxGeometry(6.5, 3.8, 6.0), wallMat);
    body.position.y = 1.9;
    body.castShadow = true;
    group.add(body);

    const domeMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.2 });
    const dome = new THREE.Mesh(new THREE.SphereGeometry(1.6, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), domeMat);
    dome.position.set(0, 3.8, 0);
    group.add(dome);

    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.5, 8), doorMat);
    mast.position.set(2.2, 4.8, 1.5);
    group.add(mast);
  }
  else if (cfg.type === "clarityLab") {
    const body = new THREE.Mesh(new THREE.BoxGeometry(7.0, 4.2, 5.8), wallMat);
    body.position.y = 2.1;
    body.castShadow = true;
    group.add(body);

    const glassDomeMat = new THREE.MeshPhysicalMaterial({
      color: 0xBAE6FD,
      roughness: 0.1,
      transmission: 0.8,
      thickness: 0.4
    });
    const panoDome = new THREE.Mesh(new THREE.SphereGeometry(1.9, 20, 20), glassDomeMat);
    panoDome.position.set(0, 4.8, 0);
    group.add(panoDome);
  }
  else {
    const body = new THREE.Mesh(new THREE.BoxGeometry(6.8, 4.4, 5.6), wallMat);
    body.position.y = 2.2;
    body.castShadow = true;
    group.add(body);

    const prismMat = new THREE.MeshPhysicalMaterial({
      color: 0xFDE047,
      roughness: 0.1,
      clearcoat: 1.0,
      emissive: 0xF59E0B,
      emissiveIntensity: 0.35
    });
    const prism = new THREE.Mesh(new THREE.OctahedronGeometry(1.4, 0), prismMat);
    prism.position.set(0, 6.2, 0);
    group.add(prism);
  }
}

function buildFoliageAndRocks() {
  const rockMat = new THREE.MeshStandardMaterial({ color: 0x78716C, roughness: 0.9, flatShading: true }); // Natural medium stone grey
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78553D, roughness: 0.85 }); // Warm chocolate mahogany trunk

  // Lush nature foliage palette (deep vibrant lush greens, emerald, warm muddy terracotta pink, and warm earthy heather purple)
  const leafMats = [
    new THREE.MeshStandardMaterial({ color: 0x2E7D32, roughness: 0.74, flatShading: true }), // Lush Vibrant Forest Green
    new THREE.MeshStandardMaterial({ color: 0x15803D, roughness: 0.72, flatShading: true }), // Deep Rich Emerald
    new THREE.MeshStandardMaterial({ color: 0x4ADE80, roughness: 0.70, flatShading: true }), // Fresh Lush Spring Meadow Green
    new THREE.MeshStandardMaterial({ color: 0x3F6212, roughness: 0.76, flatShading: true }), // Earthy Deep Moss Green
    new THREE.MeshStandardMaterial({ color: 0xD9776E, roughness: 0.74, flatShading: true }), // Warm Muddy Terracotta Pink (Warm dusty rose clay)
    new THREE.MeshStandardMaterial({ color: 0xA06B82, roughness: 0.74, flatShading: true })  // Warm Earthy Plum Heather (Warm muddy mauve)
  ];

  // Town Props Materials (Gentle, low-contrast finishes)
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x965A38, roughness: 0.85 });
  const lamppostMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 });
  const lampLightMat = new THREE.MeshStandardMaterial({ color: 0xFDE047, emissive: 0xFACC15, emissiveIntensity: 0.9 });

  // 1. Scattered Low-Poly Boulders
  const rockPositions = [
    { x: -9.5, z: 9.5, s: 1.3 }, { x: -5.8, z: 10.2, s: 0.9 },
    { x: 3.5, z: 10.0, s: 1.4 }, { x: 9.5, z: 9.2, s: 1.1 },
    { x: -3.5, z: 3.2, s: 0.8 }, { x: 4.5, z: 2.8, s: 1.0 },
    { x: 10, z: -25, s: 1.5 }, { x: -8, z: -50, s: 1.2 },
    { x: 26, z: -70, s: 1.6 }, { x: -24, z: -95, s: 1.8 },
    { x: 8, z: -130, s: 1.4 }, { x: -14, z: -155, s: 1.2 },
    { x: 26, z: -185, s: 1.7 }, { x: -16, z: -220, s: 1.5 },
    { x: 12, z: -250, s: 1.3 }, { x: -6, z: -285, s: 1.4 },
    { x: 8, z: -280, s: 1.6 }
  ];

  rockPositions.forEach(p => {
    const geo = new THREE.DodecahedronGeometry(p.s, 0);
    const m = new THREE.Mesh(geo, rockMat);
    m.position.set(p.x, p.s * 0.65, p.z);
    m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    m.scale.set(1.2, 0.75, 1.0);
    m.castShadow = true;
    m.receiveShadow = true;
    scene.add(m);
  });

  // 2. Distinct Town Project Buildings with Rooftop Square Logo Banners (Inspired by Reference Town)
  townBuildingMeshes = [];
  PROJECT_BUILDINGS_DATA.forEach(proj => {
    const pGroup = new THREE.Group();
    pGroup.position.set(proj.pos.x, 0, proj.pos.z);
    pGroup.rotation.y = proj.rot;

    const wallMat = new THREE.MeshStandardMaterial({ color: proj.wallColor, roughness: 0.65 });
    const roofMat = new THREE.MeshStandardMaterial({ color: proj.roofColor, roughness: 0.55 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x92400E, roughness: 0.85 });
    const winMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.2, emissive: 0xFEF08A, emissiveIntensity: 0.3 });

    // Raised courtyard pavement / plinth (Warm Tuscan cobblestone paver from reference)
    const courtGeo = new THREE.BoxGeometry(10, 0.2, 10);
    const courtMat = new THREE.MeshStandardMaterial({ color: 0xD97746, roughness: 0.85 }); // Warm rustic Tuscan paver
    const court = new THREE.Mesh(courtGeo, courtMat);
    court.position.y = 0.1;
    court.receiveShadow = true;
    pGroup.add(court);

    // Decorative courtyard fencing (picket, wireframe or circuit trace foundation from reference)
    if (proj.fenceType === "wooden") {
      // Cozy wooden pencil/picket fence
      const fGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.2, 6);
      const fMat = new THREE.MeshStandardMaterial({ color: 0xD97706, roughness: 0.8 });
      for (let fx = -4.5; fx <= 4.5; fx += 0.9) {
        [-4.5, 4.5].forEach(fz => {
          const post = new THREE.Mesh(fGeo, fMat);
          post.position.set(fx, 0.6, fz);
          post.castShadow = true;
          pGroup.add(post);
        });
      }
    } else if (proj.fenceType === "wireframe") {
      // Blueprint wireframe scaffold boundary
      const wfMat = new THREE.MeshStandardMaterial({ color: 0x38BDF8, wireframe: true });
      const wfBox = new THREE.Mesh(new THREE.BoxGeometry(9.2, 1.4, 9.2), wfMat);
      wfBox.position.y = 0.8;
      pGroup.add(wfBox);
    } else if (proj.fenceType === "circuit") {
      // Low tech perimeter boundary with corner beacons
      const techBorderMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.5 });
      const border = new THREE.Mesh(new THREE.BoxGeometry(9.4, 0.4, 9.4), techBorderMat);
      border.position.y = 0.25;
      pGroup.add(border);
      // Corner beacon lights
      [-4.5, 4.5].forEach(bx => {
        [-4.5, 4.5].forEach(bz => {
          const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.9, 8), new THREE.MeshStandardMaterial({ color: 0x38BDF8, emissive: 0x38BDF8, emissiveIntensity: 0.8 }));
          beacon.position.set(bx, 0.5, bz);
          pGroup.add(beacon);
        });
      });
    }

    // Main Architectural House Body
    const houseBody = new THREE.Mesh(new THREE.BoxGeometry(5.4, 3.8, 5.0), wallMat);
    houseBody.position.y = 2.0;
    houseBody.castShadow = true;
    pGroup.add(houseBody);

    // Front door & warm lighted windows
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.0, 0.2), woodMat);
    door.position.set(0, 1.1, 2.55);
    pGroup.add(door);

    [-1.6, 1.6].forEach(wx => {
      const win = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.0, 0.15), winMat);
      win.position.set(wx, 2.4, 2.55);
      pGroup.add(win);
    });

    // Varied low-poly roofs & gadgets based on project type
    let bannerMountY = 5.2;

    if (proj.roofType === "pitched") {
      const roof = new THREE.Mesh(new THREE.ConeGeometry(4.4, 2.4, 4), roofMat);
      roof.position.y = 4.8;
      roof.rotation.y = Math.PI / 4;
      roof.castShadow = true;
      pGroup.add(roof);

      const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.6, 0.7), roofMat);
      chimney.position.set(1.4, 4.8, -0.8);
      pGroup.add(chimney);

      bannerMountY = 6.4;
    } else if (proj.roofType === "flat_tech") {
      const topDeck = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.5, 5.4), roofMat);
      topDeck.position.y = 4.0;
      topDeck.castShadow = true;
      pGroup.add(topDeck);

      // Dish antenna
      const dish = new THREE.Mesh(new THREE.ConeGeometry(0.9, 0.4, 8), new THREE.MeshStandardMaterial({ color: 0xFFFFFF }));
      dish.position.set(-1.4, 4.6, -1.0);
      dish.rotation.x = -0.6;
      pGroup.add(dish);

      bannerMountY = 4.8;
    } else if (proj.roofType === "solar_cottage") {
      const roof = new THREE.Mesh(new THREE.ConeGeometry(4.4, 2.2, 4), roofMat);
      roof.position.y = 4.7;
      roof.rotation.y = Math.PI / 4;
      roof.castShadow = true;
      pGroup.add(roof);

      // Blue solar panel array on roof
      const solMat = new THREE.MeshStandardMaterial({ color: 0x1E3A8A, roughness: 0.2, metalness: 0.4 });
      const sol = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.1, 1.4), solMat);
      sol.position.set(0, 4.9, 1.4);
      sol.rotation.x = -0.6;
      pGroup.add(sol);

      bannerMountY = 6.2;
    } else if (proj.roofType === "dome") {
      const dome = new THREE.Mesh(new THREE.SphereGeometry(2.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), roofMat);
      dome.position.y = 3.9;
      dome.castShadow = true;
      pGroup.add(dome);

      bannerMountY = 6.3;
    } else if (proj.roofType === "wireframe_frame") {
      // Wireframe 3D pyramid roof frame
      const pyrMat = new THREE.MeshStandardMaterial({ color: 0x7C3AED, wireframe: true });
      const pyr = new THREE.Mesh(new THREE.ConeGeometry(3.6, 3.0, 4), pyrMat);
      pyr.position.y = 5.2;
      pyr.rotation.y = Math.PI / 4;
      pGroup.add(pyr);

      bannerMountY = 6.8;
    } else {
      const roof = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.8, 5.2), roofMat);
      roof.position.y = 4.2;
      roof.castShadow = true;
      pGroup.add(roof);

      // Rotating gear graphic
      const gear = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.3, 8), roofMat);
      gear.position.set(0, 4.7, 0);
      pGroup.add(gear);

      bannerMountY = 5.4;
    }

    // Prominent, Attention-Catching Rooftop Billboard Banner
    const logoTexture = createLogoBadgeBannerTexture(proj);

    // Create a dedicated billboard sub-group rotated to face the road/camera directly
    const billboardGroup = new THREE.Group();
    billboardGroup.position.set(0, bannerMountY, 0);

    // Find nearest point on roadCurve to orient the billboard facing straight towards the road
    let nearestRoadPt = new THREE.Vector3(0, 0, proj.pos.z);
    if (roadCurve) {
      const samples = roadCurve.getPoints(200);
      let minD = Infinity;
      samples.forEach(sp => {
        const d = sp.distanceTo(new THREE.Vector3(proj.pos.x, 0, proj.pos.z));
        if (d < minD) {
          minD = d;
          nearestRoadPt = sp;
        }
      });
    }

    // Angle billboard towards the nearest road point
    const angleToRoad = Math.atan2(nearestRoadPt.x - proj.pos.x, nearestRoadPt.z - proj.pos.z);
    billboardGroup.rotation.y = angleToRoad - proj.rot;

    // Twin sturdy steel mounting pylons/trusses
    const trussMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.6, metalness: 0.3 });
    const pylonL = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 2.4, 8), trussMat);
    pylonL.position.set(-1.6, 1.2, 0);
    billboardGroup.add(pylonL);

    const pylonR = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 2.4, 8), trussMat);
    pylonR.position.set(1.6, 1.2, 0);
    billboardGroup.add(pylonR);

    // Cross brace between pylons
    const xBrace = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.1, 0.1), trussMat);
    xBrace.position.set(0, 1.0, 0);
    billboardGroup.add(xBrace);

    // Large outer dark billboard bezel frame (5.0m wide x 3.8m tall)
    const billboardW = 4.8;
    const billboardH = 3.6;
    const frameMesh = new THREE.Mesh(
      new THREE.BoxGeometry(billboardW + 0.24, billboardH + 0.24, 0.24),
      new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.45, metalness: 0.2 })
    );
    frameMesh.position.set(0, 2.5, 0);
    frameMesh.castShadow = true;
    billboardGroup.add(frameMesh);

    // Top banner spotlight fixture
    const spotFixture = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.18, 0.35), trussMat);
    spotFixture.position.set(0, 2.5 + (billboardH / 2) + 0.12, 0.22);
    billboardGroup.add(spotFixture);

    // Front high-res big banner plane (Wide 4:3 billboard)
    // MeshLambertMaterial with slight emissive self-illumination guarantees vivid brightness from every angle
    const bannerMat = new THREE.MeshLambertMaterial({
      map: logoTexture,
      emissive: 0xFFFFFF,
      emissiveMap: logoTexture,
      emissiveIntensity: 0.35,
      side: THREE.FrontSide
    });

    const bannerBoard = new THREE.Mesh(
      new THREE.PlaneGeometry(billboardW, billboardH),
      bannerMat
    );
    bannerBoard.position.set(0, 2.5, 0.14);
    bannerBoard.userData = {
      isProjectTownBanner: true,
      projectId: proj.id,
      parentBuilding: pGroup
    };
    billboardGroup.add(bannerBoard);

    // Back banner plane so it is fully visible and legible from every angle
    const bannerBoardBack = new THREE.Mesh(
      new THREE.PlaneGeometry(billboardW, billboardH),
      bannerMat
    );
    bannerBoardBack.position.set(0, 2.5, -0.14);
    bannerBoardBack.rotation.y = Math.PI;
    bannerBoardBack.userData = {
      isProjectTownBanner: true,
      projectId: proj.id,
      parentBuilding: pGroup
    };
    billboardGroup.add(bannerBoardBack);

    // Floating thick vibrant bright red 3D indicator arrow pointing down to billboard
    const arrowGroup = new THREE.Group();
    const arrowRedMat = new THREE.MeshStandardMaterial({
      color: 0xEF4444, // Bright vivid scarlet red
      roughness: 0.25,
      emissive: 0xDC2626, // Bright ruby red glow
      emissiveIntensity: 0.75
    });

    // Arrow stem (thick cylinder)
    const arrowStem = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.9, 12), arrowRedMat);
    arrowStem.position.y = 0.85;
    arrowStem.castShadow = true;
    arrowGroup.add(arrowStem);

    // Arrow head (thick downward-pointing cone)
    const arrowHead = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.0, 12), arrowRedMat);
    arrowHead.position.y = 0.22;
    arrowHead.rotation.x = Math.PI; // Points downward directly towards the billboard
    arrowHead.castShadow = true;
    arrowGroup.add(arrowHead);

    const baseArrowY = 2.5 + (billboardH / 2) + 1.25;
    arrowGroup.position.set(0, baseArrowY, 0);
    arrowGroup.userData = {
      baseY: baseArrowY,
      phase: Math.random() * Math.PI * 2
    };
    billboardGroup.add(arrowGroup);
    billboardArrows.push(arrowGroup);

    pGroup.add(billboardGroup);

    pGroup.userData = {
      isTownProjectBuilding: true,
      projectId: proj.id,
      anchorPos: new THREE.Vector3(proj.pos.x, bannerMountY + 3.8, proj.pos.z)
    };

    scene.add(pGroup);
    townBuildingMeshes.push(pGroup);
  });

  // Calculate project building thresholds along the road for auto-opening
  if (roadCurve) {
    const samplePts = roadCurve.getPoints(500);
    projectThresholds = PROJECT_BUILDINGS_DATA.map(proj => {
      let nearestT = 0;
      let minD = Infinity;
      const bPos = new THREE.Vector3(proj.pos.x, 0, proj.pos.z);
      samplePts.forEach((p, idx) => {
        const d = p.distanceTo(bPos);
        if (d < minD) {
          minD = d;
          nearestT = idx / (samplePts.length - 1);
        }
      });
      return { id: proj.id, threshold: nearestT, pos: bPos };
    });
  }

  // 3. Street Lampposts along the road and town courtyards (Covering milestones and extended project boulevard)
  const lamppostPoints = [
    { x: -5, z: -10 }, { x: 5, z: -10 },
    { x: 16, z: -25 }, { x: 8, z: -45 },
    { x: 18, z: -70 }, { x: -8, z: -95 },
    { x: -16, z: -125 }, { x: -6, z: -150 },
    { x: 10, z: -185 }, { x: 18, z: -215 },
    { x: 12, z: -245 }, { x: -5, z: -265 },
    // Extended boulevard lampposts
    { x: -5, z: -300 },  { x: 5, z: -300 },   // Transition buffer stretch
    { x: -6, z: -325 },  { x: 6, z: -325 },   // Welcoming archway portals
    { x: -20, z: -360 }, { x: -28, z: -400 }, // Projects 1 & 2
    { x: -14, z: -440 }, { x: 14, z: -480 },  // Project 3 & 4
    { x: 30, z: -520 },  { x: 14, z: -560 },  // Projects 4 & 5
    { x: -14, z: -600 }, { x: -26, z: -640 }, // Projects 6 & 7
    { x: -8, z: -680 },  { x: 16, z: -720 },  // Projects 8 & 9
    { x: 16, z: -755 },  { x: -4, z: -785 }   // Grand Tech Plaza finale
  ];

  // 3. Street Lampposts along the road and town courtyards (Taller, elegant street lamps)
  lamppostPoints.forEach(lp => {
    const pole = new THREE.Group();
    pole.position.set(lp.x, 0, lp.z);

    // Decorative base pedestal
    const basePedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 0.5, 8), lamppostMat);
    basePedestal.position.y = 0.25;
    basePedestal.castShadow = true;
    pole.add(basePedestal);

    // Main vertical tall stem
    const stemHeight = 5.4;
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, stemHeight, 8), lamppostMat);
    stem.position.y = stemHeight / 2;
    stem.castShadow = true;
    pole.add(stem);

    // Curved/horizontal top bracket arm extending over the sidewalk
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.1, 0.1), lamppostMat);
    arm.position.set(0.35, stemHeight - 0.15, 0);
    pole.add(arm);

    // Decorative bracket brace
    const brace = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.08, 0.08), lamppostMat);
    brace.position.set(0.18, stemHeight - 0.35, 0);
    brace.rotation.z = Math.PI / 4;
    pole.add(brace);

    // Elegant lantern housing cap
    const lanternCap = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.28, 6), lamppostMat);
    lanternCap.position.set(0.72, stemHeight - 0.05, 0);
    pole.add(lanternCap);

    // Glowing warm lantern glass fixture
    const lantern = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), lampLightMat);
    lantern.position.set(0.72, stemHeight - 0.35, 0);
    pole.add(lantern);

    scene.add(pole);
  });

  // 4. Clustered Groves / Bunches of Warm Green Trees & White Birch Trunks (Reference Town aesthetic)
  const birchTrunkMat = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, roughness: 0.6 }); // Crisp white birch trunks

  // Clustered grove anchor points across town greenbelts and meadows
  const treeGroves = [
    // Entrance park & welcome groves
    { cx: -8.5, cz: 13.0, count: 5, radius: 3.5, baseH: 4.8 },
    { cx: 8.0,  cz: 13.5, count: 5, radius: 3.2, baseH: 4.6 },
    { cx: -18.0, cz: 6.0,  count: 4, radius: 4.0, baseH: 5.0 },
    { cx: 18.0,  cz: 4.0,  count: 4, radius: 3.8, baseH: 4.8 },
    { cx: -24.0, cz: -10,  count: 5, radius: 4.5, baseH: 5.2 },
    { cx: 25.0,  cz: -8,   count: 5, radius: 4.5, baseH: 5.0 },

    // Surrounding Project 1 (Creative CAD) & Milestone 1 (PSBA)
    { cx: -38.0, cz: -35,  count: 6, radius: 5.0, baseH: 5.3 },
    { cx: -20.0, cz: -48,  count: 4, radius: 3.5, baseH: 4.6 },
    { cx: 14.0,  cz: -28,  count: 4, radius: 3.8, baseH: 4.7 },
    { cx: 32.0,  cz: -32,  count: 6, radius: 5.2, baseH: 5.2 },

    // Surrounding Project 2 (IoT & Edge) & Milestone 2 (MITAOE)
    { cx: 40.0,  cz: -58,  count: 6, radius: 5.0, baseH: 5.4 },
    { cx: 28.0,  cz: -72,  count: 5, radius: 4.0, baseH: 4.8 },
    { cx: -14.0, cz: -68,  count: 5, radius: 4.2, baseH: 4.9 },
    { cx: -32.0, cz: -80,  count: 6, radius: 5.0, baseH: 5.2 },

    // Surrounding Project 3 (Vision AI) & Milestone 3 (Maker Lab)
    { cx: -42.0, cz: -105, count: 6, radius: 5.2, baseH: 5.4 },
    { cx: -22.0, cz: -118, count: 5, radius: 4.0, baseH: 4.8 },
    { cx: 24.0,  cz: -112, count: 5, radius: 4.2, baseH: 5.0 },
    { cx: 42.0,  cz: -128, count: 6, radius: 5.2, baseH: 5.3 },

    // Surrounding Project 4 (Spatial SLAM) & Milestone 4 (Coppercloud HQ)
    { cx: 42.0,  cz: -150, count: 6, radius: 5.0, baseH: 5.2 },
    { cx: 22.0,  cz: -162, count: 4, radius: 3.8, baseH: 4.6 },
    { cx: -22.0, cz: -152, count: 5, radius: 4.2, baseH: 4.8 },
    { cx: -34.0, cz: -170, count: 6, radius: 5.0, baseH: 5.2 },

    // Surrounding Project 5 (3D Twins) & Milestone 5 (Coppercloud R&D)
    { cx: -40.0, cz: -192, count: 6, radius: 5.2, baseH: 5.4 },
    { cx: -18.0, cz: -198, count: 4, radius: 3.5, baseH: 4.7 },
    { cx: 16.0,  cz: -192, count: 4, radius: 3.8, baseH: 4.8 },
    { cx: 38.0,  cz: -202, count: 6, radius: 5.0, baseH: 5.2 },

    // Surrounding Project 6 (Clean Tech) & Milestone 6 (Clarity Lab)
    { cx: 40.0,  cz: -235, count: 6, radius: 5.2, baseH: 5.3 },
    { cx: 20.0,  cz: -242, count: 4, radius: 3.8, baseH: 4.8 },
    { cx: -18.0, cz: -238, count: 5, radius: 4.0, baseH: 4.7 },
    { cx: -36.0, cz: -255, count: 6, radius: 5.0, baseH: 5.2 },

    // Surrounding Project 7 (Robotics) & Milestone 7 (Digital Twin Lab & Graduation)
    { cx: -34.0, cz: -275, count: 6, radius: 5.0, baseH: 5.3 },
    { cx: -18.0, cz: -290, count: 5, radius: 4.2, baseH: 4.9 },
    { cx: 24.0,  cz: -275, count: 6, radius: 4.8, baseH: 5.2 },
    // Buffer Boulevard & Grand Archway Groves
    { cx: -18.0, cz: -295, count: 5, radius: 4.2, baseH: 4.9 },
    { cx: 18.0,  cz: -295, count: 5, radius: 4.2, baseH: 5.0 },
    { cx: -20.0, cz: -325, count: 5, radius: 4.4, baseH: 5.2 },
    { cx: 20.0,  cz: -325, count: 5, radius: 4.4, baseH: 5.2 },

    // Extended Project Boulevard Groves
    { cx: -46.0, cz: -370, count: 6, radius: 5.2, baseH: 5.4 },
    { cx: 14.0,  cz: -380, count: 5, radius: 4.2, baseH: 4.8 },
    { cx: -16.0, cz: -420, count: 5, radius: 4.0, baseH: 4.9 },
    { cx: 28.0,  cz: -450, count: 6, radius: 5.0, baseH: 5.2 },
    { cx: -32.0, cz: -490, count: 5, radius: 4.5, baseH: 5.1 },
    { cx: 52.0,  cz: -530, count: 6, radius: 5.2, baseH: 5.3 },
    { cx: 16.0,  cz: -570, count: 5, radius: 4.0, baseH: 4.8 },
    { cx: -46.0, cz: -610, count: 6, radius: 5.2, baseH: 5.4 },
    { cx: 14.0,  cz: -650, count: 5, radius: 4.5, baseH: 5.0 },
    { cx: -44.0, cz: -680, count: 6, radius: 5.0, baseH: 5.2 },
    { cx: 46.0,  cz: -720, count: 6, radius: 5.2, baseH: 5.4 },
    { cx: -18.0, cz: -760, count: 5, radius: 4.5, baseH: 5.0 },
    { cx: 26.0,  cz: -785, count: 6, radius: 5.0, baseH: 5.2 }
  ];

  let treeIdx = 0;
  treeGroves.forEach(grove => {
    // Spawn tree bunch clustered tightly around the grove center
    for (let i = 0; i < grove.count; i++) {
      treeIdx++;
      // Distribute naturally within cluster: center tree + surrounding ring
      let ox = 0, oz = 0;
      if (i > 0) {
        const angle = (i * ((Math.PI * 2) / (grove.count - 1))) + ((treeIdx % 5) * 0.2);
        const dist = 1.3 + (i / grove.count) * (grove.radius - 1.2);
        ox = Math.cos(angle) * dist;
        oz = Math.sin(angle) * dist;
      }

      const tx = grove.cx + ox;
      const tz = grove.cz + oz;
      const th = grove.baseH * (0.85 + ((treeIdx % 7) * 0.05));
      const matIdx = (treeIdx * 2 + (i % 3)) % leafMats.length;
      const isBirch = (treeIdx % 3 === 0);

      const treeGroup = new THREE.Group();
      treeGroup.position.set(tx, 0, tz);

      const chosenLeafMat = leafMats[matIdx];
      const trunkMaterial = isBirch ? birchTrunkMat : trunkMat;

      // Tree trunk
      const trunkHeight = th * 0.40;
      const trunkRadius = 0.16 + (th * 0.02);
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(trunkRadius * 0.7, trunkRadius, trunkHeight, 6), trunkMaterial);
      trunk.position.y = trunkHeight / 2;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      // Low-poly crown stylized shapes (Dual spheres, cone pine, and stylized block/cone)
      const crownType = treeIdx % 3;
      if (crownType === 0) {
        // Round fluffy dual spheres (Warm broadleaf)
        const crown1 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.4 * (th / 4.8), 0), chosenLeafMat);
        crown1.position.y = trunkHeight + 0.85;
        crown1.castShadow = true;
        treeGroup.add(crown1);

        const crown2 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.05 * (th / 4.8), 0), chosenLeafMat);
        crown2.position.set(0.25, trunkHeight + 1.8, 0.2);
        crown2.castShadow = true;
        treeGroup.add(crown2);
      } else if (crownType === 1) {
        // Tiered warm cone pine
        const t1 = new THREE.Mesh(new THREE.ConeGeometry(1.7 * (th / 4.8), 2.0, 5), chosenLeafMat);
        t1.position.y = trunkHeight + 0.8;
        t1.castShadow = true;
        treeGroup.add(t1);

        const t2 = new THREE.Mesh(new THREE.ConeGeometry(1.2 * (th / 4.8), 1.8, 5), chosenLeafMat);
        t2.position.y = trunkHeight + 1.75;
        t2.castShadow = true;
        treeGroup.add(t2);
      } else {
        // Stylized cute cubic & pyramid canopy
        const box = new THREE.Mesh(new THREE.BoxGeometry(2.1 * (th / 4.8), 2.3 * (th / 4.8), 2.1 * (th / 4.8)), chosenLeafMat);
        box.position.y = trunkHeight + 1.15;
        box.rotation.y = (treeIdx % 4) * (Math.PI / 8);
        box.castShadow = true;
        treeGroup.add(box);

        const tip = new THREE.Mesh(new THREE.ConeGeometry(1.15 * (th / 4.8), 1.35, 4), chosenLeafMat);
        tip.position.y = trunkHeight + 2.55;
        tip.rotation.y = box.rotation.y;
        tip.castShadow = true;
        treeGroup.add(tip);
      }

      scene.add(treeGroup);
    }
  });

  // 5. Flower bushes along the sidewalk edges (Warm muddy botanical accents)
  const bushColors = [0x789262, 0x93A277, 0xD4A373, 0xC47B6E, 0x9E6B7A];
  for (let b = 0; b < 100; b++) {
    const bColor = bushColors[b % bushColors.length];
    const bMat = new THREE.MeshStandardMaterial({ color: bColor, roughness: 0.85, flatShading: true });
    const bush = new THREE.Mesh(new THREE.DodecahedronGeometry(0.55 + (b % 3) * 0.15, 0), bMat);

    if (roadCurve) {
      const t = Math.min(0.98, (b + 1) / 102);
      const pt = roadCurve.getPointAt(t);
      const tangent = roadCurve.getTangentAt(t).normalize();
      const sideVec = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 1, 0)).normalize();
      const side = (b % 2 === 0 ? 1 : -1);
      const offset = sideVec.multiplyScalar(side * (3.8 + (b % 3) * 0.7));
      bush.position.set(pt.x + offset.x, 0.35, pt.z + offset.z);
    } else {
      const side = (b % 2 === 0 ? 1 : -1);
      const bz = -10 - (b * 7);
      const bx = side * (5.5 + (b % 4) * 0.8);
      bush.position.set(bx, 0.35, bz);
    }
    bush.castShadow = true;
    scene.add(bush);
  }
}

/* --------------------------------------------------------------------------
   7B. FLUFFY LOW-POLY SKY CLOUDS
   -------------------------------------------------------------------------- */
function buildSkyClouds() {
  cloudGroups = [];
  const cloudMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: 0.95,
    metalness: 0.0,
    flatShading: true
  });

  // 16 clouds scattered across the sky at varying altitudes and speeds
  const cloudConfigs = [
    { x: -50, y: 38, z: 20,   s: 1.2, speed: 1.8 },
    { x: 30,  y: 42, z: 10,   s: 1.0, speed: 1.4 },
    { x: -20, y: 35, z: -25,  s: 1.4, speed: 2.1 },
    { x: 45,  y: 46, z: -40,  s: 1.1, speed: 1.6 },
    { x: -60, y: 40, z: -70,  s: 1.5, speed: 2.0 },
    { x: 10,  y: 44, z: -90,  s: 1.2, speed: 1.7 },
    { x: 55,  y: 37, z: -115, s: 1.3, speed: 1.5 },
    { x: -35, y: 45, z: -135, s: 1.6, speed: 2.2 },
    { x: 35,  y: 41, z: -160, s: 1.2, speed: 1.8 },
    { x: -50, y: 43, z: -185, s: 1.4, speed: 1.9 },
    { x: 20,  y: 39, z: -210, s: 1.1, speed: 1.5 },
    { x: -25, y: 47, z: -235, s: 1.5, speed: 2.3 },
    { x: 48,  y: 42, z: -260, s: 1.3, speed: 1.7 },
    { x: -10, y: 44, z: -285, s: 1.4, speed: 2.0 },
    { x: -65, y: 36, z: -310, s: 1.2, speed: 1.6 },
    { x: 35,  y: 45, z: -330, s: 1.5, speed: 2.1 }
  ];

  cloudConfigs.forEach(cfg => {
    const cg = new THREE.Group();
    cg.position.set(cfg.x, cfg.y, cfg.z);
    cg.userData = { speed: cfg.speed, initialZ: cfg.z };

    // Compound fluffy cloud composed of overlapping low-poly spheres
    const puffGeos = [
      { r: 2.2, ox: 0,    oy: 0,    oz: 0 },
      { r: 1.8, ox: -1.8, oy: -0.2, oz: 0.3 },
      { r: 1.9, ox: 1.9,  oy: -0.1, oz: -0.2 },
      { r: 1.4, ox: -3.2, oy: -0.5, oz: 0.1 },
      { r: 1.5, ox: 3.3,  oy: -0.4, oz: 0.2 },
      { r: 1.6, ox: 0.8,  oy: 0.8,  oz: 0.4 },
      { r: 1.4, ox: -0.9, oy: 0.7,  oz: -0.3 }
    ];

    puffGeos.forEach(p => {
      const puff = new THREE.Mesh(new THREE.DodecahedronGeometry(p.r * cfg.s, 1), cloudMat);
      puff.position.set(p.ox * cfg.s, p.oy * cfg.s, p.oz * cfg.s);
      puff.castShadow = true; // Clouds cast subtle soft shadows on the terrain!
      cg.add(puff);
    });

    scene.add(cg);
    cloudGroups.push(cg);
  });
}

function updateSkyClouds(delta) {
  if (!cloudGroups || !cloudGroups.length) return;
  // Slowly drift clouds across the X-axis from west to east
  cloudGroups.forEach(cg => {
    cg.position.x += (cg.userData.speed || 1.8) * delta;
    // Wrap around gracefully when drifting past bounds
    if (cg.position.x > 180) {
      cg.position.x = -180;
    }
  });
}

/* --------------------------------------------------------------------------
   7C. DIRECTIONAL SCENIC BIOMES
   - North: Small, dreamy, pastel rolling hills with soft chalk peaks
   - West: Dense, whimsical green woodland forest with birch groves
   - East: Sparkling crystal water lakes & ponds with docks, lily pads and reeds
   -------------------------------------------------------------------------- */
function buildScenicBiomes() {
  buildDreamyNorthernHills();
  buildWesternDeepForest();
  buildEasternPondsAndLakes();
}

// 1. NORTH: SMALL, DREAMY ROLLING CLAY HILLS (BEHIND SPAWN & NORTH HORIZON)
function buildDreamyNorthernHills() {
  const hillMats = [
    new THREE.MeshStandardMaterial({ color: 0xD48459, roughness: 0.88, flatShading: true }), // Soft warm terracotta clay
    new THREE.MeshStandardMaterial({ color: 0xDE966E, roughness: 0.85, flatShading: true }), // Gentle peach hill
    new THREE.MeshStandardMaterial({ color: 0xC8764B, roughness: 0.90, flatShading: true })  // Sunbaked apricot slope
  ];
  const chalkCapMat = new THREE.MeshStandardMaterial({ color: 0xFEF3C7, roughness: 0.82, flatShading: true }); // Creamy sunlit butter cap

  // Dreamy, gentle mounds & rounded hills along the northern perimeter
  const hills = [
    { x: -90, z: 75,  r: 22, h: 22, s: 7, cap: true },
    { x: -55, z: 92,  r: 26, h: 26, s: 8, cap: true },
    { x: -20, z: 80,  r: 20, h: 19, s: 7, cap: false },
    { x: 15,  z: 88,  r: 24, h: 24, s: 8, cap: true },
    { x: 50,  z: 82,  r: 22, h: 21, s: 7, cap: false },
    { x: 85,  z: 75,  r: 25, h: 25, s: 8, cap: true },
    { x: -115, z: 98, r: 28, h: 27, s: 7, cap: true },
    { x: 110, z: 95,  r: 27, h: 26, s: 8, cap: true }
  ];

  hills.forEach((h, idx) => {
    const hGroup = new THREE.Group();
    hGroup.position.set(h.x, 0, h.z);

    const mat = hillMats[idx % hillMats.length];
    // Rounded dreamy mound using faceted low-poly cone with wider base
    const moundGeo = new THREE.ConeGeometry(h.r, h.h, h.s);
    const mound = new THREE.Mesh(moundGeo, mat);
    mound.position.y = h.h / 2;
    mound.rotation.y = idx * 0.7;
    mound.castShadow = true;
    mound.receiveShadow = true;
    hGroup.add(mound);

    // Subsidiary gentle shoulder
    const subGeo = new THREE.ConeGeometry(h.r * 0.6, h.h * 0.62, h.s);
    const sub = new THREE.Mesh(subGeo, mat);
    sub.position.set(h.r * 0.35, (h.h * 0.62) / 2, h.r * 0.2);
    sub.rotation.y = mound.rotation.y + 0.5;
    sub.castShadow = true;
    sub.receiveShadow = true;
    hGroup.add(sub);

    // Soft dreamy creamy cap
    if (h.cap) {
      const capH = h.h * 0.25;
      const cap = new THREE.Mesh(new THREE.ConeGeometry(h.r * 0.25, capH, h.s), chalkCapMat);
      cap.position.y = h.h - (capH / 2);
      cap.rotation.y = mound.rotation.y;
      cap.castShadow = true;
      hGroup.add(cap);
    }

    scene.add(hGroup);
  });
}

// 2. WEST: DENSE ENCHANTED FOREST (ALL WEST FLANK FROM X = -50 TO -120)
function buildWesternDeepForest() {
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78553D, roughness: 0.85 });
  const birchTrunkMat = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, roughness: 0.6 });
  const forestLeafMats = [
    new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.74, flatShading: true }), // Deep Lush Forest Green
    new THREE.MeshStandardMaterial({ color: 0x15803D, roughness: 0.72, flatShading: true }), // Rich Emerald Canopy
    new THREE.MeshStandardMaterial({ color: 0x22C55E, roughness: 0.70, flatShading: true }), // Fresh Vibrant Green
    new THREE.MeshStandardMaterial({ color: 0xD9776E, roughness: 0.74, flatShading: true }), // Warm Muddy Terracotta Pink Tree
    new THREE.MeshStandardMaterial({ color: 0xA06B82, roughness: 0.74, flatShading: true })  // Warm Earthy Plum Heather Tree
  ];

  // Deep woodland grove cluster centers along the western territory
  const forestGroves = [
    { cx: -60,  cz: 20,   count: 7, radius: 8 },
    { cx: -85,  cz: 10,   count: 9, radius: 10 },
    { cx: -65,  cz: -15,  count: 8, radius: 9 },
    { cx: -90,  cz: -30,  count: 10, radius: 11 },
    { cx: -68,  cz: -60,  count: 8, radius: 9 },
    { cx: -95,  cz: -85,  count: 11, radius: 12 },
    { cx: -72,  cz: -115, count: 8, radius: 9 },
    { cx: -98,  cz: -140, count: 10, radius: 11 },
    { cx: -68,  cz: -170, count: 8, radius: 9 },
    { cx: -95,  cz: -205, count: 11, radius: 12 },
    { cx: -70,  cz: -235, count: 8, radius: 9 },
    { cx: -92,  cz: -265, count: 10, radius: 11 },
    { cx: -65,  cz: -295, count: 8, radius: 9 }
  ];

  let treeNum = 0;
  forestGroves.forEach(grove => {
    for (let i = 0; i < grove.count; i++) {
      treeNum++;
      const angle = (i * ((Math.PI * 2) / grove.count)) + ((treeNum % 7) * 0.25);
      const dist = (i === 0) ? 0 : 2.0 + (i / grove.count) * (grove.radius - 2.0);
      const tx = grove.cx + Math.cos(angle) * dist;
      const tz = grove.cz + Math.sin(angle) * dist;
      const th = 4.2 + ((treeNum % 6) * 0.45);
      const isBirch = (treeNum % 3 === 0);

      const tree = new THREE.Group();
      tree.position.set(tx, 0, tz);

      const tH = th * 0.42;
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.28, tH, 6),
        isBirch ? birchTrunkMat : trunkMat
      );
      trunk.position.y = tH / 2;
      trunk.castShadow = true;
      tree.add(trunk);

      const lMat = forestLeafMats[treeNum % forestLeafMats.length];
      if (treeNum % 3 === 0) {
        // Fluffy multi-dome canopy
        const c1 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.6 * (th / 4.8), 0), lMat);
        c1.position.y = tH + 0.9;
        c1.castShadow = true;
        tree.add(c1);

        const c2 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.15 * (th / 4.8), 0), lMat);
        c2.position.set(0.3, tH + 1.9, 0.2);
        c2.castShadow = true;
        tree.add(c2);
      } else if (treeNum % 3 === 1) {
        // Tall alpine cone
        const p1 = new THREE.Mesh(new THREE.ConeGeometry(1.8 * (th / 4.8), 2.2, 5), lMat);
        p1.position.y = tH + 0.85;
        p1.castShadow = true;
        tree.add(p1);

        const p2 = new THREE.Mesh(new THREE.ConeGeometry(1.3 * (th / 4.8), 1.9, 5), lMat);
        p2.position.y = tH + 1.85;
        p2.castShadow = true;
        tree.add(p2);
      } else {
        // Broadleaf layered canopy
        const b1 = new THREE.Mesh(new THREE.BoxGeometry(2.2 * (th / 4.8), 2.3 * (th / 4.8), 2.2 * (th / 4.8)), lMat);
        b1.position.y = tH + 1.2;
        b1.rotation.y = (treeNum % 4) * (Math.PI / 8);
        b1.castShadow = true;
        tree.add(b1);
      }

      scene.add(tree);
    }
  });
}

// 3. EAST: NATURAL ORGANIC SHAPED LAKES & PONDS (ROCKS, SHORELINE GRASS, DOCKS, LILIES)
function buildEasternPondsAndLakes() {
  const waterMat = new THREE.MeshPhysicalMaterial({
    color: 0x38BDF8, // Vibrant crystal cyan blue
    roughness: 0.12,
    metalness: 0.08,
    transmission: 0.6,
    ior: 1.333,
    reflectivity: 0.85,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08
  });

  const shoreMat = new THREE.MeshStandardMaterial({
    color: 0xF59E0B, // Sunlit golden shoreline sand
    roughness: 0.85,
    flatShading: true
  });

  const rockMats = [
    new THREE.MeshStandardMaterial({ color: 0x78716C, roughness: 0.9, flatShading: true }), // Natural medium stone grey
    new THREE.MeshStandardMaterial({ color: 0x57534E, roughness: 0.88, flatShading: true }), // Deep charcoal river rock
    new THREE.MeshStandardMaterial({ color: 0x94908D, roughness: 0.88, flatShading: true })  // Soft river pebble grey
  ];

  const grassTuftMat = new THREE.MeshStandardMaterial({
    color: 0x65A30D, // Rich warm green riverbank grass
    roughness: 0.8,
    flatShading: true
  });

  const lilyMat = new THREE.MeshStandardMaterial({
    color: 0x4ADE80, // Bright emerald water lily pad
    roughness: 0.6,
    flatShading: true
  });

  const flowerMat = new THREE.MeshStandardMaterial({
    color: 0xD9776E, // Warm dusty terracotta rose lotus bloom
    roughness: 0.65
  });

  const dockWoodMat = new THREE.MeshStandardMaterial({
    color: 0x92400E, // Rustic timber dock wood
    roughness: 0.8
  });

  const reedMat = new THREE.MeshStandardMaterial({
    color: 0x4D7C0F, // Green shoreline reeds
    roughness: 0.8
  });

  // Helper to create an organic, natural lake boundary using harmonic radial lobe deformation
  function createOrganicLakeMesh(baseRx, baseRz, lobes, amp, material, height, yPos) {
    const segments = 48;
    const shape = new THREE.Shape();
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      // Natural organic lobe variation
      const rMod = 1.0 + Math.sin(theta * lobes) * amp + Math.cos(theta * 2) * (amp * 0.5);
      const px = Math.cos(theta) * baseRx * rMod;
      const pz = Math.sin(theta) * baseRz * rMod;
      if (i === 0) shape.moveTo(px, pz);
      else shape.lineTo(px, pz);
    }

    const extrudeSettings = { depth: height, bevelEnabled: false };
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.rotateX(-Math.PI / 2); // Orient horizontally
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.y = yPos;
    return mesh;
  }

  // Scenic water bodies along the Eastern landscape
  const waterBodies = [
    // 1. Serene Morning Pond near Entrance (East)
    { cx: 58, cz: 5, rx: 16, rz: 14, lobes: 3, amp: 0.16, dock: true, dockRot: 0.3 },
    // 2. Crystal Lake adjacent to IoT & Tech quarter
    { cx: 68, cz: -85, rx: 24, rz: 18, lobes: 4, amp: 0.18, dock: true, dockRot: -0.4 },
    // 3. Mirror Pond between R&D stations
    { cx: 62, cz: -165, rx: 18, rz: 15, lobes: 3, amp: 0.15, dock: false },
    // 4. Grand Tranquil Lake near Milestone 6 & graduation grounds
    { cx: 72, cz: -250, rx: 26, rz: 22, lobes: 5, amp: 0.17, dock: true, dockRot: 0.15 }
  ];

  waterBodies.forEach((wb, lakeIdx) => {
    const waterGroup = new THREE.Group();
    waterGroup.position.set(wb.cx, 0, wb.cz);

    // Natural organic sandy shoreline bank
    const shoreMesh = createOrganicLakeMesh(wb.rx + 2.0, wb.rz + 2.0, wb.lobes, wb.amp, shoreMat, 0.08, 0.01);
    shoreMesh.receiveShadow = true;
    waterGroup.add(shoreMesh);

    // Natural organic crystal water surface
    const waterMesh = createOrganicLakeMesh(wb.rx, wb.rz, wb.lobes, wb.amp, waterMat, 0.08, 0.05);
    waterMesh.receiveShadow = true;
    waterGroup.add(waterMesh);

    // Shoreline cluster of natural low-poly river boulders & pebbles
    const numRocks = 18 + lakeIdx * 4;
    for (let k = 0; k < numRocks; k++) {
      const angle = (k / numRocks) * Math.PI * 2 + (lakeIdx * 0.4);
      const rMod = 1.0 + Math.sin(angle * wb.lobes) * wb.amp;
      const dist = (wb.rx * rMod) + ((k % 3) * 0.8) + 0.4;
      const rx = Math.cos(angle) * dist;
      const rz = Math.sin(angle) * (dist * (wb.rz / wb.rx));

      const rockScale = 0.5 + ((k % 4) * 0.3);
      const rock = new THREE.Mesh(
        new THREE.DodecahedronGeometry(rockScale, 0),
        rockMats[k % rockMats.length]
      );
      rock.position.set(rx, rockScale * 0.6, rz);
      rock.rotation.set((k % 3) * 0.4, angle, (k % 2) * 0.3);
      rock.castShadow = true;
      rock.receiveShadow = true;
      waterGroup.add(rock);
    }

    // Lush shoreline grass tufts sprouting around the water edge
    const numGrass = 22 + lakeIdx * 5;
    for (let g = 0; g < numGrass; g++) {
      const gAngle = (g / numGrass) * Math.PI * 2 + 0.2;
      const rMod = 1.0 + Math.sin(gAngle * wb.lobes) * wb.amp;
      const gDist = (wb.rx * rMod) + 1.2 + ((g % 3) * 0.6);
      const gx = Math.cos(gAngle) * gDist;
      const gz = Math.sin(gAngle) * (gDist * (wb.rz / wb.rx));

      const grassTuft = new THREE.Group();
      grassTuft.position.set(gx, 0, gz);
      for (let b = 0; b < 3; b++) {
        const blade = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.7 + (b % 3) * 0.25, 4), grassTuftMat);
        blade.position.set((b - 1) * 0.18, 0.35, 0);
        blade.rotation.z = (b - 1) * 0.2;
        blade.castShadow = true;
        grassTuft.add(blade);
      }
      waterGroup.add(grassTuft);
    }

    // Floating water lily pads and lotus blooms inside the organic lake
    for (let l = 0; l < 8; l++) {
      const lAngle = (l * 0.8) + 0.4;
      const lDist = (wb.rx * 0.35) + ((l % 4) * (wb.rx * 0.12));
      const lx = Math.cos(lAngle) * lDist;
      const lz = Math.sin(lAngle) * (lDist * (wb.rz / wb.rx));

      const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.04, 8), lilyMat);
      pad.position.set(lx, 0.15, lz);
      waterGroup.add(pad);

      if (l % 2 === 0) {
        const bloom = new THREE.Mesh(new THREE.DodecahedronGeometry(0.35, 0), flowerMat);
        bloom.position.set(lx, 0.28, lz);
        bloom.castShadow = true;
        waterGroup.add(bloom);
      }
    }

    // Shoreline water reeds
    for (let r = 0; r < 14; r++) {
      const rAngle = r * 0.48;
      const rx = Math.cos(rAngle) * (wb.rx + 0.6);
      const rz = Math.sin(rAngle) * (wb.rz + 0.6);

      const reed = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.07, 1.6 + (r % 3) * 0.4, 4), reedMat);
      reed.position.set(rx, 0.8, rz);
      reed.rotation.z = ((r % 5) - 2) * 0.05;
      reed.castShadow = true;
      waterGroup.add(reed);
    }

    // Rustic wooden dock extending naturally into the water
    if (wb.dock) {
      const dockGroup = new THREE.Group();
      dockGroup.position.set(-wb.rx * 0.75, 0, 0);
      dockGroup.rotation.y = wb.dockRot;

      const deck = new THREE.Mesh(new THREE.BoxGeometry(7.0, 0.22, 2.4), dockWoodMat);
      deck.position.set(2.0, 0.25, 0);
      deck.castShadow = true;
      deck.receiveShadow = true;
      dockGroup.add(deck);

      const postGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.9, 6);
      [0.0, 2.2, 4.4].forEach(px => {
        [-1.0, 1.0].forEach(pz => {
          const post = new THREE.Mesh(postGeo, dockWoodMat);
          post.position.set(px, 0.2, pz);
          post.castShadow = true;
          dockGroup.add(post);
        });
      });

      waterGroup.add(dockGroup);
    }

    scene.add(waterGroup);
  });
}

/* --------------------------------------------------------------------------
   7D. ANIMATED WILDLIFE (HOPPING RABBITS, SWIMMING DUCKS & GRAZING DEER)
   -------------------------------------------------------------------------- */
function buildAnimatedWildlife() {
  worldAnimals = [];

  // 1. SWIMMING DUCKS IN THE EASTERN LAKES & PONDS
  const duckWhiteMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.6 });
  const duckBeakMat = new THREE.MeshStandardMaterial({ color: 0xF59E0B, roughness: 0.4 }); // Amber yellow beak

  const duckPonds = [
    { cx: 58, cz: 5,   radius: 7, speed: 0.6, phase: 0.0 },
    { cx: 58, cz: 5,   radius: 5, speed: -0.5, phase: 2.5 },
    { cx: 68, cz: -85, radius: 10, speed: 0.5, phase: 1.2 },
    { cx: 68, cz: -85, radius: 6, speed: -0.65, phase: 3.8 },
    { cx: 72, cz: -250, radius: 12, speed: 0.45, phase: 0.8 },
    { cx: 72, cz: -250, radius: 7, speed: -0.55, phase: 4.1 }
  ];

  duckPonds.forEach(dp => {
    const duckGroup = new THREE.Group();

    // Body
    const body = new THREE.Mesh(new THREE.ConeGeometry(0.4, 0.8, 6), duckWhiteMat);
    body.rotation.x = Math.PI / 2;
    body.position.y = 0.2;
    body.castShadow = true;
    duckGroup.add(body);

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.25, 8, 8), duckWhiteMat);
    head.position.set(0, 0.38, 0.35);
    head.castShadow = true;
    duckGroup.add(head);

    // Beak
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.22, 4), duckBeakMat);
    beak.rotation.x = Math.PI / 2;
    beak.position.set(0, 0.36, 0.58);
    duckGroup.add(beak);

    duckGroup.userData = {
      type: "duck",
      cx: dp.cx,
      cz: dp.cz,
      radius: dp.radius,
      speed: dp.speed,
      angle: dp.phase,
      bobOffset: Math.random() * Math.PI
    };

    scene.add(duckGroup);
    worldAnimals.push(duckGroup);
  });

  // 2. CUTE HOPPING BUNNIES IN MEADOWS & WOODLAND CLEARINGS
  const bunnyMat = new THREE.MeshStandardMaterial({ color: 0xF1F5F9, roughness: 0.75, flatShading: true }); // Fluffy snow bunny
  const earInnerMat = new THREE.MeshStandardMaterial({ color: 0xFCA5A5, roughness: 0.5 }); // Pink ear inner

  const bunnyLocations = [
    { x: -14, z: 12, range: 4.0 },
    { x: 12,  z: 16, range: 3.5 },
    { x: -35, z: -20, range: 4.5 },
    { x: -28, z: -70, range: 4.0 },
    { x: 34,  z: -125, range: 4.2 },
    { x: -38, z: -160, range: 5.0 },
    { x: 26,  z: -210, range: 4.0 },
    { x: -22, z: -250, range: 4.5 }
  ];

  bunnyLocations.forEach(bl => {
    const bunny = new THREE.Group();

    // Body
    const bBody = new THREE.Mesh(new THREE.DodecahedronGeometry(0.42, 0), bunnyMat);
    bBody.position.y = 0.35;
    bBody.castShadow = true;
    bunny.add(bBody);

    // Head
    const bHead = new THREE.Mesh(new THREE.SphereGeometry(0.28, 6, 6), bunnyMat);
    bHead.position.set(0, 0.62, 0.22);
    bHead.castShadow = true;
    bunny.add(bHead);

    // Left Ear
    const earL = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.36, 4), bunnyMat);
    earL.position.set(-0.12, 0.88, 0.18);
    earL.rotation.z = -0.15;
    bunny.add(earL);

    // Right Ear
    const earR = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.36, 4), bunnyMat);
    earR.position.set(0.12, 0.88, 0.18);
    earR.rotation.z = 0.15;
    bunny.add(earR);

    // Fluffy tail
    const tail = new THREE.Mesh(new THREE.SphereGeometry(0.12, 4, 4), bunnyMat);
    tail.position.set(0, 0.32, -0.4);
    bunny.add(tail);

    bunny.position.set(bl.x, 0, bl.z);
    bunny.userData = {
      type: "bunny",
      originX: bl.x,
      originZ: bl.z,
      range: bl.range,
      hopTime: Math.random() * 5.0,
      direction: Math.random() * Math.PI * 2
    };

    scene.add(bunny);
    worldAnimals.push(bunny);
  });

  // 3. GRAZING FAWNS / DEER IN THE WESTERN FOREST CLEARINGS
  const deerFurMat = new THREE.MeshStandardMaterial({ color: 0x9A3412, roughness: 0.8, flatShading: true }); // Warm chestnut fawn coat
  const deerSpotMat = new THREE.MeshStandardMaterial({ color: 0xFEF3C7, roughness: 0.7 }); // Cream belly & spots
  const antlerMat = new THREE.MeshStandardMaterial({ color: 0x78350F, roughness: 0.85 });

  const deerLocations = [
    { x: -55, z: 5,   rot: 0.8 },
    { x: -75, z: -45, rot: -0.5 },
    { x: -80, z: -125, rot: 1.2 },
    { x: -72, z: -190, rot: -0.9 },
    { x: -62, z: -275, rot: 0.4 }
  ];

  deerLocations.forEach(dl => {
    const deer = new THREE.Group();

    // Torso
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.7, 1.4), deerFurMat);
    torso.position.y = 1.2;
    torso.castShadow = true;
    deer.add(torso);

    // 4 Slender Legs
    const legGeo = new THREE.CylinderGeometry(0.08, 0.06, 1.0, 6);
    [[-0.32, -0.45], [0.32, -0.45], [-0.32, 0.45], [0.32, 0.45]].forEach(coord => {
      const leg = new THREE.Mesh(legGeo, deerFurMat);
      leg.position.set(coord[0], 0.5, coord[1]);
      leg.castShadow = true;
      deer.add(leg);
    });

    // Neck & Head Pivot (for gentle grazing animation)
    const neckPivot = new THREE.Group();
    neckPivot.position.set(0, 1.4, 0.6);

    const neck = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.75, 0.35), deerFurMat);
    neck.position.set(0, 0.3, 0.15);
    neck.rotation.x = -0.45;
    neck.castShadow = true;
    neckPivot.add(neck);

    const dHead = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.38, 0.55), deerFurMat);
    dHead.position.set(0, 0.65, 0.35);
    dHead.castShadow = true;
    neckPivot.add(dHead);

    // Antlers
    const a1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5, 4), antlerMat);
    a1.position.set(-0.15, 0.95, 0.3);
    a1.rotation.z = -0.35;
    neckPivot.add(a1);

    const a2 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5, 4), antlerMat);
    a2.position.set(0.15, 0.95, 0.3);
    a2.rotation.z = 0.35;
    neckPivot.add(a2);

    deer.add(neckPivot);

    deer.position.set(dl.x, 0, dl.z);
    deer.rotation.y = dl.rot;
    deer.userData = {
      type: "deer",
      neckPivot: neckPivot,
      baseNeckRot: -0.45,
      grazeTime: Math.random() * 6.0
    };

    scene.add(deer);
    worldAnimals.push(deer);
  });

  // 4. PLAYFUL CATS ROAMING TOWN SIDEWALKS, BENCHES & GARDENS
  const catFurMats = [
    new THREE.MeshStandardMaterial({ color: 0xF97316, roughness: 0.75, flatShading: true }), // Ginger tabby orange
    new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.70, flatShading: true }), // Sleek midnight black
    new THREE.MeshStandardMaterial({ color: 0xF8FAFC, roughness: 0.65, flatShading: true }), // Snow white
    new THREE.MeshStandardMaterial({ color: 0x94A3B8, roughness: 0.75, flatShading: true })  // Soft smoky grey
  ];

  const catLocations = [
    { x: -5.0, z: 8.0,   range: 3.5, speed: 0.8 },  // Spawn town plaza
    { x: 12.0, z: -25.0, range: 4.0, speed: 0.9 },  // Milestone 1 sidewalk
    { x: -22.0, z: -40.0, range: 3.8, speed: 0.85 }, // Near Creative CAD studio
    { x: 26.0, z: -70.0, range: 4.2, speed: 0.8 },  // Near Milestone 2 & IoT
    { x: -16.0, z: -105.0, range: 4.0, speed: 0.9 }, // Near Maker Lab
    { x: 18.0, z: -160.0, range: 3.5, speed: 0.85 }, // Lakeside / Coppercloud R&D
    { x: -10.0, z: -260.0, range: 4.0, speed: 0.8 }  // Graduation plaza
  ];

  catLocations.forEach((cl, cIdx) => {
    const cat = new THREE.Group();
    const mat = catFurMats[cIdx % catFurMats.length];

    // Body
    const cBody = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.3, 0.6), mat);
    cBody.position.y = 0.35;
    cBody.castShadow = true;
    cat.add(cBody);

    // Head
    const cHead = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.26, 0.28), mat);
    cHead.position.set(0, 0.46, 0.32);
    cHead.castShadow = true;
    cat.add(cHead);

    // Pointy Ears
    const earL = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.14, 3), mat);
    earL.position.set(-0.09, 0.63, 0.32);
    cat.add(earL);

    const earR = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.14, 3), mat);
    earR.position.set(0.09, 0.63, 0.32);
    cat.add(earR);

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.3, 4);
    const legFL = new THREE.Mesh(legGeo, mat);
    legFL.position.set(-0.11, 0.15, 0.2);
    cat.add(legFL);

    const legFR = new THREE.Mesh(legGeo, mat);
    legFR.position.set(0.11, 0.15, 0.2);
    cat.add(legFR);

    const legBL = new THREE.Mesh(legGeo, mat);
    legBL.position.set(-0.11, 0.15, -0.2);
    cat.add(legBL);

    const legBR = new THREE.Mesh(legGeo, mat);
    legBR.position.set(0.11, 0.15, -0.2);
    cat.add(legBR);

    // Upright curved tail pivot
    const tailPivot = new THREE.Group();
    tailPivot.position.set(0, 0.45, -0.28);
    const tailMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.42, 4), mat);
    tailMesh.position.set(0, 0.2, -0.06);
    tailMesh.rotation.x = -0.35;
    tailPivot.add(tailMesh);
    cat.add(tailPivot);

    cat.position.set(cl.x, 0, cl.z);
    cat.userData = {
      type: "cat",
      originX: cl.x,
      originZ: cl.z,
      range: cl.range,
      speed: cl.speed,
      walkTime: Math.random() * 8.0,
      tailPivot: tailPivot,
      legs: [legFL, legFR, legBL, legBR],
      direction: Math.random() * Math.PI * 2
    };

    scene.add(cat);
    worldAnimals.push(cat);
  });

  // 5. ENERGETIC DOGS TROTTING & WAGGING TAILS ALONG ROADS & PATHS
  const dogFurMats = [
    new THREE.MeshStandardMaterial({ color: 0xD97706, roughness: 0.8, flatShading: true }), // Golden retriever honey
    new THREE.MeshStandardMaterial({ color: 0x78350F, roughness: 0.85, flatShading: true }), // Chocolate lab brown
    new THREE.MeshStandardMaterial({ color: 0xF5F5F4, roughness: 0.7, flatShading: true }),  // Cream husky white
    new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8, flatShading: true })   // Dark slate terrier
  ];

  const dogLocations = [
    { x: 6.0,  z: 6.0,   range: 5.0, speed: 1.4 },  // Spawn entrance dog
    { x: -10.0, z: -30.0, range: 4.8, speed: 1.5 }, // Near PSBA School
    { x: 22.0, z: -55.0, range: 5.5, speed: 1.6 },  // MITAOE campus side
    { x: -8.0,  z: -140.0, range: 5.2, speed: 1.45 }, // SLAM AI walkway
    { x: 12.0, z: -195.0, range: 5.0, speed: 1.5 }, // 3D Twins path
    { x: -6.0, z: -240.0, range: 5.5, speed: 1.4 }  // Near Clean Tech / Clarity Lab
  ];

  dogLocations.forEach((dl, dIdx) => {
    const dog = new THREE.Group();
    const mat = dogFurMats[dIdx % dogFurMats.length];

    // Torso
    const dBody = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.85), mat);
    dBody.position.y = 0.48;
    dBody.castShadow = true;
    dog.add(dBody);

    // Head
    const dHead = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.34, 0.42), mat);
    dHead.position.set(0, 0.65, 0.45);
    dHead.castShadow = true;
    dog.add(dHead);

    // Snout / Muzzle
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.18, 0.28), mat);
    snout.position.set(0, 0.58, 0.72);
    dog.add(snout);

    // Floppy cute ears
    const earGeo = new THREE.BoxGeometry(0.08, 0.22, 0.12);
    const earL = new THREE.Mesh(earGeo, mat);
    earL.position.set(-0.2, 0.68, 0.42);
    earL.rotation.z = -0.25;
    dog.add(earL);

    const earR = new THREE.Mesh(earGeo, mat);
    earR.position.set(0.2, 0.68, 0.42);
    earR.rotation.z = 0.25;
    dog.add(earR);

    // 4 Animated Trot Legs
    const dLegGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.45, 6);
    const legFL = new THREE.Mesh(dLegGeo, mat);
    legFL.position.set(-0.16, 0.225, 0.3);
    dog.add(legFL);

    const legFR = new THREE.Mesh(dLegGeo, mat);
    legFR.position.set(0.16, 0.225, 0.3);
    dog.add(legFR);

    const legBL = new THREE.Mesh(dLegGeo, mat);
    legBL.position.set(-0.16, 0.225, -0.3);
    dog.add(legBL);

    const legBR = new THREE.Mesh(dLegGeo, mat);
    legBR.position.set(0.16, 0.225, -0.3);
    dog.add(legBR);

    // Wagging tail pivot
    const tailPivot = new THREE.Group();
    tailPivot.position.set(0, 0.62, -0.42);
    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.46, 5), mat);
    tail.position.set(0, 0.2, -0.1);
    tail.rotation.x = -0.6;
    tailPivot.add(tail);
    dog.add(tailPivot);

    dog.position.set(dl.x, 0, dl.z);
    dog.userData = {
      type: "dog",
      originX: dl.x,
      originZ: dl.z,
      range: dl.range,
      speed: dl.speed,
      trotTime: Math.random() * 8.0,
      tailPivot: tailPivot,
      legs: [legFL, legFR, legBL, legBR],
      direction: Math.random() * Math.PI * 2
    };

    scene.add(dog);
    worldAnimals.push(dog);
  });
}

function updateAnimatedWildlife(delta) {
  if (!worldAnimals || !worldAnimals.length) return;

  worldAnimals.forEach(animal => {
    if (animal.userData.type === "duck") {
      // Swimming duck: circles smoothly on the water surface and bobs
      const ud = animal.userData;
      ud.angle += ud.speed * delta;
      animal.position.x = ud.cx + Math.cos(ud.angle) * ud.radius;
      animal.position.z = ud.cz + Math.sin(ud.angle) * ud.radius;
      animal.position.y = 0.08 + Math.sin(Date.now() * 0.004 + ud.bobOffset) * 0.03; // Gentle water bobbing
      // Face heading tangent
      animal.rotation.y = -ud.angle + (ud.speed > 0 ? 0 : Math.PI);
    } else if (animal.userData.type === "bunny") {
      // Hopping bunny: periodic hop forward and look around
      const ud = animal.userData;
      ud.hopTime += delta * 2.8;

      const hopCycle = ud.hopTime % 3.0; // Hop for 1 sec, rest for 2 sec
      if (hopCycle < 1.0) {
        // In mid-hop
        const hopHeight = Math.sin(hopCycle * Math.PI) * 0.45;
        animal.position.y = hopHeight;
        // Move in direction
        const hopSpeed = 1.4 * delta;
        animal.position.x += Math.sin(ud.direction) * hopSpeed;
        animal.position.z += Math.cos(ud.direction) * hopSpeed;

        // Turn back if wandering too far from home clearing
        const distFromOrigin = Math.hypot(animal.position.x - ud.originX, animal.position.z - ud.originZ);
        if (distFromOrigin > ud.range) {
          ud.direction = Math.atan2(ud.originX - animal.position.x, ud.originZ - animal.position.z);
        }
      } else {
        // Rest on ground, slight twitch / look
        animal.position.y = 0;
        if (Math.abs(hopCycle - 1.0) < 0.1) {
          ud.direction += (Math.random() - 0.5) * 1.2;
        }
      }
      animal.rotation.y = ud.direction;
    } else if (animal.userData.type === "deer") {
      // Grazing deer: smoothly lowers head to graze grass, then lifts head alertly
      const ud = animal.userData;
      ud.grazeTime += delta * 0.7;
      const grazePhase = (Math.sin(ud.grazeTime) + 1) / 2; // 0 to 1
      if (ud.neckPivot) {
        ud.neckPivot.rotation.x = -0.15 - (grazePhase * 0.75); // Tilts down towards grass
      }
    } else if (animal.userData.type === "cat") {
      // Strolling cat: gentle walk cycle, pauses to sit and gently sways its tail
      const ud = animal.userData;
      ud.walkTime += delta * 1.6;
      const cycle = ud.walkTime % 5.0; // Walk for 2.5s, pause for 2.5s

      if (cycle < 2.5) {
        // Walking forward smoothly
        const stepRate = ud.walkTime * 6.0;
        animal.position.x += Math.sin(ud.direction) * ud.speed * delta;
        animal.position.z += Math.cos(ud.direction) * ud.speed * delta;
        animal.position.y = Math.abs(Math.sin(stepRate)) * 0.04;

        // Alternating leg swing
        if (ud.legs) {
          ud.legs[0].rotation.x = Math.sin(stepRate) * 0.35;
          ud.legs[1].rotation.x = -Math.sin(stepRate) * 0.35;
          ud.legs[2].rotation.x = -Math.sin(stepRate) * 0.35;
          ud.legs[3].rotation.x = Math.sin(stepRate) * 0.35;
        }

        // Steer back within patrol radius
        const dist = Math.hypot(animal.position.x - ud.originX, animal.position.z - ud.originZ);
        if (dist > ud.range) {
          ud.direction = Math.atan2(ud.originX - animal.position.x, ud.originZ - animal.position.z);
        }
      } else {
        // Paused/sitting, legs neutral
        animal.position.y = 0;
        if (ud.legs) ud.legs.forEach(l => l.rotation.x = 0);
        // Occasionally pick a new heading
        if (Math.abs(cycle - 2.55) < 0.1) {
          ud.direction += (Math.random() - 0.5) * 1.8;
        }
      }
      animal.rotation.y = ud.direction;
      // Gentle tail sway
      if (ud.tailPivot) {
        ud.tailPivot.rotation.z = Math.sin(ud.walkTime * 2.5) * 0.25;
      }
    } else if (animal.userData.type === "dog") {
      // Cheerful trotting dog: continuous trotting with happy wagging tail
      const ud = animal.userData;
      ud.trotTime += delta * 2.5;
      const cycle = ud.trotTime % 6.0;

      if (cycle < 4.2) {
        // Trotting along
        const trotRate = ud.trotTime * 9.0;
        animal.position.x += Math.sin(ud.direction) * ud.speed * delta;
        animal.position.z += Math.cos(ud.direction) * ud.speed * delta;
        animal.position.y = Math.abs(Math.sin(trotRate)) * 0.08;

        // Diagonal trot leg animation
        if (ud.legs) {
          ud.legs[0].rotation.x = Math.sin(trotRate) * 0.5;
          ud.legs[1].rotation.x = -Math.sin(trotRate) * 0.5;
          ud.legs[2].rotation.x = -Math.sin(trotRate) * 0.5;
          ud.legs[3].rotation.x = Math.sin(trotRate) * 0.5;
        }

        // Stay within area
        const dist = Math.hypot(animal.position.x - ud.originX, animal.position.z - ud.originZ);
        if (dist > ud.range) {
          ud.direction = Math.atan2(ud.originX - animal.position.x, ud.originZ - animal.position.z);
        }
      } else {
        // Sniffing the ground / looking around
        animal.position.y = 0;
        if (ud.legs) ud.legs.forEach(l => l.rotation.x = 0);
        if (Math.abs(cycle - 4.25) < 0.1) {
          ud.direction += (Math.random() - 0.5) * 2.0;
        }
      }
      animal.rotation.y = ud.direction;
      // Fast happy tail wagging
      if (ud.tailPivot) {
        ud.tailPivot.rotation.y = Math.sin(Date.now() * 0.018) * 0.55;
      }
    }
  });
}

/* --------------------------------------------------------------------------
   8. ADVENTURER GIRL CHARACTER
      Updates:
      - Hair & Ponytail: Deep Rich Black (#1A1A1A)
      - Dress: Green and Brown (Rich Forest/Olive Green with Warm Brown Trim & Inner Shirt)
      - Snappy & Fast Walking Speed
   -------------------------------------------------------------------------- */
function buildAdventurerCharacter() {
  characterGroup = new THREE.Group();
  characterGroup.position.set(0, 0, 0);

  // Updated Materials
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xD2B48C, roughness: 0.65, flatShading: true });
  // Dress: Rich Green (#557A2B) with Warm Brown (#78350F)
  const dressGreenMat = new THREE.MeshStandardMaterial({ color: 0x557A2B, roughness: 0.7, flatShading: true });
  const dressBrownMat = new THREE.MeshStandardMaterial({ color: 0x78350F, roughness: 0.75, flatShading: true });
  const greenShortsMat = new THREE.MeshStandardMaterial({ color: 0x4D7C0F, roughness: 0.75, flatShading: true });
  const bootsMat = new THREE.MeshStandardMaterial({ color: 0x4A3525, roughness: 0.85, flatShading: true });
  
  // Black Hair & Eyebrows (Deep Rich Black)
  const hairBlackMat = new THREE.MeshStandardMaterial({ color: 0x1A1A1A, roughness: 0.6, flatShading: true });
  const eyeBrowMat = new THREE.MeshBasicMaterial({ color: 0x111111 });

  const bedrollMat = new THREE.MeshStandardMaterial({ color: 0xE0D7C6, roughness: 0.8, flatShading: true });
  const stickMat = new THREE.MeshStandardMaterial({ color: 0x5C3A21, roughness: 0.9, flatShading: true });
  const buckleMat = new THREE.MeshStandardMaterial({ color: 0xCBD5E1, roughness: 0.3, metalness: 0.6 });

  characterBody = new THREE.Group();

  // 1. Torso: Warm brown inner shirt + Rich green outer sleeveless tunic/dress with brown trim
  const innerTorso = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.95, 0.48), dressBrownMat);
  innerTorso.position.y = 1.35;
  innerTorso.castShadow = true;
  characterBody.add(innerTorso);

  // Green Flared Tunic / Dress
  const tunicGeo = new THREE.CylinderGeometry(0.38, 0.54, 0.92, 8);
  const tunicMesh = new THREE.Mesh(tunicGeo, dressGreenMat);
  tunicMesh.position.set(0, 1.25, 0);
  tunicMesh.castShadow = true;
  tunicMesh.receiveShadow = true;
  characterBody.add(tunicMesh);

  // Brown Leather Belt & Collar Trim on Dress
  const beltGeo = new THREE.CylinderGeometry(0.46, 0.47, 0.14, 8);
  const belt = new THREE.Mesh(beltGeo, dressBrownMat);
  belt.position.set(0, 1.28, 0);
  characterBody.add(belt);

  // Brown V-neck collar trim
  const collarGeo = new THREE.BoxGeometry(0.28, 0.18, 0.05);
  const collar = new THREE.Mesh(collarGeo, dressBrownMat);
  collar.position.set(0, 1.62, 0.25);
  characterBody.add(collar);

  // 2. Head, BLACK Ponytail & Face Details
  characterHead = new THREE.Group();
  characterHead.position.set(0, 2.05, 0);

  // Neck
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.3, 8), skinMat);
  neck.position.y = -0.15;
  characterHead.add(neck);

  // Head Box (Faceted skin tone)
  const headGeo = new THREE.BoxGeometry(0.64, 0.65, 0.58);
  const headMesh = new THREE.Mesh(headGeo, skinMat);
  headMesh.castShadow = true;
  characterHead.add(headMesh);

  // Cute Black Short Cut Hair (Pixie / Bob cut, NO ponytail)
  const shortHairGroup = new THREE.Group();

  // Crown & top volume
  const hairTop = new THREE.Mesh(new THREE.BoxGeometry(0.70, 0.26, 0.64), hairBlackMat);
  hairTop.position.set(0, 0.24, -0.02);
  hairTop.castShadow = true;
  shortHairGroup.add(hairTop);

  // Upper back of head
  const hairBackTop = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.36, 0.14), hairBlackMat);
  hairBackTop.position.set(0, 0.08, -0.28);
  hairBackTop.castShadow = true;
  shortHairGroup.add(hairBackTop);

  // Tapered short cut nape at back of neck
  const hairBackNape = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.20, 0.08), hairBlackMat);
  hairBackNape.position.set(0, -0.16, -0.26);
  hairBackNape.castShadow = true;
  shortHairGroup.add(hairBackNape);

  // Left side short locks
  const hairSideL = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.44, 0.54), hairBlackMat);
  hairSideL.position.set(-0.33, 0.04, 0.01);
  hairSideL.castShadow = true;
  shortHairGroup.add(hairSideL);

  // Right side short locks
  const hairSideR = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.44, 0.54), hairBlackMat);
  hairSideR.position.set(0.33, 0.04, 0.01);
  hairSideR.castShadow = true;
  shortHairGroup.add(hairSideR);

  // Angled sideburn points framing face
  const sideburnL = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.22, 4), hairBlackMat);
  sideburnL.position.set(-0.33, -0.20, 0.12);
  sideburnL.rotation.z = 0.15;
  shortHairGroup.add(sideburnL);

  const sideburnR = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.22, 4), hairBlackMat);
  sideburnR.position.set(0.33, -0.20, 0.12);
  sideburnR.rotation.z = -0.15;
  shortHairGroup.add(sideburnR);

  // Front bangs / fringe over forehead
  const hairBangsCenter = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.16, 0.08), hairBlackMat);
  hairBangsCenter.position.set(0, 0.23, 0.29);
  hairBangsCenter.castShadow = true;
  shortHairGroup.add(hairBangsCenter);

  // Slightly longer side fringe layers
  const fringeL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.07), hairBlackMat);
  fringeL.position.set(-0.24, 0.15, 0.30);
  shortHairGroup.add(fringeL);

  const fringeR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 0.07), hairBlackMat);
  fringeR.position.set(0.24, 0.17, 0.30);
  shortHairGroup.add(fringeR);

  characterHead.add(shortHairGroup);
  ponytailMesh = null; // Removed ponytail

  // Eyebrows & Eyes
  const browL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.035, 0.02), eyeBrowMat);
  browL.position.set(-0.16, 0.08, 0.3);
  browL.rotation.z = -0.05;
  characterHead.add(browL);

  const browR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.035, 0.02), eyeBrowMat);
  browR.position.set(0.16, 0.08, 0.3);
  browR.rotation.z = 0.05;
  characterHead.add(browR);

  const eyeGeo = new THREE.BoxGeometry(0.08, 0.08, 0.02);
  const eyeL = new THREE.Mesh(eyeGeo, eyeBrowMat);
  eyeL.position.set(-0.16, -0.02, 0.3);
  characterHead.add(eyeL);

  const eyeR = new THREE.Mesh(eyeGeo, eyeBrowMat);
  eyeR.position.set(0.16, -0.02, 0.3);
  characterHead.add(eyeR);

  // Cute nose
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.1, 4), skinMat);
  nose.position.set(0, -0.07, 0.32);
  nose.rotation.x = Math.PI / 2;
  characterHead.add(nose);

  characterBody.add(characterHead);

  // 3. Hiking Backpack
  const backpackGroup = new THREE.Group();
  backpackGroup.position.set(0, 1.35, -0.38);

  const packMain = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.82, 0.38), dressGreenMat);
  packMain.castShadow = true;
  backpackGroup.add(packMain);

  const packPouch = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.38, 0.12), dressGreenMat);
  packPouch.position.set(0, -0.15, -0.22);
  backpackGroup.add(packPouch);

  // Brown leather straps
  const strap1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.65, 0.04), dressBrownMat);
  strap1.position.set(-0.16, -0.05, -0.25);
  backpackGroup.add(strap1);

  const strap2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.65, 0.04), dressBrownMat);
  strap2.position.set(0.16, -0.05, -0.25);
  backpackGroup.add(strap2);

  const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.06, 0.05), buckleMat);
  b1.position.set(-0.16, -0.12, -0.26);
  backpackGroup.add(b1);

  const b2 = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.06, 0.05), buckleMat);
  b2.position.set(0.16, -0.12, -0.26);
  backpackGroup.add(b2);

  // Bedroll
  const bedrollGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.88, 12);
  bedrollGeo.rotateZ(Math.PI / 2);
  const bedroll = new THREE.Mesh(bedrollGeo, bedrollMat);
  bedroll.position.set(0, 0.48, -0.06);
  bedroll.castShadow = true;
  backpackGroup.add(bedroll);

  [-0.26, 0.26].forEach(xPos => {
    const ringGeo = new THREE.TorusGeometry(0.19, 0.02, 6, 16);
    ringGeo.rotateY(Math.PI / 2);
    const ring = new THREE.Mesh(ringGeo, dressBrownMat);
    ring.position.set(xPos, 0.48, -0.06);
    backpackGroup.add(ring);
  });

  characterBody.add(backpackGroup);
  characterGroup.add(characterBody);

  // 4. Arms
  // Left Arm (Brown sleeve + Skin forearm & hand)
  leftArmPivot = new THREE.Group();
  leftArmPivot.position.set(-0.48, 1.7, 0);

  const lSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.28, 8), dressBrownMat);
  lSleeve.position.y = -0.14;
  leftArmPivot.add(lSleeve);

  const lForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.55, 8), skinMat);
  lForearm.position.y = -0.45;
  lForearm.castShadow = true;
  leftArmPivot.add(lForearm);

  const lHand = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), skinMat);
  lHand.position.y = -0.74;
  leftArmPivot.add(lHand);

  characterGroup.add(leftArmPivot);

  // Right Arm (Holding wooden walking stick)
  rightArmPivot = new THREE.Group();
  rightArmPivot.position.set(0.48, 1.7, 0);

  const rSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.28, 8), dressBrownMat);
  rSleeve.position.y = -0.14;
  rightArmPivot.add(rSleeve);

  const rForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.55, 8), skinMat);
  rForearm.position.y = -0.45;
  rForearm.castShadow = true;
  rightArmPivot.add(rForearm);

  const rHand = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), skinMat);
  rHand.position.y = -0.74;
  rightArmPivot.add(rHand);

  // Wooden Walking Stick
  const stickGeo = new THREE.CylinderGeometry(0.038, 0.045, 1.85, 8);
  walkingStickMesh = new THREE.Mesh(stickGeo, stickMat);
  walkingStickMesh.position.set(0.08, -0.45, 0.25);
  walkingStickMesh.rotation.x = 0.18;
  walkingStickMesh.castShadow = true;
  rightArmPivot.add(walkingStickMesh);

  const stickKnob = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), stickMat);
  stickKnob.position.set(0.08, 0.48, 0.35);
  rightArmPivot.add(stickKnob);

  characterGroup.add(rightArmPivot);

  // 5. Legs & Sturdy Hiking Boots
  leftLegPivot = new THREE.Group();
  leftLegPivot.position.set(-0.22, 0.82, 0);

  const lShorts = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.19, 0.32, 8), greenShortsMat);
  lShorts.position.y = -0.16;
  leftLegPivot.add(lShorts);

  const lKnee = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.1, 0.28, 8), skinMat);
  lKnee.position.y = -0.4;
  leftLegPivot.add(lKnee);

  const lBoot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.32, 0.45), bootsMat);
  lBoot.position.set(0, -0.66, 0.06);
  lBoot.castShadow = true;
  leftLegPivot.add(lBoot);

  characterGroup.add(leftLegPivot);

  rightLegPivot = new THREE.Group();
  rightLegPivot.position.set(0.22, 0.82, 0);

  const rShorts = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.19, 0.32, 8), greenShortsMat);
  rShorts.position.y = -0.16;
  rightLegPivot.add(rShorts);

  const rKnee = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.1, 0.28, 8), skinMat);
  rKnee.position.y = -0.4;
  rightLegPivot.add(rKnee);

  const rBoot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.32, 0.45), bootsMat);
  rBoot.position.set(0, -0.66, 0.06);
  rBoot.castShadow = true;
  rightLegPivot.add(rBoot);

  characterGroup.add(rightLegPivot);

  // Scale & initial position
  characterGroup.scale.set(1.15, 1.15, 1.15);
  scene.add(characterGroup);

  charState.x = 0;
  charState.z = 0;
  charState.rotation = -Math.PI / 2;
  characterGroup.position.set(charState.x, 0, charState.z);
  characterGroup.rotation.y = charState.rotation;
}

/* --------------------------------------------------------------------------
   9. WALKING PHYSICS & PROCEDURAL GAIT ANIMATION (FAST & RESPONSIVE)
   -------------------------------------------------------------------------- */
function updateCharacterPhysics(delta) {
  // ----- INPUT‑DRIVEN WALKING -----
  if (input.forward) {
    charState.speed += charState.accel * delta;
    if (charState.speed > charState.maxWalkSpeed) charState.speed = charState.maxWalkSpeed;
  } else if (input.backward) {
    charState.speed -= charState.accel * delta;
    if (charState.speed < charState.maxBackSpeed) charState.speed = charState.maxBackSpeed;
  } else {
    // No forward/backward input: apply friction
    charState.speed *= Math.pow(charState.friction, delta * 60);
    if (Math.abs(charState.speed) < 0.05) charState.speed = 0;
  }

  // Toggle OrbitControls: disable while walking, enable while idle
  if (window.orbitControls) {
    if (Math.abs(charState.speed) > 0.05) {
      window.orbitControls.enabled = false;
    } else {
      window.orbitControls.enabled = true;
    }
  }

  // ----- STEERING -----
  if (input.left) {
    charState.rotation += charState.turnSpeed;
  }
  if (input.right) {
    charState.rotation -= charState.turnSpeed;
  }

  // ----- POSITION ALONG ROAD (frame‑rate independent) -----
  if (roadCurve) {
    const deltaProgress = (charState.speed * delta) / roadLength; // units per second
    charState.progress = THREE.MathUtils.clamp(charState.progress + deltaProgress, 0, 1);
    const point = roadCurve.getPointAt(charState.progress);
    const tangent = roadCurve.getTangentAt(charState.progress).normalize();
    characterGroup.position.set(point.x, 0, point.z);
    charState.rotation = Math.atan2(tangent.x, tangent.z);
    characterGroup.rotation.y = charState.rotation;

    // ----- MILESTONE STOP LOGIC -----
    if (typeof milestoneThresholds !== 'undefined' && milestoneThresholds.length) {
      for (let i = 0; i < milestoneThresholds.length; i++) {
        const th = milestoneThresholds[i];
        if (charState.progress >= th && !milestoneVisited.has(i)) {
          // Stop walking when a milestone is reached
          input.forward = false;
          charState.speed = 0;
          milestoneVisited.add(i);
          // UI popup is triggered automatically via checkBuildingProximity
          break;
        }
      }
    }

    // ----- EXTENDED PROJECT BUILDINGS STOP & AUTO-OPEN LOGIC -----
    if (typeof projectThresholds !== 'undefined' && projectThresholds.length) {
      for (let p = 0; p < projectThresholds.length; p++) {
        const pt = projectThresholds[p];
        if (charState.progress >= pt.threshold && !projectVisited.has(pt.id)) {
          // Stop walking when reaching a project building along the extended road
          input.forward = false;
          charState.speed = 0;
          projectVisited.add(pt.id);
          // Automatically open the project showcase panel
          openProjectDetailPanel(pt.id);
          break;
        }
      }
    }
  } else {
    // Fallback simple motion if roadCurve is not ready
    charState.x += Math.sin(charState.rotation) * charState.speed * delta;
    charState.z += Math.cos(charState.rotation) * charState.speed * delta;
    characterGroup.position.set(charState.x, 0, charState.z);
    characterGroup.rotation.y = charState.rotation;
  }

  // ----- ANIMATION (scaled with speed) -----
  const isMoving = Math.abs(charState.speed) > 0.05;
  if (isMoving) {
    const gaitSpeed = Math.abs(charState.speed) * 0.75;
    charState.walkCycle += delta * gaitSpeed;
    const bob = Math.abs(Math.sin(charState.walkCycle * 2)) * 0.07;
    characterBody.position.y = bob;
    // Ponytail bounce (if any)
    if (ponytailMesh) {
      ponytailMesh.rotation.x = Math.sin(charState.walkCycle * 2) * 0.2;
    }
    // Legs stride
    leftLegPivot.rotation.x = Math.sin(charState.walkCycle) * 0.75;
    rightLegPivot.rotation.x = -Math.sin(charState.walkCycle) * 0.75;
    // Arms counter‑swing
    leftArmPivot.rotation.x = -Math.sin(charState.walkCycle) * 0.65;
    rightArmPivot.rotation.x = Math.sin(charState.walkCycle) * 0.55;
  } else {
    // Return smoothly to idle pose
    characterBody.position.y *= 0.8;
    leftLegPivot.rotation.x *= 0.8;
    rightLegPivot.rotation.x *= 0.8;
    leftArmPivot.rotation.x *= 0.8;
    rightArmPivot.rotation.x *= 0.8;
    if (ponytailMesh) ponytailMesh.rotation.x *= 0.8;
  }

  // ----- PROXIMITY CHECK FOR BUILDINGS -----
  checkBuildingProximity();
}

function updateCameraFollow() {
  if (!camera || !characterGroup) return;
  // Skip camera follow when OrbitControls is active (user panning)
  if (window.orbitControls && window.orbitControls.enabled) return;

  // Zoomed out slightly and lowered elevation angle so passing buildings and rooftop billboards stay in full view
  const camOffset = new THREE.Vector3(-18, 11.5, 20);
  const targetCamPos = characterGroup.position.clone().add(camOffset);

  camera.position.lerp(targetCamPos, 0.08);
  // Look slightly above the character towards the building and billboard eyeline
  camera.lookAt(characterGroup.position.x, characterGroup.position.y + 2.8, characterGroup.position.z);

  // Update OrbitControls target to character position when walking
  if (window.orbitControls) {
    window.orbitControls.target.set(characterGroup.position.x, characterGroup.position.y + 2.0, characterGroup.position.z);
  }
}

/* --------------------------------------------------------------------------
   10. INTERACTIVE CLICK POPUPS & CONTROLS
   -------------------------------------------------------------------------- */
function setupWorldControls(container) {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      input.forward = true;
      e.preventDefault();
    }
    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      input.backward = true;
      e.preventDefault();
    }
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      input.left = true;
      e.preventDefault();
    }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      input.right = true;
      e.preventDefault();
    }
    if (e.key === 'Escape') {
      closeMilestonePopup();
    }
  });

  window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') input.forward = false;
    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') input.backward = false;
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') input.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') input.right = false;
  });

  const pWalk = document.getElementById('touch-pedal-walk');
  const pBack = document.getElementById('touch-pedal-back');
  const pLeft = document.getElementById('touch-steer-left');
  const pRight = document.getElementById('touch-steer-right');

  function bindTouch(el, prop) {
    if (!el) return;
    const start = (e) => { e.preventDefault(); input[prop] = true; el.classList.add('active'); };
    const end = (e) => { e.preventDefault(); input[prop] = false; el.classList.remove('active'); };
    el.addEventListener('mousedown', start);
    el.addEventListener('mouseup', end);
    el.addEventListener('touchstart', start, { passive: false });
    el.addEventListener('touchend', end);
  }

  // Bind Walk and Back buttons as press-and-hold (same as keyboard)
  bindTouch(pWalk, 'forward');
  bindTouch(pBack, 'backward');
  bindTouch(pLeft, 'left');
  bindTouch(pRight, 'right');

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  container.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;

    const rect = container.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    let hitTargets = [];
    buildingMeshes.forEach(bg => {
      bg.traverse(child => {
        if (child.isMesh) {
          hitTargets.push(child);
        }
      });
    });
    townBuildingMeshes.forEach(tb => {
      tb.traverse(child => {
        if (child.isMesh) {
          hitTargets.push(child);
        }
      });
    });

    const intersects = raycaster.intersectObjects(hitTargets, false);
    if (intersects.length > 0) {
      const hitObj = intersects[0].object;
      
      // 1. If clicked on a Town Project Building or its Rooftop Logo Banner
      if (hitObj.userData && (hitObj.userData.isProjectTownBanner || hitObj.userData.projectId)) {
        openProjectDetailPanel(hitObj.userData.projectId);
        return;
      }
      const townParent = townBuildingMeshes.find(tb => tb.children.includes(hitObj) || tb === hitObj);
      if (townParent && townParent.userData.isTownProjectBuilding) {
        openProjectDetailPanel(townParent.userData.projectId);
        return;
      }

      // 2. If clicked on a Roadside Milestone Building
      const clickedBuilding = hitObj.userData.parentBuilding || hitObj;
      const bGroup = buildingMeshes.find(b => b === clickedBuilding || b.children.includes(hitObj));
      if (bGroup && bGroup.userData.isBuilding) {
        showMilestonePopup(bGroup.userData.milestoneId);
      }
    } else {
      closeMilestonePopup();
    }
  });

  const closeBtn = document.getElementById('popup-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMilestonePopup);
  }

  // Button inside popup to view full project slide drawer
  const openPanelBtn = document.getElementById('popup-open-panel-btn');
  if (openPanelBtn) {
    openPanelBtn.addEventListener('click', () => {
      if (activePopupId) openProjectDetailPanel(activePopupId);
    });
  }

  // Reset Adventurer button handler
  const resetBtn = document.getElementById('reset-char-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      charState.progress = 0;
      charState.speed = 0;
      input.forward = false;
      input.backward = false;
      milestoneVisited.clear();
      projectVisited.clear();
      closeMilestonePopup();
      closeProjectDetailPanel();
      if (roadCurve && characterGroup) {
        const pt = roadCurve.getPointAt(0);
        const tan = roadCurve.getTangentAt(0).normalize();
        characterGroup.position.set(pt.x, 0, pt.z);
        charState.rotation = Math.atan2(tan.x, tan.z);
        characterGroup.rotation.y = charState.rotation;
      }
    });
  }

  // Close project detail panel handlers
  const panelCloseBtn = document.getElementById('panel-close-btn');
  const panelBackdrop = document.getElementById('panel-backdrop');
  if (panelCloseBtn) panelCloseBtn.addEventListener('click', closeProjectDetailPanel);
  if (panelBackdrop) panelBackdrop.addEventListener('click', closeProjectDetailPanel);

  // Welcome & Navigation Guide Modal handler
  const welcomeModal = document.getElementById('welcome-modal-backdrop');
  const welcomeStartBtn = document.getElementById('welcome-start-btn');

  function closeWelcomeModal() {
    if (welcomeModal && !welcomeModal.classList.contains('hidden')) {
      welcomeModal.classList.add('hidden');
      setTimeout(() => {
        welcomeModal.style.display = 'none';
      }, 350);
    }
  }

  if (welcomeStartBtn) {
    welcomeStartBtn.addEventListener('click', closeWelcomeModal);
  }

  if (welcomeModal) {
    welcomeModal.addEventListener('click', (e) => {
      // Close if user clicks outside the modal card
      if (e.target === welcomeModal) {
        closeWelcomeModal();
      }
    });
  }

  // Allow pressing Enter or Space to quickly start
  window.addEventListener('keydown', (e) => {
    if (welcomeModal && !welcomeModal.classList.contains('hidden')) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        closeWelcomeModal();
        e.preventDefault();
      }
    }
  });
}

/* --------------------------------------------------------------------------
   11. PROJECT DETAIL SLIDE-OVER PANEL HANDLERS (RICH CUSTOMIZABLE VIEW)
   -------------------------------------------------------------------------- */
function openProjectDetailPanel(id) {
  // Check project buildings first, fallback to milestones data
  const townProj = PROJECT_BUILDINGS_DATA.find(p => p.id === id);
  const milestone = MILESTONES_DATA.find(m => m.id === id);
  const data = townProj || milestone;
  if (!data) return;

  const panel = document.getElementById('project-detail-panel');
  if (!panel) return;

  const badgeText = townProj ? `TOWN PROJECT • ${townProj.badge}` : `MILESTONE #${data.step}`;
  document.getElementById('panel-badge').textContent = badgeText;
  document.getElementById('panel-category').textContent = data.details?.category || 'Engineering Project';
  document.getElementById('panel-title').textContent = data.title;
  document.getElementById('panel-tagline').textContent = data.details?.tagline || data.summary;
  document.getElementById('panel-location').textContent = data.location || "Janhavi's Portfolio Town";
  document.getElementById('panel-timeline').textContent = data.period || "Project Showcase";
  document.getElementById('panel-desc').textContent = data.details?.description || data.summary;

  // Showcase slot banner: inject high-res project logo if available
  const bannerSlot = document.getElementById('panel-banner-slot');
  if (bannerSlot) {
    if (data.logoPath) {
      bannerSlot.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:center; width:100%; height:100%; padding:1.25rem; background:#FFFFFF; border-radius:1rem; border:2px solid ${data.themeColor || '#2563EB'}; box-shadow:0 10px 25px -5px rgba(0,0,0,0.08);">
          <img src="${data.logoPath}" alt="${data.title} Logo" style="max-height:160px; max-width:100%; object-fit:contain; filter:drop-shadow(0 4px 12px rgba(0,0,0,0.12));">
        </div>
      `;
    } else {
      bannerSlot.innerHTML = `
        <div class="panel-image-placeholder">
          <span class="placeholder-icon">${data.icon || '🖼️'}</span>
          <span class="placeholder-title" id="panel-slot-label">${data.badge || data.bannerTitle || data.title} — Technical Showcase</span>
          <span class="placeholder-hint">Interactive project module</span>
        </div>
      `;
    }
  }

  // Achievements list
  const achList = document.getElementById('panel-achievements');
  achList.innerHTML = '';
  const achievements = data.details?.achievements || [data.summary];
  achievements.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    achList.appendChild(li);
  });

  // Technologies tags
  const techContainer = document.getElementById('panel-tech-tags');
  techContainer.innerHTML = '';
  const tags = data.skills || [data.badge, "3D Systems", "Engineering"];
  tags.forEach(skill => {
    const span = document.createElement('span');
    span.className = 'panel-tech-tag';
    span.textContent = skill;
    techContainer.appendChild(span);
  });

  panel.classList.add('active');
  panel.setAttribute('aria-hidden', 'false');

  // Pause walk while reviewing project
  input.forward = false;
  charState.speed = 0;
}

function closeProjectDetailPanel() {
  const panel = document.getElementById('project-detail-panel');
  if (panel) {
    panel.classList.remove('active');
    panel.setAttribute('aria-hidden', 'true');
  }
}

function checkBuildingProximity() {
  if (!characterGroup) return;

  // Check milestone buildings
  buildingMeshes.forEach(b => {
    const dist = characterGroup.position.distanceTo(b.position);
    if (dist < 7.5) {
      if (activePopupId !== b.userData.milestoneId) {
        showMilestonePopup(b.userData.milestoneId);
      }
    }
  });
}

function showMilestonePopup(id) {
  const data = MILESTONES_DATA.find(m => m.id === id);
  if (!data) return;

  activePopupId = id;
  const container = document.getElementById('milestone-popup-container');
  if (!container) return;

  document.getElementById('popup-step-badge').textContent = `Milestone #${data.step}`;
  document.getElementById('popup-title').textContent = data.title;
  document.getElementById('popup-location').textContent = `${data.period} • ${data.location}`;
  document.getElementById('popup-summary').textContent = data.summary;

  const tagsContainer = document.getElementById('popup-tags');
  tagsContainer.innerHTML = '';
  data.skills.forEach(skill => {
    const span = document.createElement('span');
    span.className = 'popup-tag-pill';
    span.textContent = skill;
    tagsContainer.appendChild(span);
  });

  container.classList.add('active');
  updatePopupScreenPosition();
}

function closeMilestonePopup() {
  const container = document.getElementById('milestone-popup-container');
  if (container) container.classList.remove('active');
  activePopupId = null;
}

function updatePopupScreenPosition() {
  if (!activePopupId || !camera) return;

  const bGroup = buildingMeshes.find(b => b.userData.milestoneId === activePopupId);
  if (!bGroup) return;

  const container = document.getElementById('milestone-popup-container');
  if (!container || !container.classList.contains('active')) return;

  const anchor = bGroup.userData.anchorPos.clone();
  anchor.project(camera);

  // If building is behind camera, hide or don't position awkwardly
  if (anchor.z > 1.0) {
    container.style.opacity = '0';
    return;
  } else {
    container.style.opacity = '1';
  }

  const screenW = window.innerWidth;
  const screenH = window.innerHeight;

  const cardW = Math.min(352, screenW * 0.9); // ~22rem
  const cardH = container.offsetHeight || 300;
  const margin = 16;

  // Screen anchor point
  const rawX = (anchor.x * 0.5 + 0.5) * screenW;
  const rawY = (-(anchor.y * 0.5) + 0.5) * screenH;

  // Clamp horizontal position so popup never bleeds off left or right edge
  const minLeft = margin;
  const maxLeft = screenW - cardW - margin;
  let targetLeft = rawX - (cardW / 2);
  targetLeft = Math.max(minLeft, Math.min(targetLeft, maxLeft));

  // Determine vertical placement: place above building anchor if space permits, otherwise place below
  let targetTop = rawY - cardH - 24;
  let arrowClass = 'arrow-bottom';

  if (targetTop < margin + 60) {
    // If placing above would cut off near top (like under the header or off-screen), flip below anchor
    targetTop = Math.min(screenH - cardH - margin - 80, rawY + 24);
    arrowClass = 'arrow-top';
  } else {
    targetTop = Math.max(margin + 60, targetTop);
  }

  container.style.left = `${Math.round(targetLeft)}px`;
  container.style.top = `${Math.round(targetTop)}px`;
  container.style.transform = 'none';

  // Position arrow directly pointing towards the 3D building's screen X position
  const card = container.querySelector('.milestone-popup-card');
  if (card) {
    card.classList.remove('arrow-top', 'arrow-bottom');
    card.classList.add(arrowClass);
    const arrowX = Math.max(24, Math.min(rawX - targetLeft, cardW - 24));
    card.style.setProperty('--arrow-x', `${Math.round(arrowX)}px`);
  }
}
