import React, { useEffect, useRef } from 'react';

const SPEED = 1.1;

const TriLevelChess = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const container = containerRef.current;
    if (!cv || !container) return;

    const cx = cv.getContext('2d');
    if (!cx) return;

    const M = Math;
    const PI = M.PI;
    const rnd = M.random;

    const RGB = {
      g1: [184, 150, 12],
      g2: [230, 208, 138],
      t1: [238, 242, 249],
      t2: [200, 216, 240],
      pn: [11, 20, 40],
    };

    const rgba = (k, a) => `rgba(${RGB[k]},${a < 0 ? 0 : a > 1 ? 1 : a})`;
    const LH = 2.5;
    const SE = 0.5;
    const CE = 0.866;
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - M.pow(2 - 2 * t, 3) / 2);
    const lerp = (a, b, t) => a + (b - a) * t;

    let W = 0;
    let H = 0;
    let S = 0;
    let DPR = 1;
    let ox = 0;
    let oy = 0;
    let cc = 1;
    let ss = 0;
    let time = 0;
    let last = 0;
    let G = null;
    let pt = [];
    let sh = [];
    let rg = [];
    let tr = [];
    let animId = null;

    const mo = Array.from({ length: 46 }, () => ({
      x: rnd() * 5 - 1,
      y: rnd() * 5 - 1,
      u: rnd() * 7,
      v: 0.15 + rnd() * 0.35,
      k: rnd() < 0.5 ? 'g2' : 't2',
    }));

    // Iso projection: board coords (x,y), height u -> screen
    const P = (x, y, u) => {
      const a = x - 1.5;
      const b = y - 1.5;
      return [ox + (a * cc - b * ss) * S, oy + ((a * ss + b * cc) * SE - u * CE) * S];
    };

    const VAL = { K: 1000, Q: 9, R: 5, N: 3, P: 1 };

    // Hex-ring profiles [radius, height, lean, zig]; the knight's head is a separate extruded side profile [forward, height]
    const SH = {
      P: [
        [0.3, 0, 0],
        [0.24, 0.18, 0],
        [0.13, 0.45, 0],
        [0.21, 0.58, 0],
        [0.1, 0.8, 0],
        [0, 0.95, 0],
      ],
      R: [
        [0.34, 0, 0],
        [0.25, 0.16, 0],
        [0.22, 0.78, 0],
        [0.34, 0.86, 0],
        [0.34, 1.08, 0],
        [0.2, 1.08, 0],
      ],
      N: [
        [0.34, 0, 0],
        [0.27, 0.1, 0],
        [0.22, 0.22, 0],
      ],
      Q: [
        [0.35, 0, 0],
        [0.25, 0.2, 0],
        [0.18, 0.85, 0],
        [0.31, 1.02, 0],
        [0.37, 1.18, 0],
        [0.37, 1.18, 0, 0.3],
      ],
      K: [
        [0.36, 0, 0],
        [0.26, 0.2, 0],
        [0.2, 0.92, 0],
        [0.32, 1.08, 0],
        [0.28, 1.3, 0],
        [0.1, 1.34, 0],
        [0.1, 1.52, 0],
      ],
    };
    const HEAD = [
      [-0.22, 0.2],
      [-0.24, 0.5],
      [-0.16, 0.78],
      [-0.1, 1],
      [-0.02, 1.16],
      [0.06, 1],
      [0.16, 0.96],
      [0.3, 0.74],
      [0.38, 0.6],
      [0.36, 0.46],
      [0.22, 0.46],
      [0.12, 0.52],
      [0.2, 0.34],
      [0.2, 0.2],
    ];
    const HT = { N: 1.16 };
    const top = (t) => {
      const r = SH[t][SH[t].length - 1];
      return HT[t] || r[1] + (r[3] || 0);
    };

    /* Rules */
    const D = [];
    const AX = [];
    const KN = [];
    for (let a = -1; a < 2; a++) {
      for (let b = -1; b < 2; b++) {
        for (let c = -1; c < 2; c++) {
          if (a || b || c) {
            D.push([a, b, c]);
            if (M.abs(a) + M.abs(b) + M.abs(c) === 1) AX.push([a, b, c]);
          }
        }
      }
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i !== j) {
          for (const s of [-1, 1]) {
            for (const t of [-1, 1]) {
              const d = [0, 0, 0];
              d[i] = 2 * s;
              d[j] = t;
              KN.push(d);
            }
          }
        }
      }
    }

    const at = (s, x, y, z) => s.find((p) => p.v && p.x === x && p.y === y && p.z === z);

    function gen(s, c) {
      const out = [];
      for (const p of s) {
        if (!p.v || p.c !== c) continue;
        const add = (x, y, z, cp) => {
          if (x < 0 || y < 0 || z < 0 || x > 3 || y > 3 || z > 2) return false;
          const o = at(s, x, y, z);
          if ((o && o.c === c) || (cp === 0 && o) || (cp === 1 && !o)) return false;
          out.push({ p, x, y, z, cap: o });
          return !o;
        };

        if (p.t === 'N') {
          for (const d of KN) add(p.x + d[0], p.y + d[1], p.z + d[2]);
        } else if (p.t === 'P') {
          const f = c ? -1 : 1;
          add(p.x, p.y + f, p.z, 0);
          add(p.x + 1, p.y + f, p.z, 1);
          add(p.x - 1, p.y + f, p.z, 1);
          add(p.x, p.y + f, p.z + 1, 1);
          add(p.x, p.y + f, p.z - 1, 1);
        } else {
          for (const d of p.t === 'R' ? AX : D) {
            let x = p.x;
            let y = p.y;
            let z = p.z;
            for (let i = 0; i < (p.t === 'K' ? 1 : 3); i++) {
              x += d[0];
              y += d[1];
              z += d[2];
              if (!add(x, y, z)) break;
            }
          }
        }
      }
      return out;
    }

    function ap(m) {
      const p = m.p;
      m.o = [p.x, p.y, p.z, p.t];
      if (m.cap) m.cap.v = false;
      p.x = m.x;
      p.y = m.y;
      p.z = m.z;
      if (p.t === 'P' && m.y === (p.c ? 0 : 3)) p.t = 'Q';
    }

    function un(m) {
      const p = m.p;
      const o = m.o;
      p.x = o[0];
      p.y = o[1];
      p.z = o[2];
      p.t = o[3];
      if (m.cap) m.cap.v = true;
    }

    const mat = (s, c) => s.reduce((a, p) => (p.v ? a + (p.c === c ? 1 : -1) * VAL[p.t] : a), 0);
    const ch = (p, q) => M.max(M.abs(p.x - q.x), M.abs(p.y - q.y), M.abs(p.z - q.z));

    function choose(s, c) {
      let best = null;
      let bs = -1e9;
      for (const m of gen(s, c)) {
        ap(m);
        const ek = s.find((p) => p.v && p.t === 'K' && p.c !== c);
        let sc;
        if (!ek) {
          sc = 1e3;
        } else {
          let w = 1e9;
          const rp = gen(s, 1 - c);
          if (!rp.length) w = mat(s, c);
          for (const r of rp) {
            ap(r);
            const v = mat(s, c);
            un(r);
            if (v < w) w = v;
          }
          sc = w + 0.06 * (3 - ch(m.p, ek));
        }
        un(m);
        sc += rnd() * 0.05;
        if (sc > bs) {
          bs = sc;
          best = m;
        }
      }
      return best;
    }

    const SET = [
      ['R', 0, 0, 0],
      ['N', 1, 0, 1],
      ['K', 2, 0, 2],
      ['Q', 3, 0, 1],
      ['P', 1, 1, 0],
      ['P', 2, 1, 2],
    ];

    function reset() {
      const s = [];
      let id = 0;
      for (const c of [0, 1]) {
        for (const [t, x, y, z] of SET) {
          s.push({
            id: id++,
            t,
            c,
            x,
            y: c ? 3 - y : y,
            z: c ? 2 - z : z,
            v: true,
            m: 0,
            f: 0,
          });
        }
      }
      G = { s, side: 0, ply: 0, a: null, w: 0, st: 0, t: 0 };
      pt = [];
      sh = [];
      rg = [];
      tr = [];
    }

    function fin() {
      if (!G) return;
      G.st = 2;
      G.w = 2000;
      G.a = null;
    }

    function start() {
      if (!G) return;
      const m = choose(G.s, G.side);
      if (!m) return fin();
      const p = m.p;
      G.a = {
        m,
        t: 0,
        f: [p.x, p.y, p.z],
        h: p.t === 'N' ? 1.9 : 0.8 + 0.2 * ch(p, m),
        hit: false,
        x: p.x,
        y: p.y,
        u: p.z * LH,
      };
      tr.push({ x: p.x, y: p.y, u: p.z * LH + 0.5, a: 0, br: 1 });
    }

    function land() {
      if (!G || !G.a) return;
      const a = G.a;
      const m = a.m;
      const p = m.p;
      ap(m);
      G.a = null;
      const u = m.z * LH + 0.02;
      const R = (mr, d, k) => rg.push({ x: m.x, y: m.y, u, t: 0, d, mr, k });
      R(1.2, 750, 'g2');
      if (m.cap) {
        p.f = 1;
        R(3.4, 1100, 't1');
      }
      const pr = p.t !== m.o[3];
      if (pr) {
        R(2.6, 1000, 'g2');
        R(1.5, 800, 't1');
      }
      G.ply++;
      if (!G.s.some((q) => q.v && q.t === 'K' && q.c !== p.c)) {
        fin();
      } else if (G.ply >= 70) {
        fin();
      } else {
        G.side ^= 1;
        G.w = 380 / SPEED;
      }
    }

    function shatter(q) {
      const x = q.x;
      const y = q.y;
      const u = q.z * LH;
      const T = top(q.t);
      for (let i = 0; i < 16; i++) {
        sh.push({
          x: x + (rnd() - 0.5) * 0.4,
          y: y + (rnd() - 0.5) * 0.4,
          u: u + rnd() * T,
          vx: (rnd() - 0.5) * 2.2,
          vy: (rnd() - 0.5) * 2.2,
          vu: rnd() * 2,
          l: 1.3,
          c: q.c,
          o: Array.from({ length: 9 }, () => (rnd() - 0.5) * 0.36),
        });
      }
      for (let i = 0; i < 30; i++) {
        pt.push({
          x: x + (rnd() - 0.5) * 0.5,
          y: y + (rnd() - 0.5) * 0.5,
          u: u + rnd() * T,
          vx: (rnd() - 0.5) * 0.8,
          vy: (rnd() - 0.5) * 0.8,
          vu: 0.4 + rnd() * 1.2,
          l: 1 + rnd() * 0.8,
          ml: 1.8,
          k: q.c ? 'g2' : 't1',
        });
      }
    }

    function upd(g, d) {
      if (!G) return;
      const dt = g / 1000;
      for (const q of mo) {
        q.u += (q.v * d) / 1000;
        if (q.u > 7.2) {
          q.u = -0.4;
          q.x = rnd() * 5 - 1;
          q.y = rnd() * 5 - 1;
        }
      }
      for (const q of pt) {
        q.x += q.vx * dt;
        q.y += q.vy * dt;
        q.u += q.vu * dt;
        q.l -= dt;
      }
      for (const q of sh) {
        q.x += q.vx * dt;
        q.y += q.vy * dt;
        q.vu -= 3.2 * dt;
        q.u += q.vu * dt;
        q.l -= dt;
      }
      for (const q of rg) q.t += g;
      for (const q of tr) q.a += g;
      pt = pt.filter((q) => q.l > 0);
      sh = sh.filter((q) => q.l > 0);
      rg = rg.filter((q) => q.t < q.d);
      tr = tr.filter((q) => q.a < 1400);
      for (const p of G.s) p.f = M.max(0, p.f - g / 420);
      G.t += g;

      if (G.st === 0) {
        for (const p of G.s) p.m = M.max(0, M.min(1, (G.t - p.id * 110) / 1700));
        if (G.t > 3000) G.st = 1;
      } else if (G.st === 1) {
        const a = G.a;
        if (a) {
          a.t += dt * SPEED;
          const m = a.m;
          const e = ease(M.min(1, a.t));
          a.x = lerp(a.f[0], m.x, e);
          a.y = lerp(a.f[1], m.y, e);
          a.u = lerp(a.f[2], m.z, e) * LH + M.sin(PI * e) * a.h;
          if (g > 0) {
            tr.push({ x: a.x, y: a.y, u: a.u + 0.5, a: 0 });
            if (rnd() < 0.6) {
              pt.push({
                x: a.x,
                y: a.y,
                u: a.u + rnd(),
                vx: (rnd() - 0.5) * 0.3,
                vy: (rnd() - 0.5) * 0.3,
                vu: 0.3,
                l: 0.9,
                ml: 0.9,
                k: 'g2',
              });
            }
          }
          if (!a.hit && m.cap && a.t >= 0.92) {
            a.hit = true;
            m.p.f = 1;
            shatter(m.cap);
            m.cap.v = false;
          }
          if (a.t >= 1) land();
        } else if ((G.w -= g) <= 0) {
          start();
        }
      } else if ((G.w -= g) <= 0) {
        reset();
      }
    }

    const sqr = (x, y, u) => [
      P(x - 0.5, y - 0.5, u),
      P(x + 0.5, y - 0.5, u),
      P(x + 0.5, y + 0.5, u),
      P(x - 0.5, y + 0.5, u),
    ];
    const C = (u, i = 0) => [
      P(-0.5 + i, -0.5 + i, u),
      P(3.5 - i, -0.5 + i, u),
      P(3.5 - i, 3.5 - i, u),
      P(-0.5 + i, 3.5 - i, u),
    ];
    const path = (q) => {
      cx.beginPath();
      q.forEach((p, i) => (i ? cx.lineTo(p[0], p[1]) : cx.moveTo(p[0], p[1])));
      cx.closePath();
    };

    function glow() {
      const c = P(1.5, 1.5, -0.6);
      cx.save();
      cx.translate(c[0], c[1]);
      cx.scale(1, 0.5);
      cx.globalCompositeOperation = 'source-over';
      const g = cx.createRadialGradient(0, 0, 0, 0, 0, S * 4.6);
      g.addColorStop(0, rgba('g1', 0.1));
      g.addColorStop(0.5, rgba('g1', 0.03));
      g.addColorStop(1, rgba('g1', 0));
      cx.fillStyle = g;
      cx.fillRect(-S * 5, -S * 5, S * 10, S * 10);
      cx.restore();
      path(C(-1.1, -0.3));
      cx.strokeStyle = rgba('g1', 0.12);
      cx.lineWidth = 1;
      cx.stroke();
    }

    function beams() {
      cx.globalCompositeOperation = 'source-over';
      cx.setLineDash([2, 7]);
      cx.strokeStyle = rgba('g1', 0.5);
      cx.lineWidth = 1;
      cx.beginPath();
      for (const [x, y] of [
        [-0.5, -0.5],
        [3.5, -0.5],
        [3.5, 3.5],
        [-0.5, 3.5],
      ]) {
        const a = P(x, y, 0);
        const b = P(x, y, 2 * LH);
        cx.moveTo(a[0], a[1]);
        cx.lineTo(b[0], b[1]);
      }
      cx.stroke();
      cx.setLineDash([]);
      cx.strokeStyle = rgba('g1', 0.07);
      cx.lineWidth = 1;
      cx.stroke();
    }

    function board(z) {
      const u = z * LH;
      for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
          path(sqr(x, y, u));
          cx.globalCompositeOperation = 'source-over';
          cx.fillStyle = (x + y + z) % 2 ? rgba('pn', 0.2) : rgba('t2', 0.11);
          cx.fill();
          cx.globalCompositeOperation = 'source-over';
          cx.strokeStyle = rgba('t2', 0.3);
          cx.lineWidth = 1;
          cx.stroke();
        }
      }
      const T = C(u);
      const B = C(u - 0.16);
      cx.globalCompositeOperation = 'source-over';
      for (let i = 0; i < 4; i++) {
        const j = (i + 1) % 4;
        path([T[i], T[j], B[j], B[i]]);
        cx.fillStyle = rgba('g1', 0.05);
        cx.fill();
        cx.strokeStyle = rgba('g1', 0.35);
        cx.lineWidth = 1;
        cx.stroke();
      }
      path(T);
      cx.strokeStyle = rgba('g1', 0.9);
      cx.lineWidth = 1.5;
      cx.stroke();
      path(C(u, 0.08));
      cx.strokeStyle = rgba('t1', 0.35);
      cx.lineWidth = 1;
      cx.stroke();
      cx.fillStyle = rgba('t2', 0.7);
      cx.font = '11px ui-monospace,Consolas,monospace';
      cx.textAlign = 'right';
      cx.fillText('L' + (z + 1), T[3][0] - 10, T[3][1] + 4);
    }

    function hl(x, y, z, k, a) {
      cx.globalCompositeOperation = 'source-over';
      path(sqr(x, y, z * LH));
      cx.fillStyle = rgba(k, a);
      cx.fill();
      cx.strokeStyle = rgba(k, a * 4);
      cx.lineWidth = 1;
      cx.stroke();
    }

    function pad(x, y, u, k, a) {
      if (a < 0.02) return;
      cx.globalCompositeOperation = 'source-over';
      const hex = (r) => {
        cx.beginPath();
        for (let i = 0; i < 6; i++) {
          const q = P(x + M.cos(i * 1.0472) * r, y + M.sin(i * 1.0472) * r, u + 0.02);
          i ? cx.lineTo(q[0], q[1]) : cx.moveTo(q[0], q[1]);
        }
        cx.closePath();
      };
      hex(0.44);
      cx.fillStyle = rgba(k, 0.07 * a);
      cx.fill();
      cx.strokeStyle = rgba(k, 0.6 * a);
      cx.lineWidth = 1.2;
      cx.stroke();
      hex(0.3);
      cx.strokeStyle = rgba(k, 0.28 * a);
      cx.lineWidth = 1;
      cx.stroke();
      const b = P(x, y, u);
      const t = P(x, y, u + 1.9);
      const g = cx.createLinearGradient(0, b[1], 0, t[1]);
      g.addColorStop(0, rgba(k, 0.09 * a));
      g.addColorStop(1, rgba(k, 0));
      cx.fillStyle = g;
      cx.beginPath();
      cx.moveTo(b[0] - 0.3 * S, b[1]);
      cx.lineTo(b[0] + 0.3 * S, b[1]);
      cx.lineTo(t[0] + 0.05 * S, t[1]);
      cx.lineTo(t[0] - 0.05 * S, t[1]);
      cx.closePath();
      cx.fill();
    }

    function piece(p, x, y, u, a, tk) {
      const R = SH[p.t];
      const dr = p.c ? -1 : 1;
      const w = M.min(1, p.m * 2.2);
      const fl = M.max(0, M.min(1, p.m * 2.2 - 1.1));
      const T = top(p.t);
      const ek = tk || (p.c ? 'g1' : 't1');
      const dk = tk || (p.c ? 'g2' : 't1');
      const fk = tk || (p.c ? 'g1' : 't2');
      a *= 0.975 + 0.04 * rnd();
      const rs = R.map((r) => {
        const o = [];
        for (let k = 0; k < 6; k++) {
          const an = k * 1.0472 + 0.5236;
          o.push(P(x + M.cos(an) * r[0], y + M.sin(an) * r[0] + r[2] * dr, u + r[1] + (k & 1 ? r[3] || 0 : 0)));
        }
        return o;
      });
      // knight head plane: faces the screen and points toward the enemy side
      const hp = (f, h, l) => P(x - dr * cc * f + l * ss, y + dr * ss * f + l * cc, u + h);
      const gs = [rs];
      const F = new Path2D();
      const E = new Path2D();
      const Cp = new Path2D();
      if (p.t === 'N') {
        const hd = [-0.12, 0.12].map((l) => HEAD.map(([f, h]) => hp(f, h, l)));
        gs.push(hd);
        hd[1].forEach((q, k) => (k ? Cp.lineTo(q[0], q[1]) : Cp.moveTo(q[0], q[1])));
        Cp.closePath();
      }
      for (const rr of gs) {
        rr.forEach((o, i) => {
          const m = o.length;
          o.forEach((q, k) => (k ? E.lineTo(q[0], q[1]) : E.moveTo(q[0], q[1])));
          E.closePath();
          if (i < rr.length - 1) {
            const q = rr[i + 1];
            for (let k = 0; k < m; k++) {
              const n = (k + 1) % m;
              F.moveTo(...o[k]);
              F.lineTo(...o[n]);
              F.lineTo(...q[n]);
              F.lineTo(...q[k]);
              F.closePath();
              E.moveTo(...o[k]);
              E.lineTo(...q[k]);
            }
          }
        });
      }
      const b = P(x, y, u)[1];
      const t = P(x, y, u + T)[1];
      if (p.c && !tk) {
        cx.fillStyle = rgba('pn', 0.78 * a * fl);
        cx.fill(F);
        cx.fill(Cp);
      }
      cx.globalCompositeOperation = 'source-over';
      const g = cx.createLinearGradient(0, b, 0, t);
      g.addColorStop(0, rgba(fk, 0));
      g.addColorStop(1, rgba(fk, (p.c ? 0.2 : 0.28) * a * fl));
      cx.fillStyle = g;
      cx.fill(F);
      cx.fill(Cp);
      const h = cx.createLinearGradient(0, b, 0, t);
      h.addColorStop(0, rgba(ek, 0.4 * a * w));
      h.addColorStop(1, rgba(ek, 0.9 * a * w));
      cx.strokeStyle = h;
      cx.lineJoin = 'round';
      cx.lineWidth = 1;
      cx.stroke(E);
      cx.fillStyle = rgba(dk, 0.85 * a * w);
      for (const rr of gs) {
        for (const o of rr) {
          for (const q of o) {
            cx.fillRect(q[0] - 1, q[1] - 1, 2, 2);
          }
        }
      }
      if (p.t === 'N') {
        // eye, nostril and mane strokes on the visible face
        const e = hp(0.17, 0.84, 0.12);
        const nz = hp(0.34, 0.55, 0.12);
        cx.fillStyle = rgba(dk, a * w);
        cx.fillRect(e[0] - 1.6, e[1] - 1.6, 3.2, 3.2);
        cx.fillRect(nz[0] - 1, nz[1] - 1, 2, 2);
        cx.beginPath();
        for (const [f0, h0, f1, h1] of [
          [-0.24, 0.5, -0.06, 0.5],
          [-0.17, 0.76, -0.01, 0.72],
          [-0.1, 1, 0.04, 0.9],
        ]) {
          const q0 = hp(f0, h0, 0.12);
          const q1 = hp(f1, h1, 0.12);
          cx.moveTo(q0[0], q0[1]);
          cx.lineTo(q1[0], q1[1]);
        }
        cx.strokeStyle = rgba(ek, 0.6 * a * w);
        cx.lineWidth = 1;
        cx.stroke();
      }
      for (const ph of [0, 0.5]) {
        const hs = ((time * 0.3 + p.id * 0.19 + ph) % 1) * T;
        let i = 0;
        while (i < R.length - 2 && R[i + 1][1] < hs) i++;
        const A = R[i];
        const B = R[i + 1];
        const k = B[1] > A[1] ? M.min(1, (hs - A[1]) / (B[1] - A[1])) : 0;
        const r = lerp(A[0], B[0], k);
        const l = lerp(A[2], B[2], k);
        cx.beginPath();
        for (let j = 0; j <= 6; j++) {
          const an = j * 1.0472 + 0.5236;
          const q = P(x + M.cos(an) * r, y + M.sin(an) * r + l * dr, u + hs);
          j ? cx.lineTo(q[0], q[1]) : cx.moveTo(q[0], q[1]);
        }
        cx.strokeStyle = rgba(ek, (ph ? 0.15 : 0.3) * a * w);
        cx.lineWidth = 1;
        cx.stroke();
      }
      if (p.t === 'K') {
        const k1 = P(x, y, u + 1.52);
        const k2 = P(x, y, u + 1.88);
        const k3 = P(x - 0.15, y, u + 1.72);
        const k4 = P(x + 0.15, y, u + 1.72);
        cx.beginPath();
        cx.moveTo(k1[0], k1[1]);
        cx.lineTo(k2[0], k2[1]);
        cx.moveTo(k3[0], k3[1]);
        cx.lineTo(k4[0], k4[1]);
        cx.strokeStyle = rgba(ek, a * w);
        cx.lineWidth = 1.2;
        cx.stroke();
      }
      if (p.f > 0.02 && !tk) {
        cx.fillStyle = rgba('t1', p.f * 0.35);
        cx.fill(F);
        cx.fill(Cp);
        cx.strokeStyle = rgba('t1', p.f);
        cx.lineWidth = 1.6;
        cx.stroke(E);
      }
      cx.globalCompositeOperation = 'source-over';
    }

    function mover(a) {
      const m = a.m;
      const p = m.p;
      const e = ease(M.min(1, a.t));
      const k = p.c ? 'g1' : 't2';
      const g = a.f[2] !== m.z ? M.exp(-M.pow((e - 0.5) / 0.1, 2)) : 0;
      pad(a.f[0], a.f[1], a.f[2]* LH, k, 1 - e);
      pad(m.x, m.y, m.z * LH, k, e);
      if (g > 0.04) {
        const d = g * 8;
        const b = P(a.x, a.y, a.u + 0.6)[1];
        cx.save();
        cx.translate(-d, 0);
        piece(p, a.x, a.y, a.u, 0.8, 'g2');
        cx.restore();
        cx.save();
        cx.translate(d, 0);
        piece(p, a.x, a.y, a.u, 0.8, 't2');
        cx.restore();
        cx.save();
        cx.beginPath();
        cx.rect(0, b - 9, W, 18);
        cx.clip();
        cx.translate(g * 14, 0);
        piece(p, a.x, a.y, a.u, 1);
        cx.restore();
      }
      piece(p, a.x, a.y, a.u, 1 - g * 0.4);
    }

    function overlay() {
      cx.globalCompositeOperation = 'source-over';
      for (const r of rg) {
        const k = r.t / r.d;
        const rr = r.mr * (1 - M.pow(1 - k, 3));
        cx.beginPath();
        for (let i = 0; i <= 40; i++) {
          const an = (i * PI) / 20;
          const q = P(r.x + M.cos(an) * rr, r.y + M.sin(an) * rr, r.u);
          i ? cx.lineTo(q[0], q[1]) : cx.moveTo(q[0], q[1]);
        }
        cx.strokeStyle = rgba(r.k, (1 - k) * 0.6);
        cx.lineWidth = 0.6 + 1.2 * (1 - k);
        cx.stroke();
      }
      cx.lineCap = 'round';
      for (let i = 1; i < tr.length; i++) {
        const a = tr[i - 1];
        const b = tr[i];
        const al = 1 - b.a / 1400;
        if (b.br || al <= 0) continue;
        const p = P(a.x, a.y, a.u);
        const q = P(b.x, b.y, b.u);
        cx.beginPath();
        cx.moveTo(p[0], p[1]);
        cx.lineTo(q[0], q[1]);
        cx.strokeStyle = rgba('g2', al * 0.7);
        cx.lineWidth = 1 + 1.2 * al;
        cx.stroke();
      }
      for (const q of sh) {
        const a = M.min(1, q.l);
        const k = q.c ? 'g2' : 't1';
        path([0, 3, 6].map((i) => P(q.x + q.o[i], q.y + q.o[i + 1], q.u + q.o[i + 2])));
        cx.fillStyle = rgba(k, 0.12 * a);
        cx.fill();
        cx.strokeStyle = rgba(k, a * 0.8);
        cx.lineWidth = 1;
        cx.stroke();
      }
      for (const q of pt) {
        const p = P(q.x, q.y, q.u);
        cx.fillStyle = rgba(q.k, (q.l / q.ml) * 0.7);
        cx.fillRect(p[0] - 1.2, p[1] - 1.2, 2.4, 2.4);
      }
      for (const q of mo) {
        const p = P(q.x, q.y, q.u);
        cx.fillStyle = rgba(q.k, 0.3);
        cx.fillRect(p[0] - 1, p[1] - 1, 2, 2);
      }
      cx.globalCompositeOperation = 'source-over';
    }

    function draw() {
      if (!W || !H) return;
      cx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cx.clearRect(0, 0, W, H);

      const yw = PI / 4 + M.sin(time * 0.31) * 0.05;
      cc = M.cos(yw);
      ss = M.sin(yw);
      glow();
      beams();

      if (!G) return;
      const a = G.a;
      const mv = a && a.m.p;
      const live = G.s.filter((p) => p.v && p !== mv);
      for (let z = 0; z < 3; z++) {
        board(z);
        if (a) {
          if (a.m.z === z) hl(a.m.x, a.m.y, z, 'g2', 0.06 + 0.08 * M.sin(time * 9) ** 2);
          if (a.f[2] === z) hl(a.f[0], a.f[1], z, 'g1', 0.08 * (1 - M.min(1, a.t)));
        }
        const L = live
          .filter((p) => p.z === z)
          .sort((p, q) => (p.x - 1.5) * ss + (p.y - 1.5) * cc - ((q.x - 1.5) * ss + (q.y - 1.5) * cc));
        for (const p of L) pad(p.x, p.y, z * LH, p.c ? 'g1' : 't2', M.min(1, p.m * 3));
        for (const p of L) piece(p, p.x, p.y, z * LH, 1);
      }
      if (a) mover(a);
      overlay();
    }

    function fit() {
      if (!container) return;
      DPR = M.min(2, window.devicePixelRatio || 1);
      const r = container.getBoundingClientRect();
      W = r.width;
      H = r.height;
      if (!W || !H) return;
      cv.width = (W * DPR) | 0;
      cv.height = (H * DPR) | 0;
      S = M.min(W / 5.0, H / 9.2);
      ox = W / 2;
      oy = H / 2 + 2.73 * S;
    }

    function frame(ts) {
      const d = M.min(50, ts - last || 16);
      last = ts;
      time += d / 1000;
      upd(d, d);
      draw();
      animId = requestAnimationFrame(frame);
    }

    const resizeObserver = new ResizeObserver(() => fit());
    resizeObserver.observe(container);
    window.addEventListener('resize', fit);

    fit();
    reset();
    animId = requestAnimationFrame(frame);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[440px] sm:h-[520px] md:h-[580px] lg:h-[640px] xl:h-[700px] pointer-events-none select-none flex items-center justify-center"
      style={{
        '--bg': '#050A18',
        '--pn': '#0B1428',
        '--g1': '#B8960C',
        '--g2': '#E6D08A',
        '--t1': '#EEF2F9',
        '--t2': '#C8D8F0',
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
};

export default React.memo(TriLevelChess);
