import { useRef, useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { roles } from './data';

const capabilities = [
  { name: 'Intelligent systems', code: '01 / AI', title: 'Context. Reasoning. Evaluation.', description: 'Connecting language models to knowledge, tools, and clear evaluation criteria.', skills: ['Generative AI', 'Agentic AI', 'MCP', 'RAG', 'LLM Evaluation'] },
  { name: 'Engineering', code: '02 / SOFTWARE', title: 'The interfaces around intelligence.', description: 'Building the services and orchestration that give intelligent workflows structure.', skills: ['Python', 'FastAPI', 'LangGraph', 'LangChain'] },
  { name: 'Models & data', code: '03 / ML', title: 'From raw signals to useful models.', description: 'Working across learning methods, features, and the data foundations behind them.', skills: ['Machine Learning', 'Deep Learning', 'Data Engineering'] },
  { name: 'Platforms & governance', code: '04 / PLATFORM', title: 'Built for a production environment.', description: 'Bringing infrastructure, delivery, security, and operations into the design.', skills: ['MLOps', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Security and Governance'] },
];

const skillNotes: Record<string, string> = {
  'Generative AI': 'Shape model inputs, grounded context, and outputs around a useful task.',
  'Agentic AI': 'Give reasoning workflows explicit state, available tools, and stopping conditions.',
  MCP: 'Expose tools through a standard interface that compatible AI clients can discover.',
  RAG: 'Retrieve relevant source material before generating an answer.',
  'LLM Evaluation': 'Check answer quality, grounding, and failure cases against clear criteria.',
  Python: 'Connect data processing, model workflows, and application services.',
  FastAPI: 'Expose typed Python services through documented HTTP interfaces.',
  LangGraph: 'Represent agent workflows with state, nodes, and explicit transitions.',
  LangChain: 'Compose model, retrieval, and tool integrations into application workflows.',
  'Machine Learning': 'Learn useful patterns from data and evaluate them on unseen examples.',
  'Deep Learning': 'Work with neural models for complex representations and prediction tasks.',
  'Data Engineering': 'Build dependable data flows for training, retrieval, and serving.',
  MLOps: 'Connect experimentation, versioning, deployment, and monitoring.',
  AWS: 'Use cloud infrastructure to support data and model workloads.',
  Azure: 'Connect AI services with cloud delivery and operational controls.',
  GCP: 'Support data processing and model workflows with managed cloud services.',
  Docker: 'Package services and dependencies into reproducible containers.',
  Kubernetes: 'Coordinate container deployment, scaling, and service operation.',
  Terraform: 'Describe infrastructure as versioned, reviewable configuration.',
  'Security and Governance': 'Bring access boundaries, traceability, and responsible delivery into the design.',
};

export function Expertise() {
  const [selected, setSelected] = useState(0);
  const [skill, setSkill] = useState<string | null>(null);
  const capability = capabilities[selected];
  const selectCategory = (index: number) => { setSelected(index); setSkill(null); };
  return <div className="expertise reveal">
    <div className="expertise-title"><span>TECHNICAL EXPERTISE</span><span>EXPLORING THE WHOLE SYSTEM ↗</span></div>
    <div className="capability-layout"><div className="capability-tabs" role="tablist" aria-label="Expertise categories" aria-orientation="vertical">
      {capabilities.map((item, index) => <button role="tab" id={`expertise-tab-${index}`} aria-controls="expertise-panel" aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} key={item.code} onClick={() => selectCategory(index)} onKeyDown={event => {
        let next = index;
        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % capabilities.length;
        else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index + capabilities.length - 1) % capabilities.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = capabilities.length - 1;
        else return;
        event.preventDefault(); selectCategory(next); document.getElementById(`expertise-tab-${next}`)?.focus();
      }}><span>{item.name}</span><ArrowUpRight size={15}/></button>)}
    </div><div className="capability-panel" id="expertise-panel" role="tabpanel" tabIndex={0} aria-labelledby={`expertise-tab-${selected}`}><div key={capability.code} className="capability-content"><div className="overline">{capability.code}</div><h3>{capability.title}</h3><p>{capability.description}</p><div className="chips" role="group" aria-label="Explore these technologies">{capability.skills.map(item => <button className="chip" key={item} aria-pressed={skill === item} aria-controls="skill-note" onClick={() => setSkill(value => value === item ? null : item)}>{item}</button>)}</div><p id="skill-note" className="skill-note" aria-live="polite">{skill ? <><strong>{skill}</strong> — {skillNotes[skill]}</> : 'Select a technology to explore its role in the system.'}</p></div></div></div>
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
