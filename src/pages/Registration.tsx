import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect directly to home, skipping profile setup
    navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="text-muted-foreground">Redirecting...</div>
      </div>
    </div>
  );
};

export default Registration;