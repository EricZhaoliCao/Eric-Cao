import { useEffect, useRef } from "react";

/**
 * Dense 3D particle field that morphs between mathematically/quant-meaningful
 * shapes AS YOU SCROLL the page: top of page = first shape, bottom = last one,
 * continuously interpolating in between. One shared pool of particles eases
 * toward the scroll-selected target. Rotates on its own, follows the cursor,
 * and scroll adds spin.
 *
 * Pure canvas (no library). Fixed full-page backdrop. Respects
 * prefers-reduced-motion, pauses when hidden, DPR-capped.
 */
type Props = {
  color?: string; // rgb triplet, e.g. "57, 211, 83"
  className?: string;
};

const N = 6400; // particle count (also 80x80 for surface / grid shapes)

type ShapeFn = (t: Float32Array) => void;

function normalize(t: Float32Array) {
  let cx = 0, cy = 0, cz = 0;
  for (let i = 0; i < N; i++) {
    cx += t[i * 3]; cy += t[i * 3 + 1]; cz += t[i * 3 + 2];
  }
  cx /= N; cy /= N; cz /= N;
  let max = 0;
  for (let i = 0; i < N; i++) {
    t[i * 3] -= cx; t[i * 3 + 1] -= cy; t[i * 3 + 2] -= cz;
    const r = Math.hypot(t[i * 3], t[i * 3 + 1], t[i * 3 + 2]);
    if (r > max) max = r;
  }
  const s = max > 0 ? 1.1 / max : 1;
  for (let i = 0; i < N * 3; i++) t[i] *= s;
}

const lorenz: ShapeFn = (t) => {
  let x = 0.1, y = 0, z = 0;
  const dt = 0.005, sig = 10, rho = 28, beta = 8 / 3;
  for (let k = 0; k < 1500; k++) {
    x += sig * (y - x) * dt; y += (x * (rho - z) - y) * dt; z += (x * y - beta * z) * dt;
  }
  for (let i = 0; i < N; i++) {
    const dx = sig * (y - x), dy = x * (rho - z) - y, dz = x * y - beta * z;
    x += dx * dt; y += dy * dt; z += dz * dt;
    t[i * 3] = x; t[i * 3 + 1] = z - 25; t[i * 3 + 2] = y;
  }
};

const rossler: ShapeFn = (t) => {
  let x = 0.1, y = 0, z = 0;
  const a = 0.2, b = 0.2, c = 5.7, dt = 0.03;
  for (let k = 0; k < 3000; k++) {
    const dx = -y - z, dy = x + a * y, dz = b + z * (x - c);
    x += dx * dt; y += dy * dt; z += dz * dt;
  }
  for (let i = 0; i < N; i++) {
    const dx = -y - z, dy = x + a * y, dz = b + z * (x - c);
    x += dx * dt; y += dy * dt; z += dz * dt;
    t[i * 3] = x; t[i * 3 + 1] = z; t[i * 3 + 2] = y;
  }
};

const gaussian: ShapeFn = (t) => {
  const G = Math.round(Math.sqrt(N));
  let i = 0;
  for (let a = 0; a < G; a++) for (let b = 0; b < G; b++) {
    const x = (a / (G - 1) - 0.5) * 6, y = (b / (G - 1) - 0.5) * 6;
    const z = Math.exp(-(x * x + y * y) / 2) * 4;
    t[i * 3] = x; t[i * 3 + 1] = z - 1; t[i * 3 + 2] = y; i++;
  }
  while (i < N) { t[i * 3] = 0; t[i * 3 + 1] = 0; t[i * 3 + 2] = 0; i++; }
};

const volSurface: ShapeFn = (t) => {
  const G = Math.round(Math.sqrt(N));
  let i = 0;
  for (let a = 0; a < G; a++) for (let b = 0; b < G; b++) {
    const x = (a / (G - 1) - 0.5) * 6, y = (b / (G - 1) - 0.5) * 6;
    const z = (0.16 * x * x - 0.10 * y * y) * 2; // saddle (smile vs term structure)
    t[i * 3] = x; t[i * 3 + 1] = z; t[i * 3 + 2] = y; i++;
  }
  while (i < N) { t[i * 3] = 0; t[i * 3 + 1] = 0; t[i * 3 + 2] = 0; i++; }
};

const gbm: ShapeFn = (t) => {
  const G = Math.round(Math.sqrt(N)); // paths x steps
  const P = G, S = G, mu = 0.12, vol = 0.4, dt = 1 / S;
  let seed = 987654321;
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  const gauss = () => {
    let u = 0, v = 0;
    while (u === 0) u = rnd();
    while (v === 0) v = rnd();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  let i = 0;
  for (let p = 0; p < P; p++) {
    let logS = 0;
    for (let s = 0; s < S; s++) {
      logS += (mu - vol * vol / 2) * dt + vol * Math.sqrt(dt) * gauss();
      t[i * 3] = (s / (S - 1) - 0.5) * 6;       // time
      t[i * 3 + 1] = logS * 4;                   // log-price
      t[i * 3 + 2] = (p / (P - 1) - 0.5) * 5;    // path depth
      i++;
    }
  }
  while (i < N) { t[i * 3] = 0; t[i * 3 + 1] = 0; t[i * 3 + 2] = 0; i++; }
};

const helix: ShapeFn = (t) => {
  const turns = 4.5;
  for (let i = 0; i < N; i++) {
    const strand = i % 2;
    const f = Math.floor(i / 2) / (N / 2);
    const ang = f * turns * 2 * Math.PI + strand * Math.PI;
    t[i * 3] = Math.cos(ang) * 1.6;
    t[i * 3 + 1] = (f - 0.5) * 6;
    t[i * 3 + 2] = Math.sin(ang) * 1.6;
  }
};

const sphere: ShapeFn = (t) => {
  const ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = ga * i;
    t[i * 3] = Math.cos(th) * r * 2.4; t[i * 3 + 1] = y * 2.4; t[i * 3 + 2] = Math.sin(th) * r * 2.4;
  }
};

const uvSphere: ShapeFn = (t) => {
  const G = Math.round(Math.sqrt(N)); // latitude x longitude grid
  const r = 2.3;
  let i = 0;
  for (let a = 0; a < G; a++) for (let b = 0; b < G; b++) {
    const lat = (a / (G - 1) - 0.5) * Math.PI;
    const lon = (b / (G - 1)) * 2 * Math.PI;
    t[i * 3] = r * Math.cos(lat) * Math.cos(lon);
    t[i * 3 + 1] = r * Math.sin(lat);
    t[i * 3 + 2] = r * Math.cos(lat) * Math.sin(lon);
    i++;
  }
  while (i < N) { t[i * 3] = 0; t[i * 3 + 1] = 0; t[i * 3 + 2] = 0; i++; }
};

const torus: ShapeFn = (t) => {
  const G = Math.round(Math.sqrt(N)), R = 2.2, r = 0.9;
  let i = 0;
  for (let a = 0; a < G; a++) for (let b = 0; b < G; b++) {
    const u = (a / G) * 2 * Math.PI, v = (b / G) * 2 * Math.PI;
    t[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
    t[i * 3 + 1] = r * Math.sin(v);
    t[i * 3 + 2] = (R + r * Math.cos(v)) * Math.sin(u);
    i++;
  }
  while (i < N) { t[i * 3] = 0; t[i * 3 + 1] = 0; t[i * 3 + 2] = 0; i++; }
};

const SHAPES: { name: string; fn: ShapeFn }[] = [
  { name: "Fibonacci Sphere", fn: sphere },
  { name: "Lorenz Attractor", fn: lorenz },
  { name: "Rössler Attractor", fn: rossler },
  { name: "Gaussian Distribution", fn: gaussian },
  { name: "Volatility Surface", fn: volSurface },
  { name: "Geometric Brownian Motion", fn: gbm },
  { name: "Double Helix", fn: helix },
  { name: "Lat-Lon Sphere", fn: uvSphere },
  { name: "Torus", fn: torus },
];

export default function ParticleField({ color = "57, 211, 83", className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Mobile / WeChat in-app browser: render fewer particles (evenly subsampled)
    // so the effect still shows but stays smooth and easy on the battery.
    const isMobile =
      /Mobi|Android|iPhone|iPad|MicroMessenger/i.test(navigator.userAgent) ||
      window.innerWidth < 820;
    const stride = isMobile ? Math.max(1, Math.round(N / 2200)) : 1;

    const targets = SHAPES.map((s) => {
      const arr = new Float32Array(N * 3);
      s.fn(arr);
      normalize(arr);
      return arr;
    });

    let width = 0, height = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pos = new Float32Array(targets[0]);
    const TAU = Math.PI * 2;

    const mouse = { x: 0.5, y: 0.5 };
    let scrollY = window.scrollY || 0;
    let yaw = 0;
    const pitch = 0.32;
    let mYaw = 0, mPitch = 0;
    let nameAlpha = 1, nameIdx = 0;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(animate: boolean, dt: number) {
      // scroll fraction -> continuous shape index
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const frac = Math.min(1, Math.max(0, scrollY / maxScroll));
      const fShape = frac * (SHAPES.length - 1);
      const i0 = Math.floor(fShape);
      const i1 = Math.min(i0 + 1, SHAPES.length - 1);
      const lt = fShape - i0;
      const blend = lt * lt * (3 - 2 * lt); // smoothstep
      const A = targets[i0], B = targets[i1];

      const ease = animate ? 0.12 : 1;
      for (let i = 0; i < N; i += stride) {
        for (let c = 0; c < 3; c++) {
          const k = i * 3 + c;
          const tg = A[k] * (1 - blend) + B[k] * blend;
          pos[k] += (tg - pos[k]) * ease;
        }
      }

      // label follows dominant shape
      const dom = Math.round(fShape);
      if (dom !== nameIdx) { nameIdx = dom; nameAlpha = 0; }
      nameAlpha += (1 - nameAlpha) * 0.05;

      if (animate) yaw += dt * 0.2;
      mYaw += ((mouse.x - 0.5) * 1.4 - mYaw) * 0.05;
      mPitch += ((mouse.y - 0.5) * 0.9 - mPitch) * 0.05;
      const ry = yaw + mYaw + scrollY * 0.0016;
      const rx = pitch + mPitch;
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const cosX = Math.cos(rx), sinX = Math.sin(rx);

      const cx = width / 2, cy = height / 2;
      const scale = Math.min(width, height) * 0.44;
      const FOV = 3.4;

      ctx!.clearRect(0, 0, width, height);
      for (let i = 0; i < N; i += stride) {
        const x = pos[i * 3], y = pos[i * 3 + 1], z = pos[i * 3 + 2];
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const p = FOV / (FOV + z2);
        const sx = cx + x1 * p * scale;
        const sy = cy - y1 * p * scale;
        const near = 1 - (z2 + 1.2) / 2.4; // 1 near .. 0 far
        const r = (0.8 + near * 1.4) * p;
        ctx!.fillStyle = `rgba(${color}, ${Math.max(0.12, 0.25 + near * 0.55)})`;
        ctx!.beginPath();
        ctx!.arc(sx, sy, r, 0, TAU);
        ctx!.fill();
      }

      ctx!.font = "12px 'JetBrains Mono', ui-monospace, monospace";
      ctx!.fillStyle = `rgba(${color}, ${0.5 * nameAlpha})`;
      ctx!.textAlign = "center";
      ctx!.fillText(SHAPES[nameIdx].name.toUpperCase(), cx, height - 40);
    }

    let raf = 0, running = true, last = 0;
    function loop(ts: number) {
      if (!running) return;
      const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0.016;
      last = ts;
      draw(true, dt);
      raf = requestAnimationFrame(loop);
    }

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    }
    function onScroll() { scrollY = window.scrollY || 0; }
    function onVisibility() {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else if (!running && !reduce) { running = true; last = 0; raf = requestAnimationFrame(loop); }
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    if (reduce) draw(false, 0);
    else raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [color]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
