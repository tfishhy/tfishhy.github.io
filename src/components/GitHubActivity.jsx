import { useEffect, useMemo, useState } from 'react'

function toISODate(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function getWeekStartSunday(date) {
  const d = startOfDay(date)
  const day = d.getDay() // 0=Sun..6=Sat
  return addDays(d, -day)
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function monthLabel(date) {
  return MONTHS[date.getMonth()]
}

function palette(level, dark) {
  // GitHub-ish greens; keep subtle.
  const light = ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
  const d = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
  const arr = dark ? d : light
  return arr[Math.max(0, Math.min(arr.length - 1, level))]
}

function levelForCount(count) {
  if (count <= 0) return 0
  if (count <= 2) return 1
  if (count <= 6) return 2
  if (count <= 12) return 3
  return 4
}

export default function GitHubActivity({ username = 'tfishhy', days = 365 }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false
    const controller = new AbortController()

    async function run() {
      try {
        setError('')
        // Public endpoint used by many contribution widgets.
        const url = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(
          username,
        )}?y=last`
        const res = await fetch(url, { signal: controller.signal })
        if (!res.ok) throw new Error('Failed to fetch contributions')
        const json = await res.json()
        if (ignore) return
        setData(json)
      } catch (e) {
        if (ignore) return
        setError(e?.message || 'Failed to load contributions')
      }
    }

    run()
    return () => {
      ignore = true
      controller.abort()
    }
  }, [username])

  const { weeks, total, monthStarts } = useMemo(() => {
    const today = startOfDay(new Date())
    const start = addDays(today, -(days - 1))
    const gridStart = getWeekStartSunday(start)
    const gridEnd = addDays(today, 1) // inclusive end boundary

    const counts = new Map()
    let computedTotal = 0

    if (data?.contributions) {
      for (const c of data.contributions) {
        if (!c?.date) continue
        const key = c.date
        const count = Number(c.count || 0)
        counts.set(key, count)
      }
    }

    const w = []
    const monthStartLabels = []

    let cursor = new Date(gridStart)
    let weekIndex = 0
    while (cursor < gridEnd) {
      const col = []
      for (let r = 0; r < 7; r++) {
        const key = toISODate(cursor)
        const inRange = cursor >= start && cursor <= today
        const count = inRange ? counts.get(key) ?? 0 : null
        if (typeof count === 'number') computedTotal += count
        col.push({
          date: key,
          inRange,
          count,
        })
        cursor = addDays(cursor, 1)
      }

      // Month label when the week contains a month boundary near its start.
      const firstInWeek = col.find((x) => x.inRange)
      if (firstInWeek) {
        const d = new Date(firstInWeek.date + 'T00:00:00')
        if (d.getDate() <= 7) {
          monthStartLabels.push({ weekIndex, label: monthLabel(d) })
        }
      }

      w.push(col)
      weekIndex++
    }

    // Avoid counting total before data loads.
    const safeTotal = data ? computedTotal : null
    return { weeks: w, total: safeTotal, monthStarts: monthStartLabels }
  }, [data, days])

  const isDark = document.documentElement.classList.contains('dark')

  return (
    <div>
      <div className="github-activity-wrap">
      <div className="github-activity">
        <div className="github-months">
          {monthStarts.map((m, i) => {
            const nextWeek = monthStarts[i + 1]?.weekIndex ?? weeks.length
            const span = Math.max(1, nextWeek - m.weekIndex)
            return (
              <div
                key={`${m.weekIndex}-${m.label}`}
                className="github-month"
                style={{ gridColumn: `${m.weekIndex + 1} / span ${span}` }}
              >
                {m.label}
              </div>
            )
          })}
        </div>

        <div className="github-grid" aria-label="GitHub contributions grid">
          {weeks.map((col, cIdx) => (
            <div key={cIdx} className="github-col">
              {col.map((cell) => {
                const count = cell.count
                const bg =
                  typeof count === 'number'
                    ? palette(levelForCount(count), isDark)
                    : 'transparent'
                const title =
                  typeof count === 'number'
                    ? `${count} contributions on ${cell.date}`
                    : ''
                return (
                  <span
                    key={cell.date}
                    className="github-cell"
                    title={title}
                    style={{
                      background: bg,
                      opacity: cell.inRange ? 1 : 0,
                    }}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-[color:var(--muted)]">
        <div>
          {error ? (
            <>
              {error}.{' '}
              <a
                className="hover:underline"
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
              >
                View profile
              </a>
            </>
          ) : total == null ? (
            'Loading contributions…'
          ) : (
            <>
              <span className="text-[color:var(--accent-teal)]">{total.toLocaleString()}</span>{' '}
              contributions in the last year
            </>
          )}
        </div>
        <a
          className="text-[color:var(--accent-violet)] transition-opacity hover:opacity-75"
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
        >
          @{username}
        </a>
      </div>
    </div>
  )
}

