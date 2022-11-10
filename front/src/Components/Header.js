import { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { isLogined, logout, getLoginUserName } from '../Routes/User/Login';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function Header() {

    let login = isLogined();
    let userName = getLoginUserName();

    return (
        <Nav className="navbar navbar-expand-sm bg-black navbar-dark" >
            <div className="container-fluid">
                <Link className="navbar-brand" style={{ fontSize: "1.5em" }} to="/">LYKYL Shop</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {login ?
                    <>
                        <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                            <ul className="navbar-nav">
                                <Dropdown userName={userName} />
                                <div style={{ color: "white", marginTop: "6.6px" }}>/</div>
                                <li className="nav-item">
                                    <Link className="nav-link" style={{ color: "white" }} onClick={() => { logout(); alert('로그아웃 되었습니다.'); }} to="/">로그아웃</Link>
                                </li>
                            </ul>
                        </div>
                    </>
                    :
                    <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" style={{color:"white", fontSize:"1.2em"}} to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={{color:"white", fontSize:"1.2em"}} to="/register">Register</Link>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </Nav>
    );
}

function Dropdown(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const navigate = useNavigate();
    const goToResetPw = () => {
        navigate('/loginResetpw');
    };

    return (
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle className='nav-link' style={{ backgroundColor: "black", border: "none", color: "white" }}>내정보</DropdownToggle>
            <DropdownMenu style={{ width: "200px" }}>
                <DropdownItem header>{props.userName}님 안녕하세요.🎉</DropdownItem>
                <DropdownItem onClick={() => { goToResetPw(); }}>비밀번호 변경하기</DropdownItem>
            </DropdownMenu>
        </ButtonDropdown>
    )
}

export { Header, Dropdown };