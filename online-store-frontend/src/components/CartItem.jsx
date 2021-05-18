import React from "react";
import Button from "./Button";
import { ReactComponent as MinusIcon } from "../assets/img/minus.svg";
import { ReactComponent as PlusIcon } from "../assets/img/plus.svg";

const CartItem = ({
  id,
  name,
  image,
  totalPrice,
  totalCount,
  onRemove,
  onMinus,
  onPlus,
}) => {
  const handleRemoveClick = () => {
    onRemove(id);
  };

  const handlePlusItem = () => {
    onPlus(id);
  };

  const handleMinusItem = () => {
    onMinus(id);
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={image} alt="картинка" />
      </div>
      <div className="cart__item-info">
        <h3>{name}</h3>
      </div>
      <div className="cart__item-count">
        <div
          onClick={handleMinusItem}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <MinusIcon />
        </div>
        <b>{totalCount}</b>
        <div
          onClick={handlePlusItem}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <PlusIcon />
        </div>
      </div>
      <div className="cart__item-price">
        <b>{totalPrice.toFixed(2)} р.</b>
      </div>
      <div className="cart__item-remove">
        <Button onClick={handleRemoveClick} className="button--circle" outline>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
