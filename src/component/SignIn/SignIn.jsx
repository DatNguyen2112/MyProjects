import React, { useState } from 'react'
import HeaderNoBg from '../Header/HeaderNoBg'
import '../SignIn/SignIn.css'
import { Link } from 'react-router-dom'
import { auth } from '../config/config'
import firebase from 'firebase/compat/app'
function SignIn(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [time, setTime] = useState('')

  const Login = (e) => {
    e.preventDefault();
        auth.signInWithEmailAndPassword(email, password, time).then(() => {
            setEmail('');
            setPassword('');
            setTime(firebase.firestore.FieldValue.serverTimestamp());
            setError('');
            props.history.push('/');
        }).catch(err => setError(err.message));
  }

  return (
    <div className='SignIn'>
      <HeaderNoBg />
      <div className='SignIn__title'>
        <h3 className='SignIn__text'>Đăng nhập</h3>
      </div>

      <div className='SignIn__form'>
      {
        error && <span className='error-msg'>
        {error}</span>}
        <form className='Forms' action="">
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
                <button onClick={Login} className='SignIn__submit-btns'>Đăng nhập</button>
            </div>

            <div className='SignIn__signUpLink'>
                Chưa có tài khoản? <Link className='SignUpLink' to={'/SignUp'}>Đăng ký</Link>
            </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
