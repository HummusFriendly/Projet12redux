import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginThunk, userDataThunk, selectLogged } from "../features/usersSlice";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector(selectLogged);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (isLogged) {
      navigate("/user");
    }
  }, [isLogged, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(loginThunk({ email: username, password })).unwrap();
      await dispatch(userDataThunk()).unwrap();
      navigate("/user");
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button">Sign In</button>
      </form>
    </section>
  );
};

export default SignInForm;