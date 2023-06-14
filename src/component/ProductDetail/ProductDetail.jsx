import React, {useEffect, useState} from 'react'
import HeaderNoBg from '../Header/HeaderNoBg'
import {useParams} from 'react-router-dom'
import {db, auth} from '../config/config';
import '../ProductDetail/ProductDetail.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
function ProductDetail({user, props}) {
    const {ProductID} = useParams();
    console.log(ProductID)
    const [images, setImages] = useState(null)
    const [times, setTimes] = useState()
    const [prices, setPrices] = useState('')
    const [posters, setPosters] = useState('')
    const [descriptions, setDescriptions] = useState('')
    const [checkeds, setCheckeds] = useState('')
    const [checks, setChecks] = useState('')
    const [categorysItems, setCategorysItems] = useState('')
    const [categorysFashions, setCategorysFashions] = useState('')
    const [categoryss, setCategoryss] = useState('')
    const [show, setShow] = useState(false)
    const [product, setProduct] = useState([])
    const [data, setData] = useState([])
    console.log(prices)
    

    const truncate = (str, n) => {
        return str ?. length > n ? str.substr(0, n - 1) + "..." : str;
    }

    useEffect(() => {
        const fetchProduct = db.collection("Products").doc(ProductID).get().then((snapshot) => {
            if (snapshot) {
                setProduct(snapshot.data())
            }
        })
        return fetchProduct
    }, [ProductID])

    useEffect(() => {
        const fetchDetailProduct = db.collection("Products").doc(ProductID).get().then((snapshot) => {
            if (snapshot) {

                setCategoryss(snapshot.data().categorys)
                setCategorysFashions(snapshot.data().categorysFashion)
                setCategorysItems(snapshot.data().categorysItem)  
                setChecks(snapshot.data().check)              
                setCheckeds(snapshot.data().checked)
                setDescriptions(snapshot.data().description)
                setPosters(snapshot.data().poster)
                setPrices(snapshot.data().price)
                setTimes(new Date(snapshot.data().time.toDate()).toLocaleDateString() + " " + new Date(snapshot.data().time.toDate()).toLocaleTimeString())
                setImages(snapshot.data().url)
                
            }
        })
        return fetchDetailProduct
    }, [ProductID])
    
    console.log(typeof checks)
    const handleClick = () => {
        setShow(!show)
    }

    // getting current user uid
    function GetUserUid() {
        const [uid, setUid] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    setUid(user.uid);
                }
            })
        }, [])
        return uid;
    }

    const uid = GetUserUid();


    // state of totalProducts
    const [totalProducts, setTotalProducts] = useState(0);
    // getting cart products
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('Cart ' + user.uid).onSnapshot(snapshot => {
                    const qty = snapshot.docs.length;
                    setTotalProducts(qty);
                })
            }
        })
    }, [])

    // globl variable
    let Product;
    console.log(Product)
    // add to cart
    const addToCart = (product, ID) => {
        if (uid !== null) {
            console.log(product);
            console.log(ID)
            Product = product;
            
            Product['ID'] = ProductID
            Product['qty'] = 1;
            Product['Buyer'] = user;
            Product['TotalProductPrice'] = Product.qty * Product.price;
            db.collection('Cart '+ uid).doc(ProductID).set(Product).then(() => {

                toast.success(ProductID ? 'Bạn đã thêm vào giỏ hàng thành công' : 'Sản phẩm đã có trong giỏ hàng')

            }).catch((err) => {
                toast.error('Lỗi hệ thống', err)
            })

        } else {
            props.history.push('/login');
        }

    }

    console.log(product)

    const handleAdd = () => {
        addToCart(product)

    }

    useEffect(() => {
        const fetchProduct = db.collection('Products').limit(100).onSnapshot((snapshot) => {
            const data = snapshot.docs.map((doc) => {
                return({
                    ID: doc.id,
                    ...doc.data()
                })
            })
            setData(data)
        })
        return fetchProduct
    }, [])

    const dataSlice = data.slice(0, 8)

    return (
        <div>
            <ToastContainer />
            <HeaderNoBg user={user} totalProducts={totalProducts}/>
            <div className='ProductDetail__container'>
                <div className='ProductDetail__container-image'>
                    <img className='image__photo'
                        src={images}
                        alt=""/>
                </div>

                <div className='ProductDetail__content'>
                    <div className='ProductDetail__details'>
                        <div className='ProductDetail__categorys'>
                            <div className='ProductDetail__categoryFashion'>
                                {categorysFashions}</div>
                            <i className="fa-solid fa-caret-right"></i>
                            <div className='ProductDetail__checked'>
                                {checkeds}</div>
                            <i className="fa-solid fa-caret-right"></i>
                            <div className='ProductDetail__category'>
                                {categoryss}</div>
                            <div className={
                                categorysItems == '' ? 'disapear' : 'appear'
                            }>
                                <i className="fa-solid fa-caret-right"></i>
                            </div>
                            <div className={
                                categorysItems == '' ? 'noBorders' : 'Border'
                            }>
                                {categorysItems}</div>
                        </div>

                        <div className='ProductDetail__rating'>
                            Đánh giá : {" "}
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>

                        <div className='ProductDetail__description'>
                            {descriptions} </div>

                        <div className='ProductDetail__poster'>Người đăng: {posters}</div>

                        <div className='ProductDetail__price'>
                            {
                            prices.toLocaleString('de-DE')
                        }đ
                        </div>

                        <div className='ProductDetail__size'>
                            <div className='ProductDetail__size-title'>Size</div>
                            <div className='ProductDetail__size-text'>
                               {checks}

                            </div>
                        </div>

                        <div className='ProductDetail__submit'>
                            <button onClick={handleAdd} className='ProductDetail__btn'>
                                <i className="fa-sharp fa-solid fa-bag-shopping"></i>
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            

            <div className='ProductDetail__review'>
                <div className='Product__review-showForm'>
                    <div className='Product__review-star'>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <i className="fa-regular fa-star"></i>
                        <div className='Product__review-length'>
                            0 đánh giá
                        </div>
                    </div>


                    <div className='Product__review-submit'>
                        <button onClick={handleClick} className='Product__review-submitBtn'>Đánh giá</button>
                    </div>

                </div>

                {show && <div style={show ? {opacity: 1} : {opacity: 0}} className='Product__review-form'>
                    <form action="">
                        <label htmlFor="">
                            <h3>Viết đánh giá mới</h3>
                        </label>
                        <div className='Product__review-item'>
                            <label className='bold'>Tên</label>
                            <input placeholder='Tên của bạn' className='Product-review-nameInput' type="text"/>
                        </div>

                        <div className='Product__review-item'>
                            <label className='bold'>Email</label>
                            <input placeholder='Email' className='Product-review-nameInput' type="text"/>
                        </div>

                        <div className='flexs'>
                            <label className='bold'>Đánh giá</label>
                            <div>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>

                        </div>

                        <div className='Product__review-item'>
                            <label className='bold'>Tiêu đề</label>
                            <input placeholder='Hãy cho một tiêu đề' className='Product-review-nameInput' type="text"/>
                        </div>

                        <div className='Product__review-item'>
                            <label className='bold'>Nội dung</label>
                            <textarea className='textareaContent' placeholder='Viết nội dung đánh giá ở đây' id="" rows="10"></textarea>
                        </div>

                        <div className='Product__review-itemBtn'>
                            <button className='Product__review-itemSubmit'>Gửi đánh giá</button>
                        </div>
                    </form>
                </div>}
            </div>

            <div className='Home__stylist'>
                <div className='Home__newTrend-title'>Sản phẩm nổi bật</div>
                <div className='AllProducts__option-products width80'>
                    <div className='AllProducts__option-filterProducts noWrap'>
                        {
                        dataSlice.map((item) => {
                            return (
                                <Link to={
                                    `/ProductDetail/${
                                        item.ID
                                    }`
                                }>
                                    <div key={
                                            item.id
                                        }
                                        className='AllProducts__option-item'>
                                        <img className='AllProducts__option-pic'
                                            src={
                                                item.url
                                            }
                                            alt=""/>
                                        <div className='AllProducts__option-content'>
                                            <div className='AllProducts__option-options'>
                                                <div className='bg_w'>
                                                    {
                                                    item.categorysFashion
                                                }</div>
                                                <div className='bg_w'>
                                                    {
                                                    item.checked
                                                }</div>
                                                <div className='bg_w'>
                                                    {
                                                    item.categorys
                                                }</div>
                                                
                                            </div>

                                            <div className='AllProduct__option-description'>
                                                {
                                                truncate(item.description, 30) || 'Chưa có mô tả'
                                            } </div>

                                            <div className='AllProduct__option-price'>
                                                {
                                                item.price.toLocaleString('de-DE')
                                            }đ
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }</div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
