import { Link, useParams } from "react-router-dom"
import { useCandidates } from "../CandidatesContext"
import type { Candidate } from "../types"

function CandidateProfile() {
  const { id } = useParams()
  const { candidates, loading, error, reload, updateCandidateStatus } =
    useCandidates()

  const candidate: Candidate | undefined = candidates.find(
    (c) => c.id === id
  )

  const handleShortlist = () => {
    if (candidate) {
      updateCandidateStatus(candidate.id, "Shortlisted")
    }
  }

  const handleReject = () => {
    if (candidate) {
      updateCandidateStatus(candidate.id, "Rejected")
    }
  }

  if (loading) {
    return (
      <main className="page page--detail">
        <div className="detail__header">
          <p>Loading profile...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="page page--detail">
        <div className="state state--error" role="alert">
          <p>{error}</p>
          <button
            type="button"
            className="button button--primary"
            onClick={reload}
          >
            Retry
          </button>
        </div>
      </main>
    )
  }

  if (!candidate) {
    return (
      <main className="page page--detail">
        <div className="state state--empty">
          <h2>Candidate not found</h2>
          <p>This profile might have been removed.</p>
          <Link to="/" className="button button--primary">
            Back to candidates
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="page page--detail">
      <header className="detail__header">
        <div className="detail__breadcrumbs">
          <Link to="/" className="detail__breadcrumb-link">
            TalentScout
          </Link>
          <span>›</span>
          <span>Candidates</span>
          <span>›</span>
          <span>{candidate.fullName}</span>
        </div>

        <div className="detail__top-row">
          <div>
            <h1 className="detail__name">{candidate.fullName}</h1>
            <p className="detail__headline">{candidate.headline}</p>
            <p className="detail__meta">
              <span>📍 {candidate.location}</span>
              <span>•</span>
              <span>💼 {candidate.yearsOfExperience} yrs experience</span>
            </p>
          </div>
          <div className="detail__actions">
            <span className="badge badge--status">{candidate.status}</span>
            <div className="detail__buttons">
              <button
                type="button"
                className="button button--primary"
                onClick={handleShortlist}
              >
                Shortlist
              </button>
              <button
                type="button"
                className="button button--danger"
                onClick={handleReject}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="detail__body">
        <div className="detail__main">
          <section aria-labelledby="about-heading" className="detail__section">
            <h2 id="about-heading" className="detail__section-title">
              About
            </h2>
            <p>{candidate.summary}</p>
          </section>

          <section aria-labelledby="skills-heading" className="detail__section">
            <h2 id="skills-heading" className="detail__section-title">
              Skills
            </h2>
            <div className="detail__skills">
              {candidate.skills.map((skill) => (
                <span key={skill} className="chip">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {candidate.experience && candidate.experience.length > 0 && (
            <section
              aria-labelledby="experience-heading"
              className="detail__section"
            >
              <h2 id="experience-heading" className="detail__section-title">
                Experience
              </h2>
              <ul className="timeline">
                {candidate.experience.map((exp) => (
                  <li key={`${exp.company}-${exp.start}`} className="timeline__item">
                    <h3 className="timeline__title">
                      {exp.title} · {exp.company}
                    </h3>
                    <p className="timeline__dates">
                      {exp.start} – {exp.end}
                    </p>
                    <ul className="timeline__highlights">
                      {exp.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {candidate.projects && candidate.projects.length > 0 && (
            <section
              aria-labelledby="projects-heading"
              className="detail__section"
            >
              <h2 id="projects-heading" className="detail__section-title">
                Projects
              </h2>
              <div className="detail__projects">
                {candidate.projects.map((project) => (
                  <article
                    key={project.name}
                    className="detail__project-card"
                  >
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="detail__project-tech">
                      {project.tech.map((t) => (
                        <span key={t} className="chip chip--muted">
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="detail__aside" aria-label="Candidate details">
          <section className="detail__panel">
            <h2 className="detail__panel-title">Profile details</h2>
            <dl className="detail__meta-list">
              <div>
                <dt>Status</dt>
                <dd>{candidate.status}</dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>{candidate.availability}</dd>
              </div>
              <div>
                <dt>Score</dt>
                <dd>{candidate.score}</dd>
              </div>
              <div>
                <dt>Last updated</dt>
                <dd>
                  {new Date(candidate.updatedAt).toLocaleDateString()}
                </dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{candidate.location}</dd>
              </div>
              <div>
                <dt>Experience</dt>
                <dd>{candidate.yearsOfExperience} years</dd>
              </div>
              {candidate.languages && (
                <div>
                  <dt>Languages</dt>
                  <dd>{candidate.languages.join(", ")}</dd>
                </div>
              )}
              {candidate.education && (
                <div>
                  <dt>Education</dt>
                  <dd>{candidate.education}</dd>
                </div>
              )}
            </dl>
          </section>

          {candidate.links && (
            <section className="detail__panel">
              <h2 className="detail__panel-title">Links</h2>
              <div className="detail__links">
                {candidate.links.portfolio && (
                  <a
                    href={candidate.links.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="button button--ghost"
                  >
                    Portfolio
                  </a>
                )}
                {candidate.links.github && (
                  <a
                    href={candidate.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="button button--ghost"
                  >
                    GitHub
                  </a>
                )}
                {candidate.links.linkedin && (
                  <a
                    href={candidate.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="button button--ghost"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </section>
          )}

          <Link to="/" className="button button--ghost detail__back">
            ← Back to candidates
          </Link>
        </aside>
      </section>
    </main>
  )
}

export default CandidateProfile
