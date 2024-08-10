import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { riskRecommend } from "../../components/risk-assessments/RiskRecommend";
import RiskGauge from "../../components/risk-assessments/RiskGauge";
import { IoChevronBack } from "react-icons/io5";
import Navbar from "../../components/navbar/Navbar";
import CommonButton from "../../components/button/CommonButton";

function RiskResultPage() {
  const riskLevel = useSelector((state) => state.risk.riskLevel);

  const details =
    riskRecommend.find(
      (risk) => riskLevel >= risk.range[0] && riskLevel <= risk.range[1]
    ) || riskRecommend[0];

  return (
    <section className="flex flex-col min-h-screen">
      <Navbar iconBack={true} iconBackLink="/" />
      <div className="min-h-screen flex flex-col items-center justify-start p-4">
        <div className="w-full max-w-md p-4 rounded-lg">
          <RiskGauge riskLevel={riskLevel} />
          <div className={`p-4 rounded-md border-2 ${details.border}`}>
            <div className="space-y-4">
              <p className="text-center text-md">
                มีผลกระทบทางสุขภาพ
                <br />
                จากการประกอบอาชีพแกะสลักหิน
              </p>
              <h3
                className={`text-center text-3xl font-bold ${details.textColor}`}
              >
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
          <div className="mt-4 flex justify-between">
            <Link to="/risk-assessments">
              <CommonButton type="button" style="info" text="ประเมินอีกครั้ง" />
            </Link>
            <Link to="/">
              <CommonButton
                type="button"
                style="success"
                text="กลับสู่หน้าหลัก"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RiskResultPage;
