import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "../../Components/Header";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 1025 })
    return isDesktop ? children : null
};

// 아무거나

const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 706, maxWidth: 1024 })
    return isTablet ? children : null
};

const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 705 })
    return isMobile ? children : null
};

// 로그인 컴포넌트
function Login() {

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [disable, setDisable] = useState(true);
    const [opacity, setOpacity] = useState(0.5);

    const navigate = useNavigate();
    const goToList = () => {
        navigate('/');
    };

    useEffect(() => {
        handleDisable();
    });

    const handleInput = event => {
        return event.target.value;
    };

    const handleDisable = () => {
        userId && password ? setOpacity(1) : setOpacity(0.5);
        userId && password ? setDisable(false) : setDisable(true);
    };

    return (
        <>
            <Desktop>
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
                        <input type='text' className="login-input-id" placeholder="Enter i'd" value={userId} onChange={(event) => {
                            setUserId(handleInput(event));
                            handleDisable();
                        }} />
                        <div className="login-find-id">
                            <Link to='/findid'>아이디를 잊어버렸어요.</Link>
                        </div>
                        <input type='password' className="login-input-pw" placeholder="Enter password" value={password} onChange={(event) => {
                            setPassword(handleInput(event));
                            handleDisable();
                        }} />
                        <div className="login-find-pw">
                            <Link to='/FindPw'>비밀번호를 잊어버렸어요.</Link>
                        </div>
                        <div>
                            <button type="submit" className="login-button" disabled={disable} style={{ opacity: opacity }} onClick={() => {
                                // 요청상태를 state로 관리하도록 구현해야함.
                                axios.post("http://localhost:8080/login", {
                                    userId: userId,
                                    password: password
                                }).then(function (respons) {
                                    // 엑세스토큰 및 리프레쉬토큰 2개 쿠키에 담아서 줄거임
                                    // 단 우리가 요청할때는 헤더값에 넣어줘야함
                                    // 리프레쉬토큰도 DB에 저장해놔야함.
                                    console.log(respons);
                                    console.log(respons.data.result);
                                    if (respons.data.result == 'false') {
                                        alert(respons.data.message);
                                    } else {
                                        goToList();
                                    }
                                }).catch(function (error) {
                                    console.error(error);
                                    console.log('에러가 발생되었습니다.')
                                })
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
            </Desktop>
            <Tablet>
                <Header />
                <div className="user-bg">
                    <div className="user-bg-rectangle-tablet">
                        <div className="user-bg-title-tablet">
                            <Link to="/">
                                <img src="/logos/title.png" width='60%' />
                            </Link>
                        </div>
                    </div>
                    <div className="login-rectangle-tablet">
                        <img src="/logos/login_logo.png" width='20%' className="login-logo-img" />
                        <img src="/logos/sub_title.png" width='50%' className="login-title-img" />
                        <input type='text' className="login-input-id" placeholder="Enter i'd" value={userId} onChange={(event) => {
                            setUserId(handleInput(event));
                            handleDisable();
                        }} />
                        <div className="login-find-id">
                            <Link to='/findid'>아이디를 잊어버렸어요.</Link>
                        </div>
                        <input type='password' className="login-input-pw" placeholder="Enter password" value={password} onChange={(event) => {
                            setPassword(handleInput(event));
                            handleDisable();
                        }} />
                        <div className="login-find-pw">
                            <Link to='/FindPw'>비밀번호를 잊어버렸어요.</Link>
                        </div>
                        <div>
                            <button type="submit" className="login-button" disabled={disable} style={{ opacity: opacity }} onClick={() => {
                                // 요청상태를 state로 관리하도록 구현해야함.
                                axios.post("http://localhost:8080/login", {
                                    userId: userId,
                                    password: password
                                }).then(function (respons) {
                                    // 엑세스토큰 및 리프레쉬토큰 2개 쿠키에 담아서 줄거임
                                    // 단 우리가 요청할때는 헤더값에 넣어줘야함
                                    // 리프레쉬토큰도 DB에 저장해놔야함.
                                    console.log(respons);
                                    console.log(respons.data.result);
                                    if (respons.data.result == 'false') {
                                        alert(respons.data.message);
                                    } else {
                                        goToList();
                                    }
                                }).catch(function (error) {
                                    console.error(error);
                                    console.log('에러가 발생되었습니다.')
                                })
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
            </Tablet>
            <Mobile>
                <Header />
                <div className="user-bg-mobile">
                    <div className="login-rectangle-mobile">
                        <img src="/logos/login_logo.png" width='20%' className="login-logo-img" />
                        <img src="/logos/sub_title.png" width='50%' className="login-title-img" />
                        <input type='text' className="login-input-id" placeholder="Enter i'd" value={userId} onChange={(event) => {
                            setUserId(handleInput(event));
                            handleDisable();
                        }} />
                        <div className="login-find-id">
                            <Link to='/findid'>아이디를 잊어버렸어요.</Link>
                        </div>
                        <input type='password' className="login-input-pw" placeholder="Enter password" value={password} onChange={(event) => {
                            setPassword(handleInput(event));
                            handleDisable();
                        }} />
                        <div className="login-find-pw">
                            <Link to='/FindPw'>비밀번호를 잊어버렸어요.</Link>
                        </div>
                        <div>
                            <button type="submit" className="login-button" disabled={disable} style={{ opacity: opacity }} onClick={() => {
                                // 요청상태를 state로 관리하도록 구현해야함.
                                axios.post("http://localhost:8080/login", {
                                    userId: userId,
                                    password: password
                                }).then(function (respons) {
                                    // 엑세스토큰 및 리프레쉬토큰 2개 쿠키에 담아서 줄거임
                                    // 단 우리가 요청할때는 헤더값에 넣어줘야함
                                    // 리프레쉬토큰도 DB에 저장해놔야함.
                                    console.log(respons);
                                    console.log(respons.data.result);
                                    if (respons.data.result == 'false') {
                                        alert(respons.data.message);
                                    } else {
                                        goToList();
                                    }
                                }).catch(function (error) {
                                    console.error(error);
                                    console.log('에러가 발생되었습니다.')
                                })
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
            </Mobile>
        </>
    )
};

export default Login;