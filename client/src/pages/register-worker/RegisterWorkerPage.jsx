import RegisterWorkerForm from "../../components/register-worker/RegisterWorkerForm";
import Navbar from "../../components/navbar/Navbar";

const RegisterWorkerPage = () => {
  return (
    <section className="flex flex-col min-h-screen">
      <Navbar iconBack={true} iconBackLink="/" />
      <div className="min-h-screen flex flex-col items-center justify-start p-4 mt">
        <div className="w-full max-w-md p-4 rounded-lg">
          <RegisterWorkerForm />
        </div>
      </div>
    </section>
  );
};

export default RegisterWorkerPage;
