import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as D from './data.js'

const byNum = (a, b) => a.localeCompare(b, undefined, { numeric: true })
const load = (m) => Object.entries(m).sort(([a], [b]) => byNum(a, b)).map(([, u]) => u)
const PHOTOS = load(import.meta.glob('./assets/sonali*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' }))
const CELEB = load(import.meta.glob('./assets/celebration.{mp4,webm,mov}', { eager: true, query: '?url', import: 'default' }))[0]
const photo = (n) => PHOTOS[n - 1] || PHOTOS[0]

const Sec = ({ title, sub, children, max = 'max-w-5xl' }) => (
  <section className={`relative z-10 mx-auto ${max} px-5 py-20`}>
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 text-center">
      <h2 className="font-display text-3xl font-semibold italic text-plum sm:text-5xl">{title}</h2>
      <p className="mt-2 font-hand text-2xl text-deeprose">{sub}</p>
    </motion.div>
    {children}
  </section>
)
const pill = 'rounded-full bg-gradient-to-r from-rose to-violet px-7 py-3 font-bold text-white shadow-glow transition hover:scale-105'

/* 1. Live birthday timer */
export function Timer() {
  const [now, setNow] = useState(new Date())
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t) }, [])
  const { month, day } = D.BIRTHDAY
  const y = now.getFullYear()
  const today0 = new Date(y, now.getMonth(), now.getDate())
  const isToday = now.getMonth() === month - 1 && now.getDate() === day
  let target = new Date(y, month - 1, day)
  if (target < today0) target = new Date(y + 1, month - 1, day)
  const s = Math.max(0, Math.floor((isToday ? now - today0 : target - now) / 1000))
  const parts = [['Days', Math.floor(s / 86400)], ['Hours', Math.floor(s / 3600) % 24], ['Minutes', Math.floor(s / 60) % 60], ['Seconds', s % 60]]
  return (
    <Sec title={isToday ? 'Your Special Day Is Here, Sonali! 🎉' : 'Counting Down to Your Day 🎂'} sub={isToday ? 'Celebrating for' : 'Until your next birthday'} max="max-w-3xl">
      <div className="grid grid-cols-4 gap-3 sm:gap-5">
        {parts.map(([l, v]) => (
          <div key={l} className="rounded-2xl border-2 border-white bg-white/70 py-4 text-center shadow-glow">
            <motion.div key={v} initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-display text-3xl font-semibold text-deeprose sm:text-5xl">
              {String(v).padStart(2, '0')}
            </motion.div>
            <div className="font-hand text-lg text-violet sm:text-xl">{l}</div>
          </div>
        ))}
      </div>
    </Sec>
  )
}

/* 2. Sister bond quiz */
export function Quiz() {
  const [i, setI] = useState(0)
  const [score, setScore] = useState(0)
  const [pick, setPick] = useState(null)
  const done = i >= D.QUIZ.length
  const q = D.QUIZ[i]
  const choose = (k) => { if (pick === null) { setPick(k); if (k === q.answer) setScore((s) => s + 1) } }
  const result = [...D.QUIZ_RESULTS].reverse().find((r) => score >= r.min)
  return (
    <Sec title="Sister Bond Quiz 🧩" sub="How well do you know us?" max="max-w-2xl">
      <div className="rounded-3xl border-2 border-white bg-white/75 p-6 shadow-glow sm:p-8">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="end" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <p className="font-display text-4xl text-deeprose">{score} / {D.QUIZ.length}</p>
              <p className="mt-3 font-hand text-3xl">{result.msg}</p>
              <button className={`${pill} mt-6`} onClick={() => { setI(0); setScore(0); setPick(null) }}>Play again 🔁</button>
            </motion.div>
          ) : (
            <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <p className="font-hand text-xl text-violet">Question {i + 1} of {D.QUIZ.length} · Score {score}</p>
              <h3 className="mt-1 font-display text-2xl italic">{q.q}</h3>
              <div className="mt-5 grid gap-3">
                {q.options.map((o, k) => {
                  const state = pick === null ? 'bg-blush/60 hover:bg-blush' : k === q.answer ? 'bg-green-200' : k === pick ? 'bg-red-200' : 'bg-blush/40 opacity-70'
                  return <button key={o} onClick={() => choose(k)} className={`rounded-2xl px-4 py-3 text-left font-semibold transition ${state}`}>{o}</button>
                })}
              </div>
              {pick !== null && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="font-hand text-2xl text-deeprose">{pick === q.answer ? 'Correct! 🎉' : 'Oops! 😄'} {q.note}</p>
                  <button className={pill} onClick={() => { setI(i + 1); setPick(null) }}>{i + 1 === D.QUIZ.length ? 'See result' : 'Next'}</button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Sec>
  )
}

/* 3. Open when letters */
export function OpenWhen() {
  const [open, setOpen] = useState(null)
  return (
    <Sec title="Open When Letters ✉️" sub="Pick one when you need it">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {D.OPEN_WHEN.map((l, k) => (
          <motion.button key={l.title} onClick={() => setOpen(open === k ? null : k)} aria-expanded={open === k}
            whileHover={{ y: -6 }} whileTap={{ scale: 0.95 }}
            className={`relative rounded-2xl border-2 border-white p-4 text-center shadow-lg ${open === k ? 'bg-lavender' : 'bg-blush/80'}`}>
            <motion.div animate={{ rotateX: open === k ? 180 : 0 }} className="text-5xl">{open === k ? '💌' : '✉️'}</motion.div>
            <p className="mt-2 font-hand text-xl leading-tight text-plum">{l.title}</p>
          </motion.button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {open !== null && (
          <motion.div key={open} initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
            className="paper mx-auto mt-8 max-w-xl rounded-2xl border border-blush p-7 shadow-glow">
            <p className="font-hand text-2xl">{D.OPEN_WHEN[open].icon} {D.OPEN_WHEN[open].msg}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Sec>
  )
}

/* 4. Five gifts */
export function Gifts({ onCelebrate }) {
  const [opened, setOpened] = useState([])
  const open = (k) => { if (!opened.includes(k)) { setOpened([...opened, k]); onCelebrate() } }
  return (
    <Sec title="Unlock Your Birthday Gifts 🎁" sub={`${opened.length} of ${D.GIFTS.length} opened`}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {D.GIFTS.map((g, k) => {
          const on = opened.includes(k)
          return (
            <motion.button key={g.title} onClick={() => open(k)} aria-label={on ? g.title : `Open gift ${k + 1}`}
              whileHover={on ? {} : { scale: 1.05, rotate: [0, -3, 3, 0] }}
              className="min-h-[13rem] rounded-3xl border-2 border-white bg-white/75 p-5 text-center shadow-glow">
              <AnimatePresence mode="wait">
                {on ? (
                  <motion.div key="o" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
                    <h3 className="font-display text-xl italic text-deeprose">{g.icon} {g.title}</h3>
                    {g.type === 'photo' && photo(g.photo) && <img src={photo(g.photo)} alt="" className="mx-auto mt-3 max-h-60 rounded-xl object-contain" />}
                    <p className="mt-2 font-hand text-2xl">{g.text}</p>
                  </motion.div>
                ) : (
                  <motion.div key="c" exit={{ opacity: 0, scale: 0.5 }}>
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2 + k * 0.2 }} className="text-7xl">🎁</motion.div>
                    <p className="mt-3 font-hand text-xl text-violet">Tap to open</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>
    </Sec>
  )
}

/* 5. Timeline */
export function Timeline() {
  return (
    <Sec title="Our Journey Together 🛤️" sub="From then, till now" max="max-w-3xl">
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-1 rounded bg-gradient-to-b from-rose to-lavender sm:left-1/2" />
        {D.TIMELINE.map((t, k) => (
          <motion.div key={t.title} initial={{ opacity: 0, x: k % 2 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-60px' }}
            className={`relative mb-10 pl-12 sm:w-1/2 sm:pl-0 ${k % 2 ? 'sm:ml-auto sm:pl-10' : 'sm:pr-10 sm:text-right'}`}>
            <span className={`absolute left-1.5 top-2 h-6 w-6 rounded-full border-4 border-white bg-rose shadow sm:left-auto ${k % 2 ? 'sm:-left-3' : 'sm:-right-3'}`} />
            <div className="rounded-2xl border-2 border-white bg-white/75 p-4 shadow-lg">
              {photo(t.photo) ? <img src={photo(t.photo)} alt={t.title} loading="lazy" className="mb-3 max-h-96 w-full rounded-xl bg-blush/30 object-contain" /> : <div className="mb-2 text-5xl">{t.icon}</div>}
              <h3 className="font-display text-xl italic text-deeprose">{t.title}</h3>
              <p className="font-hand text-2xl">{t.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Sec>
  )
}

/* 6. Ten reasons */
const HEART = 'M50 88 C10 55 0 30 15 12 C30 -4 48 6 50 20 C52 6 70 -4 85 12 C100 30 90 55 50 88Z'
export function Reasons() {
  const [seen, setSeen] = useState([])
  return (
    <Sec title="10 Reasons You Are My Favorite Person 💗" sub="Tap each heart">
      <div className="flex flex-wrap justify-center gap-4">
        {D.REASONS.map((r, k) => {
          const on = seen.includes(k)
          return (
            <motion.button key={r} onClick={() => !on && setSeen([...seen, k])} aria-label={on ? r : `Reason ${k + 1}`}
              initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: (k % 5) * 0.08 }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative h-36 w-40">
              <svg viewBox="0 0 100 92" className="absolute inset-0 h-full w-full drop-shadow-lg">
                <path d={HEART} fill={on ? '#ffd6e4' : '#f28bb0'} stroke="#fff" strokeWidth="2" />
              </svg>
              <span className={`absolute inset-0 flex items-center justify-center px-9 pb-4 text-center leading-tight ${on ? 'font-hand text-lg text-plum' : 'font-display text-3xl text-white'}`}>
                {on ? r : k + 1}
              </span>
            </motion.button>
          )
        })}
      </div>
    </Sec>
  )
}

/* 7. Scratch card */
export function Scratch({ onCelebrate }) {
  const cv = useRef(null)
  const [done, setDone] = useState(false)
  const down = useRef(false)
  useEffect(() => {
    const c = cv.current, x = c.getContext('2d')
    const g = x.createLinearGradient(0, 0, 320, 160)
    g.addColorStop(0, '#f28bb0'); g.addColorStop(1, '#d9c8f5')
    x.fillStyle = g; x.fillRect(0, 0, 320, 160)
    x.fillStyle = '#fff'; x.font = '700 26px Caveat, cursive'; x.textAlign = 'center'
    x.fillText('Scratch me ✨', 160, 90)
  }, [])
  const scratch = (e) => {
    if (!down.current || done) return
    const c = cv.current, r = c.getBoundingClientRect(), x = c.getContext('2d')
    x.globalCompositeOperation = 'destination-out'
    x.beginPath(); x.arc((e.clientX - r.left) * 320 / r.width, (e.clientY - r.top) * 160 / r.height, 18, 0, 7); x.fill()
  }
  const check = () => {
    down.current = false
    const d = cv.current.getContext('2d').getImageData(0, 0, 320, 160).data
    let n = 0
    for (let i = 3; i < d.length; i += 16) if (d[i] === 0) n++
    if (n / (d.length / 16) > 0.45 && !done) { setDone(true); onCelebrate() }
  }
  return (
    <Sec title="Scratch to Reveal 🎟️" sub="A secret message is hiding" max="max-w-md">
      <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-glow">
        <div className="flex h-40 items-center justify-center bg-cream p-5 text-center font-hand text-3xl text-deeprose sm:h-[10rem]">{D.SCRATCH_MESSAGE}</div>
        <canvas ref={cv} width="320" height="160" aria-label="Scratch card" style={{ touchAction: 'none' }}
          className={`absolute inset-0 h-full w-full cursor-pointer transition-opacity duration-700 ${done ? 'opacity-0' : ''}`}
          onPointerDown={(e) => { down.current = true; scratch(e) }} onPointerMove={scratch} onPointerUp={check} onPointerLeave={() => down.current && check()} />
      </div>
      <p className="mt-3 text-center font-hand text-xl text-violet">{done ? 'You found it! 💖' : 'Use your finger or mouse'}</p>
    </Sec>
  )
}

/* 8. Jar of wishes */
const HC = ['#f28bb0', '#d9c8f5', '#ffb3c9', '#b79be6', '#ff8fab', '#c7b0f0']
export function Jar() {
  const [wish, setWish] = useState(null)
  return (
    <Sec title="A Jar Full of Wishes 🫙" sub="Pick a heart" max="max-w-xl">
      <div className="mx-auto w-72 sm:w-80">
        <div className="mx-auto h-5 w-44 rounded-t-xl bg-violet/70" />
        <div className="rounded-b-[3rem] rounded-t-2xl border-4 border-white bg-white/40 p-4 shadow-glow backdrop-blur">
          <div className="flex flex-wrap justify-center gap-1">
            {D.WISHES.map((w, k) => (
              <motion.button key={w} onClick={() => setWish(k)} aria-label={`Heart wish ${k + 1}`}
                animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2 + (k % 4) * 0.4 }}
                whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.8 }} className="text-4xl" style={{ color: HC[k % 6] }}>❤</motion.button>
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {wish !== null && (
          <motion.p key={wish} initial={{ opacity: 0, y: 20, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
            className="mx-auto mt-6 max-w-md rounded-2xl bg-white/80 p-5 text-center font-hand text-3xl text-deeprose shadow-glow">{D.WISHES[wish]}</motion.p>
        )}
      </AnimatePresence>
    </Sec>
  )
}

/* Birthday celebration video (add src/assets/celebration.mp4, plays with sound) */
export function Celebration() {
  const ref = useRef(null)
  return (
    <Sec title={D.CELEBRATION_TITLE} sub="Turn the sound on and enjoy" max="max-w-3xl">
      {CELEB ? (
        <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="overflow-hidden rounded-3xl border-4 border-white bg-white shadow-glow">
          <video ref={ref} src={CELEB} controls playsInline preload="metadata" className="aspect-video w-full bg-plum"
            onPlay={() => window.dispatchEvent(new Event('stop-music'))} />
        </motion.div>
      ) : (
        <p className="text-center font-hand text-2xl text-deeprose">Add celebration.mp4 to src/assets</p>
      )}
    </Sec>
  )
}
