import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import CandidateProfile from "./pages/CandidateProfile"
import { CandidatesProvider } from "./CandidatesContext"

function App() {
  return (
    <BrowserRouter>
      <CandidatesProvider>
        <div className="app-root">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/candidate/:id" element={<CandidateProfile />} />
          </Routes>
        </div>
      </CandidatesProvider>
    </BrowserRouter>
  )
}

export default App
