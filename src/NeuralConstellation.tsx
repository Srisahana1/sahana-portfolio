import { useEffect, useRef } from 'react';
import { observeSignalSurface } from './Signals';

// Fixed topology: no particles, random placement, or per-frame geometry/layout reads.
const nodes = [[.49,.08],[.66,.14],[.83,.08],[.96,.23],[.69,.33],[.87,.41],[.57,.5],[.76,.63],[.96,.68],[.61,.79],[.83,.88],[.99,.94],[.39,.91],[.21,.81],[.06,.93],[.36,.13]];
const edges = [[0,1],[1,2],[2,3],[1,4],[3,5],[4,5],[4,6],[5,7],[5,8],[6,7],[7,8],[7,9],[8,10],[9,10],[10,11],[9,12],[12,13],[13,14],[0,15],[6,12]];

export default function NeuralConstellation() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = root.current;
    const surface = canvas.current;
    const fine = matchMedia('(hover:hover) and (pointer:fine)');
    if (!fine.matches) return;
    const context = surface?.getContext('2d');
    const hero = element?.closest('section');
    if (!element || !surface || !context || !hero || !('ResizeObserver' in window)) return;
    let frame = 0, active = false, width = 0, height = 0, clock = 0, previous = 0;
    let box = { left: 0, top: 0 }, points: number[][] = [];
    let pointer = { x: -1000, y: -1000 }, hot = -1, emitted = -1000;
    const illumination = nodes.map(() => 0);
    let pulses: { edge: number; start: number; reverse: boolean }[] = [];
    const stop = () => { cancelAnimationFrame(frame); frame = 0; previous = 0; element.dataset.running = 'false'; };
    const draw = (now: number) => {
      frame = 0;
      if (!active || !fine.matches) return;
      // Time advances only while visible; returning to the hero cannot create a backlog.
      clock += previous ? Math.min(now - previous, 50) : 16;
      previous = now;
      context.clearRect(0, 0, width, height);
      let nearest = -1, distance = 110;
      points.forEach(([x, y], i) => {
        const gap = Math.hypot(x - pointer.x, y - pointer.y);
        if (gap < distance) { nearest = i; distance = gap; }
      });
      if (nearest !== hot) {
        hot = nearest;
        if (hot >= 0 && clock - emitted > 320) {
          pulses = edges.flatMap(([a, b], edge) => a === hot || b === hot ? [{ edge, start: clock, reverse: b === hot }] : []).slice(0, 4);
          emitted = clock;
        }
        element.dataset.activeNode = String(hot);
      }
      if (pulses.length === 0 && clock >= 300 && (clock < 350 || clock % 4200 < 45)) pulses = [{ edge: Math.floor(clock / 4200) % edges.length, start: clock, reverse: false }];
      illumination.forEach((value, i) => { illumination[i] = value + ((i === hot ? 1 : 0) - value) * .18; });
      edges.forEach(([a, b], index) => {
        const [ax, ay] = points[a], [bx, by] = points[b];
        const lit = Math.max(illumination[a], illumination[b]);
        const formed = Math.min(1, Math.max(0, (clock - 90 - index * 6) / 220));
        context.strokeStyle = lit > .01 ? `rgba(0,245,212,${.13 + lit * .45})` : index % 3 === 0 ? 'rgba(112,0,255,.26)' : 'rgba(0,245,212,.13)';
        context.lineWidth = .7 + lit * .4;
        context.beginPath(); context.moveTo(ax, ay); context.lineTo(ax + (bx - ax) * formed, ay + (by - ay) * formed); context.stroke();
      });
      pulses = pulses.filter(pulse => clock - pulse.start < 850);
      for (const pulse of pulses) {
        const [a, b] = edges[pulse.edge], from = points[pulse.reverse ? b : a], to = points[pulse.reverse ? a : b];
        const t = (clock - pulse.start) / 850;
        context.strokeStyle = `rgba(0,245,212,${Math.sin(t * Math.PI) * .85})`; context.lineWidth = 1.6;
        context.beginPath(); context.moveTo(from[0] + (to[0] - from[0]) * Math.max(0, t - .12), from[1] + (to[1] - from[1]) * Math.max(0, t - .12));
        context.lineTo(from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t); context.stroke();
      }
      points.forEach(([x, y], i) => {
        const strength = .3 + illumination[i] * .65 + Math.sin(clock / 2000 + i * .7) * .07;
        context.fillStyle = `rgba(0,245,212,${strength * Math.min(1, clock / 140)})`;
        context.beginPath(); context.arc(x, y, 1.7 + illumination[i] * 1.3, 0, Math.PI * 2); context.fill();
        if (i % 4 === 0 || illumination[i] > .01) {
          context.strokeStyle = `rgba(0,245,212,${strength * .35})`; context.lineWidth = .7;
          context.beginPath(); context.arc(x, y, 7 + illumination[i] * 3, 0, Math.PI * 2); context.stroke();
        }
      });
      if (element.dataset.canvas !== 'true') element.dataset.canvas = 'true';
      frame = requestAnimationFrame(draw);
    };
    const schedule = () => {
      if (active && fine.matches && width && height) {
        if (!frame) { element.dataset.running = 'true'; frame = requestAnimationFrame(draw); }
      }
      else { stop(); element.dataset.canvas = 'false'; }
    };
    const resize = () => {
      const rect = element.getBoundingClientRect();
      width = rect.width; height = rect.height; box = { left: rect.left, top: rect.top + scrollY };
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      surface.width = Math.round(width * ratio); surface.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      points = nodes.map(([x, y]) => [x * width, y * height]);
      schedule();
    };
    const move = (event: PointerEvent) => { if (event.pointerType === 'mouse') pointer = { x: event.clientX - box.left, y: event.clientY + scrollY - box.top }; };
    const leave = () => { pointer = { x: -1000, y: -1000 }; };
    const observer = new ResizeObserver(resize); observer.observe(element); resize();
    const release = observeSignalSurface(element, value => { active = value; schedule(); });
    fine.addEventListener('change', schedule);
    hero.addEventListener('pointermove', move, { passive: true });
    hero.addEventListener('pointerleave', leave);
    return () => { stop(); observer.disconnect(); release(); fine.removeEventListener('change', schedule); hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', leave); };
  }, []);
  return <div className="neural-constellation" ref={root} aria-hidden="true">
    <svg className="constellation-static" viewBox="0 0 1000 700" preserveAspectRatio="none">{edges.map(([a,b], i) => <path key={i} d={`M${nodes[a][0] * 1000} ${nodes[a][1] * 700} L${nodes[b][0] * 1000} ${nodes[b][1] * 700}`} className={i % 3 === 0 ? 'secondary' : ''}/>)}{nodes.map(([x,y],i) => <circle key={i} cx={x * 1000} cy={y * 700} r="2"/>)}</svg>
    <canvas ref={canvas}/>
    <span className="constellation-coordinate coordinate-top">NEURAL CONSTELLATION / 01</span><span className="constellation-coordinate coordinate-bottom">CONTEXT → REASONING → ACTION</span>
  </div>;
}
