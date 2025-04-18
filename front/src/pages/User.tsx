import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  selectUserInfo,
  selectLogged,
  userDataThunk,
  logout,
  updateUserDataThunk,
  selectToken,
} from "../features/usersSlice";
import AccountCard from "../components/AccountCard";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUserInfo);
  const isLogged = useSelector(selectLogged);
  const token = useSelector(selectToken);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(userInfo?.firstName || "");
  const [lastName, setLastName] = useState(userInfo?.lastName || "");

  useEffect(() => {
    if (!isLogged) {
      navigate("/signin");
    } else {
      dispatch(userDataThunk());
    }
  }, [isLogged, navigate, dispatch]);

  useEffect(() => {
    setFirstName(userInfo?.firstName || "");
    setLastName(userInfo?.lastName || "");
  }, [userInfo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      dispatch(updateUserDataThunk({ firstName, lastName, token }))
        .unwrap()
        .then(() => {
          setIsEditing(false);
        })
        .catch((error) => {
          console.error("Erreur lors de la mise à jour du profil:", error);
        });
    }
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userInfo?.firstName} {userInfo?.lastName}
        </h1>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="input-wrapper">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="button-group">
              <button type="submit" className="save-button">
                Enregistrer
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Annuler
              </button>
            </div>
          </form>
        ) : (
          <button
            className="edit-button"
            onClick={() => setIsEditing(true)}
          >
            Edit Name
          </button>
        )}
        <button
          className="logout-button"
          onClick={() => dispatch(logout())}
        >
          Se déconnecter
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