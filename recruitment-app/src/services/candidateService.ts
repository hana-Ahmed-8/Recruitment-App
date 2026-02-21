import candidatesData from "../data/candidates.json"
import type { Candidate } from "../types"

export const getCandidates = (): Promise<Candidate[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
  
      const shouldFail = Math.random() < 0.1
      if (shouldFail) {
        reject(new Error("Failed to load candidates"))
      } else {
        resolve(candidatesData as Candidate[])
      }
    }, 800)
  })
}
