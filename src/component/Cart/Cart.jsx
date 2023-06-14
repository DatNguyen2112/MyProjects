import React, { useState, useEffect } from "react";
import HeaderNoBg from "../Header/HeaderNoBg";
import "../Cart/Cart.css";
import { auth, db } from "../config/config";
import { CartProducts } from "./CartProducts";
import ModalOfChanrge from "../ModelOfCharnge/ModelOfCharnge";
import '../ModelOfCharnge/ModelOfCharnge.css'




function Cart({ user }) {
  const [open, setOpen] = useState(false)
  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }

  const uid = GetUserUid();

  // state of totalProducts
  const [totalProducts, setTotalProducts] = useState(0);
  // getting cart products
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("Cart " + user.uid).onSnapshot((snapshot) => {
          const qty = snapshot.docs.length;
          setTotalProducts(qty);
        });
      }
    });
  }, []);

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("Cart " + user.uid).onSnapshot((snapshot) => {
          const newCartProduct = snapshot.docs.map((doc) => {
            return {
              ID: doc.id,
              ...doc.data(),
            };
          });
          setCartProducts(newCartProduct);
        });
      } else {
        console.log("Faild");
      }
    });
  }, []);

  cartProducts.map((cart) => {
    console.log(cart.ID);
  });

  const price = cartProducts.map((cartProduct) => {
    return cartProduct.TotalProductPrice;
  });

  console.log(price);

  const reduceOfPrice = price.reduce((acc, currentValue) => {
    return acc + currentValue;
  }, 0);

  console.log(reduceOfPrice);

  const qty = cartProducts.map((cartProducts) => {
    return cartProducts.qty;
  });

  console.log(qty);

  const reduceOfQty = qty.reduce((acc, currentValue) => {
    return acc + currentValue;
  }, 0);

  console.log(reduceOfQty);

  // Global variable
  let Product;

  // Increase function
  const cartProductIncrease = (cartProducts) => {
    Product = cartProducts;
    console.log(Product);
    console.log(cartProducts.ID);
    Product.qty = Product.qty + 1;
    Product.TotalProductPrice = Product.qty * Product.price;

    // Update in database
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("Cart " + user.uid)
          .doc(cartProducts.ID)
          .update(Product)
          .then(() => {
            console.log("Increase Success");
          });
      } else {
        console.log("Failed");
      }
    });
  };

  // Decrease funtion
  const cartProductDecrease = (cartProducts) => {
    Product = cartProducts;
    if (Product.qty > 1) {
      Product.qty = Product.qty - 1;
      Product.TotalProductPrice = Product.qty * Product.price;

      // Update in database
      auth.onAuthStateChanged((user) => {
        if (user) {
          db.collection("Cart " + user.uid)
            .doc(cartProducts.ID)
            .update(Product)
            .then(() => {
              console.log("Decrease Success");
            });
        } else {
          console.log("Faild");
        }
      });
    }
  };

  const handlePopUp = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  console.log(open)

  return (
    <div>
      <HeaderNoBg user={user} />
      <div className="Cart__container">
        <div className="SignIn__title">
          <h3 className="SignIn__text">Giỏ hàng</h3>
        </div>

        <div className="Cart__content">
          {cartProducts.length > 0 && (
            <CartProducts
              cartProductDecrease={cartProductDecrease}
              cartProductIncrease={cartProductIncrease}
              cartProducts={cartProducts}
            />
          )}
          {cartProducts.length < 1 && (
            <div className="container-fluid">Không có sản phẩm nào</div>
          )}{" "}
        </div>

        {/* Results of Products*/}

        <div className="cartProduct__totalPrices">
          Tổng tiền tạm tính:  <p className="Prices">{reduceOfPrice.toLocaleString("de-DE")}đ</p>
        </div>

        <div className="cartProduct__charnge">
            <button onClick={handlePopUp} className="Charnge__btn">Tiến hành đặt mua</button>
        </div>
      </div>

      
        {open === true && <ModalOfChanrge reduceOfQty={reduceOfQty} reduceOfPrice={reduceOfPrice} cartProducts={cartProducts} handleClose={handleClose} />}
        
    </div>
  );
}

export default Cart;
