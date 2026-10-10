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
let cloudGroups = [];
let worldAnimals = [];

/* --------------------------------------------------------------------------
   PROJECT BUILDINGS IN THE SURROUNDING TOWN (WITH LOGO BANNERS)
   -------------------------------------------------------------------------- */
const PROJECT_BUILDINGS_DATA = [
  {
    id: "proj_art",
    title: "Generative Art & Creative CAD",
    badge: "CREATIVE",
    icon: "🎨",
    themeColor: "#DB2777",
    pos: { x: -28, z: -38 },
    rot: 0.45,
    roofType: "pitched",
    wallColor: 0xFEF3C7, // Cheerful warm honey butter
    roofColor: 0xDB2777, // Cheerful warm berry pink
    fenceType: "wooden",
    details: {
      category: "Creative Computation",
      tagline: "Parametric 3D Design & Algorithmic Art",
      highlight: "Procedural geometry, 3D printing and digital fabrication",
      description: "Exploration of procedural modeling, 3D generative art, and mechanical product enclosures designed in CAD and brought to life through additive manufacturing.",
      achievements: [
        "Modeled parametric components with rapid 3D printing tolerance calibration",
        "Created digital art installations and procedural visual shaders",
        "Built interactive creative prototypes blending aesthetics and hardware"
      ]
    }
  },
  {
    id: "proj_iot",
    title: "Smart IoT & Embedded Telemetry",
    badge: "IOT & EDGE",
    icon: "📡",
    themeColor: "#2563EB",
    pos: { x: 30, z: -48 },
    rot: -0.4,
    roofType: "flat_tech",
    wallColor: 0xEDE9FE, // Soft lavender blue
    roofColor: 0x3B82F6, // Vibrant cornflower blue
    fenceType: "circuit",
    details: {
      category: "Embedded IoT",
      tagline: "Low-Power Sensor Networks & Remote Telemetry",
      highlight: "Microcontroller sensor nodes with wireless MQTT streaming",
      description: "End-to-end edge monitoring system with multi-sensor environmental boards streaming real-time telemetry to distributed dashboard interfaces.",
      achievements: [
        "Designed energy-efficient firmware for continuous sensor polling",
        "Implemented fault-tolerant wireless packet buffering",
        "Built web-socket telemetry dashboards with sub-second latency"
      ]
    }
  },
  {
    id: "proj_cv",
    title: "Computer Vision & Optical Inspection",
    badge: "VISION AI",
    icon: "👁️",
    themeColor: "#059669",
    pos: { x: -32, z: -100 },
    rot: 0.5,
    roofType: "pitched",
    wallColor: 0xDCFCE7, // Crisp mint green
    roofColor: 0x059669, // Deep emerald teal
    fenceType: "wireframe",
    details: {
      category: "Industrial Vision",
      tagline: "Sub-Millimeter Optical Quality Assurance",
      highlight: "High-speed camera edge inference and defect classification",
      description: "Automated optical inspection station using morphological filters and neural segmentation to catch micro-defects in high-speed manufacturing pipelines.",
      achievements: [
        "Engineered real-time edge filtering pipeline running at >60 FPS",
        "Achieved ~300 µm defect detection sensitivity on dynamic textures",
        "Published findings on DIPlib acceleration for production workloads"
      ]
    }
  },
  {
    id: "proj_slam",
    title: "Spatial SLAM & 360° Video Systems",
    badge: "SPATIAL AI",
    icon: "🌐",
    themeColor: "#D97706",
    pos: { x: 32, z: -125 },
    rot: -0.35,
    roofType: "dome",
    wallColor: 0xFFEDD5, // Warm apricot cream
    roofColor: 0xD97706, // Cheerful golden amber
    fenceType: "circuit",
    details: {
      category: "Spatial Robotics",
      tagline: "Multi-Camera Stitching & Visual Odometry",
      highlight: "Real-time 360-degree panorama stitching on edge compute",
      description: "Research project focusing on spherical image reprojection, seam blending, and feature-based spatial tracking on resource-constrained embedded robotics hardware.",
      achievements: [
        "Integrated multi-sensor synchronized video capture pipeline",
        "Benchmarked embedded ORB-SLAM3 tracking with high frame stability",
        "Formulated dynamic seam-carving algorithms for distortion-free stitching"
      ]
    }
  },
  {
    id: "proj_dtwin",
    title: "Monocular 3D Digital Twins",
    badge: "3D TWINS",
    icon: "🧊",
    themeColor: "#7C3AED",
    pos: { x: -28, z: -180 },
    rot: 0.35,
    roofType: "wireframe_frame",
    wallColor: 0xF3E8FF, // Soft purple haze
    roofColor: 0x8B5CF6, // Cheerful electric violet
    fenceType: "wireframe",
    details: {
      category: "Frontier 3D Research",
      tagline: "Dense 3D Point Clouds from Single Video Streams",
      highlight: "Neural geometric priors transforming video to spatial assets",
      description: "Deep learning research at IIT Jodhpur reconstructing detailed metric 3D point cloud digital twins from moving phone/monocular video streams without LiDAR.",
      achievements: [
        "Developed neural monocular pipeline extracting dense 3D point clouds",
        "Integrated geometric consistency constraints across multi-view video frames",
        "Exported interactive meshes for simulation, VR, and digital twin analytics"
      ]
    }
  },
  {
    id: "proj_green",
    title: "Sustainable Electronics & Clean Tech",
    badge: "ECO TECH",
    icon: "☀️",
    themeColor: "#15803D",
    pos: { x: 30, z: -210 },
    rot: -0.45,
    roofType: "solar_cottage",
    wallColor: 0xFEF9C3, // Cheerful sunlight cream
    roofColor: 0x16A34A, // Rich leaf green
    fenceType: "wooden",
    details: {
      category: "Sustainable Hardware",
      tagline: "Ultra-Low Power Systems & Solar Harvesting",
      highlight: "Energy-harvesting sensor nodes with zero standby drain",
      description: "Exploration of eco-conscious hardware design, solar harvesting controllers, and power-gated embedded firmware for environmental preservation.",
      achievements: [
        "Built MPPT solar charging circuit prototype for outdoor sensors",
        "Optimized sleep-wake duty cycles achieving multi-month battery life",
        "Analyzed lifecycle impact of embedded electronics assemblies"
      ]
    }
  },
  {
    id: "proj_robot",
    title: "Autonomous Mobile Robotics",
    badge: "ROBOTICS",
    icon: "🤖",
    themeColor: "#0284C7",
    pos: { x: -24, z: -245 },
    rot: 0.25,
    roofType: "gear_lab",
    wallColor: 0xE0F2FE, // Cheerful cyan mist
    roofColor: 0x0284C7, // Vibrant electric cyan
    fenceType: "circuit",
    details: {
      category: "Robotics & Controls",
      tagline: "Path Planning, Obstacle Avoidance & Actuation",
      highlight: "Differential drive autonomous rovers with PID control",
      description: "Designed, wired, and programmed custom mobile robots featuring LiDAR/ultrasonic obstacle avoidance and closed-loop trajectory tracking.",
      achievements: [
        "Built custom differential drive chassis with encoder feedback",
        "Implemented PID trajectory control and A* grid navigation",
        "Won podium placement in university autonomous navigation trials"
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

  // Camera: Elevated Isometric Diagonal Perspective (Extended far plane for expansive scenery)
  const aspect = container.clientWidth / container.clientHeight;
  camera = new THREE.PerspectiveCamera(38, aspect, 0.5, 1200);
  camera.position.set(-18, 22, 18);

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

  const hemiLight = new THREE.HemisphereLight(0x7EC8E3, 0xD97745, 0.85); // Sky blue to muted warm orange ground bounce
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

  // 1. Expansive Muted Warm Orange Ground Plane (Generously envelopes the whole town and mountain horizons)
  const groundGeo = new THREE.PlaneGeometry(1200, 1200);
  groundGeo.rotateX(-Math.PI / 2);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0xD97745, // Warm muted terracotta orange clay
    roughness: 0.86,
    metalness: 0.0
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.position.set(0, 0, -140); // Centered right along the full journey of the road and town
  ground.receiveShadow = true;
  scene.add(ground);

  // 2. Build 3D Extruded Text "JANHAVI" at Spawn
  buildBigSculpturalText();

  // 3. Build Road Network (Strictly PARALLEL to the ground!)
  buildClayRoad();

  // 4. Build 7 Milestone Buildings along the Road
  buildMilestoneBuildings();

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
   5. ROAD PATHWAY — STRICTLY PARALLEL TO GROUND (FLAT HORIZONTAL RIBBON)
   -------------------------------------------------------------------------- */
function buildClayRoad() {
  roadPoints = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -18),
    new THREE.Vector3(14, 0, -35),
    new THREE.Vector3(25, 0, -58),
    new THREE.Vector3(12, 0, -85),
    new THREE.Vector3(-12, 0, -110),
    new THREE.Vector3(-22, 0, -140),
    new THREE.Vector3(-8, 0, -170),
    new THREE.Vector3(16, 0, -200),
    new THREE.Vector3(20, 0, -235),
    new THREE.Vector3(0, 0, -270)
  ];

  roadCurve = new THREE.CatmullRomCurve3(roadPoints);
  roadLength = roadCurve.getLength();
  const roadWidth = 5.0;
  const segments = 240;

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

  // Dashed white center markings lying flat on the road surface
  const dashCount = 65;
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
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Clean white card background with rounded aesthetic
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 256, 256);

  // Outer dark frame (matching reference image signs)
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, 242, 242);

  // Inner subtle accent frame
  ctx.strokeStyle = proj.themeColor || '#2563EB';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, 216, 216);

  // Central Icon / Logo Emoji Graphic (ready to swap with image later)
  ctx.font = '76px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(proj.icon || '📦', 128, 100);

  // Clean uppercase project badge label
  ctx.fillStyle = '#0F172A';
  ctx.font = '900 24px "Outfit", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(proj.badge || proj.title, 128, 185);

  // Subtle lower subtitle line
  ctx.fillStyle = proj.themeColor || '#64748B';
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('PROJECT', 128, 215);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
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
  const rockMat = new THREE.MeshStandardMaterial({ color: 0xD8D4CB, roughness: 0.9, flatShading: true });
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78553D, roughness: 0.85 }); // Warm chocolate mahogany trunk

  // Warm sunny nature foliage palette (strictly warm greens, sunlit lime, olive & golden pear - no cold colors)
  const leafMats = [
    new THREE.MeshStandardMaterial({ color: 0x84CC16, roughness: 0.72, flatShading: true }), // Warm Sunny Lime
    new THREE.MeshStandardMaterial({ color: 0x65A30D, roughness: 0.74, flatShading: true }), // Warm Golden Olive
    new THREE.MeshStandardMaterial({ color: 0x4D7C0F, roughness: 0.76, flatShading: true }), // Deep Warm Forest Moss
    new THREE.MeshStandardMaterial({ color: 0xA3E635, roughness: 0.70, flatShading: true }), // Bright Warm Chartreuse / Pear
    new THREE.MeshStandardMaterial({ color: 0xCA8A04, roughness: 0.72, flatShading: true }), // Sunlit Golden Amber
    new THREE.MeshStandardMaterial({ color: 0xEAB308, roughness: 0.70, flatShading: true })  // Warm Sunflower Yellow Leaf
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

    // Small Square Logo Banner mounted above rooftop (Inspired by Reference Town Image Signs)
    const logoTexture = createLogoBadgeBannerTexture(proj);

    // Sturdy dark mounting post
    const signPole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 1.6, 8), lamppostMat);
    signPole.position.set(0, bannerMountY + 0.8, 0);
    pGroup.add(signPole);

    // Outer dark sign frame
    const frameMesh = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 2.5, 0.16),
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 })
    );
    frameMesh.position.set(0, bannerMountY + 1.8, 0);
    frameMesh.castShadow = true;
    pGroup.add(frameMesh);

    // Front high-res logo canvas texture
    const bannerBoard = new THREE.Mesh(
      new THREE.PlaneGeometry(2.35, 2.35),
      new THREE.MeshStandardMaterial({ map: logoTexture, roughness: 0.25 })
    );
    bannerBoard.position.set(0, bannerMountY + 1.8, 0.09);
    bannerBoard.userData = {
      isProjectTownBanner: true,
      projectId: proj.id,
      parentBuilding: pGroup
    };
    pGroup.add(bannerBoard);

    // Back texture as well so it's readable from all orbit angles
    const bannerBoardBack = new THREE.Mesh(
      new THREE.PlaneGeometry(2.35, 2.35),
      new THREE.MeshStandardMaterial({ map: logoTexture, roughness: 0.25 })
    );
    bannerBoardBack.position.set(0, bannerMountY + 1.8, -0.09);
    bannerBoardBack.rotation.y = Math.PI;
    bannerBoardBack.userData = {
      isProjectTownBanner: true,
      projectId: proj.id,
      parentBuilding: pGroup
    };
    pGroup.add(bannerBoardBack);

    pGroup.userData = {
      isTownProjectBuilding: true,
      projectId: proj.id,
      anchorPos: new THREE.Vector3(proj.pos.x, bannerMountY + 2.5, proj.pos.z)
    };

    scene.add(pGroup);
    townBuildingMeshes.push(pGroup);
  });

  // 3. Street Lampposts along the road and town courtyards
  const lamppostPoints = [
    { x: -5, z: -10 }, { x: 5, z: -10 },
    { x: 16, z: -25 }, { x: 8, z: -45 },
    { x: 18, z: -70 }, { x: -8, z: -95 },
    { x: -16, z: -125 }, { x: -6, z: -150 },
    { x: 10, z: -185 }, { x: 18, z: -215 },
    { x: 12, z: -245 }, { x: -5, z: -265 }
  ];

  lamppostPoints.forEach(lp => {
    const pole = new THREE.Group();
    pole.position.set(lp.x, 0, lp.z);

    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 3.2, 8), lamppostMat);
    stem.position.y = 1.6;
    stem.castShadow = true;
    pole.add(stem);

    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.08, 0.08), lamppostMat);
    arm.position.set(0.2, 3.1, 0);
    pole.add(arm);

    const lantern = new THREE.Mesh(new THREE.DodecahedronGeometry(0.28, 0), lampLightMat);
    lantern.position.set(0.45, 2.9, 0);
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
    { cx: 16.0,  cz: -302, count: 5, radius: 4.2, baseH: 5.0 },
    { cx: -6.0,  cz: -308, count: 5, radius: 4.0, baseH: 4.8 }
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

  // 5. Flower bushes along the sidewalk edges (Soft pastel garden accents)
  const bushColors = [0x97B08B, 0xAEC4A4, 0xE2D4B7, 0xD4B8B8, 0xC4B5D4];
  for (let b = 0; b < 40; b++) {
    const bColor = bushColors[b % bushColors.length];
    const bMat = new THREE.MeshStandardMaterial({ color: bColor, roughness: 0.85, flatShading: true });
    const bush = new THREE.Mesh(new THREE.DodecahedronGeometry(0.55 + (b % 3) * 0.15, 0), bMat);
    const side = (b % 2 === 0 ? 1 : -1);
    const bz = -10 - (b * 7);
    const bx = side * (5.5 + (b % 4) * 0.8);
    bush.position.set(bx, 0.35, bz);
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
    new THREE.MeshStandardMaterial({ color: 0x65A30D, roughness: 0.74, flatShading: true }), // Warm Golden Olive
    new THREE.MeshStandardMaterial({ color: 0x4D7C0F, roughness: 0.76, flatShading: true }), // Deep Warm Forest Moss
    new THREE.MeshStandardMaterial({ color: 0x84CC16, roughness: 0.72, flatShading: true }), // Sunny Lime
    new THREE.MeshStandardMaterial({ color: 0x3F6212, roughness: 0.78, flatShading: true }), // Dense Woodland Moss
    new THREE.MeshStandardMaterial({ color: 0xA3E635, roughness: 0.70, flatShading: true })  // Fresh Chartreuse
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
    new THREE.MeshStandardMaterial({ color: 0xD8D4CB, roughness: 0.9, flatShading: true }), // Chalk white river boulder
    new THREE.MeshStandardMaterial({ color: 0x94A3B8, roughness: 0.85, flatShading: true }), // Slate blue water pebble
    new THREE.MeshStandardMaterial({ color: 0xCBD5E1, roughness: 0.88, flatShading: true })  // Cool stone
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
    color: 0xFB7185, // Pink lotus bloom
    roughness: 0.5
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
          // UI popup is triggered elsewhere via proximity check
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

  const camOffset = new THREE.Vector3(-14, 18, 14);
  const targetCamPos = characterGroup.position.clone().add(camOffset);

  camera.position.lerp(targetCamPos, 0.09);
  camera.lookAt(characterGroup.position.x, characterGroup.position.y + 1.2, characterGroup.position.z);

  // Update OrbitControls target to character position when walking
  if (window.orbitControls) {
    window.orbitControls.target.copy(characterGroup.position);
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

  // Close project detail panel handlers
  const panelCloseBtn = document.getElementById('panel-close-btn');
  const panelBackdrop = document.getElementById('panel-backdrop');
  if (panelCloseBtn) panelCloseBtn.addEventListener('click', closeProjectDetailPanel);
  if (panelBackdrop) panelBackdrop.addEventListener('click', closeProjectDetailPanel);
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

  // Placeholder slot banner label
  const slotLabel = document.getElementById('panel-slot-label');
  if (slotLabel) {
    slotLabel.textContent = `${data.badge || data.bannerTitle || data.title} — Visual Showcase Slot`;
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
  buildingMeshes.forEach(b => {
    const dist = characterGroup.position.distanceTo(b.position);
    if (dist < 6.5) {
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

  const screenW = window.innerWidth;
  const screenH = window.innerHeight;

  const x = (anchor.x * 0.5 + 0.5) * screenW;
  const y = (-(anchor.y * 0.5) + 0.5) * screenH;

  container.style.left = `${Math.round(x)}px`;
  container.style.top = `${Math.round(y - 30)}px`;
  container.style.transform = 'translate(-50%, -100%)';
}
