import { FC, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

// interface Props {}

export const LoginForm = () => {
  const [showPassword, setShowPassWord] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/dashboard");
  };
  const handlePasswordVisibility = () => {
    setShowPassWord(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-title">Welcome!</div>
      <div className="form-text">Enter details to login.</div>
      <div className="input">
        <input
          type="email"
          placeholder="Email"
          className="form-input"
          required
        />
      </div>
      <div className="input">
        {password && <span onClick={handlePasswordVisibility}>
          {showPassword ? "HIDE" : "SHOW"}
        </span>}
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="form-input"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
          minLength={3}
        />
      </div>
      <div className="form-forgotPassword">FORGOT PASSWORD?</div>

      <button className="form-btn btn">LOG IN</button>
    </form>
  );
};
