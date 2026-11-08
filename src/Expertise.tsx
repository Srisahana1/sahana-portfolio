import { useRef, useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { roles } from './data';

const capabilities = [
  { name: 'Intelligent systems', code: '01 / AI', title: 'Context. Reasoning. Evaluation.', description: 'Connecting language models to knowledge, tools, and clear evaluation criteria.', skills: ['Generative AI', 'Agentic AI', 'MCP', 'RAG', 'LLM Evaluation'] },
  { name: 'Engineering', code: '02 / SOFTWARE', title: 'The interfaces around intelligence.', description: 'Building the services and orchestration that give intelligent workflows structure.', skills: ['Python', 'FastAPI', 'LangGraph', 'LangChain'] },
  { name: 'Models & data', code: '03 / ML', title: 'From raw signals to useful models.', description: 'Working across learning methods, features, and the data foundations behind them.', skills: ['Machine Learning', 'Deep Learning', 'Data Engineering'] },
  { name: 'Platforms & governance', code: '04 / PLATFORM', title: 'Built for a production environment.', description: 'Bringing infrastructure, delivery, security, and operations into the design.', skills: ['MLOps', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Security and Governance'] },
];

export function Expertise() {
  const [selected, setSelected] = useState(0);
  const capability = capabilities[selected];
  return <div className="expertise reveal">
    <div className="expertise-title"><span>TECHNICAL EXPERTISE</span><span>EXPLORING THE WHOLE SYSTEM ↗</span></div>
    <div className="capability-layout"><div className="capability-tabs" role="tablist" aria-label="Expertise categories" aria-orientation="vertical">
      {capabilities.map((item, index) => <button role="tab" id={`expertise-tab-${index}`} aria-controls="expertise-panel" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} key={item.code} onClick={() => setSelected(index)} onKeyDown={event => {
        let next = index;
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % capabilities.length;
        else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index + capabilities.length - 1) % capabilities.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = capabilities.length - 1;
        else return;
        event.preventDefault(); setSelected(next); document.getElementById(`expertise-tab-${next}`)?.focus();
      }}><span>{item.name}</span><ArrowUpRight size={15}/></button>)}
    </div><div className="capability-panel" id="expertise-panel" role="tabpanel" tabIndex={0} aria-labelledby={`expertise-tab-${selected}`}><div key={capability.code} className="capability-content"><div className="overline">{capability.code}</div><h3>{capability.title}</h3><p>{capability.description}</p><div className="chips">{capability.skills.map(skill => <span className="chip" key={skill}>{skill}</span>)}</div></div></div></div>
  </div>;
}

export function CareerTimeline() {
  const root = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const items = root.current?.querySelectorAll('li');
    if (!items || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('timeline-active'); observer.unobserve(entry.target); }
    }), { threshold: .65, rootMargin: '0px 0px -8% 0px' });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return <div className="experience"><div className="experience-intro"><div className="overline">CAREER PROGRESSION</div><h3>Software roots.<br/><span>Intelligent systems.</span></h3><p className="experience-note">12+ years across software,<br/>machine learning, and AI.</p></div><ol className="career-timeline" ref={root} aria-label="Anonymized career experience, most recent first">{roles.map((role, index) => <li key={role}><span className="timeline-point" aria-hidden="true"/><span className="timeline-number">0{index + 1}</span><h3>{role}</h3>{index === 0 && <span className="timeline-specialty">AI SYSTEMS</span>}</li>)}</ol></div>;
}
