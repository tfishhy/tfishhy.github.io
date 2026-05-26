export default function Languages() {
  const items = [
    { name: 'English', level: 'Native', accent: 'blue' },
    { name: 'Polish', level: 'A1', accent: 'amber' },
  ]

  return (
    <section id="languages">
      <h2 className="section-heading">languages</h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {items.map((lang) => (
          <div
            key={lang.name}
            className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-3"
            style={{
              borderTop: `2px solid color-mix(in srgb, var(--accent-${lang.accent}) 35%, transparent)`,
            }}
          >
            <div
              className="text-sm font-semibold"
              style={{ color: `color-mix(in srgb, var(--accent-${lang.accent}) 75%, var(--fg))` }}
            >
              {lang.name}
            </div>
            <div className="mt-1 text-xs text-[color:var(--muted)]">{lang.level}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
