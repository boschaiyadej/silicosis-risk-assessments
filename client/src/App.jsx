import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import RiskAssessmentsPage from "./pages/risk-assessments/RiskAssessmentsPage";
import RegisterWorkerPage from "./pages/register-worker/RegisterWorkerPage";
import RiskResultPage from "./pages/risk-assessments/RiskResultPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/risk-assessments" element={<RiskAssessmentsPage />} />
        <Route path="/register-worker" element={<RegisterWorkerPage />} />
        <Route path="/risk-result" element={<RiskResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
