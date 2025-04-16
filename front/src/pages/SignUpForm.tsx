import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpThunk, selectLogged } from "../features/usersSlice";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector(selectLogged);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (isLogged) {
      navigate("/user");
    }
  }, [isLogged, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(signUpThunk({ email, password })).unwrap();
      navigate("/signin");
    } catch (error) {
      console.error("Erreur d'inscription :", error);
    }
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-plus sign-in-icon"></i>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" className="sign-in-button">Sign Up</button>
      </form>
    </section>
  );
};

export default SignUpForm;