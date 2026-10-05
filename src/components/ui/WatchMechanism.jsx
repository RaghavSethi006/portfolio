import React, { useEffect, useRef } from 'react';

function generateWatchMovement(isLite = false) {
  const MOD = 6;      // gear module: pitch radius = teeth * MOD / 2
  const SPIN = 1.5;   // seconds per revolution, per tooth
  const f = (n) => +n.toFixed(2);
  const P = (r, a) => f(r * Math.cos(a)) + ' ' + f(r * Math.sin(a));
  const PP = (cx, cy, r, a) => f(cx + r * Math.cos(a)) + ' ' + f(cy + r * Math.sin(a));
  const MAT = {
    gold:   { l: '#E6D08A', g: '#B8960C' },
    silver: { l: '#EEF2F9', g: '#C8D8F0' },
    gun:    { l: '#C8D8F0', g: '#8FA2C4' },
    night:  { l: '#8FA2C4', g: '#4A5A7C' },
    dgold:  { l: '#B8960C', g: '#7A6208' },
  };
  const C = (r, cx = 0, cy = 0) =>
    `M${f(cx + r)} ${f(cy)}A${f(r)} ${f(r)} 0 1 0 ${f(cx - r)} ${f(cy)}A${f(r)} ${f(r)} 0 1 0 ${f(cx + r)} ${f(cy)}Z`;
  const ln = (d, c, gl, w = 0.9, o = 1) =>
    `<path d="${d}" fill="none" stroke="${gl}" stroke-width="${f(w * 5)}" opacity="${f(0.14 * o)}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" opacity="${o}" stroke-linecap="round" stroke-linejoin="round"/>`;

  function gear(g) {
    const r = (g.z * MOD) / 2;
    const p = (2 * Math.PI) / g.z;
    const tip = r + 0.7 * MOD;
    const root = r - 0.8 * MOD;
    const rw = Math.max(5, r * 0.13);
    const rimIn = root - rw;
    const q = (root + rimIn) / 2;
    const hub = Math.max(7, r * 0.15);
    const m = MAT[g.mat];
    const R = f;
    let st = g.st || 'spur';
    if (rimIn < 30 && (st === 'windows' || st === 'ring')) st = 'spur';
    let d = '', sp = '', tk = '', x = '', spr = '';

    for (let k = 0; k < g.z; k++) {
      const t = k * p;
      const a = `${k ? 'L' : 'M'}`;
      const arc = `A${R(root)} ${R(root)} 0 0 1 `;
      d +=
        st === 'saw'
          ? a + P(root, t) + 'L' + P(tip, t + 0.55 * p) + 'L' + P(root, t + 0.6 * p) + arc + P(root, t + p)
          : st === 'star'
          ? a + P(root, t - 0.4 * p) + 'L' + P(tip, t) + 'L' + P(root, t + 0.4 * p) + arc + P(root, t + 0.6 * p)
          : st === 'round'
          ? a + P(root, t - 0.3 * p) + 'Q' + P(2 * tip - root, t) + ' ' + P(root, t + 0.3 * p) + arc + P(root, t + 0.7 * p)
          : a + P(root, t - 0.3 * p) + 'L' + P(tip, t - 0.14 * p) + 'L' + P(tip, t + 0.14 * p) + 'L' + P(root, t + 0.3 * p) + arc + P(root, t + 0.7 * p);
      tk += `M${P(rimIn + 2, t + p / 2)}L${P(root - 2, t + p / 2)}`;
      if (st === 'fine') x += C(Math.max(1.1, rw * 0.2), q * Math.cos(t + p / 2), q * Math.sin(t + p / 2));
    }

    const out = d + 'Z';
    d = out + C(rimIn);

    if (g.spring) {
      for (let j = 0; j <= 260; j++) {
        const t = j / 260;
        spr += (j ? 'L' : 'M') + P(hub + 4 + t * (rimIn - hub - 8), t * 13 * 2 * Math.PI);
      }
    } else if (st === 'windows') {
      const n = g.sp + 3;
      for (let i = 0; i < n; i++) {
        const a = (i * 2 * Math.PI) / n;
        x += C(Math.max(3, rimIn * 0.2), rimIn * 0.62 * Math.cos(a), rimIn * 0.62 * Math.sin(a));
      }
    } else {
      for (let i = 0; i < g.sp; i++) {
        const a = (i * 2 * Math.PI) / g.sp;
        if (st === 'curved') sp += `M${P(hub, a)}Q${P((hub + rimIn) / 2 + rimIn * 0.22, a + 0.55)} ${P(rimIn + 1, a + 0.28)}`;
        else if (st === 'ring') sp += `M${P(hub, a)}L${P(rimIn * 0.55, a)}L${P(rimIn + 1, a + Math.PI / g.sp)}`;
        else sp += `M${P(hub, a)}L${P(rimIn + 1, a)}`;
      }
    }
    if (st === 'ring') x += C(rimIn * 0.55);

    const sol = g.sol === 1 && !g.spring;
    const ink = sol ? '#050A18' : m.l;
    const body = sol ? out : d;
    const fx = st === 'windows' || st === 'fine';

    return `<g transform="translate(${R(g.x)} ${R(g.y)})"><g class="spin" style="animation-duration:${R(g.z * SPIN)}s;${g.dir < 0 ? 'animation-direction:reverse' : ''}"><g transform="rotate(${R((g.ph * 180) / Math.PI)})">
      <path d="${body}" fill="${sol ? `url(#sg-${g.mat})` : m.g}" fill-opacity="${sol ? 1 : g.sol === 2 ? 0.4 : 0.09}" fill-rule="evenodd" stroke="${m.g}" stroke-width="${sol ? 8 : 5}" stroke-opacity="${sol ? 0.24 : 0.13}" stroke-linejoin="round"/>
      <path d="${body}" fill="none" fill-rule="evenodd" stroke="${m.l}" stroke-width=".9" stroke-linejoin="round"/>
      <path class="fine" d="${tk}" stroke="${ink}" stroke-width=".6" opacity="${sol ? 0.55 : 0.4}"/>
      <circle r="${R(q)}" fill="none" stroke="${ink}" stroke-width=".5" stroke-dasharray="1.5 4" opacity=".55"/>
      ${
        g.spring
          ? `<circle r="${R(rimIn)}" fill="#050A18" opacity=".9"/>${ln(spr, m.l, m.g, 0.8, 0.8)}`
          : sol
          ? `<circle r="${R(rimIn)}" fill="none" stroke="#050A18" stroke-width=".9" opacity=".7"/><path d="${sp}" fill="none" stroke="#050A18" stroke-width="3.6" stroke-linecap="round" opacity=".88"/><path d="${sp}" fill="none" stroke="${m.l}" stroke-width=".7" opacity=".9"/><path d="${x}" fill="${fx ? '#050A18' : 'none'}" fill-opacity=".9" stroke="${m.l}" stroke-width=".9"/>`
          : ln(sp, m.l, m.g, 0.9, 0.9) + ln(x, m.l, m.g, 0.8, 0.9)
      }
      <circle r="${R(hub + 3)}" fill="none" stroke="${m.l}" stroke-width=".6" opacity=".7"/><circle r="${R(hub)}" fill="#050A18" stroke="${m.l}" stroke-width="1"/><circle r="${R(hub * 0.4)}" fill="${m.l}"/>
    </g></g></g>`;
  }

  function solve(list) {
    const m = {};
    list.forEach((g) => {
      g.ph = g.ph || 0;
      if (g.of) {
        const q = m[g.of];
        const phi = (g.a * Math.PI) / 180;
        const r1 = (q.z * MOD) / 2;
        const r2 = (g.z * MOD) / 2;
        const p1 = (2 * Math.PI) / q.z;
        const p2 = (2 * Math.PI) / g.z;
        g.x = q.x + (r1 + r2) * Math.cos(phi);
        g.y = q.y + (r1 + r2) * Math.sin(phi);
        g.dir = -q.dir;
        let dl = (((q.ph - phi) % p1) + p1) % p1;
        if (dl > p1 / 2) dl -= p1;
        g.ph = phi + Math.PI - (dl * r1) / r2 + p2 / 2;
      }
      m[g.id] = g;
    });
    return m;
  }

  const TRAIN = [
    { id: 'centre', sol: 2, z: 36, sp: 6, st: 'curved', mat: 'gold', x: 500, y: 500, dir: -1 },
    { id: 'barrel', z: 48, spring: 1, st: 'spur', mat: 'gold', of: 'centre', a: 140 },
    { id: 'third', sol: 1, z: 30, sp: 5, st: 'ring', mat: 'silver', of: 'centre', a: 20 },
    { id: 'fourth', sol: 1, z: 24, sp: 4, st: 'windows', mat: 'silver', of: 'third', a: 100 },
    { id: 'escape', sol: 1, z: 14, sp: 5, st: 'star', mat: 'gold', of: 'fourth', a: 150 },
    { id: 'idle', z: 18, sp: 4, st: 'saw', mat: 'gun', of: 'fourth', a: 20 },
    { id: 'minute', sol: 2, z: 20, sp: 4, st: 'fine', mat: 'gun', of: 'third', a: -60 },
    { id: 'hour', z: 26, sp: 5, st: 'curved', mat: 'silver', of: 'minute', a: -120 },
    { id: 'setting', sol: 1, z: 18, sp: 4, st: 'round', mat: 'gold', of: 'minute', a: 0 },
    { id: 'pin1', z: 12, sp: 4, st: 'star', mat: 'silver', of: 'barrel', a: 200 },
    { id: 'pin2', sol: 1, z: 16, sp: 4, st: 'saw', mat: 'gold', of: 'pin1', a: 270 },
    { id: 'winding', z: 16, sp: 4, st: 'round', mat: 'gold', of: 'barrel', a: 80 },
  ];

  const UNDER = [
    { id: 'u1', z: 58, sp: 6, st: 'ring', mat: 'dgold', x: 640, y: 330, dir: 1 },
    { id: 'u2', z: 40, sp: 5, st: 'curved', mat: 'night', of: 'u1', a: 150 },
    { id: 'u3', z: 34, sp: 5, st: 'windows', mat: 'dgold', of: 'u2', a: 80 },
  ];

  const rng = (s) => () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const STY = ['spur', 'saw', 'star', 'round', 'fine', 'curved', 'ring', 'windows', 'curved', 'round'];

  function grow(tag, base, att, zr, mats, cap) {
    let h = 0;
    for (const ch of tag) h = h * 31 + ch.charCodeAt(0);
    const R = rng(h + 7);
    const all = base.map((g) => ({ id: g.id, x: g.x, y: g.y, p: (g.z * MOD) / 2, fix: g.fix }));
    const out = [];
    const T = (p) => p + 0.7 * MOD;

    for (let n = 0; n < att && out.length < cap; n++) {
      const q = all[(R() * all.length) | 0];
      if (q.fix) continue;
      const z = zr[0] + ((R() * (zr[1] - zr[0] + 1)) | 0);
      const p = (z * MOD) / 2;
      const A = R() * 2 * Math.PI;
      const x = q.x + (q.p + p) * Math.cos(A);
      const y = q.y + (q.p + p) * Math.sin(A);

      if (
        Math.hypot(x - 500, y - 500) > 440 ||
        all.some((o) => o !== q && Math.hypot(x - o.x, y - o.y) < T(o.p) + T(p) + 1.5)
      ) {
        continue;
      }

      const id = tag + '-' + n;
      all.push({ id, x, y, p });
      const u = Math.abs(Math.sin(n * 12.9898 + h) * 43758.5453) % 1;
      out.push({
        id,
        z,
        sol: u < 0.3 ? 1 : u < 0.5 ? 2 : 0,
        sp: z < 16 ? 4 : z < 28 ? 5 : 6,
        mat: mats[(R() * mats.length) | 0],
        st: STY[(R() * STY.length) | 0],
        of: q.id,
        a: (A * 180) / Math.PI,
      });
    }
    return out;
  }

  solve(TRAIN);
  const OBS = [
    { id: 'o1', x: 397, y: 282, z: 38, fix: 1 },
    { id: 'o2', x: 559, y: 865, z: 22, fix: 1 },
  ];
  const FILL = grow('f', TRAIN.concat(OBS), 30000, [9, 50], ['gold', 'silver', 'gun', 'gold', 'silver'], isLite ? 16 : 46);
  const G = solve(TRAIN.concat(FILL));
  solve(UNDER);
  const DEEP = grow('d', UNDER, 30000, [14, 56], ['night', 'dgold', 'dgold', 'night', 'gun'], isLite ? 14 : 34);
  const U = solve(UNDER.concat(DEEP));

  const jewel = (x, y, i, s = 1) =>
    `<g transform="translate(${f(x)} ${f(y)}) scale(${s})"><circle ${
      i < 11 ? 'class="glow" ' : 'opacity=".45" '
    }r="22" fill="url(#gGlow)" style="animation-delay:${-i * 0.7}s"/><circle r="15.5" fill="none" stroke="#B8960C" stroke-width="3" opacity=".18"/><circle r="12" fill="#050A18" stroke="#E6D08A" stroke-width="1.2"/><circle r="8.5" fill="none" stroke="#FF6BB0" stroke-width=".6" opacity=".7"/><circle r="6.5" fill="url(#gRuby)"/><path d="M-20 0H-14M14 0H20M0 -20V-14M0 14V20" stroke="#E6D08A" stroke-width=".8"/></g>`;

  const screw = (x, y, i) =>
    `<g transform="translate(${f(x)} ${f(y)}) rotate(${i * 37})"><circle r="11" fill="none" stroke="#5B8DEF" stroke-width="2.6" opacity=".14"/><circle r="8.5" fill="#050A18" stroke="#5B8DEF" stroke-width="1"/><g class="spin" style="animation-duration:${
      60 + i * 9
    }s;${i % 2 ? 'animation-direction:reverse' : ''}"><path d="M-6 0H6" stroke="#EEF2F9" stroke-width="1.6" stroke-linecap="round"/></g></g>`;

  const bridge = (d, w = 27, c = '#E6D08A') => {
    const a = `d="${d}" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
    return `<path ${a} stroke="${c}" stroke-width="${w + 7}" opacity=".1"/><path ${a} stroke="${c}" stroke-width="${w}" opacity=".9"/><path ${a} stroke="#070F26" stroke-width="${w - 2.2}" opacity=".93"/><path ${a} stroke="${c}" stroke-width=".7" stroke-dasharray="2 6" opacity=".55"/>`;
  };

  const chain = (ids) => bridge('M' + ids.map((i) => f(G[i].x) + ' ' + f(G[i].y)).join('L'));
  const arc = (c, r, a0, a1) => {
    const A = (a) => PP(c.x, c.y, r, (a * Math.PI) / 180);
    return `M${A(a0)}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${A(a1)}`;
  };

  let tk = '', hr = '';
  for (let i = 0; i < 60; i++) {
    const a = (i * Math.PI) / 30;
    const l = i % 5 === 0;
    const s = `M${PP(500, 500, l ? 476 : 481, a)}L${PP(500, 500, l ? 493 : 488, a)}`;
    if (l) hr += s;
    else tk += s;
  }
  const eng = `RS  MANUFACTURE MOVEMENT  ·  ${12 + FILL.length} JEWELS  ·  7,200 VPH  ·  HAND WOUND  ·  `.repeat(5);

  const ringsHtml = `<circle cx="500" cy="500" r="498" fill="none" stroke="#B8960C" stroke-width="1.4"/><circle cx="500" cy="500" r="496" fill="#050A18" opacity=".6"/>
    <circle cx="500" cy="500" r="462" fill="none" stroke="#C8D8F0" stroke-width=".6" opacity=".35"/><circle cx="500" cy="500" r="477" fill="none" stroke="#E6D08A" stroke-width=".5" opacity=".5"/>
    <path d="${tk}" stroke="#C8D8F0" stroke-width=".8" opacity=".6"/><path d="${hr}" stroke="#E6D08A" stroke-width="2.6" stroke-linecap="round"/>
    <path id="tp" d="M500 34A466 466 0 1 1 499.9 34" fill="none"/><text class="fine" font-family="Manrope,sans-serif" font-size="8" fill="#C8D8F0" opacity=".5"><textPath href="#tp" textLength="2900" lengthAdjust="spacing">${eng}</textPath></text>`;

  let lo = '', sb = '';
  for (let r = 30; r < 452; r += 10) {
    const k = r % 50 === 0;
    const k2 = r % 20 === 0;
    lo += `<circle cx="500" cy="500" r="${r}" stroke="${k ? '#E6D08A' : k2 ? '#B8960C' : '#C8D8F0'}" stroke-opacity="${k ? 0.28 : k2 ? 0.2 : 0.05}"/>`;
  }
  for (let i = 0; i < 120; i++) {
    const a = (i * Math.PI) / 60;
    sb += `M${PP(500, 500, 24, a)}L${PP(500, 500, 452, a)}`;
  }
  let sb2 = '';
  for (let i = 0; i < 24; i++) {
    const a = (i * Math.PI) / 12;
    sb2 += `M${PP(500, 500, 24, a)}L${PP(500, 500, 452, a)}`;
  }

  const lowerHtml = `<circle cx="500" cy="500" r="456" fill="#050A18"/><g fill="none">${lo}</g><path d="${sb}" stroke="#C8D8F0" stroke-opacity=".07" stroke-width=".6"/><path d="${sb2}" stroke="#E6D08A" stroke-opacity=".2" stroke-width=".8"/><circle cx="500" cy="500" r="436" fill="none" stroke="#E6D08A" stroke-opacity=".35" stroke-dasharray="2 7"/><circle cx="500" cy="500" r="345" fill="none" stroke="#B8960C" stroke-opacity=".4" stroke-dasharray="1 6"/>`;
  const underHtml = `<g opacity=".66">${UNDER.concat(DEEP).map((g) => gear(U[g.id])).join('')}</g>`;

  const BAL = { x: 397, y: 282 };
  let holes = '', ch = '';
  TRAIN.concat(FILL).forEach((t) => {
    const g = G[t.id];
    const h = (g.z * MOD) / 2 + 12;
    holes += `<circle cx="${f(g.x)}" cy="${f(g.y)}" r="${h}" fill="#000"/>`;
    ch += `<circle cx="${f(g.x)}" cy="${f(g.y)}" r="${h + 3}" stroke="#C8D8F0" stroke-opacity=".12" stroke-width="5"/><circle cx="${f(g.x)}" cy="${f(g.y)}" r="${h + 3}" stroke="#C8D8F0" stroke-opacity=".55" stroke-width=".9"/>`;
  });
  holes += `<circle cx="${BAL.x}" cy="${BAL.y}" r="118" fill="#000"/>`;

  const R2 = rng(99);
  const obs = TRAIN.concat(FILL)
    .map((t) => ({ x: G[t.id].x, y: G[t.id].y, r: (G[t.id].z * MOD) / 2 + MOD * 0.7 + 12 }))
    .concat([
      { x: BAL.x, y: BAL.y, r: 118 },
      { x: 559, y: 865, r: 62 },
    ]);

  for (let n = 0; n < 4000; n++) {
    const x = 100 + R2() * 800;
    const y = 100 + R2() * 800;
    if (Math.hypot(x - 500, y - 500) > 440) continue;
    const c = Math.min(...obs.map((o) => Math.hypot(x - o.x, y - o.y) - o.r));
    if (c > 16) {
      obs.push({ x, y, r: c });
      holes += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(c - 6)}" fill="#000"/>`;
      ch += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(c - 2)}" stroke="#C8D8F0" stroke-opacity=".5" stroke-width=".9"/>`;
    }
  }

  let ps = '';
  for (let i = 0; i < 6; i++) {
    const a = ((200 + i * 60) * Math.PI) / 180;
    ps += screw(500 + 414 * Math.cos(a), 500 + 414 * Math.sin(a), i);
  }

  const plateHtml = `<mask id="cut" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000"><rect width="1000" height="1000" fill="#fff"/>${holes}</mask>
    <g mask="url(#cut)"><circle cx="500" cy="500" r="458" fill="#070F26" fill-opacity=".93"/><circle cx="500" cy="500" r="458" fill="none" stroke="#C8D8F0" stroke-width="1.2" opacity=".6"/>
    <circle cx="500" cy="500" r="446" fill="none" stroke="#B8960C" stroke-width=".8" opacity=".6"/><circle cx="500" cy="500" r="432" fill="none" stroke="#C8D8F0" stroke-width=".6" stroke-dasharray="2 6" opacity=".4"/>
    <g fill="none">${ch}</g></g><g class="fine">${ps}</g>`;

  const e = G.escape;
  const palletFork = `<g transform="translate(${f(e.x)} ${f(e.y + 115)})"><g class="rock">${ln('M0 0L-32 -92M0 0L32 -92M0 0L0 34', '#EEF2F9', '#C8D8F0', 1.6)}${ln('M-32 -92L32 -92', '#EEF2F9', '#C8D8F0', 1.2)}
    <path d="M-32 -92L32 -92L0 0Z" fill="#C8D8F0" opacity=".08"/><circle cy="34" r="6" fill="#050A18" stroke="#EEF2F9"/>
    <rect x="-37" y="-100" width="10" height="16" rx="2" fill="#050A18" stroke="#E6D08A"/><rect x="27" y="-100" width="10" height="16" rx="2" fill="#050A18" stroke="#E6D08A"/></g></g>`;

  const gearsHtml = TRAIN.concat(FILL).map((t) => gear(G[t.id])).join('') + palletFork;

  let br =
    chain(['barrel', 'centre', 'third', 'fourth', 'escape']) +
    chain(['pin1', 'pin2']) +
    chain(['third', 'minute', 'hour']) +
    chain(['minute', 'setting']) +
    chain(['fourth', 'idle']) +
    chain(['barrel', 'winding']) +
    bridge(arc(G.barrel, 122, 100, 250)) +
    bridge(arc(G.third, 64, -50, 110)) +
    bridge(arc(BAL, 112, 200, 350)) +
    bridge(`M290 382L${BAL.x} ${BAL.y}L545 235`);

  FILL.forEach((t, i) => {
    if (i % 3 === 0) {
      const g = G[t.id];
      const q = G[t.of];
      br += bridge(`M${f(q.x)} ${f(q.y)}L${f(g.x)} ${f(g.y)}`, 18, '#C8D8F0');
    }
  });

  ['barrel', 'third', 'fourth', 'escape', 'idle', 'minute', 'hour', 'setting', 'pin1', 'pin2', 'winding'].forEach(
    (id, i) => (br += jewel(G[id].x, G[id].y, i))
  );
  FILL.forEach((t, i) => {
    const g = G[t.id];
    br += jewel(g.x, g.y, i + 11, Math.min(1, Math.max(0.45, g.z / 36)));
  });

  const ends = (c, r, a0, a1) => [a0, a1].map((a) => [c.x + r * Math.cos((a * Math.PI) / 180), c.y + r * Math.sin((a * Math.PI) / 180)]);
  [
    ...ends(G.barrel, 122, 100, 250),
    ...ends(G.third, 64, -50, 110),
    ...ends(BAL, 112, 200, 350),
    [290, 382],
    [545, 235],
  ].forEach((s, i) => (br += screw(s[0], s[1], i + 5)));

  const bridgesHtml = br;

  const capHtml = `<g transform="translate(500 500)"><circle r="31" fill="#050A18" stroke="#E6D08A" stroke-width="1.6"/><circle r="36" fill="none" stroke="#B8960C" stroke-width="4" opacity=".18"/><circle r="24" fill="none" stroke="#E6D08A" stroke-width=".6" opacity=".6"/><text y="7" text-anchor="middle" font-family="'Cormorant Garamond',Georgia,serif" font-size="22" font-weight="600" fill="#E6D08A">RS</text></g>`;

  let sp1 = '', sp2 = '', wt = '';
  for (let i = 0; i <= 140; i++) {
    const t = i / 140;
    sp1 += (i ? 'L' : 'M') + P(18 + t * 38, t * 5 * 2 * Math.PI);
    sp2 += (i ? 'L' : 'M') + P(21 + t * 36, t * 5 * 2 * Math.PI + Math.PI);
  }
  for (let i = 0; i < 16; i++) {
    const a = (i * Math.PI) / 8;
    wt += `<circle cx="${f(96 * Math.cos(a))}" cy="${f(96 * Math.sin(a))}" r="3.6" fill="#050A18" stroke="${i % 2 ? '#EEF2F9' : '#E6D08A'}" stroke-width="1"/>`;
  }
  const arms = [0, 120, 240].map((a) => `M0 0L${P(92, (a * Math.PI) / 180 - Math.PI / 2)}`).join('');
  const GD = ['#E6D08A', '#B8960C'];
  const balanceHtml = `<g transform="translate(${BAL.x} ${BAL.y})"><g class="osc">${ln(C(96), ...GD, 2.2)}${ln(C(88), ...GD, 0.6, 0.7)}${ln(C(104), ...GD, 0.6, 0.6)}${ln(arms, ...GD, 1.6)}<circle r="30" fill="#E6D08A" fill-opacity=".22"/>${ln(C(30), ...GD, 0.8, 0.8)}${wt}${ln(sp1, ...GD, 1)}${ln(sp2, '#EEF2F9', '#C8D8F0', 0.8, 0.8)}</g></g>${jewel(BAL.x, BAL.y, 3)}`;

  let dust = '', wd = '';
  for (let i = 0; i < 16; i++) {
    dust += `<circle class="dust fine" cx="${f(Math.random() * 1000)}" cy="${f(Math.random() * 1000)}" r="${f(0.8 + Math.random() * 1.6)}" style="animation-duration:${f(8 + Math.random() * 10)}s;animation-delay:${f(-Math.random() * 12)}s"/>`;
  }
  for (let i = 0; i < 14; i++) {
    wd += `<path d="M0 0L${P(458, -i * 0.04)}A458 458 0 0 0 ${P(458, -(i + 1) * 0.04)}Z" fill="#E6D08A" opacity="${f(0.13 * (1 - i / 14))}"/>`;
  }
  const topHtml = `<circle cx="500" cy="500" r="458" fill="url(#gVig)"/><circle cx="500" cy="500" r="463" fill="none" stroke="#050A18" stroke-width="12"/><circle cx="500" cy="500" r="457" fill="none" stroke="#B8960C" stroke-width=".8" opacity=".7"/>
    <g transform="translate(500 500)"><g class="spin" style="animation-duration:28s">${wd}${ln('M0 0H458', '#E6D08A', '#B8960C', 1.1, 0.9)}</g></g>${dust}`;

  const ORBIT = !isLite;
  const TURN = {
    'L-rings': -420,
    'L-lower': 240,
    'L-under': -150,
    ...(ORBIT ? { 'L-plate': 200, 'L-gears': 200, 'L-bridges': 200, 'L-balance': 200 } : {}),
  };

  const wrapTurn = (id, html) => {
    const t = TURN[id];
    if (!t) return html;
    return `<g class="turn" style="animation-duration:${Math.abs(t)}s;${t < 0 ? 'animation-direction:reverse' : ''}">${html}</g>`;
  };

  return `
    <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" class="movement-svg w-full h-full block">
      <defs>
        <radialGradient id="gRuby"><stop offset="0" stop-color="#FF6BB0"/><stop offset=".6" stop-color="#C2185B"/><stop offset="1" stop-color="#6A0F3A"/></radialGradient>
        <radialGradient id="gGlow"><stop offset="0" stop-color="#FF4FA0" stop-opacity=".9"/><stop offset="1" stop-color="#FF4FA0" stop-opacity="0"/></radialGradient>
        <clipPath id="lens"><circle cx="500" cy="500" r="458"/></clipPath>
        <radialGradient id="gVig"><stop offset=".5" stop-color="#050A18" stop-opacity="0"/><stop offset="1" stop-color="#050A18" stop-opacity=".72"/></radialGradient>
        <radialGradient id="sg-gold"><stop offset="0" stop-color="#B8960C" stop-opacity=".25"/><stop offset=".65" stop-color="#E6D08A" stop-opacity=".5"/><stop offset="1" stop-color="#E6D08A" stop-opacity=".88"/></radialGradient>
        <radialGradient id="sg-silver"><stop offset="0" stop-color="#C8D8F0" stop-opacity=".25"/><stop offset=".65" stop-color="#EEF2F9" stop-opacity=".5"/><stop offset="1" stop-color="#EEF2F9" stop-opacity=".88"/></radialGradient>
        <radialGradient id="sg-gun"><stop offset="0" stop-color="#8FA2C4" stop-opacity=".25"/><stop offset=".65" stop-color="#C8D8F0" stop-opacity=".5"/><stop offset="1" stop-color="#C8D8F0" stop-opacity=".88"/></radialGradient>
        <radialGradient id="sg-night"><stop offset="0" stop-color="#4A5A7C" stop-opacity=".25"/><stop offset=".65" stop-color="#8FA2C4" stop-opacity=".5"/><stop offset="1" stop-color="#8FA2C4" stop-opacity=".88"/></radialGradient>
        <radialGradient id="sg-dgold"><stop offset="0" stop-color="#7A6208" stop-opacity=".25"/><stop offset=".65" stop-color="#B8960C" stop-opacity=".5"/><stop offset="1" stop-color="#B8960C" stop-opacity=".88"/></radialGradient>
      </defs>
      <g id="L-rings">${wrapTurn('L-rings', ringsHtml)}</g>
      <g clip-path="url(#lens)">
        <g id="L-lower">${wrapTurn('L-lower', lowerHtml)}</g>
        <g id="L-under">${wrapTurn('L-under', underHtml)}</g>
        <g id="L-plate">${wrapTurn('L-plate', plateHtml)}</g>
        <g id="L-gears">${wrapTurn('L-gears', gearsHtml)}</g>
        <g id="L-bridges">${wrapTurn('L-bridges', bridgesHtml)}</g>
        <g id="L-balance">${wrapTurn('L-balance', balanceHtml)}</g>
        <g id="L-cap">${capHtml}</g>
      </g>
      <g id="L-top">${topHtml}</g>
    </svg>
  `;
}

const WatchMechanism = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const isMob = window.matchMedia('(max-width: 760px)').matches;
    const isLite = isMob || (navigator.hardwareConcurrency || 8) <= 4;

    containerRef.current.innerHTML = generateWatchMovement(isLite);

    // Pause when scrolled out of view
    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        if (containerRef.current) {
          containerRef.current.classList.toggle('watch-off', !entry.isIntersecting);
        }
      });
      observer.observe(containerRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative aspect-square w-full select-none pointer-events-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
    />
  );
};

export default WatchMechanism;
