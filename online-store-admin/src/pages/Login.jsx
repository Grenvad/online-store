import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/auth";
import { Form, Button } from "react-bootstrap";
import { Redirect, useLocation } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(({ auth }) => auth.isAuthenticated);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { state } = useLocation();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  if (isAuthenticated) {
    return <Redirect to={state?.from || '/'} />;
  }

  return (
    <Form>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Введите email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Пароль:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="success" onClick={(e) => onSubmit(e)}>
        Войти
      </Button>
    </Form>
  );
}

export default Login;
