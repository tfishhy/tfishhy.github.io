export default function Skills() {
  const skills = [
    { short: 'JS', label: 'JavaScript' },
    { short: 'TS', label: 'TypeScript' },
    { short: 'RE', label: 'React' },
    { short: 'NX', label: 'Next.js' },
    { short: 'ND', label: 'Node.js' },
    { short: 'TW', label: 'Tailwind CSS' },
    { short: 'PG', label: 'PostgreSQL' },
    { short: 'MG', label: 'MongoDB' },
    { short: 'SQL', label: 'SQL' },
    { short: 'PY', label: 'Python' },
    { short: 'C', label: 'C' },
    { short: 'DK', label: 'Docker' },
    { short: 'GH', label: 'Git' },
    { short: 'SEC', label: 'Cybersecurity' },
    { short: 'NET', label: 'Networking' },
    { short: 'WS', label: 'Wireshark' },
    { short: 'MS', label: 'Metasploit' },
  ]

  return (
    <section id="skills">
      <h2 className="section-heading">skills</h2>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-[color:var(--muted)]">
        {skills.map((s) => (
          <span
            key={s.label}
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-1"
          >
            <span className="flex h-5 w-7 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--chip)] text-[10px] font-semibold text-[color:var(--fg)]">
              {s.short}
            </span>
            <span className="font-mono">{s.label}</span>
          </span>
        ))}
      </div>
    </section>
  )
}
