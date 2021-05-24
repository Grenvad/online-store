import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import User from "../../components/User";
import { fetchUsers } from "../../redux/actions/users";

function Users() {
  const dispatch = useDispatch();
  const { users } = useSelector(({ users }) => users);

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <main>
      <h1>Пользователи</h1>
      <div className="icon_wrap">
        <Link to="/users/add">
          <i className="fas fa-plus addComponent"></i>
        </Link>
      </div>
      <div>
        {users !== undefined ? (
          users.map((item, index) => (
            <User
              key={index}
              id={item.id}
              username={item.userName}
              email={item.email}
            />
          ))
        ) : (
          <span>загрузка...</span>
        )}
      </div>
    </main>
  );
}

export default Users;
