import React from 'react';
import './Register.css';

export default function Register() {
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
                        <input placeholder="Username" className="loginInput"/>
                        <input placeholder="Email" className="loginInput"/>
                        <input placeholder="Mật khẩu" className="loginInput"/>
                        <input placeholder="Xác nhận mật khẩu" className="loginInput"/>
                        <button className="loginButton">Đăng ký</button>
                        <button className="loginRegisterButton" >
                            Đăng nhập tài khoản
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
