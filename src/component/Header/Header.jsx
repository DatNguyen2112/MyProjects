import React, { useState, useEffect } from "react";
import Vn from "../../Images/vn.png";
import Eng from "../../Images/eng.jpg";
import { Link } from "react-router-dom";
import "../Header/Header.css";
import { useHistory } from "react-router-dom";
import { auth, db } from "../config/config";
import Bg1 from "../../Images/OFY1.png";

function Header({ user }) {
  // console.log(user)
  const history = useHistory();
  const handleLogout = () => {
    auth.signOut().then(() => {
      history.push("/signIn");
    });
  };

  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    setData(
      data.filter((item) =>
        item.categorysFashion.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const fetchProduct = db
      .collection("Products")
      .limit(100)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            ID: doc.id,
            ...doc.data(),
          };
        });
        setData(data);
      });
    return fetchProduct;
  }, [search]);

  const dataSliceArray = data.slice(0, 4);

  const handleShow = () => {
    setShowSearch(!showSearch);
    console.log("Thanh tìm kiếm");
  };

  const handleClose = () => {
    setShowSearch(false);
    console.log("!Thanh tìm kiếm");
  };

  const fashions = [
    "POLO RALPH LAUREN ",
    "NIKE SWIM - NIKE OUTDOOR",
    "MANGO",
    "LEVIs",
    "GAP",
    "OLD NAVY ",
    "CALVIN KLEIN",
    "TOMMY HILFIGER",
    "TOMMY JEANS",
    "OVS",
    "BANANA REPUBLIC",
    "OWNDAYS",
    "PARFOIS",
    "FITFLOP",
    "COTTON:ON",
    "TYPO",
    "MOTHERCARE",
    "SUNNIES STUDIOS",
    "FRENCH CONNECTION",
    "DOCKERS ",
    "SWAROVSKI",
  ];

  // getting current user uid
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

  return (
    <div>
      <div className="Header">
        <img className="Headers" src={Bg1} alt="" />
        <div className="Header__bg">
          {showSearch ? (
            <>
              <form onSubmit={handleSubmit} className="showSearch__bg">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  className="showSearch__input"
                  placeholder="Tìm sản phẩm bạn cần...."
                  type="text"
                  name=""
                  id=""
                />
                <div onClick={handleClose}>
                  <i className="fa-solid fa-xmark"></i>
                </div>
              </form>
              {search && (
                <div className="searchBoard">
                  {Object.keys(data).length == 0 ? (
                    <div>Không tìm thấy sản phẩm trên</div>
                  ) : (
                    <div>
                      {dataSliceArray.map((item) => {
                        return (
                          <Link to={`/ProductDetail/${item.ID}`}>
                            {
                              <div key={item.ID} className="searchBoard__Item">
                                <div className="searchBoard__photo">
                                  <img
                                    className="searchBoard__img"
                                    src={item.url}
                                    alt=""
                                  />
                                </div>

                                <div className="searchBoard__content">
                                  <div className="searchBoard__content-title">
                                    {item.categorysFashion}
                                  </div>
                                  <div className="searchBoard__content-title">
                                    {item.description}
                                  </div>
                                  <div className="searchBoard__content-price">
                                    {item.price.toLocaleString("de-DE")}đ
                                  </div>
                                </div>
                              </div>
                            }
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  <div className="searchBoard__allProduct">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <Link to={"/AllProducts"}>
                      <button className="searchBoard__btn">
                        Xem tất cả sản phẩm
                      </button>
                    </Link>
                  </div>
                </div>
              )}{" "}
            </>
          ) : (
            <div className="Header__aboutUs">
              <div className="Header__aboutUs-text">
                <Link to={"/AboutUs"}>
                  <div className="Header__aboutUs-para">Về chúng tôi</div>
                </Link>
                <div className="Header__aboutUs-support">
                  Liên hệ & Hỗ trợ
                  <div className="Header__aboutUs-item">
                    <ul>
                      <li className="Header__aboutUs-detail">Liên hệ</li>
                      <li className="Header__aboutUs-detail">
                        FAQ - Câu hỏi thường gặp
                      </li>
                      <li className="Header__aboutUs-detail">
                        Đặt hàng & Thanh toán
                      </li>
                      <li className="Header__aboutUs-detail">
                        Giao hàng & Nhận hàng
                      </li>
                      <li className="Header__aboutUs-detail">
                        Đổi trả & Hoàn tiền
                      </li>
                      <li className="Header__aboutUs-detail">Bảo hành</li>
                      <li className="Header__aboutUs-detail">
                        Tiêu chuẩn chính hãng
                      </li>
                      <li className="Header__aboutUs-detail">
                        Trả góp 0% Lãi suất
                      </li>
                      <li className="Header__aboutUs-detail">
                        Ưu đãi & Mã giảm giá
                      </li>
                      <li className="Header__aboutUs-detail">
                        Hướng dẫn Đặt mua
                      </li>
                      <li className="Header__aboutUs-detail">
                        Hướng dẫn Đặt cọc
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="Header__aboutUs-vn">
                  <img
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    src={Vn}
                    alt=""
                  />
                  Tiếng Việt
                </div>
                <div className="Header__aboutUs-eng">
                  <img
                    style={{
                      width: 20,
                      height: 20,
                    }}
                    src={Eng}
                    alt=""
                  />
                  English
                </div>
              </div>
              {!user && (
                <div className="Header__aboutUs-auth">
                  <div className="Header__aboutUs-search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <Link to={"/SignUp"}>
                    <div className="Header__aboutUs-signUp">Đăng ký</div>
                  </Link>

                  <Link to={"/SignIn"}>
                    <div className="Header__aboutUs-signIn">Đăng nhập</div>
                  </Link>

                  <Link to={"/Cart"}>
                    <div className="Header__aboutUs-cart">
                      <i className="fa-sharp fa-solid fa-bag-shopping"></i>
                      <span className="total">{totalProducts}</span>
                    </div>
                  </Link>
                </div>
              )}
              {user && (
                <div className="Header__aboutUs-auth">
                  <div onClick={handleShow} className="Header__aboutUs-search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <Link to={"/SignUp"}>
                    <div
                      onClick={handleLogout}
                      className="Header__aboutUs-signUp"
                    >
                      Đăng xuất
                    </div>
                  </Link>

                  <Link to={"/SignIn"}>
                    <div className="Header__aboutUs-signIn">{user} </div>
                  </Link>

                  <Link to={"/Cart"}>
                    <div className="Header__aboutUs-cart">
                      <i className="fa-sharp fa-solid fa-bag-shopping"></i>
                      <span className="total">{totalProducts}</span>
                    </div>
                  </Link>
                </div>
              )}{" "}
            </div>
          )}
          {!user && (
            <div className="Header__navbar">
              <ul>
                <Link to={"/"}>
                  <li className="Header__navbar-item border">Trang chủ</li>
                </Link>
                <li className="Header__navbar-item position">
                  SOFY
                  <div className="Header__navbar-items">
                    <ul>
                      <Link to={"/AllProducts"}>
                        <li className="Header__navbar-details">Tất cả</li>
                      </Link>
                      <li className="Header__navbar-details">
                        <Link to={"/AllShirtProducts"}>Áo</Link>
                        <div className="Header__navbar-detailss">
                          <ul>
                            <Link to={"/AllShirtProducts"}>
                              <li className="item">Tất cả</li>
                            </Link>
                            <li className="item">Áo thun</li>
                            <li className="item">Áo polo</li>
                            <li className="item">Áo sơmi</li>
                            <li className="item">Áo len</li>
                            <li className="item">Áo khoác</li>
                            <li className="item">Áo sweater</li>
                            <li className="item">Áo hoodie</li>
                          </ul>
                        </div>
                      </li>
                      <li className="Header__navbar-details">
                        <Link to="/AllPantsProducts">Quần</Link>
                        <div className="Header__navbar-detailss">
                          <ul>
                            <Link to={"/AllPantsProducts"}>
                              <li className="item">Tất cả</li>
                            </Link>
                            <li className="item">Quần short</li>
                            <li className="item">Quần jeans</li>
                            <li className="item">Quần baggy</li>
                            <li className="item">Quần kaki</li>
                            <li className="item">Quần jogger</li>
                          </ul>
                        </div>
                      </li>
                      <Link to={"/AllDressProducts"}>
                        <li className="Header__navbar-details">Đầm</li>
                      </Link>
                      <Link to={"/AllSkirtProducts"}>
                        <li className="Header__navbar-details">Chân váy</li>
                      </Link>
                    </ul>
                  </div>
                </li>
                <li className="Header__navbar-item position">
                  Nam
                  <div className="Header__navbar-items">
                    <ul>
                      <Link to={"/AllMaleProducts"}>
                        <li className="Header__navbar-details">Tất cả</li>
                      </Link>
                      <li className="Header__navbar-details">
                        <Link to={"/MaleShirt"}>Áo</Link>
                        <div className="Header__navbar-detailss">
                          <ul>
                            <li className="item">Tất cả</li>
                            <li className="item">Áo thun</li>
                            <li className="item">Áo polo</li>
                            <li className="item">Áo sơmi</li>
                            <li className="item">Áo len</li>
                            <li className="item">Áo khoác</li>
                            <li className="item">Áo sweater</li>
                            <li className="item">Áo hoodie</li>
                          </ul>
                        </div>
                      </li>
                      <li className="Header__navbar-details">
                        <Link to={"/MalePants"}>Quần</Link>
                        <div className="Header__navbar-detailss">
                          <ul>
                            <Link to={"/MalePants"}>
                              <li className="item">Tất cả</li>
                            </Link>
                            <li className="item">Quần short</li>
                            <li className="item">Quần jeans</li>
                            <li className="item">Quần baggy</li>
                            <li className="item">Quần kaki</li>
                            <li className="item">Quần jogger</li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="Header__navbar-item position">
                  Nữ
                  <div className="Header__navbar-items">
                    <ul>
                      <Link to={"AllFemaleProducts"}>
                        <li className="Header__navbar-details">Tất cả</li>
                      </Link>
                      <li className="Header__navbar-details">
                        Áo
                        <div className="Header__navbar-detailss">
                          <ul>
                            <li className="item">Tất cả</li>
                            <li className="item">Áo thun</li>
                            <li className="item">Áo polo</li>
                            <li className="item">Áo sơmi</li>
                            <li className="item">Áo len</li>
                            <li className="item">Áo khoác</li>
                            <li className="item">Áo sweater</li>
                            <li className="item">Áo hoodie</li>
                          </ul>
                        </div>
                      </li>
                      <li className="Header__navbar-details">
                        Quần
                        <div className="Header__navbar-detailss">
                          <ul>
                            <li className="item">Tất cả</li>
                            <li className="item">Quần short</li>
                            <li className="item">Quần jeans</li>
                            <li className="item">Quần baggy</li>
                            <li className="item">Quần kaki</li>
                            <li className="item">Quần jogger</li>
                          </ul>
                        </div>
                      </li>
                      <Link to={"/AllDressProducts"}>
                        <li className="Header__navbar-details">Đầm</li>
                      </Link>
                      <Link to={"/AllSkirtProducts"}>
                        <li className="Header__navbar-details">Chân váy</li>
                      </Link>
                    </ul>
                  </div>
                </li>
                <li className="Header__navbar-item position">
                  Thương hiệu
                  <div className="fashion50">
                    {fashions.map((fashion, index) => {
                      return (
                        <li key={index} className="noBorder">
                          {fashion}
                        </li>
                      );
                    })}{" "}
                  </div>
                </li>

                <li className="Header__navbar-item position">
                  Giá
                  <div className="Header__navbar-items">
                    <ul>
                      <Link to={"/AllPriceLowThan500"}>
                        <li className="Header__navbar-details">Dưới 500k</li>
                      </Link>
                      <Link to={"/AllPriceFrom500To1M"}>
                        <li className="Header__navbar-details">
                          Từ 500k - 1 triệu
                        </li>
                      </Link>
                      <Link to={"/AllPriceLowThan1M"}>
                        <li className="Header__navbar-details">Trên 1 triệu</li>
                      </Link>
                    </ul>
                  </div>
                </li>

                <li className="Header__navbar-item">Cho - Tặng 0đ</li>
                <li className="Header__navbar-item">Ưu đãi</li>
                <li className="Header__navbar-item">Hướng dẫn đặt hàng</li>
                <li className="Header__navbar-item">Điều khoản sử dụng</li>
              </ul>
            </div>
          )}
          {user && (
            <div className="Header__navbar">
              <ul>
                <Link to={"/"}>
                  <li className="Header__navbar-item border">Trang chủ</li>
                </Link>
                <li className="Header__navbar-item position">
                  SOFY
                  <div className="Header__navbar-items">
                    <ul>
                      <Link to={"/AllProducts"}>
                        <li className="Header__navbar-details">Tất cả</li>
                      </Link>
                      <li className="Header__navbar-details">
                        <Link to={"/AllShirtProducts"}>Áo</Link>
                        <div className="Header__navbar-detailss">
                          <ul>
                            <Link to={"/AllShirtProducts"}>
                              <li className="item">Tất cả</li>
                            </Link>
                            <li className="item">Áo thun</li>
                            <li className="item">Áo polo</li>
                            <li className="item">Áo sơmi</li>
                            <li className="item">Áo len</li>
                            <li className="item">Áo khoác</li>
                            <li className="item">Áo sweater</li>
                            <li className="item">Áo hoodie</li>
                          </ul>
                        </div>
                      </li>
                      <li className="Header__navbar-details">
                        <Link to="/AllPantsProducts">Quần</Link>
                        <div className="Header__navbar-detailss">
                          <ul>
                            <Link to={"/AllPantsProducts"}>
                              <li className="item">Tất cả</li>
                            </Link>
                            <li className="item">Quần short</li>
                            <li className="item">Quần jeans</li>
                            <li className="item">Quần baggy</li>
                            <li className="item">Quần kaki</li>
                            <li className="item">Quần jogger</li>
                          </ul>
                        </div>
                      </li>
                      <Link to={"/AllDressProducts"}>
                        <li className="Header__navbar-details">Đầm</li>
                      </Link>
                      <Link to={"/AllSkirtProducts"}>
                        <li className="Header__navbar-details">Chân váy</li>
                      </Link>
                    </ul>
                  </div>
                </li>
                <li className="Header__navbar-item position">
                  Nam
                  <div className="Header__navbar-items">
                    <ul>
                      <Link to={"/AllMaleProducts"}>
                        <li className="Header__navbar-details">Tất cả</li>
                      </Link>
                      <li className="Header__navbar-details">
                        <Link to={"/MaleShirt"}>Áo</Link>
                        <div className="Header__navbar-detailss">
                          <ul>
                            <li className="item">Tất cả</li>
                            <li className="item">Áo thun</li>
                            <li className="item">Áo polo</li>
                            <li className="item">Áo sơmi</li>
                            <li className="item">Áo len</li>
                            <li className="item">Áo khoác</li>
                            <li className="item">Áo sweater</li>
                            <li className="item">Áo hoodie</li>
                          </ul>
                        </div>
                      </li>
                      <li className="Header__navbar-details">
                        <Link to={"/MalePants"}>Quần</Link>
                        <div className="Header__navbar-detailss">
                          <ul>
                            <Link to={"/MalePants"}>
                              <li className="item">Tất cả</li>
                            </Link>
                            <li className="item">Quần short</li>
                            <li className="item">Quần jeans</li>
                            <li className="item">Quần baggy</li>
                            <li className="item">Quần kaki</li>
                            <li className="item">Quần jogger</li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="Header__navbar-item position">
                  Nữ
                  <div className="Header__navbar-items">
                    <ul>
                      <Link to={"AllFemaleProducts"}>
                        <li className="Header__navbar-details">Tất cả</li>
                      </Link>
                      <li className="Header__navbar-details">
                        Áo
                        <div className="Header__navbar-detailss">
                          <ul>
                            <li className="item">Tất cả</li>
                            <li className="item">Áo thun</li>
                            <li className="item">Áo polo</li>
                            <li className="item">Áo sơmi</li>
                            <li className="item">Áo len</li>
                            <li className="item">Áo khoác</li>
                            <li className="item">Áo sweater</li>
                            <li className="item">Áo hoodie</li>
                          </ul>
                        </div>
                      </li>
                      <li className="Header__navbar-details">
                        Quần
                        <div className="Header__navbar-detailss">
                          <ul>
                            <li className="item">Tất cả</li>
                            <li className="item">Quần short</li>
                            <li className="item">Quần jeans</li>
                            <li className="item">Quần baggy</li>
                            <li className="item">Quần kaki</li>
                            <li className="item">Quần jogger</li>
                          </ul>
                        </div>
                      </li>
                      <li className="Header__navbar-details">Đầm</li>
                      <li className="Header__navbar-details">Chân váy</li>
                    </ul>
                  </div>
                </li>
                <a href="#Fashion">
                  <li className="Header__navbar-item position">
                    Thương hiệu
                    <div className="fashion50">
                      {fashions.map((fashion, index) => {
                        return (
                          <li key={index} className="noBorder">
                            {fashion}
                          </li>
                        );
                      })}{" "}
                    </div>
                  </li>
                </a>

                <li className="Header__navbar-item position">
                  Giá
                  <div className="Header__navbar-items">
                    <ul>
                      <Link to={"/AllPriceLowThan500"}>
                        <li className="Header__navbar-details">Dưới 500k</li>
                      </Link>
                      <Link to={"/AllPriceFrom500To1M"}>
                        <li className="Header__navbar-details">
                          Từ 500k - 1 triệu
                        </li>
                      </Link>
                      <Link to={"/AllPriceLowThan1M"}>
                        <li className="Header__navbar-details">Trên 1 triệu</li>
                      </Link>
                    </ul>
                  </div>
                </li>

                <li className="Header__navbar-item">Cho - Tặng 0đ</li>
                <li className="Header__navbar-item">Ưu đãi</li>
                <li className="Header__navbar-item">Hướng dẫn đặt hàng</li>
                <li className="Header__navbar-item">Điều khoản sử dụng</li>
                <Link to={"/AddOutlet"}>
                  <li className="Header__navbar-item">Đăng tin</li>
                </Link>
              </ul>
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
}

export default Header;
