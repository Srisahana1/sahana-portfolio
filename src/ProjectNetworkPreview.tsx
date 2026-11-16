import { useId, useRef, useState } from 'react';
import { SignalConnection, SignalNode, useSignalSurface } from './Signals';

// Representative stages verified against the same public source as the full walkthroughs.
const previews = [
  [['Documents', 'Source PDFs are chunked and embedded in ChromaDB.'], ['Reranking', 'A CrossEncoder reranks retrieved context for the question.'], ['Answer', 'Llama 3.2 generates an answer with supporting source references.']],
  [['AI client', 'A compatible client connects to the MCP server over stdio.'], ['MCP tools', 'Registered tools handle tasks, notes, events, and daily summaries.'], ['SQLite', 'Productivity data is stored locally for later retrieval.']],
  [['Reason', 'The agent considers the task, observation, and iteration count.'], ['Act', 'A structured decision selects a calculator or local knowledge tool.'], ['Observe', 'A useful observation ends the loop; an iteration limit also bounds it.']],
  [['Request', 'The user task initializes the orchestrator state.'], ['Decision', 'Llama 3.2 selects a tool; Pydantic validates the structured decision.'], ['Tool result', 'One selected tool executes, and its result becomes the final answer.']],
];

export default function ProjectNetworkPreview({ index, title }: { index: number; title: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  const root = useSignalSurface<HTMLDivElement>();
  const nodes = useRef<HTMLButtonElement[]>([]);
  const id = useId();
  const stages = previews[index];
  return <div className={`project-network network-${index}`} ref={root} data-selected={selected ?? ''} role="group" aria-label={`${title} network preview`}>
    <div className="network-caption"><span>CONNECTED SYSTEM / 0{index + 1}</span><span>SELECT A NODE</span></div>
    <div className="network-graph">
      <svg viewBox="0 0 300 100" preserveAspectRatio="none" aria-hidden="true"><SignalConnection d="M50 60 C85 60 112 32 150 32" order={0} nodes={[0,1]}/><SignalConnection d="M150 32 C188 32 215 60 250 60" order={1} nodes={[1,2]}/>{index === 2 && <SignalConnection className="signal-secondary" d="M250 60 Q150 110 50 60" order={2} nodes={[2,0]}/>}</svg>
      <div className="network-nodes">{stages.map(([name], node) => <button key={name} ref={element => { if (element) nodes.current[node] = element; }} className={`network-node ${selected === node ? 'selected' : ''}`} aria-pressed={selected === node} aria-controls={id} aria-label={`${title}: ${name}`} data-cursor="explore" data-signal-node={node} onFocus={() => setSelected(node)} onClick={() => setSelected(node)} onKeyDown={event => {
        let next = node;
        if (event.key === 'ArrowRight') next = (node + 1) % 3;
        else if (event.key === 'ArrowLeft') next = (node + 2) % 3;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = 2;
        else return;
        event.preventDefault(); setSelected(next); nodes.current[next]?.focus();
      }}><SignalNode active={selected === node}/><span>{name}</span></button>)}</div>
    </div>
    <p className="network-explanation" id={id} aria-live="polite">{selected === null ? 'Select a node to explore its role.' : <><strong>{stages[selected][0]}</strong> — {stages[selected][1]}</>}</p>
  </div>;
}
