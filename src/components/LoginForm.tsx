import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="form">
      <div className="form-title">Welcome!</div>
      <div className="form-text">Enter details to login.</div>
      <input
        type="email"
        placeholder="Email"
        className="form-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={3}
      />
      <div className="form-forgotPassword">FORGOT PASSWORD?</div>
      <Link to="/dashboard">
        <button className="form-btn btn">LOG IN</button>
      </Link>
    </div>
  );
}
