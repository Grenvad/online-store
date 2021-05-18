import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/Button";
//import { makeOrder } from "../redux/actions/products";
import { ReactComponent as LeftArrowIcon } from "../assets/img/grey-arrow-left.svg";
import orderImage from "../assets/img/order.jpg";

function Checkout() {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector(({ cart }) => cart);
  const [address, setAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [isOrdered, setOrdered] = React.useState(false);

  const order = () => {
    var orderdata = {
      address: address,
      phoneNumber: phoneNumber,
      cashPayment: true,
      OrderSum: totalPrice,
      OrderDate: new Date(),
    };
    // dispatch(makeOrder(orderdata, items))
    setOrdered(true);
  };

  return (
    <div className="container container--cart">
      <div>
        <div className="cart">
          {!isOrdered ? (
            <div>
              <div className="cart__top">
                <h2 className="content__title">Оформление заказа</h2>
              </div>
              <div className="order-form">
                <div>
                  <h3>Адрес доставки:</h3>
                  <input
                    type="text"
                    className="order-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div>
                  <h3>Номер телефона:</h3>
                  <input
                    type="text"
                    className="order-input"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="cart__bottom">
                <div className="cart__bottom-buttons">
                  <Link
                    to="/Cart"
                    className="button button--outline button--add go-back-btn"
                  >
                    <LeftArrowIcon />
                    <span>Вернуться назад</span>
                  </Link>
                  <Button onClick={order} className="button pay-btn">
                    Отправить
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="cart cart--empty">
              <h2>
                Ваш заказ был принят{" "}
                <span role="img" aria-label="smile">
                  😉
                </span>
              </h2>
              <p>
                Наш курьер скоро доставит его вам
                <br />
              </p>
              <img src={orderImage} alt="Empty cart" />
              <Link to="/" className="button button--black">
                <span>Вернуться назад</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
