import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import RiskAssessmentsPage from "./pages/risk-assessments/RiskAssessmentsPage";
import RegisterWorkerPage from "./pages/register-worker/RegisterWorkerPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/risk-assessments" element={<RiskAssessmentsPage />} />
        <Route path="/register-worker" element={<RegisterWorkerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
