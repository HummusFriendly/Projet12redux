import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLogged, logout } from "../features/usersSlice";

const ReduxTest: React.FC = () => {
  const isLogged = useSelector(selectLogged);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Test Redux</h2>
      <p>Utilisateur connecté : {isLogged ? "Oui" : "Non"}</p>
      <button onClick={() => dispatch(logout())}>Déconnexion</button>
    </div>
  );
};

export default ReduxTest;
