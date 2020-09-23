import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className='header'>
            <img src={logo} alt="ema-john"/>
            <nav>
                <Link className='link_item' to="/shop">Shop</Link>
                <Link className='link_item' to="/review">Order review</Link>
                <Link className='link_item' to="/inventory">Manage Inventory</Link>
                {
                    (loggedInUser.displayName || loggedInUser.name) && <span className='link_item'>Welcome <strong>{loggedInUser.displayName || loggedInUser.name}</strong></span>
                }
                <Link className='link_item' onClick={() => setLoggedInUser({})}>Sign Out </Link>
            </nav>
        </div>
    );
};

export default Header;