import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className='header'>
            <img className='emaJohn_logo' src={logo} alt="ema-john"/>
            <nav>
                <Link className='link_item' to="/shop">Shop</Link>
                <Link className='link_item' to="/review">Order review</Link>
                <Link className='link_item' to="/inventory">Manage Inventory</Link>
                
                {
                    (loggedInUser.displayName || loggedInUser.name) && <span className='link_item'>Welcome <strong>{loggedInUser.displayName || loggedInUser.name}</strong></span>
                }
                {
                    loggedInUser.isSignIn && <img className='user_img' src={loggedInUser.photoURL} alt=""/>
                }
                 { 
                    loggedInUser.isSignIn ?  
                        <Link className='link_item' onClick={() => setLoggedInUser({})} to='/'>Log Out</Link>:
                        <Link className='link_item' to='/login'>Log In</Link>
                }
                
            </nav>
        </div>
    );
};

export default Header;