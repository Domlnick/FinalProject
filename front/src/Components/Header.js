import { Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

function Header() {

    return (
        <Nav className="navbar navbar-expand-sm bg-black navbar-dark" >
            <div className="container-fluid">
                <Link className="navbar-brand" style={{fontSize: "1.5em"}}  to="/">LYKYL Shop</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/main">main</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/searching">Searching</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/result">Result</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/findid">Find Id</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/findpw">Find Pw</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/resetpw">resetpw</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/showid">showid</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/test">test</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Nav>
    );
}

export { Header };