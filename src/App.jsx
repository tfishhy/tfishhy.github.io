import DocHeader from './components/DocHeader.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import GitHubActivity from './components/GitHubActivity.jsx'
import Languages from './components/Languages.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div id="top" className="px-6 pb-16 pt-6">
        <main className="mx-auto max-w-[680px]">
          <DocHeader />

          <hr className="divider mt-6 mb-10" />
          <Projects />

          <hr className="divider my-10" />
          <Skills />

          <hr className="divider my-10" />
          <section id="github">
            <h2 className="section-heading">github activity</h2>
            <div className="mt-4">
              <GitHubActivity username="tfishhy" />
            </div>
          </section>

          <hr className="divider my-10" />
          <Languages />

          <hr className="divider my-10" />
          <Contact />
        </main>
      </div>
    </div>
  )
}
