import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export default function SocialLinks({
  githubUser = 'tfishhy',
  linkedinUrl = 'https://www.linkedin.com/in/lucasbigas4',
  email = 'lucasbigas24@gmail.com',
}) {
  const link = 'inline-flex items-center gap-2 text-sm hover:underline'

  return (
    <div className="inline-flex items-center gap-3">
      <a
        className={link}
        href={`https://github.com/${githubUser}`}
        target="_blank"
        rel="noreferrer"
      >
        <FaGithub className="h-4 w-4" />
        GitHub
      </a>
      <a className={link} href={linkedinUrl} target="_blank" rel="noreferrer">
        <FaLinkedinIn className="h-4 w-4" />
        LinkedIn
      </a>
      <a className={link} href={`mailto:${email}`}>
        <MdEmail className="h-4 w-4" />
        Email
      </a>
    </div>
  )
}
