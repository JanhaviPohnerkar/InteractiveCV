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
let characterGroup, characterBody, characterHead, ponytailMesh;
let leftLegPivot, rightLegPivot, leftArmPivot, rightArmPivot, walkingStickMesh;
let buildingMeshes = [];
let roadPoints = [];
let activePopupId = null;

// Character State & Movement (Increased speed & snappy responsiveness!)
const charState = {
  x: 0,
  z: 0,
  rotation: -Math.PI / 2, // Facing forward along initial road
  speed: 0,
  maxWalkSpeed: 0.36,     // Increased speed as requested (snappy & brisk!)
  maxBackSpeed: -0.18,
  accel: 0.038,
  friction: 0.88,
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

  // Scene & Soft Terracotta Clay Environment
  scene = new THREE.Scene();
  const clayColor = new THREE.Color(0xFF9B68);
  scene.background = clayColor;
  scene.fog = new THREE.FogExp2(0xFF9B68, 0.005);

  // Camera: Elevated Isometric Diagonal Perspective
  const aspect = container.clientWidth / container.clientHeight;
  camera = new THREE.PerspectiveCamera(38, aspect, 0.5, 600);
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

  // Warm Directional Sunlight & Soft Ambient
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

  // 3. Build Road Network (Strictly PARALLEL to the ground!)
  buildClayRoad();

  // 4. Build 7 Milestone Buildings along the Road
  buildMilestoneBuildings();

  // 5. Build Scattered Low-Poly Trees and White Chalk Rocks
  buildFoliageAndRocks();

  // 6. Build the Adventurer Girl Character (Black hair, green & brown dress!)
  buildAdventurerCharacter();

  // 7. Setup Controls & Raycasting
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

    updateCharacterPhysics(delta);
    updateCameraFollow();
    updatePopupScreenPosition();

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
    color: 0xFFFFFF,
    roughness: 0.35,
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

  const roadCurve = new THREE.CatmullRomCurve3(roadPoints);
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
    color: 0xE87E4C, // Warm terracotta asphalt
    roughness: 0.85,
    metalness: 0.0,
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

    createProceduralBuilding(bGroup, cfg);

    const plinthGeo = new THREE.BoxGeometry(9, 0.25, 9);
    const plinthMat = new THREE.MeshStandardMaterial({ color: 0xF1F5F9, roughness: 0.9 });
    const plinth = new THREE.Mesh(plinthGeo, plinthMat);
    plinth.position.y = 0.12;
    plinth.receiveShadow = true;
    bGroup.add(plinth);

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

/* --------------------------------------------------------------------------
   7. SCATTERED TREES & WHITE CHALK BOULDERS
   -------------------------------------------------------------------------- */
function buildFoliageAndRocks() {
  const rockMat = new THREE.MeshStandardMaterial({ color: 0xF5F5F5, roughness: 0.85, flatShading: true });
  const leafMat = new THREE.MeshStandardMaterial({ color: 0xD4DE36, roughness: 0.75, flatShading: true });
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8A5528, roughness: 0.9 });

  const rockPositions = [
    { x: -9.5, z: 9.5, s: 1.3 },
    { x: -5.8, z: 10.2, s: 0.9 },
    { x: 3.5, z: 10.0, s: 1.4 },
    { x: 9.5, z: 9.2, s: 1.1 },
    { x: -3.5, z: 3.2, s: 0.8 },
    { x: 4.5, z: 2.8, s: 1.0 },
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

  const treePositions = [
    { x: -8.0, z: 12.0, h: 4.2 },
    { x: -2.5, z: 13.5, h: 4.8 },
    { x: 7.2, z: 13.0, h: 4.5 },
    { x: 12.0, z: 11.5, h: 3.8 },
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

    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.25, 2.2, 6), trunkMat);
    trunk.position.y = 1.1;
    trunk.castShadow = true;
    treeGroup.add(trunk);

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
  // Snappy walking acceleration
  if (input.forward) {
    charState.speed += charState.accel;
    if (charState.speed > charState.maxWalkSpeed) charState.speed = charState.maxWalkSpeed;
  } else if (input.backward) {
    charState.speed -= charState.accel;
    if (charState.speed < charState.maxBackSpeed) charState.speed = charState.maxBackSpeed;
  } else {
    charState.speed *= charState.friction;
    if (Math.abs(charState.speed) < 0.003) charState.speed = 0;
  }

  // Snappy steering
  if (input.left) {
    charState.rotation += charState.turnSpeed;
  }
  if (input.right) {
    charState.rotation -= charState.turnSpeed;
  }

  // Update World Position
  charState.x += Math.sin(charState.rotation) * charState.speed;
  charState.z += Math.cos(charState.rotation) * charState.speed;

  characterGroup.position.set(charState.x, 0, charState.z);
  characterGroup.rotation.y = charState.rotation;

  // Walking Animation Gait (scales with increased speed)
  const isMoving = Math.abs(charState.speed) > 0.005;

  if (isMoving) {
    charState.walkCycle += delta * (charState.speed > 0 ? 14 : 10);

    // Body Bobbing
    const bob = Math.abs(Math.sin(charState.walkCycle * 2)) * 0.07;
    characterBody.position.y = bob;

    // Ponytail bounce
    if (ponytailMesh) {
      ponytailMesh.rotation.x = Math.sin(charState.walkCycle * 2) * 0.2;
    }

    // Legs stride
    leftLegPivot.rotation.x = Math.sin(charState.walkCycle) * 0.7;
    rightLegPivot.rotation.x = -Math.sin(charState.walkCycle) * 0.7;

    // Arms counter-swing
    leftArmPivot.rotation.x = -Math.sin(charState.walkCycle) * 0.6;
    rightArmPivot.rotation.x = Math.sin(charState.walkCycle) * 0.5;
  } else {
    // Return smoothly to idle stance
    characterBody.position.y *= 0.8;
    leftLegPivot.rotation.x *= 0.8;
    rightLegPivot.rotation.x *= 0.8;
    leftArmPivot.rotation.x *= 0.8;
    rightArmPivot.rotation.x *= 0.8;
    if (ponytailMesh) ponytailMesh.rotation.x *= 0.8;
  }

  // Proximity check for milestone buildings
  checkBuildingProximity();
}

function updateCameraFollow() {
  if (!camera || !characterGroup) return;

  const camOffset = new THREE.Vector3(-14, 18, 14);
  const targetCamPos = characterGroup.position.clone().add(camOffset);

  camera.position.lerp(targetCamPos, 0.09);
  camera.lookAt(characterGroup.position.x, characterGroup.position.y + 1.2, characterGroup.position.z);
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

  bindTouch(pWalk, 'forward');
  bindTouch(pBack, 'backward');
  bindTouch(pLeft, 'left');
  bindTouch(pRight, 'right');

  const resetBtn = document.getElementById('reset-char-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      charState.x = 0;
      charState.z = 0;
      charState.rotation = -Math.PI / 2;
      charState.speed = 0;
      characterGroup.position.set(0, 0, 0);
    });
  }

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
      closeMilestonePopup();
    }
  });

  const closeBtn = document.getElementById('popup-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMilestonePopup);
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
