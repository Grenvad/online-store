import React from "react";
import Product from "../components/Product";
import { Row, Col, Container } from "react-bootstrap";

function ProductContainer({ items }) {
  return (
    <Container>
      <Row>
        {items.length > 0 ? (
          items.map((item) => (
            <Col lg={4}>
              <Product
                key={item.id}
                id={item.id}
                title={item.name}
                description={item.description}
                previewImg={item.previewImageUrl}
                price={item.price}
              />
            </Col>
          ))
        ) : (
          <span>в этой категории товаров ещё нет</span>
        )}
      </Row>
    </Container>
  );
}

export default ProductContainer;
