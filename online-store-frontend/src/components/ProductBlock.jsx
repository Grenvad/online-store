import React from "react";
import Button from "./Button";
import { ReactComponent as PlusIcon } from "../assets/img/plus.svg";

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
      <img className="item-block__image" src={imageUrl} alt="Картинка" />
      <h4 className="item-block__title">{name}</h4>
      <span className="item-block__description">{description}</span>
      <div className="item-block__bottom">
        <div className="item-block__price">{price} р.</div>
        <Button onClick={onAddItem} className="button--add" outline>
          <PlusIcon />
          <span>в корзину</span>
        </Button>
      </div>
    </div>
  );
}

export default ProductBlock;
