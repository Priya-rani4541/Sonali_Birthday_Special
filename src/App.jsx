import { useMemo, useRef, useState, useEffect } from 'react'
import { Timer, Quiz, OpenWhen, Gifts, Timeline, Reasons, Scratch, Jar, Celebration } from './extras.jsx'
import { CAKE_WISH, FINAL_MESSAGE } from './data.js'
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/* ---------- Local assets (auto-loaded, naturally sorted) ---------- */
const byNum = (a, b) => a.localeCompare(b, undefined, { numeric: true })
const load = (mods) =>
  Object.entries(mods).sort(([a], [b]) => byNum(a, b)).map(([, url]) => url)

const PHOTOS = load(
  import.meta.glob('./assets/sonali*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' })
)
const VIDEOS = load(
  import.meta.glob('./assets/video*.{mp4,webm,mov}', { eager: true, query: '?url', import: 'default' })
)
// Optional: drop any file named music.mp3 (or .m4a/.ogg/.wav) into src/assets
const MUSIC = load(
  import.meta.glob('./assets/music.{mp3,m4a,ogg,wav}', { eager: true, query: '?url', import: 'default' })
)[0]

const CAPTIONS = [
  'My favourite girl', 'Pure happiness', 'Partners in crime', 'Our little world',
  'Always smiling', 'Sister goals', 'Forever & always', 'Sunshine in human form',
]

const LETTER = [
  'My dearest Sonali,',
  'Today the world celebrates the most beautiful, cute and kind-hearted girl I know, and I get to call her my sister.',
  'You never ask for much. Whatever you have, you hold it with a happy heart, and somehow that makes everything around you feel like enough. You care for our family without being asked, and you have stood beside me through every stage of my life.',
  'You are my crime partner, my biggest supporter, and the only girl I can tell anything to and feel completely safe. No judgement, no fear. Just you, listening.',
  'You always speak the truth, even when people misunderstand you as rude. I know better. Behind every honest word is the purest, softest heart, one that only wants the best for the people it loves.',
  'Thank you for being you. Thank you for being mine. I am so grateful God gave me you as a sister, and I love you more than any words on this page can hold.',
  'Happy Birthday, my heart. ❤️',
]

/* ---------- Floating hearts, stars and petals ---------- */
const SYMBOLS = ['❤', '✦', '🌸', '💗', '✨', '🌷', '💖', '⭐', '🦋', '🌺']
function Floaters() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const py = useTransform(scrollY, [0, 3000], [0, -260])
  const items = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        s: SYMBOLS[i % SYMBOLS.length],
        x: Math.random() * 100,
        size: 12 + Math.random() * 22,
        dur: 14 + Math.random() * 16,
        delay: -Math.random() * 20,
        sway: 20 + Math.random() * 40,
      })),
    []
  )
  if (reduce) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div style={{ y: py }} className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-lavender/50 blur-3xl" />
      <motion.div style={{ y: py }} className="absolute -right-20 top-2/3 h-80 w-80 rounded-full bg-blush/60 blur-3xl" />
      {items.map((it) => (
        <motion.span
          key={it.id}
          className="absolute select-none opacity-60"
          style={{ left: `${it.x}%`, fontSize: it.size, color: '#f28bb0', textShadow: '0 0 12px #ffd6e4' }}
          initial={{ y: '110vh' }}
          animate={{ y: '-10vh', x: [0, it.sway, -it.sway, 0], rotate: [0, 25, -25, 0] }}
          transition={{ duration: it.dur, delay: it.delay, repeat: Infinity, ease: 'linear' }}
        >
          {it.s}
        </motion.span>
      ))}
    </div>
  )
}

/* ---------- Confetti + heart burst ---------- */
const COLORS = ['#f28bb0', '#d9c8f5', '#ffd6e4', '#8b6bc7', '#ffe27a', '#fff8ef']
function Burst({ show }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => {
        const a = Math.random() * Math.PI * 2
        const d = 120 + Math.random() * 340
        return {
          id: i, heart: i % 4 === 0, c: COLORS[i % COLORS.length],
          x: Math.cos(a) * d, y: Math.sin(a) * d - 120,
          r: Math.random() * 720 - 360, sz: 8 + Math.random() * 12,
        }
      }),
    []
  )
  if (!show) return null
  return (
    <div className="pointer-events-none fixed left-1/2 top-1/2 z-50" aria-hidden>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute"
          style={{ fontSize: p.sz * 1.4, color: p.c, width: p.sz, height: p.sz, background: p.heart ? 'none' : p.c, borderRadius: 2 }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{ x: p.x, y: p.y + 260, opacity: 0, rotate: p.r, scale: 1 }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
        >
          {p.heart ? '❤' : ''}
        </motion.span>
      ))}
    </div>
  )
}

/* ---------- Hero ---------- */
const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
const HEADING = 'Happy Birthday, My Beautiful Sister Sonali! 🎂❤️'.split(' ')

function Sparkles() {
  const dots = useMemo(
    () => Array.from({ length: 22 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100, s: 3 + Math.random() * 5,
      d: 2 + Math.random() * 3, delay: Math.random() * 4,
    })), [])
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((p) => (
        <motion.span
          key={p.id} className="absolute rounded-full bg-white"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, boxShadow: '0 0 10px 3px #fff, 0 0 18px 6px #f8c8dc' }}
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 0.4] }}
          transition={{ duration: p.d, delay: p.delay, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

function Hero({ opened, onOpen }) {
  const photo = PHOTOS[0]
  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-16 text-center">
      <Sparkles />
      <motion.div
        initial={{ scale: 0.7, opacity: 0, rotate: -4 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 70, damping: 14, duration: 1.2 }}
        className="relative"
      >
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="relative">
          <motion.div
            aria-hidden animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.04, 1] }} transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute -inset-3 rounded-t-[999px] rounded-b-[2.25rem] border-2 border-white/80 blur-[2px]"
            style={{ boxShadow: '0 0 40px 8px rgba(242,139,176,.45), 0 0 80px 20px rgba(217,200,245,.5)' }}
          />
          <motion.div
            animate={{ boxShadow: ['0 18px 45px rgba(194,70,122,.30), 0 0 30px rgba(242,139,176,.5)', '0 24px 60px rgba(139,107,199,.35), 0 0 70px rgba(217,200,245,.9)', '0 18px 45px rgba(194,70,122,.30), 0 0 30px rgba(242,139,176,.5)'] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative h-64 w-52 overflow-hidden rounded-t-[999px] rounded-b-3xl border-[6px] border-white bg-blush sm:h-80 sm:w-64"
          >
            {photo ? (
              <img src={photo} alt="Sonali" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center p-4 font-hand text-xl text-deeprose">Add sonali1.png to src/assets</div>
            )}
          </motion.div>
          <motion.span animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -right-4 -top-3 text-3xl">🌸</motion.span>
          <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2.4, repeat: Infinity }} className="absolute -bottom-3 -left-4 text-3xl">✨</motion.span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="mt-9 inline-flex items-center gap-2 rounded-full border border-white bg-white/70 px-4 py-1 font-hand text-xl text-deeprose shadow-md"
      >
        Made with Love
        <motion.span animate={{ scale: [1, 1.35, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>❤️</motion.span>
      </motion.div>

      <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold italic leading-[1.15] tracking-tight text-plum sm:text-6xl">
        {HEADING.map((w, i) => (
          <motion.span
            key={i} className="mr-[0.25em] inline-block"
            initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.8 + i * 0.12, duration: 0.7 }}
          >
            {w}
          </motion.span>
        ))}
      </h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.9 }}
        className="relative mt-5 overflow-hidden rounded-full bg-gradient-to-r from-blush via-lavender to-blush px-5 py-1.5 text-base font-bold text-plum shadow"
      >
        Today is All About You! 🎉
        <motion.span
          aria-hidden className="absolute inset-y-0 w-10 bg-white/60 blur-md"
          animate={{ left: ['-20%', '120%'] }} transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.5 }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }}
        className="mt-5 max-w-xl font-hand text-2xl text-deeprose sm:text-3xl"
      >
        To my sister, my best friend, my safe place, and my forever crime partner.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: [1, 1.06, 1] }}
        transition={{ delay: 2.5, scale: { repeat: Infinity, duration: 2, delay: 2.5 } }}
        whileHover={{ scale: 1.12, boxShadow: '0 0 45px 8px rgba(242,139,176,.75)' }} whileTap={{ scale: 0.92, rotate: -2 }}
        onClick={onOpen}
        className="mt-9 rounded-full bg-gradient-to-r from-rose to-violet px-9 py-4 text-lg font-bold text-white shadow-glow"
      >
        {opened ? 'Celebrate Again 🎉' : 'Open Your Surprise 🎁'}
      </motion.button>

      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }}
        onClick={() => (opened ? scrollTo('memories') : onOpen())} aria-label="Scroll down"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 font-hand text-lg text-deeprose"
      >
        <span className="block">scroll down</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }} className="block text-2xl leading-none">⌄</motion.span>
      </motion.button>
    </section>
  )
}

/* ---------- Section heading ---------- */
const Title = ({ children, sub }) => (
  <div className="mb-10 text-center">
    <h2 className="font-display text-3xl font-semibold italic text-plum sm:text-5xl">{children}</h2>
    <p className="mt-2 font-hand text-2xl text-deeprose">{sub}</p>
  </div>
)

/* ---------- Gallery ---------- */
function Gallery() {
  const [active, setActive] = useState(null)
  return (
    <section id="memories" className="relative z-10 mx-auto max-w-6xl px-5 py-20">
      <Title sub="Little moments, big love">Our Beautiful Memories 📸</Title>
      {PHOTOS.length === 0 ? (
        <p className="text-center font-hand text-2xl text-deeprose">Add sonali1.png, sonali2.png… to src/assets</p>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {PHOTOS.map((src, i) => (
            <motion.button
              key={src}
              layoutId={src}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 30, rotate: i % 2 ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.06, rotate: 0, boxShadow: '0 0 35px rgba(242,139,176,.8)' }}
              className="rounded-2xl bg-white p-2 pb-3 text-left shadow-lg"
            >
              <img src={src} alt={CAPTIONS[i % CAPTIONS.length]} loading="lazy" className="aspect-[4/5] w-full rounded-xl object-cover object-top" />
              <p className="mt-2 text-center font-hand text-xl text-deeprose">{CAPTIONS[i % CAPTIONS.length]}</p>
            </motion.button>
          ))}
        </div>
      )}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-plum/70 p-5 backdrop-blur-sm"
          >
            <motion.div layoutId={PHOTOS[active]} className="max-h-full rounded-3xl bg-white p-3 shadow-glow">
              <img src={PHOTOS[active]} alt="" className="max-h-[75vh] rounded-2xl object-contain" />
              <p className="mt-2 text-center font-hand text-2xl text-deeprose">{CAPTIONS[active % CAPTIONS.length]}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ---------- Videos ---------- */
function VideoCard({ src, i }) {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="relative overflow-hidden rounded-3xl border-4 border-white bg-white shadow-glow"
    >
      <video
        ref={ref} src={src} controls={playing} preload="metadata" playsInline
        onPlay={() => setPlaying(true)} onEnded={() => setPlaying(false)}
        className="aspect-video w-full bg-plum object-cover"
      />
      {!playing && (
        <button
          onClick={() => ref.current.play()} aria-label={`Play video ${i + 1}`}
          className="absolute inset-0 flex items-center justify-center bg-plum/25"
        >
          <motion.span
            animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 pl-1 text-3xl text-deeprose shadow-glow"
          >
            ▶
          </motion.span>
        </button>
      )}
      <p className="py-2 text-center font-hand text-xl text-deeprose">Memory #{i + 1} 💗</p>
    </motion.div>
  )
}
function Videos() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-5 py-20">
      <Title sub="Moments worth replaying">Our Unforgettable Moments 🎥</Title>
      {VIDEOS.length === 0 ? (
        <p className="text-center font-hand text-2xl text-deeprose">Add video1.mp4, video2.mp4… to src/assets</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {VIDEOS.map((v, i) => <VideoCard key={v} src={v} i={i} />)}
        </div>
      )}
    </section>
  )
}

/* ---------- Letter ---------- */
function Letter() {
  return (
    <section id="letter" className="relative z-10 mx-auto max-w-2xl px-5 py-20">
      <Title sub="Written with all my love">A Letter From My Heart 💌</Title>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="paper rounded-2xl border border-blush p-7 shadow-glow sm:p-12"
      >
        {LETTER.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className={`mb-8 font-hand text-2xl ${i === 0 || i === LETTER.length - 1 ? 'text-3xl text-deeprose' : ''}`}
          >
            {line}
          </motion.p>
        ))}
        <p className="text-right font-hand text-2xl text-violet">Forever yours, with all my love</p>
      </motion.div>
    </section>
  )
}

/* ---------- Why she's special ---------- */
const SPECIAL = [
  ['My Safe Place ❤️', 'With you, I never have to pretend.'],
  ['My Forever Crime Partner 🤝', 'Every adventure is better with you.'],
  ['My Biggest Support System 🌸', 'You have stood by me at every turn.'],
  ['The Kindest Heart 💖', 'You care for everyone and ask for nothing.'],
  ['My Honest and Fearless Sister ✨', 'You speak the truth, and your heart is pure gold.'],
  ['My Partner in Every Stage of Life 🫂', 'From then till now, you were always there.'],
]
function Special() {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-5 py-20">
      <Title sub="Just a few of the reasons I love you">Why You Are Special 🌷</Title>
      <motion.div
        initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
        variants={{ show: { transition: { staggerChildren: 0.15 } } }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SPECIAL.map(([t, d], i) => (
          <motion.div
            key={t}
            variants={{ hidden: { opacity: 0, y: 40, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1 } }}
            whileHover={{ y: -8, boxShadow: '0 0 35px rgba(242,139,176,.7)' }}
            className={`rounded-3xl border border-white p-6 text-center shadow-lg ${i % 2 ? 'bg-lavender/60' : 'bg-blush/70'}`}
          >
            <h3 className="font-display text-xl font-semibold italic">{t}</h3>
            <p className="mt-2 font-hand text-2xl text-deeprose">{d}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

/* ---------- Music (uses music.mp3 if present, else a soft built-in lullaby) ---------- */
const CHORDS = [[261.63, 329.63, 392], [220, 261.63, 329.63], [174.61, 220, 261.63], [196, 246.94, 293.66]]
function useLullaby() {
  const ctx = useRef(null)
  const timer = useRef(null)
  const gain = useRef(null)
  const start = () => {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    ctx.current ??= new AC()
    const c = ctx.current
    c.resume()
    gain.current = c.createGain()
    gain.current.gain.value = 0.13
    gain.current.connect(c.destination)
    let step = 0
    const note = (f, dur, vol) => {
      const o = c.createOscillator(), g = c.createGain(), t = c.currentTime
      o.type = 'triangle'; o.frequency.value = f
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.03)
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
      o.connect(g); g.connect(gain.current); o.start(t); o.stop(t + dur)
    }
    const tick = () => {
      const chord = CHORDS[Math.floor(step / 8) % 4]
      if (step % 8 === 0) note(chord[0] / 2, 3.2, 0.9)
      note(chord[[0, 1, 2, 1, 2, 1, 0, 1][step % 8]] * 2, 1.4, 0.6)
      step++
    }
    tick(); timer.current = setInterval(tick, 480)
  }
  const stop = () => { clearInterval(timer.current); gain.current?.disconnect() }
  useEffect(() => stop, [])
  return { start, stop }
}
function MusicPlayer() {
  const audio = useRef(null)
  const synth = useLullaby()
  const [on, setOn] = useState(false)
  const toggle = () => {
    if (MUSIC) (on ? audio.current.pause() : audio.current.play())
    else (on ? synth.stop() : synth.start())
    setOn(!on)
  }
  const stopper = useRef()
  stopper.current = () => { if (on) toggle() }
  useEffect(() => {
    const h = () => stopper.current()
    window.addEventListener('stop-music', h)
    return () => window.removeEventListener('stop-music', h)
  }, [])
  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-3 rounded-full bg-white/85 py-2 pl-2 pr-5 shadow-glow backdrop-blur">
      {MUSIC && <audio ref={audio} src={MUSIC} loop />}
      <motion.button
        onClick={toggle} whileTap={{ scale: 0.9 }} aria-label={on ? 'Pause music' : 'Play music'}
        animate={on ? { rotate: 360 } : { rotate: 0 }} transition={on ? { repeat: Infinity, duration: 6, ease: 'linear' } : {}}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-rose to-violet text-white"
      >
        {on ? '❚❚' : '♪'}
      </motion.button>
      <span className="font-hand text-xl text-deeprose">{on ? 'Playing softly' : 'Play music'}</span>
    </div>
  )
}

/* ---------- Finale cake ---------- */
function Cake({ lit }) {
  return (
    <svg viewBox="0 0 240 240" className="mx-auto w-64 sm:w-80" role="img" aria-label="Birthday cake">
      <ellipse cx="120" cy="222" rx="100" ry="10" fill="#d9c8f5" opacity=".6" />
      <rect x="30" y="150" width="180" height="65" rx="14" fill="#f28bb0" />
      <rect x="55" y="105" width="130" height="50" rx="12" fill="#ffd6e4" />
      <path d="M30 165 q15 20 30 0 t30 0 t30 0 t30 0 t30 0 t30 0" fill="#fff8ef" />
      <path d="M55 118 q11 16 22 0 t22 0 t22 0 t22 0 t22 0" fill="#fff8ef" />
      {[85, 120, 155].map((x, i) => (
        <g key={x}>
          <rect x={x - 4} y="72" width="8" height="34" rx="3" fill={i % 2 ? '#8b6bc7' : '#fff'} stroke="#d9c8f5" />
          {lit && (
            <motion.ellipse
              cx={x} cy="62" rx="7" ry="12" fill="#ffd54a"
              style={{ filter: 'drop-shadow(0 0 8px #ffb300)' }}
              animate={{ scaleY: [1, 1.2, 0.9, 1.1, 1], scaleX: [1, 0.85, 1.05, 0.9, 1] }}
              transition={{ repeat: Infinity, duration: 0.9 + i * 0.2 }}
            />
          )}
        </g>
      ))}
      <text x="120" y="192" textAnchor="middle" fontSize="20" fill="#fff8ef" fontFamily="Caveat" fontWeight="700">Sonali ❤</text>
    </svg>
  )
}
function Finale({ onCelebrate, onReplay }) {
  const [lit, setLit] = useState(true)
  const [wished, setWished] = useState(false)
  const blow = () => {
    if (lit) { setLit(false); setWished(true); onCelebrate() }
    else { setLit(true); setWished(false) }
  }
  return (
    <section className="relative z-10 overflow-hidden px-5 pb-32 pt-20 text-center">
      <Title sub="Close your eyes and make a wish">Your Birthday Cake 🎂</Title>
      <div className="relative">
        {['❤', '💗', '✨', '💖', '❤', '🌸'].map((h, i) => (
          <motion.span
            key={i} aria-hidden className="absolute bottom-0 text-2xl text-rose"
            style={{ left: `${18 + i * 13}%` }}
            animate={{ y: [0, -240], opacity: [0, 1, 0], x: [0, i % 2 ? 18 : -18] }}
            transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.7 }}
          >
            {h}
          </motion.span>
        ))}
        <motion.div animate={lit ? { filter: 'drop-shadow(0 0 25px rgba(255,213,74,.7))' } : { filter: 'none' }}>
          <Cake lit={lit} />
        </motion.div>
      </div>
      <button onClick={blow} className="mt-6 rounded-full bg-white px-7 py-3 font-bold text-deeprose shadow-glow transition hover:scale-105">
        {lit ? 'Blow the candles 🌬️' : 'Light them again ✨'}
      </button>
      <AnimatePresence>
        {wished && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-3 font-hand text-2xl text-violet">
            {CAKE_WISH}
          </motion.p>
        )}
      </AnimatePresence>
      <motion.p
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
        className="mx-auto mt-14 max-w-2xl font-display text-2xl italic leading-relaxed text-plum sm:text-4xl"
      >
        {FINAL_MESSAGE}

      </motion.p>
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: '0 0 45px 8px rgba(242,139,176,.75)' }} whileTap={{ scale: 0.93 }}
        onClick={onReplay}
        className="mt-12 rounded-full bg-gradient-to-r from-rose to-violet px-9 py-4 text-lg font-bold text-white shadow-glow"
      >
        Replay the Surprise 🎁
      </motion.button>
    </section>
  )
}

/* ---------- App ---------- */
export default function App() {
  const [opened, setOpened] = useState(false)
  const [burst, setBurst] = useState(0)

  const celebrate = () => {
    setBurst((b) => b + 1)
    setTimeout(() => setBurst(0), 2600)
  }
  const open = () => {
    if (!opened) setOpened(true)
    celebrate()
    setTimeout(() => scrollTo('memories'), 900)
  }
  const replay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => setOpened(false), 900)
  }
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <main className="relative min-h-screen">
      <Floaters />
      <Burst key={burst} show={burst > 0} />
      <Hero opened={opened} onOpen={open} />
      <AnimatePresence>
        {opened && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <Timer />
            <Gallery />
            <Timeline />
            <Letter />
            <Special />
            <Reasons />
            <Videos />
            <Celebration />
            <Quiz />
            <OpenWhen />
            <Gifts onCelebrate={celebrate} />
            <Scratch onCelebrate={celebrate} />
            <Jar />
            <Finale onCelebrate={celebrate} onReplay={replay} />
          </motion.div>
        )}
      </AnimatePresence>
      <MusicPlayer />
    </main>
  )
}
