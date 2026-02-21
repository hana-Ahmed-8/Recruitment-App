import { useMemo, useState } from "react"
import CandidateCard from "../components/CandidateCard"
import { useCandidates } from "../CandidatesContext"
import type { Candidate } from "../types"

type SortOption = "recent" | "score" | "experience"

function applyFiltersAndSort(
  candidates: Candidate[],
  search: string,
  location: string,
  status: string,
  sortBy: SortOption
) {
  const term = search.trim().toLowerCase()

  let filtered = candidates.filter((c) => {
    const matchesSearch =
      !term ||
      c.fullName.toLowerCase().includes(term) ||
      c.headline.toLowerCase().includes(term) ||
      c.skills.some((s) => s.toLowerCase().includes(term))

    const matchesLocation = !location || c.location === location
    const matchesStatus = !status || c.status === status

    return matchesSearch && matchesLocation && matchesStatus
  })

  if (sortBy === "recent") {
    filtered = filtered.slice().sort((a, b) =>
      a.updatedAt < b.updatedAt ? 1 : -1
    )
  } else if (sortBy === "score") {
    filtered = filtered.slice().sort((a, b) => b.score - a.score)
  } else if (sortBy === "experience") {
    filtered = filtered
      .slice()
      .sort((a, b) => b.yearsOfExperience - a.yearsOfExperience)
  }

  return filtered
}

function Home() {
  const { candidates, loading, error, reload } = useCandidates()

  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("")
  const [status, setStatus] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("recent")

  const locations = useMemo(
    () => Array.from(new Set(candidates.map((c) => c.location))).sort(),
    [candidates]
  )

  const statuses = useMemo(
    () => Array.from(new Set(candidates.map((c) => c.status))).sort(),
    [candidates]
  )

  const filtered = useMemo(
    () => applyFiltersAndSort(candidates, search, location, status, sortBy),
    [candidates, search, location, status, sortBy]
  )

  const hasActiveFilters = Boolean(search || location || status)

  const resetAll = () => {
    setSearch("")
    setLocation("")
    setStatus("")
    setSortBy("recent")
  }

  return (
    <main className="page">
      <header className="page__header">
        <div className="hero">
          <div className="hero__content">
            <p className="hero__eyebrow">TALENTSCOUT</p>
            <h1 className="hero__title">Discover frontend talent quickly</h1>
            <p className="hero__subtitle">
              Browse a curated pool of frontend engineers with modern skills,
              strong UX instincts, and production experience.
            </p>
            <button
              className="button button--primary"
              onClick={() => {
                const el = document.getElementById("directory")
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
            >
              Browse candidates
            </button>
          </div>
          <div className="hero__stats" aria-label="Directory statistics">
            <div className="hero__stat">
              <span className="hero__stat-value">{candidates.length}</span>
              <span className="hero__stat-label">Candidates</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">React, TS, UX</span>
              <span className="hero__stat-label">Top skills</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">Egypt</span>
              <span className="hero__stat-label">Primary market</span>
            </div>
          </div>
        </div>
      </header>

      <section id="directory" className="directory" aria-label="Candidate list">
        <div className="directory__controls">
          <div className="filters-bar">
            <div className="filters-bar__search">
              <label htmlFor="search" className="filters-bar__label">
                Search
              </label>
              <input
                id="search"
                type="search"
                placeholder="Name, skill, or headline"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input"
              />
            </div>

            <div className="filters-bar__group">
              <div className="filters-bar__field">
                <label htmlFor="location" className="filters-bar__label">
                  Location
                </label>
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="select"
                >
                  <option value="">Any</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filters-bar__field">
                <label htmlFor="status" className="filters-bar__label">
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="select"
                >
                  <option value="">Any</option>
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filters-bar__field">
                <label htmlFor="sort" className="filters-bar__label">
                  Sort by
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as SortOption)
                  }
                  className="select"
                >
                  <option value="recent">Recently updated</option>
                  <option value="score">Highest score</option>
                  <option value="experience">Most experience</option>
                </select>
              </div>
            </div>

            <div className="filters-bar__actions">
              {hasActiveFilters && (
                <div className="filters-bar__chips" aria-label="Active filters">
                  {search && (
                    <button
                      type="button"
                      className="chip chip--filter"
                      onClick={() => setSearch("")}
                    >
                      Search: “{search}” ✕
                    </button>
                  )}
                  {location && (
                    <button
                      type="button"
                      className="chip chip--filter"
                      onClick={() => setLocation("")}
                    >
                      Location: {location} ✕
                    </button>
                  )}
                  {status && (
                    <button
                      type="button"
                      className="chip chip--filter"
                      onClick={() => setStatus("")}
                    >
                      Status: {status} ✕
                    </button>
                  )}
                </div>
              )}

              <button
                type="button"
                className="button button--ghost"
                onClick={resetAll}
              >
                Reset all
              </button>
            </div>
          </div>

          <div className="directory__summary">
            <span className="directory__count">
              {filtered.length} candidate{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {loading && (
          <div className="directory__list">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="candidate-card candidate-card--skeleton">
                <div className="skeleton skeleton--title" />
                <div className="skeleton skeleton--text" />
                <div className="skeleton skeleton--text" />
                <div className="skeleton skeleton--chips" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
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
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="state state--empty">
            <h2>No candidates match your filters</h2>
            <p>Try clearing filters or broadening your search terms.</p>
            <button
              type="button"
              className="button button--primary"
              onClick={resetAll}
            >
              Clear filters
            </button>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="directory__list">
            {filtered.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Home
