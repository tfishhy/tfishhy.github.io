export default function Languages() {
  const items = [
    { name: 'English', level: 'Native' },
    { name: 'Polish', level: 'A1' },
  ]

  return (
    <section id="languages">
      <h2 className="section-heading">languages</h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {items.map((lang) => (
          <div
            key={lang.name}
            className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-3"
          >
            <div className="text-sm font-semibold text-[color:var(--fg)]">{lang.name}</div>
            <div className="mt-1 text-xs text-[color:var(--muted)]">{lang.level}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
