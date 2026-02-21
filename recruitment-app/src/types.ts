export interface CandidateExperience {
  company: string
  title: string
  start: string
  end: string
  highlights: string[]
}

export interface CandidateProject {
  name: string
  description: string
  tech: string[]
}

export interface CandidateNote {
  date: string
  text: string
}

export interface CandidateLinks {
  portfolio?: string
  github?: string
  linkedin?: string
}

export interface Candidate {
  id: string
  fullName: string
  headline: string
  location: string
  yearsOfExperience: number
  skills: string[]
  availability: string
  updatedAt: string
  status: string
  score: number
  summary: string
  languages?: string[]
  education?: string
  links?: CandidateLinks
  experience?: CandidateExperience[]
  projects?: CandidateProject[]
  notes?: CandidateNote[]
}


