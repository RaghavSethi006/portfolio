import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

const EASE = [0.45, 0.05, 0.2, 1];
const SPR = { type: 'spring', duration: 0.65, bounce: 0.12 };
const ROT = [-1.6, 1.2, -0.7, 1.7, -1.2, 0.9];
const n2 = (i) => String(i + 1).padStart(2, '0');

// Curated 6 flagship projects mapped with high fidelity
const FEATURED_PROJECTS = [
  {
    id: 1,
    t: 'Jarvis',
    s: 'Autonomous multi-agent desktop runtime',
    c: 'AUTONOMOUS AI',
    l: 'Persistent 4-tier memory with runtime self-synthesis skills.',
    k: ['Python', 'React', 'Groq', 'ChromaDB', 'Kokoro TTS'],
    m: '~300ms TTS · 6 specialist agents',
    d: 'A local-first, multi-agent AI desktop assistant with persistent four-tier memory, runtime self-synthesis for missing capabilities, neural voice, biometric face auth, and gesture control.',
    pr: 'Existing AI assistants are cloud-dependent chatbot wrappers with zero real memory, no multi-step reasoning, and no desktop control across sessions.',
    ap: 'Built a full runtime where the Orchestrator decomposes intent into typed task graphs dispatched concurrently to six specialist agents with dependency resolution.',
    o: 'Autonomous execution of compound multi-step workflows with persistent episodic recall and sub-second voice synthesis.',
    github: 'https://github.com/RaghavSethi006/jarvis',
    demo: null,
  },
  {
    id: 2,
    t: 'Career Co-Pilot',
    s: 'AI career intelligence & submission engine',
    c: 'AI & AUTOMATION',
    l: 'Visible browser submission with strict zero-hallucination guardrails.',
    k: ['React', 'TypeScript', 'FastAPI', 'Gemini AI', 'Playwright'],
    m: '10/day cap · Zero-fabrication guarantee',
    d: 'An AI-powered career intelligence system that optimizes job applications for quality over volume — with RAG resume tailoring, visible browser submission, and feedback learning loops.',
    pr: 'Job hunters send 300+ generic applications with <5% callbacks, while spam auto-apply bots get accounts flagged with zero learning loop.',
    ap: 'A Prepare-Review-Approve-Submit workflow where Gemini tailors bullets strictly with anti-hallucination constraints and Playwright runs non-headless for visible control.',
    o: 'Maximized interview callback conversion while guaranteeing 100% truthful metrics and transparent browser execution.',
    github: 'https://github.com/RaghavSethi006/Career-Co-Pilot',
    demo: null,
  },
  {
    id: 3,
    t: 'TaskArena v2',
    s: 'Desktop study companion & local RAG',
    c: 'LOCAL RAG',
    l: 'SciBERT semantic search grounded directly in lecture slides.',
    k: ['Tauri v2', 'React', 'FastAPI', 'SciBERT', 'SQLite'],
    m: '60 fps SciBERT · 100% Offline',
    d: 'A desktop application that unifies student workflow — indexing lecture PDFs via SciBERT for local semantic search, token-streaming AI chat, quiz generation, and smart schedule blocks.',
    pr: 'Students juggle five disconnected apps and generic chatbots that have zero awareness of their actual lecture slides.',
    ap: 'A local RAG pipeline from scratch with SciBERT academic embeddings, granular context scoping (course, folder, slide), and Tauri v2 native Python sidecar.',
    o: 'Accurate academic Q&A with direct citation timestamps and zero subscription or internet dependency.',
    github: 'https://github.com/RaghavSethi006/TaskArena2.0',
    demo: null,
  },
  {
    id: 4,
    t: 'FinOS',
    s: 'Privacy-first financial operating system',
    c: 'LOCAL-FIRST OS',
    l: 'Double-entry ledger, encrypted vault & tax assistant on desktop.',
    k: ['React', 'TypeScript', 'Tauri v2', 'AES-256-GCM', 'SQLite'],
    m: '100% Local · AES-256-GCM encrypted',
    d: 'A local-first desktop OS combining finance tracking, double-entry accounting, investment portfolio, AES-256-GCM encrypted document vault, and tax estimation in one SQLite-backed app.',
    pr: 'Commercial finance tools harvest sensitive banking data, require recurring subscriptions, and expose private ledgers to cloud breaches.',
    ap: 'Five integrated modules sharing a local SQLite database, Web Crypto PBKDF2 key derivation, and zero-knowledge encryption where wrong password makes files mathematically inaccessible.',
    o: 'Full financial control, automated reports, and zero bytes leaving the local machine.',
    github: 'https://github.com/RaghavSethi006/FinOS',
    demo: null,
  },
  {
    id: 10,
    t: 'Open Photos',
    s: 'Self-hosted desktop photo manager',
    c: 'COMPUTER VISION',
    l: 'Local ONNX face clustering & Google Photos-style browsing.',
    k: ['Tauri v2', 'Rust', 'React 19', 'InsightFace', 'Leaflet'],
    m: '49 IPC commands · Local ONNX',
    d: 'A privacy-focused desktop photo manager bringing Google Photos-style timeline browsing, duplicate cleanup, GPS map discovery, and on-device face recognition without cloud uploads.',
    pr: 'Cloud photo platforms sacrifice privacy while basic desktop folders lack intelligent facial grouping, search, and geospatial visualization.',
    ap: 'Split architecture: high-speed Rust backend for recursive scanning and EXIF extraction, coupled with local InsightFace ONNX models for face clustering in React.',
    o: 'Sub-second browsing across 50,000+ local media assets with instant face grouping and map markers.',
    github: 'https://github.com/yourusername/local-google-photos',
    demo: null,
  },
  {
    id: 8,
    t: 'Local Eco',
    s: 'Decentralized cloudless P2P messenger',
    c: 'DECENTRALIZED P2P',
    l: 'Star topology with host migration, ECDH + AES-256-GCM.',
    k: ['React', 'TypeScript', 'WebRTC', 'Web Crypto API', 'Vite'],
    m: '0 servers · Ephemeral by design',
    d: 'A decentralized, peer-to-peer Discord-inspired messaging platform using WebRTC DataChannels and end-to-end encryption with zero centralized server infrastructure.',
    pr: 'Centralized chat platforms permanently retain conversation metadata, require hosted infrastructure, and create single points of failure.',
    ap: 'Browser-native WebRTC DataChannels with host sequence numbers, deterministic host migration on disconnect, and ECDH P-256 forward-secret session keys.',
    o: 'Zero running costs, zero cloud telemetry, and a network that cleanly disappears the moment all peers leave.',
    github: 'https://github.com/RaghavSethi006/local-echo',
    demo: 'https://off-grid-networking.vercel.app/',
  },
];

const SU = [
  <React.Fragment key="s0">
    <path d="M50 4L92 62H8Z" />
    <circle cx="33" cy="64" r="17" />
    <circle cx="67" cy="64" r="17" />
    <path d="M50 64V96M34 96H66" />
  </React.Fragment>,
  <React.Fragment key="s1">
    <path d="M50 4L94 50L50 96L6 50Z" />
    <path d="M50 28L72 50L50 72L28 50Z" />
  </React.Fragment>,
  <React.Fragment key="s2">
    <circle cx="50" cy="30" r="19" />
    <circle cx="29" cy="64" r="19" />
    <circle cx="71" cy="64" r="19" />
    <path d="M50 64V96" />
  </React.Fragment>,
  <React.Fragment key="s3">
    <circle cx="33" cy="36" r="19" />
    <circle cx="67" cy="36" r="19" />
    <path d="M15 50L50 96L85 50" />
  </React.Fragment>,
];

const useMQ = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = () => setMatches(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
};

// Generative Blueprint Visual
function Vis({ i }) {
  const a = (n) => {
    const x = Math.sin((n + 1) * 12.9898 + i * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  const pt = [0, 1, 2, 3, 4, 5, 6].map((n) => [
    (10 + n * 13 + a(n) * 6).toFixed(1),
    (24 + a(n + 9) * 52).toFixed(1),
  ]);

  return (
    <svg className="pim-vis" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g transform="translate(29 29) scale(.42)">{SU[i % 4]}</g>
      <polyline points={pt.map((p) => p.join(',')).join(' ')} />
      {pt.map((p, k) => (
        <circle key={k} className="n" cx={p[0]} cy={p[1]} r="1.4" />
      ))}
    </svg>
  );
}

// Monogram Emblem on Card Back
const Mono = () => (
  <svg viewBox="0 0 40 40" aria-hidden="true">
    <path d="M20 3L37 20L20 37L3 20Z" />
    <circle cx="20" cy="20" r="7" />
    <path d="M20 3V13M20 27V37M3 20H13M27 20H37" />
  </svg>
);

// Card Front Info
const Front = ({ p, i, g }) => (
  <div className="pim-fr">
    <div className="flex items-center justify-between">
      <span className="pim-num">{n2(i)}</span>
      <span className="pim-cat">{p.c}</span>
    </div>
    <div className="pim-pv">
      <Vis i={i} />
    </div>
    <b className="pim-tt">{p.t}</b>
    {g && <p className="pim-ln">{p.l}</p>}
  </div>
);

// Tech Stack Pills
const Pills = ({ k }) => (
  <ul className="pim-pills">
    {k.map((x) => (
      <li key={x}>{x}</li>
    ))}
  </ul>
);

// 3D Tilt & Flip Card
function Card({ p, i, g, up, dl, st, pick }) {
  const r = st || g ? 0 : ROT[i % ROT.length];
  return (
    <motion.button
      type="button"
      layoutId={'pim-card-' + i}
      className={g ? 'pim-card pim-gc' : 'pim-card pim-dk'}
      aria-label={(g ? 'Open case study: ' : 'Show project: ') + p.t}
      onClick={() => pick(i)}
      style={{ borderRadius: 12, zIndex: g ? 1 : i + 1 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: r }}
      whileHover={g ? undefined : { y: -5 }}
      transition={{ layout: SPR, rotate: { duration: 0.5, ease: EASE }, y: { duration: 0.2 } }}
    >
      <motion.div
        className="pim-flip"
        initial={false}
        animate={{ rotateY: up ? 180 : 0 }}
        transition={{ duration: up ? 0.5 : 0.4, delay: dl, ease: EASE }}
      >
        <div className="pim-face pim-back">
          <Mono />
        </div>
        <div className="pim-face pim-front">
          <Front p={p} i={i} g={g} />
        </div>
      </motion.div>
    </motion.button>
  );
}

// Featured Hero Showcase Card with swipe for mobile & tablet
function Feat({ p, i, open, onOpenDetail, prv, nxt }) {
  return (
    <motion.article
      layoutId={'pim-card-' + i}
      className="pim-feat touch-pan-y cursor-grab active:cursor-grabbing select-none"
      style={{ borderRadius: 18 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      dragMomentum={false}
      onDragEnd={(e, info) => {
        if (info.offset.x < -36 || info.velocity.x < -250) {
          nxt();
        } else if (info.offset.x > 36 || info.velocity.x > 250) {
          prv();
        }
      }}
      initial={{ rotate: ROT[i % ROT.length] }}
      animate={{ rotate: 0 }}
      transition={{ layout: SPR, rotate: { duration: 0.6, ease: EASE } }}
    >
      <div className="pim-fv">
        <Vis i={i} />
      </div>
      <div className="pim-fi">
        <div className="pim-meta flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="pim-num">{n2(i)}</span>
            <span className="pim-cat">{p.c}</span>
          </div>
          <span className="text-[10px] font-mono text-[#8BA3C7]/80 inline md:hidden">
            Swipe ↔
          </span>
        </div>
        <h3 className="pim-h3">{p.t}</h3>
        <p className="pim-sub">{p.s}</p>
        <p className="pim-desc">{p.d}</p>
        <Pills k={p.k} />
        <div className="pim-metric">{p.m}</div>
        <div className="pim-acts">
          <button className="pim-btn" type="button" onClick={open}>
            Explore case study <ArrowRight className="w-3.5 h-3.5" />
          </button>
          {onOpenDetail && (
            <button
              className="pim-lnk"
              type="button"
              onClick={() => onOpenDetail(p.id)}
            >
              Full docs ↗
            </button>
          )}
          {p.github && (
            <a
              className="pim-lnk"
              href={p.github}
              target="_blank"
              rel="noreferrer"
            >
              View source ↗
            </a>
          )}
          {p.demo && (
            <a
              className="pim-lnk"
              href={p.demo}
              target="_blank"
              rel="noreferrer"
            >
              Live demo ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// Case Study Quick Modal
function Case({ i, close, onOpenDetail }) {
  const p = FEATURED_PROJECTS[i];
  const closeBtnRef = useRef(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  return (
    <motion.div
      className="pim-ov"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={close}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${p.t} case study`}
        className="pim-cs"
        initial={{ opacity: 0, y: 48, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.96 }}
        transition={{ type: 'spring', duration: 0.6, bounce: 0.1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          className="pim-x"
          type="button"
          aria-label="Close case study"
          onClick={close}
        >
          <X className="w-4 h-4" />
        </button>
        <div className="pim-cv">
          <Vis i={i} />
        </div>
        <div className="pim-cb">
          <div className="pim-meta">
            <span className="pim-num">{n2(i)}</span>
            <span className="pim-cat">{p.c}</span>
          </div>
          <h3 className="pim-h3">{p.t}</h3>
          <p className="pim-sub">{p.s}</p>
          <div className="pim-cols">
            <div>
              <h4 className="pim-h4">OVERVIEW</h4>
              <p>{p.d}</p>
            </div>
            <div>
              <h4 className="pim-h4">PROBLEM</h4>
              <p>{p.pr}</p>
            </div>
            <div>
              <h4 className="pim-h4">APPROACH</h4>
              <p>{p.ap}</p>
            </div>
            <div>
              <h4 className="pim-h4">OUTCOME</h4>
              <p>{p.o} {p.m}.</p>
            </div>
          </div>
          <div>
            <h4 className="pim-h4">TECHNOLOGY STACK</h4>
            <Pills k={p.k} />
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-[#1A2744]">
            {onOpenDetail && (
              <button
                type="button"
                onClick={() => {
                  close();
                  onOpenDetail(p.id);
                }}
                className="pim-btn"
              >
                Open Full Engineering Spec <ArrowRight className="w-4 h-4" />
              </button>
            )}
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="pim-lnk"
              >
                GitHub Repository ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main Projects in Motion Section
const ProjectsPage = ({ onOpenProject, onViewAllProjects }) => {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'prep' | 'sweep' | 'grid' | 'compact' | 'unsweep' | 'hold' | 'fin' | 'cancel'
  const [modal, setModal] = useState(null);
  const [hov, setHov] = useState(false);
  const [foc, setFoc] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [sw, setSw] = useState(0);
  const [press, setPress] = useState(false);

  const lock = useRef(false);
  const tm = useRef([]);
  const opener = useRef(null);
  const gesture = useRef(null);
  const tableRef = useRef(null);
  const rowRef = useRef(null);

  const red = useMQ('(prefers-reduced-motion: reduce)');

  const at = useCallback((fn, ms) => {
    const tid = setTimeout(fn, red ? 20 : ms);
    tm.current.push(tid);
  }, [red]);

  useEffect(() => {
    const timers = tm.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const go = useCallback((i) => {
    if (phase !== 'idle' || lock.current || modal !== null || i === active) return;
    lock.current = true;
    setActive(i);
    setNonce((n) => n + 1);
    at(() => {
      lock.current = false;
    }, 680);
  }, [phase, modal, active, at]);

  const nxt = useCallback(() => go((active + 1) % FEATURED_PROJECTS.length), [active, go]);
  const prv = useCallback(() => go((active + FEATURED_PROJECTS.length - 1) % FEATURED_PROJECTS.length), [active, go]);

  const closeAll = useCallback(() => {
    if (phase !== 'grid' || lock.current) return;
    lock.current = true;
    setPhase('compact');
    at(() => setPhase('unsweep'), 760);
    at(() => setPhase('idle'), 1860);
    at(() => {
      lock.current = false;
      setNonce((n) => n + 1);
    }, 2500);
  }, [phase, at]);

  const openCase = useCallback((i) => {
    opener.current = document.activeElement;
    setActive(i);
    setModal(i);
  }, []);

  const closeCase = useCallback(() => {
    setModal(null);
    try {
      opener.current?.focus();
    } catch (_) {}
  }, []);

  useEffect(() => {
    if (modal === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeCase();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [modal, closeCase]);

  const handleKeyDown = useCallback((e) => {
    if (modal !== null || phase !== 'idle') return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nxt();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prv();
    }
  }, [modal, phase, nxt, prv]);

  // Touch & Pointer press-and-slide deck gesture
  const handlePointerDown = useCallback((e) => {
    if (phase !== 'idle' || lock.current || modal !== null || (e.pointerType === 'mouse' && e.button !== 0)) {
      return;
    }

    const s = {
      x: e.clientX,
      y: e.clientY,
      cx: e.clientX,
      v: 0,
      armed: false,
      t: null,
    };
    gesture.current = s;
    setPress(true);

    const calc = (ev) => {
      const r = rowRef.current;
      if (!r || !r.children.length) return 0;
      const c = r.children;
      const R = r.getBoundingClientRect();
      const a = c[0].getBoundingClientRect();
      const b = c[c.length - 1].getBoundingClientRect();
      const l = Math.max(a.left, R.left);
      const w = Math.min(b.right, R.right) - l;
      return Math.min(1, Math.max(0, (ev.clientX - l) / (w || 1)));
    };

    const cleanup = () => {
      clearTimeout(s.t);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      gesture.current = null;
      setPress(false);
    };

    const finish = () => {
      cleanup();
      lock.current = true;
      setPhase('fin');
      at(() => {
        if (onViewAllProjects) {
          onViewAllProjects();
        } else {
          setPhase('grid');
        }
        lock.current = false;
        setPhase('idle');
      }, 760);
    };

    const onMove = (ev) => {
      s.cx = ev.clientX;
      s.cy = ev.clientY;
      if (!s.armed) {
        const primaryDiff = Math.abs(ev.clientX - s.x);
        const crossDiff = Math.abs(ev.clientY - s.y);
        if (crossDiff > 16 || primaryDiff > 16) {
          cleanup();
        }
        return;
      }
      s.v = calc(ev);
      setSw(s.v);
      if (s.v >= 0.95) {
        finish();
      }
    };

    const onUp = () => {
      const wasArmed = s.armed;
      cleanup();
      if (!wasArmed) return;
      if (s.v >= 0.75) {
        finish();
      } else {
        setPhase('cancel');
        at(() => setPhase('idle'), 480);
        at(() => {
          lock.current = false;
          setNonce((n) => n + 1);
        }, 1150);
      }
    };

    s.t = setTimeout(() => {
      s.armed = true;
      s.v = 0;
      lock.current = true;
      setSw(0);
      setPhase('hold');
      setPress(false);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(14);
      }
    }, 240);

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  }, [phase, modal, at, onViewAllProjects]);

  const triggerSlideTransition = useCallback(() => {
    if (lock.current) return;
    lock.current = true;
    setPhase('fin');
    at(() => {
      if (onViewAllProjects) {
        onViewAllProjects();
      }
      lock.current = false;
      setPhase('idle');
    }, 760);
  }, [onViewAllProjects, at]);

  const autoAdvancing = !red && phase === 'idle' && modal === null;
  const upI = (i) => (phase === 'hold' ? sw >= (i + 0.5) / FEATURED_PROJECTS.length : !(phase === 'prep' || phase === 'unsweep' || phase === 'cancel'));
  const dl = (i) => (red ? 0 : phase === 'sweep' ? i * 0.11 : phase === 'unsweep' ? (5 - i) * 0.11 : phase === 'fin' ? i * 0.04 : 0);

  const cards = FEATURED_PROJECTS.map((p, i) =>
    phase === 'idle' && i === active ? (
      <div key={'slot-' + i} className="pim-slot" aria-hidden="true">
        <span className="pim-num">{n2(i)}</span>
        <span>IN FOCUS</span>
        <i />
      </div>
    ) : (
      <Card
        key={p.t}
        p={p}
        i={i}
        up={upI(i)}
        dl={dl(i)}
        st={phase !== 'idle'}
        pick={go}
      />
    )
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="w-full bg-[#050A18] relative z-20">
        <section
          className="pim-sec"
          aria-label="Selected projects in motion"
          onPointerEnter={(e) => e.pointerType === 'mouse' && setHov(true)}
          onPointerLeave={() => setHov(false)}
          onFocus={(e) => setFoc(e.target.matches(':focus-visible'))}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setFoc(false);
          }}
          onKeyDown={handleKeyDown}
        >
        {/* Header */}
        <header className="pim-hd">
          <div>
            <p className="pim-eye">SELECTED WORK</p>
            <h2 className="pim-title">Projects in Motion</h2>
            <p className="pim-lead">
              Each card is an intelligent system, local-first engine or protocol: designed, shipped and measured.
            </p>
          </div>

          <div className="pim-ctl">
            <div className="flex items-center gap-4">
              <div className="pim-cp">
                <span className="pim-cnt">
                  {n2(active)} <span>/ 06</span>
                </span>
                <span className="pim-pg">
                  {autoAdvancing && (
                    <i
                      key={active + '-' + nonce}
                      className="pim-fill"
                      style={{ animationPlayState: hov || foc || press ? 'paused' : 'running' }}
                      onAnimationEnd={nxt}
                    />
                  )}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Stage or Grid View */}
        {phase === 'grid' ? (
          <div key="arch" className="pim-arch">
            <div className="pim-ah">
              <h3 className="pim-h3">Featured Deck Grid</h3>
              <div className="flex items-center gap-3">
                <button className="pim-back-btn" type="button" onClick={closeAll}>
                  <ArrowLeft className="w-4 h-4 text-[#B8960C]" /> Back to featured deck
                </button>
                {onViewAllProjects && (
                  <button
                    type="button"
                    onClick={onViewAllProjects}
                    className="pim-btn-toggle"
                  >
                    View All 13 Projects →
                  </button>
                )}
              </div>
            </div>
            <div className="pim-grid">
              {FEATURED_PROJECTS.map((p, i) => (
                <Card
                  key={p.t}
                  p={p}
                  i={i}
                  g={true}
                  up={true}
                  dl={0}
                  st={true}
                  pick={openCase}
                />
              ))}
            </div>
          </div>
        ) : (
          <div key="stage">
            {phase === 'idle' && (
              <div className="pim-featwrap">
                <Feat
                  key={'feat-' + active}
                  p={FEATURED_PROJECTS[active]}
                  i={active}
                  open={() => openCase(active)}
                  onOpenDetail={onOpenProject}
                  prv={prv}
                  nxt={nxt}
                />
                <button
                  className="pim-arr l"
                  type="button"
                  aria-label="Previous project"
                  onClick={prv}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  className="pim-arr r"
                  type="button"
                  aria-label="Next project"
                  onClick={nxt}
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Interactive Deck Table with Hold and Slide */}
            <motion.div
              ref={tableRef}
              onPointerDown={handlePointerDown}
              layout="position"
              className={'pim-table' + (press ? ' press' : '')}
            >
              <div className="pim-rw">
                <div className="pim-row" ref={rowRef}>
                  {cards}
                </div>
              </div>
              <div className="flex justify-center mt-3">
                <button
                  type="button"
                  onClick={triggerSlideTransition}
                  className="pim-hint group cursor-pointer transition hover:opacity-100 py-1.5 px-4 rounded-full hover:bg-[#0B1428] border border-transparent hover:border-[#1A2744]"
                  title="Slide across deck or click to open all projects"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#B8960C] transition-transform group-hover:translate-x-1" />
                  <span>Press, hold & slide across the deck to open all projects</span>
                  <span className="text-[#B8960C] text-[11px] underline underline-offset-4 decoration-[#B8960C]/50 group-hover:decoration-[#B8960C] ml-1.5 font-mono">
                    (or click to open)
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Case Study Modal */}
        <AnimatePresence>
          {modal !== null && (
            <Case
              key="case-modal"
              i={modal}
              close={closeCase}
              onOpenDetail={onOpenProject}
            />
          )}
        </AnimatePresence>
      </section>
      </div>
    </MotionConfig>
  );
};

export default React.memo(ProjectsPage);
