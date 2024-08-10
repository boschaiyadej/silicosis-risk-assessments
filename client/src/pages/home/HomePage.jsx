import { Link } from "react-router-dom";
import { GrUserWorker } from "react-icons/gr";
import { PiGauge } from "react-icons/pi";
import { TbInfoTriangleFilled } from "react-icons/tb";
import Navbar from "../../components/navbar/Navbar";

const HomePage = () => {
  return (
    <section className="flex flex-col min-h-screen">
      <Navbar iconBack={false} />
      <main className="flex-1 bg-white p-6 max-w-[1440px] mx-auto">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight md:leading-snug">
              Web Application <br className="sm:hidden" /> ประเมินความเสี่ยง
              <br />
              ผู้ประกอบอาชีพแกะสลักหิน
            </h1>
          </div>

          <div className="flex flex-col md:flex-row justify-around items-center gap-6">
            <Link
              to="/risk-assessments"
              className="flex items-center gap-4 bg-primary text-primary-content md:text-lg py-4 px-6 md:py-4 md:px-8 rounded-lg shadow-lg hover:bg-primary-dark transition duration-300"
            >
              <PiGauge className="text-xl md:text-5xl" />
              ประเมินความเสี่ยงโรคปอดฝุ่นหินทราย
            </Link>
            <Link
              to="/register-worker"
              className="flex items-center gap-4 bg-secondary text-secondary-content md:text-lg py-4 px-6 md:py-4 md:px-8 rounded-lg shadow-lg hover:bg-secondary-dark transition duration-300"
            >
              <GrUserWorker className="text-xl md:text-5xl" />
              ลงทะเบียนผู้ประกอบอาชีพแกะสลักหิน
            </Link>
            <Link
              to="/risk-info"
              className="flex items-center gap-4 bg-warning text-warning-content md:text-lg py-4 px-6 md:py-4 md:px-8 rounded-lg shadow-lg hover:bg-warning-dark transition duration-300"
            >
              <TbInfoTriangleFilled className="text-xl md:text-5xl" />
              ข้อมูลอาชีวอนามัยและความปลอดภัย
            </Link>
          </div>
        </div>
      </main>
    </section>
  );
};

export default HomePage;
