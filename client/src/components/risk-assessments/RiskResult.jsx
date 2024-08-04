import { useSelector } from "react-redux";

const riskDetails = [
  {
    range: [0],
    level: "ไม่มีนัยสำคัญ",
    textColor: "text-risk-level-1",
    border: "border-risk-level-1",
    recommendations: [
      "ติดตามเฝ้าระวังประเมินความเสี่ยงทางสุขภาพทุก ๆ 6 เดือน",
      "สวมใส่หน้ากากป้องกันฝุ่นชนิด N95 ขึ้นไปขณะปฏิบัติงาน",
    ],
  },
  {
    range: [0.01, 1.99],
    level: "น้อย",
    textColor: "text-risk-level-2-dark",
    border: "border-risk-level-2",
    recommendations: [
      "ติดตามเฝ้าระวังประเมินความเสี่ยงทางสุขภาพทุก ๆ 3 เดือน",
      "สวมใส่หน้ากากป้องกันฝุ่นชนิด N95 ขึ้นไปขณะปฏิบัติงาน",
    ],
  },
  {
    range: [2, 2.99],
    level: "ปานกลาง",
    textColor: "text-risk-level-3-dark",
    border: "border-risk-level-3",
    recommendations: [
      "ปิดครอบแหล่งกำเนิดฝุ่น",
      "เปิดใช้ระบบน้ำฉีดพ่นขณะทำงาน",
      "ปรับลดชั่วโมงการทำงาน",
      "สวมใส่หน้ากากป้องกันฝุ่นชนิด N95 ขึ้นไปขณะปฏิบัติงาน",
    ],
  },
  {
    range: [3, 3.99],
    textColor: "text-risk-level-4-dark",
    border: "border-risk-level-4",
    recommendations: [
      "ปิดครอบแหล่งกำเนิดฝุ่น",
      "เปิดใช้ระบบน้ำฉีดพ่นขณะทำงาน",
      "ติดตาม ตรวจวัดปริมาณความเข้มข้นฝุ่นซิลิกา",
      "ปรับลดชั่วโมงการทำงาน",
      "สวมใส่หน้ากากป้องกันฝุ่นชนิด N95 ขึ้นไปขณะปฏิบัติงาน",
      "จัดให้สถานที่ทำงานห่างจากที่พักอาศัย",
    ],
  },
  {
    range: [4, Infinity],
    level: "สูงมาก",
    textColor: "text-risk-level-5-dark",
    border: "border-risk-level-5",
    recommendations: [
      "ปิดครอบแหล่งกำเนิดฝุ่น",
      "เปิดใช้ระบบน้ำฉีดพ่นขณะทำงาน",
      "ติดตาม ตรวจวัดปริมาณความเข้มข้นฝุ่นซิลิกา",
      "ปรับลดชั่วโมงการทำงาน",
      "สวมใส่หน้ากากป้องกันฝุ่นชนิด N95 ขึ้นไปขณะปฏิบัติงาน",
      "จัดให้สถานที่ทำงานห่างจากที่พักอาศัย",
    ],
  },
];

function RiskResult() {
  const riskLevel = useSelector((state) => state.risk.riskLevel);

  const details =
    riskDetails.find(
      (risk) => riskLevel >= risk.range[0] && riskLevel <= risk.range[1]
    ) || riskDetails[0];

  return (
    <div className={`p-4 rounded-md border border-2 ${details.border}`}>
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
