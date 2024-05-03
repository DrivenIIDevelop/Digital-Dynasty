import { Link, useNavigate } from "react-router-dom";
import LogoRegular from "../components/icons/LogoRegular";
import { useState } from "react";
import httpRequest from "../js/httpRequest";
import { PORT } from "../port";

const Login = () => {
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [invalidEmailOrPassword, setInvalidEmailOrPassword] = useState(false);
  // Start checking fields after form submission
  const [startChecking, setStartChecking] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStartChecking(true);
    if (!isValidUsername || !isValidPassword || invalidEmailOrPassword) return;

    const data = await httpRequest({
      url: `http://localhost:${PORT}/auth/login`,
      http_method: "POST",
      request_headers: {
        "Content-Type": "application/json",
      },
      request_body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    if (data?.error) return setInvalidEmailOrPassword(true);
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("userId", data._id);
    navigate("/profile");
  };
  return (
    <div id="login">
      <header>
        <div className="container">
          <LogoRegular />
          <p>
            Don&#39;t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </header>
      <div className="container">
        <h1 className="title">Log in</h1>
        <form onSubmit={handleSubmit} className="form">
          <div
            className="holder"
            style={{
              border:
                (isValidUsername && !invalidEmailOrPassword) || !startChecking
                  ? ""
                  : "1px solid red",
            }}
          >
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              onChange={(e) => {
                setIsValidUsername(e.target.value.length >= 3);
                setInvalidEmailOrPassword(false);
              }}
              required
            />
            {!isValidUsername && startChecking && (
              <span className="error">Invalid username</span>
            )}
            {invalidEmailOrPassword && startChecking && (
              <span className="error">Invalid email or password</span>
            )}
          </div>
          <div
            className="holder"
            style={{
              border:
                (isValidPassword && !invalidEmailOrPassword) || !startChecking
                  ? ""
                  : "1px solid red",
            }}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => {
                setIsValidPassword(e.target.value.length >= 8);
                setInvalidEmailOrPassword(false);
              }}
              required
            />
            {!isValidPassword && startChecking && (
              <span className="error">
                Password must be at least 8 characters
              </span>
            )}
          </div>
          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
