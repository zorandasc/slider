import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar">

            <div className="logo">LOGO</div>
            <ul className="links">

                <li className="link">Pocetna</li>
                <li className="link">O nama</li>
                <li className="link">Kontakt</li>

            </ul>
            <div className="hamburger">| | |</div>
        </div>
    );
};

export default Navbar;