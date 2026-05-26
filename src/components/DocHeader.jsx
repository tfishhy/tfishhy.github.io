import { useEffect, useMemo, useState } from 'react'
import SocialLinks from './SocialLinks.jsx'

function formatTorontoTime(date) {
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Toronto',
    hour: 'numeric',
    minute: '2-digit',
  })
  const tz = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Toronto',
    timeZoneName: 'short',
  }).formatToParts(date)
  const shortTz = tz.find((p) => p.type === 'timeZoneName')?.value
  return `${fmt.format(date)} ${shortTz ?? ''}`.trim()
}

function useTheme() {
  const getInitial = () => {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
    return 'system'
  }

  const [mode, setMode] = useState(getInitial)
  const [resolved, setResolved] = useState(() => {
    if (getInitial() === 'dark') return 'dark'
    if (getInitial() === 'light') return 'light'
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const apply = (m) => {
      const effective =
        m === 'system'
          ? window.matchMedia?.('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : m
      setResolved(effective)
      const root = document.documentElement
      root.classList.toggle('dark', effective === 'dark')
    }

    apply(mode)
    localStorage.setItem('theme', mode)

    if (mode === 'system') {
      const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
      const handler = () => apply('system')
      mq?.addEventListener('change', handler)
      return () => mq?.removeEventListener('change', handler)
    }
  }, [mode])

  return { mode, resolved, setMode }
}

export default function DocHeader() {
  const { mode, resolved, setMode } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30 * 1000)
    return () => window.clearInterval(id)
  }, [])

  const torontoTime = useMemo(() => formatTorontoTime(now), [now])

  return (
    <header>
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <img
            src="/ecco.jpg"
            alt="Lucas Bigas"
            className="h-20 w-20 shrink-0 rounded-full border border-[color:var(--border)] object-cover"
          />
          <div>
            <div className="text-xl font-semibold tracking-tight">Lucas Bigas</div>
            <div className="mt-1 text-sm font-medium">
              <span className="text-[color:var(--accent-rose)]">security</span>
              <span className="text-[color:var(--muted)] opacity-50"> · </span>
              <span className="text-[color:var(--accent-blue)]">code</span>
              <span className="text-[color:var(--muted)] opacity-50"> · </span>
              <span className="text-[color:var(--accent-teal)]">build</span>
            </div>
            <div className="mt-1 text-sm text-[color:var(--muted)]">
              Toronto, ON · {torontoTime}
            </div>
          </div>
        </div>

        <div className="relative shrink-0 text-right text-sm text-[color:var(--muted)]">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--chip)] px-3 py-1.5 text-xs text-[color:var(--muted)] hover:text-[color:var(--fg)]"
          >
            <span>{mode === 'system' ? '모' : mode === 'dark' ? '☾' : '☼'}</span>
            <span className="text-xs">
              {mode === 'system' ? 'System' : resolved === 'dark' ? 'Dark' : 'Light'}
            </span>
            <span className="text-[10px]">▾</span>
          </button>
          {menuOpen && (
            <div className="absolute right-0 z-10 mt-2 w-32 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg)] p-1 text-[11px] shadow-lg">
              {[
                { key: 'light', label: 'Light', icon: '☼' },
                { key: 'dark', label: 'Dark', icon: '☾' },
                { key: 'system', label: 'System', icon: '모' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => {
                    setMode(opt.key)
                    setMenuOpen(false)
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 hover:bg-[color:var(--chip)] ${
                    mode === opt.key ? 'text-[color:var(--fg)]' : 'text-[color:var(--muted)]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </span>
                  {mode === opt.key && <span>✓</span>}
                </button>
              ))}
            </div>
          )}
          <div className="mt-2">
            cybersecurity @{' '}
            <a className="text-link" href="https://www.yorku.ca/" target="_blank" rel="noreferrer">
              York University
            </a>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-1.5 text-sm text-[color:var(--muted)]">
        <SocialLinks compact />
        <p className="max-w-[62ch] leading-relaxed">
          <span className="text-[color:var(--accent-rose)]">Cybersecurity student</span> focused on
          building <span className="text-[color:var(--accent-teal)]">practical software</span>,
          learning how systems fail, and strengthening them. I like{' '}
          <span className="text-[color:var(--accent-violet)]">calm interfaces</span> and clean
          foundations.
        </p>
      </div>
    </header>
  )
}
