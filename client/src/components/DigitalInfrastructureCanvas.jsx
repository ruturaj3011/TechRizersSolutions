import { useEffect, useRef, useState } from 'react';

/**
 * Digital Infrastructure Network Animation
 * Central TechRizers Core connected to Frontend, API, Backend, Database, Cloud, AI, and Analytics.
 * Subtle, lightweight, 60fps canvas animation with interactive data packets and mouse parallax.
 */
export default function DigitalInfrastructureCanvas({ height = 440 }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth || 480);
    let canvasHeight = (canvas.height = height);

    // Mouse coordinates for subtle parallax
    let mouseX = width / 2;
    let mouseY = canvasHeight / 2;
    let targetMouseX = width / 2;
    let targetMouseY = canvasHeight / 2;

    // Infrastructure Nodes configuration directly reflecting the reference domains
    const nodes = [
      { id: 'ai', label: 'AI SOLUTIONS', sub: 'Chatbots · LLMs · Agents', angle: -Math.PI / 2, dist: 135, color: '#38BDF8', icon: '🧠' },
      { id: 'software', label: 'SOFTWARE DEV', sub: 'Custom SaaS · APIs', angle: -Math.PI / 6, dist: 145, color: '#60A5FA', icon: '</>' },
      { id: 'mobile', label: 'MOBILE APPS', sub: 'iOS · Android · Flutter', angle: Math.PI / 6, dist: 145, color: '#38BDF8', icon: '📱' },
      { id: 'cloud', label: 'CLOUD & DEVOPS', sub: 'AWS · Docker · CI/CD', angle: Math.PI / 2, dist: 135, color: '#06B6D4', icon: '☁' },
      { id: 'automation', label: 'AUTOMATION', sub: 'Workflows · RPA · Bots', angle: (5 * Math.PI) / 6, dist: 145, color: '#10B981', icon: '⚙' },
      { id: 'uiux', label: 'UI/UX DESIGN', sub: 'Figma · Design Systems', angle: (-5 * Math.PI) / 6, dist: 145, color: '#F43F5E', icon: '🎨' },
      { id: 'web', label: 'WEB DEVELOPMENT', sub: 'Scalable Full-Stack Apps', angle: 0, dist: 155, color: '#8B5CF6', icon: '🌐' }
    ];

    // Data packets traveling between Core and Nodes
    const packets = [];
    nodes.forEach((n, i) => {
      // 2 packets per node, one outbound, one inbound
      packets.push({ nodeIndex: i, progress: Math.random(), speed: 0.005 + Math.random() * 0.004, outbound: true, size: 3 });
      packets.push({ nodeIndex: i, progress: Math.random(), speed: 0.004 + Math.random() * 0.003, outbound: false, size: 2.5 });
    });

    // Background floating ambient particles
    const bgParticles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * canvasHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1
    }));

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;

      // Check hover hit test
      const cx = width / 2 + (mouseX - width / 2) * 0.08;
      const cy = canvasHeight / 2 + (mouseY - canvasHeight / 2) * 0.08;
      let found = null;
      nodes.forEach((node) => {
        const nx = cx + Math.cos(node.angle) * node.dist;
        const ny = cy + Math.sin(node.angle) * (node.dist * 0.72);
        const dist = Math.hypot(targetMouseX - nx, targetMouseY - ny);
        if (dist < 26) found = node.id;
      });
      setHoveredNode(found);
    };

    window.addEventListener('pointermove', handlePointerMove);

    let time = 0;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      time += 0.02;

      // Smooth mouse damping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const parallaxX = (mouseX - width / 2) * 0.07;
      const parallaxY = (mouseY - canvasHeight / 2) * 0.07;

      ctx.clearRect(0, 0, width, canvasHeight);

      // 1. Dark Depth Radial Background
      const bgGrad = ctx.createRadialGradient(
        width / 2 + parallaxX * 0.5,
        canvasHeight / 2 + parallaxY * 0.5,
        20,
        width / 2,
        canvasHeight / 2,
        width * 0.7
      );
      bgGrad.addColorStop(0, '#172554');
      bgGrad.addColorStop(0.5, '#0F172A');
      bgGrad.addColorStop(1, '#070B14');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, canvasHeight);

      // 2. Subtle Grid & Floating Background Particles
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
      }
      for (let y = 0; y < canvasHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      bgParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = canvasHeight;
        if (p.y > canvasHeight) p.y = 0;

        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Core Coordinates
      const coreX = width / 2 + parallaxX;
      const coreY = canvasHeight / 2 + parallaxY;

      // 3. Concentric Orbital Rings
      const ringOsc = Math.sin(time * 0.8) * 4;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(coreX, coreY, 140 + ringOsc, (140 + ringOsc) * 0.72, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(37, 99, 235, 0.08)';
      ctx.beginPath();
      ctx.ellipse(coreX, coreY, 175 - ringOsc, (175 - ringOsc) * 0.72, 0, 0, Math.PI * 2);
      ctx.stroke();

      // 4. Connection Lines from Core to Nodes
      nodes.forEach((node, idx) => {
        const floatOffset = Math.sin(time * 1.5 + idx) * 3;
        const nx = coreX + Math.cos(node.angle) * node.dist;
        const ny = coreY + Math.sin(node.angle) * (node.dist * 0.72) + floatOffset;
        node.currentX = nx;
        node.currentY = ny;

        const isHovered = hoveredNode === node.id;

        // Path Line
        ctx.strokeStyle = isHovered ? node.color : 'rgba(59, 130, 246, 0.22)';
        ctx.lineWidth = isHovered ? 2 : 1.2;
        ctx.setLineDash(isHovered ? [] : [4, 4]);
        ctx.beginPath();
        ctx.moveTo(coreX, coreY);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 5. Data Packets traveling along lines
      packets.forEach((pkt) => {
        const node = nodes[pkt.nodeIndex];
        pkt.progress += pkt.speed;
        if (pkt.progress > 1) pkt.progress = 0;

        const startX = pkt.outbound ? coreX : node.currentX;
        const startY = pkt.outbound ? coreY : node.currentY;
        const endX = pkt.outbound ? node.currentX : coreX;
        const endY = pkt.outbound ? node.currentY : coreY;

        const px = startX + (endX - startX) * pkt.progress;
        const py = startY + (endY - startY) * pkt.progress;

        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, pkt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 6. Draw Peripheral Infrastructure Nodes
      nodes.forEach((node) => {
        const isHovered = hoveredNode === node.id;
        const r = isHovered ? 20 : 16;

        // Outer Glow Halo
        const haloGrad = ctx.createRadialGradient(node.currentX, node.currentY, r * 0.3, node.currentX, node.currentY, r * 1.8);
        haloGrad.addColorStop(0, `${node.color}55`);
        haloGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(node.currentX, node.currentY, r * 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Node Circle Body
        ctx.fillStyle = '#0F172A';
        ctx.strokeStyle = isHovered ? '#FFFFFF' : node.color;
        ctx.lineWidth = isHovered ? 2.5 : 1.5;
        ctx.beginPath();
        ctx.arc(node.currentX, node.currentY, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Icon inside circle
        ctx.fillStyle = node.color;
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.icon, node.currentX, node.currentY);

        // Technical Label Badge
        const labelY = node.currentY > coreY ? node.currentY + r + 14 : node.currentY - r - 16;
        ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = isHovered ? '#FFFFFF' : '#E2E8F0';
        ctx.fillText(node.label, node.currentX, labelY);

        ctx.font = '500 9px "Inter", sans-serif';
        ctx.fillStyle = '#94A3B8';
        ctx.fillText(node.sub, node.currentX, labelY + 11);
      });

      // 7. Central Core (TechRizers Engine)
      const corePulse = Math.sin(time * 2) * 3;
      const coreRadius = 34 + corePulse;

      // Outer Core Ambient Glow
      const coreHalo = ctx.createRadialGradient(coreX, coreY, coreRadius * 0.2, coreX, coreY, coreRadius * 2.2);
      coreHalo.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
      coreHalo.addColorStop(0.5, 'rgba(37, 99, 235, 0.2)');
      coreHalo.addColorStop(1, 'transparent');
      ctx.fillStyle = coreHalo;
      ctx.beginPath();
      ctx.arc(coreX, coreY, coreRadius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Core Glass Body
      const coreBodyGrad = ctx.createRadialGradient(coreX - 8, coreY - 8, 4, coreX, coreY, coreRadius);
      coreBodyGrad.addColorStop(0, '#1E293B');
      coreBodyGrad.addColorStop(1, '#070B14');
      ctx.fillStyle = coreBodyGrad;
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(coreX, coreY, coreRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Rotating Inner Hexagon / Core Geometry
      ctx.save();
      ctx.translate(coreX, coreY);
      ctx.rotate(time * 0.4);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let s = 0; s < 6; s++) {
        const a = (s * Math.PI) / 3;
        const hx = Math.cos(a) * (coreRadius * 0.65);
        const hy = Math.sin(a) * (coreRadius * 0.65);
        if (s === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      // Central TR Core Emblem matching brand
      ctx.font = '800 12px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('TECHRIZERS', coreX, coreY - 4);

      ctx.font = '700 7.5px "Inter", sans-serif';
      ctx.fillStyle = '#38BDF8';
      ctx.fillText('CRAFT • BUILD • RISE', coreX, coreY + 9);
    };

    render();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      canvasHeight = canvas.height = height;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas.parentElement);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [height]);

  return (
    <div
      ref={containerRef}
      className="digital-infrastructure-frame"
      style={{
        width: '100%',
        height: `${height}px`,
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(59, 130, 246, 0.25)',
        boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.35), 0 0 35px rgba(37, 99, 235, 0.15)'
      }}
    >
      {/* Top Floating Badge */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          padding: '5px 12px',
          borderRadius: '999px',
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          backdropFilter: 'blur(8px)',
          fontSize: '11px',
          fontWeight: 700,
          color: '#38BDF8',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          zIndex: 5
        }}
      >
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
        DIGITAL INFRASTRUCTURE NETWORK
      </div>

      {/* Bottom Floating Telemetry */}
      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          padding: '4px 10px',
          borderRadius: '6px',
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '10px',
          color: '#94A3B8',
          fontFamily: 'monospace',
          zIndex: 5
        }}
      >
        LIVE DATA FLOW · 60 FPS
      </div>

      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          cursor: 'crosshair'
        }}
      />
    </div>
  );
}
