import React, {useState, useEffect} from 'react'
import HeaderNoBg from '../Header/HeaderNoBg'
import {db} from '../config/config'
import {Link} from 'react-router-dom'
function AllFemaleProducts({user}) {
    const [data, setData] = useState([])
    // console.log(data)

    const [dataIndex] = useState([
        {
            id: 'Tất cả',
            option: 'Tất cả'
        },

        {
            id: 'Áo',
            option: 'Áo'
        },

        {
            id: 'Quần',
            option: 'Quần'
        },

        {
            id: 'Đầm',
            option: 'Đầm'
        }, {
            id: 'Chân váy',
            option: 'Chân váy'
        }, 


    ])

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

    const fetchShirt = data.filter((item) => {
        return item.checked === 'Nữ'
    })

    // active class state
    const [active, setActive] = useState('');

    // category state
    const [categorys, setCategorys] = useState('');

    // handle change ... it will set category and active states
    const handleChange = (individualSpan) => {
        setActive(individualSpan.id);
        setCategorys(individualSpan.option);
        filterFunction(individualSpan.option);
    }

    console.log(active)
    console.log(categorys)

    // filtered products state
    const [filteredProducts, setFilteredProducts] = useState([]);

    console.log(filteredProducts)

    // filter function
    const filterFunction = (text) => {
        if (fetchShirt.length > 1) {
            const filter = fetchShirt.filter((shirt) => shirt.categorys === text);
            setFilteredProducts(filter);
        } else {
            console.log('no products to filter')
        }
    }

    const truncate = (str, n) => {
        return str ?. length > n ? str.substr(0, n - 1) + "..." : str;
    }


    return (
        <div>
            <HeaderNoBg user={user}/>
            <div className='SignIn__title'>
                <h3 className='SignIn__text'>Nữ</h3>
            </div>

            <div className='AllProducts__option'>
                <div className='AllProducts__option-title'>
                    <div className='flex'>
                        Nhóm sản phẩm
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                    <ul className='AllProducts__options-list'>
                        {
                        dataIndex.map((data, index) => {
                            return (
                                <li style={
                                        {
                                            listStyleType: 'none',
                                            cursor: 'pointer',
                                            borderBottom: '1px solid #ccc'
                                        }
                                    }
                                    className={
                                        data.id === active ? active : 'deactive'
                                    }
                                    id={
                                        data.id
                                    }
                                    onClick={
                                        () => handleChange(data)
                                    }
                                    key={index}>
                                    {
                                    data.option
                                }</li>
                            )
                        })
                    } </ul>
                </div>

                <div className='AllProducts__option-products'>
                    {
                    filteredProducts.length > 0 && (
                        <div className='AllProducts__option-filterProducts'>
                            {
                            filteredProducts.map((filteredProduct) => {
                                return (
                                    <Link to={
                                        `/ProductDetail/${
                                            filteredProduct.ID
                                        }`
                                    }>
                                        <div key={
                                                filteredProduct.id
                                            }
                                            className='AllProducts__option-item'>
                                            <img className='AllProducts__option-pic'
                                                src={
                                                    filteredProduct.url
                                                }
                                                alt=""/>
                                            <div className='AllProducts__option-content'>
                                                <div className='AllProducts__option-options'>
                                                    <div className='bg_w'>
                                                        {
                                                        filteredProduct.categorysFashion
                                                    }</div>
                                                    <div className='bg_w'>
                                                        {
                                                        filteredProduct.checked
                                                    }</div>
                                                    <div className='bg_w'>
                                                        {
                                                        filteredProduct.categorys
                                                    }</div>

                                                </div>

                                                <div className='AllProduct__option-description'>
                                                    {
                                                    truncate(filteredProduct.description, 15) || 'Chưa có mô tả'
                                                } </div>

                                                <div className='AllProduct__option-price'>
                                                    {
                                                    filteredProduct.price.toLocaleString('de-DE')
                                                }đ
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        } </div>
                    )
                }

                    {
                    filteredProducts.length < 1 && (
                        <> {
                            fetchShirt.length > 0 && (
                                <div className='AllProducts__option-AllProduct'>
                                    {
                                    fetchShirt.map((product) => {
                                        return (
                                            <Link to={
                                                `ProductDetail/${
                                                    product.ID
                                                }`
                                            }>
                                                <div key={
                                                        product.id
                                                    }
                                                    className='AllProducts__option-item'>
                                                    <img className='AllProducts__option-pic'
                                                        src={
                                                            product.url
                                                        }
                                                        alt=""/>
                                                    <div className='AllProducts__option-content'>
                                                        <div className='AllProducts__option-options'>
                                                            <div className='bg_w'>
                                                                {
                                                                product.categorysFashion
                                                            }</div>
                                                            <div className='bg_w'>
                                                                {
                                                                product.checked
                                                            }</div>
                                                            <div className='bg_w'>
                                                                {
                                                                product.categorys
                                                            }</div>

                                                        </div>

                                                        <div className='AllProduct__option-description'>
                                                            {
                                                            product.description || 'Chưa có mô tả'
                                                        } </div>

                                                        <div className='AllProduct__option-price'>
                                                            {
                                                            product.price.toLocaleString('de-DE')
                                                        }đ
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                } </div>
                            )
                        }

                            {
                            fetchShirt.length < 1 && (
                                <div>Loading ...</div>
                            )
                        } </>


                    )
                } </div>
            </div>
        </div>
    )
}

export default AllFemaleProducts
