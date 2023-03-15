import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <div className="login">
      <div className="login__logo">
        <img src="../images/Union.png" alt="" className="login__logo-1" />
        <img src="../images/lendsqr.png" alt="" className="login__logo-2" />
      </div>
      <div className="login__content">
        <div className="login__content-image">
          <img src="../images/pablo-sign-in 1.png" alt="Login to continue" />
        </div>
        <div className="login__content-form">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
