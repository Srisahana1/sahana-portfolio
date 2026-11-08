import { useEffect, useId, useRef } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play, Code2 } from 'lucide-react';
import { SwipeRail, useFlowPlayback, centerFlowNode } from './Interactions';
import { projects } from './data';

const flows = [
  { kind: 'rag', note: 'Ingestion builds the index. Evaluation is a separate workflow, shown with a dashed connection.', stages: [
    ['Document ingestion', 'PDFs are loaded as documents with source and page metadata.'],
    ['Chunking', 'A recursive splitter divides documents into smaller overlapping passages.'],
    ['Indexing', 'Sentence embeddings are stored in a persistent ChromaDB vector index.'],
    ['Retrieval', 'Semantic similarity search finds candidate passages for the question.'],
    ['Reranking', 'A CrossEncoder reorders the retrieved candidates by relevance.'],
    ['Generation', 'Llama 3.2 receives the selected context and returns a grounded answer with source references.'],
    ['Evaluation', 'A separate evaluation script checks the question-answering pipeline.'],
  ] },
  { kind: 'mcp', note: 'The MCP server exposes structured tools over stdio. Tool results return to the calling client.', stages: [
    ['MCP client', 'A compatible AI client connects to the productivity server.'],
    ['MCP server', 'The Python MCP interface handles the client’s structured requests over stdio.'],
    ['Tool discovery', 'Registered task, note, event, and summary tools expose their names and input schemas.'],
    ['Tool execution', 'The chosen Python tool delegates to the corresponding productivity logic.'],
    ['Persistence', 'SQLite stores tasks, notes, and events for later retrieval.'],
  ] },
  { kind: 'react', note: 'A useful observation triggers deterministic termination. A maximum-iteration control also bounds the loop.', stages: [
    ['User request', 'The task initializes a structured agent state.'],
    ['Reasoning', 'The model considers the task, prior observation, and iteration count.'],
    ['Tool selection', 'A structured decision chooses a calculator, local knowledge search, or finish action.'],
    ['Action', 'The selected tool executes and produces a result.'],
    ['Observation', 'The result becomes the observation used by the next agent step.'],
    ['Termination', 'The workflow finishes on a useful observation or stops at the configured iteration limit.'],
    ['Final answer', 'The answer is returned in the validated agent state.'],
  ] },
  { kind: 'orchestrator', note: 'Pydantic validates the tool decision before execution. The current graph selects one tool per request; it has no separate result-validation node.', stages: [
    ['User request', 'The user task initializes the orchestrator state.'],
    ['LLM routing', 'Llama 3.2 interprets the request and proposes a tool decision.'],
    ['Tool selection', 'The decision identifies a calculator, local knowledge search, text analyzer, date/time tool, or finish action.'],
    ['Decision validation', 'A Pydantic schema constrains the structured decision, including the allowed tool names.'],
    ['Execution', 'The tool node executes the selected function with the structured input.'],
    ['Response', 'The finalization node returns the tool result as the final answer.'],
  ] },
];

export default function ProjectArchitecture({ index }: { index: number }) {
  const root = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, '');
  const flow = flows[index];
  const { step, playing, animating, select, toggle } = useFlowPlayback(flow.stages.length, root);
  const width = flow.stages.length * 108;
  const end = width - 54;
  useEffect(() => {
    const rail = root.current?.querySelector<HTMLElement>('.diagram-viewport');
    const node = rail?.querySelector<HTMLElement>('.diagram-node.selected');
    if (!rail || !node) return;
    centerFlowNode(rail, node);
  }, [step]);
  return <div className={`project-diagram diagram-${flow.kind}`} ref={root}>
    <div className="diagram-heading"><span><Code2 size={13}/> SYSTEM WALKTHROUGH</span><span>SELECT, SWIPE, OR PLAY <ArrowRight size={12}/></span></div>
    <SwipeRail className="diagram-viewport" aria-label={`${projects[index].title} architecture stages`}>
      <div className="flow-canvas" style={{ minWidth: `${width}px` }} data-playing={animating}>
        <svg className="flow-connections" viewBox={`0 0 ${width} 170`} preserveAspectRatio="none" aria-hidden="true">
          <defs><marker id={`${id}-arrow`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 6 3 0 6" fill="none" stroke="currentColor"/></marker></defs>
          <path className="flow-track" d={`M54 52 H${end}`}/>
          <path className="flow-traversed" d={`M54 52 H${54 + step * 108}`}/>
          <path className="flow-signal" d={`M54 52 H${end}`}/>
          {flow.kind === 'rag' && <path className="flow-return" d={`M${end - 108} 52 H${end}`}/>}
          {flow.kind === 'react' && <><path className="flow-return" d="M486 80 V130 Q486 140 476 140 H172 Q162 140 162 130 V80" markerEnd={`url(#${id}-arrow)`}/><text x="324" y="158" textAnchor="middle">CONTINUE UNTIL TERMINATION</text></>}
          {flow.kind === 'mcp' && <><path className="flow-return" d={`M${end} 80 V130 Q${end} 140 ${end - 10} 140 H64 Q54 140 54 130 V80`} markerEnd={`url(#${id}-arrow)`}/><text x={width / 2} y="158" textAnchor="middle">RETURN TOOL RESULT TO CLIENT</text></>}
        </svg>
        <div className="diagram-nodes" style={{ gridTemplateColumns: `repeat(${flow.stages.length}, minmax(0, 1fr))` }}>{flow.stages.map(([name], nodeIndex) => <button className={`diagram-node ${step === nodeIndex ? 'selected' : ''}`} data-cursor="explore" key={name} aria-label={`Project stage ${nodeIndex + 1}: ${name}`} aria-pressed={step === nodeIndex} onClick={() => select(nodeIndex)} onKeyDown={event => {
          let next = nodeIndex;
          if (event.key === 'ArrowRight') next = (nodeIndex + 1) % flow.stages.length;
          else if (event.key === 'ArrowLeft') next = (nodeIndex + flow.stages.length - 1) % flow.stages.length;
          else if (event.key === 'Home') next = 0;
          else if (event.key === 'End') next = flow.stages.length - 1;
          else return;
          event.preventDefault(); select(next);
          root.current?.querySelectorAll<HTMLButtonElement>('.diagram-node')[next]?.focus({ preventScroll: true });
        }}><span className="diagram-node-index">0{nodeIndex + 1}</span><span className="diagram-shape" aria-hidden="true"><span>{step === nodeIndex ? '✳' : '+'}</span></span><span className="diagram-node-label">{name}</span></button>)}</div>
      </div>
    </SwipeRail>
    <div className="project-stage-detail" aria-live={playing ? 'off' : 'polite'}><div><span>STAGE 0{step + 1}</span><strong>{flow.stages[step][0]}</strong></div><p>{flow.stages[step][1]}</p></div>
    <div className="flow-controls"><button onClick={() => select(step - 1)} aria-label="Previous project stage"><ArrowLeft size={16}/></button><span>{step + 1} / {flow.stages.length}</span><button className="project-play" onClick={toggle} aria-label={playing ? 'Pause project flow' : 'Play project flow'} aria-pressed={playing}>{playing ? <Pause size={15}/> : <Play size={15}/>}<span>{playing ? 'Pause' : 'Play flow'}</span></button><button onClick={() => select(step + 1)} aria-label="Next project stage"><ArrowRight size={16}/></button></div>
    <p className="diagram-note">{flow.note}</p>
    <details className="architecture-text"><summary>Read the complete architecture as text</summary><ol>{flow.stages.map(([name, detail]) => <li key={name}><strong>{name}</strong><p>{detail}</p></li>)}</ol></details>
  </div>;
}
