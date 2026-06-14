"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./Game.module.css";

// ─── Constants ───────────────────────────────────────────────────────────────
const TILE = 30;
const COLS = 17;
const ROWS = 19;
const W = COLS * TILE;
const H = ROWS * TILE;
const WALL = 1, DOT = 2, POWER = 3, EMPTY = 0;
const GREEN = "#507a49";
const GREEN_LT = "#80c474";
const GREEN_DK = "#0f1c0e";
const BG = "#070d07";

const MAP_TPL = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,1],
  [1,3,1,1,2,1,1,2,1,2,1,1,2,1,1,3,1],
  [1,2,1,1,2,1,1,2,2,2,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,1,1,2,1,2,1,1,2,1],
  [1,2,2,2,2,1,2,2,1,2,2,1,2,2,2,2,1],
  [1,1,1,1,2,1,1,0,0,0,1,1,2,1,1,1,1],
  [0,0,0,1,2,1,0,0,0,0,0,1,2,1,0,0,0],
  [1,1,1,1,2,1,0,0,0,0,0,1,2,1,1,1,1],
  [0,0,0,0,2,0,0,0,0,0,0,0,2,0,0,0,0],
  [1,1,1,1,2,1,0,1,1,1,0,1,2,1,1,1,1],
  [0,0,0,1,2,1,0,0,0,0,0,1,2,1,0,0,0],
  [1,1,1,1,2,1,1,0,0,0,1,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,2,1,2,1,1,2,1,1,2,1],
  [1,3,2,1,2,2,2,2,2,2,2,2,2,1,2,3,1],
  [1,2,2,2,2,1,2,2,1,2,2,1,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const GHOST_COLORS = ["#e74c3c","#e91e8c","#00bcd4","#ff9800"];

interface Score { name: string; score: number; created_at: string }
interface Ghost { x:number; y:number; ox:number; oy:number; dx:number; dy:number; color:string; scared:boolean; home:boolean; homeTimer:number }
interface Pac   { x:number; y:number; ox:number; oy:number; dx:number; dy:number; ndx:number; ndy:number; mouth:number; mouthDir:number; dead:boolean; deadTimer:number }

// ─── Helpers ─────────────────────────────────────────────────────────────────
function canMove(map: number[][], x: number, y: number) {
  if (y < 0 || y >= ROWS) return false;
  if (x < 0) return canMove(map, x + COLS, y);
  if (x >= COLS) return canMove(map, x - COLS, y);
  return map[y][x] !== WALL;
}

function countDots(map: number[][]) {
  return map.flat().filter(c => c === DOT || c === POWER).length;
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef  = useRef<{
    map: number[][]; pac: Pac; ghosts: Ghost[];
    score: number; lives: number; powerTimer: number;
    phase: "idle"|"playing"|"dead"|"over"|"win";
    tick: number;
  } | null>(null);

  const [display, setDisplay] = useState({ score: 0, lives: 3, phase: "idle" as string });
  const [modal, setModal]   = useState<"none"|"submit"|"done">("none");
  const [finalScore, setFinalScore] = useState(0);
  const [board, setBoard]   = useState<Score[]>([]);
  const [form, setForm]     = useState({ name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [joyVis, setJoyVis] = useState<{bx:number;by:number;sx:number;sy:number}|null>(null);
  const joyBase = useRef({x:0,y:0});
  const [submitErr, setSubmitErr]   = useState("");
  const rafRef = useRef<number>(0);
  const powerFlash = useRef(false);

  const fetchBoard = useCallback(async () => {
    try {
      const res = await fetch("/api/scores");
      if (res.ok) setBoard(await res.json());
    } catch {}
  }, []);

  useEffect(() => { fetchBoard(); }, [fetchBoard]);

  // ─── Init game ─────────────────────────────────────────────────────────────
  const initGame = useCallback(() => {
    stateRef.current = {
      map: MAP_TPL.map(r => [...r]),
      pac: { x:8, y:4, ox:8, oy:4, dx:1, dy:0, ndx:1, ndy:0, mouth:0.15, mouthDir:1, dead:false, deadTimer:0 },
      ghosts: [
        { x:7,  y:9,  ox:7,  oy:9,  dx:1,  dy:0,  color:GHOST_COLORS[0], scared:false, home:true,  homeTimer:0   },
        { x:8,  y:9,  ox:8,  oy:9,  dx:-1, dy:0,  color:GHOST_COLORS[1], scared:false, home:true,  homeTimer:15  },
        { x:9,  y:9,  ox:9,  oy:9,  dx:0,  dy:1,  color:GHOST_COLORS[2], scared:false, home:true,  homeTimer:30  },
        { x:8,  y:10, ox:8,  oy:10, dx:0,  dy:-1, color:GHOST_COLORS[3], scared:false, home:true,  homeTimer:45  },
      ],
      score: 0, lives: 3, powerTimer: 0, phase: "playing", tick: 0,
    };
    setDisplay({ score: 0, lives: 3, phase: "playing" });
    setModal("none");
  }, []);

  // ─── Input ─────────────────────────────────────────────────────────────────
  const handleDir = useCallback((dx: number, dy: number) => {
    const s = stateRef.current;
    if (!s || s.phase === "idle" || s.phase === "over" || s.phase === "win") { initGame(); return; }
    if (s.phase === "playing") { s.pac.ndx = dx; s.pac.ndy = dy; }
  }, [initGame]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, [number,number]> = {
        ArrowLeft:[-1,0], ArrowRight:[1,0], ArrowUp:[0,-1], ArrowDown:[0,1],
        a:[-1,0], d:[1,0], w:[0,-1], s:[0,1],
      };
      if (map[e.key]) { e.preventDefault(); const [dx,dy]=map[e.key]; handleDir(dx,dy); }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const s = stateRef.current;
        if (!s || s.phase === "idle" || s.phase === "over" || s.phase === "win") initGame();
      }
    };
    // swipe support
    let tx=0, ty=0;
    const onTouchStart = (e: TouchEvent) => { tx=e.touches[0].clientX; ty=e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const dx=e.changedTouches[0].clientX-tx, dy=e.changedTouches[0].clientY-ty;
      const adx=Math.abs(dx), ady=Math.abs(dy);
      if (Math.max(adx,ady)<20) return;
      if (adx>ady) handleDir(dx>0?1:-1, 0);
      else handleDir(0, dy>0?1:-1);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, {passive:true});
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [handleDir, initGame]);

  // ─── Game loop ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function updatePac(s: NonNullable<typeof stateRef.current>) {
      const p = s.pac;
      if (p.dead) {
        p.deadTimer--;
        if (p.deadTimer <= 0) {
          s.lives--;
          if (s.lives <= 0) {
            s.phase = "over";
            setFinalScore(s.score);
            setModal("submit");
          } else {
            p.x=8; p.y=4; p.ox=8; p.oy=4; p.dx=1; p.dy=0; p.ndx=1; p.ndy=0;
            p.dead=false; p.deadTimer=0;
            s.ghosts.forEach((g,i)=>{ g.x=[7,8,9,8][i]; g.y=[9,9,9,10][i]; g.ox=g.x; g.oy=g.y; g.home=true; g.homeTimer=i*10; g.scared=false; });
          }
          setDisplay(d => ({ ...d, lives: s.lives, phase: s.phase }));
        }
        return;
      }
      if (canMove(s.map, p.x+p.ndx, p.y+p.ndy)) { p.dx=p.ndx; p.dy=p.ndy; }
      p.ox=p.x; p.oy=p.y;
      let nx=p.x+p.dx, ny=p.y+p.dy;
      if (nx<0) nx=COLS-1; if (nx>=COLS) nx=0;
      if (canMove(s.map, nx, ny)) { p.x=nx; p.y=ny; }
      // collision check after pac moves
      for (const g of s.ghosts) {
        if (g.x===p.x && g.y===p.y && !p.dead) {
          p.dead=true; p.deadTimer=20;
        }
      }
      const cell = s.map[p.y]?.[p.x];
      if (cell === DOT)   { s.map[p.y][p.x]=EMPTY; s.score+=10; }
      if (cell === POWER) { s.map[p.y][p.x]=EMPTY; s.score+=50; }
      p.mouth += 0.05 * p.mouthDir;
      if (p.mouth > 0.35 || p.mouth < 0.02) p.mouthDir *= -1;
      if (countDots(s.map) === 0) {
        s.phase = "win";
        setFinalScore(s.score);
        setModal("submit");
      }
      setDisplay(d => ({ ...d, score: s.score }));
    }

    function updateGhosts(s: NonNullable<typeof stateRef.current>) {
      const dirs: [number,number][] = [[1,0],[-1,0],[0,1],[0,-1]];
      s.ghosts.forEach(g => {
        if (g.homeTimer > 0) { g.homeTimer--; return; }
        const valid = dirs.filter(([dx,dy]) => !(dx===-g.dx && dy===-g.dy) && canMove(s.map,g.x+dx,g.y+dy));
        const options = valid.length ? valid : dirs.filter(([dx,dy])=>canMove(s.map,g.x+dx,g.y+dy));
        let best: [number,number] = options[0] || [g.dx,g.dy];
        if (Math.random() < 0.4) {
          best = options[Math.floor(Math.random()*options.length)] || best;
        } else {
          let bestD = Infinity;
          for (const [dx,dy] of options) {
            const d=(g.x+dx-s.pac.x)**2+(g.y+dy-s.pac.y)**2;
            if(d<bestD){bestD=d;best=[dx,dy];}
          }
        }
        g.dx=best[0]; g.dy=best[1];
        g.ox=g.x; g.oy=g.y;
        const nx=g.x+g.dx, ny=g.y+g.dy;
        if (canMove(s.map,nx,ny)) { g.x=nx; g.y=ny; }
        if (g.x===s.pac.x && g.y===s.pac.y && !s.pac.dead) {
          s.pac.dead=true; s.pac.deadTimer=20;
        }
      });
    }

    // ─── Draw ───────────────────────────────────────────────────────────────
    function drawMap(map: number[][]) {
      for (let r=0; r<ROWS; r++) {
        for (let c=0; c<COLS; c++) {
          const x=c*TILE, y=r*TILE, t=map[r][c];
          if (t===WALL) {
            ctx.fillStyle="#0d1f0d"; ctx.fillRect(x,y,TILE,TILE);
            ctx.strokeStyle="#507a49"; ctx.lineWidth=2;
            ctx.strokeRect(x+2,y+2,TILE-4,TILE-4);
            ctx.strokeStyle="rgba(128,196,116,0.12)"; ctx.lineWidth=1;
            ctx.strokeRect(x+4,y+4,TILE-8,TILE-8);
          } else {
            ctx.fillStyle=BG; ctx.fillRect(x,y,TILE,TILE);
            if (t===DOT) {
              ctx.fillStyle="#80c474";
              ctx.beginPath(); ctx.arc(x+TILE/2,y+TILE/2,3.5,0,Math.PI*2); ctx.fill();
            }
            if (t===POWER) {
              ctx.fillStyle=GREEN_LT;
              ctx.shadowColor=GREEN_LT; ctx.shadowBlur=8;
              ctx.beginPath(); ctx.arc(x+TILE/2,y+TILE/2,7,0,Math.PI*2); ctx.fill();
              ctx.shadowBlur=0;
            }
          }
        }
      }
    }

    function drawPac(p: Pac, alpha: number) {
      const ix=p.ox+(p.x-p.ox)*alpha, iy=p.oy+(p.y-p.oy)*alpha;
      const cx=ix*TILE+TILE/2, cy=iy*TILE+TILE/2, r=TILE/2-2;
      if (p.dead) {
        const t=Math.max(0,1-(p.deadTimer/20));
        ctx.fillStyle="#FFD700";
        ctx.beginPath(); ctx.moveTo(cx,cy);
        ctx.arc(cx,cy,r,-Math.PI*t,Math.PI+Math.PI*t); ctx.fill();
        return;
      }
      let angle=0;
      if(p.dx===1)angle=0; else if(p.dx===-1)angle=Math.PI;
      else if(p.dy===1)angle=Math.PI/2; else if(p.dy===-1)angle=-Math.PI/2;
      ctx.fillStyle="#FFD700";
      ctx.shadowColor="#FFD700"; ctx.shadowBlur=6;
      ctx.beginPath(); ctx.moveTo(cx,cy);
      ctx.arc(cx,cy,r,angle+p.mouth*Math.PI,angle+(2-p.mouth)*Math.PI);
      ctx.closePath(); ctx.fill();
      ctx.shadowBlur=0;
      const ex=cx+Math.cos(angle-0.55)*r*0.55, ey=cy+Math.sin(angle-0.55)*r*0.55;
      ctx.fillStyle=BG; ctx.beginPath(); ctx.arc(ex,ey,2.5,0,Math.PI*2); ctx.fill();
    }

    function drawGhost(g: Ghost, alpha: number) {
      const ix=g.ox+(g.x-g.ox)*alpha, iy=g.oy+(g.y-g.oy)*alpha;
      const cx=ix*TILE+TILE/2, cy=iy*TILE+TILE/2, r=TILE/2-2;
      ctx.fillStyle=g.color;
      ctx.shadowColor=g.color; ctx.shadowBlur=5;
      ctx.beginPath();
      ctx.arc(cx,cy-2,r,Math.PI,0);
      ctx.lineTo(cx+r,cy+r);
      const ww=r*2/3;
      for(let i=3;i>=0;i--){
        const bx=cx+r-i*ww;
        ctx.quadraticCurveTo(bx+ww/2,cy+r-r/3,bx,cy+r);
      }
      ctx.lineTo(cx-r,cy-2); ctx.fill();
      ctx.shadowBlur=0;
      ctx.fillStyle="#fff";
      ctx.beginPath(); ctx.ellipse(cx-r*0.32,cy-3,r*0.28,r*0.34,0,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx+r*0.32,cy-3,r*0.28,r*0.34,0,0,Math.PI*2); ctx.fill();
      const edx=g.dx*r*0.12, edy=g.dy*r*0.12;
      ctx.fillStyle="#111";
      ctx.beginPath(); ctx.arc(cx-r*0.32+edx,cy-3+edy,r*0.15,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx+r*0.32+edx,cy-3+edy,r*0.15,0,Math.PI*2); ctx.fill();
    }

    function drawIdle() {
      ctx.fillStyle=BG; ctx.fillRect(0,0,W,H);
      // draw static map
      MAP_TPL.forEach((row,r)=>row.forEach((t,c)=>{
        const x=c*TILE,y=r*TILE;
        ctx.fillStyle=t===WALL?"#112211":BG; ctx.fillRect(x,y,TILE,TILE);
        if(t===WALL){ctx.strokeStyle=GREEN;ctx.lineWidth=1.5;ctx.strokeRect(x+1,y+1,TILE-2,TILE-2);}
        if(t===DOT){ctx.fillStyle="rgba(128,196,116,0.4)";ctx.beginPath();ctx.arc(x+TILE/2,y+TILE/2,3,0,Math.PI*2);ctx.fill();}
        if(t===POWER){ctx.fillStyle=GREEN_LT;ctx.beginPath();ctx.arc(x+TILE/2,y+TILE/2,7,0,Math.PI*2);ctx.fill();}
      }));
      ctx.textAlign="center";
      // backdrop
      ctx.fillStyle="rgba(7,13,7,0.78)";
      ctx.beginPath();
      (ctx as CanvasRenderingContext2D & {roundRect:(x:number,y:number,w:number,h:number,r:number)=>void}).roundRect(W/2-130,H/2-52,260,110,14);
      ctx.fill();
      ctx.fillStyle=GREEN_LT; ctx.font=`bold 26px 'craftwork grotesk',sans-serif`;
      ctx.fillText("WEBRARIUM",W/2,H/2-18);
      ctx.fillStyle="rgba(255,255,255,0.6)"; ctx.font=`13px 'craftwork grotesk',sans-serif`;
      ctx.fillText("← → ↑ ↓  або кнопки нижче",W/2,H/2+14);
      ctx.fillStyle=GREEN_LT; ctx.font=`bold 14px 'craftwork grotesk',sans-serif`;
      ctx.fillText("натисни щоб почати",W/2,H/2+38);
      ctx.textAlign="left";
    }

    let lastTick=0, lastGhostTick=0;
    const PAC_RATE=170, GHOST_RATE=340;
    function frame(ts: number) {
      rafRef.current = requestAnimationFrame(frame);
      const s = stateRef.current;
      if (!s || s.phase==="idle") { drawIdle(); return; }
      if (s.phase==="over"||s.phase==="win") return;
      let pacAlpha = Math.min(1, (ts - lastTick) / PAC_RATE);
      let ghostAlpha = Math.min(1, (ts - lastGhostTick) / GHOST_RATE);
      if (ts - lastTick >= PAC_RATE) {
        lastTick=ts; s.tick++; pacAlpha=0;
        updatePac(s);
      }
      if (ts - lastGhostTick >= GHOST_RATE) {
        lastGhostTick=ts; ghostAlpha=0;
        updateGhosts(s);
      }
      ctx.fillStyle=BG; ctx.fillRect(0,0,W,H);
      drawMap(s.map);
      s.ghosts.forEach(g=>drawGhost(g,ghostAlpha));
      drawPac(s.pac,pacAlpha);
    }
    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [initGame]);

  // ─── Submit score ───────────────────────────────────────────────────────────
  async function submitScore() {
    if (!form.name.trim() || !form.email.trim()) return;
    setSubmitting(true); setSubmitErr("");
    try {
      const res = await fetch("/api/scores", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ name:form.name, email:form.email, score:finalScore }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setModal("done");
      fetchBoard();
    } catch(e:any) {
      setSubmitErr(e.message || "Помилка збереження");
    } finally { setSubmitting(false); }
  }

  const rankEmoji = (i:number) => ["🥇","🥈","🥉"][i] || `${i+1}.`;
  const isWin = stateRef.current?.phase === "win";

  return (
    <div className={styles.wrapper}>
      {/* HUD */}
      <div className={styles.hud}>
        <span>Рахунок: <strong>{display.score}</strong></span>
        <span>{"❤️".repeat(Math.max(0,display.lives))}</span>
      </div>

      {/* Canvas + overlay */}
      <div className={styles.canvasWrap}>
        <canvas ref={canvasRef} width={W} height={H} className={styles.canvas} />

        {/* Game over / win overlay */}
        {(display.phase==="over"||display.phase==="win") && modal==="none" && (
          <div className={styles.overlay}>
            <div className={styles.overlayBox}>
              <div className={styles.overlayIcon}>{isWin?"🎉":"💀"}</div>
              <h2>{isWin?"Ти виграв!":"Гра закінчена"}</h2>
              <p>Твій рахунок: <strong>{finalScore}</strong></p>
              <button className={styles.ctaBtn} onClick={()=>setModal("submit")}>
                Зберегти в таблицю рекордів
              </button>
              <button className={styles.ghostBtn} onClick={initGame}>Ще раз</button>
            </div>
          </div>
        )}

        {/* Submit modal */}
        {modal==="submit" && (
          <div className={styles.overlay}>
            <div className={styles.overlayBox}>
              <div className={styles.overlayIcon}>{isWin?"🏆":"📊"}</div>
              <h2>Рахунок: {finalScore}</h2>
              <p className={styles.modalSub}>Залиш ім&apos;я та email — потрапиш у таблицю рекордів</p>
              <input
                className={styles.input}
                placeholder="Ім'я або нікнейм"
                value={form.name}
                onChange={e=>setForm(f=>({...f,name:e.target.value}))}
              />
              <input
                className={styles.input}
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={e=>setForm(f=>({...f,email:e.target.value}))}
              />
              {submitErr && <p className={styles.err}>{submitErr}</p>}
              <button className={styles.ctaBtn} onClick={submitScore} disabled={submitting}>
                {submitting?"Зберігаємо...":"Зберегти результат"}
              </button>
              <button className={styles.ghostBtn} onClick={initGame}>Пропустити та грати ще раз</button>
            </div>
          </div>
        )}

        {/* Submitted */}
        {modal==="done" && (
          <div className={styles.overlay}>
            <div className={styles.overlayBox}>
              <div className={styles.overlayIcon}>✅</div>
              <h2>Збережено!</h2>
              <p>Перевір таблицю рекордів →</p>
              <button className={styles.ctaBtn} onClick={initGame}>Грати ще раз</button>
            </div>
          </div>
        )}
      </div>

      {/* D-Pad (desktop) */}
      <div className={styles.dpad} aria-label="Контролі">
        <div />
        <button onClick={()=>handleDir(0,-1)} aria-label="Вгору">↑</button>
        <div />
        <button onClick={()=>handleDir(-1,0)} aria-label="Ліво">←</button>
        <button onClick={()=>handleDir(0,1)}  aria-label="Вниз">↓</button>
        <button onClick={()=>handleDir(1,0)}  aria-label="Право">→</button>
      </div>

      {/* Joystick (mobile) */}
      <div
        className={styles.joystickZone}
        onTouchStart={e=>{
          e.preventDefault();
          const r=e.currentTarget.getBoundingClientRect();
          const x=e.touches[0].clientX-r.left, y=e.touches[0].clientY-r.top;
          joyBase.current={x,y};
          setJoyVis({bx:x,by:y,sx:x,sy:y});
        }}
        onTouchMove={e=>{
          e.preventDefault();
          const r=e.currentTarget.getBoundingClientRect();
          const x=e.touches[0].clientX-r.left, y=e.touches[0].clientY-r.top;
          const {x:bx,y:by}=joyBase.current;
          const dx=x-bx, dy=y-by, dist=Math.sqrt(dx*dx+dy*dy);
          const maxR=45, ang=Math.atan2(dy,dx);
          const cDist=Math.min(dist,maxR);
          setJoyVis({bx,by,sx:bx+Math.cos(ang)*cDist,sy:by+Math.sin(ang)*cDist});
          if(dist>18){
            if(Math.abs(dx)>Math.abs(dy)) handleDir(dx>0?1:-1,0);
            else handleDir(0,dy>0?1:-1);
          }
        }}
        onTouchEnd={()=>setJoyVis(null)}
      >
        {joyVis && <>
          <div className={styles.joyBase} style={{left:joyVis.bx,top:joyVis.by}} />
          <div className={styles.joyStick} style={{left:joyVis.sx,top:joyVis.sy}} />
        </>}
        <span className={styles.joyHint}>проведи пальцем</span>
      </div>

      {/* Leaderboard */}
      <div className={styles.board}>
        <h3 className={styles.boardTitle}>🏆 Таблиця рекордів</h3>
        {board.length === 0 ? (
          <p className={styles.boardEmpty}>Поки що рекордів нема.<br/>Будь першим!</p>
        ) : (
          <ol className={styles.boardList}>
            {board.map((s,i)=>(
              <li key={i} className={`${styles.boardRow} ${i===0?styles.first:""}`}>
                <span className={styles.boardRank}>{rankEmoji(i)}</span>
                <span className={styles.boardName}>{s.name}</span>
                <span className={styles.boardScore}>{s.score.toLocaleString()}</span>
              </li>
            ))}
          </ol>
        )}
        <button className={styles.refreshBtn} onClick={fetchBoard} aria-label="Оновити">↻ Оновити</button>
      </div>
    </div>
  );
}
