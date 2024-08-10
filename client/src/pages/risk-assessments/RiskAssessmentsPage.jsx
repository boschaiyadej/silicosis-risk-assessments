import { useSelector } from "react-redux";
import RiskAssessmentsForm from "../../components/risk-assessments/RiskAssessmentsForm";
import RiskGauge from "../../components/risk-assessments/RiskGauge";
import Navbar from "../../components/navbar/Navbar";

const RiskAssessmentPage = () => {
  const riskLevel = useSelector((state) => state.risk.riskLevel);

  return (
    <section className="flex flex-col min-h-screen">
      <Navbar iconBack={true} iconBackLink="/" />
      <div className="min-h-screen flex flex-col items-center justify-start p-4">
        <div className="w-full max-w-md p-4 rounded-lg">
          <RiskGauge riskLevel={riskLevel} />
          <RiskAssessmentsForm />
        </div>
      </div>
    </section>
  );
};

export default RiskAssessmentPage;
