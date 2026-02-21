import React, { createContext, useContext, useEffect, useState } from "react"
import { getCandidates } from "./services/candidateService"
import type { Candidate } from "./types"

interface CandidatesContextValue {
  candidates: Candidate[]
  loading: boolean
  error: string | null
  reload: () => void
  updateCandidateStatus: (id: string, status: string) => void
}

const CandidatesContext = createContext<CandidatesContextValue | undefined>(
  undefined
)

export function CandidatesProvider({ children }: { children: React.ReactNode }) {
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const load = () => {
    setLoading(true)
    setError(null)
    getCandidates()
      .then((data) => {
        setCandidates(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Something went wrong while loading candidates.")
        setLoading(false)
      })
  }

  useEffect(() => {
    load()
  }, [])

  const updateCandidateStatus = (id: string, status: string) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    )
  }

  return (
    <CandidatesContext.Provider
      value={{ candidates, loading, error, reload: load, updateCandidateStatus }}
    >
      {children}
    </CandidatesContext.Provider>
  )
}

export function useCandidates() {
  const ctx = useContext(CandidatesContext)
  if (!ctx) {
    throw new Error("useCandidates must be used within CandidatesProvider")
  }
  return ctx
}


