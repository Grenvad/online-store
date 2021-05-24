import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import { fetchCategories } from "../../redux/actions/categories";
import { putProduct } from "../../redux/actions/products";

function ProductEdit() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const { id } = useParams();

  const { categories } = useSelector(({ categories }) => categories);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  React.useEffect(() => {
    if (categories.length > 0) {
      setCategory(categories[0].id);
    }
  }, [categories]);

  function onSubmit(e) {
    e.preventDefault();
    dispatch(putProduct(category, title, description, image, price));
  }

  React.useEffect(() => {
    axiosInstance.get(`Products/${id}`).then(({ data }) => {
      setTitle(data.name);
      setDescription(data.description);
      setCategory(data.categoryId);
      setImage(data.image);
      setPrice(data.price);
    });
  }, [id]);

  return (
    <main>
      <Container fluid>
        <Row>
          <Col lg="6">
            <h2>Редактировать товар</h2>
            <Form onSubmit={(e) => onSubmit(e)}>
              <Form.Group controlId="chooseCategory">
                <Form.Label>Выберите категорию</Form.Label>
                <Form.Control
                  onChange={(e) => setCategory(e.target.value)}
                  as="select"
                >
                  {categories !== null ? (
                    categories.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))
                  ) : (
                    <option key={1}></option>
                  )}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.File
                  label="Добавить картинку"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Введите название</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Введите описание товара</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Введите цену</Form.Label>
                <Form.Control
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <br />

              <Button variant="success" type="submit">
                Отправить
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default ProductEdit;
