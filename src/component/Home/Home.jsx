import React, {useEffect, useState} from 'react'
import Header from '../Header/Header'
import Slider from 'react-slick'
import Banner1 from '../../Images/Banner1.jpg'
import Banner2 from '../../Images/Banner2.jpg'
import Banner3 from '../../Images/Banner3.jpg'
import Fashion from '../../Images/thuonghieu.jpg'
import Ecomence1 from '../../Images/Ecom1.jpg'
import Ecomence2 from '../../Images/Ecom2.jpg'
import Ecomence3 from '../../Images/Ecom3.jpg'
import Ecomence4 from '../../Images/Ecom4.jpg'
import Ecomence5 from '../../Images/Ecom5.jpg'
import Ecomence6 from '../../Images/Ecom6.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../Home/Home.css'
import {db} from '../config/config'
import {Link} from 'react-router-dom'
function Home({user}) {

    const [data, setData] = useState([])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        slickNext: false,
        slickPrev: false
    };

    // useEffect(() => { // forcing user to signup
    //     auth.onAuthStateChanged(user => {
    //         if (!user) {
    //             history.push('/signIn');
    //         }
    //     })
    // })

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

   

    // const truncate = (str, n) => {
    //     return str ?. length > n ? str.substr(0, n - 1) + "..." : str;
    // }
    
    return (
        <div>
            <Header user={user}/>

            <div className='Sliders__containers'>
                <Slider {...settings}>
                    <div className='Slider__item'>
                        <img className='Slider__img'
                            src={Banner1}
                            alt=""/>
                    </div>
                    <div className='Slider__item'>
                        <img className='Slider__img'
                            src={Banner2}
                            alt=""/>
                    </div>
                    <div className='Slider__item'>
                        <img className='Slider__img'
                            src={Banner3}
                            alt=""/>
                    </div>
                </Slider>
            </div>

            <div className='Home__newTrend'>
                <div className='Home__newTrend-title'>Xu hướng mới nhất</div>
                <div className='Home__newTrend-poster'>
                    <div className='Home__newTrend-posterItem'>
                        <div className='Home__newTrend-smallSlide'>
                            <Slider {...settings}>
                                <div className='Slider__item'>
                                    <img className='Slider__img' src={Ecomence1} alt=""/>
                                </div>
                                <div className='Slider__item'>
                                    <img className='Slider__img' src={Ecomence2} alt=""/>
                                </div>

                            </Slider>
                        </div>
                    </div>
                    <div className='Home__newTrend-posterItem'>
                        <div className='Home__newTrend-smallSlide'>
                            <Slider {...settings}>
                                <div className='Slider__item'>
                                    <img className='Slider__img' src={Ecomence3} alt=""/>
                                </div>
                                <div className='Slider__item'>
                                    <img className='Slider__img' src={Ecomence4} alt=""/>
                                </div>

                            </Slider>
                        </div>
                    </div>
                    <div className='Home__newTrend-posterItem'>
                        <div className='Home__newTrend-smallSlide'>
                            <Slider {...settings}>
                                <div className='Slider__item'>
                                    <img className='Slider__img' src={Ecomence5} alt=""/>
                                </div>
                                <div className='Slider__item'>
                                    <img className='Slider__img' src={Ecomence6} alt=""/>
                                </div>

                            </Slider>
                        </div>
                    </div>

                </div>
            </div>

            

            <div id='Fashion' className='Home__fashion'>
                <div className='Home__newTrend-title'>Thương hiệu nổi tiếng</div>
                <img style={
                        {width: '100%'}
                    }
                    src={Fashion}
                    alt=""/>
            </div>
        </div>
    )
}

export default Home
