const HomePage = () => {
  return (
    <div className="p-8 font-sarabun bg-base-200 text-base-content">
      <h1 className="text-4xl font-kanit text-primary mb-4">
        Welcome to Silicosis Risk Assessments
      </h1>
      <p className="text-lg text-neutral-content mb-6">
        This application helps assess the risk levels of silicosis. The
        following sections will guide you through different risk levels and
        their respective actions.
      </p>
      <div className="mb-6">
        <h2 className="text-2xl font-kanit text-risk-level-0-content mb-2">
          Risk Level 0
        </h2>
        <p className="text-base mb-4">
          No immediate action needed. Regular monitoring is recommended.
        </p>
        <div className="p-4 bg-risk-level-0 text-risk-level-0-content rounded shadow-md">
          Risk Level 0 Area
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-kanit text-risk-level-1-content mb-2">
          Risk Level 1
        </h2>
        <p className="text-base mb-4">
          Very low risk. Continue regular monitoring.
        </p>
        <div className="p-4 bg-risk-level-1 text-risk-level-1-content rounded shadow-md">
          Risk Level 1 Area
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-kanit text-risk-level-2-content mb-2">
          Risk Level 2
        </h2>
        <p className="text-base mb-4">
          Low risk. Periodic monitoring is recommended.
        </p>
        <div className="p-4 bg-risk-level-2 text-risk-level-2-content rounded shadow-md">
          Risk Level 2 Area
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-kanit text-risk-level-3-content mb-2">
          Risk Level 3
        </h2>
        <p className="text-base mb-4">
          Moderate risk. Consider implementing control measures.
        </p>
        <div className="p-4 bg-risk-level-3 text-risk-level-3-content rounded shadow-md">
          Risk Level 3 Area
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-kanit text-risk-level-4-content mb-2">
          Risk Level 4
        </h2>
        <p className="text-base mb-4">
          High risk. Immediate control measures are needed.
        </p>
        <div className="p-4 bg-risk-level-4 text-risk-level-4-content rounded shadow-md">
          Risk Level 4 Area
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-kanit text-risk-level-5-content mb-2">
          Risk Level 5
        </h2>
        <p className="text-base mb-4">
          Extreme risk. Critical intervention required to prevent health
          hazards.
        </p>
        <div className="p-4 bg-risk-level-5 text-risk-level-5-content rounded shadow-md">
          Risk Level 5 Area
        </div>
      </div>
    </div>
  );
};

export default HomePage;
