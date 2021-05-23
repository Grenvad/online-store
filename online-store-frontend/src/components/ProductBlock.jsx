import React from "react";
import Button from "./Button";
import { Link } from 'react-router-dom';

function ProductBlock({ id, name, description, imageUrl, onClickAdd, price }) {
  const onAddItem = () => {
    const obj = {
      id: id,
      name: name,
      image: imageUrl,
      price: price
    };
    onClickAdd(obj);
  };

  return (
    <div className="item-block">
      <Link to={`/product/${id}`}><img className="item-block__image" src={imageUrl} alt="Картинка" />
      <h4 className="item-block__title">{name}</h4>
      </Link>
      <span className="item-block__description">{description}</span>
      <div className="item-block__bottom">
        <div className="item-block__price">{price} р.</div>
        <Button onClick={onAddItem} className="button--add" outline>
          <span>В корзину</span>
        </Button>
      </div>

      <div className="border-top-left"></div>
      <div className="border-bottom-right"></div>
      <div className="border-bottom-left"></div>
      <div className="border-top-right"></div>
    </div>
  );
}

export default ProductBlock;
