import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeartGalaxy3D({
  theme = "gold",
  heartBeatSpeed = 1.0,
  autoRotateSpeed = 0.45,
  particleDensity = "high",
  onHeartClick = null,
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animFrameId = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- 1. Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x05040a, 0.0014);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 32, 92);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // --- 2. Procedural High-Res Textures ---

    // A. Smooth Glow Particle
    const createGlowTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");

      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(255, 235, 130, 0.95)");
      gradient.addColorStop(0.45, "rgba(255, 185, 30, 0.6)");
      gradient.addColorStop(0.8, "rgba(240, 120, 10, 0.15)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    // B. Golden Sunburst Sparkle Texture
    const createSunburstTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");

      const cx = 64;
      const cy = 64;

      const rad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 32);
      rad.addColorStop(0, "rgba(255, 255, 255, 1)");
      rad.addColorStop(0.3, "rgba(255, 220, 80, 0.9)");
      rad.addColorStop(0.7, "rgba(255, 160, 20, 0.3)");
      rad.addColorStop(1, "rgba(255, 140, 0, 0)");
      ctx.fillStyle = rad;
      ctx.fillRect(0, 0, 128, 128);

      // 4 Main luminous sun rays
      ctx.fillStyle = "rgba(255, 255, 230, 0.95)";
      for (let i = 0; i < 2; i++) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((i * Math.PI) / 2);
        ctx.beginPath();
        ctx.moveTo(-2, 0);
        ctx.lineTo(0, -48);
        ctx.lineTo(2, 0);
        ctx.lineTo(0, 48);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      // 4 Secondary diagonal rays
      ctx.fillStyle = "rgba(255, 210, 70, 0.7)";
      for (let i = 0; i < 2; i++) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(Math.PI / 4 + (i * Math.PI) / 2);
        ctx.beginPath();
        ctx.moveTo(-1.5, 0);
        ctx.lineTo(0, -30);
        ctx.lineTo(1.5, 0);
        ctx.lineTo(0, 30);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    // C. Single Golden Floating Petal Texture
    const createSinglePetalTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");

      ctx.translate(32, 32);
      ctx.rotate(0.25);

      const grad = ctx.createLinearGradient(0, 22, 0, -22);
      grad.addColorStop(0, "#d97706");
      grad.addColorStop(0.4, "#f59e0b");
      grad.addColorStop(0.85, "#fde047");
      grad.addColorStop(1, "#ffffff");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, 20);
      ctx.bezierCurveTo(-11, 8, -13, -12, 0, -22);
      ctx.bezierCurveTo(13, -12, 11, 8, 0, 20);
      ctx.closePath();
      ctx.fill();

      // Petal vein
      ctx.strokeStyle = "rgba(180, 83, 9, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, 16);
      ctx.lineTo(0, -18);
      ctx.stroke();

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    // D. Procedural Luminous Sunflower Texture (512x512)
    const createSunflowerTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");

      const cx = 256;
      const cy = 256;

      // Outer golden aura bloom
      const glowGrad = ctx.createRadialGradient(cx, cy, 40, cx, cy, 248);
      glowGrad.addColorStop(0, "rgba(255, 225, 60, 0.55)");
      glowGrad.addColorStop(0.5, "rgba(255, 165, 0, 0.22)");
      glowGrad.addColorStop(1, "rgba(255, 130, 0, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 248, 0, Math.PI * 2);
      ctx.fill();

      // Leaves
      const drawLeaf = (angle, len, w) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        const lGrad = ctx.createLinearGradient(0, 0, 0, -len);
        lGrad.addColorStop(0, "#15803d");
        lGrad.addColorStop(0.6, "#4ade80");
        lGrad.addColorStop(1, "#bbf7d0");
        ctx.fillStyle = lGrad;
        ctx.beginPath();
        ctx.moveTo(0, -20);
        ctx.quadraticCurveTo(-w, -len * 0.5, 0, -len);
        ctx.quadraticCurveTo(w, -len * 0.5, 0, -20);
        ctx.fill();
        ctx.restore();
      };

      drawLeaf(Math.PI * 0.65, 160, 36);
      drawLeaf(Math.PI * 1.35, 160, 36);

      // 2 Petal Layers
      const petalCount = 24;
      for (let layer = 0; layer < 2; layer++) {
        const layerOffset = layer * (Math.PI / petalCount);
        const petalLen = layer === 0 ? 142 : 118;
        const petalW = layer === 0 ? 28 : 24;

        for (let i = 0; i < petalCount; i++) {
          const angle = (i * 2 * Math.PI) / petalCount + layerOffset;
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(angle);

          const petalGrad = ctx.createLinearGradient(0, 0, 0, -petalLen);
          if (layer === 0) {
            petalGrad.addColorStop(0, "#d97706");
            petalGrad.addColorStop(0.3, "#f59e0b");
            petalGrad.addColorStop(0.8, "#fef08a");
            petalGrad.addColorStop(1, "#ffffff");
          } else {
            petalGrad.addColorStop(0, "#b45309");
            petalGrad.addColorStop(0.4, "#f59e0b");
            petalGrad.addColorStop(0.9, "#fde047");
            petalGrad.addColorStop(1, "#fef9c3");
          }

          ctx.fillStyle = petalGrad;
          ctx.beginPath();
          ctx.moveTo(0, -30);
          ctx.bezierCurveTo(
            -petalW,
            -petalLen * 0.4,
            -petalW * 0.7,
            -petalLen * 0.85,
            0,
            -petalLen
          );
          ctx.bezierCurveTo(
            petalW * 0.7,
            -petalLen * 0.85,
            petalW,
            -petalLen * 0.4,
            0,
            -30
          );
          ctx.closePath();
          ctx.fill();

          ctx.strokeStyle = "rgba(180, 83, 9, 0.35)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, -36);
          ctx.lineTo(0, -petalLen * 0.8);
          ctx.stroke();

          ctx.restore();
        }
      }

      // Center Seed Core
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 64);
      coreGrad.addColorStop(0, "#381c03");
      coreGrad.addColorStop(0.6, "#5c2e0b");
      coreGrad.addColorStop(0.85, "#854d0e");
      coreGrad.addColorStop(1, "#ca8a04");

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 64, 0, Math.PI * 2);
      ctx.fill();

      // Golden pollen sparkles in spiral
      const seedCount = 130;
      for (let s = 0; s < seedCount; s++) {
        const phi = s * 2.39996;
        const dist = Math.sqrt(s / seedCount) * 55;
        const sx = cx + Math.cos(phi) * dist;
        const sy = cy + Math.sin(phi) * dist;

        ctx.fillStyle = s % 3 === 0 ? "#fef08a" : "#f59e0b";
        ctx.beginPath();
        ctx.arc(sx, sy, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const glowTexture = createGlowTexture();
    const sunburstTexture = createSunburstTexture();
    const petalTexture = createSinglePetalTexture();
    const sunflowerTexture = createSunflowerTexture();

    // --- 3. Palettes ---
    const getPaletteColors = (t) => {
      switch (t) {
        case "amber":
          return [
            new THREE.Color("#ffffff"),
            new THREE.Color("#ffe885"),
            new THREE.Color("#ffaa00"),
            new THREE.Color("#ff6000"),
            new THREE.Color("#e63946"),
          ];
        case "sunflower":
          return [
            new THREE.Color("#ffffff"),
            new THREE.Color("#fff385"),
            new THREE.Color("#ffd000"),
            new THREE.Color("#ff9f00"),
            new THREE.Color("#65a30d"),
          ];
        case "romantic":
          return [
            new THREE.Color("#ffffff"),
            new THREE.Color("#ffe57f"),
            new THREE.Color("#ffb300"),
            new THREE.Color("#f43f5e"),
            new THREE.Color("#a855f7"),
          ];
        case "gold":
        default:
          return [
            new THREE.Color("#ffffff"),
            new THREE.Color("#fff275"),
            new THREE.Color("#ffc400"),
            new THREE.Color("#ff9100"),
            new THREE.Color("#ff5400"),
          ];
      }
    };

    const palette = getPaletteColors(theme);

    // --- 4. MAJESTIC 3D GIANT SUNFLOWER ---
    const isHigh = particleDensity === "high";
    const seedCount = isHigh ? 8000 : 4500;
    const petalLayerPetals = [26, 30, 34];
    const pointsPerPetal = isHigh ? 140 : 80;
    const totalPetalPoints =
      petalLayerPetals.reduce((a, b) => a + b, 0) * pointsPerPetal;
    const totalSunflowerCount = seedCount + totalPetalPoints;

    const sunflowerGeo = new THREE.BufferGeometry();
    const sunflowerPositions = new Float32Array(totalSunflowerCount * 3);
    const sunflowerBasePositions = new Float32Array(totalSunflowerCount * 3);
    const sunflowerColors = new Float32Array(totalSunflowerCount * 3);
    const sunflowerSizes = new Float32Array(totalSunflowerCount);
    const sunflowerPhases = new Float32Array(totalSunflowerCount);

    let pCursor = 0;

    // A. FIBONACCI GOLDEN SPIRAL SEED DISK
    const goldenAngle = 2.39996322972865332;
    const maxSeedRadius = 13.5;

    for (let i = 0; i < seedCount; i++) {
      const phi = i * goldenAngle;
      const rRatio = Math.sqrt(i / seedCount);
      const r = rRatio * maxSeedRadius;

      const sx = Math.cos(phi) * r;
      const sy = Math.sin(phi) * r + 3.5;
      const sz = -(1 - rRatio * rRatio) * 2.8 + (Math.random() - 0.5) * 0.4;

      const idx = pCursor * 3;
      sunflowerPositions[idx] = sx;
      sunflowerPositions[idx + 1] = sy;
      sunflowerPositions[idx + 2] = sz;

      sunflowerBasePositions[idx] = sx;
      sunflowerBasePositions[idx + 1] = sy;
      sunflowerBasePositions[idx + 2] = sz;

      const seedColor = new THREE.Color();
      if (rRatio < 0.35) {
        seedColor.set("#381c03").lerp(new THREE.Color("#6b3206"), rRatio / 0.35);
      } else if (rRatio < 0.75) {
        seedColor
          .set("#6b3206")
          .lerp(new THREE.Color("#ca8a04"), (rRatio - 0.35) / 0.4);
      } else {
        seedColor
          .set("#ca8a04")
          .lerp(new THREE.Color("#fde047"), (rRatio - 0.75) / 0.25);
      }

      sunflowerColors[idx] = seedColor.r;
      sunflowerColors[idx + 1] = seedColor.g;
      sunflowerColors[idx + 2] = seedColor.b;

      sunflowerSizes[pCursor] =
        (2.0 + (1 - rRatio) * 1.5 + Math.random() * 1.0) *
        (window.devicePixelRatio > 1 ? 1.3 : 1.0);
      sunflowerPhases[pCursor] = Math.random() * Math.PI * 2;
      pCursor++;
    }

    // B. MULTI-LAYERED 3D RAY PETALS
    const layerConfigs = [
      { count: 26, length: 22, width: 4.8, zOffset: 0.6, curl: 2.2, colorStart: "#b45309", colorEnd: "#fde047" },
      { count: 30, length: 27, width: 5.4, zOffset: -0.8, curl: 1.4, colorStart: "#d97706", colorEnd: "#fef08a" },
      { count: 34, length: 32, width: 5.8, zOffset: -2.2, curl: 0.5, colorStart: "#f59e0b", colorEnd: "#ffffff" },
    ];

    layerConfigs.forEach((layer, layerIdx) => {
      const angularOffset = layerIdx * (Math.PI / layer.count);

      for (let pIdx = 0; pIdx < layer.count; pIdx++) {
        const petalAngle = (pIdx * 2 * Math.PI) / layer.count + angularOffset;
        const cosA = Math.cos(petalAngle);
        const sinA = Math.sin(petalAngle);

        for (let pt = 0; pt < pointsPerPetal; pt++) {
          const u = Math.pow(Math.random(), 0.85);
          const v = (Math.random() - 0.5) * 2;

          const petalWidthProfile = Math.sin(u * Math.PI) * Math.pow(1 - u * 0.35, 0.5);
          const localX = v * (layer.width * 0.5) * petalWidthProfile;
          const localY = maxSeedRadius * 0.92 + u * layer.length;
          const localZ =
            layer.zOffset -
            Math.sin(u * Math.PI) * layer.curl +
            (Math.random() - 0.5) * 0.5;

          const px = localX * sinA + localY * cosA;
          const py = -localX * cosA + localY * sinA + 3.5;
          const pz = localZ;

          const idx = pCursor * 3;
          sunflowerPositions[idx] = px;
          sunflowerPositions[idx + 1] = py;
          sunflowerPositions[idx + 2] = pz;

          sunflowerBasePositions[idx] = px;
          sunflowerBasePositions[idx + 1] = py;
          sunflowerBasePositions[idx + 2] = pz;

          const pColor = new THREE.Color(layer.colorStart).lerp(
            new THREE.Color(layer.colorEnd),
            u
          );
          if (u > 0.85) {
            pColor.lerp(new THREE.Color("#ffffff"), (u - 0.85) / 0.15);
          }

          sunflowerColors[idx] = pColor.r;
          sunflowerColors[idx + 1] = pColor.g;
          sunflowerColors[idx + 2] = pColor.b;

          sunflowerSizes[pCursor] =
            (2.4 + u * 1.6 + Math.random() * 1.2) *
            (window.devicePixelRatio > 1 ? 1.3 : 1.0);
          sunflowerPhases[pCursor] = Math.random() * Math.PI * 2;
          pCursor++;
        }
      }
    });

    sunflowerGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(sunflowerPositions, 3)
    );
    sunflowerGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(sunflowerColors, 3)
    );
    sunflowerGeo.setAttribute(
      "size",
      new THREE.BufferAttribute(sunflowerSizes, 1)
    );

    const sunflowerMaterial = new THREE.PointsMaterial({
      size: 3.2,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const sunflowerMesh = new THREE.Points(sunflowerGeo, sunflowerMaterial);
    scene.add(sunflowerMesh);

    // Mini Golden Sunburst Sparkles Orbiting the Center
    const sparkleCount = 600;
    const sparkleGeo = new THREE.BufferGeometry();
    const sparklePos = new Float32Array(sparkleCount * 3);
    const sparkleBasePos = new Float32Array(sparkleCount * 3);
    const sparkleColors = new Float32Array(sparkleCount * 3);

    for (let i = 0; i < sparkleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const radius = 24 + Math.random() * 26;

      const sx = radius * Math.sin(phi) * Math.cos(theta);
      const sy = radius * Math.sin(phi) * Math.sin(theta) * 0.85 + 3.5;
      const sz = radius * Math.cos(phi);

      const idx = i * 3;
      sparklePos[idx] = sx;
      sparklePos[idx + 1] = sy;
      sparklePos[idx + 2] = sz;

      sparkleBasePos[idx] = sx;
      sparkleBasePos[idx + 1] = sy;
      sparkleBasePos[idx + 2] = sz;

      const sc = palette[Math.floor(Math.random() * palette.length)];
      sparkleColors[idx] = sc.r;
      sparkleColors[idx + 1] = sc.g;
      sparkleColors[idx + 2] = sc.b;
    }

    sparkleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(sparklePos, 3)
    );
    sparkleGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(sparkleColors, 3)
    );

    const sparkleMaterial = new THREE.PointsMaterial({
      size: 5.6,
      map: sunburstTexture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sparkleMesh = new THREE.Points(sparkleGeo, sparkleMaterial);
    scene.add(sparkleMesh);

    // --- 5. Spiral Galaxy Arms ---
    const galaxyCount = isHigh ? 32000 : 16000;
    const galaxyGeo = new THREE.BufferGeometry();
    const galaxyPositions = new Float32Array(galaxyCount * 3);
    const galaxyColors = new Float32Array(galaxyCount * 3);

    const branches = 4;
    const galaxyRadius = 92;
    const spin = 1.6;

    for (let i = 0; i < galaxyCount; i++) {
      const r = Math.pow(Math.random(), 1.35) * galaxyRadius + 14;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = (r / galaxyRadius) * spin * Math.PI;
      const randomX =
        Math.pow(Math.random(), 2.5) * (Math.random() < 0.5 ? 1 : -1) * (r * 0.22);
      const randomY =
        Math.pow(Math.random(), 2.5) * (Math.random() < 0.5 ? 1 : -1) * (r * 0.12);
      const randomZ =
        Math.pow(Math.random(), 2.5) * (Math.random() < 0.5 ? 1 : -1) * (r * 0.22);

      const totalAngle = branchAngle + spinAngle;
      const gx = Math.cos(totalAngle) * r + randomX;
      const gy = randomY - 2;
      const gz = Math.sin(totalAngle) * r + randomZ;

      const idx = i * 3;
      galaxyPositions[idx] = gx;
      galaxyPositions[idx + 1] = gy;
      galaxyPositions[idx + 2] = gz;

      const ratio = Math.min(1, r / galaxyRadius);
      const color1 = palette[1];
      const color2 =
        palette[Math.min(palette.length - 1, Math.floor(ratio * palette.length))];
      const mixed = color1.clone().lerp(color2, ratio);

      galaxyColors[idx] = mixed.r;
      galaxyColors[idx + 1] = mixed.g;
      galaxyColors[idx + 2] = mixed.b;
    }

    galaxyGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(galaxyPositions, 3)
    );
    galaxyGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(galaxyColors, 3)
    );

    const galaxyMaterial = new THREE.PointsMaterial({
      size: 2.3,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const galaxyMesh = new THREE.Points(galaxyGeo, galaxyMaterial);
    galaxyMesh.rotation.x = Math.PI * 0.16;
    galaxyMesh.rotation.z = -Math.PI * 0.06;
    scene.add(galaxyMesh);

    // Floating Golden Petals Cloud (400+ 3D swirl petals)
    const petalCount = 420;
    const petalGeo = new THREE.BufferGeometry();
    const petalPos = new Float32Array(petalCount * 3);
    const petalBaseRadii = new Float32Array(petalCount);
    const petalAngles = new Float32Array(petalCount);
    const petalSpeeds = new Float32Array(petalCount);
    const petalYOffsets = new Float32Array(petalCount);

    for (let p = 0; p < petalCount; p++) {
      const idx = p * 3;
      const rad = 14 + Math.pow(Math.random(), 1.2) * 80;
      const ang = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 24 + 2;

      petalPos[idx] = Math.cos(ang) * rad;
      petalPos[idx + 1] = y;
      petalPos[idx + 2] = Math.sin(ang) * rad;

      petalBaseRadii[p] = rad;
      petalAngles[p] = ang;
      petalSpeeds[p] =
        (0.02 + (1 - rad / 95) * 0.045) * (Math.random() > 0.15 ? 1 : -0.8);
      petalYOffsets[p] = Math.random() * Math.PI * 2;
    }

    petalGeo.setAttribute("position", new THREE.BufferAttribute(petalPos, 3));
    const petalMat = new THREE.PointsMaterial({
      size: 4.5,
      map: petalTexture,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    const petalsMesh = new THREE.Points(petalGeo, petalMat);
    scene.add(petalsMesh);

    // Ambient stars
    const starCount = 3200;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      const dist = 120 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[idx] = dist * Math.sin(phi) * Math.cos(theta);
      starPositions[idx + 1] = dist * Math.sin(phi) * Math.sin(theta);
      starPositions[idx + 2] = dist * Math.cos(phi);

      const isGold = Math.random() > 0.4;
      const sc = isGold
        ? new THREE.Color("#ffd97d")
        : new THREE.Color("#ffffff");
      starColors[idx] = sc.r;
      starColors[idx + 1] = sc.g;
      starColors[idx + 2] = sc.b;
    }

    starGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3)
    );
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1.6,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starMesh = new THREE.Points(starGeo, starMaterial);
    scene.add(starMesh);

    // --- 6. DENSE FLORAL SYSTEM: 36+ Orbiting Sunflowers & Centerpiece ---
    const flowerSprites = [];

    // Central Luminous Sunflower Centerpiece
    const centerSunflowerMat = new THREE.SpriteMaterial({
      map: sunflowerTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const centerSunflower = new THREE.Sprite(centerSunflowerMat);
    centerSunflower.scale.set(34, 34, 1);
    centerSunflower.position.set(0, 3.5, 0.2);
    scene.add(centerSunflower);
    flowerSprites.push({
      sprite: centerSunflower,
      basePos: new THREE.Vector3(0, 3.5, 0.2),
      rotRadius: 0,
      rotAngle: 0,
      speed: 0,
      floatSpeed: 2.0,
      floatAmp: 0.6,
    });

    // 36 Orbiting Sunflowers across galaxy arms
    const totalOrbitingFlowers = 36;
    const sunflowerPlacements = [];

    for (let f = 0; f < totalOrbitingFlowers; f++) {
      const arm = f % 4;
      const armAngle = (arm * Math.PI) / 2;
      const radius =
        22 + (f / totalOrbitingFlowers) * 60 + (Math.random() - 0.5) * 6;
      const spinAngle = (radius / 92) * 1.6 * Math.PI;
      const angle = armAngle + spinAngle + (Math.random() - 0.5) * 0.35;
      const y = ((f % 6) - 2.5) * 3.8 + (Math.random() - 0.5) * 2;
      const scale = 20 + (f % 5) * 1.5;
      const speed = 0.022 + (1 - radius / 92) * 0.034;

      sunflowerPlacements.push({
        radius,
        angle,
        y,
        scale,
        speed,
      });
    }

    // Accents orbiting just outside the central sunflower crown
    const crownAccents = [
      { radius: 18, angle: 0, y: 3.5, scale: 16, speed: 0.035 },
      { radius: 18, angle: Math.PI * 0.5, y: 3.5, scale: 16, speed: 0.035 },
      { radius: 18, angle: Math.PI, y: 3.5, scale: 16, speed: 0.035 },
      { radius: 18, angle: Math.PI * 1.5, y: 3.5, scale: 16, speed: 0.035 },
    ];
    sunflowerPlacements.push(...crownAccents);

    sunflowerPlacements.forEach((item, idx) => {
      const fMat = new THREE.SpriteMaterial({
        map: sunflowerTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const fSprite = new THREE.Sprite(fMat);
      fSprite.scale.set(item.scale, item.scale, 1);

      const x = Math.cos(item.angle) * item.radius;
      const z = Math.sin(item.angle) * item.radius;
      fSprite.position.set(x, item.y, z);

      scene.add(fSprite);
      flowerSprites.push({
        sprite: fSprite,
        basePos: new THREE.Vector3(x, item.y, z),
        rotRadius: item.radius,
        rotAngle: item.angle,
        speed: item.speed,
        floatSpeed: 1.2 + (idx % 6) * 0.2,
        floatAmp: 1.2,
      });
    });

    // --- 7. Shockwaves & Bursts ---
    const shockwaveParticles = [];

    // --- 8. Interactive Orbit & Controls ---
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0.22;
    let currentRotationY = 0;
    let currentRotationX = 0.22;

    let targetZoom = 90;
    let currentZoom = 90;

    let mouseNormalizedX = 0;
    let mouseNormalizedY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      prevMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    };

    const onPointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      const rect = container.getBoundingClientRect();
      mouseNormalizedX = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseNormalizedY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = clientX - prevMouseX;
        const deltaY = clientY - prevMouseY;
        prevMouseX = clientX;
        prevMouseY = clientY;

        targetRotationY += deltaX * 0.007;
        targetRotationX += deltaY * 0.007;
        targetRotationX = Math.max(
          -Math.PI / 2.2,
          Math.min(Math.PI / 2.2, targetRotationX)
        );
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      targetZoom += e.deltaY * 0.05;
      targetZoom = Math.max(25, Math.min(160, targetZoom));
    };

    const triggerClickShockwave = () => {
      const burstCount = 160;
      const bGeo = new THREE.BufferGeometry();
      const bPos = new Float32Array(burstCount * 3);
      const bVels = [];
      const bColors = new Float32Array(burstCount * 3);

      for (let i = 0; i < burstCount; i++) {
        const idx = i * 3;
        bPos[idx] = 0;
        bPos[idx + 1] = 3.5;
        bPos[idx + 2] = 0;

        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const speed = Math.random() * 2.0 + 0.7;

        bVels.push(
          new THREE.Vector3(
            speed * Math.sin(phi) * Math.cos(theta),
            speed * Math.sin(phi) * Math.sin(theta),
            speed * Math.cos(phi)
          )
        );

        const col = palette[Math.floor(Math.random() * palette.length)];
        bColors[idx] = col.r;
        bColors[idx + 1] = col.g;
        bColors[idx + 2] = col.b;
      }

      bGeo.setAttribute("position", new THREE.BufferAttribute(bPos, 3));
      bGeo.setAttribute("color", new THREE.BufferAttribute(bColors, 3));

      const bMat = new THREE.PointsMaterial({
        size: 4.2,
        map: sunburstTexture,
        vertexColors: true,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const bMesh = new THREE.Points(bGeo, bMat);
      scene.add(bMesh);
      shockwaveParticles.push({
        mesh: bMesh,
        vels: bVels,
        life: 1.0,
      });

      if (onHeartClick) {
        onHeartClick();
      }
    };

    const onClick = () => {
      triggerClickShockwave();
    };

    let initialTouchDist = 0;
    const onTouchStart = (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        initialTouchDist = Math.sqrt(dx * dx + dy * dy);
      } else if (e.touches.length === 1) {
        onPointerDown(e);
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const delta = (initialTouchDist - dist) * 0.2;
        targetZoom += delta;
        targetZoom = Math.max(25, Math.min(160, targetZoom));
        initialTouchDist = dist;
      } else if (e.touches.length === 1) {
        onPointerMove(e);
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    dom.addEventListener("wheel", onWheel, { passive: false });
    dom.addEventListener("click", onClick);

    dom.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    // --- 9. Animation Loop ---
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth Orbit
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentZoom += (targetZoom - currentZoom) * 0.08;

      if (!isDragging) {
        targetRotationY += 0.0025 * autoRotateSpeed;
      }

      const cameraDistance = currentZoom;
      const cosX = Math.cos(currentRotationX);
      const sinX = Math.sin(currentRotationX);
      const cosY = Math.cos(currentRotationY);
      const sinY = Math.sin(currentRotationY);

      camera.position.x = cameraDistance * sinY * cosX + mouseNormalizedX * 3;
      camera.position.y = cameraDistance * sinX + mouseNormalizedY * 3;
      camera.position.z = cameraDistance * cosY * cosX;
      camera.lookAt(0, 3.5, 0);

      // Solar rhythmic breathing pulse
      const tSolar = elapsedTime * heartBeatSpeed * 2.4;
      const pulse1 = Math.pow(Math.sin(tSolar), 8) * 0.08;
      const pulse2 = Math.sin(tSolar * 0.5) * 0.04;
      const flowerScale = 1.0 + pulse1 + pulse2;

      const sunflowerPosArr = sunflowerGeo.attributes.position.array;
      for (let i = 0; i < totalSunflowerCount; i++) {
        const idx = i * 3;
        const bx = sunflowerBasePositions[idx];
        const by = sunflowerBasePositions[idx + 1];
        const bz = sunflowerBasePositions[idx + 2];

        const tremor = Math.sin(elapsedTime * 3.5 + sunflowerPhases[i]) * 0.05;
        const s = flowerScale + tremor;

        sunflowerPosArr[idx] = bx * s;
        sunflowerPosArr[idx + 1] = (by - 3.5) * s + 3.5;
        sunflowerPosArr[idx + 2] = bz * s;
      }
      sunflowerGeo.attributes.position.needsUpdate = true;

      // Pulse central centerpiece sprite
      centerSunflower.scale.set(
        34 * (flowerScale + 0.03),
        34 * (flowerScale + 0.03),
        1
      );

      // Orbiting sunflowers
      flowerSprites.forEach((f) => {
        if (f.rotRadius > 0) {
          const curAngle = f.rotAngle + elapsedTime * f.speed * autoRotateSpeed;
          f.sprite.position.x = Math.cos(curAngle) * f.rotRadius;
          f.sprite.position.z = Math.sin(curAngle) * f.rotRadius;
          f.sprite.position.y =
            f.basePos.y + Math.sin(elapsedTime * f.floatSpeed) * f.floatAmp;
        }
      });

      // Swirling Petal Particles
      const pArr = petalGeo.attributes.position.array;
      for (let p = 0; p < petalCount; p++) {
        const idx = p * 3;
        const r = petalBaseRadii[p];
        const curAng =
          petalAngles[p] + elapsedTime * petalSpeeds[p] * autoRotateSpeed;
        pArr[idx] = Math.cos(curAng) * r;
        pArr[idx + 1] =
          Math.sin(elapsedTime * 1.4 + petalYOffsets[p]) * 10 + 2;
        pArr[idx + 2] = Math.sin(curAng) * r;
      }
      petalGeo.attributes.position.needsUpdate = true;

      // Orbiting Sunburst Sparkles
      const spkPos = sparkleGeo.attributes.position.array;
      for (let i = 0; i < sparkleCount; i++) {
        const idx = i * 3;
        const bx = sparkleBasePos[idx];
        const by = sparkleBasePos[idx + 1];
        const bz = sparkleBasePos[idx + 2];

        const angleOffset = elapsedTime * 0.35 + i * 0.05;
        const cosO = Math.cos(angleOffset);
        const sinO = Math.sin(angleOffset);

        spkPos[idx] = bx * cosO - bz * sinO;
        spkPos[idx + 1] = by + Math.sin(elapsedTime * 2 + i) * 1.5;
        spkPos[idx + 2] = bx * sinO + bz * cosO;
      }
      sparkleGeo.attributes.position.needsUpdate = true;

      // Galaxy & Central Sunflower gentle slow axial rotation
      galaxyMesh.rotation.y = elapsedTime * 0.04 * autoRotateSpeed;
      sunflowerMesh.rotation.z = Math.sin(elapsedTime * 0.25) * 0.08;

      // Shockwaves
      for (let sIdx = shockwaveParticles.length - 1; sIdx >= 0; sIdx--) {
        const sw = shockwaveParticles[sIdx];
        sw.life -= 0.02;
        const positions = sw.mesh.geometry.attributes.position.array;

        for (let p = 0; p < sw.vels.length; p++) {
          const pIdx = p * 3;
          positions[pIdx] += sw.vels[p].x;
          positions[pIdx + 1] += sw.vels[p].y;
          positions[pIdx + 2] += sw.vels[p].z;
        }
        sw.mesh.geometry.attributes.position.needsUpdate = true;
        sw.mesh.material.opacity = Math.max(0, sw.life);

        if (sw.life <= 0) {
          scene.remove(sw.mesh);
          sw.mesh.geometry.dispose();
          sw.mesh.material.dispose();
          shockwaveParticles.splice(sIdx, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onPointerUp);

      if (dom) {
        dom.removeEventListener("mousedown", onPointerDown);
        dom.removeEventListener("wheel", onWheel);
        dom.removeEventListener("click", onClick);
        dom.removeEventListener("touchstart", onTouchStart);
        if (container.contains(dom)) {
          container.removeChild(dom);
        }
      }

      sunflowerGeo.dispose();
      sunflowerMaterial.dispose();
      sparkleGeo.dispose();
      sparkleMaterial.dispose();
      galaxyGeo.dispose();
      galaxyMaterial.dispose();
      starGeo.dispose();
      starMaterial.dispose();
      petalGeo.dispose();
      petalMat.dispose();
      glowTexture.dispose();
      sunburstTexture.dispose();
      petalTexture.dispose();
      sunflowerTexture.dispose();
      renderer.dispose();
    };
  }, [theme, heartBeatSpeed, autoRotateSpeed, particleDensity]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ touchAction: "none" }}
    />
  );
}
