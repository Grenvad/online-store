import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, fetchCategories, addCategory } from '../redux/actions/categories';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        color: 'white',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

function CategoryPage() {
    const { categories, isLoading } = useSelector(({ categories }) => categories);
    const [category, setCategory] = useState("");
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const classes = useStyles();

    return (
        <main>
            <Container fluid>
                <Row>
                    <div className={classes.root}>
                        {isLoading ? <Spinner animation="grow" variant="danger" /> : [categories !== null ?
                            categories.map((item, index) => (
                                <Chip
                                    Key={index}
                                    label={item.name}
                                    onDelete={() => dispatch(deleteCategory(item.id))}
                                    color="primary"
                                    variant="outlined"
                                />
                            ))
                            : <p>Вы ещё не добавили ни одной категории</p>]
                        }
                    </div>
                </Row>
                <hr />
                <Row>
                    <Col lg={6}>
                        <h2>Добавить категорию</h2>
                        <Form onSubmit={(e) => {
                            e.preventDefault();
                            setCategory("");
                            dispatch(addCategory({ name: category }));
                        }}>
                            <Form.Group controlId="setCategory">
                                <Form.Label>Введите название категории</Form.Label>
                                <Form.Control type="text" placeholder="Канцелярия" value={category} onChange={(event) => setCategory(event.target.value)} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Добавить
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default CategoryPage
