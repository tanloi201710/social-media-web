import React from 'react';
import './Login.css';

export default function Login() {
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
                        <input placeholder="Email" className="loginInput"/>
                        <input placeholder="Password" className="loginInput"/>
                        <button className="loginButton">Đăng nhập</button>
                        <span className="loginForgot"> Quên mật khẩu ?</span>
                        <button className="loginRegisterButton" >
                            Tạo tài khoản mới
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
