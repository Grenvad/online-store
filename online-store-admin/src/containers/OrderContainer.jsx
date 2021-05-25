import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Order from "../components/Order";

function OrderContainer({ items }) {
  return (
    <Container>
      <Row>
        {items.length > 0 ? (
          items.map((item) => (
            <Col lg={4}>
              <Order
                key={item.id}
                id={item.id}
                isCashPayment={item.isCashPayment}
                address={item.address}
                phoneNumber={item.clientPhoneNumber}
                totalPrice={item.totalPrice}
                isDelivered={item.isDelivered}
                orderItems={item.items}
              />
            </Col>
          ))
        ) : (
          <span>заказов пока нет</span>
        )}
      </Row>
    </Container>
  );
}

export default OrderContainer;
