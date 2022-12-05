import React from "react";
import FormatPrice from "../Helpers/FormatPrice";
import CardAmountToggle from "./CardAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
const CartItem = ({ id, name, image, color, price, amount}) => {
  const { removeItem, setIncrease, setDecrease } = useCartContext();
  //   const setIncrease = () => {
  //     amount < stock ? setAmount(amount + 1) : setAmount(stock);
  //   };
  //   const setDecrease = () => {
  //     amount > 1 ? setAmount(amount - 1) : setAmount(1);
  //   };
  return (
    <div className="cart-heading  grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt="" srcset="" />
          </figure>
        </div>
        <div>
          <p>{name}</p>
          <div className="color-div">
            <p>color:</p>
            <div
              className="color-style"
              style={{ backgroundColor: color, color: color }}
            ></div>
          </div>
        </div>
      </div>
      {/* price */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>
      {/* quantity */}

      <CardAmountToggle
        amount={amount}
        setDecrease={() => setDecrease(id)}
        setIncrease={() => setIncrease(id)}
      />

      {/* subtotal */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price * amount} />
        </p>
      </div>

      {/* Remove */}
      <div>
        <FaTrash className="remove_icon" onClick={() => removeItem(id)} />
      </div>
    </div>
  );
};

export default CartItem;
