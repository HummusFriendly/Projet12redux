import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectUserInfo, selectLogged, userDataThunk, logout } from "../features/usersSlice";
import AccountCard from "../components/AccountCard";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const isLogged = useSelector(selectLogged);

  useEffect(() => {
    if (!isLogged) {
      navigate("/signin");
    } else {
      dispatch(userDataThunk());
    }
  }, [isLogged, navigate, dispatch]);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userInfo?.firstName} {userInfo?.lastName}
        </h1>
        <button className="edit-button">Edit Name</button>
        <button className="logout-button" onClick={() => dispatch(logout())}>
          Logout
        </button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <AccountCard
        title="Argent Bank Checking (x8349)"
        amount="$2,082.79"
        description="Available Balance"
      />
      <AccountCard
        title="Argent Bank Savings (x6712)"
        amount="$10,928.42"
        description="Available Balance"
      />
      <AccountCard
        title="Argent Bank Credit Card (x8349)"
        amount="$184.30"
        description="Current Balance"
      />
    </main>
  );
};

export default User;