import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './SkillsHUD.css';

const C = 500;
const PDF_URL = `${process.env.PUBLIC_URL || ''}/assets/Raghav_Sethi_Resume.pdf`;
const FALLBACK_PDF = 'https://portfolio-raghavsethi006.vercel.app/assets/Raghav_Sethi_Resume.pdf';

const rad = (d) => (d * Math.PI) / 180;
const pol = (r, a) => [C + r * Math.cos(rad(a)), C + r * Math.sin(rad(a))];
const f1 = (n) => Math.round(n * 10) / 10;

const SECTORS_RAW = [
  { id: 'lang', name: 'Languages', rim: 'LANGUAGES' },
  { id: 'front', name: 'Frontend', rim: 'FRONTEND' },
  { id: 'back', name: 'Backend', rim: 'BACKEND' },
  { id: 'desk', name: 'Desktop', rim: 'DESKTOP' },
  { id: 'ai', name: 'AI / Machine Learning', rim: 'AI / ML' },
  { id: 'data', name: 'Databases & Cloud', rim: 'DATA & CLOUD' },
  { id: 'tools', name: 'Tools & Deployment', rim: 'TOOLS' }
];

const SKILLS_RAW = [
  ['python', 'Python', 'Python', 'lang', 'd'],
  ['typescript', 'TypeScript', 'TypeScript', 'lang', 'd'],
  ['rust', 'Rust', 'Rust', 'lang', 'd'],
  ['javascript', 'JavaScript', 'JavaScript', 'lang', 't'],
  ['cpp', 'C++', 'C++', 'lang', 't'],
  ['csharp', 'C#', 'C#', 'lang', 't'],
  ['c', 'C', 'C', 'lang', 't'],
  ['kotlin', 'Kotlin', 'Kotlin', 'lang', 't'],
  ['react', 'React', 'React', 'front', 'd'],
  ['tailwind', 'Tailwind CSS', 'Tailwind', 'front', 'd'],
  ['html', 'HTML', 'HTML', 'front', 't'],
  ['css', 'CSS', 'CSS', 'front', 't'],
  ['angular', 'Angular', 'Angular', 'front', 't'],
  ['bootstrap', 'Bootstrap', 'Bootstrap', 'front', 't'],
  ['reactnative', 'React Native', 'React Native', 'front', 't'],
  ['streamlit', 'Streamlit', 'Streamlit', 'front', 't'],
  ['node', 'Node.js', 'Node.js', 'back', 'd'],
  ['fastapi', 'FastAPI', 'FastAPI', 'back', 'd'],
  ['express', 'Express', 'Express', 'back', 't'],
  ['django', 'Django', 'Django', 'back', 't'],
  ['tauri', 'Tauri', 'Tauri', 'desk', 'd'],
  ['electron', 'Electron', 'Electron', 'desk', 't'],
  ['tkinter', 'Tkinter', 'Tkinter', 'desk', 't'],
  ['rag', 'RAG pipelines', 'RAG', 'ai', 'd'],
  ['agents', 'Agents and tool calling', 'Agents', 'ai', 'd'],
  ['opencv', 'OpenCV', 'OpenCV', 'ai', 't'],
  ['tensorflow', 'TensorFlow', 'TensorFlow', 'ai', 't'],
  ['sklearn', 'scikit-learn', 'scikit-learn', 'ai', 't'],
  ['faiss', 'FAISS', 'FAISS', 'ai', 't'],
  ['hf', 'HuggingFace', 'HuggingFace', 'ai', 't'],
  ['chroma', 'ChromaDB', 'ChromaDB', 'ai', 't'],
  ['mediapipe', 'MediaPipe', 'MediaPipe', 'ai', 't'],
  ['ollama', 'Ollama', 'Ollama', 'ai', 't'],
  ['gemini', 'Gemini API', 'Gemini', 'ai', 't'],
  ['sql', 'SQL', 'SQL', 'data', 'd'],
  ['sqlite', 'SQLite', 'SQLite', 'data', 'd'],
  ['postgres', 'PostgreSQL', 'Postgres', 'data', 't'],
  ['mysql', 'MySQL', 'MySQL', 'data', 't'],
  ['mongodb', 'MongoDB', 'MongoDB', 'data', 't'],
  ['firebase', 'Firebase', 'Firebase', 'data', 't'],
  ['supabase', 'Supabase', 'Supabase', 'data', 't'],
  ['aws', 'AWS', 'AWS', 'data', 't'],
  ['git', 'Git', 'Git', 'tools', 'd'],
  ['github', 'GitHub', 'GitHub', 'tools', 'd'],
  ['gitlab', 'GitLab', 'GitLab', 'tools', 't'],
  ['vercel', 'Vercel', 'Vercel', 'tools', 't'],
  ['blender', 'Blender', 'Blender', 'tools', 't']
];

const GH = 'https://github.com/RaghavSethi006/';
const EVID = [
  { kind: 'build', name: 'Jarvis', line: 'Local-first multi-agent desktop assistant with four-tier memory, neural voice and face auth.', skills: ['python', 'react', 'chroma', 'agents'], links: [['Source', GH + 'jarvis']] },
  { kind: 'build', name: 'Career Co-Pilot', line: 'Career intelligence system with RAG resume tailoring and 12 API routes.', skills: ['react', 'typescript', 'fastapi', 'python', 'gemini', 'rag'], links: [['Source', GH + 'Career-Co-Pilot']] },
  { kind: 'build', name: 'TaskArena v2', line: 'AI study companion that chats with your own lecture slides.', skills: ['react', 'typescript', 'tauri', 'fastapi', 'python', 'rag'], links: [['Source', GH + 'TaskArena2.0']] },
  { kind: 'build', name: 'FinOS', line: 'Local-first financial operating system with AES-256 encryption.', skills: ['react', 'typescript', 'tauri', 'sqlite'], links: [['Source', GH + 'FinOS']] },
  { kind: 'build', name: 'Local Eco', line: 'Cloudless, end-to-end encrypted chat over WebRTC with host migration.', skills: ['react', 'typescript', 'tailwind', 'vercel'], links: [['Demo', 'https://off-grid-networking.vercel.app/'], ['Source', GH + 'local-echo']] },
  { kind: 'build', name: 'Open Photos', line: 'Self-hosted desktop photo manager with face recognition and duplicate cleanup.', skills: ['tauri', 'rust', 'react', 'typescript', 'tailwind'], links: [] },
  { kind: 'build', name: 'Targets', line: 'Habit tracker, calendar and to-do list unified by smart recurrence rules.', skills: ['reactnative', 'typescript', 'fastapi', 'python'], links: [] },
  { kind: 'build', name: 'FitPulse', line: 'Native Android fitness app with Gemini food-plate vision and voice coaching.', skills: ['kotlin', 'gemini', 'sqlite'], links: [['Source', GH + 'Fitpulse-']] },
  { kind: 'build', name: 'Schema Spark', line: 'Visual ER modeling that generates backend code for five frameworks.', skills: ['react', 'typescript', 'vercel'], links: [['Demo', 'https://schema-spark-sigma.vercel.app/'], ['Source', GH + 'schema-spark']] },
  { kind: 'build', name: 'multi-style', line: 'Cross-framework UI component playground with code export.', skills: ['react', 'typescript', 'tailwind', 'vercel'], links: [['Demo', 'https://multi-style.vercel.app/'], ['Source', GH + 'multi-style']] },
  { kind: 'build', name: 'RageBait-AI', line: 'Cognitive reaction engine with Gemini trash-talk, Firestore leaderboards and a Blind Mode.', skills: ['react', 'gemini', 'firebase', 'vercel'], links: [['Demo', 'https://rage-bait-ai-mpx6.vercel.app/'], ['Source', GH + 'RageBait-AI']] },
  { kind: 'build', name: 'Face Recognition Attendance', line: 'OpenCV LBPH attendance system with SQLite and a Tkinter interface.', skills: ['python', 'opencv', 'sqlite', 'tkinter'], links: [['Source', GH + 'Face-Recognition-attendance-system-']] },
  { kind: 'build', name: 'ZenOS', line: 'Focus shell that reduces the desktop to a timer, an allow-listed browser and the apps you need.', skills: ['tauri', 'rust', 'react', 'typescript'], links: [['Source', GH + 'zenos']] },
  { kind: 'role', name: 'UAIS Project Lead', line: 'AI-native desktop shell on Tauri, Rust, React and FastAPI with an agentic tool-calling layer.', skills: ['tauri', 'react', 'typescript', 'rust', 'fastapi', 'python', 'sqlite', 'mediapipe', 'ollama', 'agents', 'git'] },
  { kind: 'role', name: 'UAIS VP of Technology', line: 'Runs the club’s GitHub organization and AWS infrastructure.', skills: ['aws', 'github'] },
  { kind: 'role', name: 'UAIS AI Engineer', line: 'RAG data pipelines for the ClubMate initiative.', skills: ['rag'] },
  { kind: 'role', name: 'Safe Lanes intern', line: 'Retrieval-augmented chatbot with HuggingFace, FAISS and Streamlit.', skills: ['rag', 'hf', 'faiss', 'streamlit'] },
  { kind: 'role', name: 'Markaz intern', line: 'Python reporting pipeline that produces personalized client scorecards.', skills: ['python'] },
  { kind: 'about', name: 'Core stack', line: 'From the About section: “I work primarily with Python, React, and Node.js,” with SQL and Tailwind in the technical discipline list.', skills: ['python', 'react', 'node', 'sql', 'tailwind'] }
];

// Precompute Sector and Skill Geometry
const TH = 360 / SECTORS_RAW.length;
const SECTORS = SECTORS_RAW.map((s, i) => {
  const a0 = -90 - TH / 2 + i * TH;
  const a1 = a0 + TH;
  const mid = a0 + TH / 2;
  return { ...s, a0, a1, mid };
});

const SECT_MAP = {};
SECTORS.forEach((s) => { SECT_MAP[s.id] = s; });

const SKILLS = SKILLS_RAW.map((a, i) => ({
  id: a[0],
  name: a[1],
  short: a[2],
  sector: a[3],
  tier: a[4],
  idx: i
}));

const BY = {};
SKILLS.forEach((s) => { BY[s.id] = s; });

const USES = {};
const PAIR = {};
SKILLS.forEach((s) => {
  USES[s.id] = [];
  PAIR[s.id] = {};
});

EVID.forEach((e) => {
  e.skills.forEach((a) => {
    if (USES[a]) {
      USES[a].push(e);
      e.skills.forEach((b) => {
        if (a !== b) PAIR[a][b] = (PAIR[a][b] || 0) + 1;
      });
    }
  });
});

const nUses = (s) => (USES[s.id] || []).filter((e) => e.kind !== 'about').length;
const proven = (s) => (USES[s.id] || []).length > 0;
const RINGS = { d: [214, 248], t: [322, 356, 390] };

SECTORS.forEach((sec) => {
  ['d', 't'].forEach((tier) => {
    const list = SKILLS.filter((s) => s.sector === sec.id && s.tier === tier);
    const m = 5, span = TH - 2 * m;
    list.forEach((s, k) => {
      s.angle = sec.a0 + m + (k + 0.5) * span / list.length;
      s.r = RINGS[tier][k % RINGS[tier].length];
      const p = pol(s.r, s.angle);
      s.x = p[0];
      s.y = p[1];
    });
  });
});

SKILLS.forEach((s) => {
  s.dotR = s.tier === 'd' ? 5.5 + 1.5 * Math.sqrt(nUses(s)) : 4 + 1.2 * Math.sqrt(nUses(s));
});

const linksOf = (id) =>
  Object.keys(PAIR[id] || {})
    .sort((a, b) => (PAIR[id][b] - PAIR[id][a]) || (BY[a].tier === BY[b].tier ? BY[a].idx - BY[b].idx : (BY[a].tier === 'd' ? -1 : 1)))
    .slice(0, 6);

const dailyCount = SKILLS.filter((s) => s.tier === 'd').length;

const annular = (r0, r1, a0, a1) => {
  const p0 = pol(r1, a0), p1 = pol(r1, a1), p2 = pol(r0, a1), p3 = pol(r0, a0);
  const lg = a1 - a0 > 180 ? 1 : 0;
  return (
    'M' + f1(p0[0]) + ' ' + f1(p0[1]) +
    'A' + r1 + ' ' + r1 + ' 0 ' + lg + ' 1 ' + f1(p1[0]) + ' ' + f1(p1[1]) +
    'L' + f1(p2[0]) + ' ' + f1(p2[1]) +
    'A' + r0 + ' ' + r0 + ' 0 ' + lg + ' 0 ' + f1(p3[0]) + ' ' + f1(p3[1]) +
    'Z'
  );
};

const FULL_CAM = { x: 0, y: 0, w: 1000 };

const SkillsHUD = () => {
  const [view, setView] = useState('hud'); // 'hud' | 'list'
  const [activeSector, setActiveSector] = useState(null);
  const [activeSkill, setActiveSkill] = useState(null);
  const [backSector, setBackSector] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, skill: null });

  const radarRef = useRef(null);
  const hudRef = useRef(null);
  const sweepRef = useRef(null);
  const pulseRef = useRef(null);
  const nodesHaloRef = useRef({});
  const labelRefs = useRef({});

  const camCurrent = useRef({ ...FULL_CAM });
  const camTarget = useRef({ ...FULL_CAM });
  const camRaf = useRef(0);

  // Sweep animation refs
  const sweepAngle = useRef(-64);
  const sweepAim = useRef(null);
  const sweepHold = useRef(0);
  const pulseAnim = useRef(null);
  const prevTime = useRef(performance.now());
  const lastPing = useRef({});

  const smallScreen = useCallback(() => {
    return (radarRef.current?.clientWidth || 500) < 520;
  }, []);

  const fontUnits = useCallback((camW) => {
    const clientW = radarRef.current?.clientWidth || 500;
    return Math.min(30, Math.max(8, (smallScreen() ? 11.5 : 12) * camW / clientW));
  }, [smallScreen]);

  const updateRadarScale = useCallback(() => {
    if (!radarRef.current) return;
    const w = radarRef.current.clientWidth || 500;
    const ppu = w / camCurrent.current.w;
    const fl = fontUnits(camCurrent.current.w);
    radarRef.current.style.setProperty('--fs-label', f1(fl) + 'px');
    radarRef.current.style.setProperty('--fs-sector', f1(Math.min(26, Math.max(12, 10.5 / ppu))) + 'px');
    radarRef.current.style.setProperty('--sw', f1(fl * 0.38) + 'px');
  }, [fontUnits]);

  const applyCamera = useCallback(() => {
    if (!radarRef.current) return;
    const c = camCurrent.current;
    radarRef.current.setAttribute('viewBox', `${f1(c.x)} ${f1(c.y)} ${f1(c.w)} ${f1(c.w)}`);
    updateRadarScale();
  }, [updateRadarScale]);

  const flyTo = useCallback((target, ms = 800) => {
    camTarget.current = target;
    cancelAnimationFrame(camRaf.current);
    if (!ms) {
      camCurrent.current = { ...target };
      applyCamera();
      return;
    }
    const from = { ...camCurrent.current };
    const t0 = performance.now();
    const step = (now) => {
      const k = Math.min(1, (now - t0) / ms);
      const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      camCurrent.current = {
        x: from.x + (target.x - from.x) * e,
        y: from.y + (target.y - from.y) * e,
        w: from.w + (target.w - from.w) * e
      };
      applyCamera();
      if (k < 1) camRaf.current = requestAnimationFrame(step);
    };
    camRaf.current = requestAnimationFrame(step);
  }, [applyCamera]);

  const scanFx = useCallback((targetAngle) => {
    const cur = sweepAngle.current;
    const delta = (((targetAngle - cur) % 360) + 360) % 360;
    sweepAim.current = { from: cur, delta, t0: performance.now(), dur: 650 + delta * 2 };
    sweepHold.current = 0;
    pulseAnim.current = { t0: performance.now() };
  }, []);

  const viewRef = useRef(view);
  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  const handleSetView = useCallback((nextView) => {
    viewRef.current = nextView;
    if (nextView !== 'hud') {
      cancelAnimationFrame(camRaf.current);
    }
    setView(nextView);
  }, []);

  // Frame animation loop
  useEffect(() => {
    let animId;
    const SPEED = 360 / 15000;

    const loop = (now) => {
      const dt = Math.min(50, now - prevTime.current);
      prevTime.current = now;

      if (viewRef.current !== 'hud' || !radarRef.current) {
        animId = requestAnimationFrame(loop);
        return;
      }

      if (sweepAim.current) {
        const k = Math.min(1, (now - sweepAim.current.t0) / sweepAim.current.dur);
        sweepAngle.current = sweepAim.current.from + sweepAim.current.delta * (1 - Math.pow(1 - k, 3));
        if (k >= 1) {
          sweepAim.current = null;
          sweepHold.current = 1500;
        }
      } else if (sweepHold.current > 0) {
        sweepHold.current -= dt;
      } else {
        sweepAngle.current += dt * SPEED;
      }

      if (pulseAnim.current && pulseRef.current) {
        const k = (now - pulseAnim.current.t0) / 950;
        if (k >= 1) {
          pulseAnim.current = null;
          pulseRef.current.setAttribute('opacity', '0');
        } else {
          pulseRef.current.setAttribute('r', f1(100 + 330 * k));
          pulseRef.current.setAttribute('opacity', f1(0.55 * (1 - k)));
        }
      }

      if (sweepRef.current) {
        sweepRef.current.setAttribute(
          'transform',
          `rotate(${f1(((sweepAngle.current % 360) + 360) % 360)} 500 500)`
        );
      }

      // Halos ping on sweep crossing
      SKILLS.forEach((s) => {
        const d = (((sweepAngle.current - s.angle) % 360) + 360) % 360;
        const v = d < 60 ? Math.round((1 - d / 60) * 50) / 50 : 0;
        if (lastPing.current[s.id] !== v) {
          lastPing.current[s.id] = v;
          const node = nodesHaloRef.current[s.id];
          if (node) node.style.opacity = v;
        }
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const sectorCam = useCallback((sec) => {
    const w = 1000 / (smallScreen() ? 2.35 : 2.1);
    const p = pol(300, sec.mid);
    return { x: p[0] - w / 2, y: p[1] - w / 2, w };
  }, [smallScreen]);

  const fitCam = useCallback((ids) => {
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    ids.forEach((id) => {
      const p = BY[id];
      if (p) {
        x0 = Math.min(x0, p.x);
        y0 = Math.min(y0, p.y);
        x1 = Math.max(x1, p.x);
        y1 = Math.max(y1, p.y);
      }
    });
    const w = Math.max(smallScreen() ? 420 : 380, Math.max(x1 - x0, y1 - y0) * 1.45 + 160);
    if (w > 760) return FULL_CAM;
    return { x: (x0 + x1) / 2 - w / 2, y: (y0 + y1) / 2 - w / 2, w };
  }, [smallScreen]);

  // Actions
  const handleOverview = useCallback((instant = false) => {
    setActiveSector(null);
    setActiveSkill(null);
    setBackSector(null);
    setHoveredSkill(null);
    setTooltip({ visible: false, x: 0, y: 0, skill: null });
    flyTo(FULL_CAM, instant ? 0 : 800);
    if (!instant) scanFx(sweepAngle.current);
  }, [flyTo, scanFx]);

  const handleSelectSector = useCallback((id, instant = false) => {
    const sec = SECT_MAP[id];
    if (!sec) return;
    setActiveSector(id);
    setActiveSkill(null);
    setBackSector(null);
    setHoveredSkill(null);
    setTooltip({ visible: false, x: 0, y: 0, skill: null });
    flyTo(sectorCam(sec), instant ? 0 : 850);
    scanFx(sec.mid);
  }, [flyTo, scanFx, sectorCam]);

  const handleSelectSkill = useCallback((id, instant = false) => {
    if (!activeSkill) {
      setBackSector(activeSector);
    }
    setActiveSkill(id);
    setActiveSector(null);
    setHoveredSkill(null);
    setTooltip({ visible: false, x: 0, y: 0, skill: null });
    flyTo(fitCam([id].concat(linksOf(id))), instant ? 0 : 850);
    if (!instant) scanFx(BY[id]?.angle || 0);
  }, [activeSkill, activeSector, fitCam, scanFx]);

  const handleGoBack = useCallback(() => {
    if (activeSkill) {
      const prev = backSector;
      setActiveSkill(null);
      if (prev) handleSelectSector(prev);
      else handleOverview();
    } else if (activeSector) {
      handleOverview();
    }
  }, [activeSkill, backSector, activeSector, handleSelectSector, handleOverview]);

  // Tooltip / Hover handlers
  const handleHover = useCallback((id, fromNode = false) => {
    setHoveredSkill(id);
    if (!id || !fromNode || !hudRef.current) {
      setTooltip({ visible: false, x: 0, y: 0, skill: null });
      return;
    }
    const s = BY[id];
    if (!s) return;

    const dot = document.querySelector(`.node[data-id="${id}"] .dot`);
    if (!dot) return;

    const nr = dot.getBoundingClientRect();
    const hr = hudRef.current.getBoundingClientRect();
    let x = nr.left + nr.width / 2 - hr.left;
    let y = nr.top - hr.top - 10;

    setTooltip({
      visible: true,
      x,
      y,
      skill: s
    });
  }, []);

  // Keyboard escape
  useEffect(() => {
    const onKey = (e) => {
      if (view === 'hud' && e.key === 'Escape') handleGoBack();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view, handleGoBack]);

  // Re-layout on resize
  useEffect(() => {
    const onResize = () => {
      updateRadarScale();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateRadarScale]);

  // Active links list
  const activeLinks = useMemo(() => {
    return activeSkill ? linksOf(activeSkill) : [];
  }, [activeSkill]);

  const activeSectorObj = activeSkill ? BY[activeSkill]?.sector : activeSector;
  const dailySkills = useMemo(() => SKILLS.filter((s) => s.tier === 'd'), []);
  const dailyCount = dailySkills.length;

  // Search filtered systems in list view
  const filteredList = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let totalMatches = 0;

    const systems = SECTORS.map((sec) => {
      const list = SKILLS.filter((s) => s.sector === sec.id);
      const bySystem = !q || sec.name.toLowerCase().includes(q);

      const dMatches = list.filter((s) => s.tier === 'd' && (bySystem || s.name.toLowerCase().includes(q) || s.short.toLowerCase().includes(q) || (USES[s.id] || []).some((e) => e.name.toLowerCase().includes(q))));
      const tMatches = list.filter((s) => s.tier === 't' && (bySystem || s.name.toLowerCase().includes(q) || s.short.toLowerCase().includes(q) || (USES[s.id] || []).some((e) => e.name.toLowerCase().includes(q))));

      const matchesCount = dMatches.length + tMatches.length;
      totalMatches += matchesCount;

      return {
        sec,
        allSkills: list,
        dMatches,
        tMatches,
        hasMatches: matchesCount > 0
      };
    });

    return { systems, totalMatches };
  }, [searchQuery]);

  return (
    <section
      id="skills"
      className="py-20 lg:py-24 relative border-y border-[#1A2744]/50 scroll-mt-24"
      style={{
        background: '#050A18',
        backgroundImage: `linear-gradient(rgba(200,216,240,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(200,216,240,0.022) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="skills-hud">
          <div className="app">
        {/* Header */}
        <header className="top">
          <div className="intro">
            <p className="lab" id="eyebrow">
              Technical skills · {SKILLS.length} nodes, {SECTORS.length} systems
            </p>
            <h1>Scan the stack.</h1>
          </div>
          <div className="tools">
            <div className="seg" role="tablist" aria-label="Skills view">
              <button
                type="button"
                role="tab"
                id="skills-tab-hud"
                className={view === 'hud' ? 'act' : ''}
                aria-selected={view === 'hud'}
                aria-controls="skills-view-hud"
                onClick={() => handleSetView('hud')}
              >
                HUD
              </button>
              <button
                type="button"
                role="tab"
                id="skills-tab-list"
                className={view === 'list' ? 'act' : ''}
                aria-selected={view === 'list'}
                aria-controls="skills-view-list"
                onClick={() => handleSetView('list')}
              >
                List
              </button>
            </div>
            <a
              className="ext"
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              onError={(e) => {
                e.target.href = FALLBACK_PDF;
              }}
            >
              Resume PDF ↗
            </a>
          </div>
          <p className="lede">
            {view === 'hud' ? (
              <span>
                <i className="kd k-d"></i>Daily driver, inner orbit
                <span className="sep">·</span>
                <i className="kd k-t"></i>Toolbox, outer orbit
                <span className="sep">·</span>
                <i className="kd k-u"></i>No build linked yet
                <span className="sep">·</span>
                Bigger dot, more builds. <b>Pick a dot</b> to trace what it powers, or <b>a wedge</b> to zoom in.
              </span>
            ) : (
              <span>
                <i className="kd k-d"></i>Gold chips are daily drivers
                <span className="sep">·</span>
                <i className="kd k-u"></i>dashed chips have no build linked yet
                <span className="sep">·</span>
                ×N counts the builds and roles that use a skill. <b>Pick any skill</b> to trace it on the radar.
              </span>
            )}
          </p>
        </header>

        {/* View HUD */}
        {view === 'hud' && (
          <main className="stage" id="skills-view-hud" role="tabpanel" aria-labelledby="skills-tab-hud">
            {/* Left Column: Radar */}
            <section className="radar-col" aria-label="Skill radar">
              <div className="hud" id="hud" ref={hudRef}>
                <svg
                  ref={radarRef}
                  id="radar"
                  viewBox="0 0 1000 1000"
                  data-mode={activeSkill ? 'skill' : activeSector ? 'sector' : 'overview'}
                  role="group"
                  aria-label="Skill radar. Seven systems, daily drivers on the inner orbit, toolbox on the outer orbit."
                >
                  <defs>
                    <radialGradient id="gPlate" cx="50%" cy="50%" r="50%">
                      <stop offset="0" stopColor="#101f45" />
                      <stop offset=".6" stopColor="#0a1330" />
                      <stop offset="1" stopColor="#060c1e" />
                    </radialGradient>
                    <radialGradient id="gCore" cx="50%" cy="50%" r="50%">
                      <stop offset="0" stopColor="#dff0ff" stopOpacity=".6" />
                      <stop offset=".45" stopColor="#8fc8ff" stopOpacity=".22" />
                      <stop offset="1" stopColor="#8fc8ff" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="gHalo" cx="50%" cy="50%" r="50%">
                      <stop offset="0" stopColor="#fff3c4" stopOpacity=".9" />
                      <stop offset="1" stopColor="#e6d08a" stopOpacity="0" />
                    </radialGradient>
                    {/* Arcs for textpath */}
                    <g id="arcs">
                      {SECTORS.map((s, i) => {
                        const top = Math.sin(rad(s.mid)) < 0;
                        const R = top ? 446 : 462;
                        const pad = 4;
                        const a = top ? pol(R, s.a0 + pad) : pol(R, s.a1 - pad);
                        const b = top ? pol(R, s.a1 - pad) : pol(R, s.a0 + pad);
                        return (
                          <path
                            key={`sp-${i}`}
                            id={`sp${i}`}
                            d={`M${f1(a[0])} ${f1(a[1])}A${R} ${R} 0 0 ${top ? 1 : 0} ${f1(b[0])} ${f1(b[1])}`}
                          />
                        );
                      })}
                    </g>
                  </defs>

                  {/* Backdrop click reset */}
                  <rect
                    id="bg"
                    x="0"
                    y="0"
                    width="1000"
                    height="1000"
                    fill="transparent"
                    onClick={() => handleOverview()}
                  />

                  {/* Outer Plate */}
                  <circle className="plate" cx="500" cy="500" r="424" />

                  {/* Ticks */}
                  <g id="ticks">
                    {Array.from({ length: 144 }).map((_, i) => {
                      const a = i * 2.5;
                      const maj = i % 6 === 0;
                      const p = pol(427, a);
                      const q = pol(maj ? 436 : 431, a);
                      return (
                        <line
                          key={`tick-${i}`}
                          className={`tick ${maj ? 'maj' : ''}`}
                          x1={f1(p[0])}
                          y1={f1(p[1])}
                          x2={f1(q[0])}
                          y2={f1(q[1])}
                        />
                      );
                    })}
                    {SECTORS.map((s) => {
                      const p = pol(425, s.a0);
                      const q = pol(442, s.a0);
                      return (
                        <line
                          key={`sec-tick-${s.id}`}
                          className="tick sec"
                          x1={f1(p[0])}
                          y1={f1(p[1])}
                          x2={f1(q[0])}
                          y2={f1(q[1])}
                        />
                      );
                    })}
                  </g>

                  {/* Sector Wedges */}
                  <g id="sectors">
                    {SECTORS.map((s) => {
                      const isOn = s.id === activeSectorObj;
                      const isDim = !!activeSectorObj && !isOn;
                      return (
                        <path
                          key={s.id}
                          className={`wedge ${isOn ? 'on' : ''} ${isDim ? 'dim' : ''}`}
                          data-sector={s.id}
                          tabIndex="0"
                          role="button"
                          aria-label={`Scan ${s.name}, ${SKILLS.filter((k) => k.sector === s.id).length} skills`}
                          d={annular(104, 420, s.a0, s.a1)}
                          onClick={() => handleSelectSector(s.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleSelectSector(s.id);
                            }
                          }}
                        />
                      );
                    })}
                  </g>

                  {/* Spokes */}
                  <g id="spokes">
                    {SECTORS.map((s) => {
                      const a = pol(104, s.a0);
                      const b = pol(420, s.a0);
                      return (
                        <line
                          key={`spoke-${s.id}`}
                          className="spoke"
                          x1={f1(a[0])}
                          y1={f1(a[1])}
                          x2={f1(b[0])}
                          y2={f1(b[1])}
                        />
                      );
                    })}
                  </g>

                  {/* Orbits */}
                  <g id="orbits">
                    <circle className="orbit d" cx="500" cy="500" r="231" />
                    <circle className="orbit" cx="500" cy="500" r="356" />
                  </g>

                  {/* Sector Arc Labels */}
                  <g id="slabels">
                    {SECTORS.map((s, i) => (
                      <text
                        key={`sl-${s.id}`}
                        className={`sl ${s.id === activeSectorObj ? 'on' : ''}`}
                        data-sector={s.id}
                        onClick={() => handleSelectSector(s.id)}
                      >
                        <textPath href={`#sp${i}`} startOffset="50%" textAnchor="middle">
                          {s.rim}
                        </textPath>
                      </text>
                    ))}
                  </g>

                  {/* Animated Radar Sweep */}
                  <g id="sweep" ref={sweepRef}>
                    {(() => {
                      const SL = 28;
                      const W = 2;
                      const paths = [];
                      for (let j = SL - 1; j >= 0; j--) {
                        paths.push(
                          <path
                            key={`sw-${j}`}
                            className="sweep-s"
                            opacity={f1(0.2 * Math.pow(1 - j / SL, 1.7) * 100) / 100}
                            d={annular(104, 420, -(j + 1) * W, -j * W)}
                          />
                        );
                      }
                      const e0 = pol(104, 0);
                      const e1 = pol(420, 0);
                      paths.push(
                        <line
                          key="sweep-edge"
                          className="sweep-edge"
                          x1={f1(e0[0])}
                          y1={f1(e0[1])}
                          x2={f1(e1[0])}
                          y2={f1(e1[1])}
                        />
                      );
                      return paths;
                    })()}
                  </g>

                  {/* Connected Links when a skill is active */}
                  <g id="links">
                    {activeSkill && (() => {
                      const a = BY[activeSkill];
                      return activeLinks.map((bid) => {
                        const b = BY[bid];
                        const n = (PAIR[activeSkill] || {})[bid] || 1;
                        const mx = (a.x + b.x) / 2;
                        const my = (a.y + b.y) / 2;
                        const dist = Math.hypot(a.x - b.x, a.y - b.y);
                        const k = Math.min(0.6, Math.max(0.1, dist / 700));
                        const cx = mx + (C - mx) * k;
                        const cy = my + (C - my) * k;
                        return (
                          <path
                            key={`link-${bid}`}
                            className="link"
                            d={`M${f1(a.x)} ${f1(a.y)}Q${f1(cx)} ${f1(cy)} ${f1(b.x)} ${f1(b.y)}`}
                            style={{
                              opacity: Math.min(0.9, 0.34 + 0.14 * n),
                              strokeWidth: f1(Math.min(4, 1.6 + 0.6 * n))
                            }}
                          />
                        );
                      });
                    })()}
                  </g>

                  {/* Skill Nodes */}
                  <g id="nodes">
                    {SKILLS.map((s) => {
                      const isSel = s.id === activeSkill;
                      const isLnk = activeLinks.includes(s.id);
                      const inSector = activeSector && s.sector === activeSector;
                      const isDim = activeSkill
                        ? !(isSel || isLnk)
                        : activeSector
                        ? !inSector
                        : false;
                      const isHv = s.id === hoveredSkill;

                      return (
                        <g
                          key={s.id}
                          className={`node ${s.tier} ${proven(s) ? '' : 'u'} ${isSel ? 'sel' : ''} ${isLnk ? 'lnk' : ''} ${isDim ? 'dim' : ''} ${isHv ? 'hv' : ''}`}
                          data-id={s.id}
                          tabIndex="0"
                          role="button"
                          aria-label={`${s.name}, ${s.tier === 'd' ? 'daily driver' : 'toolbox'}, ${nUses(s)} uses`}
                          transform={`translate(${f1(s.x)} ${f1(s.y)})`}
                          onClick={() => handleSelectSkill(s.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleSelectSkill(s.id);
                            }
                          }}
                          onPointerOver={(e) => {
                            if (e.pointerType === 'mouse') handleHover(s.id, true);
                          }}
                          onPointerOut={(e) => {
                            if (e.pointerType === 'mouse') handleHover(null);
                          }}
                          onFocus={() => handleHover(s.id, true)}
                          onBlur={() => handleHover(null)}
                        >
                          <circle
                            ref={(el) => { if (el) nodesHaloRef.current[s.id] = el; }}
                            className="halo"
                            r={f1(s.dotR + 18)}
                          />
                          <circle className="sring" r={f1(s.dotR + 7)} />
                          <circle className="dot" r={f1(s.dotR)} />
                          <circle className="hit" r={f1(Math.max(15, s.dotR + 7))} />
                        </g>
                      );
                    })}
                  </g>

                  {/* Center Reactor Core */}
                  <g id="reactor" onClick={() => handleOverview()}>
                    <g transform="translate(500 500)">
                      <circle className="rx-halo" r="92" fill="url(#gCore)" />
                      <circle className="rx-ring" r="66" />
                      <g className="rx-coils">
                        {Array.from({ length: 10 }).map((_, i) => {
                          const lp = (r, a) => `${f1(r * Math.cos(rad(a)))} ${f1(r * Math.sin(rad(a)))}`;
                          return (
                            <path
                              key={`coil-${i}`}
                              transform={`rotate(${i * 36})`}
                              d={`M${lp(46, -9)}L${lp(62, -12)}L${lp(62, 12)}L${lp(46, 9)}Z`}
                            />
                          );
                        })}
                      </g>
                      <circle className="rx-inner" r="40" />
                      <circle r="30" fill="url(#gCore)" />
                      <path className="rx-tri" d="M0 -19L16.5 9.5H-16.5Z" />
                      <circle
                        id="core"
                        r="70"
                        fill="transparent"
                        tabIndex="0"
                        role="button"
                        aria-label="Back to all systems"
                      />
                    </g>
                  </g>

                  {/* Expanding Shockwave Pulse */}
                  <circle ref={pulseRef} className="pulse" id="pulse" cx="500" cy="500" r="100" />

                  {/* Node Labels */}
                  <g id="nlabels">
                    {SKILLS.map((s) => {
                      const isLabelOn =
                        activeSkill
                          ? s.id === activeSkill || activeLinks.includes(s.id) || s.id === hoveredSkill
                          : activeSector
                          ? s.sector === activeSector || s.id === hoveredSkill
                          : s.tier === 'd' || s.id === hoveredSkill;

                      const u = [Math.cos(rad(s.angle)), Math.sin(rad(s.angle))];
                      const d = s.tier === 'd' ? [-u[0], -u[1]] : u;
                      const off = s.dotR + 9;
                      let anchor = 'middle';
                      let dy = '0.35em';
                      if (Math.abs(d[0]) > 0.35) anchor = d[0] > 0 ? 'start' : 'end';
                      else dy = d[1] > 0 ? '0.9em' : '-0.15em';

                      return (
                        <text
                          key={`nl-${s.id}`}
                          ref={(el) => { if (el) labelRefs.current[s.id] = el; }}
                          className={`nl ${isLabelOn ? 'on' : ''}`}
                          data-id={s.id}
                          x={f1(s.x + d[0] * off)}
                          y={f1(s.y + d[1] * off)}
                          textAnchor={anchor}
                          dy={dy}
                        >
                          {s.short}
                        </text>
                      );
                    })}
                  </g>
                </svg>

                {/* Reset button if zoomed */}
                {(activeSector || activeSkill) && (
                  <button
                    type="button"
                    className="reset"
                    id="reset"
                    onClick={() => handleOverview()}
                  >
                    ← All systems
                  </button>
                )}

                {/* Hover Tooltip */}
                {tooltip.visible && tooltip.skill && (
                  <div
                    className="tip"
                    id="tip"
                    style={{
                      left: `${f1(tooltip.x)}px`,
                      top: `${f1(tooltip.y)}px`,
                      transform: 'translate(-50%, -100%)'
                    }}
                  >
                    <b>{tooltip.skill.name}</b>
                    <span className="tt">
                      {tooltip.skill.tier === 'd' ? 'Daily driver' : 'Toolbox'} · {SECT_MAP[tooltip.skill.sector]?.name}
                    </span>
                    {(() => {
                      const names = (USES[tooltip.skill.id] || [])
                        .filter((e) => e.kind !== 'about')
                        .map((e) => e.name);
                      if (names.length > 0) {
                        return (
                          <span className="tu">
                            {names.slice(0, 3).join(' · ')}
                            {names.length > 3 ? ` · +${names.length - 3} more` : ''}
                          </span>
                        );
                      }
                      if (proven(tooltip.skill)) {
                        return <span className="tu">Core stack, from profile</span>;
                      }
                      return <span className="tu dim">No build linked yet</span>;
                    })()}
                  </div>
                )}

                {/* Bottom Readout Status */}
                <div className="readout" id="readout" aria-hidden="true">
                  {activeSkill ? (
                    <>
                      <span>Trace <b>{BY[activeSkill]?.name}</b> · {nUses(BY[activeSkill])} uses</span>
                    </>
                  ) : activeSector ? (
                    <>
                      <span>Scan <b>{SECT_MAP[activeSector]?.name}</b></span>
                    </>
                  ) : (
                    <span>Click <b>a dot</b> or <b>a system wedge</b> to inspect details</span>
                  )}
                </div>
              </div>
            </section>

            {/* Right Column: Readout Panel */}
            <div className="panel-col">
              <aside className="panel" id="panel" aria-live="polite">
                {/* 1. Skill Detailed Panel */}
                  {activeSkill ? (() => {
                    const s = BY[activeSkill];
                    const u = (USES[activeSkill] || []).slice().sort((a, b) => {
                      const order = ['build', 'role', 'about'];
                      return order.indexOf(a.kind) - order.indexOf(b.kind);
                    });
                    const lk = linksOf(activeSkill);

                    return (
                      <>
                        <div className="ph">
                          <button type="button" className="back" onClick={handleGoBack}>
                            ← Back
                          </button>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <p className="lab" style={{ margin: 0 }}>Trace · one skill</p>
                            <button
                              type="button"
                              className="back-close"
                              onClick={() => handleOverview()}
                              aria-label="Close detail panel"
                              title="Close detail panel"
                            >
                              ✕
                            </button>
                          </div>
                        </div>

                      <h2 className="pt">{s.name}</h2>
                      <div className="badges">
                        <span className={`badge ${s.tier}`}>
                          {s.tier === 'd' ? 'Daily driver' : 'Toolbox'}
                        </span>
                        <span className="badge">{SECT_MAP[s.sector]?.name}</span>
                      </div>

                      <div className="sec">
                        <h3 className="lab">Where it shows up {u.length ? `· ${u.length}` : ''}</h3>
                        {u.length > 0 ? (
                          <ul className="proofs">
                            {u.map((e, idx) => (
                              <li key={idx}>
                                <span className={`pk ${e.kind}`}>
                                  {e.kind === 'about' ? 'Profile' : e.kind}
                                </span>
                                <div>
                                  <div className="pn">
                                    <b>{e.name}</b>
                                    {e.links && e.links.length > 0 && (
                                      <span className="pl">
                                        {e.links.map((l, lIdx) => (
                                          <a key={lIdx} href={l[1]} target="_blank" rel="noopener noreferrer">
                                            {l[0]} ↗
                                          </a>
                                        ))}
                                      </span>
                                    )}
                                  </div>
                                  <p>{e.line}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="empty">
                            No build or role is linked to this skill in the demo data. Add it to a project’s stack and it shows up here.
                          </p>
                        )}
                      </div>

                      {lk.length > 0 && (
                        <div className="sec">
                          <h3 className="lab">Usually paired with</h3>
                          <div className="chips">
                            {lk.map((bid) => (
                              <button
                                key={bid}
                                type="button"
                                className={`chip ${BY[bid]?.tier}`}
                                onClick={() => handleSelectSkill(bid)}
                              >
                                {BY[bid]?.name}
                                <small>×{PAIR[activeSkill][bid]}</small>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })() : activeSector ? (() => {
                  /* 2. Sector Panel */
                  const sec = SECT_MAP[activeSector];
                  const list = SKILLS.filter((s) => s.sector === activeSector);
                  const d = list.filter((s) => s.tier === 'd');
                  const t = list.filter((s) => s.tier === 't');
                  const seen = {};
                  list.forEach((s) => {
                    (USES[s.id] || []).forEach((e) => {
                      if (e.kind !== 'about') seen[e.name] = 1;
                    });
                  });

                  return (
                    <>
                      <div className="ph">
                        <button type="button" className="back" onClick={() => handleOverview()}>
                          ← All systems
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <p className="lab" style={{ margin: 0 }}>Scan · one system</p>
                          <button
                            type="button"
                            className="back-close"
                            onClick={() => handleOverview()}
                            aria-label="Close detail panel"
                            title="Close detail panel"
                          >
                            ✕
                          </button>
                        </div>
                      </div>

                      <h2 className="pt">{sec.name}</h2>
                      <p className="pd">
                        {list.length} skills, {d.length} daily. {Object.keys(seen).length} builds and roles touch this system.
                      </p>

                      {d.length > 0 && (
                        <div className="sec">
                          <h3 className="lab">Daily drivers</h3>
                          <div className={`rows ${d.length > 4 ? 'c2' : ''}`}>
                            {d.map((s) => (
                              <button
                                key={s.id}
                                type="button"
                                className={`srow ${s.tier} ${proven(s) ? '' : 'u'}`}
                                onClick={() => handleSelectSkill(s.id)}
                                onPointerEnter={() => handleHover(s.id)}
                                onPointerLeave={() => handleHover(null)}
                              >
                                <span className="dotk"></span>
                                <span className="nm">{s.name}</span>
                                <span className="ct">
                                  {nUses(s) ? `${nUses(s)} uses` : proven(s) ? 'core stack' : 'no build yet'}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {t.length > 0 && (
                        <div className="sec">
                          <h3 className="lab">Toolbox</h3>
                          <div className={`rows ${t.length > 3 ? 'c2' : ''}`}>
                            {t.map((s) => (
                              <button
                                key={s.id}
                                type="button"
                                className={`srow ${s.tier} ${proven(s) ? '' : 'u'}`}
                                onClick={() => handleSelectSkill(s.id)}
                                onPointerEnter={() => handleHover(s.id)}
                                onPointerLeave={() => handleHover(null)}
                              >
                                <span className="dotk"></span>
                                <span className="nm">{s.name}</span>
                                <span className="ct">
                                  {nUses(s) ? `${nUses(s)} uses` : proven(s) ? 'core stack' : 'no build yet'}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })() : (
                  /* 3. Overview Panel (Default state) */
                  <>
                    <div className="ph">
                      <p className="lab" style={{ margin: 0 }}>Scan · all systems</p>
                      <span className="dotk d" style={{ width: 8, height: 8 }} aria-hidden="true"></span>
                    </div>

                    <h2 className="pt">
                      {dailyCount} daily drivers. {SKILLS.length - dailyCount} more in the toolbox.
                    </h2>
                    <p className="pd">
                      Hover or tap any node to inspect. Inner orbit is daily tools; outer orbit is the deep toolbox.
                    </p>

                    <div className="sec">
                      <h3 className="lab">Daily drivers · inner orbit</h3>
                      <div className="chips">
                        {dailySkills.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            className="chip d"
                            onClick={() => handleSelectSkill(s.id)}
                            onPointerEnter={() => handleHover(s.id)}
                            onPointerLeave={() => handleHover(null)}
                            title={`Inspect ${s.name}`}
                          >
                            {s.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="sec">
                      <h3 className="lab">Systems · pick one to zoom in</h3>
                      <div className="rows c2">
                        {SECTORS.map((sec) => {
                          const count = SKILLS.filter((s) => s.sector === sec.id).length;
                          const dCount = SKILLS.filter((s) => s.sector === sec.id && s.tier === 'd').length;
                          return (
                            <button
                              key={sec.id}
                              type="button"
                              className="srow"
                              onClick={() => handleSelectSector(sec.id)}
                              onPointerEnter={() => handleHover(null)}
                              title={`Focus ${sec.name} system`}
                            >
                              <span
                                className="dotk"
                                style={{ background: `var(--sec-${sec.id})` }}
                              ></span>
                              <span className="nm">{sec.name}</span>
                              <span className="ct">
                                {count} skills · {dCount} daily
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </aside>
            </div>
        </main>
      )}

        {/* View List */}
        {view === 'list' && (
          <main id="skills-view-list" role="tabpanel" aria-labelledby="skills-tab-list">
            <div className="lbar">
              <label className="find">
                <span className="sr-only">Filter skills</span>
                <input
                  id="q"
                  type="search"
                  placeholder="Filter by skill, system or build"
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </label>
              <p className="lab qcount" id="qcount" aria-live="polite">
                {searchQuery
                  ? `${filteredList.totalMatches} matches`
                  : `${SKILLS.length} skills · ${SECTORS.length} systems`}
              </p>
            </div>

            <div className="tbl" id="tbl">
              <div className="trow thead" aria-hidden="true">
                <span className="lab">System</span>
                <span className="lab">Daily drivers · inner orbit</span>
                <span className="lab">Toolbox · outer orbit</span>
              </div>

              {filteredList.systems.map(({ sec, dMatches, tMatches, hasMatches }) => {
                if (!hasMatches) return null;
                return (
                  <section key={sec.id} className="trow" data-sector={sec.id} aria-label={sec.name}>
                    <div className="tname">
                      <h3>{sec.name}</h3>
                      <span className="lab">
                        {SKILLS.filter((s) => s.sector === sec.id).length} skills
                      </span>
                    </div>

                    <div className="tcell" role="group" data-label="Daily drivers">
                      {dMatches.length > 0 ? (
                        dMatches.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            className={`chip ${s.tier} ${proven(s) ? '' : 'u'}`}
                            onClick={() => {
                              setView('hud');
                              handleSelectSkill(s.id);
                            }}
                          >
                            {s.name}
                            {nUses(s) ? <small>×{nUses(s)}</small> : null}
                          </button>
                        ))
                      ) : (
                        <span className="none">None matching</span>
                      )}
                    </div>

                    <div className="tcell" role="group" data-label="Toolbox">
                      {tMatches.length > 0 ? (
                        tMatches.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            className={`chip ${s.tier} ${proven(s) ? '' : 'u'}`}
                            onClick={() => {
                              setView('hud');
                              handleSelectSkill(s.id);
                            }}
                          >
                            {s.name}
                            {nUses(s) ? <small>×{nUses(s)}</small> : null}
                          </button>
                        ))
                      ) : (
                        <span className="none">None matching</span>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>

            {filteredList.totalMatches === 0 && (
              <p className="noskill" id="noskill">
                Nothing matches “{searchQuery.trim()}”. Try a skill, a system or a build, like Rust, Frontend or Jarvis.
              </p>
            )}

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <p className="lab lfoot" style={{ margin: 0 }}>Pick any skill to trace it on the radar.</p>
              <button
                type="button"
                onClick={() => handleSetView('hud')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  background: 'rgba(11, 20, 40, 0.85)',
                  border: '1px solid var(--line-2)',
                  color: 'var(--ink-hi)',
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.76rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                ← Return to Radar HUD
              </button>
            </div>
          </main>
        )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(SkillsHUD);
