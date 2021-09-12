import React, { useEffect, useRef } from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { google, signin } from '../../actions/auth';
import './Login.css';


export default function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const email = useRef();
    const password = useRef();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const {errorMsg} = useSelector((state) => state.auth);
    
    useEffect(() => {
        if(errorMsg !== '') alert(errorMsg);
    }, [errorMsg]);

    console.log(errorMsg);

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        dispatch(google(result,token,history));
    };

    const googleFailure = () => {
        console.log("Google Sign In was unsuccessful. Try Again Later!");
    };

    const handleLogin = () => {
        const formData = {
            email: email.current.value,
            password: password.current.value
        };

        dispatch(signin(formData,history));
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo"> ThanhSocial </h3>
                    <span className="loginDesc">
                        Kết bạn với các bạn bè và thế giới xung quanh bạn trên ThanhSocial
                    </span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input placeholder="Email" type="email" className="loginInput" ref={email}/>
                        <input placeholder="Password" type="password" className="loginInput" onKeyDown={(e) => { if(e.key === 'Enter') handleLogin() }} ref={password}/>
                        <button className="loginButton" onClick={handleLogin}>Đăng nhập</button>
                        <span className="loginForgot"> Quên mật khẩu ?</span>
                        <button className="loginRegisterButton" onClick={() => history.push('/register')}>
                            Tạo tài khoản mới
                        </button>
                        <GoogleLogin 
                        clientId="942604298897-gs8om3cnmj19gr4pc02enfpidos9ofb4.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button
                                onClick={renderProps.onClick}
                                className="googleButton"
                                disabled={renderProps.disabled}
                            >
                                <img src={PF+'googleicon.png'} alt="" className="googleImg"/>
                                <span className="googleText">Đăng nhập bằng Google</span>
                            </button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
