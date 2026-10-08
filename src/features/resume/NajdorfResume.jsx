import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './NajdorfResume.css';

const FILES = 'abcdefgh';
const SQ = 100;
const START_PLY = 9; // opens on the Project Lead move
const STEP_MS = 5200;

const SCHOOL = 'Fahaheel Al Watanieh Indian Private School (DPS Kuwait)';
const LINKS = {
  pdf: `${process.env.PUBLIC_URL || ''}/assets/Raghav_Sethi_Resume.pdf`,
  fallbackPdf: 'https://portfolio-raghavsethi006.vercel.app/assets/Raghav_Sethi_Resume.pdf'
};

const ROLES = [
  {
    ply: 1,
    san: 'e4',
    from: 'e2',
    to: 'e4',
    short: 'CS Director',
    title: 'Director of Computer Science',
    org: SCHOOL,
    orgShort: 'DPS Kuwait',
    dates: 'Sep 2022 – Mar 2023',
    sum: 'Founded and led the Computer Science Club, turning ideas into repeatable programs.',
    note: 'Claim the centre first. The club did not exist until this move.',
    figs: [
      ['+70%', 'membership'],
      ['3 / 4', 'events / contests'],
      ['2', 'interschool wins']
    ],
    bullets: [
      'Grew membership 70% and improved student proficiency in advanced tools',
      'Executed three technical events and four creativity-driven contests',
      'Secured two interschool competition victories with disciplined coaching'
    ],
    pick: [0, 1, 2],
    tags: []
  },
  {
    ply: 2,
    san: 'c5',
    from: 'c7',
    to: 'c5',
    short: 'Design Director',
    title: 'Director of Graphic Design',
    org: SCHOOL,
    orgShort: 'DPS Kuwait',
    dates: 'Aug 2023 – Oct 2023',
    sum: 'Built editorial systems for print and brand identity with exacting visual language.',
    note: 'The Sicilian reply refuses symmetry. A second discipline, played beside code.',
    figs: [
      ['+30%', 'distribution engagement'],
      ['90%', 'editor satisfaction']
    ],
    bullets: [
      'Created magazine covers and layouts with cohesive typographic hierarchy',
      'Increased distribution engagement by 30% through refined design direction',
      'Delivered professional-quality visuals with a 90% satisfaction rating from editors'
    ],
    pick: [0, 1, 2],
    tags: []
  },
  {
    ply: 3,
    san: 'Nf3',
    from: 'g1',
    to: 'f3',
    short: 'Student Captain',
    title: 'Student Body Captain',
    org: SCHOOL,
    orgShort: 'DPS Kuwait',
    dates: 'Sep 2023 – Feb 2024',
    sum: 'Led student governance with precision, balancing structure, communication, and results.',
    note: 'Develop a piece and keep the centre covered. Same skills, a bigger board.',
    figs: [
      ['+50%', 'participation'],
      ['−40%', 'incidents'],
      ['5', 'interhouse wins']
    ],
    bullets: [
      'Directed four interhouse competitions and increased participation by 50%',
      'Established peer mentorship practices that reduced incidents by 40%',
      'Guided teams to five interhouse victories with disciplined execution'
    ],
    pick: [0, 1, 2],
    tags: []
  },
  {
    ply: 4,
    san: 'd6',
    from: 'd7',
    to: 'd6',
    short: 'Safe Lanes',
    title: 'Software Development Intern',
    org: 'Safe Lanes',
    orgShort: 'Safe Lanes',
    dates: 'Jul 2025 – Aug 2025',
    sum: 'Built production-ready features across frontend and backend systems, with an emphasis on clarity and security.',
    note: 'Quiet and solid. Security first, flash later.',
    figs: [],
    bullets: [
      'Delivered a secure PDF viewer with password protection and anti-copy logic',
      'Designed a notification system that scaled to live enterprise workflows',
      'Implemented a retrieval-augmented chatbot using HuggingFace, FAISS, and Streamlit'
    ],
    pick: [0, 1, 2],
    tags: ['HuggingFace', 'FAISS', 'Streamlit', 'RAG']
  },
  {
    ply: 5,
    san: 'd4',
    from: 'd2',
    to: 'd4',
    short: 'AI Engineer',
    title: 'AI Engineer',
    org: 'Undergraduate Artificial Intelligence Society (UAIS)',
    orgShort: 'UAIS',
    dates: 'Oct 2025 – Mar 2026',
    sum: 'Engineering academic AI tools and data pipelines within the ClubMate initiative.',
    note: 'The pawn break. The position opens and the real work starts.',
    figs: [],
    bullets: [
      'Prototyped AI-driven student tools in agile teams for the ClubMate initiative',
      'Architected RAG-based data pipelines and backend integration scripts',
      'Optimized models and demonstration features for technical club workshops'
    ],
    pick: [0, 1, 2],
    tags: ['RAG', 'Data pipelines', 'ClubMate']
  },
  {
    ply: 6,
    san: 'cxd4',
    from: 'c5',
    to: 'd4',
    short: 'VP Technology',
    title: 'Vice President of Technology',
    org: 'Undergraduate Artificial Intelligence Society (UAIS)',
    orgShort: 'UAIS',
    dates: 'Apr 2026 – Present',
    sum: 'Directing technical operations and infrastructure for the university’s premier AI student organization.',
    note: 'An exchange. Responsibility for the whole technical structure changes hands.',
    figs: [],
    bullets: [
      'Orchestrate password management and security protocols for club resources',
      'Manage global GitHub organization and cloud infrastructure on AWS',
      'Governance of Google Workspace (Suite) and public/private data repositories',
      'Lead website maintenance and execute high-priority technical mandates from the President'
    ],
    pick: [0, 1, 2, 3],
    tags: ['AWS', 'GitHub', 'Google Workspace']
  },
  {
    ply: 7,
    san: 'Nxd4',
    from: 'f3',
    to: 'd4',
    short: 'Research Trainee',
    title: 'Research Trainee',
    org: 'Computing Research Association',
    orgShort: 'CRA',
    dates: 'Jun 2026 – Aug 2026',
    sum: 'Engaging in an intensive research fellowship focused on academic writing, experimental design, and advanced data analysis in computing.',
    note: 'The recapture puts the knight in the centre. Slower thinking, deeper lines.',
    figs: [],
    bullets: [
      'Collaborating with research mentors to review state-of-the-art literature and synthesize methodologies for emerging computing challenges.',
      'Strengthening competencies in rigorous research design, quantitative/qualitative data analysis, and ethical research protocols.',
      'Participating in professional development seminars, peer workshops, and mentorship panels led by leading computer science researchers.'
    ],
    pick: [0, 1, 2],
    tags: []
  },
  {
    ply: 8,
    san: 'Nf6',
    from: 'g8',
    to: 'f6',
    short: 'Markaz Intern',
    title: 'Software Engineer Intern',
    org: 'Kuwait Financial Centre - Markaz',
    orgShort: 'Markaz',
    dates: 'Jul 2026 – Aug 2026',
    sum: 'Developed an automated portfolio reporting pipeline and client-facing scorecards for a leading financial institution.',
    note: 'Develop with tempo. Real data, real clients, a real deadline.',
    figs: [],
    bullets: [
      'Developed an automated portfolio reporting pipeline in Python that ingests financial holding data from third-party sources, enriches it with proprietary analyst signals and risk ratings, and produces personalized client-facing scorecards — reducing manual reporting effort',
      'Designed a quantitative scoring and client risk classification system that evaluates portfolio holdings across multiple weighted dimensions, translating raw analyst ratings into actionable numeric scores and categorical risk profiles',
      'Built custom data visualizations using Matplotlib, including gauge and bar chart components with a brand-aligned color system, rendered headless and embedded dynamically into HTML reports',
      'Created responsive email templates using MJML and Jinja2 templating, enabling per-client dynamic content injection (scores, charts, breakdowns, and rankings) for consistent cross-client delivery',
      'Engineered modular pipeline stages (data ingestion, join/aggregation, scoring, rendering, delivery) with CLI and environment-driven configuration, supporting both offline preview and live email modes'
    ],
    pick: [0, 1, 2],
    tags: ['Python', 'Matplotlib', 'MJML', 'Jinja2']
  },
  {
    ply: 9,
    san: 'Nc3',
    from: 'b1',
    to: 'c3',
    short: 'Project Lead',
    title: 'Project Lead',
    org: 'Undergraduate Artificial Intelligence Society (UAIS)',
    orgShort: 'UAIS',
    dates: 'Sep 2026 – Present',
    sum: 'Leading a 6-month AI engineering project focused on building an AI-native desktop environment where users can interact with their computer through natural language, multimodal input, and intelligent automation.',
    note: 'Every piece is developed. Now one team, one architecture, six months.',
    figs: [
      ['6 mo', 'project length'],
      ['6', 'workstreams coordinated']
    ],
    bullets: [
      'Lead the project’s technical architecture, development roadmap, team coordination, cross-team integration, and final product direction across AI, frontend, systems, computer vision, and infrastructure',
      'Architecting a Windows-first desktop shell using Tauri, React, TypeScript, Rust, FastAPI, Python, SQLite, MediaPipe, and LLMs, with a roadmap toward cross-platform support',
      'Designing an agentic AI layer with structured tool calling and desktop-state awareness, enabling the system to understand user intent and execute actions such as launching applications, managing windows, switching workspaces, and retrieving information',
      'Leading the integration of Rust/Tauri with native Windows APIs to provide real-time application and window management, including window detection, focus tracking, movement, resizing, and state synchronization',
      'Building a unified interaction architecture where AI commands, keyboard/mouse input, and computer-vision-based gestures can trigger the same underlying action system',
      'Designing support for both hosted and local LLMs through Ollama, enabling experimentation with model capabilities, privacy, latency, and tool-calling reliability',
      'Coordinating specialized contributors across Frontend & Desktop Shell, AI & Agent Systems, Rust & OS Integration, Multimodal Interaction, Search & Retrieval, and Infrastructure & QA',
      'Establishing engineering practices around milestone planning, technical specifications, Git workflows, code reviews, testing, documentation, and iterative integration',
      'Developing evaluation criteria for AI task success, tool-calling reliability, interaction efficiency, gesture performance, latency, and native desktop-control reliability'
    ],
    pick: [0, 1, 2, 3],
    tags: ['Tauri', 'React', 'TypeScript', 'Rust', 'FastAPI', 'Python', 'SQLite', 'MediaPipe', 'Ollama']
  },
  {
    ply: 10,
    san: 'a6',
    from: 'a7',
    to: 'a6',
    short: '3rd Year Rep',
    title: '3rd Year Representative',
    org: 'Computer Engineering Club, University of Alberta',
    orgShort: 'Computer Engineering Club',
    dates: 'Oct 2026 – Present',
    sum: 'Representing 3rd-year Computer Engineering students within the Computer Engineering Club, bringing student perspectives, concerns, and interests to the executive team.',
    note: 'The move that names the Najdorf. Quiet, flexible, and every option stays open.',
    figs: [],
    bullets: [
      'Represent 3rd-year Computer Engineering students within the Computer Engineering Club, bringing student perspectives, concerns, and interests to the executive team',
      'Act as a communication link between 3rd-year students and the Club, helping ensure their feedback and priorities are effectively represented',
      'Promote and publicize Computer Engineering Club events, initiatives, and opportunities to 3rd-year students and encourage student engagement',
      'Collaborate with executive members across assigned portfolios to support the planning and execution of Club initiatives and events',
      'Serve as a member of the Junior Executive Committee, contributing to organizational discussions and participating in committee decisions through an elected vote'
    ],
    pick: [1, 3, 4],
    tags: []
  }
];

const N = ROLES.length;

// Precompute setup and snapshots
const SETUP = [];
const back = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
for (let f = 0; f < 8; f++) {
  SETUP.push({ id: 'wp' + f, t: 'p', c: 'w', sq: FILES[f] + '2' });
  SETUP.push({ id: 'bp' + f, t: 'p', c: 'b', sq: FILES[f] + '7' });
  SETUP.push({ id: 'w' + back[f] + f, t: back[f], c: 'w', sq: FILES[f] + '1' });
  SETUP.push({ id: 'b' + back[f] + f, t: back[f], c: 'b', sq: FILES[f] + '8' });
}

const SNAP = [];
(() => {
  const at = new Map(SETUP.map((p) => [p.sq, p.id]));
  const cur = {};
  SETUP.forEach((p) => {
    cur[p.id] = p.sq;
  });
  SNAP.push({ ...cur });
  ROLES.forEach((r) => {
    const mover = at.get(r.from);
    if (!mover) throw new Error('No piece on ' + r.from + ' at ply ' + r.ply);
    const victim = at.get(r.to);
    if (victim) cur[victim] = null;
    at.delete(r.from);
    at.set(r.to, mover);
    cur[mover] = r.to;
    SNAP.push({ ...cur });
  });
})();

const sqXY = (sq) => [FILES.indexOf(sq[0]), 8 - Number(sq[1])];
const moveNo = (ply) => Math.ceil(ply / 2);
const label = (r) => moveNo(r.ply) + (r.ply % 2 ? '. ' : '… ') + r.san;
const side = (ply) => (ply % 2 ? 'w' : 'b');

function lastSq(id, n) {
  for (let k = n; k >= 0; k--) {
    if (SNAP[k][id] !== null) return SNAP[k][id];
  }
  return null;
}

const NajdorfResume = () => {
  const [ply, setPlyState] = useState(START_PLY);
  const [view, setView] = useState('board'); // 'board' | 'list'
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInstant, setIsInstant] = useState(true);
  const [copyFeedback, setCopyFeedback] = useState({});

  const boardSvgRef = useRef(null);
  const rowsRef = useRef(null);
  const barRef = useRef(null);
  const timerRef = useRef(null);

  const currentRole = ply > 0 ? ROLES[ply - 1] : null;
  const nextRole = ply < N ? ROLES[ply] : null;

  // Clear instant flag after initial mount
  useEffect(() => {
    const t = setTimeout(() => setIsInstant(false), 100);
    return () => clearTimeout(t);
  }, []);

  const changePly = useCallback((targetPly, instant = false) => {
    const n = Math.max(0, Math.min(N, targetPly));
    if (instant) {
      setIsInstant(true);
      setTimeout(() => setIsInstant(false), 50);
    }
    setIsExpanded(false);
    setPlyState(n);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
    if (barRef.current) {
      barRef.current.classList.remove('run');
    }
  }, []);

  const manual = useCallback((targetPly) => {
    pause();
    changePly(targetPly);
  }, [pause, changePly]);

  const restartBar = useCallback(() => {
    if (barRef.current) {
      barRef.current.classList.remove('run');
      void barRef.current.offsetWidth;
      barRef.current.classList.add('run');
    }
  }, []);

  const scheduleNext = useCallback(() => {
    clearTimeout(timerRef.current);
    restartBar();
    timerRef.current = setTimeout(() => {
      setPlyState((curr) => {
        if (curr >= N) {
          pause();
          return curr;
        }
        const next = curr + 1;
        if (next >= N) {
          pause();
        }
        return next;
      });
    }, ply === 0 ? 900 : STEP_MS);
  }, [ply, pause, restartBar]);

  useEffect(() => {
    if (isPlaying) {
      scheduleNext();
    } else {
      clearTimeout(timerRef.current);
      if (barRef.current) {
        barRef.current.classList.remove('run');
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, ply, scheduleNext]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      if (ply >= N) {
        changePly(0, true);
      }
      setIsPlaying(true);
    }
  }, [isPlaying, ply, pause, changePly]);

  // Center active move button in rows strip
  useEffect(() => {
    if (rowsRef.current) {
      const activeBtn = rowsRef.current.querySelector('.mv.cur');
      if (activeBtn && rowsRef.current.scrollWidth > rowsRef.current.clientWidth + 2) {
        const left = activeBtn.parentElement.offsetLeft - (rowsRef.current.clientWidth - activeBtn.offsetWidth) / 2;
        rowsRef.current.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
      }
    }
  }, [ply]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (view !== 'board' || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target;
      if (target instanceof Element && target.closest('input,textarea,select,[contenteditable="true"]')) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        manual(ply + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        manual(ply - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        manual(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        manual(N);
      } else if (e.key === ' ' && !(target instanceof Element && target.closest('button,a,summary'))) {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, ply, manual, togglePlay]);

  // Pause when page is hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) pause();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [pause]);

  // Copy helper
  const handleCopy = useCallback(async (text, key) => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      try {
        ok = document.execCommand('copy');
      } catch {
        ok = false;
      }
      ta.remove();
    }
    setCopyFeedback((prev) => ({ ...prev, [key]: ok ? 'Copied' : 'Press Ctrl+C' }));
    setTimeout(() => {
      setCopyFeedback((prev) => ({ ...prev, [key]: null }));
    }, 1800);
  }, []);

  const pgnText = useMemo(() => {
    const tags = [
      ['Event', 'BSc Honours, Computer Science with AI'],
      ['Site', 'University of Alberta, Edmonton'],
      ['Date', '2024.??.??'],
      ['Round', '3'],
      ['White', 'Sethi, Raghav'],
      ['Black', '?'],
      ['Result', '*'],
      ['Opening', 'Sicilian Defense'],
      ['Variation', 'Najdorf'],
      ['ECO', 'B90']
    ];
    const head = tags.map((t) => '[' + t[0] + ' "' + t[1] + '"]').join('\n');
    const body = ROLES.map((r) => {
      const no = r.ply % 2 ? moveNo(r.ply) + '. ' : moveNo(r.ply) + '... ';
      return no + r.san + ' {' + r.title + ', ' + r.orgShort + ' (' + r.dates.replace(/–/g, '-') + ')}';
    }).join(' ');
    return head + '\n\n' + body + ' *\n';
  }, []);

  const movetextPlain = useMemo(() => {
    return ROLES.map((r) => (r.ply % 2 ? moveNo(r.ply) + '. ' : '') + r.san).join(' ') + ' *';
  }, []);

  // Board coordinate conversion and click handling
  const getBoardCoords = useCallback((e) => {
    if (!boardSvgRef.current) return null;
    const r = boardSvgRef.current.getBoundingClientRect();
    const vb = boardSvgRef.current.viewBox.baseVal;
    const s = Math.min(r.width / vb.width, r.height / vb.height);
    const ox = r.left + (r.width - vb.width * s) / 2;
    const oy = r.top + (r.height - vb.height * s) / 2;
    return {
      x: (e.clientX - ox) / s + vb.x,
      y: (e.clientY - oy) / s + vb.y
    };
  }, []);

  const isPointOnNextMove = useCallback((pt) => {
    if (!pt || !nextRole) return false;
    return [nextRole.from, nextRole.to].some((sq) => {
      const p = sqXY(sq);
      return pt.x >= p[0] * SQ && pt.x < (p[0] + 1) * SQ && pt.y >= p[1] * SQ && pt.y < (p[1] + 1) * SQ;
    });
  }, [nextRole]);

  const handleBoardClick = useCallback((e) => {
    const pt = getBoardCoords(e);
    if (isPointOnNextMove(pt)) {
      manual(ply + 1);
    }
  }, [getBoardCoords, isPointOnNextMove, manual, ply]);

  const handleBoardMouseMove = useCallback((e) => {
    if (!boardSvgRef.current) return;
    const pt = getBoardCoords(e);
    boardSvgRef.current.style.cursor = isPointOnNextMove(pt) ? 'pointer' : '';
  }, [getBoardCoords, isPointOnNextMove]);

  // Current snapshot piece mapping
  const currentSnap = SNAP[ply];

  return (
    <div className="najdorf-resume">
      {/* SVG symbols and gradients */}
      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="gGold" gradientUnits="userSpaceOnUse" x1="0" y1="8" x2="0" y2="92">
            <stop offset="0" stopColor="#f7ebb9" />
            <stop offset=".5" stopColor="#e2c869" />
            <stop offset="1" stopColor="#a8850c" />
          </linearGradient>
          <linearGradient id="gSteel" gradientUnits="userSpaceOnUse" x1="0" y1="8" x2="0" y2="92">
            <stop offset="0" stopColor="#f0f5fc" />
            <stop offset=".5" stopColor="#b3c5de" />
            <stop offset="1" stopColor="#6a7ea3" />
          </linearGradient>

          <symbol id="pc-p" viewBox="0 0 100 100">
            <path d="M22 91 H78 V85.5 Q78 81 73.5 81 H26.5 Q22 81 22 85.5 Z" />
            <path d="M27 81 H73 L69 74 H31 Z" />
            <path d="M33 74 H67 Q65 62 57 54 H43 Q35 62 33 74 Z" />
            <rect x="36.5" y="48.5" width="27" height="7" rx="3.5" />
            <circle cx="50" cy="35" r="12.5" />
          </symbol>

          <symbol id="pc-r" viewBox="0 0 100 100">
            <path d="M22 91 H78 V85.5 Q78 81 73.5 81 H26.5 Q22 81 22 85.5 Z" />
            <path d="M27 81 H73 L69 74 H31 Z" />
            <path d="M31 74 H69 L65.5 40 H34.5 Z" />
            <path d="M29 41 V24 H39 V31 H45 V24 H55 V31 H61 V24 H71 V41 Z" />
          </symbol>

          <symbol id="pc-n" viewBox="0 0 100 100">
            <path d="M22 91 H78 V85.5 Q78 81 73.5 81 H26.5 Q22 81 22 85.5 Z" />
            <path d="M27 81 H73 L69 74 H31 Z" />
            <path d="M50 74 Q27 74 27 74 Q27 74 27.5 68.5 Q28 63 32 59 Q36 55 40 52 Q44 49 40 49.5 Q36 50 31 52 Q26 54 22.5 52.5 Q19 51 18.5 47.5 Q18 44 21 40 Q24 36 28.5 31 Q33 26 37 22.5 Q41 19 42 13.5 Q43 8 43 8 Q43 8 46.5 12.5 Q50 17 53.5 19 Q57 21 61.5 27.5 Q66 34 69.5 43 Q73 52 73 63 Q73 74 73 74 Q73 74 50 74 Z" />
            <circle cx="34.5" cy="33" r="2.4" fill="currentColor" stroke="none" />
            <circle cx="22.5" cy="46" r="1.5" fill="currentColor" stroke="none" />
            <path d="M55 25 Q63 36 65 52" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".55" />
            <path d="M60 31 Q67 41 68.5 56" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".4" />
          </symbol>

          <symbol id="pc-b" viewBox="0 0 100 100">
            <path d="M22 91 H78 V85.5 Q78 81 73.5 81 H26.5 Q22 81 22 85.5 Z" />
            <path d="M27 81 H73 L69 74 H31 Z" />
            <path d="M41 66 H59 L63 74 H37 Z" />
            <rect x="36.5" y="59" width="27" height="7.5" rx="3.5" />
            <path d="M50 20 C63 30 67 43 61 54 C59.5 57 57 59.5 54 60.5 H46 C43 59.5 40.5 57 39 54 C33 43 37 30 50 20 Z" />
            <circle cx="50" cy="15" r="5.5" />
            <path d="M44.5 33 L55.5 45" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
          </symbol>

          <symbol id="pc-q" viewBox="0 0 100 100">
            <path d="M22 91 H78 V85.5 Q78 81 73.5 81 H26.5 Q22 81 22 85.5 Z" />
            <path d="M27 81 H73 L69 74 H31 Z" />
            <path d="M36 71 H64 L68 74 H32 Z" />
            <rect x="31.5" y="64" width="37" height="8" rx="3.5" />
            <path d="M24 30 L31 47 L36 26 L43 47 L50 22 L57 47 L64 26 L69 47 L76 30 L70 66 H30 Z" />
            <circle cx="24" cy="26.5" r="4" />
            <circle cx="36" cy="22.5" r="4" />
            <circle cx="50" cy="18.5" r="4.4" />
            <circle cx="64" cy="22.5" r="4" />
            <circle cx="76" cy="26.5" r="4" />
          </symbol>

          <symbol id="pc-k" viewBox="0 0 100 100">
            <path d="M22 91 H78 V85.5 Q78 81 73.5 81 H26.5 Q22 81 22 85.5 Z" />
            <path d="M27 81 H73 L69 74 H31 Z" />
            <path d="M36 71 H64 L68 74 H32 Z" />
            <rect x="31.5" y="63" width="37" height="8.5" rx="3.5" />
            <path d="M50 28 C66 28 75 37 73 49 C71.5 57 67 61 63 65 H37 C33 61 28.5 57 27 49 C25 37 34 28 50 28 Z" />
            <rect x="46.5" y="5" width="7" height="25" rx="1.8" />
            <rect x="39" y="11.5" width="22" height="7" rx="1.8" />
          </symbol>
        </defs>
      </svg>

      <div className="app">
        {/* Top Header */}
        <header className="top">
          <div className="intro">
            <p className="lab">
              <span className="e-fit">BSc Honours, Computer Science with AI · University of Alberta · 2024 – 2028</span>
              <span className="e-std">Resume · each role is a move</span>
            </p>
            <h1>Ten roles. One line.</h1>
          </div>
          <div className="tools">
            <div className="seg" role="tablist" aria-label="Resume view">
              <button
                type="button"
                role="tab"
                id="tab-board"
                className={view === 'board' ? 'act' : ''}
                aria-selected={view === 'board'}
                aria-controls="view-board"
                onClick={() => setView('board')}
              >
                Board
              </button>
              <button
                type="button"
                role="tab"
                id="tab-list"
                className={view === 'list' ? 'act' : ''}
                aria-selected={view === 'list'}
                aria-controls="view-list"
                onClick={() => {
                  pause();
                  setView('list');
                }}
              >
                List
              </button>
            </div>
            <a
              className="ext"
              href={LINKS.pdf}
              target="_blank"
              rel="noopener noreferrer"
              onError={(e) => {
                e.target.href = LINKS.fallbackPdf;
              }}
            >
              Resume PDF ↗
            </a>
          </div>
          <p className="lede">
            {view === 'board' ? (
              <span>The Najdorf Sicilian, played as a career. Each role is one move: press play, click the glowing piece, or pick a move.</span>
            ) : (
              <span>The full career progression rendered as individual cards: newest first, followed by education. Jump to any move on the board with one click.</span>
            )}
          </p>
        </header>

        {/* View Board */}
        {view === 'board' && (
          <main className="stage" id="view-board" role="tabpanel" aria-labelledby="tab-board">
            {/* Left Column: Board & Controls */}
            <div className="col-board">
              <div className="board-wrap">
                <svg
                  ref={boardSvgRef}
                  id="board"
                  className={`board ${isInstant ? 'instant' : ''} ${nextRole ? 'can-play' : ''}`}
                  viewBox="-55 -10 865 865"
                  role="img"
                  aria-label={ply === 0 ? 'Chess board, starting position' : `Chess board after ${label(ROLES[ply - 1])}`}
                  onClick={handleBoardClick}
                  onMouseMove={handleBoardMouseMove}
                >
                  {/* Squares */}
                  <g id="squares">
                    {Array.from({ length: 8 }).map((_, y) =>
                      Array.from({ length: 8 }).map((__, x) => (
                        <rect
                          key={`sq-${x}-${y}`}
                          className={`sq ${(x + y) % 2 === 0 ? 'l' : 'd'}`}
                          x={x * SQ}
                          y={y * SQ}
                          width={SQ}
                          height={SQ}
                          shapeRendering="crispEdges"
                        />
                      ))
                    )}
                    <rect className="frame" x="0" y="0" width={8 * SQ} height={8 * SQ} />
                  </g>

                  {/* Highlights */}
                  <g id="hl">
                    {ply > 0 && currentRole && (
                      <>
                        {(() => {
                          const pFrom = sqXY(currentRole.from);
                          return (
                            <rect
                              className="hl from"
                              x={pFrom[0] * SQ}
                              y={pFrom[1] * SQ}
                              width={SQ}
                              height={SQ}
                            />
                          );
                        })()}
                        {(() => {
                          const pTo = sqXY(currentRole.to);
                          return (
                            <rect
                              className="hl to"
                              x={pTo[0] * SQ}
                              y={pTo[1] * SQ}
                              width={SQ}
                              height={SQ}
                            />
                          );
                        })()}
                      </>
                    )}
                  </g>

                  {/* Coordinates */}
                  <g id="coords">
                    {FILES.split('').map((f, i) => (
                      <text key={`file-${f}`} className="co" x={i * SQ + SQ / 2} y={8 * SQ + 32} textAnchor="middle">
                        {f}
                      </text>
                    ))}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <text key={`rank-${8 - i}`} className="co" x="-26" y={i * SQ + SQ / 2 + 7} textAnchor="middle">
                        {8 - i}
                      </text>
                    ))}
                  </g>

                  {/* Pieces */}
                  <g id="pieces">
                    {SETUP.map((p) => {
                      const curSq = currentSnap[p.id];
                      const isCap = curSq === null;
                      const activeSq = isCap ? lastSq(p.id, ply) || p.sq : curSq;
                      const [x, y] = sqXY(activeSq);

                      return (
                        <g
                          key={p.id}
                          className={`pc ${p.c} ${isCap ? 'cap' : ''}`}
                          style={{
                            transform: `translate(${x * SQ}px, ${y * SQ}px)`
                          }}
                        >
                          <g className="pc-in">
                            <use href={`#pc-${p.t}`} width={SQ} height={SQ} />
                          </g>
                        </g>
                      );
                    })}
                  </g>

                  {/* Marks (arrow and ring for next move) */}
                  <g id="marks" pointerEvents="none">
                    {nextRole && (() => {
                      const a = sqXY(nextRole.from);
                      const b = sqXY(nextRole.to);
                      const ax = a[0] * SQ + SQ / 2;
                      const ay = a[1] * SQ + SQ / 2;
                      const bx = b[0] * SQ + SQ / 2;
                      const by = b[1] * SQ + SQ / 2;
                      const dx = bx - ax;
                      const dy = by - ay;
                      const len = Math.hypot(dx, dy);
                      const ux = dx / len;
                      const uy = dy / len;
                      const sx = ax + ux * 40;
                      const sy = ay + uy * 40;
                      const tx = bx - ux * 10;
                      const ty = by - uy * 10;
                      const cx = tx - ux * 34;
                      const cy = ty - uy * 34;
                      const px = -uy;
                      const py = ux;

                      return (
                        <>
                          <g className="arrow-g">
                            <line className="arrow-shaft" x1={sx.toFixed(1)} y1={sy.toFixed(1)} x2={cx.toFixed(1)} y2={cy.toFixed(1)} />
                            <polygon
                              className="arrow-head"
                              points={`${tx.toFixed(1)},${ty.toFixed(1)} ${(cx + px * 25).toFixed(1)},${(cy + py * 25).toFixed(1)} ${(cx - px * 25).toFixed(1)},${(cy - py * 25).toFixed(1)}`}
                            />
                          </g>
                          <circle className="ring" cx={ax} cy={ay} r={46} />
                        </>
                      );
                    })()}
                  </g>
                </svg>
              </div>

              {/* Playback Controls */}
              <div className="controls" role="group" aria-label="Playback">
                <p className="status" id="status" aria-live="polite">
                  {ply === 0 ? 'Start' : `Ply ${ply} of ${N} · ${label(ROLES[ply - 1])}`}
                </p>
                <div className="btns">
                  <button
                    type="button"
                    className="ib"
                    id="b-first"
                    aria-label="Go to the starting position"
                    disabled={ply === 0}
                    onClick={() => manual(0)}
                  >
                    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 2h2v12H2zM14 2v12L5.5 8z" /></svg>
                  </button>
                  <button
                    type="button"
                    className="ib"
                    id="b-prev"
                    aria-label="Previous move"
                    disabled={ply === 0}
                    onClick={() => manual(ply - 1)}
                  >
                    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M12 2v12L4 8z" /></svg>
                  </button>
                  <button
                    type="button"
                    className="play"
                    id="b-play"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <>
                        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 2h4v12H3zM9 2h4v12H9z" /></svg>
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2v12l9-6z" /></svg>
                        <span>{ply === 0 ? 'Play the game' : ply === N ? 'Replay' : 'Play on'}</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="ib"
                    id="b-next"
                    aria-label="Next move"
                    disabled={ply === N}
                    onClick={() => manual(ply + 1)}
                  >
                    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2v12l8-6z" /></svg>
                  </button>
                  <button
                    type="button"
                    className="ib"
                    id="b-last"
                    aria-label="Go to the last move"
                    disabled={ply === N}
                    onClick={() => manual(N)}
                  >
                    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M12 2h2v12h-2zM2 2v12l8.5-6z" /></svg>
                  </button>
                </div>
              </div>
              <div className="bar" ref={barRef} id="bar" aria-hidden="true">
                <i></i>
              </div>
            </div>

            {/* Middle Column: Scoresheet & Game details */}
            <div className="col-moves">
              <section className="sheet" aria-label="Scoresheet">
                <div className="sheet-head">
                  <span className="lab">Scoresheet</span>
                  <span className="lab legend">White gold · Black steel</span>
                  <button
                    type="button"
                    className="mini pgn-btn"
                    onClick={() => handleCopy(pgnText, 'pgn-head')}
                  >
                    {copyFeedback['pgn-head'] || 'Copy PGN'}
                  </button>
                </div>
                <ol className="rows" ref={rowsRef} id="rows">
                  {ROLES.map((r) => {
                    const isCur = r.ply === ply;
                    const isLater = r.ply > ply;
                    return (
                      <li key={r.ply}>
                        <button
                          type="button"
                          className={`mv ${side(r.ply)} ${isCur ? 'cur' : ''} ${isLater ? 'later' : ''}`}
                          data-ply={r.ply}
                          title={r.title}
                          aria-current={isCur ? 'true' : 'false'}
                          aria-label={`${label(r)}, ${r.title}, ${r.orgShort}`}
                          onClick={() => manual(r.ply)}
                        >
                          <span className="no">{moveNo(r.ply) + (r.ply % 2 ? '.' : '…')}</span>
                          <span className="san">{r.san}</span>
                          <span className="who">{r.short}</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </section>

              {/* Game Header (PGN) */}
              <details className="pgn" id="pgn">
                <summary>
                  <span className="lab">Game header</span>
                  <span className="lab">PGN · ECO B90</span>
                </summary>
                <dl className="tagsgrid">
                  <div><dt>Event</dt><dd>BSc Honours, Computer Science with AI</dd></div>
                  <div><dt>Site</dt><dd>University of Alberta, Edmonton</dd></div>
                  <div><dt>Date</dt><dd>2024 – 2028</dd></div>
                  <div><dt>Round</dt><dd>3 <small>third year</small></dd></div>
                  <div><dt>Opening</dt><dd>Sicilian Defense, Najdorf</dd></div>
                  <div><dt>Result</dt><dd>* <small>game in progress</small></dd></div>
                </dl>
                <div className="movetext">
                  <code id="movetext">{movetextPlain}</code>
                  <button
                    type="button"
                    className="mini"
                    id="b-copy-pgn"
                    onClick={() => handleCopy(pgnText, 'pgn-body')}
                  >
                    {copyFeedback['pgn-body'] || 'Copy PGN'}
                  </button>
                </div>
              </details>
            </div>

            {/* Right Column: Role Card */}
            <article className="card" id="card" aria-live="polite">
              {ply === 0 ? (
                <div className="card-in">
                  <p className="lab">Starting position</p>
                  <h2>Before the first move</h2>
                  <p className="note">Ten roles, oldest first. Press play, or click the glowing pawn on e2.</p>
                  <button
                    type="button"
                    className="link"
                    onClick={() => manual(START_PLY)}
                  >
                    Skip to the latest work
                  </button>
                </div>
              ) : currentRole && (
                <div className="card-in" key={currentRole.ply}>
                  <div className="meta">
                    <span className="lab">
                      <span className={`wb-${side(currentRole.ply)}`}>{label(currentRole)}</span>
                      <span className="ply-of"> · Ply {currentRole.ply} of {N}</span>
                    </span>
                    <span className="lab">{currentRole.dates}</span>
                  </div>
                  <h2>{currentRole.title}</h2>
                  <p className="org">{currentRole.org}</p>
                  <p className="note">{currentRole.note}</p>
                  <p className="sum">{currentRole.sum}</p>

                  {/* Stats / Figures */}
                  {currentRole.figs.length > 0 && (
                    <ul className="figs">
                      {currentRole.figs.map((f, i) => (
                        <li key={i}>
                          <b>{f[0]}</b>
                          <span>{f[1]}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Bullet Highlights / Details */}
                  <div className="role-body">
                    <ul className="bul">
                      {(isExpanded ? currentRole.bullets : currentRole.pick.map((idx) => currentRole.bullets[idx])).map((text, i) => (
                        <li key={i}>{text}</li>
                      ))}
                    </ul>

                    {currentRole.bullets.length > currentRole.pick.length && (
                      <button
                        type="button"
                        className="link mt-2 block"
                        id="b-more"
                        aria-expanded={isExpanded}
                        onClick={() => setIsExpanded((prev) => !prev)}
                      >
                        {isExpanded ? 'Show fewer' : `Show all ${currentRole.bullets.length} bullets`}
                      </button>
                    )}

                    {currentRole.tags.length > 0 && (
                      <div className="tags mt-3">
                        {currentRole.tags.map((t) => (
                          <span key={t} className="tag">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Navigation Footer */}
                  <div className="nav">
                    <button
                      type="button"
                      disabled={ply <= 1}
                      onClick={() => manual(ply - 1)}
                    >
                      ← Earlier role
                    </button>
                    <button
                      type="button"
                      disabled={ply >= N}
                      onClick={() => manual(ply + 1)}
                    >
                      Later role →
                    </button>
                  </div>
                </div>
              )}
            </article>
          </main>
        )}

        {/* View List: Elevated Cards without harsh dividing lines */}
        {view === 'list' && (
          <main id="view-list" role="tabpanel" aria-labelledby="tab-list">
            <div className="list" id="list">
              {ROLES.slice().reverse().map((r) => (
                <article key={r.ply} className="entry-card">
                  {/* Card Top: Badges and Jump to Board button */}
                  <div className="entry-top">
                    <div className="entry-badges">
                      <span className={`entry-move-pill ${side(r.ply)}`}>
                        {label(r)}
                      </span>
                      <span className="entry-date">{r.dates}</span>
                    </div>

                    <button
                      type="button"
                      className="entry-board-btn"
                      onClick={() => {
                        setView('board');
                        manual(r.ply);
                        window.setTimeout(() => {
                          document.getElementById('view-board')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 50);
                      }}
                    >
                      <span>Show on board</span>
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  {/* Title & Organization */}
                  <div className="entry-header">
                    <h3>{r.title}</h3>
                    <p className="entry-org">{r.org}</p>
                  </div>

                  {/* Chess Metaphor */}
                  <p className="entry-note">“{r.note}”</p>

                  {/* Summary */}
                  <p className="entry-sum">{r.sum}</p>

                  {/* Figures if available */}
                  {r.figs.length > 0 && (
                    <ul className="entry-figs">
                      {r.figs.map((f, i) => (
                        <li key={i}>
                          <b>{f[0]}</b>
                          <span>{f[1]}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Bullets */}
                  <ul className="entry-bullets">
                    {r.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>

                  {/* Tech Tags */}
                  {r.tags.length > 0 && (
                    <div className="tags">
                      {r.tags.map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                  )}
                </article>
              ))}

              {/* Education Card */}
              <article className="entry-card entry-education">
                <div className="entry-top">
                  <div className="entry-badges">
                    <span className="entry-move-pill w">Education</span>
                    <span className="entry-date">2024 – 2028</span>
                  </div>
                </div>

                <div className="entry-header">
                  <h3>BSc Honours in Computer Science with Artificial Intelligence</h3>
                  <p className="entry-org">University of Alberta</p>
                </div>

                <p className="entry-sum">
                  Studying software engineering, machine learning and systems design through practical projects and research-driven work.
                </p>
              </article>
            </div>
          </main>
        )}
      </div>
    </div>
  );
};

export default React.memo(NajdorfResume);
