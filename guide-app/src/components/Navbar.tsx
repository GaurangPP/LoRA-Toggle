import React, {useEffect, useState} from "react";
import "./Navbar.css"
import { Link } from 'react-router-dom';
import { Button } from "./Button";

function Navbar(){

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className = "navbar">
                <div className = "navbar-container">
                    <Link to="/" className = "navbar-logo" onClick={closeMobileMenu}>
                        LoRA Toggle 
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click ? 'fa-solid fa-times' : 'fa-solid fa-bars'}></i>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to='/' className="nav-links" onClick={closeMobileMenu}>
                                Chat
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/learn' className="nav-links" onClick={closeMobileMenu}>
                                Learn
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/saved' className="nav-links" onClick={closeMobileMenu}>
                                Saved
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/login' className="nav-links-mobile" onClick={closeMobileMenu}>
                                Log In
                            </Link>
                        </li>
                    </ul>
                    {button && <Button buttonStyle="btn--outline" to='/login'>LOG IN</Button>}
                </div>
            </nav>
        </>
    )
}

export default Navbar