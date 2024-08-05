import { useSelector } from "react-redux";
import { riskRecommend } from "./RiskRecommend";

function RiskResult() {
  const riskLevel = useSelector((state) => state.risk.riskLevel);

  const details =
    riskRecommend.find(
      (risk) => riskLevel >= risk.range[0] && riskLevel <= risk.range[1]
    ) || riskRecommend[0];

  return (
    <div className={`p-4 rounded-md border-2 ${details.border}`}>
      <div className="space-y-4">
        <p className="text-center text-md">
          มีผลกระทบทางสุขภาพ
          <br />
          จากการประกอบอาชีพแกะสลักหิน
        </p>
        <h3 className={`text-center text-3xl font-bold ${details.textColor}`}>
          ระดับ{details.level}
        </h3>
        <div className="text-md font-semibold">ข้อแนะนำ:</div>
        <ul className="space-y-2 list-disc pl-5">
          {details.recommendations.map((recommendation, index) => (
            <li key={index} className="text-md">
              {recommendation}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RiskResult;
