import { Link } from "react-router-dom";
import { GrUserWorker } from "react-icons/gr";
import { PiGauge } from "react-icons/pi";
import { FaHelmetSafety } from "react-icons/fa6";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Web Application
        <br />
        ประเมินความเสี่ยง
        <br />
        ผู้ประกอบอาชีพแกะสลักหิน
        <br />
        อ.สีคิ้ว จ.นครราชสีมา
      </h1>
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <Link
          to="/risk-assessment"
          className="flex items-center gap-2 bg-warning text-warning-content text-start py-3 px-6 rounded-lg shadow-md hover:bg-warning-light focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 transition"
        >
          <PiGauge className="text-xl" /> ประเมินความเสี่ยงโรคปอดฝุ่นหินทราย
        </Link>
        <Link
          to="/register-worker"
          className="flex items-center gap-2 bg-primary text-primary-content text-start py-3 px-6 rounded-lg shadow-md hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition"
        >
          <GrUserWorker className="text-xl" />
          ลงทะเบียนผู้ประกอบอาชีพแกะสลักหิน
        </Link>

        <Link
          to="/risk-info"
          className="flex items-center gap-2 bg-accent text-accent-content text-start py-3 px-6 rounded-lg shadow-md hover:bg-accent-light focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 transition"
        >
          <FaHelmetSafety />
          ข้อมูลอาชีวอนามัยและความปลอดภัย
        </Link>
      </div>
      <h1 className="text-md mt-6 text-start">
        จัดทำโดย มหาวิทยาลัยธรรมศาสตร์
        <br />
        สนับสนุนโดย สสส.
      </h1>
    </div>
  );
};

export default HomePage;
