/* ==========================================================================
   Janhavi's 3D World - Bruno Simon-Inspired Minimal Clay Environment
   Features:
   - Warm Terracotta Clay Ground & Lighting
   - Big 3D Extruded White Sculpture: "JANHAVI"
   - Stylized Low-Poly Car (Smooth physics, steering, spinning wheels & antenna)
   - 7 Stylized Architectural Milestone Buildings along the road (NOT gates)
   - Small, minimal on-screen popups when buildings are clicked
   - Scattered low-poly faceted trees and white chalk rocks
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
    summary: "Completed schooling from PSBA English School, Aurangabad with strong fundamentals in mathematics, physics, and an early passion for technology.",
    skills: ["Mathematics", "Physics", "Analytical Thinking"]
  },
  {
    id: "engineering",
    step: 2,
    title: "Engineering at MITAOE",
    location: "MIT Academy of Engineering, Pune",
    period: "Class of 2027",
    summary: "Commenced B.Tech in Electronics & Telecommunication Engineering. Maintained 8.41/10 CGPA while mastering embedded systems and digital signal processing.",
    skills: ["Circuit Theory", "Digital Signals", "8.41 CGPA"]
  },
  {
    id: "year1",
    step: 3,
    title: "1st Year — Exploration & Prototyping",
    location: "MITAOE Labs",
    period: "First Year B.Tech",
    summary: "Explored diverse engineering domains including 3D CAD design, Arduino microcontrollers, and Raspberry Pi. Participated in competitions and extracurriculars.",
    skills: ["3D CAD Design", "Arduino", "Raspberry Pi", "Hackathons"]
  },
  {
    id: "year2",
    step: 4,
    title: "Second Year — Coppercloud Internship",
    location: "Coppercloud Solutions, Pune",
    period: "Summer Internship",
    summary: "Summer internship at Coppercloud diving into VLSI fundamentals, embedded firmware, and computer vision algorithms for industrial automation.",
    skills: ["Coppercloud Intern", "VLSI", "Embedded Systems", "Computer Vision"]
  },
  {
    id: "year3",
    step: 5,
    title: "Third Year — Coppercloud R&D & DIPlib Paper",
    location: "Coppercloud R&D",
    period: "Third Year B.Tech",
    summary: "Continued as R&D Intern at Coppercloud — engineered factory-deployed zari textile defect detection (~300 µm accuracy), QR recognition on thermocol, and published a research paper on DIPlib.",
    skills: ["Zari Defect Detection", "QR on Thermocol", "DIPlib Paper", "Deployed AI"]
  },
  {
    id: "year4",
    step: 6,
    title: "Fourth Year — Clarity Lab, IIT Jodhpur",
    location: "Clarity Lab, IIT Jodhpur",
    period: "Summer Research",
    summary: "Summer intern at Clarity Lab, IIT Jodhpur — engineered real-time 360-degree panoramic video stitching and embedded visual SLAM systems on resource-constrained edge hardware. Explored Jodhpur.",
    skills: ["Clarity Lab IITJ", "360° Panoramas", "Visual SLAM on Edge", "ORB-SLAM3"]
  },
  {
    id: "current",
    step: 7,
    title: "Current — Research Intern at IIT Jodhpur",
    location: "IIT Jodhpur",
    period: "Ongoing Research",
    summary: "Research intern at IIT Jodhpur — currently spearheading research in 3D point cloud generation and spatial digital twins directly from monocular video streams.",
    skills: ["Point Cloud Digital Twins", "Monocular Video 3D", "VGGT Reconstruction", "SAM 3D"]
  }
];

/* --------------------------------------------------------------------------
   2. WORLD ENGINE GLOBALS
   -------------------------------------------------------------------------- */
let scene, camera, renderer;
let carGroup, carBody, wheels = [], frontWheelPivots = [];
let antennaSpring;
let buildingMeshes = [];
let roadPoints = [];
let activePopupId = null;

// Driving Physics Variables
const carState = {
  x: 0,
  z: 0,
  rotation: -Math.PI / 2, // Facing along initial road
  speed: 0,
  maxForwardSpeed: 0.42,
  maxReverseSpeed: -0.22,
  acceleration: 0.016,
  reverseAccel: 0.012,
  friction: 0.965,
  steeringAngle: 0,
  maxSteeringAngle: 0.58,
  steerSpeed: 0.045,
  steerReturnSpeed: 0.07,
  wheelRotation: 0
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

  // Scene & Soft Terracotta Clay Environment
  scene = new THREE.Scene();
  const clayColor = new THREE.Color(0xFF9B68);
  scene.background = clayColor;
  scene.fog = new THREE.FogExp2(0xFF9B68, 0.005);

  // Camera: Elevated Isometric Diagonal Angle (like Bruno Simon)
  const aspect = container.clientWidth / container.clientHeight;
  camera = new THREE.PerspectiveCamera(38, aspect, 0.5, 600);
  camera.position.set(-20, 24, 20);

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

  // Lighting Setup (Warm directional sunlight casting soft shadows)
  const ambientLight = new THREE.AmbientLight(0xFF9B68, 0.95);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0xFFE4D6, 0xDD7A48, 0.7);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xFFF7ED, 1.45);
  sunLight.position.set(-35, 55, 30);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.camera.near = 10;
  sunLight.shadow.camera.far = 180;
  const shadowD = 45;
  sunLight.shadow.camera.left = -shadowD;
  sunLight.shadow.camera.right = shadowD;
  sunLight.shadow.camera.top = shadowD;
  sunLight.shadow.camera.bottom = -shadowD;
  sunLight.shadow.bias = -0.0005;
  scene.add(sunLight);

  // 1. Terracotta Ground Floor
  const groundGeo = new THREE.PlaneGeometry(500, 500);
  groundGeo.rotateX(-Math.PI / 2);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0xFF9B68,
    roughness: 0.9,
    metalness: 0.0
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.receiveShadow = true;
  scene.add(ground);

  // 2. Build 3D Extruded Text "JANHAVI" at Spawn
  buildBigSculpturalText();

  // 3. Build Road Network
  buildClayRoad();

  // 4. Build 7 Milestone Buildings along the Road
  buildMilestoneBuildings();

  // 5. Build Scattered Low-Poly Trees and White Chalk Rocks
  buildFoliageAndRocks();

  // 6. Build the Cute Toy Car (Car, NOT a truck)
  buildCuteToyCar();

  // 7. Setup Interactive Controls & Click Raycaster
  setupWorldControls(container);

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

    updateCarPhysics(delta);
    updateCameraFollow();
    updatePopupScreenPosition();

    renderer.render(scene, camera);
  }

  animate();
}

/* --------------------------------------------------------------------------
   4. BIG 3D EXTRUDED TEXT "JANHAVI" (Matching "BRUNO SIMON")
   -------------------------------------------------------------------------- */
function buildBigSculpturalText() {
  const textGroup = new THREE.Group();
  textGroup.position.set(0, 0, 7.5); // Right in front of spawn

  const letterMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: 0.35,
    metalness: 0.05
  });

  // Helper to create a chunky letter stroke
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

  // Letter J
  const gJ = new THREE.Group();
  gJ.position.x = -8.2;
  gJ.add(stroke(bar, h, thick, 0.45, 0, 0));
  gJ.add(stroke(1.2, bar, thick, -0.1, 0, 0));
  gJ.add(stroke(bar, 0.9, thick, -0.65, 0, 0));
  gJ.add(stroke(1.4, bar, thick, 0, h - bar, 0));
  textGroup.add(gJ);

  // Letter A
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

  // Letter N
  const gN = new THREE.Group();
  gN.position.x = -2.6;
  gN.add(stroke(bar, h, thick, -0.65, 0, 0));
  gN.add(stroke(bar, h, thick, 0.65, 0, 0));
  const diagN = stroke(bar, h * 1.1, thick, 0, -0.1, 0);
  diagN.rotation.z = -0.48;
  gN.add(diagN);
  textGroup.add(gN);

  // Letter H
  const gH = new THREE.Group();
  gH.position.x = 0.2;
  gH.add(stroke(bar, h, thick, -0.65, 0, 0));
  gH.add(stroke(bar, h, thick, 0.65, 0, 0));
  gH.add(stroke(1.2, bar, thick, 0, 1.1, 0));
  textGroup.add(gH);

  // Letter A
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

  // Letter V
  const gV = new THREE.Group();
  gV.position.x = 5.8;
  const legVL = stroke(bar, h * 1.05, thick, -0.45, 0, 0);
  legVL.rotation.z = 0.22;
  const legVR = stroke(bar, h * 1.05, thick, 0.45, 0, 0);
  legVR.rotation.z = -0.22;
  gV.add(legVL);
  gV.add(legVR);
  textGroup.add(gV);

  // Letter I
  const gI = new THREE.Group();
  gI.position.x = 8.2;
  gI.add(stroke(bar, h, thick, 0, 0, 0));
  gI.add(stroke(1.2, bar, thick, 0, h - bar, 0));
  gI.add(stroke(1.2, bar, thick, 0, 0, 0));
  textGroup.add(gI);

  scene.add(textGroup);
}

/* --------------------------------------------------------------------------
   5. ROAD PATHWAY
   -------------------------------------------------------------------------- */
function buildClayRoad() {
  // Road control points that wind past each of the 7 milestone buildings
  roadPoints = [
    new THREE.Vector3(0, 0.02, 0),       // Spawn
    new THREE.Vector3(0, 0.02, -18),     // Towards Building 1
    new THREE.Vector3(14, 0.02, -35),    // Building 1 (School)
    new THREE.Vector3(25, 0.02, -58),    // Towards Building 2
    new THREE.Vector3(12, 0.02, -85),    // Building 2 (MITAOE)
    new THREE.Vector3(-12, 0.02, -110),  // Building 3 (1st Year Lab)
    new THREE.Vector3(-22, 0.02, -140),  // Towards Building 4
    new THREE.Vector3(-8, 0.02, -170),   // Building 4 (Coppercloud 2nd Yr)
    new THREE.Vector3(16, 0.02, -200),   // Building 5 (Coppercloud R&D)
    new THREE.Vector3(20, 0.02, -235),   // Building 6 (Clarity Lab IITJ)
    new THREE.Vector3(0, 0.02, -270)     // Building 7 (Current Research)
  ];

  const roadCurve = new THREE.CatmullRomCurve3(roadPoints);
  const roadWidth = 4.8;
  const segments = 200;

  const roadShape = new THREE.Shape();
  roadShape.moveTo(-roadWidth / 2, 0);
  roadShape.lineTo(roadWidth / 2, 0);
  roadShape.lineTo(roadWidth / 2, -0.04);
  roadShape.lineTo(-roadWidth / 2, -0.04);
  roadShape.closePath();

  const extrudeSettings = {
    steps: segments,
    bevelEnabled: false,
    extrudePath: roadCurve
  };

  const roadGeo = new THREE.ExtrudeGeometry(roadShape, extrudeSettings);
  // Slightly darker clay asphalt ribbon
  const roadMat = new THREE.MeshStandardMaterial({
    color: 0xE87E4C,
    roughness: 0.85,
    metalness: 0.0
  });

  const roadMesh = new THREE.Mesh(roadGeo, roadMat);
  roadMesh.receiveShadow = true;
  scene.add(roadMesh);

  // Dashed white center road markings
  const dashCount = 65;
  const dashGeo = new THREE.BoxGeometry(0.25, 0.04, 1.8);
  const dashMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });

  for (let i = 0; i < dashCount; i++) {
    const t = i / dashCount;
    const pt = roadCurve.getPointAt(t);
    const tangent = roadCurve.getTangentAt(t).normalize();

    const dash = new THREE.Mesh(dashGeo, dashMat);
    dash.position.copy(pt).add(new THREE.Vector3(0, 0.03, 0));
    dash.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);
    scene.add(dash);
  }
}

/* --------------------------------------------------------------------------
   6. 7 STYLIZED ARCHITECTURAL MILESTONE BUILDINGS (NOT GATES)
   -------------------------------------------------------------------------- */
function buildMilestoneBuildings() {
  const buildingConfigs = [
    {
      id: "schooling",
      pos: new THREE.Vector3(19, 0, -35),
      rotY: -0.35,
      type: "school",
      color: 0xEE4B3B,
      roofColor: 0x991B1B,
      label: "1. PSBA School"
    },
    {
      id: "engineering",
      pos: new THREE.Vector3(18, 0, -85),
      rotY: -0.2,
      type: "university",
      color: 0xF8FAFC,
      roofColor: 0x3B82F6,
      label: "2. MITAOE Campus"
    },
    {
      id: "year1",
      pos: new THREE.Vector3(-18, 0, -110),
      rotY: 0.4,
      type: "makerLab",
      color: 0xFBBF24,
      roofColor: 0x475569,
      label: "3. 1st Yr Maker Lab"
    },
    {
      id: "year2",
      pos: new THREE.Vector3(-15, 0, -170),
      rotY: 0.25,
      type: "corporate",
      color: 0x38BDF8,
      roofColor: 0x0284C7,
      label: "4. Coppercloud HQ"
    },
    {
      id: "year3",
      pos: new THREE.Vector3(22, 0, -200),
      rotY: -0.4,
      type: "rdLab",
      color: 0x34D399,
      roofColor: 0x059669,
      label: "5. Coppercloud R&D"
    },
    {
      id: "year4",
      pos: new THREE.Vector3(26, 0, -235),
      rotY: -0.25,
      type: "clarityLab",
      color: 0xFDBA74,
      roofColor: 0xC2410C,
      label: "6. Clarity Lab IITJ"
    },
    {
      id: "current",
      pos: new THREE.Vector3(-8, 0, -270),
      rotY: 0.35,
      type: "digitalTwin",
      color: 0xA78BFA,
      roofColor: 0x7C3AED,
      label: "7. 3D Digital Twin Lab"
    }
  ];

  buildingConfigs.forEach(cfg => {
    const bGroup = new THREE.Group();
    bGroup.position.copy(cfg.pos);
    bGroup.rotation.y = cfg.rotY;

    // Base building model based on type
    createProceduralBuilding(bGroup, cfg);

    // Subtle Ground Foundation Plinth
    const plinthGeo = new THREE.BoxGeometry(9, 0.25, 9);
    const plinthMat = new THREE.MeshStandardMaterial({ color: 0xF1F5F9, roughness: 0.9 });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.y = 0.12;
    plinth.receiveShadow = true;
    bGroup.add(plinth);

    // 3D Text Signboard in front of building
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

    // Interactive Flag & Metadata
    bGroup.userData = {
      isBuilding: true,
      milestoneId: cfg.id,
      anchorPos: cfg.pos.clone().add(new THREE.Vector3(0, 4.5, 0))
    };

    scene.add(bGroup);
    buildingMeshes.push(bGroup);
  });
}

function createProceduralBuilding(group, cfg) {
  const wallMat = new THREE.MeshStandardMaterial({ color: cfg.color, roughness: 0.6 });
  const roofMat = new THREE.MeshStandardMaterial({ color: cfg.roofColor, roughness: 0.5 });
  const windowMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.2 });
  const doorMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.5 });

  if (cfg.type === "school") {
    // Schoolhouse with steep pitched roof and bell tower
    const body = new THREE.Mesh(new THREE.BoxGeometry(6.5, 4.0, 5.5), wallMat);
    body.position.y = 2.0;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    const roof = new THREE.Mesh(new THREE.ConeGeometry(4.8, 2.4, 4), roofMat);
    roof.position.y = 5.2;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    group.add(roof);

    // Bell/Clock Tower
    const tower = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.2, 1.6), wallMat);
    tower.position.y = 6.2;
    tower.castShadow = true;
    group.add(tower);

    const bellRoof = new THREE.Mesh(new THREE.ConeGeometry(1.3, 1.4, 4), roofMat);
    bellRoof.position.y = 7.8;
    bellRoof.rotation.y = Math.PI / 4;
    group.add(bellRoof);

    // Door
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.0, 0.2), doorMat);
    door.position.set(0, 1.0, 2.8);
    group.add(door);
  }
  else if (cfg.type === "university") {
    // Neoclassical Collegiate Hall with Entrance Portico & Columns
    const body = new THREE.Mesh(new THREE.BoxGeometry(7.5, 4.8, 6.0), wallMat);
    body.position.y = 2.4;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Portico Columns (4 white pillars)
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
    // Contemporary Tech Workshop with solar array
    const body = new THREE.Mesh(new THREE.BoxGeometry(6.2, 3.6, 5.8), wallMat);
    body.position.y = 1.8;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Angled Solar Roof
    const solarRoof = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.3, 4.2), roofMat);
    solarRoof.position.set(0, 4.1, 0);
    solarRoof.rotation.x = -0.3;
    solarRoof.castShadow = true;
    group.add(solarRoof);

    // Tech Workshop Chimney/Vent
    const vent = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 1.6, 8), roofMat);
    vent.position.set(2.0, 4.6, -1.5);
    group.add(vent);
  }
  else if (cfg.type === "corporate") {
    // Glass & Steel Modern HQ Block
    const body = new THREE.Mesh(new THREE.BoxGeometry(6.0, 6.0, 5.2), wallMat);
    body.position.y = 3.0;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Glass curtain bands
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
    // Industrial Perception Lab with Sensor Dome
    const body = new THREE.Mesh(new THREE.BoxGeometry(6.5, 3.8, 6.0), wallMat);
    body.position.y = 1.9;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Central Perception Radar Dome
    const domeMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.2 });
    const dome = new THREE.Mesh(new THREE.SphereGeometry(1.6, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2), domeMat);
    dome.position.set(0, 3.8, 0);
    dome.castShadow = true;
    group.add(dome);

    // Laser / Camera Sensor Mast
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.5, 8), doorMat);
    mast.position.set(2.2, 4.8, 1.5);
    group.add(mast);
  }
  else if (cfg.type === "clarityLab") {
    // Desert Modernist IIT Jodhpur Pavilion with 360 Panorama Dome
    const body = new THREE.Mesh(new THREE.BoxGeometry(7.0, 4.2, 5.8), wallMat);
    body.position.y = 2.1;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // 360 Glass Dome
    const glassDomeMat = new THREE.MeshPhysicalMaterial({
      color: 0xBAE6FD,
      roughness: 0.1,
      transmission: 0.8,
      thickness: 0.4
    });
    const panoDome = new THREE.Mesh(new THREE.SphereGeometry(1.9, 20, 20), glassDomeMat);
    panoDome.position.set(0, 4.8, 0);
    panoDome.castShadow = true;
    group.add(panoDome);
  }
  else {
    // Digital Twin Spatial Lab with Floating Holographic 3D Prism
    const body = new THREE.Mesh(new THREE.BoxGeometry(6.8, 4.4, 5.6), wallMat);
    body.position.y = 2.2;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Floating Geometric 3D Prism (Point Cloud Mascot)
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

/* --------------------------------------------------------------------------
   7. SCATTERED FOLIAGE (TREES) & CHALK BOULDERS (ROCKS)
   -------------------------------------------------------------------------- */
function buildFoliageAndRocks() {
  const rockMat = new THREE.MeshStandardMaterial({
    color: 0xF5F5F5,
    roughness: 0.85,
    flatShading: true
  });

  const leafMat = new THREE.MeshStandardMaterial({
    color: 0xD4DE36, // Bruno Simon style chartreuse / yellow-green
    roughness: 0.75,
    flatShading: true
  });

  const trunkMat = new THREE.MeshStandardMaterial({
    color: 0x8A5528,
    roughness: 0.9
  });

  // 1. Scattered Low-Poly White Boulders
  const rockPositions = [
    // Around 3D text JANHAVI
    { x: -9.5, z: 9.5, s: 1.3 },
    { x: -5.8, z: 10.2, s: 0.9 },
    { x: 3.5, z: 10.0, s: 1.4 },
    { x: 9.5, z: 9.2, s: 1.1 },
    { x: -3.5, z: 3.2, s: 0.8 },
    { x: 4.5, z: 2.8, s: 1.0 },

    // Along road to buildings
    { x: 10, z: -25, s: 1.5 },
    { x: -8, z: -50, s: 1.2 },
    { x: 26, z: -70, s: 1.6 },
    { x: -24, z: -95, s: 1.8 },
    { x: 8, z: -130, s: 1.4 },
    { x: -14, z: -155, s: 1.2 },
    { x: 26, z: -185, s: 1.7 },
    { x: -16, z: -220, s: 1.5 },
    { x: 12, z: -250, s: 1.3 }
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

  // 2. Faceted Geometric Trees (Hexagonal / Polyhedral crowns)
  const treePositions = [
    { x: -8.0, z: 12.0, h: 4.2 },
    { x: -2.5, z: 13.5, h: 4.8 },
    { x: 7.2, z: 13.0, h: 4.5 },
    { x: 12.0, z: 11.5, h: 3.8 },

    // Flanking the road
    { x: -8.5, z: -15, h: 4.5 },
    { x: 8.5, z: -18, h: 4.0 },
    { x: 28.0, z: -40, h: 5.2 },
    { x: -12.0, z: -75, h: 4.8 },
    { x: 26.0, z: -100, h: 4.5 },
    { x: -26.0, z: -125, h: 5.0 },
    { x: 6.0, z: -160, h: 4.2 },
    { x: -24.0, z: -190, h: 4.8 },
    { x: 28.0, z: -220, h: 5.2 },
    { x: -18.0, z: -260, h: 4.6 }
  ];

  treePositions.forEach(tp => {
    const treeGroup = new THREE.Group();
    treeGroup.position.set(tp.x, 0, tp.z);

    // Trunk
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.25, 2.2, 6), trunkMat);
    trunk.position.y = 1.1;
    trunk.castShadow = true;
    treeGroup.add(trunk);

    // Geometric Crown (Polyhedral)
    const crownGeo = new THREE.BoxGeometry(2.0, 2.8, 1.8);
    const crown = new THREE.Mesh(crownGeo, leafMat);
    crown.position.y = 2.8;
    crown.rotation.y = Math.PI / 4;
    crown.castShadow = true;
    treeGroup.add(crown);

    const crownTop = new THREE.Mesh(new THREE.ConeGeometry(1.4, 1.8, 5), leafMat);
    crownTop.position.y = 4.4;
    crownTop.castShadow = true;
    treeGroup.add(crownTop);

    scene.add(treeGroup);
  });
}

/* --------------------------------------------------------------------------
   8. THE CUTE TOY CAR (A CAR, NOT A TRUCK)
   -------------------------------------------------------------------------- */
function buildCuteToyCar() {
  carGroup = new THREE.Group();
  carGroup.position.set(0, 0, 0);

  // Materials
  const carPaintMat = new THREE.MeshStandardMaterial({
    color: 0xEE4B3B, // Vibrant red/coral clay
    roughness: 0.35,
    metalness: 0.1
  });

  const glassMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: 0.15
  });

  const trimMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.8 });
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.9 });
  const rimMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.3 });
  const headlightMat = new THREE.MeshBasicMaterial({ color: 0xFEF08A });
  const taillightMat = new THREE.MeshBasicMaterial({ color: 0xEF4444 });

  carBody = new THREE.Group();

  // 1. Sleek Car Lower Chassis
  const lowerGeo = new THREE.BoxGeometry(1.4, 0.55, 2.5);
  const lowerMesh = new THREE.Mesh(lowerGeo, carPaintMat);
  lowerMesh.position.y = 0.5;
  lowerMesh.castShadow = true;
  lowerMesh.receiveShadow = true;
  carBody.add(lowerMesh);

  // 2. Compact Car Cabin & Windows
  const cabinGeo = new THREE.BoxGeometry(1.2, 0.6, 1.4);
  const cabinMesh = new THREE.Mesh(cabinGeo, glassMat);
  cabinMesh.position.set(0, 1.05, -0.1);
  cabinMesh.castShadow = true;
  carBody.add(cabinMesh);

  // Cabin Roof Cap
  const roofGeo = new THREE.BoxGeometry(1.24, 0.1, 1.44);
  const roofMesh = new THREE.Mesh(roofGeo, carPaintMat);
  roofMesh.position.set(0, 1.38, -0.1);
  carBody.add(roofMesh);

  // 3. Front Hood Slant & Bumpers
  const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.2, 0.15), trimMat);
  frontBumper.position.set(0, 0.35, 1.28);
  carBody.add(frontBumper);

  const rearBumper = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.2, 0.15), trimMat);
  rearBumper.position.set(0, 0.35, -1.28);
  carBody.add(rearBumper);

  // 4. Headlights & Taillights
  const hlGeo = new THREE.SphereGeometry(0.14, 12, 12);
  const hlL = new THREE.Mesh(hlGeo, headlightMat);
  hlL.position.set(-0.45, 0.58, 1.25);
  carBody.add(hlL);

  const hlR = new THREE.Mesh(hlGeo, headlightMat);
  hlR.position.set(0.45, 0.58, 1.25);
  carBody.add(hlR);

  const tlGeo = new THREE.BoxGeometry(0.2, 0.12, 0.06);
  const tlL = new THREE.Mesh(tlGeo, taillightMat);
  tlL.position.set(-0.48, 0.58, -1.26);
  carBody.add(tlL);

  const tlR = new THREE.Mesh(tlGeo, taillightMat);
  tlR.position.set(0.48, 0.58, -1.26);
  carBody.add(tlR);

  // 5. Roof Antenna with Bright Red Sphere (Matching reference photo!)
  const antPoleGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.8, 6);
  antennaSpring = new THREE.Mesh(antPoleGeo, trimMat);
  antennaSpring.position.set(-0.45, 1.82, 0.2);

  const antBallGeo = new THREE.SphereGeometry(0.12, 12, 12);
  const antBallMat = new THREE.MeshBasicMaterial({ color: 0xEE4B3B });
  const antBall = new THREE.Mesh(antBallGeo, antBallMat);
  antBall.position.y = 0.45;
  antennaSpring.add(antBall);

  carBody.add(antennaSpring);
  carGroup.add(carBody);

  // 6. Car Wheels (Standard compact car size, NOT a monster truck)
  const wheelRadius = 0.32;
  const wheelWidth = 0.24;
  const wheelGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelWidth, 16);
  wheelGeo.rotateZ(Math.PI / 2);

  const rimGeo = new THREE.CylinderGeometry(0.16, 0.16, wheelWidth + 0.02, 12);
  rimGeo.rotateZ(Math.PI / 2);

  const wheelPositions = [
    { x: -0.72, y: 0.32, z: 0.72, isFront: true },  // Front Left
    { x: 0.72, y: 0.32, z: 0.72, isFront: true },   // Front Right
    { x: -0.72, y: 0.32, z: -0.72, isFront: false }, // Rear Left
    { x: 0.72, y: 0.32, z: -0.72, isFront: false }  // Rear Right
  ];

  wheelPositions.forEach(wp => {
    const pivot = new THREE.Group();
    pivot.position.set(wp.x, wp.y, wp.z);

    const wheelMesh = new THREE.Group();
    const tire = new THREE.Mesh(wheelGeo, wheelMat);
    tire.castShadow = true;
    wheelMesh.add(tire);

    const rim = new THREE.Mesh(rimGeo, rimMat);
    wheelMesh.add(rim);

    pivot.add(wheelMesh);
    carGroup.add(pivot);

    wheels.push(wheelMesh);
    if (wp.isFront) {
      frontWheelPivots.push(pivot);
    }
  });

  scene.add(carGroup);
}

/* --------------------------------------------------------------------------
   9. CAR DRIVING & CONTROLS PHYSICS
   -------------------------------------------------------------------------- */
function updateCarPhysics(delta) {
  // Acceleration / Braking
  if (input.forward) {
    carState.speed += carState.acceleration;
    if (carState.speed > carState.maxForwardSpeed) carState.speed = carState.maxForwardSpeed;
  } else if (input.backward) {
    carState.speed -= carState.reverseAccel;
    if (carState.speed < carState.maxReverseSpeed) carState.speed = carState.maxReverseSpeed;
  } else {
    carState.speed *= carState.friction;
    if (Math.abs(carState.speed) < 0.001) carState.speed = 0;
  }

  // Steering
  if (input.left) {
    carState.steeringAngle += carState.steerSpeed;
    if (carState.steeringAngle > carState.maxSteeringAngle) carState.steeringAngle = carState.maxSteeringAngle;
  } else if (input.right) {
    carState.steeringAngle -= carState.steerSpeed;
    if (carState.steeringAngle < -carState.maxSteeringAngle) carState.steeringAngle = -carState.maxSteeringAngle;
  } else {
    // Return to center
    if (carState.steeringAngle > 0) {
      carState.steeringAngle = Math.max(0, carState.steeringAngle - carState.steerReturnSpeed);
    } else if (carState.steeringAngle < 0) {
      carState.steeringAngle = Math.min(0, carState.steeringAngle + carState.steerReturnSpeed);
    }
  }

  // Pivot front wheels visually
  frontWheelPivots.forEach(p => {
    p.rotation.y = carState.steeringAngle;
  });

  // Turn car when moving
  if (Math.abs(carState.speed) > 0.001) {
    const turnFactor = (carState.speed > 0 ? 1 : -1) * (carState.speed / carState.maxForwardSpeed);
    carState.rotation += carState.steeringAngle * turnFactor * 0.065;
  }

  // Update Position
  carState.x += Math.sin(carState.rotation) * carState.speed;
  carState.z += Math.cos(carState.rotation) * carState.speed;

  carGroup.position.set(carState.x, 0, carState.z);
  carGroup.rotation.y = carState.rotation;

  // Spin wheels
  const spinDelta = (carState.speed / 0.32);
  wheels.forEach(w => {
    w.rotation.x += spinDelta;
  });

  // Antenna Wobble
  if (antennaSpring) {
    antennaSpring.rotation.z = Math.sin(Date.now() * 0.02) * (carState.speed * 0.8);
    antennaSpring.rotation.x = (carState.speed * 0.5);
  }

  // Auto proximity check: check if car is right beside a building
  checkBuildingProximity();
}

function updateCameraFollow() {
  if (!camera || !carGroup) return;

  // Bruno Simon Isometric Diagonal Offset: look down from high front-left/rear-left
  const camOffset = new THREE.Vector3(-14, 18, 14);
  const targetCamPos = carGroup.position.clone().add(camOffset);

  camera.position.lerp(targetCamPos, 0.08);
  camera.lookAt(carGroup.position.x, carGroup.position.y + 0.8, carGroup.position.z);
}

/* --------------------------------------------------------------------------
   10. INTERACTIVE CLICK POPUPS FOR BUILDINGS
   -------------------------------------------------------------------------- */
function setupWorldControls(container) {
  // Keyboard Input
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

  // Mobile / Touch Buttons
  const pDrive = document.getElementById('touch-pedal-drive');
  const pRev = document.getElementById('touch-pedal-rev');
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

  bindTouch(pDrive, 'forward');
  bindTouch(pRev, 'backward');
  bindTouch(pLeft, 'left');
  bindTouch(pRight, 'right');

  // Reset Car Button
  const resetBtn = document.getElementById('reset-car-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      carState.x = 0;
      carState.z = 0;
      carState.rotation = -Math.PI / 2;
      carState.speed = 0;
      carState.steeringAngle = 0;
    });
  }

  // Raycasting on Click: Detect Clicks on Buildings!
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  container.addEventListener('pointerdown', (e) => {
    // Only handle left click
    if (e.button !== 0) return;

    const rect = container.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // Collect all building meshes
    let hitTargets = [];
    buildingMeshes.forEach(bg => {
      bg.traverse(child => {
        if (child.isMesh) {
          child.userData.parentBuilding = bg;
          hitTargets.push(child);
        }
      });
    });

    const intersects = raycaster.intersectObjects(hitTargets, false);
    if (intersects.length > 0) {
      const clickedBuilding = intersects[0].object.userData.parentBuilding;
      if (clickedBuilding && clickedBuilding.userData.isBuilding) {
        showMilestonePopup(clickedBuilding.userData.milestoneId);
      }
    } else {
      // Clicked on ground: close popup
      closeMilestonePopup();
    }
  });

  // Popup Close Button
  const closeBtn = document.getElementById('popup-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMilestonePopup);
  }
}

function checkBuildingProximity() {
  buildingMeshes.forEach(b => {
    const dist = carGroup.position.distanceTo(b.position);
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

  // Project 3D building anchor position to 2D screen coordinates
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
