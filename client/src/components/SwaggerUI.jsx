import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUIComponent = () => {
  return (
    <div style={{ height: "100vh" }}>
      <SwaggerUI url="http://localhost:5000/api-docs" />
    </div>
  );
};

export default SwaggerUIComponent;
