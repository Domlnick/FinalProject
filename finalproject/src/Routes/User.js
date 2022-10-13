import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
    return (
        <>
            <div className="user-bg">
                <div className="user-bg-rectangle">
                    <div className="user-bg-title">
                        <Link to="/">
                            <img src="/logos/title.png" width='60%' />
                        </Link>

                    </div>
                </div>
                <div className="login-rectangle">
                    <img src="/logos/login_logo.png" width='20%' className="login-logo-img" />
                    <img src="/logos/sub_title.png" width='50%' className="login-title-img" />
                    <input type='text' className="login-input-id" placeholder="Enter i'd" />
                    <div className="login-find-id">
                        {/* <a href="http://localhost:3000/FindId">아이디를 잊어버렸어요.</a> */}
                        <Link to='/findid'>아이디를 잊어버렸어요.</Link>
                    </div>
                    <input type='password' className="login-input-pw" placeholder="Enter password" />
                    <div className="login-find-pw">
                        {/* <a href="http://localhost:3000/FindPw">비밀번호를 잊어버렸어요.</a> */}
                        <Link to='/FindPw'>비밀번호를 잊어버렸어요.</Link>
                    </div>
                    <div>
                        <button type="submit" className="login-button">Login</button>
                    </div>
                    <div className="create-account">
                        {/* <a href="http://localhost:3000/Register">Create Account</a> */}
                        <Link to='/Register'>Create Account</Link>
                    </div>
                    <div className="sns-login-buttons">
                        <button type="button" className="google-login">
                            <img src="/logos/google_logo.png" width='50%' />
                        </button>
                        <button type="button" className="facebook-login">
                            <img src="/logos/facebook_logo.png" width='50%' />
                        </button>
                        <button type="button" className="apple-login">
                            <img src="/logos/apple_logo.png" width='50%' />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};


function Register() {
    return (
        <>
            <div className="user-bg">
                <div className="user-bg-rectangle">
                    <div className="user-bg-title">
                        <Link to="/">
                            <img src="/logos/title.png" width='60%' />
                        </Link>
                    </div>
                </div>
                <div className="register-rectangle">
                    <img src="/logos/register-logo.png" width='20%' className="register-logo-img" />
                    <img src="/logos/sub_title.png" width='50%' className="register-title-img" />
                    <h5 className="register-input-name-text">이름을 입력해주세요.</h5>
                    <input type='text' className="register-input-name" placeholder="Enter your name" />
                    <h5 className="register-input-mail-text">이메일을 입력해주세요.</h5>
                    <input type='text' className="register-input-mail" placeholder="Enter your e-mail" />
                    <h5 className="register-input-id-text">사용하실 아이디를 입력해주세요.</h5>
                    <input type='text' className="register-input-id" placeholder="Enter your I'd" />
                    <h5 className="register-input-pw-text">사용하실 비밀번호를 입력해주세요.</h5>
                    <input type='password' className="register-input-pw" placeholder="Enter your password" />
                    <h5 className="register-input-re-pw-text">비밀번호를 한번 더 입력해주세요.</h5>
                    <input type='password' className="register-input-re-pw" placeholder="Enter re-password" />
                    <div>
                        <button className="register-button" onClick={() => {
                            // Ajax를 통한 서버와 연동 후 로그인페이지로 이동.
                        }}>가입완료하기</button>
                    </div>
                </div>
            </div>
        </>
    )
};

function FindId() {
    return (
        <>
            <div className="user-bg">
                <div className="user-bg-rectangle">
                    <div className="user-bg-title">
                        <Link to="/">
                            <img src="/logos/title.png" width='70%' />
                        </Link>
                    </div>
                </div>
                <div className="findid-rectangle">
                    <img src="/logos/findid_logo.png" width='20%' className="findid-logo-img" />
                    <img src="/logos/sub_title.png" width='50%' className="findid-title-img" />
                    <h5 className="findid-input-name-text">이름을 입력해주세요</h5>
                    <input type='text' className="findid-input-name" placeholder="Enter your name" />
                    <h5 className="findid-input-email-text">이메일을 입력해주세요.</h5>
                    <input type='text' className="findid-input-email" placeholder="Enter your e-mail" />
                    <div>
                        <button className="findid-button" onClick={() => {
                            // Ajax를 통한 서버와 연동 후 아이디 알려주기
                        }}>아이디 찾기</button>
                    </div>
                    <div className="find-pw">
                        {/* <a href="/">비밀번호를 잊어버렸어요.</a> */}
                        <Link to='/FindPw'>비밀번호를 잊어버렸어요.</Link>
                    </div>
                </div>
            </div>
        </>
    )
};

function FindPw() {
    return (
        <>
            <div className="user-bg">
                <div className="user-bg-rectangle">
                    <div className="user-bg-title">
                        <Link to="/">
                            <img src="/logos/title.png" width='70%' />
                        </Link>
                    </div>
                </div>
                <div className="findpw-rectangle">
                    <img src="/logos/findpw_logo.png" width='30%' className="findpw-logo-img" />
                    <div></div>
                    <img src="/logos/sub_title.png" width='50%' className="findpw-title-img" />
                    <h5 className="findpw-input-name-text">이름을 입력해주세요</h5>
                    <input type='text' className="findpw-input-name" placeholder="Enter your name" />
                    <h5 className="findpw-input-id-text">아이디를 입력해주세요.</h5>
                    <input type='text' className="findpw-input-id" placeholder="Enter your I'd" />
                    <h5 className="findpw-input-email-text">이메일을 입력해주세요.</h5>
                    <input type='text' className="findpw-input-email" placeholder="Enter your e-mail" />
                    <h5 className="findpw-input-cn-text">인증번호를 입력해주세요.</h5>
                    <input type='text' className="findpw-input-cn" placeholder="메일로 발송된 인증번호를 입력해주세요." />
                    <div>
                        <button className="findpw-button" onClick={() => {
                            // Ajax를 통한 서버 연동 후 새로운 패스워드 입력 페이지로 이동.
                        }}>비밀번호 찾기</button>
                    </div>
                </div>
            </div>
        </>
    )
}

function ResetPw() {
    return (
        <>
            <div className="user-bg">
                <div className="user-bg-rectangle">
                    <div className="user-bg-title">
                        <Link to="/">
                            <img src="/logos/title.png" width='70%' />
                        </Link>
                    </div>
                </div>
                <div className="resetpw-rectangle">
                    <img src="/logos/reset_pw_logo.png" width='40%' className="resetpw-logo-img" />
                    <img src="/logos/sub_title.png" width='50%' className="resetpw-title-img" />
                    <h5 className="resetpw-input-pw-text">새로운 비밀번호를 입력해주세요.</h5>
                    <input type='password' className="resetpw-input-pw" placeholder="Enter your new password" />
                    <h5 className="resetpw-re-input-pw-text">한번 더 입력해주세요.</h5>
                    <input type='password' className="resetpw-re-input-pw" placeholder="Enter re-password" />
                    <div>
                        <button className="resetpw-button" onClick={() => {
                            // 새로운 비밀번호 업데이트 후 버튼 클릭 시 로그인 페이지로 이동.
                        }}>완료</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export { Login, Register, FindId, FindPw, ResetPw };