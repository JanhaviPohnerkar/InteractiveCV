/* ==========================================================================
   Janhavi's Portfolio - 3D Interactive Journey & Engine
   Features:
   - Full 3D Stylized World with winding road, rolling hills & mountains
   - Cute low-poly driveable car (mouse hold & arrow key navigation)
   - 7 Milestones along the road with 3D arches, proximity triggers & modals
   - Image placeholder slots for each milestone
   - Project filtering, deep-dive modals, and celebratory confetti
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initJourneyWorld();
  initProjectFilters();
  initProjectModal();
  initContactForm();
  initCopyEmail();
  initMobileNav();
});

/* --------------------------------------------------------------------------
   1. MILESTONES DATA DEFINITION
   -------------------------------------------------------------------------- */
const MILESTONES_DATA = [
  {
    id: "schooling",
    step: 1,
    progressT: 0.06,
    shortTitle: "Schooling",
    title: "Schooling at PSBA English School",
    location: "Aurangabad, Maharashtra",
    period: "Foundation Years",
    badge: "Schooling Milestone",
    summary: "Completed schooling from PSBA English School, Aurangabad with strong academic fundamentals and early curiosity in science, mathematics, and building things.",
    details: [
      "Completed foundational education at PSBA English School, Aurangabad.",
      "Developed a keen passion for mathematics, physical sciences, and problem solving.",
      "Active participant in science exhibitions, academic quizzes, and foundational tech clubs."
    ],
    skills: ["Mathematics", "Physics", "Analytical Thinking", "Science Fairs"],
    photoPrompt: "School photo, graduation day, or science exhibition snapshot"
  },
  {
    id: "engineering",
    step: 2,
    progressT: 0.20,
    shortTitle: "Engineering",
    title: "Commenced B.Tech in Electronics & Telecommunication",
    location: "MITAOE (MIT Academy of Engineering), Pune",
    period: "Class of 2027",
    badge: "Higher Education",
    summary: "Began undergraduate journey in Electronics & Telecommunication Engineering at MIT Academy of Engineering (MITAOE), Pune, setting the foundation for embedded systems and signal processing.",
    details: [
      "Enrolled in B.Tech E&TC with high academic standing (maintained 8.41/10 CGPA).",
      "Dove into core coursework: Analog & Digital Electronics, Signals & Systems, and Circuit Theory.",
      "Joined student engineering communities and hardware prototyping clubs."
    ],
    skills: ["Circuit Design", "Signal Systems", "Digital Electronics", "Academic Excellence (8.41 CGPA)"],
    photoPrompt: "MITAOE Campus entrance, department lab, or first-day photo"
  },
  {
    id: "year1",
    step: 3,
    progressT: 0.35,
    shortTitle: "1st Year",
    title: "Domain Exploration & Hardware Prototyping",
    location: "MITAOE Innovation Labs",
    period: "First Year B.Tech",
    badge: "Exploration & Competitions",
    summary: "Explored diverse engineering domains — including 3D design, Arduino microcontrollers, and Raspberry Pi — while actively competing in hackathons and college extracurriculars.",
    details: [
      "Hands-on experimentation with 3D CAD modeling, 3D printing, and rapid mechanical prototyping.",
      "Built initial embedded circuits using Arduino UNO, sensors, and basic motor actuators.",
      "Configured Raspberry Pi for Linux computing and network experiments.",
      "Participated in robotics challenges, hackathons, and extracurricular technical festivals."
    ],
    skills: ["3D Design & CAD", "Arduino", "Raspberry Pi", "Rapid Prototyping", "Hackathons"],
    photoPrompt: "First 3D CAD design render, Arduino breadboard rig, or hackathon team"
  },
  {
    id: "year2",
    step: 4,
    progressT: 0.50,
    shortTitle: "Second Year",
    title: "Summer Internship at Coppercloud & Domain Deep-Dive",
    location: "Copper Cloud Industry 4.0 Solutions, Pune",
    period: "Second Year B.Tech",
    badge: "Industry Internship",
    summary: "Joined Coppercloud as a Summer Intern, diving deep into VLSI concepts, embedded firmware architectures, and computer vision pipelines for industrial perception.",
    details: [
      "Secured competitive Summer Internship at Coppercloud Industry 4.0 Solutions, Pune.",
      "Explored VLSI design flows and hardware description fundamentals.",
      "Deep-dived into embedded systems, microcontroller interrupts, and serial communication protocols.",
      "Built initial computer vision image filters using OpenCV and Python for automated inspection."
    ],
    skills: ["Coppercloud Internship", "VLSI Fundamentals", "Embedded Systems", "Computer Vision", "OpenCV"],
    photoPrompt: "Coppercloud workplace, internship badge, or early CV prototype setup"
  },
  {
    id: "year3",
    step: 5,
    progressT: 0.65,
    shortTitle: "Third Year",
    title: "R&D Intern at Coppercloud & DIPlib Research Publication",
    location: "Coppercloud & MITAOE Research",
    period: "Third Year B.Tech",
    badge: "R&D & Research Paper",
    summary: "Continued as R&D Intern at Coppercloud — engineered factory-deployed zari defect detection (~300 µm precision), QR code recognition on thermocol packaging, and published research on DIPlib for composite metrology.",
    details: [
      "Engineered real-time metal-plated thread (zari) defect classification system deployed for a US manufacturer (93.97% test accuracy).",
      "Developed an automated camera inspection pipeline for decoding and verifying QR barcodes on industrial thermocol substrates.",
      "Authored research paper: 'Integrated DIPlib and OpenCV Framework for Precise Geometric Characterisation of Woven Fibre-Reinforced Polymer Composites'.",
      "Implemented Flask web dashboards with MQTT status signalling and debounce logic for shop floors."
    ],
    skills: ["Zari Defect Detection", "QR on Thermocol", "DIPlib Research Paper", "Industrial MQTT", "Sub-Pixel Metrology"],
    photoPrompt: "Zari defect detection rig, microscope composite sample, or paper draft"
  },
  {
    id: "year4",
    step: 6,
    progressT: 0.80,
    shortTitle: "Fourth Year",
    title: "Summer Intern at Clarity Lab, IIT Jodhpur",
    location: "Clarity Lab, IIT Jodhpur, Rajasthan",
    period: "Fourth Year B.Tech",
    badge: "IIT Jodhpur Clarity Lab",
    summary: "Summer intern at Clarity Lab, IIT Jodhpur — engineered 360-degree real-time panoramic stitching arrays and embedded visual SLAM systems on resource-constrained edge hardware, while exploring the historic city of Jodhpur.",
    details: [
      "Joined prestigious Clarity Lab at Indian Institute of Technology (IIT) Jodhpur as Summer Intern.",
      "Engineered a 4-camera real-time panoramic video stitching array on Raspberry Pi 4B with ZeroMQ and FastAPI streaming.",
      "Benchmarked and optimized ORB-SLAM3 on Raspberry Pi 4B and Jetson Orin Nano with ARM NEON SIMD vectorization.",
      "Immersed in research culture and enjoyed exploring the historic Blue City of Jodhpur."
    ],
    skills: ["Clarity Lab IITJ", "360° Panorama Stitching", "Visual SLAM on Edge", "ORB-SLAM3", "ARM NEON SIMD"],
    photoPrompt: "Clarity Lab workspace, IIT Jodhpur campus, or multi-camera panoramic rig"
  },
  {
    id: "current",
    step: 7,
    progressT: 0.95,
    shortTitle: "Research Intern",
    title: "Research Intern at IIT Jodhpur — Point Cloud Digital Twins",
    location: "Indian Institute of Technology (IIT) Jodhpur",
    period: "Current / Ongoing",
    badge: "Current Milestone",
    summary: "Currently continuing as a Research Intern at IIT Jodhpur, spearheading cutting-edge research in 3D point cloud generation and spatial digital twins directly from monocular video streams.",
    details: [
      "Leading research on monocular depth lifting to dense 3D point clouds using MiDaS and geometric re-projection.",
      "Investigating Visual Geometry Grounded Transformers (VGGT, CVPR 2025) for feed-forward 3D room reconstruction.",
      "Integrating Segment Anything (SAM) for zero-shot 3D point cloud semantic segmentation.",
      "Actively seeking internships and R&D roles in industrial perception, edge AI, and robotics."
    ],
    skills: ["Point Cloud Digital Twins", "Monocular Video 3D", "VGGT 3D Reconstruction", "SAM 3D Segmentation", "Edge Perception"],
    photoPrompt: "3D point cloud visualization, digital twin demo, or current research setup"
  }
];

/* --------------------------------------------------------------------------
   2. THREE.JS 3D JOURNEY WORLD ENGINE
   -------------------------------------------------------------------------- */
let journeyScene, journeyCamera, journeyRenderer;
let roadCurve, carGroup, wheels = [];
let checkpointObjects = [];
let currentProgress = 0.01;
let targetProgress = 0.01;
let currentSpeed = 0;
let isAccelerating = false;
let isReversing = false;
let visitedMilestones = new Set();
let activeMilestoneModalId = null;

function initJourneyWorld() {
  const container = document.getElementById('journey-viewport-container');
  const canvas = document.getElementById('journey-canvas');
  if (!container || !canvas || typeof THREE === 'undefined') return;

  // Scene setup with soft sunny sky and fog
  journeyScene = new THREE.Scene();
  const skyColor = new THREE.Color(0xFFFDF7);
  journeyScene.background = skyColor;
  journeyScene.fog = new THREE.FogExp2(0xFFFDF7, 0.0055);

  // Camera
  journeyCamera = new THREE.PerspectiveCamera(
    48,
    container.clientWidth / container.clientHeight,
    0.2,
    1200
  );

  // Renderer
  journeyRenderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    powerPreference: 'high-performance'
  });
  journeyRenderer.setSize(container.clientWidth, container.clientHeight);
  journeyRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  journeyRenderer.shadowMap.enabled = true;
  journeyRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Cheerful Soft Lighting
  const ambientLight = new THREE.AmbientLight(0xFFFBEB, 1.4);
  journeyScene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0xFEF3C7, 0xD9F99D, 1.1);
  journeyScene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xFFF7ED, 1.8);
  sunLight.position.set(40, 80, 50);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 1024;
  sunLight.shadow.mapSize.height = 1024;
  sunLight.shadow.camera.near = 10;
  sunLight.shadow.camera.far = 300;
  sunLight.shadow.camera.left = -60;
  sunLight.shadow.camera.right = 60;
  sunLight.shadow.camera.top = 60;
  sunLight.shadow.camera.bottom = -60;
  journeyScene.add(sunLight);

  // Build the 3D World Elements
  buildRoadCurve();
  buildRoadMesh();
  buildTerrainAndMountains();
  buildLowPolyTrees();
  buildClouds();
  buildCuteCar();
  buildCheckpointMarkers();

  // Initialize Input Controls
  setupDrivingControls(container);
  setupMilestoneStepperUI();

  // Handle Resize
  function onResize() {
    if (!container || !journeyCamera || !journeyRenderer) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    journeyCamera.aspect = w / h;
    journeyCamera.updateProjectionMatrix();
    journeyRenderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = Math.min(clock.getDelta(), 0.1);

    updateCarPhysics(delta);
    updateCameraFollow();
    animateEnvironment(delta);

    journeyRenderer.render(journeyScene, journeyCamera);
  }

  animate();
}

/* --------------------------------------------------------------------------
   3. ROAD GEOMETRY & CURVE GENERATION
   -------------------------------------------------------------------------- */
function buildRoadCurve() {
  // A long, gentle winding road extending ~500 units in Z
  const points = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(5, 0.4, 30),
    new THREE.Vector3(-8, 1.0, 75),
    new THREE.Vector3(-15, 0.8, 120),
    new THREE.Vector3(4, 1.5, 170),
    new THREE.Vector3(18, 1.2, 220),
    new THREE.Vector3(8, 0.6, 275),
    new THREE.Vector3(-12, 1.4, 330),
    new THREE.Vector3(-6, 1.8, 385),
    new THREE.Vector3(12, 1.2, 440),
    new THREE.Vector3(0, 0.5, 500)
  ];

  roadCurve = new THREE.CatmullRomCurve3(points);
  roadCurve.curveType = 'catmullrom';
  roadCurve.tension = 0.5;
}

function buildRoadMesh() {
  const roadWidth = 5.2;
  const segments = 240;
  const roadShape = new THREE.Shape();
  roadShape.moveTo(-roadWidth / 2, 0);
  roadShape.lineTo(roadWidth / 2, 0);
  roadShape.lineTo(roadWidth / 2, -0.2);
  roadShape.lineTo(-roadWidth / 2, -0.2);
  roadShape.closePath();

  const extrudeSettings = {
    steps: segments,
    bevelEnabled: false,
    extrudePath: roadCurve
  };

  const roadGeo = new THREE.ExtrudeGeometry(roadShape, extrudeSettings);
  const roadMat = new THREE.MeshStandardMaterial({
    color: 0x334155, // Clean dark slate
    roughness: 0.8,
    metalness: 0.1
  });

  const roadMesh = new THREE.Mesh(roadGeo, roadMat);
  roadMesh.receiveShadow = true;
  journeyScene.add(roadMesh);

  // Dashed Yellow/Cream Center Line
  const dashCount = 75;
  const dashGeo = new THREE.BoxGeometry(0.24, 0.05, 2.2);
  const dashMat = new THREE.MeshBasicMaterial({ color: 0xFDE047 });

  for (let i = 0; i < dashCount; i++) {
    const t = i / dashCount;
    const pt = roadCurve.getPointAt(t);
    const tangent = roadCurve.getTangentAt(t).normalize();

    const dashMesh = new THREE.Mesh(dashGeo, dashMat);
    dashMesh.position.copy(pt).add(new THREE.Vector3(0, 0.06, 0));
    dashMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);
    journeyScene.add(dashMesh);
  }

  // Soft Curb Rails / Edges
  const curbMat = new THREE.MeshStandardMaterial({ color: 0xFCD34D, roughness: 0.6 });
  [-roadWidth / 2, roadWidth / 2].forEach(offset => {
    const curbPts = [];
    for (let i = 0; i <= 60; i++) {
      const t = i / 60;
      const pt = roadCurve.getPointAt(t);
      const normal = new THREE.Vector3(-roadCurve.getTangentAt(t).z, 0, roadCurve.getTangentAt(t).x).normalize();
      curbPts.push(pt.clone().add(normal.multiplyScalar(offset)));
    }
    const curbCurve = new THREE.CatmullRomCurve3(curbPts);
    const curbGeo = new THREE.TubeGeometry(curbCurve, 80, 0.12, 6, false);
    const curbMesh = new THREE.Mesh(curbGeo, curbMat);
    journeyScene.add(curbMesh);
  });
}

/* --------------------------------------------------------------------------
   4. SCENERY: ROLLING TERRAIN, MOUNTAINS, TREES & CLOUDS
   -------------------------------------------------------------------------- */
function buildTerrainAndMountains() {
  // Rolling Ground Plane
  const groundGeo = new THREE.PlaneGeometry(360, 600, 48, 64);
  groundGeo.rotateX(-Math.PI / 2);

  // Soft hill vertex displacement
  const pos = groundGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    // Smooth rolling mounds away from road
    const distFromRoad = Math.abs(x);
    if (distFromRoad > 12) {
      const hillHeight = (Math.sin(x * 0.04) * Math.cos(z * 0.03) * 6) +
                         (Math.sin(z * 0.02) * 4);
      pos.setY(i, Math.max(0, hillHeight));
    }
  }
  groundGeo.computeVertexNormals();

  const groundMat = new THREE.MeshStandardMaterial({
    color: 0xBEF264, // Gentle light meadow green
    roughness: 0.9,
    metalness: 0.05,
    flatShading: true
  });

  const groundMesh = new THREE.Mesh(groundGeo, groundMat);
  groundMesh.position.set(0, -0.25, 250);
  groundMesh.receiveShadow = true;
  journeyScene.add(groundMesh);

  // Distant Stylized Mountains (Warm Peach, Soft Lavender, Sand)
  const mountainColors = [0xFED7AA, 0xE9D5FF, 0xFDE68A, 0xFDBA74];
  for (let i = 0; i < 24; i++) {
    const radius = 18 + Math.random() * 22;
    const height = 30 + Math.random() * 45;
    const mtnGeo = new THREE.ConeGeometry(radius, height, 5);
    const col = mountainColors[i % mountainColors.length];
    const mtnMat = new THREE.MeshStandardMaterial({
      color: col,
      roughness: 0.85,
      flatShading: true
    });

    const mtnMesh = new THREE.Mesh(mtnGeo, mtnMat);
    const side = (i % 2 === 0 ? 1 : -1);
    const x = side * (75 + Math.random() * 90);
    const z = Math.random() * 560;
    mtnMesh.position.set(x, height / 2 - 5, z);
    mtnMesh.rotation.y = Math.random() * Math.PI;
    journeyScene.add(mtnMesh);
  }
}

function buildLowPolyTrees() {
  const treeColors = [0x84CC16, 0x65A30D, 0xA3E635, 0x4D7C0F];
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350F, roughness: 0.9 });

  for (let i = 0; i < 110; i++) {
    const t = Math.random();
    const pt = roadCurve.getPointAt(t);
    const side = (Math.random() > 0.5 ? 1 : -1);
    const offset = side * (6.5 + Math.random() * 28);
    const tangent = roadCurve.getTangentAt(t).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const treePos = pt.clone().add(normal.multiplyScalar(offset));

    const treeGroup = new THREE.Group();
    treeGroup.position.copy(treePos);

    // Trunk
    const trunkGeo = new THREE.CylinderGeometry(0.2, 0.35, 1.8, 6);
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 0.9;
    trunk.castShadow = true;
    treeGroup.add(trunk);

    // Foliage (Stacked Cones)
    const folColor = treeColors[Math.floor(Math.random() * treeColors.length)];
    const folMat = new THREE.MeshStandardMaterial({
      color: folColor,
      roughness: 0.75,
      flatShading: true
    });

    const cone1 = new THREE.Mesh(new THREE.ConeGeometry(1.6, 2.2, 6), folMat);
    cone1.position.y = 2.4;
    cone1.castShadow = true;
    treeGroup.add(cone1);

    const cone2 = new THREE.Mesh(new THREE.ConeGeometry(1.2, 1.8, 6), folMat);
    cone2.position.y = 3.4;
    cone2.castShadow = true;
    treeGroup.add(cone2);

    const scale = 0.75 + Math.random() * 0.5;
    treeGroup.scale.set(scale, scale, scale);
    journeyScene.add(treeGroup);
  }
}

let cloudMeshes = [];
function buildClouds() {
  const cloudMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: 0.4,
    transparent: true,
    opacity: 0.92,
    flatShading: true
  });

  for (let i = 0; i < 22; i++) {
    const cloudGroup = new THREE.Group();
    const puffCount = 3 + Math.floor(Math.random() * 3);

    for (let p = 0; p < puffCount; p++) {
      const puffGeo = new THREE.SphereGeometry(3 + Math.random() * 3.5, 6, 6);
      const puff = new THREE.Mesh(puffGeo, cloudMat);
      puff.position.set((p - puffCount / 2) * 3.5, Math.random() * 1.5, Math.random() * 2);
      cloudGroup.add(puff);
    }

    cloudGroup.position.set(
      (Math.random() - 0.5) * 280,
      38 + Math.random() * 25,
      Math.random() * 540
    );

    cloudMeshes.push(cloudGroup);
    journeyScene.add(cloudGroup);
  }
}

function animateEnvironment(delta) {
  // Gently drift clouds
  cloudMeshes.forEach(cloud => {
    cloud.position.x += delta * 1.2;
    if (cloud.position.x > 150) cloud.position.x = -150;
  });

  // Rotate checkpoint floating gems
  checkpointObjects.forEach(cp => {
    if (cp.gem) {
      cp.gem.rotation.y += delta * 1.5;
      cp.gem.rotation.x += delta * 0.8;
      cp.gem.position.y = cp.initialGemY + Math.sin(Date.now() * 0.003 + cp.step) * 0.3;
    }
  });
}

/* --------------------------------------------------------------------------
   5. THE CUTE 3D VEHICLE
   -------------------------------------------------------------------------- */
function buildCuteCar() {
  carGroup = new THREE.Group();

  // Materials
  const carPaintMat = new THREE.MeshPhysicalMaterial({
    color: 0xFBBF24, // Sunny Yellow
    roughness: 0.25,
    metalness: 0.1,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2
  });

  const cabinMat = new THREE.MeshPhysicalMaterial({
    color: 0xBAE6FD, // Tinted sky blue glass
    roughness: 0.15,
    transmission: 0.75,
    thickness: 0.5,
    transparent: true,
    opacity: 0.85
  });

  const blackTrimMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.6 });
  const wheelRubberMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.9 });
  const hubcapMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.3, metalness: 0.5 });
  const headlightMat = new THREE.MeshBasicMaterial({ color: 0xFEF08A });
  const taillightMat = new THREE.MeshBasicMaterial({ color: 0xEF4444 });

  // 1. Lower Body Chassis
  const bodyGeo = new THREE.BoxGeometry(1.5, 0.65, 2.7);
  const bodyMesh = new THREE.Mesh(bodyGeo, carPaintMat);
  bodyMesh.position.y = 0.55;
  bodyMesh.castShadow = true;
  carGroup.add(bodyMesh);

  // 2. Cabin / Roof
  const cabinGeo = new THREE.BoxGeometry(1.25, 0.65, 1.45);
  const cabinMesh = new THREE.Mesh(cabinGeo, cabinMat);
  cabinMesh.position.set(0, 1.1, -0.15);
  cabinMesh.castShadow = true;
  carGroup.add(cabinMesh);

  // Cabin Roof Cap
  const roofCapGeo = new THREE.BoxGeometry(1.28, 0.1, 1.48);
  const roofCap = new THREE.Mesh(roofCapGeo, carPaintMat);
  roofCap.position.set(0, 1.45, -0.15);
  carGroup.add(roofCap);

  // 3. Cute Bumper Front & Rear
  const bumperGeo = new THREE.BoxGeometry(1.55, 0.22, 0.25);
  const frontBumper = new THREE.Mesh(bumperGeo, blackTrimMat);
  frontBumper.position.set(0, 0.35, 1.38);
  carGroup.add(frontBumper);

  const rearBumper = new THREE.Mesh(bumperGeo, blackTrimMat);
  rearBumper.position.set(0, 0.35, -1.38);
  carGroup.add(rearBumper);

  // 4. Headlights (Front Glowing Eyes)
  const headlightGeo = new THREE.SphereGeometry(0.16, 16, 16);
  const leftHeadlight = new THREE.Mesh(headlightGeo, headlightMat);
  leftHeadlight.position.set(-0.5, 0.65, 1.36);
  carGroup.add(leftHeadlight);

  const rightHeadlight = new THREE.Mesh(headlightGeo, headlightMat);
  rightHeadlight.position.set(0.5, 0.65, 1.36);
  carGroup.add(rightHeadlight);

  // 5. Taillights
  const taillightGeo = new THREE.BoxGeometry(0.24, 0.14, 0.08);
  const leftTaillight = new THREE.Mesh(taillightGeo, taillightMat);
  leftTaillight.position.set(-0.52, 0.65, -1.36);
  carGroup.add(leftTaillight);

  const rightTaillight = new THREE.Mesh(taillightGeo, taillightMat);
  rightTaillight.position.set(0.52, 0.65, -1.36);
  carGroup.add(rightTaillight);

  // 6. Cute Spoiler / Luggage Rack
  const rackGeo = new THREE.BoxGeometry(1.0, 0.08, 0.8);
  const rack = new THREE.Mesh(rackGeo, blackTrimMat);
  rack.position.set(0, 1.54, -0.15);
  carGroup.add(rack);

  // 7. Wheels (4 rotatable wheels)
  const wheelPositions = [
    { x: -0.82, y: 0.35, z: 0.8 },   // Front Left
    { x: 0.82, y: 0.35, z: 0.8 },    // Front Right
    { x: -0.82, y: 0.35, z: -0.8 },  // Rear Left
    { x: 0.82, y: 0.35, z: -0.8 }    // Rear Right
  ];

  const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.28, 18);
  wheelGeo.rotateZ(Math.PI / 2);

  const capGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.3, 12);
  capGeo.rotateZ(Math.PI / 2);

  wheelPositions.forEach(pos => {
    const wheelGroup = new THREE.Group();
    wheelGroup.position.set(pos.x, pos.y, pos.z);

    const tire = new THREE.Mesh(wheelGeo, wheelRubberMat);
    tire.castShadow = true;
    wheelGroup.add(tire);

    const cap = new THREE.Mesh(capGeo, hubcapMat);
    wheelGroup.add(cap);

    carGroup.add(wheelGroup);
    wheels.push(wheelGroup);
  });

  // Scale car nicely
  carGroup.scale.set(0.9, 0.9, 0.9);
  journeyScene.add(carGroup);

  // Place car at starting position
  updateCarTransform(currentProgress);
}

function updateCarTransform(t) {
  if (!roadCurve || !carGroup) return;
  const clampedT = THREE.MathUtils.clamp(t, 0.001, 0.999);
  const pos = roadCurve.getPointAt(clampedT);
  const tangent = roadCurve.getTangentAt(clampedT).normalize();

  // Offset car vertically to sit flush on top of the road
  carGroup.position.copy(pos).add(new THREE.Vector3(0, 0.18, 0));

  // Align car direction to road tangent
  const up = new THREE.Vector3(0, 1, 0);
  const matrix = new THREE.Matrix4();
  matrix.lookAt(new THREE.Vector3(0, 0, 0), tangent, up);
  carGroup.quaternion.setFromRotationMatrix(matrix);
}

/* --------------------------------------------------------------------------
   6. CHECKPOINT MARKERS (3D ARCHES & INTERACTIVE GEMS)
   -------------------------------------------------------------------------- */
function buildCheckpointMarkers() {
  const archWoodMat = new THREE.MeshStandardMaterial({ color: 0x78350F, roughness: 0.8 });
  const archSignMat = new THREE.MeshStandardMaterial({ color: 0xFFFBEB, roughness: 0.3 });
  const gemColors = [0xF59E0B, 0x84CC16, 0x0EA5E9, 0xFB923C, 0xA855F7, 0x10B981, 0xF43F5E];

  MILESTONES_DATA.forEach((milestone, idx) => {
    const t = milestone.progressT;
    const pt = roadCurve.getPointAt(t);
    const tangent = roadCurve.getTangentAt(t).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

    const checkpointGroup = new THREE.Group();
    checkpointGroup.position.copy(pt);

    // Arch Pillars (Left and Right)
    const pillarGeo = new THREE.CylinderGeometry(0.25, 0.28, 5.2, 8);
    const leftPillar = new THREE.Mesh(pillarGeo, archWoodMat);
    leftPillar.position.copy(normal.clone().multiplyScalar(-3.2)).setY(2.6);
    leftPillar.castShadow = true;
    checkpointGroup.add(leftPillar);

    const rightPillar = new THREE.Mesh(pillarGeo, archWoodMat);
    rightPillar.position.copy(normal.clone().multiplyScalar(3.2)).setY(2.6);
    rightPillar.castShadow = true;
    checkpointGroup.add(rightPillar);

    // Arch Overhead Crossbar
    const beamGeo = new THREE.BoxGeometry(6.8, 0.45, 0.5);
    const beam = new THREE.Mesh(beamGeo, archWoodMat);
    beam.position.set(0, 5.1, 0);
    // Align with road normal
    beam.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), normal);
    checkpointGroup.add(beam);

    // Signboard
    const signGeo = new THREE.BoxGeometry(5.0, 1.2, 0.2);
    const sign = new THREE.Mesh(signGeo, archSignMat);
    sign.position.set(0, 4.4, 0);
    sign.quaternion.setFromUnitVectors(new THREE.Vector3(1, 0, 0), normal);
    checkpointGroup.add(sign);

    // Floating Rotating Milestone Gem (Octahedron / Jewel)
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: gemColors[idx % gemColors.length],
      emissive: gemColors[idx % gemColors.length],
      emissiveIntensity: 0.35,
      roughness: 0.1,
      metalness: 0.2,
      clearcoat: 1.0
    });
    const gemGeo = new THREE.OctahedronGeometry(0.7, 0);
    const gem = new THREE.Mesh(gemGeo, gemMat);
    gem.position.set(0, 6.4, 0);
    checkpointGroup.add(gem);

    // Clickable hit zone for interactive clicking
    const hitGeo = new THREE.SphereGeometry(3.5, 12, 12);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitMesh = new THREE.Mesh(hitGeo, hitMat);
    hitMesh.position.set(0, 3.5, 0);
    hitMesh.userData = { milestoneId: milestone.id, step: milestone.step };
    checkpointGroup.add(hitMesh);

    journeyScene.add(checkpointGroup);

    checkpointObjects.push({
      id: milestone.id,
      step: milestone.step,
      progressT: milestone.progressT,
      gem: gem,
      initialGemY: 6.4,
      hitMesh: hitMesh
    });
  });
}

/* --------------------------------------------------------------------------
   7. CAR DRIVING PHYSICS & CONTROLS
   -------------------------------------------------------------------------- */
function setupDrivingControls(container) {
  // 1. Mouse Click & Hold anywhere on container to accelerate
  let isPointerDown = false;

  container.addEventListener('pointerdown', (e) => {
    // Check if clicked directly on an interactive milestone hitMesh
    const rect = container.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), journeyCamera);

    const hitMeshes = checkpointObjects.map(cp => cp.hitMesh);
    const intersects = raycaster.intersectObjects(hitMeshes);

    if (intersects.length > 0) {
      const clickedId = intersects[0].object.userData.milestoneId;
      openMilestoneModal(clickedId);
      return;
    }

    isPointerDown = true;
    isAccelerating = true;
    updatePedalUI();
  });

  window.addEventListener('pointerup', () => {
    if (isPointerDown) {
      isPointerDown = false;
      isAccelerating = false;
      updatePedalUI();
    }
  });

  // 2. Keyboard Controls (Up/Down arrows & W/S keys)
  window.addEventListener('keydown', (e) => {
    if (activeMilestoneModalId) return; // Ignore if modal open

    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      isAccelerating = true;
      e.preventDefault();
      updatePedalUI();
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      isReversing = true;
      e.preventDefault();
      updatePedalUI();
    }
  });

  window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      isAccelerating = false;
      updatePedalUI();
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      isReversing = false;
      updatePedalUI();
    }
  });

  // 3. On-Screen Touch/Click Drive Pedals
  const driveBtn = document.getElementById('pedal-drive-btn');
  const reverseBtn = document.getElementById('pedal-reverse-btn');

  if (driveBtn) {
    const startDrive = (e) => {
      e.preventDefault();
      isAccelerating = true;
      updatePedalUI();
    };
    const endDrive = (e) => {
      e.preventDefault();
      isAccelerating = false;
      updatePedalUI();
    };

    driveBtn.addEventListener('mousedown', startDrive);
    driveBtn.addEventListener('mouseup', endDrive);
    driveBtn.addEventListener('touchstart', startDrive, { passive: false });
    driveBtn.addEventListener('touchend', endDrive);
  }

  if (reverseBtn) {
    const startRev = (e) => {
      e.preventDefault();
      isReversing = true;
      updatePedalUI();
    };
    const endRev = (e) => {
      e.preventDefault();
      isReversing = false;
      updatePedalUI();
    };

    reverseBtn.addEventListener('mousedown', startRev);
    reverseBtn.addEventListener('mouseup', endRev);
    reverseBtn.addEventListener('touchstart', startRev, { passive: false });
    reverseBtn.addEventListener('touchend', endRev);
  }
}

function updatePedalUI() {
  const driveBtn = document.getElementById('pedal-drive-btn');
  const reverseBtn = document.getElementById('pedal-reverse-btn');
  if (driveBtn) {
    if (isAccelerating) driveBtn.classList.add('driving');
    else driveBtn.classList.remove('driving');
  }
  if (reverseBtn) {
    if (isReversing) reverseBtn.classList.add('driving');
    else reverseBtn.classList.remove('driving');
  }
}

function updateCarPhysics(delta) {
  const maxForwardSpeed = 0.045; // Units of progress per second
  const maxReverseSpeed = -0.025;
  const accelRate = 0.06;
  const brakeRate = 0.08;
  const friction = 0.94;

  if (isAccelerating) {
    currentSpeed += accelRate * delta;
    if (currentSpeed > maxForwardSpeed) currentSpeed = maxForwardSpeed;
  } else if (isReversing) {
    currentSpeed -= accelRate * delta;
    if (currentSpeed < maxReverseSpeed) currentSpeed = maxReverseSpeed;
  } else {
    currentSpeed *= friction;
    if (Math.abs(currentSpeed) < 0.0001) currentSpeed = 0;
  }

  // Smooth target jump interpolation (when clicking a milestone pill)
  if (targetProgress !== null && targetProgress !== currentProgress) {
    const diff = targetProgress - currentProgress;
    if (Math.abs(diff) > 0.002) {
      currentSpeed = Math.sign(diff) * Math.min(Math.abs(diff) * 2.5, 0.05);
    } else {
      currentProgress = targetProgress;
      currentSpeed = 0;
      targetProgress = null;
    }
  }

  currentProgress += currentSpeed * delta;
  currentProgress = THREE.MathUtils.clamp(currentProgress, 0.002, 0.998);

  // Update car position & rotation
  updateCarTransform(currentProgress);

  // Spin wheels according to speed
  const wheelSpin = currentSpeed * delta * 220;
  wheels.forEach(w => {
    w.rotation.x += wheelSpin;
  });

  // Update speedometer & progress HUD
  updateHUD(currentSpeed, currentProgress);

  // Check proximity to checkpoints
  checkMilestoneTriggers(currentProgress);
}

function updateCameraFollow() {
  if (!roadCurve || !carGroup || !journeyCamera) return;

  const t = THREE.MathUtils.clamp(currentProgress, 0.001, 0.999);
  const carPos = roadCurve.getPointAt(t);
  const tangent = roadCurve.getTangentAt(t).normalize();

  // Position camera behind and above the car
  const camOffsetDist = 8.5;
  const camHeight = 3.6;
  const targetCamPos = carPos.clone()
    .sub(tangent.clone().multiplyScalar(camOffsetDist))
    .add(new THREE.Vector3(0, camHeight, 0));

  journeyCamera.position.lerp(targetCamPos, 0.09);
  journeyCamera.lookAt(carPos.x, carPos.y + 0.9, carPos.z);
}

/* --------------------------------------------------------------------------
   8. HUD & MILESTONE INTERACTION ENGINE
   -------------------------------------------------------------------------- */
function updateHUD(speed, progress) {
  const speedEl = document.getElementById('hud-speed-val');
  const odoEl = document.getElementById('hud-progress-pct');

  if (speedEl) {
    const displayMph = Math.round(Math.abs(speed) * 800);
    speedEl.textContent = `${displayMph} km/h`;
  }

  if (odoEl) {
    const pct = Math.round(progress * 100);
    odoEl.textContent = `${pct}% Complete`;
  }
}

function setupMilestoneStepperUI() {
  const stepperContainer = document.getElementById('milestone-stepper-container');
  if (!stepperContainer) return;

  stepperContainer.innerHTML = '';
  MILESTONES_DATA.forEach(milestone => {
    const pill = document.createElement('button');
    pill.id = `stepper-pill-${milestone.id}`;
    pill.className = 'milestone-step-pill';
    pill.innerHTML = `<span>#${milestone.step}</span> <span>${milestone.shortTitle}</span>`;
    
    pill.addEventListener('click', () => {
      jumpToMilestone(milestone.id);
    });

    stepperContainer.appendChild(pill);
  });
}

function jumpToMilestone(id) {
  const milestone = MILESTONES_DATA.find(m => m.id === id);
  if (!milestone) return;

  targetProgress = milestone.progressT;
  openMilestoneModal(id);
}

function checkMilestoneTriggers(progress) {
  MILESTONES_DATA.forEach(milestone => {
    const dist = Math.abs(progress - milestone.progressT);

    // Active pill state
    const pill = document.getElementById(`stepper-pill-${milestone.id}`);
    if (dist < 0.04) {
      if (pill) pill.classList.add('active');
    } else {
      if (pill) pill.classList.remove('active');
    }

    // Auto-discover check
    if (dist < 0.015 && !visitedMilestones.has(milestone.id)) {
      visitedMilestones.add(milestone.id);
      if (pill) pill.classList.add('visited');
      
      // Cheerful celebration trigger
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { x: 0.5, y: 0.6 },
          colors: ['#FBBF24', '#BEF264', '#FB923C', '#F43F5E', '#A78BFA']
        });
      }

      // Automatically popup the milestone modal on arrival
      openMilestoneModal(milestone.id);
    }
  });
}

/* --------------------------------------------------------------------------
   9. EXPANDABLE MILESTONE MODAL
   -------------------------------------------------------------------------- */
function openMilestoneModal(id) {
  const data = MILESTONES_DATA.find(m => m.id === id);
  if (!data) return;

  activeMilestoneModalId = id;
  const overlay = document.getElementById('milestone-modal-overlay');
  if (!overlay) return;

  document.getElementById('milestone-modal-badge').textContent = data.badge;
  document.getElementById('milestone-modal-title').textContent = data.title;
  document.getElementById('milestone-modal-period').textContent = `${data.period} • ${data.location}`;
  document.getElementById('milestone-modal-summary').textContent = data.summary;
  document.getElementById('milestone-photo-label').textContent = data.photoPrompt;

  // Skills Pills
  const skillsContainer = document.getElementById('milestone-modal-skills');
  skillsContainer.innerHTML = '';
  data.skills.forEach(skill => {
    const badge = document.createElement('span');
    badge.className = 'badge-pill badge-green text-xs';
    badge.textContent = skill;
    skillsContainer.appendChild(badge);
  });

  // Details List
  const detailsContainer = document.getElementById('milestone-modal-details');
  detailsContainer.innerHTML = '';
  data.details.forEach(item => {
    const li = document.createElement('li');
    li.className = 'flex items-start gap-2.5 text-slate-700 text-sm leading-relaxed';
    li.innerHTML = `<span class="text-amber-500 font-bold text-base mt-0.5">✦</span> <span>${item}</span>`;
    detailsContainer.appendChild(li);
  });

  // Next Milestone navigation
  const nextBtn = document.getElementById('milestone-modal-next-btn');
  if (nextBtn) {
    const nextIndex = MILESTONES_DATA.findIndex(m => m.id === id) + 1;
    if (nextIndex < MILESTONES_DATA.length) {
      nextBtn.style.display = 'inline-flex';
      nextBtn.onclick = () => {
        closeMilestoneModal();
        jumpToMilestone(MILESTONES_DATA[nextIndex].id);
      };
    } else {
      nextBtn.style.display = 'none';
    }
  }

  overlay.classList.add('active');
}

function closeMilestoneModal() {
  const overlay = document.getElementById('milestone-modal-overlay');
  if (overlay) overlay.classList.remove('active');
  activeMilestoneModalId = null;
}

// Modal Close Listeners
document.addEventListener('click', (e) => {
  const overlay = document.getElementById('milestone-modal-overlay');
  if (e.target === overlay) closeMilestoneModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && activeMilestoneModalId) closeMilestoneModal();
});

const closeMilestoneBtn = document.getElementById('close-milestone-modal-btn');
if (closeMilestoneBtn) closeMilestoneBtn.addEventListener('click', closeMilestoneModal);

const continueDriveBtn = document.getElementById('milestone-continue-drive-btn');
if (continueDriveBtn) continueDriveBtn.addEventListener('click', closeMilestoneModal);

/* --------------------------------------------------------------------------
   10. STANDARD PROJECTS DATA & MODAL SYSTEM (FROM PORTFOLIO CONTENT)
   -------------------------------------------------------------------------- */
const PROJECTS_DATA = {
  orb_slam3: {
    title: "ORB-SLAM3 Optimization on Raspberry Pi 4B + CNN-Based Loop Closing",
    domain: "SLAM / Robotics / Edge AI",
    summary: "Deployed and benchmarked ORB-SLAM3 on resource-constrained ARM hardware, and investigated replacing Bag-of-Words loop closure with a CNN-based place-recognition approach.",
    whyItMatters: "Demonstrates deep proficiency inside a complex research C++ codebase on embedded Linux with real-world performance engineering.",
    hardware: "Raspberry Pi 4B, Jetson Orin Nano, Custom Stereo Camera Rig",
    techStack: ["C++", "ORB-SLAM3", "Pangolin", "DBoW2", "g2o", "Sophus", "ONNX Runtime", "ARM NEON", "OpenMP"],
    highlights: [
      "Ran ORB-SLAM3 in stereo and stereo-inertial configurations directly on Raspberry Pi 4B and Jetson Orin Nano.",
      "Built the full dependency stack from source: Pangolin, DBoW2, g2o, Sophus with ARM architecture tuning.",
      "Created and calibrated custom stereo camera datasets; debugged Stereo.T_c1_c2 convention differences between MATLAB and ORB-SLAM3 configs.",
      "Benchmarked against EuRoC datasets; instrumented C++ code for FPS logging and Absolute Trajectory Error (ATE) computation.",
      "Leveraged ARM-specific optimizations (-O3, architecture tuning, NEON/SIMD vectorization, and OpenMP multi-threading).",
      "Explored CNN place-recognition for loop closing via ONNX Runtime inference."
    ],
    metrics: "Benchmarked on EuRoC dataset; achieved real-time execution with ARM NEON vectorization.",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },
  defect_detection: {
    title: "Industrial Defect Detection — Metal-Plated Thread / Textile Inspection",
    domain: "Industrial AI / Computer Vision / Deployed",
    summary: "End-to-end industrial inspection system classifying metal-plated thread as defective / non-defective, deployed for a US-based manufacturer with live camera feed and factory signalling.",
    whyItMatters: "A production-grade industrial perception pipeline covering high-speed image acquisition, preprocessing, sub-pixel measurement, inference, and factory-floor debounce logic.",
    hardware: "Industrial CMOS Camera, Industrial Edge Gateway, Factory PLC signalling interface",
    techStack: ["Python", "OpenCV", "Random Forest", "Lab Colour Space", "CLAHE", "Flask", "MQTT", "ZeroMQ"],
    highlights: [
      "Curated dataset of ~1,407 high-resolution industrial textile images with binary defective / non-defective classification.",
      "Engineered a robust preprocessing pipeline: Lab colour space → CLAHE → b-channel analysis → thresholding → ROI extraction → normalization & padding.",
      "Trained an optimized Random Forest classifier delivering 92.9% validation and 93.97% test accuracy.",
      "Built a responsive Flask web inspection dashboard with real-time camera streaming.",
      "Integrated MQTT for distributed status communication and added custom debounce logic for stability."
    ],
    metrics: "~300 µm measurement accuracy | 93.97% test accuracy on factory floor",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },
  stm32_turbulence: {
    title: "STM32 Aircraft Turbulence & Abnormal-Motion Detection",
    domain: "Embedded / Edge AI / Signal Processing",
    summary: "A sensor-to-inference embedded pipeline that detects abnormal aircraft motion (e.g., severe turbulence) across flight phases using an IMU on an STM32 ARM Cortex-M4 microcontroller.",
    whyItMatters: "Complete end-to-end embedded engineering: low-level hardware interrupts, DMA/ADC signal conditioning, and on-device tinyML inference without cloud dependency.",
    hardware: "STM32F411RE Nucleo Board, MPU6050 6-DOF IMU, FTDI UART Bridge",
    techStack: ["C / C++", "STM32CubeIDE", "HAL Drivers", "Timers & Interrupts", "NanoEdge AI Studio"],
    highlights: [
      "Architected interrupt-driven data acquisition on STM32F411RE utilizing hardware timers, ADC, GPIO interrupts, and UART logging.",
      "Collected vibration telemetry across 8 motion classes: normal/abnormal across taxi, takeoff, cruise flight, and landing.",
      "Deployed NanoEdge AI Studio on-device anomaly detection and classification directly inside STM32 SRAM/Flash."
    ],
    metrics: "Sub-millisecond inference time on ARM Cortex-M4; 8 distinct motion classes",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },
  bionic_prosthetic: {
    title: "Myoelectric Bionic Prosthetic Arm with Gesture Recognition",
    domain: "Biomedical / Robotics / Embedded Systems",
    summary: "A functional bionic prosthetic-arm prototype controlled by user muscle activity — surface EMG signals are classified in real-time into gestures that actuate articulated servos.",
    whyItMatters: "Direct intersection of biomedical signal processing, machine learning, and multi-actuator mechanical kinematics to restore assistive functionality.",
    hardware: "MyoWare 2.0 EMG Sensors, Raspberry Pi / Arduino UNO, PCA9685 16-Channel PWM Driver, MG996R Servos",
    techStack: ["Embedded C++", "Python", "Biomedical Signal Processing", "PCA9685 I2C", "Feature Extraction"],
    highlights: [
      "Acquired surface electromyography (sEMG) biosignals using MyoWare 2.0 electrodes placed over forearm muscle groups.",
      "Performed real-time filtering, envelope detection, and time-domain feature extraction.",
      "Achieved 97% recognition accuracy across 7 distinct hand gestures.",
      "Drove multiple high-torque robotic finger actuators via PCA9685 PWM driver over I2C."
    ],
    metrics: "97% gesture recognition accuracy across 7 hand gestures",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },
  diabetic_retinopathy: {
    title: "Explainable Attention-Based Ensemble for Diabetic Retinopathy Detection",
    domain: "Medical AI / Deep Learning / Explainable AI",
    summary: "Proposed deep learning framework for automated diabetic retinopathy detection and severity grading from retinal fundus images with attention-guided clinical explainability.",
    whyItMatters: "Combines cutting-edge attention mechanisms with multimodal clinical explainability (Grad-CAM), helping ophthalmologists verify AI diagnoses.",
    hardware: "High-performance GPU Compute (Google Colab / Local workstation)",
    techStack: ["PyTorch", "Vision Transformers", "CNNs", "Attention Mechanisms", "Grad-CAM", "APTOS 2019"],
    highlights: [
      "Engineered feature fusion ensemble combining convolutional backbones with spatial and channel attention mechanisms.",
      "Targets both binary screening (normal vs diseased) and fine-grained 5-class clinical severity grading.",
      "Built-in clinical explainability with Grad-CAM and attention map visualizations.",
      "Prior groundwork on APTOS 2019 dataset using 103 hand-crafted features with XGBoost & SVM (~74% accuracy)."
    ],
    metrics: "Comprehensive 5-tier clinical severity classification with visual attention heatmaps",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },
  mars_sfs: {
    title: "Mars Digital Elevation Model (DEM) Generation via Shape-from-Shading",
    domain: "Computer Vision / Remote Sensing / Planetary Science",
    summary: "Generating high-resolution Martian 3D digital elevation models from single orbital satellite images using physics-based photometric shape-from-shading (SfS).",
    whyItMatters: "Unites physics-based planetary reflectance modeling, numerical PDE optimization, and scientific planetary raster computing.",
    hardware: "Planetary Science Raster Workstation",
    techStack: ["Python", "NASA CTX / HiRISE", "Hapke & Lambertian Reflectance", "Plotly 3D", "GDAL"],
    highlights: [
      "Processed raw NASA CTX orbital tiles (e.g., tile V22_088343_1747_XN_05S061W) and HiRISE high-resolution imagery.",
      "Implemented Shape-from-Shading utilizing both Lambertian and non-linear Hapke planetary reflectance models.",
      "Developed iterative numerical refinement pipeline: brightness → surface slope → height integration → surface normals → predicted radiance.",
      "Rendered interactive 3D terrain mesh visualizations with Plotly."
    ],
    metrics: "Continuous 3D topography generation from single-image Martian satellite imagery",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },
  panoramic_stitching: {
    title: "Four-Camera Real-Time Panoramic Stitching on Raspberry Pi",
    domain: "Embedded Vision / Edge Streaming / Systems",
    summary: "Headless real-time panoramic stitching system running on a Raspberry Pi, streaming stitched multi-camera video over ZeroMQ and WebSockets to downstream depth estimation.",
    whyItMatters: "Demonstrates advanced multi-threaded video pipeline design, headless camera calibration, and low-latency IPC under strict SBC compute budgets.",
    hardware: "Raspberry Pi 4B, 3x USB (V4L2) Cameras + 1x CSI Camera (Picamera2)",
    techStack: ["Python", "FastAPI", "Uvicorn", "WebSockets", "ZeroMQ", "SIFT", "Remap Warping", "MiDaS Depth"],
    highlights: [
      "Synchronized 4 heterogeneous cameras (3 USB V4L2 + 1 CSI Picamera2) in an evolved multi-camera panoramic rig.",
      "Precomputed homography matrices using SIFT with disk persistence, feather alpha blending, and precomputed remap warping.",
      "Broadcasted video frames via ZeroMQ PUB socket (port 5555) alongside a lightweight FastAPI WebSocket browser interface.",
      "Integrated MiDaS monocular depth estimation pipeline with custom seam inpainting."
    ],
    metrics: "Real-time headless multi-camera stitching with zero-copy local IPC streaming",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },
  stereo_depth: {
    title: "Stereo Depth Mapping Pipeline with Disparity Filtering",
    domain: "Computer Vision / 3D Reconstruction",
    summary: "Stereo camera depth estimation utilizing StereoSGBM with Weighted Least Squares (WLS) filtering for clean, metric disparity and depth point clouds.",
    whyItMatters: "Solid foundation in epipolar geometry, stereo rectification, calibration matrices, and sub-pixel disparity matching.",
    hardware: "Synchronized Dual Camera Baseline Rig",
    techStack: ["Python", "OpenCV", "StereoSGBM", "WLS Fast Global Smoother", "Camera Calibration"],
    highlights: [
      "Calibrated baseline cameras using chessboard calibration with epipolar validation and rectification matrices.",
      "Implemented StereoSGBM with fine-tuned block size, disparity search range, and uniqueness ratios.",
      "Integrated WLS filtering to eradicate disparity noise and edge bleeding.",
      "Generated false-color colourized depth maps and point cloud exports."
    ],
    metrics: "Crisp disparity boundaries with sub-pixel depth resolution",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },
  monocular_depth: {
    title: "Monocular Depth Estimation & 3D Point Cloud Lifting",
    domain: "3D Vision / Deep Learning / Digital Twins",
    summary: "Recovering dense depth from monocular video feeds using MiDaS and lifting 2D frames into dense 3D point clouds. Exploring VGGT feed-forward 3D reconstruction and SAM point-cloud segmentation.",
    whyItMatters: "Directly powers current monocular digital-twin research at IIT Jodhpur, turning regular single cameras into 3D spatial models.",
    hardware: "Edge SBCs & CUDA GPU Accelerators",
    techStack: ["MiDaS", "VGGT (CVPR 2025)", "Segment Anything (SAM)", "Open3D", "PyTorch"],
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
    summary: "Automated micro-granulometry system measuring granular particles from macro images with real-world physical calibration via QR-code reference markers.",
    whyItMatters: "Solves physical metrology challenges by bridging pixel coordinates with real-world millimeters through optical fiducials.",
    hardware: "Optical Macro Camera Rig, Reference Calibration Targets",
    techStack: ["Python", "OpenCV", "Fiducial QR Scaling", "Morphological Filtering", "Contour Analysis"],
    highlights: [
      "Developed an automated pipeline using QR-code fiducial reference markers to calculate instantaneous pixel-to-millimeter scale factors.",
      "Applied adaptive thresholding and watershed segmentation to isolate individual overlapping sand grains.",
      "Extracted morphological parameters (Feret diameter, aspect ratio, circularity, sieve size distribution curves)."
    ],
    metrics: "Micron-level grain distribution mapping with automatic scale calibration",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },
  qr_augmentation: {
    title: "Robust QR Code Augmentation Pipeline for Machine Vision",
    domain: "Computer Vision / Synthetic Data / Robustness",
    summary: "Synthetic dataset generation pipeline applying realistic physical, optical, and environmental distortions to QR barcodes while mathematically guaranteeing finder-pattern decodability.",
    whyItMatters: "Crucial for training robust industrial barcode readers that survive harsh lighting, scratches, and perspective skew.",
    hardware: "Standard Workstation",
    techStack: ["Python", "NumPy", "OpenCV", "Synthetic Image Generation", "Adaptive Kernel Scaling"],
    highlights: [
      "Simulated real-world degradation: motion blur, glare, sensor noise, perspective affine shearing, and partial occlusion.",
      "Implemented module-size-adaptive kernel scaling to preserve finder-pattern geometrical integrity.",
      "Built batch data generator feeding tens of thousands of augmented barcodes into computer vision pipelines."
    ],
    metrics: "10,000+ synthetic augmented test samples generated with verified finder patterns",
    githubLink: "https://github.com/janhavi-pohnerkar"
  },
  supporting_projects: {
    title: "Hardware & Systems Engineering Highlights",
    domain: "Embedded Systems / Network Security / Electronics",
    summary: "A curated trio of focused engineering solutions spanning pure pixel analysis, network security simulation, and bare-metal STM32 sensor HAL drivers.",
    whyItMatters: "Demonstrates versatility across algorithmic edge cases (OCR without neural networks) and low-level I2C/SPI protocols.",
    hardware: "STM32 Nucleo, BH1750FVI Ambient Light, HTU21D Temp/Humidity, MPU6050",
    techStack: ["C / STM32 HAL", "Python", "FastAPI", "Cisco Packet Tracer", "Otsu Thresholding"],
    highlights: [
      "7-Segment LED Display Reader: Zero-dependency pixel analysis without heavy OCR libraries using Otsu thresholding and projection-profile localization.",
      "Cold-Storage Intrusion Detection System (IDS): Simulated secure warehouse environment in Cisco Packet Tracer interconnected with FastAPI.",
      "Embedded Sensor Study Series: Author of bare-metal HAL implementation guides for STM32 with BH1750FVI, HTU21D, and MPU6050 sensors."
    ],
    metrics: "3 standalone embedded & networking implementations",
    githubLink: "https://github.com/janhavi-pohnerkar"
  }
};

/* --------------------------------------------------------------------------
   11. PROJECT FILTERING & STANDARD MODALS
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

    const tagsContainer = document.getElementById('modal-tech-tags');
    tagsContainer.innerHTML = '';
    data.techStack.forEach(tech => {
      const tagPill = document.createElement('span');
      tagPill.className = 'badge-pill badge-yellow';
      tagPill.textContent = tech;
      tagsContainer.appendChild(tagPill);
    });

    const highlightsContainer = document.getElementById('modal-highlights');
    highlightsContainer.innerHTML = '';
    data.highlights.forEach(item => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-2 text-slate-700 text-sm leading-relaxed';
      li.innerHTML = `<span class="text-amber-500 font-bold text-base leading-none mt-0.5">✦</span> <span>${item}</span>`;
      highlightsContainer.appendChild(li);
    });

    const modalGithubBtn = document.getElementById('modal-github-link');
    if (modalGithubBtn) modalGithubBtn.href = data.githubLink;

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

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
  });
}

/* --------------------------------------------------------------------------
   12. CONTACT FORM & UTILITIES
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

    if (successBox) successBox.classList.remove('hidden');
    form.reset();

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#FBBF24', '#BEF264', '#FB923C', '#F43F5E']
      });
    }
    showToast("💌 Message prepared! Looking forward to connecting!");
  });
}

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
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailToCopy).then(() => {
        showToast("Copied janhavi.pohnerkar@gmail.com to clipboard! 📬");
      }).catch(() => {
        showToast("Email: janhavi.pohnerkar@gmail.com");
      });
    });
  });
}

function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const menu = document.getElementById('mobile-nav-menu');
  const navLinks = document.querySelectorAll('.mobile-link');
  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => menu.classList.add('hidden'));
  });
}
