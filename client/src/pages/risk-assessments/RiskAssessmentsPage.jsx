import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RiskAssessmentsForm from "../../components/risk-assessments/RiskAssessmentsForm";
import RiskGauge from "../../components/risk-assessments/RiskGauge";
import { IoChevronBack } from "react-icons/io5";

const RiskAssessmentPage = () => {
  const riskLevel = useSelector((state) => state.risk.riskLevel);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4">
      <div className="w-full max-w-md p-4 rounded-lg">
        <Link to="/">
          <button className="text-primary-content  absolute top-2 left-1">
            <IoChevronBack className="text-3xl" />
          </button>
        </Link>

        <RiskGauge riskLevel={riskLevel} />
        <RiskAssessmentsForm />
      </div>
    </div>
  );
};

export default RiskAssessmentPage;
