import { FaGithub } from 'react-icons/fa'

function ProjectCard({ project }) {
  return (
    <a
      href={project.github}
      target="_blank"
      rel="noreferrer"
      className="project-card group"
      style={{ '--project-accent': `var(--accent-${project.accent})` }}
      aria-label={`Open ${project.name} on GitHub`}
    >
      <div className="project-card-title">{project.name}</div>
      <p className="project-card-desc">{project.description}</p>
      <div className="project-card-footer">
        <FaGithub className="h-4 w-4 transition-colors group-hover:text-[color:var(--project-accent)]" />
        <span className="project-card-arrow" aria-hidden="true">
          →
        </span>
      </div>
    </a>
  )
}

export default function Projects() {
  const projects = [
    {
      name: 'CineplexDatabase',
      description:
        'A database systems course project: schema design, queries, and the structure behind an e-commerce-style application.',
      github: 'https://github.com/tfishhy/CineplexDatabase',
      accent: 'teal',
    },
    {
      name: 'SunsetFinder',
      description:
        'A small location-based tool that estimates sunset quality and helps you plan the best time to step outside.',
      github: 'https://github.com/tfishhy/SunsetFindr',
      accent: 'amber',
    },
    {
      name: 'Sneaky-Seats',
      description:
        'A full-stack experiment for finding empty seats in theaters, combining scraping-style inputs with a usable front-end.',
      github: 'https://github.com/tfishhy/Sneaky-Seats',
      accent: 'violet',
    },
    {
      name: 'QNotes',
      description:
        'A lightweight note-taking app focused on fast capture and a clean reading experience.',
      github: 'https://github.com/tfishhy/QNotes',
      accent: 'blue',
    },
    {
      name: 'AquaTrack',
      description:
        'An aquarium journal for water tests, maintenance notes, and reminders built for quick logging and calm review.',
      github: 'https://github.com/tfishhy/AquaTrack',
      accent: 'rose',
    },
  ]

  return (
    <section id="work">
      <h2 className="section-heading">projects</h2>
      <div className="mt-4 project-grid">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </section>
  )
}
