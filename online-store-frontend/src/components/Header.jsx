import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/Pencil.svg";
import { ReactComponent as CartLogo } from "../assets/img/cart.svg";
import { useSelector } from "react-redux";

import Button from "./Button";

function Header() {
  const { totalPrice, totalCount } = useSelector(({ cart }) => cart);

  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logo} alt="Pizza logo" />
            <div>
              <h1>E-PENCIL</h1>
              <p>самые острые карандаши</p>
            </div>
          </div>
        </Link>

        <div className="header__cart">
          <Link to="/cart">
            <Button className="button--cart">
              <span>{totalPrice.toFixed(2)} р.</span>
              <div className="button__delimiter"></div>
              <CartLogo />
              <span>{totalCount}</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
