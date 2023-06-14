import React, {useEffect, useState} from 'react'
import HeaderNoBg from '../Header/HeaderNoBg'
import {db} from '../config/config'
import {Link} from 'react-router-dom'
function AllSkirtProducts() {
    const [data, setData] = useState([])
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
        return item.categorys === 'Chân váy'
    })

    return (
        <div>
            <HeaderNoBg/>
            <div className='SignIn__title'>
                <h3 className='SignIn__text'>Chân váy</h3>
            </div>

            <div className='AllProducts__option-products'>
                <div className='AllProducts__option-AllProduct'>
                    {
                    fetchShirt.map((product) => {
                        return (
                            <Link to={
                                `/ProductDetail/${
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
            </div>
        </div>
    )
}

export default AllSkirtProducts
