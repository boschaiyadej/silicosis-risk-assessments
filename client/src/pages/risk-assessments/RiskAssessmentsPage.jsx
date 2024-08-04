import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RiskAssessmentsForm from "../../components/risk-assessments/RiskAssessmentsForm";
import RiskGauge from "../../components/risk-assessments/RiskGauge";
import { IoChevronBack } from "react-icons/io5";

const RiskAssessmentPage = () => {
  const riskLevel = useSelector((state) => state.risk.riskLevel);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-4 rounded-lg">
        <Link to="/">
          <button className="px-4 py-2 text-primary-content bg-primary hover:bg-primary-light absolute top-1 left-1">
            <IoChevronBack />
          </button>
        </Link>

        <RiskGauge riskLevel={riskLevel} />
        <h1 className="text-xl font-semibold mb-4 text-primary text-center">
          ประเมินความเสี่ยงโรคปอดฝุ่นหินทราย
        </h1>
        <RiskAssessmentsForm />
      </div>
    </div>
  );
};

export default RiskAssessmentPage;
