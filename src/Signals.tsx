import { useEffect, useRef, type CSSProperties, type RefObject } from 'react';

const activeSignals = new WeakMap<HTMLElement, Animation[]>();
function stopSignals(element: HTMLElement) {
  activeSignals.get(element)?.forEach(animation => animation.cancel());
  activeSignals.delete(element);
}

// Discrete input events replay bounded signals without remounts or pointer-driven state.
export function pulseConnections(element: HTMLElement, node?: string) {
  if (document.hidden || matchMedia('(prefers-reduced-motion: reduce)').matches || element.dataset.motion !== 'true') return;
  stopSignals(element);
  const animations: Animation[] = [];
  element.querySelectorAll<SVGPathElement>('.signal-pulse').forEach(path => {
    const connection = path.closest('g');
    if (node && connection?.dataset.nodes && !connection.dataset.nodes.split(',').includes(node)) return;
    if (!path.animate) return;
    animations.push(path.animate([
      { strokeDashoffset: '9', opacity: 0, offset: 0 },
      { opacity: .95, offset: .12 },
      { opacity: .95, offset: .8 },
      { strokeDashoffset: '-100', opacity: 0, offset: 1 },
    ], { duration: 1000, delay: animations.length * 100, easing: 'cubic-bezier(.2,.7,.2,1)' }));
  });
  activeSignals.set(element, animations);
}

// One visibility contract for finite SVG signals and the hero's single Canvas loop.
export function observeSignalSurface(element: HTMLElement, changed?: (active: boolean) => void) {
  if (!('IntersectionObserver' in window)) {
    element.dataset.motion = 'false'; changed?.(false);
    return () => {};
  }
  const motion = matchMedia('(prefers-reduced-motion: no-preference)');
  let visible = false, wasActive = false;
  const update = () => {
    const active = visible && !document.hidden && motion.matches;
    element.dataset.inview = String(visible);
    element.dataset.motion = String(active);
    if (active && !wasActive) pulseConnections(element);
    if (!active) stopSignals(element);
    wasActive = active;
    changed?.(active);
  };
  const host = element.closest<HTMLElement>('.project-card') ?? element;
  const activate = (event: Event) => {
    const target = event.target as Element;
    const node = target.closest<HTMLElement>('[data-signal-node]');
    if (event.type === 'pointerover') {
      const related = (event as PointerEvent).relatedTarget;
      if (!node || (related instanceof Node && node.contains(related))) return;
    }
    pulseConnections(element, node?.dataset.signalNode);
  };
  for (const type of ['pointerenter', 'pointerover', 'pointerdown', 'focusin']) host.addEventListener(type, activate, { passive: true });
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRatio > 0;
    update();
  }, { threshold: [0, .01], rootMargin: '-80px 0px 0px 0px' });
  observer.observe(element);
  motion.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
  update();
  return () => {
    observer.disconnect();
    motion.removeEventListener('change', update);
    document.removeEventListener('visibilitychange', update);
    for (const type of ['pointerenter', 'pointerover', 'pointerdown', 'focusin']) host.removeEventListener(type, activate);
    stopSignals(element);
  };
}

export function useSignalSurface<T extends HTMLElement>(supplied?: RefObject<T>) {
  const local = useRef<T>(null);
  const ref = supplied ?? local;
  useEffect(() => {
    const element = ref.current;
    if (element) return observeSignalSurface(element);
  }, [ref]);
  return ref;
}

export function SignalConnection({ d, className = '', order = 0, nodes }: { d: string; className?: string; order?: number; nodes?: [number, number] }) {
  return <g className={`signal-connection ${className}`} data-nodes={nodes?.join(',')} style={{ '--signal-order': order } as CSSProperties}>
    <path className="signal-track" d={d} pathLength="100"/>
    <path className="signal-pulse" d={d} pathLength="100"/>
  </g>;
}

export function SignalNode({ className = '', active = false }: { className?: string; active?: boolean }) {
  return <span className={`signal-node-shell ${className}`} data-selected={active} aria-hidden="true"><span className="signal-node-core"/></span>;
}

export function SectionSignal() {
  const ref = useSignalSurface<HTMLSpanElement>();
  return <span className="section-signal" ref={ref} aria-hidden="true"><svg viewBox="0 0 180 20" preserveAspectRatio="xMidYMid meet"><SignalConnection d="M8 10 H52 C69 10 70 3 90 3 S111 10 128 10 H172"/><circle cx="8" cy="10" r="2.5"/><circle cx="90" cy="3" r="2"/><circle cx="172" cy="10" r="2.5"/></svg></span>;
}

export function LiquidMark() {
  return <svg className="liquid-mark" width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M7 23C-1 13 8 2 16 7S33 20 25 26 7 23 9 15 23 8 24 16" stroke="currentColor" strokeWidth="1.2"/><path d="m24 12 4 4-4 4-4-4 4-4Z" className="liquid-mark-signal"/></svg>;
}
