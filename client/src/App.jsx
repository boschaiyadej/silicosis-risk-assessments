import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import RiskAssessmentsPage from "./pages/risk-assessments/RiskAssessmentsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/risk-assessments" element={<RiskAssessmentsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
