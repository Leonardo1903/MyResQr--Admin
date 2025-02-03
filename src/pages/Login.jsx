import LoginForm from "../components/LoginForm";
import { toast } from "../hooks/use-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const handleLoginSubmit = async ({ email, password }) => {
    try {
      const response = await axios.post(`${baseUrl}/dealer/login/`, {
        email,
        password,
      });

      if (response.data.role !== "admin") {
        toast({
          title: "You are not authorized",
          description: "You are not authorized to access this page",
        });
        window.location.href = "http://dealer.myresqr.life";
        return;
      }

      sessionStorage.setItem("accessToken", response.data.accessToken);
      toast({
        title: "Login Successful",
        description: "You have logged in successfully",
        variant: "default",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast({
        title: "Login Failed",
        description: "Login failed. Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <LoginForm onSubmit={handleLoginSubmit} />
      </div>
    </div>
  );
}