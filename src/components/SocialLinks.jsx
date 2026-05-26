import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export default function SocialLinks({
  githubUser = 'tfishhy',
  linkedinUrl = 'https://www.linkedin.com/in/lucasbigas4',
  email = 'lucasbigas24@gmail.com',
  compact = false,
}) {
  const link =
    'social-link text-sm text-[color:var(--muted)] transition-colors hover:text-[color:var(--link-accent,var(--fg))]'

  return (
    <div className={`inline-flex items-center ${compact ? 'gap-3' : 'gap-4'}`}>
      <a
        className={`${link} ${compact ? '' : 'inline-flex items-center gap-2'}`}
        data-tone="blue"
        href={`https://github.com/${githubUser}`}
        target="_blank"
        rel="noreferrer"
      >
        {!compact && <FaGithub className="h-4 w-4" />}
        GitHub
      </a>
      <a
        className={`${link} ${compact ? '' : 'inline-flex items-center gap-2'}`}
        data-tone="violet"
        href={linkedinUrl}
        target="_blank"
        rel="noreferrer"
      >
        {!compact && <FaLinkedinIn className="h-4 w-4" />}
        LinkedIn
      </a>
      <a
        className={`${link} ${compact ? '' : 'inline-flex items-center gap-2'}`}
        data-tone="rose"
        href={`mailto:${email}`}
      >
        {!compact && <MdEmail className="h-4 w-4" />}
        Email
      </a>
    </div>
  )
}
