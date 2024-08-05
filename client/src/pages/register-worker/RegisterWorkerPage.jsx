import { Link } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import RegisterWorkerForm from "../../components/register-worker/RegisterWorkerForm";

const RegisterWorkerPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4">
      <div className="w-full max-w-md p-4 rounded-lg">
        <Link to="/">
          <button className="text-primary-content  absolute top-2 left-1">
            <IoChevronBack className="text-3xl" />
          </button>
        </Link>
        <RegisterWorkerForm />
      </div>
    </div>
  );
};

export default RegisterWorkerPage;
