import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const Header = (props) => {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="headerLeft d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="Logo" />

          <div className="headerInfo">
            <h3 className="text-uppercase">Sneakers</h3>
            <p className="opacity-5">Магазин написанный на ReactJs</p>
          </div>
        </div>
      </Link>
      <ul className="headerRight d-flex">
        <li className="mr-30 cu-p " onClick={props.onClickCart}>
          <img width={18} height={18} src="/img/cart.svg" alt="cart" />
          <span> {totalPrice} rub.</span>
        </li>
        <li>
          <Link to="/favorites">
            <img
              className="mr-30 cu-p"
              width={18}
              height={18}
              src="/img/favorite-page.svg"
              alt="Favorite"
            />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img width={18} height={18} src="/img/profile.svg" alt="profile" />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
