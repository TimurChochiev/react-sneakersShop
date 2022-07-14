import axios from "axios";
import React from "react";

import styles from "./Drawer.module.scss";
import Info from "../Info";
import { useCart } from "../../hooks/useCart";

const Drawer = ({ onRemove, onClose, items = [], opened }) => {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);

  const onClickOrder = async () => {
    try {
      const { data } = await axios.post(
        `https://62b9c7c041bf319d22855607.mockapi.io/orders`,
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          `https://62b9c7c041bf319d22855607.mockapi.io/cart/` + item.id
        );
      }
    } catch (error) {
      alert("Error ;(");
      console.log(error);
    }
  };

  return (
    <div>
      <div
        className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}
      >
        <div className={styles.drawer}>
          <h2 className="mb-30 justify-between d-flex ">
            Cart
            <img
              onClick={onClose}
              className="cartDelete cu-p"
              src="/img/cross-checked.svg"
              alt="Delete"
            />
          </h2>

          {items.length > 0 ? (
            <div className="d-flex flex-column flex">
              <div className="items flex">
                {items.map((el) => (
                  <div
                    key={el.id}
                    className="cartedItem d-flex align-center mb-20"
                  >
                    <div
                      style={{ backgroundImage: `url(${el.imageUrl})` }}
                      className="cartedItemImg"
                    ></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{el.title}</p>
                      <b>{el.price} rub.</b>
                    </div>
                    <img
                      onClick={() => onRemove(el.id)}
                      className="cartDelete"
                      src="/img/cross-checked.svg"
                      alt="Delete"
                    />
                  </div>
                ))}
              </div>
              <div className="cartTotalBlock">
                <ul>
                  <li>
                    <span>Total:</span>
                    <div></div>
                    <b>{totalPrice} rub.</b>
                  </li>
                  <li>
                    <span>Tax 5%:</span>
                    <div></div>
                    <b>{Math.ceil(totalPrice * 0.05)} rub.</b>
                  </li>
                </ul>
                <button onClick={onClickOrder} className="greenButton">
                  Put order <img src="/img/arrow.svg" alt="Arrow" />
                </button>
              </div>
            </div>
          ) : (
            <Info
              title={isOrderComplete ? "Ordered" : "Empty Cart"}
              description={
                isOrderComplete
                  ? `Order ${orderId} is good`
                  : "Empty Cart, add a pair"
              }
              image={
                isOrderComplete ? "/img/ordered.jpg" : "/img/empty-cart.png"
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
