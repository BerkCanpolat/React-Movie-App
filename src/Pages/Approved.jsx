import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ApprovedPage = () => {
  const [params] = useSearchParams();
  const token = params.get("request_token");
  const navigate = useNavigate();
  const { createSession } = useAuth();

  useEffect(() => {
    if (token) {
      createSession(token);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-semibold text-white">TMDb doğrulaması tamamlanıyor...</p>
    </div>
  );
};

export default ApprovedPage;
