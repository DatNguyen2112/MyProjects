import React from 'react'
import HeaderNoBg from '../Header/HeaderNoBg'
import '../AboutUs/AboutUs.css'
import Fashion from '../../Images/thuonghieu.jpg'
function AboutUs({user}) {
  return (
    <div>
      <HeaderNoBg user={user} />
      <div className='AboutUs__bg'>
        <div className='AboutUs__container'>
            <div className='AboutUs__container-body'>
                <h2 className='AboutUs__container-title'>SOFY</h2>
                <div className='AboutUs__container-para'>SOFY/ Sale Outlet For You </div>
                <div className='AboutUs__container-para'>Chiến binh săn sale cùng bạn</div>
                <div className='AboutUs__container-description'>
                    SOFY là nền tảng kết nối bạn và các thương hiệu thời trang nổi tiếng tại Việt Nam và Thế giới.
	                Bằng cách tập hợp những chương trình sale khuyến mãi, giảm giá đến từ các nhãn hàng thời trang, sứ mệnh của chúng tôi chính là mang đến cho bạn những sản phẩm chất lượng, thời thượng nhưng luôn trong tầm giá phù hợp với bạn.  
                    Cùng với đa dạng các sản phẩm tới từ các nhãn hàng thời trang nổi tiếng trên thế giới, đội ngũ của OFY sẽ đảm bảo cung cấp dịch vụ trang website mua bán uy tín, phục vụ chu đáo, nhiệt tình và hứa rằng sẽ là nơi giúp cho khách hàng có thể thường xuyên an tâm mua sắm những sản phẩm chất lượng với giá cả phù hợp.
                </div>
            </div>
        </div>
      </div>

      <div className='Home__fashion'>
            <div className='Home__newTrend-title'>Thương hiệu nổi tiếng</div>
            <img style={{width: '100%'}} src={Fashion} alt="" />
      </div>
    </div>
  )
}

export default AboutUs
