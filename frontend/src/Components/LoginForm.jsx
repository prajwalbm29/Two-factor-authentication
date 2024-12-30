import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import authServices from '../Services/authApi';

function LoginForm({ onLoginSucess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const DataReset = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) throw new Error("Password and confirm password should be same");

      const {data} = await authServices.register(username, password);
      setMsg(data.message);

      setTimeout(() => {
        handleRegisterToggle();
        setError("");
      },3000)
      
    } catch (error) {
      console.log("Error in Registration :", error);
      setError(error.message);
      setMsg("");
    }
  }
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await authServices.login(username, password);
      console.log(data.message);
      setError("");
      onLoginSucess(data);
    } catch (error) {
      console.log("Error in Login page", error);
      setError("Invalid credentials");
      setMsg("");
    }
  }
  
  const handleRegisterToggle = () => {
    setIsRegister(!isRegister);
    DataReset();
    setError("");
    setMsg("");
  }

  return (
    <div className="loginFormContainer">
      <Form>
        <Form.Group className='mb-3 text-center'>
          <Form.Text style={{ fontSize: 20, fontWeight: 'bold' }} >
            {isRegister ? "Create Account" : "Login"}
          </Form.Text>
        </Form.Group>

        <hr />

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>UserName</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        {isRegister ? (
          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </Form.Group>
        ) : ""}

        {msg && <p style={{color: "green", marginBottom: 3}}>{msg}</p>}
        {error && <p style={{color: "red", marginBottom: 3}}>{error}</p>}

        <Button variant="primary" type="submit" onClick={isRegister ? handleRegister : handleLogin}>
          {isRegister ? "Register" : "Login"}
        </Button>
        <Form.Group className='mb-3'>
          <Form.Text>
            {isRegister ? "Already have an account  ? " : "Don't have an account ? "} <Link to="" onClick={handleRegisterToggle}>{isRegister ? "Login" : "Create Account"}</Link>
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm