import React from 'react'
import '../Footer/Footer.css'
import Connect from '../../Images/connect.png'
function Footer() {
    return (
        <div className='Footer'>
            <div className='Footer__container'>
                <div className='Footer__container-logo'></div>

                <div className='Footer__container-titles'>
                    <div className='Footer__container-items'>
                        <div className='Footer__container-item'>Về chúng tôi</div>
                        <div className='Footer__container-item'>Tiêu chuẩn cộng đồng</div>
                        <div className='Footer__container-item'>Điều khoản & điều kiện</div>
                    </div>
                    <div className='Footer__container-items'>
                        <div className='Footer__container-item'>Kiểm tra trạng thái đơn hàng</div>
                        <div className='Footer__container-item'>Liên hệ</div>
                    </div>
                </div>


            </div>

            <div className='Footer__container-discover'>
                <div className='Footer__containers'>
                    <div className='Footer__container-discovers margin20'>
                        <div className='Footer__container-titleText'>Khám phá SOFY</div>
                        <ul>
                            <li className='Footer__container-itemss'>Trang chủ</li>
                            <li className='Footer__container-itemss'>Nam</li>
                            <li className='Footer__container-itemss'>Nữ</li>
                            <li className='Footer__container-itemss'>Thương hiệu</li>
                            <li className='Footer__container-itemss'>Ưu đãi</li>
                            <li className='Footer__container-itemss'>Đăng tin</li>
                            <li className='Footer__container-itemss'>SOFY</li>
                        </ul>
                    </div>
                    <div className='Footer__container-support margin20'>
                        <div className='Footer__container-titleText'>Trung tâm hỗ trợ</div>
                        <ul>
                            <li className='Footer__container-itemss'>FAQ - Câu Hỏi Thường Gặp</li>
                            <li className='Footer__container-itemss'>Đặt Hàng & Thanh Toán</li>
                            <li className='Footer__container-itemss'>Bảo Hành</li>
                            <li className='Footer__container-itemss'>Ưu đãi & Mã Giảm Giá</li>
                            <li className='Footer__container-itemss'>Trả Góp 0% Lãi Suất</li>
                            <li className='Footer__container-itemss'>Hướng dẫn Đặt cọc</li>

                        </ul>
                    </div>
                    <div className='Footer__container-connect margin20'>
                        <div className='Footer__container-titleText'>SOFY:Connect</div>
                        <img style={{width: 200}} src={Connect} alt="" />
                    </div>
                    <div className='Footer__container-blog margin20'>
                        <div className='Footer__container-titleText'>Blog</div>
                        <ul>
                            <li className='Footer__container-itemss'>Thể thao</li>
                            <li className='Footer__container-itemss'>Thời trang</li>
                            <li className='Footer__container-itemss'>Sức khỏe & làm đẹp</li>
                            <li className='Footer__container-itemss'>Nhà cửa & đời sống</li>


                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer
