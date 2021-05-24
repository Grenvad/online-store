import React from "react";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { addItemToCart } from "../redux/actions/cart";
import Button from "./../components/Button";
import axios from "axios";

const Product = () => {

  const dispatch = useDispatch();

  const [product, setProduct] = React.useState(null);
  const { id } = useParams();

  React.useEffect(() => {
    axios.get(`https://localhost:44364/api/Products/${id}`).then(({ data }) => {
      setProduct(data);
      console.log(data);
    });
  }, [id]);

  const handleAddItemToCart = (item) => {
    dispatch(addItemToCart(item));
  };

  const onAddItem = () => {
    const obj = {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price
    };
    handleAddItemToCart(obj);
  };

  return (
    <div className="container">
      {product !== null ? (
        <div className="product_item">
          <img src={product.image} alt="картинка" />
          <div className="product_item_descr">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <span>Цена: {product.price}</span>

            <Button onClick={onAddItem} className="button--add" outline>
              <span>В корзину</span>
            </Button>
          </div>
        </div>
      ) : (
        <span>Загрузка</span>
      )}
    </div>
  );
};

export default Product;
