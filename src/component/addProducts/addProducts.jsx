import React, {useState} from 'react'
import HeaderNoBg from '../Header/HeaderNoBg'
import '../addProducts/addProducts.css'
import CurrencyInput from 'react-currency-input-field';
import { storage, db } from '../config/config';
import firebase from 'firebase/compat/app'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddProducts({user}) {
    const tabs = ['Own SOFY', 'Cho/Tặng', 'Dành cho thương hiệu']
    const fashions = [
        'POLO RALPH LAUREN ',
        'NIKE SWIM - NIKE OUTDOOR',
        'MANGO',
        'LEVIs',
        'GAP',
        'OLD NAVY ',
        'CALVIN KLEIN',
        'TOMMY HILFIGER',
        'TOMMY JEANS',
        'OVS',
        'BANANA REPUBLIC',
        'OWNDAYS',
        'PARFOIS',
        'FITFLOP',
        'COTTON:ON',
        'TYPO',
        'MOTHERCARE',
        'SUNNIES STUDIOS',
        'FRENCH CONNECTION',
        'DOCKERS ',
        'SWAROVSKI'
    ]
    const Sex = [
        {
            id: 1,
            Sex: 'Nam'
        }, {
            id: 2,
            Sex: 'Nữ'
        }
    ]

    const Size = [
        {
            id: 1,
            Size: 'M'
        }, {
            id: 2,
            Size: 'XL'
        },  {
            id: 3,
            Size: 'L'
        }
    ]

    const [active, setActive] = useState(tabs[0])
    const [poster, setPoster] = useState('')
    const [checked, setChecked] = useState(0)
    const [check, setCheck] = useState(0)
    const [price, setPrice] = useState('')
    const [image, setImage] = useState([])
    const [categorys, setCategorys] = useState('')
    const [categorysItem, setCategorysItem] = useState('')
    const [categorysFashion, setCategorysFashion] = useState('')
    const [description, setDescription] = useState('')
    const [uploadError, setUploadError] = useState('')
    console.log(checked)
    console.log(check)

    const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG'];

    const validateValue = (value) => {
        const price = value === undefined ? 'undefined' : value;
        setPrice(price);


    };



    const handleProductImage = (e) => {
        let selectedFile = e.target.files[0];
        console.log(selectedFile)
        if (selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                setImage(selectedFile);
                // setImageError('');
            } else {
                setImage(null);
                // setImageError('Lựa chọn ảnh hợp lệ')
            }
        } else {
            console.log('please select your file');
        }
    }

    const handleAddProducts = (e) => {
        e.preventDefault()
        const uploadTask = storage.ref(`product-images/${
            image.name
        }`).put(image);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progress);
        }, error => setUploadError(error.message), () => {
            storage.ref('product-images').child(image.name).getDownloadURL().then((url) => {
                db.collection('Products').add({
                    poster: user,
                    description,
                    checked,
                    check,
                    price: Number(price),
                    categorys,
                    categorysItem,
                    categorysFashion,
                    url,                    
                    time: firebase.firestore.FieldValue.serverTimestamp(),
                }).then(() => {
                    // setSuccessMsg('Đăng tin thành công');
                    setDescription('');
                    setPoster('');
                    document.getElementById('file').value = '';
                    // setImageError('');
                    setUploadError('');
                    setChecked('');
                    setCheck('');
                    setPrice('');
                    setCategorys('');
                    setCategorysItem('');
                    setCategorysFashion('');             
                    setTimeout(() => {
                        toast.success(`${user} vừa đăng một tin mới`)
                    }, 1000)
                    
                    // toast.success(`${user} vừa đăng một tin mới`)
                }).catch(error => setUploadError(error.message));
            })
        })

        
    }


    return (
        <div>
            <ToastContainer />
            <HeaderNoBg user={user}/>
            <div className='SignIn__title'>
                <h3 className='SignIn__text'>Đăng tin</h3>
            </div>

            <div className='AddProduct__options'>
                {
                tabs.map((tab, index) => {
                    return (
                        <div key={index}>
                            <button style={
                                    tab === active ? {

                                        backgroundColor: '#000',
                                        color: '#fff'
                                    } : {}
                                }
                                className='AddProduct__btn'
                                onClick={
                                    () => setActive(tab)
                            }>
                                {tab}</button>
                        </div>
                    )
                })
            } </div>
            {
            active === 'Own SOFY' ? (
                <div className='OwnOFY'>
                    <form onSubmit={handleAddProducts} action="">
                        <div className='OwnOFY__user'>
                            <label className='OwnOFY__user-title'>
                                <strong>Tên người dùng</strong>
                            </label>
                            <input className='OwnOFY__user-input'
                                value={user}
                                type="text"
                                onChange={
                                    e => setPoster(e.target.value)
                                }/>
                        </div>

                        <div className='OwnOFY__user'>
                            <label className='OwnOFY__user-title'>
                                <strong>Mô tả sản phẩm</strong>
                            </label>
                            <input className='OwnOFY__user-input'
                                value={description}
                                type="text"
                                onChange={
                                    e => setDescription(e.target.value)
                                }/>
                        </div>

                        <div className='OwnOFY__sex'>
                            <label className='OwnOFY__user-title'>
                                <strong>Giới tính</strong>
                            </label>
                            <div className='OwnOFY__sex-item'>
                                {
                                Sex.map((sex) => {
                                    return (
                                        <div key={
                                            sex.id
                                        }>
                                            <input value={checked}
                                                type="radio"
                                                checked={
                                                    checked === sex.Sex
                                                }
                                                onChange={
                                                    () => setChecked(sex.Sex)
                                                }/>
                                            <label style={
                                                    {paddingLeft: 10}
                                                }
                                                className='OwnOFY__user-title'>
                                                {
                                                sex.Sex
                                            }</label>

                                        </div>
                                    )
                                })
                            } </div>
                        </div>

                        <div className='OwnOFY__sex'>
                            <label className='OwnOFY__user-title'>
                                <strong>Size</strong>
                            </label>
                            <div className='OwnOFY__sex-item'>
                                {
                                Size.map((size) => {
                                    return (
                                        <div key={
                                            size.id
                                        }>
                                            <input value={check}
                                                type="radio"
                                                checked={
                                                    check === size.Size
                                                }
                                                onChange={
                                                    () => setCheck(size.Size)
                                                }/>
                                            <label style={
                                                    {paddingLeft: 10}
                                                }
                                                className='OwnOFY__user-title'>
                                                {
                                                size.Size
                                            }</label>

                                        </div>
                                    )
                                })
                            } </div>
                        </div>

                        <div className='OwnOFY__user'>
                            <label className='OwnOFY__user-title'>
                                <strong>giá</strong>
                            </label>
                            <CurrencyInput allowDecimals={false}
                                onValueChange={validateValue}
                                className="OwnOFY__user-input"/>
                        </div>

                        <div className='OwnOFY__user'>
                            <label className='OwnOFY__user-title'>
                                <strong>Danh mục</strong>
                            </label>
                            <select value={categorys}
                                onChange={
                                    (e) => setCategorys(e.target.value)
                                }
                                className='OwnOFY__user-input'>
                                <option value="">Lựa chọn danh mục</option>
                                <option>Áo</option>
                                <option>Quần</option>
                                <option>Đầm</option>
                                <option>Chân váy</option>
                                <option>Đồ liền thân</option>
                                <option>Set bộ</option>
                            </select>
                        </div>

                        {
                        categorys === 'Áo' && (
                            <div className='OwnOFY__user'>
                                <label className='OwnOFY__user-title'>
                                    <strong>Áo</strong>
                                </label>
                                <select value={categorysItem}
                                    onChange={
                                        (e) => setCategorysItem(e.target.value)
                                    }
                                    className='OwnOFY__user-input'>
                                    <option value="">Lựa chọn danh mục</option>
                                    <option>Áo thun</option>
                                    <option>Áo polo</option>
                                    <option>Áo sơmi</option>
                                    <option>Áo len</option>
                                    <option>Áo khoác</option>
                                    <option>Áo sweater</option>
                                    <option>Áo hoodie</option>
                                </select>
                            </div>
                        )
                    }

                        {
                        categorys === 'Quần' && (
                            <div className='OwnOFY__user'>
                                <label className='OwnOFY__user-title'>
                                    <strong>Quần</strong>
                                </label>
                                <select value={categorysItem}
                                    onChange={
                                        (e) => setCategorysItem(e.target.value)
                                    }
                                    className='OwnOFY__user-input'>
                                    <option value="">Lựa chọn danh mục</option>
                                    <option>Quần short</option>
                                    <option>Quần jeans</option>
                                    <option>Quần baggy</option>
                                    <option>Quần kaki</option>
                                    <option>Quần jogger</option>

                                </select>
                            </div>
                        )
                    }

                        <div className='OwnOFY__user'>
                            <label className='OwnOFY__user-title'>
                                <strong>Thương hiệu</strong>
                            </label>
                            <select value={categorysFashion}
                                onChange={
                                    (e) => setCategorysFashion(e.target.value)
                                }
                                className='OwnOFY__user-input'>
                                <option value="">Thương hiệu</option>
                                {fashions.map((fashion) => {
                                    return <option>{fashion}</option>
                                })}
                            </select>
                        </div>

                        <div className='OwnOFY__user'>
                            <label className='OwnOFY__user-title'><strong>Đăng ảnh</strong></label>
                            <input
                            
                                onChange={handleProductImage}
                                accept="true"
                                type="file"
                                id='file'
                                className='OwnOFY__user-input'
                                multiple/>
                        </div>

                        

                        <button className='OwnOFY__user-submit'>Đăng tin</button>

                    </form>
                </div>
            ) : ''
        }

            {
            active === 'Cho/Tặng' ? (
                <div className='NoAvailible'>Hiện chưa khả dụng</div>
            ) : ''
        }

            {
            active === 'Dành cho thương hiệu' ? (
                <div className='NoAvailible'>Hiện chưa khả dụng</div>
            ) : ''
        } </div>
    )
}

export default AddProducts
