import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, Check, Copy, Github, Linkedin, Menu, Phone, X } from 'lucide-react';
import ArchitectureLab from './ArchitectureLab';
import Writing, { medium } from './Writing';
import { Expertise, CareerTimeline } from './Expertise';
import { Cursor, MagneticLink, useSectionReveals } from './Interactions';
import { projects, type Project } from './data';
import portrait from './assets/profile.webp';
import portraitSmall from './assets/profile-small.webp';

const ProjectArchitecture = lazy(() => import('./ProjectArchitecture'));

function SectionLabel({ number, title, aside }: { number: string; title: string; aside: string }) {
  return <div className="section-kicker"><span>{number} / {title}</span><span className="rule"/><span>{aside}</span></div>;
}

function Hero() {
  const photo = useRef<HTMLElement>(null);
  const reset = () => {
    photo.current?.style.setProperty('--photo-x', '0deg');
    photo.current?.style.setProperty('--photo-y', '0deg');
  };
  return <section id="hero" className="hero" aria-labelledby="hero-title">
    <div className="hero-grid" aria-hidden="true"/>
    <div className="hero-layout wrap">
      <div className="hero-content">
        <div className="eyebrow"><span className="live-dot"/> AI SYSTEMS / HUMAN INTENT <span className="eyebrow-line"/></div>
        <p className="hero-intro">Hi, I’m Sahana.</p>
        <h1 id="hero-title" aria-label="Engineering Intelligence. Building What Comes Next."><span className="hero-line"><span>Engineering</span></span><span className="hero-line"><span>Intelligence<span className="accent">.</span></span></span><span className="hero-line hero-muted"><span>Building What</span></span><span className="hero-line hero-muted"><span>Comes Next<span className="accent">.</span></span></span></h1>
        <p className="hero-subtitle">Senior AI/ML Engineer <span>|</span> Generative AI <span>|</span> Agentic AI <span>|</span> Enterprise AI Architecture</p>
        <p className="hero-copy">12+ years of experience building software, machine learning platforms, and production-ready AI systems across complex enterprise environments.</p>
        <div className="hero-actions"><MagneticLink className="button button-primary" href="#work">Explore Projects <ArrowDown size={17}/></MagneticLink><a className="button button-ghost" href="#contact">Connect With Me <ArrowUpRight size={17}/></a></div>
        <div className="hero-socials"><span>ELSEWHERE</span><a href="https://github.com/Srisahana1" target="_blank" rel="noreferrer" aria-label="Sahana on GitHub"><Github size={16}/></a><a href="https://www.linkedin.com/in/sahana-s-k-7308a1330/" target="_blank" rel="noreferrer" aria-label="Sahana on LinkedIn"><Linkedin size={16}/></a><a href={medium} target="_blank" rel="noreferrer" aria-label="Sahana on Medium"><BookOpen size={16}/><span>Medium</span><ArrowUpRight size={12}/></a></div>
      </div>
      <figure className="hero-portrait" ref={photo} onPointerMove={event => {
        if (event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--photo-x', `${((event.clientY - rect.top) / rect.height - .5) * -3}deg`);
        event.currentTarget.style.setProperty('--photo-y', `${((event.clientX - rect.left) / rect.width - .5) * 3}deg`);
      }} onPointerLeave={reset}>
        <div className="portrait-topline"><span>THE HUMAN BEHIND THE SYSTEMS</span><span>↗</span></div>
        <div className="portrait-image"><img src={portrait} srcSet={`${portraitSmall} 480w, ${portrait} 900w`} sizes="(max-width: 620px) 87vw, (max-width: 1000px) 42vw, 430px" width="900" height="1123" fetchPriority="high" alt="Sahana, AI/ML engineer, wearing a black blazer and smiling"/><span className="portrait-corner corner-top"/><span className="portrait-corner corner-bottom"/></div>
        <figcaption><div><strong>Sahana</strong><span>AI / ML ENGINEER</span></div><a href="#about" className="portrait-about" aria-label="More about Sahana"><ArrowDown size={18}/></a></figcaption>
        <div className="portrait-sticker"><span className="live-dot"/><span>HUMAN CURIOSITY.<br/><strong>ENGINEERED INTELLIGENCE.</strong></span></div>
      </figure>
    </div>
    <div className="hero-bottom wrap"><a href="#about">A LITTLE MORE ABOUT ME <ArrowDown size={12}/></a><span>GENERATIVE AI &nbsp;/&nbsp; AGENTIC AI &nbsp;/&nbsp; MLOPS</span></div>
  </section>;
}

function ProjectCard({ project, index, open }: { project: Project; index: number; open: () => void }) {
  return <article className={`project-card card-${index}`} onPointerMove={event => {
    if (event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--px', `${(event.clientX - box.left) / box.width * 100}%`);
    event.currentTarget.style.setProperty('--py', `${(event.clientY - box.top) / box.height * 100}%`);
  }}>
    <div className="card-meta"><span>0{index + 1} / {project.category}</span><span>PUBLIC PROJECT ↗</span></div>
    <button className="card-open" data-cursor="view" onClick={open} aria-label={`Explore ${project.title}`} aria-haspopup="dialog">
      <div className={`project-art art-${index}`} aria-hidden="true"><div className="art-grid"/><div className="art-line line-a"/><div className="art-line line-b"/>
        <div className="art-box box-a">{['DOC', 'MCP', 'THINK', 'INPUT'][index]}</div><div className="art-box box-b">{['RANK', 'TOOLS', 'ACT', 'ROUTE'][index]}</div><div className="art-box box-c">{['ANSWER', 'DATA', 'OBSERVE', 'OUTPUT'][index]}</div><span className="art-mark">✳</span>
      </div>
      <div className="card-copy"><div><h3>{project.title}</h3><p>{project.summary}</p></div><span className="card-arrow"><ArrowUpRight size={21}/></span></div>
      <span className="card-explore">View Details <span>+</span></span>
    </button>
    <div className="card-footer"><div className="tags">{project.stack.slice(0, 4).map(item => <span key={item}>{item}</span>)}</div><a href={project.url} target="_blank" rel="noreferrer" aria-label={`View ${project.title} on GitHub`}><Github size={14}/><span>Source</span><ArrowUpRight size={12}/></a></div>
  </article>;
}

function ProjectDialog({ index, close }: { index: number | null; close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (index !== null) {
      returnFocus.current = document.activeElement as HTMLElement;
      element.showModal();
      const overflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        element.close();
        document.body.style.overflow = overflow;
        returnFocus.current?.focus({ preventScroll: true });
      };
    }
  }, [index]);
  const project = index !== null ? projects[index] : null;
  return <dialog ref={dialog} className="dialog" aria-labelledby="project-title" onCancel={close} onClick={event => {
    if (event.target !== event.currentTarget) return;
    const box = event.currentTarget.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close();
  }}>
    {project && index !== null && <><div className="dialog-toolbar"><span>PROJECT NOTES / 0{index + 1}</span><button className="dialog-close" onClick={close} aria-label="Close project details" autoFocus><X size={20}/></button></div><div className="dialog-content"><div className="overline">{project.category}</div><h2 id="project-title">{project.title}</h2><p className="dialog-lead">{project.overview}</p><Suspense fallback={<div className="architecture-loading" role="status">Preparing the architecture walkthrough?</div>}><ProjectArchitecture key={index} index={index}/></Suspense><div className="detail-grid"><div><h3>THE PROBLEM</h3><p>{project.problem}</p></div><div><h3>ENGINEERING DECISIONS</h3><p>{project.decisions}</p></div><div><h3>TESTING & VALIDATION</h3><p>{project.testing}</p></div><div><h3>TECHNICAL STACK</h3><div className="tags">{project.stack.map(item => <span key={item}>{item}</span>)}</div></div></div><a className="button button-primary" href={project.url} target="_blank" rel="noreferrer">View source on GitHub <ArrowUpRight size={17}/></a></div></>}
  </dialog>;
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText('Sahanak9403@gmail.com');
      setCopied(true); setCopyError(false);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2500);
    } catch { setCopyError(true); }
  };
  return <section className="contact section" id="contact"><div className="wrap">
    <SectionLabel number="05" title="LET’S CONNECT" aside="BUILD SOMETHING MEANINGFUL"/>
    <div className="contact-main reveal"><div><div className="overline">GOOD SYSTEMS START WITH A CONVERSATION</div><h2>Have a complex<br/><span>problem in mind?</span></h2><p>Let’s talk about what we could build.</p></div><MagneticLink className="round-arrow" href="mailto:Sahanak9403@gmail.com" aria-label="Send email"><ArrowUpRight size={32}/></MagneticLink></div>
    <div className="email-line"><a href="mailto:Sahanak9403@gmail.com">Sahanak9403@gmail.com <ArrowUpRight size={20}/></a><button onClick={copy} aria-label={copied ? 'Email copied' : 'Copy email address'}>{copied ? <Check size={17}/> : <Copy size={17}/>}<span aria-live="polite">{copied ? 'Copied!' : 'Copy email'}</span></button></div>
    {copyError && <p className="copy-error" role="status">Select the email address above to copy it, or open your email app.</p>}
    <div className="contact-links"><a href="https://github.com/Srisahana1" target="_blank" rel="noreferrer"><Github size={19}/><span><small>VIEW GITHUB</small>Public repositories</span><ArrowUpRight size={16}/></a><a href="https://www.linkedin.com/in/sahana-s-k-7308a1330/" target="_blank" rel="noreferrer"><Linkedin size={19}/><span><small>CONNECT ON LINKEDIN</small>Let’s connect</span><ArrowUpRight size={16}/></a><a href={medium} target="_blank" rel="noreferrer"><BookOpen size={19}/><span><small>READ ON MEDIUM</small>@ssahana1703</span><ArrowUpRight size={16}/></a><a href="tel:+19096194929"><Phone size={19}/><span><small>CALL</small>+1 (909) 619-4929</span><ArrowUpRight size={16}/></a></div>
    <footer><a className="brand" href="#hero"><span className="brand-symbol">✳</span> SAHANA <i>/</i> AI SYSTEMS</a><span>CURIOUS MIND. PURPOSEFUL ENGINEERING.</span><a href="#hero">BACK TO TOP <ArrowUpRight size={13}/></a></footer>
  </div></section>;
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('hero');
  const [project, setProject] = useState<number | null>(null);
  const [filter, setFilter] = useState('All projects');
  const progress = useRef<HTMLDivElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useSectionReveals();
  useEffect(() => {
    const scroll = () => {
      if (progress.current) {
        const max = document.documentElement.scrollHeight - innerHeight;
        progress.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      }
    };
    window.addEventListener('scroll', scroll, { passive: true }); scroll();
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    }), { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('section[id]').forEach(element => observer.observe(element));
    return () => { window.removeEventListener('scroll', scroll); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (!menu) return;
    const key = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenu(false); toggle.current?.focus(); } };
    const outside = (event: PointerEvent) => {
      if (!navigation.current?.contains(event.target as Node) && !toggle.current?.contains(event.target as Node)) setMenu(false);
    };
    document.addEventListener('keydown', key);
    document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', key); document.removeEventListener('pointerdown', outside); };
  }, [menu]);
  const visibleProjects = projects.map((item, index) => ({ item, index })).filter(({ index }) => filter === 'All projects' || (filter === 'RAG' && index === 0) || (filter === 'Agents' && index > 1) || (filter === 'MCP' && index === 1));
  return <><a className="skip-link" href="#main">Skip to content</a><Cursor/>
    <header className="header"><a className="brand" href="#hero" aria-label="Sahana home"><span className="brand-symbol">✳</span><span>SAHANA <i>/</i> AI SYSTEMS<small>ENGINEERED FOR IMPACT</small></span></a>
      <nav ref={navigation} id="main-navigation" className={menu ? 'open' : ''} aria-label="Main navigation">{[['about', 'About'], ['work', 'Projects'], ['lab', 'Architecture'], ['writing', 'Writing'], ['contact', 'Contact']].map(([id, label]) => <a key={id} className={active === id ? 'active' : ''} aria-current={active === id ? 'location' : undefined} href={`#${id}`} onClick={() => setMenu(false)}>{label}</a>)}<MagneticLink className="nav-cta" href="mailto:Sahanak9403@gmail.com">LET’S TALK <ArrowUpRight size={15}/></MagneticLink></nav>
      <button ref={toggle} className="menu-toggle" aria-controls="main-navigation" aria-expanded={menu} aria-label={menu ? 'Close navigation' : 'Open navigation'} onClick={event => {
        setMenu(value => !value);
        if (!menu && event.detail === 0) requestAnimationFrame(() => navigation.current?.querySelector<HTMLAnchorElement>('a')?.focus());
      }}>{menu ? <X/> : <Menu/>}</button><div className="progress" ref={progress} aria-hidden="true"/>
    </header>
    <main id="main"><Hero/>
      <section className="about wrap section" id="about"><SectionLabel number="01" title="THE ENGINEER" aside="CURIOSITY MEETS PRECISION"/>
        <div className="about-grid reveal"><div><div className="overline">THINK BEYOND THE MODEL</div><h2>Intelligence is<br/><span>only the beginning.</span></h2></div><div className="about-copy"><p className="lead">Building AI that works means engineering everything around it.</p><p>I focus on the connection between intelligent models and the systems that make them useful: grounded context, thoughtful orchestration, production infrastructure, and responsible delivery.</p><a className="inline-link" href="#lab">Explore the architecture <ArrowRight size={16}/></a></div></div>
        <Expertise/>
        <CareerTimeline/>
      </section>
      <section className="work section" id="work"><div className="wrap"><SectionLabel number="02" title="SELECTED PROJECTS" aside="PUBLIC GITHUB REPOSITORIES"/>
        <div className="section-heading reveal"><div><div className="overline">BUILT TO EXPLORE</div><h2>Ideas, engineered<br/><span>into systems.</span></h2></div><p>Four public projects exploring retrieval, agent workflows, and the interfaces that connect intelligence to useful tools.</p></div>
        <div className="project-filter" role="group" aria-label="Filter projects">{['All projects', 'RAG', 'Agents', 'MCP'].map(item => <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === 'All projects' && <span>04</span>}</button>)}<span className="filter-count" role="status">{visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'}</span></div>
        <div className="project-grid" key={filter}>{visibleProjects.map(({ item, index }, order) => <div className="project-entry" style={{ '--entry': order } as CSSProperties} key={item.title}><ProjectCard project={item} index={index} open={() => setProject(index)}/></div>)}</div>
      </div></section>
      <section className="lab section" id="lab"><div className="wrap"><SectionLabel number="03" title="ARCHITECTURE LAB" aside="AN INTERACTIVE LOOK INSIDE"/>
        <div className="section-heading reveal"><div><div className="overline">COMPLEXITY, MADE VISIBLE</div><h2>Inside the <span>system.</span></h2></div><p>Explore illustrative patterns, one decision at a time. Follow the flow, select a node, and see why each stage matters.</p></div><ArchitectureLab/>
      </div></section>
      <Writing/>
      <Contact/>
    </main>
    <ProjectDialog index={project} close={() => setProject(null)}/>
  </>;
}
