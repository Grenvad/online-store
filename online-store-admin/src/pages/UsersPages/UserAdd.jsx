import React from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { registerUser } from "../../redux/actions/users";

function UserAdd() {
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(username, email, password));
  };

  return (
    <>
      <h2>Добавить пользователя</h2>
      <Form>
        <Form.Group controlId="formUserName">
          <Form.Label>Имя пользователя:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Введите имя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formUserEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formUserPassword">
          <Form.Label>Пароль:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="success" type="submit" onClick={(e) => onSubmit(e)}>
          Добавить
        </Button>
      </Form>
    </>
  );
}

export default UserAdd;
