import { FaGithub } from 'react-icons/fa'

function TechChip({ tag }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--chip)] px-2.5 py-0.5 font-mono text-[11px] text-[color:var(--muted)]">
      {tag}
    </span>
  )
}

function ProjectCard({ project }) {
  return (
    <div className="py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold hover:underline"
            >
              {project.name}
            </a>
            <span className="text-sm text-[color:var(--muted)]">
              {project.description}
            </span>
          </div>

          {project.tags?.length ? (
            <div className="mt-2 flex flex-wrap gap-2 font-mono">
              {project.tags.map((t) => (
                <TechChip key={t} tag={t} />
              ))}
            </div>
          ) : null}
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-[color:var(--muted)] hover:text-[color:var(--fg)]"
          aria-label={`Open ${project.name} on GitHub`}
          title="GitHub"
        >
          <FaGithub className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}

export default function Projects() {
  const projects = [
    {
      name: 'SunsetFinder',
      description:
        'A small location-based tool that estimates sunset quality and helps you plan the best time to step outside.',
      tags: ['JavaScript', 'React', 'CSS'],
      github: 'https://github.com/tfishhy/SunsetFindr',
    },
    {
      name: 'AquaTrack',
      description:
        'An aquarium journal for water tests, maintenance notes, and reminders — built for quick logging and calm review.',
      tags: ['JavaScript', 'React', 'CSS'],
      github: 'https://github.com/tfishhy/AquaTrack',
    },
    {
      name: 'CineplexDatabase',
      description:
        'A database systems course project: schema design, queries, and the structure behind an e-commerce-style application.',
      tags: ['SQL'],
      github: 'https://github.com/tfishhy/CineplexDatabase',
    },
    {
      name: 'QNotes',
      description:
        'A lightweight note-taking app focused on fast capture and a clean reading experience.',
      tags: ['JavaScript', 'CSS', 'Node.js'],
      github: 'https://github.com/tfishhy/QNotes',
    },
    {
      name: 'Sneaky-Seats',
      description:
        'A full-stack experiment for finding empty seats in theaters, combining scraping-style inputs with a usable front-end.',
      tags: ['JavaScript', 'React', 'CSS'],
      github: 'https://github.com/tfishhy/Sneaky-Seats',
    },
  ]

  return (
    <section id="work">
      <div className="section-label">Projects</div>
      <div className="mt-2 divide-y divide-[color:var(--border)]">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </section>
  )
}

