import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/auth";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
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
    return <Redirect to={state?.from || "/"} />;
  }

  return (
    <Container>
      <Row>
        <Col lg={9}>
          <Form style={{marginTop: 200}}>
            <Form.Group controlId="formEmail">
              <Form.Label style={{color: 'white', fontSize: 30}}>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введите email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{padding: 20, fontSize: 20}}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label style={{color: 'white', fontSize: 30}}>Пароль:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{padding: 20, fontSize: 20}}
              />
            </Form.Group>
            <Button variant="success" onClick={(e) => onSubmit(e)} style={{width: '100%', fontSize: 20}}>
              Войти
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;