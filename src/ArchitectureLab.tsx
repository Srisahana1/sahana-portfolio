import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import { labs } from './data';
import { SwipeRail, useFlowPlayback, centerFlowNode } from './Interactions';

export default function ArchitectureLab() {
  const [lab, setLab] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const flow = labs[lab];
  const { step: stage, playing, animating, select, toggle } = useFlowPlayback(flow.nodes.length, panel);
  useEffect(() => {
    const rail = panel.current?.querySelector<HTMLElement>('.lab-nodes');
    const selected = rail?.querySelector<HTMLElement>('.selected');
    if (!rail || !selected) return;
    centerFlowNode(rail, selected);
  }, [stage, lab]);
  const chooseLab = (index: number) => { setLab(index); select(0); };
  const step = (direction: number) => select(stage + direction);
  return <div className="lab-shell reveal" ref={panel} data-playing={animating}>
    <div className="lab-tabs" role="tablist" aria-label="Architecture type">
      {labs.map((item, index) => <button key={item.name} role="tab" id={`lab-tab-${index}`} aria-controls="lab-panel" tabIndex={lab === index ? 0 : -1} aria-selected={lab === index}
        onClick={() => chooseLab(index)} onKeyDown={event => {
          let next = index;
          if (event.key === 'ArrowRight') next = (index + 1) % labs.length;
          else if (event.key === 'ArrowLeft') next = (index + labs.length - 1) % labs.length;
          else if (event.key === 'Home') next = 0;
          else if (event.key === 'End') next = labs.length - 1;
          else return;
          event.preventDefault(); chooseLab(next);
          document.getElementById(`lab-tab-${next}`)?.focus();
        }}><span className="tab-index">0{index + 1}</span><span>{item.name}</span></button>)}
    </div>
    <div className="lab-body" id="lab-panel" role="tabpanel" aria-labelledby={`lab-tab-${lab}`}>
      <div className="lab-intro"><div><div className="overline">REFERENCE MODEL / 0{lab + 1}</div><h3>{flow.name}</h3></div><span className="swipe-hint">SWIPE OR SELECT A STAGE <ArrowRight size={13}/></span></div>
      <SwipeRail className="lab-nodes" aria-label={`${flow.name} stages`}>
        <svg className="lab-flow-signal" viewBox="0 0 1000 10" preserveAspectRatio="none" aria-hidden="true"><path d="M0 5 H1000"/></svg>
        {flow.nodes.map((node, index) => <button key={node} data-cursor="explore" className={stage === index ? 'selected' : index < stage ? 'completed' : ''} aria-label={`Stage ${index + 1}: ${node}`} aria-pressed={stage === index}
          onClick={() => select(index)}><span className="lab-node-num">0{index + 1}</span><span className="lab-node-icon" aria-hidden="true"><span>{stage === index ? '✳' : '+'}</span></span><span>{node}</span></button>)}
      </SwipeRail>
      <div className="lab-detail">
        <span className="stage-count">0{stage + 1}<small>/ 0{flow.nodes.length}</small></span>
        <div className="stage-copy" aria-live={playing ? 'off' : 'polite'}><div className="overline">CURRENT STAGE</div><h4>{flow.nodes[stage]}</h4><p>{flow.detail[stage]}</p></div>
        <div className="lab-arrows"><button aria-label="Previous stage" onClick={() => step(-1)}><ArrowLeft size={17}/></button><button className="play-flow" aria-label={playing ? 'Pause flow' : 'Play flow'} aria-pressed={playing} onClick={toggle}>{playing ? <Pause size={15}/> : <Play size={15}/>}<span>{playing ? 'Pause' : 'Play flow'}</span></button><button aria-label="Next stage" onClick={() => step(1)}><ArrowRight size={17}/></button></div>
      </div>
      <div className="stage-progress" aria-hidden="true">{flow.nodes.map((node, index) => <span key={node} className={index <= stage ? 'filled' : ''}/>)}</div>
    </div>
    <div className="lab-foot">ILLUSTRATIVE ARCHITECTURE / NOT A PROPRIETARY SYSTEM DIAGRAM<span>FIG. 0{lab + 1}</span></div>
  </div>;
}
