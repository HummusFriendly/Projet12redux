import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectLogged, logout } from "../features/usersSlice";
import logo from "../assets/argentBankLogo.png";

const Navbar = () => {
  const isLogged = useSelector(selectLogged);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="main-nav-items">
        {isLogged ? (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>
              Profile
            </Link>
            <button className="main-nav-item button" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="main-nav-item" to="/signin">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
            <Link className="main-nav-item" to="/signup">
              <i className="fa fa-user-plus"></i>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;