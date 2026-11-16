import { useEffect, useRef, type CSSProperties, type RefObject } from 'react';

// One visibility contract for finite SVG signals and the hero's single Canvas loop.
export function observeSignalSurface(element: HTMLElement, changed?: (active: boolean) => void) {
  if (!('IntersectionObserver' in window)) {
    element.dataset.motion = 'false'; changed?.(false);
    return () => {};
  }
  const motion = matchMedia('(prefers-reduced-motion: no-preference)');
  let visible = false;
  const update = () => {
    const active = visible && !document.hidden && motion.matches;
    element.dataset.inview = String(visible);
    element.dataset.motion = String(active);
    changed?.(active);
  };
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

export function SignalConnection({ d, className = '', order = 0 }: { d: string; className?: string; order?: number }) {
  return <g className={`signal-connection ${className}`} style={{ '--signal-order': order } as CSSProperties}>
    <path className="signal-track" d={d} pathLength="100"/>
    <path className="signal-pulse" d={d} pathLength="100"/>
  </g>;
}

export function SignalNode({ className = '', active = false }: { className?: string; active?: boolean }) {
  return <span className={`signal-node-shell ${className}`} data-selected={active} aria-hidden="true"><span className="signal-node-core"/></span>;
}

export function SectionSignal() {
  const ref = useSignalSurface<HTMLSpanElement>();
  return <span className="section-signal" ref={ref} aria-hidden="true"><svg viewBox="0 0 180 20" preserveAspectRatio="xMidYMid meet"><SignalConnection d="M8 10 H63 L73 3 H108 L118 10 H172"/><circle cx="8" cy="10" r="2.5"/><circle cx="90" cy="3" r="2"/><circle cx="172" cy="10" r="2.5"/></svg></span>;
}
