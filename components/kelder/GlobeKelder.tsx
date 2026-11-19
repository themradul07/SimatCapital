"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import land110 from "world-atlas/land-110m.json";

/**
 * Dotted globe with gold arcs between major equity markets.
 * Purely decorative: no labels, no figures, no data. Calm by design:
 * slow rotation, arcs that draw and fade, paused when off-screen,
 * and a still frame for visitors who prefer reduced motion.
 */

const RADIUS = 100;
const GOLD = new THREE.Color("#d6b46a");
const GOLD_BRIGHT = new THREE.Color("#f0d9a0");
const CREAM = new THREE.Color("#f3ecdc");

// Major equity markets (lat, lon). Decorative only.
const HUBS: [number, number][] = [
  [51.5, -0.13], // London
  [40.7, -74.0], // New York
  [43.65, -79.4], // Toronto
  [50.1, 8.7], // Frankfurt
  [47.4, 8.5], // Zurich
  [25.2, 55.3], // Dubai
  [24.7, 46.7], // Riyadh
  [19.1, 72.9], // Mumbai
  [3.1, 101.7], // Kuala Lumpur
  [1.35, 103.8], // Singapore
  [22.3, 114.2], // Hong Kong
  [35.7, 139.7], // Tokyo
  [-33.9, 151.2], // Sydney
  [-23.5, -46.6], // São Paulo
  [-26.2, 28.0], // Johannesburg
];

function toVec3(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

/** Rasterise the land outline into an equirectangular mask we can sample. */
function buildLandMask(w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  const topo = land110 as unknown as Topology<{ land: GeometryCollection }>;
  const geo = feature(topo, topo.objects.land);
  ctx.fillStyle = "#fff";
  const features = "features" in geo ? geo.features : [geo];
  for (const f of features) {
    const g = f.geometry;
    const polys = g.type === "Polygon" ? [g.coordinates] : g.type === "MultiPolygon" ? g.coordinates : [];
    for (const poly of polys) {
      ctx.beginPath();
      for (const ring of poly) {
        ring.forEach(([lon, lat], i) => {
          const x = ((lon + 180) / 360) * w;
          const y = ((90 - lat) / 180) * h;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.closePath();
      }
      ctx.fill("evenodd");
    }
  }
  const data = ctx.getImageData(0, 0, w, h).data;
  return (lat: number, lon: number) => {
    const x = Math.min(w - 1, Math.max(0, Math.floor(((lon + 180) / 360) * w)));
    const y = Math.min(h - 1, Math.max(0, Math.floor(((90 - lat) / 180) * h)));
    return data[(y * w + x) * 4] > 128;
  };
}

function dotTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.45, "rgba(255,255,255,0.9)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

type Arc = {
  line: THREE.Line;
  head: THREE.Sprite;
  curve: THREE.QuadraticBezierCurve3;
  born: number;
  life: number;
  count: number;
};

export default function GlobeKelder({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = el.clientWidth || 800;
    let height = el.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.set(0, 0, 215);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // The globe sits low in the frame so only its upper part shows, like a horizon.
    const globe = new THREE.Group();
    globe.position.y = -72;
    globe.rotation.x = 0.38;
    scene.add(globe);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(o: T) => (disposables.push(o), o);

    // Occluding core so dots on the far side are hidden.
    const core = new THREE.Mesh(
      track(new THREE.SphereGeometry(RADIUS - 0.6, 64, 64)),
      track(new THREE.MeshBasicMaterial({ color: 0x0a0907 })),
    );
    globe.add(core);

    // Soft gold rim light.
    const atmos = new THREE.Mesh(
      track(new THREE.SphereGeometry(RADIUS * 1.13, 64, 64)),
      track(
        new THREE.ShaderMaterial({
          vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
          fragmentShader: `varying vec3 vN; void main(){ float i = pow(0.62 - dot(vN, vec3(0.0,0.0,1.0)), 3.0); gl_FragColor = vec4(0.84,0.70,0.42,1.0) * i * 0.7; }`,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide,
          transparent: true,
          depthWrite: false,
        }),
      ),
    );
    scene.add(atmos);
    atmos.position.copy(globe.position);

    // Land dots on an even (Fibonacci) spiral.
    const isLand = buildLandMask(720, 360);
    const N = width < 640 ? 16000 : 24000;
    const pos: number[] = [];
    const col: number[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const lat = Math.asin(y) * (180 / Math.PI);
      const lonN = (((golden * i * 180) / Math.PI) % 360) - 180;
      if (lat < -58) continue;
      const v = toVec3(lat, lonN, RADIUS);
      if (!isLand(lat, lonN)) {
        if (i % 9) continue;
        pos.push(v.x, v.y, v.z);
        col.push(0.16, 0.13, 0.08);
        continue;
      }
      pos.push(v.x, v.y, v.z);
      const c = CREAM.clone().lerp(GOLD, 0.35 + Math.random() * 0.4);
      const dim = 0.75 + Math.random() * 0.25;
      col.push(c.r * dim, c.g * dim, c.b * dim);
    }
    const dotsGeo = track(new THREE.BufferGeometry());
    dotsGeo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    dotsGeo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
    const tex = track(dotTexture());
    const dots = new THREE.Points(
      dotsGeo,
      track(
        new THREE.PointsMaterial({
          size: width < 640 ? 2.6 : 2.4,
          map: tex,
          vertexColors: true,
          transparent: true,
          opacity: 1,
          depthWrite: false,
        }),
      ),
    );
    globe.add(dots);

    // Market hubs with a slow pulse.
    const hubVecs = HUBS.map(([la, lo]) => toVec3(la, lo, RADIUS + 0.4));
    const hubMat = track(new THREE.SpriteMaterial({ map: tex, color: GOLD_BRIGHT, transparent: true, depthWrite: false }));
    const rings: THREE.Mesh[] = [];
    const ringGeo = track(new THREE.RingGeometry(1.6, 2.2, 40));
    hubVecs.forEach((v) => {
      const s = new THREE.Sprite(hubMat);
      s.position.copy(v);
      s.scale.setScalar(4);
      globe.add(s);
      const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.6, side: THREE.DoubleSide, depthWrite: false }));
      ring.position.copy(v);
      ring.lookAt(0, 0, 0);
      globe.add(ring);
      rings.push(ring);
    });

    // Arcs that draw between two hubs, carry a bright head, then fade.
    const arcs: Arc[] = [];
    const headMat = track(new THREE.SpriteMaterial({ map: tex, color: 0xffffff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    const SEG = 64;
    const spawnArc = (now: number) => {
      const a = Math.floor(Math.random() * hubVecs.length);
      let b = Math.floor(Math.random() * hubVecs.length);
      if (b === a) b = (b + 1) % hubVecs.length;
      const pA = hubVecs[a];
      const pB = hubVecs[b];
      const dist = pA.distanceTo(pB);
      const mid = pA.clone().add(pB).multiplyScalar(0.5).normalize().multiplyScalar(RADIUS + dist * 0.38);
      const curve = new THREE.QuadraticBezierCurve3(pA, mid, pB);
      const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(SEG));
      geo.setDrawRange(0, 0);
      const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.85, depthWrite: false }));
      const head = new THREE.Sprite(headMat.clone());
      head.scale.setScalar(5);
      globe.add(line, head);
      arcs.push({ line, head, curve, born: now, life: 3.6 + Math.random() * 1.4, count: SEG + 1 });
    };
    const removeArc = (arc: Arc) => {
      globe.remove(arc.line, arc.head);
      arc.line.geometry.dispose();
      (arc.line.material as THREE.Material).dispose();
      (arc.head.material as THREE.Material).dispose();
    };

    // Drag to rotate, gently.
    let spin = -1.9; // start with Europe, the Gulf and Africa facing the viewer
    let tilt = 0.38;
    let targetSpin = spin;
    let targetTilt = tilt;
    let dragging = false;
    let px = 0;
    let py = 0;
    const dom = renderer.domElement;
    dom.style.touchAction = "pan-y";
    const down = (e: PointerEvent) => {
      dragging = true;
      px = e.clientX;
      py = e.clientY;
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      targetSpin += (e.clientX - px) * 0.005;
      targetTilt = Math.max(0.05, Math.min(0.7, targetTilt + (e.clientY - py) * 0.003));
      px = e.clientX;
      py = e.clientY;
    };
    const up = () => (dragging = false);
    dom.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);

    const clock = new THREE.Clock();
    let raf = 0;
    let running = false;
    let nextSpawn = 0.4;

    const frame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      if (!dragging && !reduced) targetSpin += dt * 0.06;
      spin += (targetSpin - spin) * 0.06;
      tilt += (targetTilt - tilt) * 0.06;
      globe.rotation.set(tilt, spin, 0);

      rings.forEach((r, i) => {
        const p = (t * 0.45 + i * 0.27) % 1;
        r.scale.setScalar(1 + p * 2.2);
        (r.material as THREE.MeshBasicMaterial).opacity = 0.55 * (1 - p);
      });

      if (!reduced && t > nextSpawn && arcs.length < 7) {
        spawnArc(t);
        nextSpawn = t + 0.7 + Math.random() * 0.9;
      }

      for (let i = arcs.length - 1; i >= 0; i--) {
        const arc = arcs[i];
        const age = (t - arc.born) / arc.life; // 0..1
        const drawP = Math.min(1, age / 0.45);
        const eased = 1 - Math.pow(1 - drawP, 3);
        arc.line.geometry.setDrawRange(0, Math.max(2, Math.floor(eased * arc.count)));
        arc.head.position.copy(arc.curve.getPoint(eased));
        const fade = age < 0.6 ? 1 : Math.max(0, 1 - (age - 0.6) / 0.4);
        (arc.line.material as THREE.LineBasicMaterial).opacity = 0.8 * fade;
        (arc.head.material as THREE.SpriteMaterial).opacity = drawP < 1 ? 1 : fade * 0.6;
        if (age >= 1) {
          removeArc(arc);
          arcs.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
      if (running) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      clock.getDelta();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    if (reduced) {
      // A few static arcs, one still frame.
      for (let i = 0; i < 4; i++) spawnArc(-1);
      arcs.forEach((a) => a.line.geometry.setDrawRange(0, a.count));
      globe.rotation.set(tilt, spin, 0);
      arcs.forEach((a) => a.head.position.copy(a.curve.getPoint(1)));
      renderer.render(scene, camera);
    }

    const io = new IntersectionObserver(([e]) => {
      if (reduced) return;
      if (e.isIntersecting) start();
      else stop();
    });
    io.observe(el);

    const ro = new ResizeObserver(() => {
      width = el.clientWidth;
      height = el.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      if (reduced || !running) renderer.render(scene, camera);
    });
    ro.observe(el);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      dom.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      arcs.forEach(removeArc);
      rings.forEach((r) => (r.material as THREE.Material).dispose());
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (dom.parentNode === el) el.removeChild(dom);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className={`relative h-full w-full cursor-grab select-none active:cursor-grabbing ${className}`}
    />
  );
}
