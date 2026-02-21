import { Link } from "react-router-dom"
import type { Candidate } from "../types"

interface Props {
  candidate: Candidate
}

function CandidateCard({ candidate }: Props) {
  const topSkills = candidate.skills.slice(0, 4)
  const remaining = candidate.skills.length - topSkills.length

  return (
    <article className="candidate-card">
      <header className="candidate-card__header">
        <div>
          <h3 className="candidate-card__name">{candidate.fullName}</h3>
          <p className="candidate-card__headline">{candidate.headline}</p>
        </div>
        <span className={`badge badge--status`}>{candidate.status}</span>
      </header>

      <p className="candidate-card__meta">
        <span>📍 {candidate.location}</span>
        <span>•</span>
        <span>💼 {candidate.yearsOfExperience} yrs</span>
      </p>

      <p className="candidate-card__score">
        ⭐ Score {candidate.score} • Updated{" "}
        {new Date(candidate.updatedAt).toLocaleDateString()}
      </p>

      <div className="candidate-card__skills" aria-label="Key skills">
        {topSkills.map((skill) => (
          <span key={skill} className="chip">
            {skill}
          </span>
        ))}
        {remaining > 0 && (
          <span className="chip chip--muted">+{remaining} more</span>
        )}
      </div>

      <footer className="candidate-card__footer">
        <span className="candidate-card__availability">
          Availability: {candidate.availability}
        </span>
        <Link
          to={`/candidate/${candidate.id}`}
          className="button button--ghost"
        >
          View profile
        </Link>
      </footer>
    </article>
  )
}

export default CandidateCard
