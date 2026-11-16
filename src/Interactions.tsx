import { useEffect, useRef, useState, type PropsWithChildren, type HTMLAttributes, type AnchorHTMLAttributes, type RefObject, type PointerEvent as ReactPointerEvent } from 'react';

// Batch decorative card updates into one paint; pointer movement never changes React state.
export function useProjectHighlight() {
  const frame = useRef(0);
  const bounds = useRef<DOMRect | null>(null);
  const point = useRef({ x: 0, y: 0 });
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  const reset = (event: ReactPointerEvent<HTMLElement>) => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    bounds.current = null;
    for (const key of ['--tilt-x', '--tilt-y', '--px', '--py']) event.currentTarget.style.removeProperty(key);
  };
  return {
    onPointerEnter: (event: ReactPointerEvent<HTMLElement>) => { bounds.current = event.currentTarget.getBoundingClientRect(); },
    onPointerMove: (event: ReactPointerEvent<HTMLElement>) => {
      if (event.pointerType !== 'mouse' || !matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)').matches) return;
      const element = event.currentTarget;
      point.current = { x: event.clientX, y: event.clientY };
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        const box = bounds.current;
        if (!box) return;
        const x = Math.max(0, Math.min(1, (point.current.x - box.left) / box.width));
        const y = Math.max(0, Math.min(1, (point.current.y - box.top) / box.height));
        element.style.setProperty('--px', `${x * 100}%`);
        element.style.setProperty('--py', `${y * 100}%`);
        element.style.setProperty('--tilt-x', `${(.5 - y) * 1.2}deg`);
        element.style.setProperty('--tilt-y', `${(x - .5) * 1.2}deg`);
      });
    },
    onPointerLeave: reset,
    onPointerCancel: reset,
  };
}

export function centerFlowNode(rail: HTMLElement, node: HTMLElement) {
  const railBox = rail.getBoundingClientRect();
  const nodeBox = node.getBoundingClientRect();
  const left = nodeBox.left - railBox.left + rail.scrollLeft - (rail.clientWidth - node.clientWidth) / 2;
  rail.scrollTo({ left, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}

export function useFlowPlayback(steps: number, root: RefObject<HTMLElement>) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= .1), {
      threshold: [0, .1], rootMargin: `-${headerHeight}px 0px 0px 0px`,
    });
    observer.observe(element);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, [root]);
  useEffect(() => {
    if (!playing || !visible || !pageVisible) return;
    const timer = window.setInterval(() => setStep(value => (value + 1) % steps), 1800);
    return () => window.clearInterval(timer);
  }, [playing, visible, pageVisible, steps]);
  const select = (index: number) => { setStep((index + steps) % steps); setPlaying(false); };
  return { step, playing, animating: playing && visible && pageVisible, select, toggle: () => setPlaying(value => !value) };
}

export function MagneticLink({ children, className = '', ...props }: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) {
  const element = useRef<HTMLAnchorElement>(null);
  const reset = () => {
    element.current?.style.setProperty('--magnetic-x', '0px');
    element.current?.style.setProperty('--magnetic-y', '0px');
  };
  return <a {...props} ref={element} className={`magnetic ${className}`}
    onPointerMove={event => {
      if (event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const box = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty('--magnetic-x', `${(event.clientX - box.left - box.width / 2) * .055}px`);
      event.currentTarget.style.setProperty('--magnetic-y', `${(event.clientY - box.top - box.height / 2) * .08}px`);
    }} onPointerLeave={reset} onBlur={reset}>{children}</a>;
}

// Native touch scrolling stays in control. Pointer capture is only used for mouse dragging.
export function SwipeRail({ children, className = '', ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef({ x: 0, scroll: 0, down: false, moved: false });
  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const update = () => { element.dataset.cursor = element.scrollWidth > element.clientWidth + 1 ? 'drag' : 'default'; };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => { observer.disconnect(); document.documentElement.classList.remove('drag-active'); };
  }, []);
  return <div role="group" {...props} ref={rail} className={`swipe-rail ${className}`}
    onPointerDown={event => {
      drag.current.moved = false;
      if (event.pointerType !== 'mouse' || event.button !== 0 || event.currentTarget.scrollWidth <= event.currentTarget.clientWidth) return;
      drag.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft, down: true, moved: false };
    }}
    onPointerMove={event => {
      if (!drag.current.down || event.pointerType !== 'mouse') return;
      const delta = event.clientX - drag.current.x;
      if (Math.abs(delta) > 6) {
        drag.current.moved = true;
        event.currentTarget.classList.add('dragging');
        document.documentElement.classList.add('drag-active');
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.scrollLeft = drag.current.scroll - delta;
      }
    }}
    onPointerUp={event => {
      drag.current.down = false;
      event.currentTarget.classList.remove('dragging');
      document.documentElement.classList.remove('drag-active');
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    }}
    onPointerLeave={() => {
      if (!drag.current.moved) drag.current.down = false;
    }}
    onPointerCancel={() => { drag.current.down = false; rail.current?.classList.remove('dragging'); document.documentElement.classList.remove('drag-active'); }}
    onClickCapture={event => {
      if (drag.current.moved) { event.preventDefault(); event.stopPropagation(); drag.current.moved = false; }
    }}>{children}</div>;
}

export function Cursor() {
  const core = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const enabled = matchMedia('(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
    let x = 0, y = 0, rx = 0, ry = 0, frame = 0;
    let visible = false;
    const hide = () => {
      visible = false;
      cancelAnimationFrame(frame); frame = 0;
      core.current?.classList.remove('visible'); ring.current?.classList.remove('visible');
    };
    const preference = () => { document.documentElement.classList.toggle('has-cursor', enabled.matches); hide(); };
    const tick = () => {
      rx += (x - rx) * .65;
      ry += (y - ry) * .65;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      if (Math.abs(x - rx) + Math.abs(y - ry) > .1) frame = requestAnimationFrame(tick);
      else frame = 0;
    };
    const move = (event: PointerEvent) => {
      if (!enabled.matches || event.pointerType !== 'mouse') { hide(); return; }
      const target = event.target as HTMLElement;
      // Native dialogs occupy the browser's top layer, above decorative page cursors.
      if (target.closest('dialog')) { hide(); return; }
      const text = target.closest('p,h1,h2,h3,h4,input,textarea,[contenteditable]');
      const interactive = target.closest('a,button,summary');
      if (text && !interactive) { hide(); return; }
      x = event.clientX; y = event.clientY;
      if (!visible) { rx = x; ry = y; visible = true; }
      const state = (target.closest('[data-cursor]') as HTMLElement | null)?.dataset.cursor
        || (target.closest('a[target="_blank"]') ? 'open' : interactive ? 'link' : 'default');
      for (const element of [core.current, ring.current]) {
        if (!element) continue;
        element.dataset.state = state;
        element.classList.add('visible');
      }
      if (core.current) core.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    preference();
    enabled.addEventListener('change', preference);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    return () => {
      cancelAnimationFrame(frame);
      enabled.removeEventListener('change', preference);
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
    };
  }, []);
  return <><div ref={ring} className="cursor-ring" aria-hidden="true"/><div ref={core} className="cursor-core" aria-hidden="true"><span className="signal-cursor-diamond"/><b className="cursor-label view">VIEW</b><b className="cursor-label explore">EXPLORE</b><b className="cursor-label open">OPEN</b><b className="cursor-label drag">↔ DRAG</b></div></>;
}

export function useSectionReveals() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove('reveal-pending'); observer.unobserve(entry.target); }
    }), { threshold: .08, rootMargin: '0px 0px 30px 0px' });
    elements.forEach(element => {
      if (element.getBoundingClientRect().top > innerHeight) element.classList.add('reveal-pending');
      observer.observe(element);
    });
    return () => { observer.disconnect(); elements.forEach(element => element.classList.remove('reveal-pending')); };
  }, []);
}
