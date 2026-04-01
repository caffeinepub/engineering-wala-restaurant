import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  speedY: number;
  speedX: number;
  speedZ: number;
  opacity: number;
  color: string;
}

interface Shape3D {
  x: number;
  y: number;
  z: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  driftX: number;
  driftY: number;
  size: number;
  opacity: number;
  sides: number;
  color: string;
}

const COLORS = [
  "rgba(242,154,46,",
  "rgba(255,107,0,",
  "rgba(255,159,69,",
  "rgba(200,120,30,",
];

function project(x: number, y: number, z: number, w: number, h: number) {
  const fov = 600;
  const scale = fov / (fov + z * 400);
  return { sx: w / 2 + x * scale, sy: h / 2 + y * scale, scale };
}

function rotatePoint(x: number, y: number, angle: number) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: x * c - y * s, y: x * s + y * c };
}

function drawWireframe(
  ctx: CanvasRenderingContext2D,
  shape: Shape3D,
  w: number,
  h: number,
) {
  const sides = shape.sides;
  const pts: { x: number; y: number; z: number }[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2;
    let px = Math.cos(angle) * shape.size;
    let py = Math.sin(angle) * shape.size;
    let pz = 0;
    const rx = rotatePoint(py, pz, shape.rotX);
    py = rx.x;
    pz = rx.y;
    const ry = rotatePoint(px, pz, shape.rotY);
    px = ry.x;
    pz = ry.y;
    const rz = rotatePoint(px, py, shape.rotZ);
    px = rz.x;
    py = rz.y;
    pts.push({ x: shape.x + px, y: shape.y + py, z: shape.z + pz });
  }
  const projected = pts.map((p) =>
    project(p.x - w / 2, p.y - h / 2, p.z, w, h),
  );
  ctx.beginPath();
  ctx.moveTo(projected[0].sx, projected[0].sy);
  for (let i = 1; i < projected.length; i++)
    ctx.lineTo(projected[i].sx, projected[i].sy);
  ctx.closePath();
  ctx.strokeStyle = `${shape.color}${shape.opacity})`;
  ctx.lineWidth = 0.8;
  ctx.stroke();
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 25 : 45;
    const SHAPE_COUNT = isMobile ? 6 : 12;

    let animId: number;
    let particles: Particle[] = [];
    let shapes: Shape3D[] = [];
    let lastTime = 0;
    const FRAME_INTERVAL = 1000 / 30;

    const shapeColors = [
      "rgba(242,154,46,",
      "rgba(255,107,0,",
      "rgba(180,100,20,",
    ];

    const createShape = (w: number, h: number): Shape3D => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.8 - 0.4,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotZ: Math.random() * Math.PI * 2,
      rotSpeedX: (Math.random() - 0.5) * 0.008,
      rotSpeedY: (Math.random() - 0.5) * 0.01,
      rotSpeedZ: (Math.random() - 0.5) * 0.006,
      driftX: (Math.random() - 0.5) * 0.3,
      driftY: (Math.random() - 0.5) * 0.2,
      size: 30 + Math.random() * 60,
      opacity: 0.04 + Math.random() * 0.08,
      sides: [3, 4, 6][Math.floor(Math.random() * 3)],
      color: shapeColors[Math.floor(Math.random() * shapeColors.length)],
    });

    const createParticle = (w: number, h: number): Particle => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.6,
        size: 1 + Math.random() * 2,
        speedY: 0.15 + Math.random() * 0.35,
        speedX: (Math.random() - 0.5) * 0.2,
        speedZ: (Math.random() - 0.5) * 0.002,
        opacity: 0.1 + Math.random() * 0.2,
        color,
      };
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: PARTICLE_COUNT }, () =>
        createParticle(canvas.width, canvas.height),
      );
      shapes = Array.from({ length: SHAPE_COUNT }, () =>
        createShape(canvas.width, canvas.height),
      );
    };
    resize();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    };
    window.addEventListener("resize", onResize);

    const animate = (timestamp: number) => {
      animId = requestAnimationFrame(animate);
      if (timestamp - lastTime < FRAME_INTERVAL) return;
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(242,154,46,${0.05 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw 3D wireframe shapes
      for (const s of shapes) {
        s.rotX += s.rotSpeedX;
        s.rotY += s.rotSpeedY;
        s.rotZ += s.rotSpeedZ;
        s.x += s.driftX;
        s.y += s.driftY;
        if (s.x < -100) s.x = canvas.width + 100;
        if (s.x > canvas.width + 100) s.x = -100;
        if (s.y < -100) s.y = canvas.height + 100;
        if (s.y > canvas.height + 100) s.y = -100;
        drawWireframe(ctx, s, canvas.width, canvas.height);
      }

      // Draw particles
      for (const p of particles) {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.z += p.speedZ;
        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        const scale = 0.5 + p.z * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * scale, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();
      }
    };

    animId = requestAnimationFrame(animate);

    const onVisibilityChange = () => {
      if (document.hidden) cancelAnimationFrame(animId);
      else animId = requestAnimationFrame(animate);
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    />
  );
}
