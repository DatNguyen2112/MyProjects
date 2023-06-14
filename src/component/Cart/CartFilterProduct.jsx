import React from "react";
import { auth, db } from "../config/config";
import "../Cart/Cart.css";
function CartFilterProduct({
  cartProduct,
  cartProductIncrease,
  cartProductDecrease,
  
}) {
  const handleCartProductIncrease = () => {
    cartProductIncrease(cartProduct);
  };

  const handleCartProductDecrease = () => {
    cartProductDecrease(cartProduct);
  };

  const handleCartProductDelete = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("Cart " + user.uid)
          .doc(cartProduct.ID)
          .delete()
          .then(() => {
            console.log("successfully deleted");
          });
      }
    });
  };

  console.log(cartProduct);
  return (
    <>
      <div className="cartProduct__container">
        <div className="cartProduct__contents">
          <div className="cartProduct__photo">
            <img className="cartProduct__img" src={cartProduct.url} alt="" />
          </div>

          <div className="cartProduct__content">
            <div className="cartProduct__content-title">
              {cartProduct.description}
            </div>
            <div className="cartProduct__content-price">
              {cartProduct.TotalProductPrice.toLocaleString("de-DE")}đ
            </div>
            <div className="cartProduct__content-size">
              Size : {cartProduct.check}
            </div>
            <div className="cartProduct_content-count">
              <button className="Increase" onClick={handleCartProductIncrease}>
                +
              </button>
              <p className="cartProduct_quantity">{cartProduct.qty}</p>
              <button className="Decrease" onClick={handleCartProductDecrease}>
                -
              </button>
            </div>
          </div>
        </div>

        <div onClick={handleCartProductDelete} className="cartProduct__delete">
          <i className="fa-solid fa-trash"></i>
        </div>
      </div>

      

    </>
  );
}

export default CartFilterProduct;
