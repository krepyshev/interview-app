import LoginForm from "../../components/LoginForm";

const Login = () => {
  return (
    <div
      style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}
    >
      <h1>Вход</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
