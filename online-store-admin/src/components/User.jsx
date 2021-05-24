import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/actions/users";

function User({ id, username, email }) {
  const dispatch = useDispatch();
  function handleDelete(id) {
    dispatch(deleteUser(id));
  }

  return (
    <div>
      <h4>{username}</h4>
      <span>{email}</span>
      <i onClick={() => handleDelete(id)} className="fas fa-times"></i>
    </div>
  );
}

export default User;
