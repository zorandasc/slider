import React from 'react';
import styled from 'styled-components';
import { Link } from "gatsby"

const Navbar = () => {
    return (
        <Wraper>
            <div className="logo">LOGO</div>
            <ul className="links">
                <li className="link"><Link to="/">Pocetna</Link></li>
                <li className="link">O nama</li>
                <li className="link">Kontakt</li>
                <li className="link"><Link to="/test">Testonja</Link></li>
            </ul>
            <div className="hamburger">| | |</div>
        </Wraper>
    );
};

const Wraper = styled.div`
 
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 3rem;
    background-color: transparent;
    border-bottom: 1px solid rgba(250,250,250,0.5);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 1rem;
    padding-right: 1rem;
.logo{
    letter-spacing: 3px;
    font-size: 2rem;
}

.links{
    display: flex;
    flex-direction: row;
    list-style: none;
    align-items: center;
}

.link{
    padding-left: 2rem;
    letter-spacing: 2px;
    font-size: 0.6rem;
    text-transform: uppercase;
}
`


export default Navbar;