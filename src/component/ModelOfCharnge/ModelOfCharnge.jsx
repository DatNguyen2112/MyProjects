import React, { useState } from "react";
import { auth, db } from "../config/config";
import { useHistory } from "react-router-dom";
import { toast , ToastContainer } from 'react-toastify';
import firebase from 'firebase/compat/app'
import 'react-toastify/dist/ReactToastify.css';


function ModalOfChanrge({ reduceOfQty, reduceOfPrice, handleClose, cartProducts }) {
  const history = useHistory()

  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [constrict, setConstrict] = useState('')
  const [cartQty] = useState(reduceOfQty)
  const [cartPrices] = useState(reduceOfPrice)

  const hideModal = () => {
    handleClose();
  }
  
  const handleCash = async(e) => {
    e.preventDefault()
    // Lấy ra id của khách hàng
    const uid = auth.currentUser.uid;
    // Lấy ra user người dùng
    const userData = await db.collection('SignUp').doc(uid).get();
    // Sau đó thêm vào trong csdl của firebase các trường dữ liệu liên quan đến hóa đơn
    // thanh toán
    await db.collection('CostumerInfo').add({
        Name: userData.data().Name,
        Phone: phone,
        Address: address,
        Constrict: constrict,
        CartQuantity: cartQty,
        CartPrice: cartPrices,
        time: firebase.firestore.FieldValue.serverTimestamp(),
    }) 
    // Lấy ra dữ liệu trong giỏ hàng
    const cartData = await db.collection('Cart ' + uid).get()
    for(var snap of cartData.docs) {
        var data = snap.data();
        data.ID = snap.id;
        await db.collection('Costumer-Cart ' + uid).add(data)
        await db.collection('Cart ' + uid).doc(snap.id).delete()
        await db.collection('Costumer-Cart-Total ').add(data)
    }
    hideModal();    
    history.push('/AllProducts');
    alert('CHÚC MỪNG BẠN ĐÃ ĐẶT ĐƠN HÀNG THÀNH CÔNG!!!')
  }






  return (
    <>
    <ToastContainer />
    <div className="Overlay">
      <div className="PopUp">
        <div className="Modal">
          <div className="Modal__close">
            <button className="Close" onClick={handleClose}>
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          </div>

          <div className="Modal__infomation">
            <div className="Modal__infomation-tile">Thông tin giao hàng</div>
            <div className="Modal__form">
              <form action="" onSubmit={handleCash}>
                

                <div className="Modal__form-phoneinput">
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="Phone"
                    type="text"
                    placeholder="Số điện thoại"
                  />
                </div>

                <div className="Modal__form-addressinput">
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="Address"
                    placeholder="Địa chỉ"
                    type="text"
                  />
                </div>

                <div className="Modal__form-constrict">
                  <input
                    value={constrict}
                    onChange={(e) => setConstrict(e.target.value)}
                    className="Constrict"
                    type="text"
                    placeholder="Thành phố / Quận / Huyện"
                  />
                </div>

                <div className="Modal__form-payment">
                  <button onClick={handleCash}  className="Payment__btn">Hoàn tất đơn hàng</button>
                </div>
              </form>
            </div>
          </div>

          <div className="Modal__products">
            <div className="Products">
              {cartProducts.map((cart) => {
                return (
                  <div className="Product__items">
                    <div className="Product__items-pic">
                      <img
                        className="Product__items-img"
                        src={cart.url}
                        alt=""
                      />
                      <span className="Product_items-qty">{cart.qty}</span>
                    </div>

                    <div className="Product__items-content">
                      <div className="Product__items-title">
                        {cart.description}
                      </div>
                      <div className="Product__items-size">
                        Size: {cart.check}
                      </div>
                    </div>

                    <div className="Product__items-price">
                      {cart.TotalProductPrice.toLocaleString("de-DE")}đ
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="Total">
              <div className="TotalProduct">Tổng cộng</div>
              <div className="TotalPrice">
                <span className="span_cur">VND</span>
                <div className="TotalPrices">
                  {reduceOfPrice.toLocaleString("de-DE")}đ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ModalOfChanrge;
