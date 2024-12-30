import { useNavigate } from "react-router-dom"
import LoginForm from "../Components/LoginForm"
import { UserSession } from "../Context/SessionContext";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = UserSession();

  const handleLoginSuccess = (userData) => {
    console.log("Loged in user data : ", userData);
    login(userData);

    if (!userData.isMfaActive) {
      navigate("/setup-2fa");
    } else {
      navigate("/verify-2fa")
    }
  }

  return <LoginForm onLoginSucess={handleLoginSuccess}/>
}

export default LoginPage