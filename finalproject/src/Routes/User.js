import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Header } from "../Components/Header";
import { useForm } from "react-hook-form";

// 로그인 컴포넌트
function Login() {
    // 아이디 및 비밀번호 value가 입력되면 버튼 활성화
    const [idValue, setIdValue] = useState('');
    const [password, setPassword] = useState('');
    const [disable, setDisable] = useState(true);
    const [opacity, setOpacity] = useState(0.5);

    const navigate = useNavigate();
    const goToList = () => {
        navigate('/');
    };

    const handleInput = event => {
        return event.target.value;
    };

    const handleopacity = () => {
        idValue && password ? setOpacity(1) : setOpacity(0.5);
    };

    const handleDisable = () => {
        idValue && password ? setDisable(false) : setDisable(true);
    };

    return (
        <>
            <Header />
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
                    <input type='text' className="login-input-id" placeholder="Enter i'd" onChange={(event) => {
                        setIdValue(handleInput(event));
                        handleopacity();
                        handleDisable();
                    }} />
                    <div className="login-find-id">
                        <Link to='/findid'>아이디를 잊어버렸어요.</Link>
                    </div>
                    <input type='password' className="login-input-pw" placeholder="Enter password" onChange={(event) => {
                        setPassword(handleInput(event));
                        handleopacity();
                        handleDisable();
                    }} />
                    <div className="login-find-pw">
                        <Link to='/FindPw'>비밀번호를 잊어버렸어요.</Link>
                    </div>
                    <div>
                        <button type="submit" className="login-button" disable={disable} style={{ opacity: opacity }} onClick={() => {
                            goToList();
                        }}>Login</button>
                    </div>
                    <div className="create-account">
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

// 아이디 찾기 컴포넌트
function FindId() {

    const [name, setName] = useState('');
    const [email, setEamil] = useState('');
    const [disable, setDisable] = useState(true);
    const [opacity, setOpacity] = useState(0.5);

    const navigate = useNavigate();
    const goToList = () => {
        navigate('/showid');
    };

    const handleInput = event => {
        return event.target.value;
    };

    const handleopacity = () => {
        name && email ? setOpacity(1) : setOpacity(0.5);
    };

    const handleDisable = () => {
        name && email ? setDisable(false) : setDisable(true);
    };

    return (
        <>
            <Header />
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
                    <input type='text' className="findid-input-name" placeholder="Enter your name" onChange={(event) => {
                        setName(handleInput(event));
                        handleopacity();
                        handleDisable();
                    }} />
                    <h5 className="findid-input-email-text">이메일을 입력해주세요.</h5>
                    <input type='text' className="findid-input-email" placeholder="Enter your e-mail" onChange={(event) => {
                        setEamil(handleInput(event));
                        handleopacity();
                        handleDisable();
                    }} />
                    <div>
                        <button className="findid-button" disable={disable} style={{ opacity: opacity }} onClick={() => {
                            // Ajax를 통한 서버와 연동 후 아이디 알려주기
                            goToList();
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

// 찾은 아이디 결과 컴포넌트
function ShowId() {

    const navigate = useNavigate();
    const goToList = () => {
        navigate('/login');
    };

    return (
        <>
            <Header />
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
                    <h5 className="findid-input-name-text">회원님의 정보로 조회된 아이디 입니다.</h5>
                    {/* <input type='text' className="findid-input-name" placeholder="Enter your name" /> */}
                    <h5 className="findid-input-email-text">aaa12***</h5>
                    {/* <input type='text' className="findid-input-email" placeholder="Enter your e-mail" /> */}
                    <div>
                        <button className="findid-button" onClick={() => {
                            goToList();
                        }}>로그인 하기</button>
                    </div>
                </div>
            </div>
        </>
    )
};

// 비밀번호 찾기 컴포넌트
function FindPw() {

    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [email, setEamil] = useState('');
    const [certificationNumber, setCertificationNumber] = useState('');
    const [disable, setDisable] = useState(true);
    const [opacity, setOpacity] = useState(0.5);

    const handleInput = event => {
        return event.target.value;
    };

    const handleopacity = () => {
        name && id && email && certificationNumber ? setOpacity(1) : setOpacity(0.5);
    };

    const handleDisable = () => {
        name && id && email && certificationNumber ? setDisable(false) : setDisable(true);
    };

    const navigate = useNavigate();
    const goToList = () => {
        navigate('/resetpw');
    };

    return (
        <>
            <Header />
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
                    <input type='text' className="findpw-input-name" placeholder="Enter your name" onChange={(event) => {
                        setName(handleInput(event));
                        handleopacity();
                        handleDisable();
                    }} />
                    <h5 className="findpw-input-id-text">아이디를 입력해주세요.</h5>
                    <input type='text' className="findpw-input-id" placeholder="Enter your I'd" onChange={(event) => {
                        setId(handleInput(event));
                        handleopacity();
                        handleDisable();
                    }} />
                    <h5 className="findpw-input-email-text">이메일을 입력해주세요.</h5>
                    <input type='email' className="findpw-input-email" placeholder="Enter your e-mail" onChange={(event) => {
                        setEamil(handleInput(event));
                        handleopacity();
                        handleDisable();
                    }} />
                    <h5 className="findpw-input-cn-text">인증번호를 입력해주세요.</h5>
                    <input type='text' className="findpw-input-cn" placeholder="메일로 발송된 인증번호를 입력해주세요." onChange={(event) => {
                        setCertificationNumber(handleInput(event));
                        handleopacity();
                        handleDisable();
                    }} />
                    <div>
                        <button className="findpw-button" disable={disable} style={{ opacity: opacity }} onClick={() => {
                            // Ajax를 통한 서버 연동 후 새로운 패스워드 입력 페이지로 이동.
                            goToList();
                        }}>비밀번호 찾기</button>
                    </div>
                </div>
            </div>
        </>
    )
}

// 비밀번호 업데이트 컴포넌트
function ResetPw() {

    return (
        <>
            <Header />
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

// 회원가입 컴포넌트
function Register() {

    const [name, setName] = useState('');
    const [email, setEamil] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [disable, setDisable] = useState(true);
    const [opacity, setOpacity] = useState(0.5);
    const [errorColor, setErrorColor] = useState('#494949');

    // 이름 적합성 검사
    const isVaildName = name.length >= 2 && name.length < 5;

    // 이메일 적합성 검사
    const isVaildEmail = email.includes('@') && email.includes('.');

    // 비밀번호 특수문자 검사를 위한 정규식
    const specialLetter = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    // 비밀번호 적합성 검사
    // 특수문자 1개 이상, 전체길이가 8 이상
    const isVaildPassword = password.length >= 8 && specialLetter >= 1;

    // 비밀번호 일치 적합성 검사
    const isVaildPasswordConfirm = passwordConfirm === password;

    // 버튼 활성화 조건
    const isVaildInput = name.length >= 1 && email.length >= 1 && id.length >= 1 && password.length >= 1 && passwordConfirm.length >= 1;

    // 적합성 검사여부에 따른 input boder color 변경 함수
    const handleErrorColor = (isValid) => {
        if (!isValid) {
            setErrorColor('#ff0000');
        } else {
            setErrorColor('#494949');
        }
    }

    // button disable handler
    const handleOpacity = () => {
        isVaildName && isVaildEmail && isVaildPassword && isVaildPasswordConfirm && isVaildInput ? setOpacity(1) : setOpacity(0.5);
    };

    const handleDisable = () => {
        isVaildName && isVaildEmail && isVaildPassword && isVaildPasswordConfirm && isVaildInput ? setDisable(false) : setDisable(true);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <Header />
            <div className="user-bg">
                <div className="user-bg-rectangle">
                    <div className="user-bg-title">
                        <Link to="/">
                            <img src="/logos/title.png" width='60%' />
                        </Link>
                    </div>
                </div>
                <div className="register-rectangle">
                    <form onSubmit={handleSubmit}>
                        <img src="/logos/register-logo.png" width='20%' className="register-logo-img" />
                        <img src="/logos/sub_title.png" width='50%' className="register-title-img" />
                        <h5 className="register-input-name-text">이름을 입력해주세요.</h5>
                        <input type='text' className="register-input-name" placeholder="Enter your name" style={{ borderColor: errorColor }} value={name} onChange={(e) => {
                            setName(e.target.value);
                            handleDisable();
                            handleOpacity();
                            handleErrorColor(isVaildName);
                        }} />
                        <h5 className="register-input-mail-text">이메일을 입력해주세요.</h5>
                        <input type='email' className="register-input-mail" placeholder="Enter your e-mail" style={{ borderColor: errorColor }} value={email} onChange={(e) => {
                            setEamil(e.target.value);
                            handleDisable();
                            handleOpacity();
                            handleErrorColor(isVaildEmail);
                        }} />
                        <h5 className="register-input-id-text">사용하실 아이디를 입력해주세요.</h5>
                        <input type='text' className="register-input-id" placeholder="Enter your I'd" style={{ borderColor: errorColor }} value={id} onChange={(e) => {
                            setId(e.target.value);
                            handleDisable();
                            handleOpacity();
                        }} />
                        <h5 className="register-input-pw-text">사용하실 비밀번호를 입력해주세요.</h5>
                        <input type='password' className="register-input-pw" placeholder="Enter your password" style={{ borderColor: errorColor }} value={password} onChange={(e) => {
                            setPassword(e.target.value);
                            handleDisable();
                            handleOpacity();
                            handleErrorColor(isVaildPassword);
                        }} />
                        {!isVaildPassword && <p>8자이상이 아니거나 특수문자가 포함되지 않았아요.</p>}
                        <h5 className="register-input-re-pw-text">비밀번호를 한번 더 입력해주세요.</h5>
                        <input type='password' className="register-input-re-pw" placeholder="Enter re-password" style={{ borderColor: errorColor }} value={passwordConfirm} onChange={(e) => {
                            setPasswordConfirm(e.target.value);
                            handleDisable();
                            handleOpacity();
                            handleErrorColor(isVaildPasswordConfirm);
                        }} />
                        {!isVaildPasswordConfirm && <p>비밀번호가 달라요.</p>}
                        <div>
                            <button className="register-button" disable={disable} style={{ opacity: opacity }}>가입완료하기</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export { Login, Register, FindId, FindPw, ResetPw, ShowId };