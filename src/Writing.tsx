import { ArrowUpRight, BookOpen, Clock3 } from 'lucide-react';
import engineeringCover from './assets/writing/ai-engineering.webp';
import evaluationCover from './assets/writing/llm-evaluation.webp';
import ragCover from './assets/writing/rag-assistant.webp';
import mcpCover from './assets/writing/mcp-server.webp';
import agentsCover from './assets/writing/agentic-ai.webp';
import modelsCover from './assets/writing/ai-models.webp';

export const medium = 'https://medium.com/@ssahana1703';

// Titles, URLs, reading times, and covers checked against the public Medium articles.
const articles = [
  { topic: 'ENGINEERING PERSPECTIVES', title: 'The AI Engineer Title Is Becoming Meaningless — And the Industry Knows It', description: 'The responsibilities that turn an AI feature into a reliable system.', minutes: 6, image: engineeringCover, url: `${medium}/the-ai-engineer-title-is-becoming-meaningless-and-the-industry-knows-it-6b26e90fe71f` },
  { topic: 'LLM EVALUATION', title: 'Why LLM Evaluation Is the Missing Piece in Most AI Projects', description: 'Moving beyond a convincing answer to something we can measure.', minutes: 8, image: evaluationCover, url: `${medium}/why-llm-evaluation-is-the-missing-piece-in-most-ai-projects-30b70c086cdd` },
  { topic: 'BUILD NOTES / RAG', title: 'I Built a Production-Style RAG Knowledge Assistant with Python, ChromaDB, FastAPI, and Llama 3.2', description: 'From document ingestion to grounded answers and evaluation.', minutes: 10, image: ragCover, url: `${medium}/i-built-a-production-style-rag-knowledge-assistant-with-python-chromadb-fastapi-and-llama-3-2-284e073b0f67` },
  { topic: 'PYTHON / MCP', title: "I Built My First MCP Server in Python — Here's What I Learned", description: 'Structured tools, persistent data, and the interface between them.', minutes: 6, image: mcpCover, url: `${medium}/i-built-my-first-mcp-server-in-python-heres-what-i-learned-7b915bd8f031` },
  { topic: 'AGENTIC AI', title: 'AI Agents Are Replacing Chatbots: What Agentic AI Actually Means in 2026', description: 'The shift from answering questions to taking useful actions.', minutes: 10, image: agentsCover, url: `${medium}/ai-agents-are-replacing-chatbots-what-agentic-ai-actually-means-in-2026-bde0df2f8969` },
  { topic: 'AI IN PRACTICE', title: 'ChatGPT vs Claude vs Gemini: Which AI Should You Actually Use in 2026?', description: 'A practical look at matching an AI assistant to the task.', minutes: 7, image: modelsCover, url: `${medium}/chatgpt-vs-claude-vs-gemini-which-ai-should-you-actually-use-in-2026-dd793e8a9d0b` },
];

export default function Writing() {
  return <section className="writing section" id="writing" aria-labelledby="writing-title"><div className="wrap">
    <div className="section-kicker"><span>04 / WRITING & PERSPECTIVES</span><span className="rule"/><span>BUILD. LEARN. SHARE.</span></div>
    <div className="section-heading reveal"><div><div className="overline">THINKING BEYOND THE CODE</div><h2 id="writing-title">Writing &<br/><span>Perspectives.</span></h2></div><div className="writing-intro"><p>What I’m building, what I’m learning, and the engineering decisions along the way.</p><a className="inline-link" href={medium} target="_blank" rel="noreferrer">Read More on Medium <ArrowUpRight size={16}/></a></div></div>
    <div className="writing-gallery">
      {articles.map((article, index) => <a className={`writing-card reveal ${index === 0 ? 'writing-featured' : ''}`} href={article.url} target="_blank" rel="noreferrer" key={article.url} aria-labelledby={`article-title-${index}`}>
        <div className="writing-cover"><img src={article.image} width={index === 0 ? 1100 : 700} height={index === 0 ? 619 : index === 5 ? 467 : 394} alt="" loading="lazy" decoding="async"/><span className="writing-cover-mark"><BookOpen size={15}/>{index === 0 ? 'FEATURED PERSPECTIVE' : 'ON MEDIUM'}</span></div>
        <div className="writing-card-body"><div className="writing-meta"><span className="overline">{article.topic}</span><span><Clock3 size={11}/>{article.minutes} min read</span></div><h3 id={`article-title-${index}`}>{article.title}</h3><p>{article.description}</p><span className="writing-read">Read perspective <ArrowUpRight size={17}/></span></div>
      </a>)}
    </div>
    <div className="writing-more"><span>MORE IDEAS. MORE EXPERIMENTS. ALWAYS LEARNING.</span><a className="button button-ghost" href={medium} target="_blank" rel="noreferrer">Read More on Medium <ArrowUpRight size={17}/></a></div>
  </div></section>;
}
