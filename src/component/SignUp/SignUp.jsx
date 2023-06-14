import React, {useState} from 'react'
import HeaderNoBg from '../Header/HeaderNoBg'
import '../SignUp/SignUp.css'
import { Link } from 'react-router-dom'
import { auth, db } from '../config/config';
import firebase from 'firebase/compat/app'
function SignUp(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  const SignUp = (e) => {
    e.preventDefault()
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
        db.collection('SignUp').doc(cred.user.uid).set({Name: name, Email: email, Password: password, time: firebase.firestore.FieldValue.serverTimestamp()}).then(() => {
            setName('')
            setEmail('')
            setPassword('')
            setError('')
            props.history.push('/SignIn')
        }).catch(err => setError(err.message))
    }).catch(err => setError(err.message))
  }

  return (
    <div className='SignUp'>
      <HeaderNoBg />
      <div className='SignUp__title'>
        <h3 className='SignUp__text'>Đăng ký</h3>
      </div>

      <div className='SignIn__form'>
      {
        error && <span className='error-msg'>
        {error}</span>}
        <form className='Forms' action="">
            <div className='SignIn__email'>
                <label className='SignIn__logo'>
                    <i className="fa-solid fa-user"></i>
                </label>
                <input value={name} onChange={e => setName(e.target.value)} className='SignIn__email-input' placeholder='Tên đăng nhập' type="text" />
            </div>
            <div className='SignIn__email'>
                <label className='SignIn__logo'>
                    <i className="fa-solid fa-envelope"></i>
                </label>
                <input value={email} onChange={e => setEmail(e.target.value)} className='SignIn__email-input' placeholder='Email' type="text" />
            </div>
            <div className='SignIn__password'>
                <label className='SignIn__logo'>
                    <i class="fa-solid fa-lock"></i>
                </label>
                <input value={password} onChange={e => setPassword(e.target.value)} className='SignIn__email-input' placeholder='Mật khẩu' type="password" />
            </div>
            <div className='SignIn__submit-btn'>
                <button onClick={SignUp} className='SignIn__submit-btns'>Đăng Ký</button>
            </div>

            <div className='SignIn__signUpLink'>
                Đã có tài khoản? <Link className='SignUpLink' to={'/SignIn'}>Đăng nhập</Link>
            </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
