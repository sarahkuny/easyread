import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {slide as Menu} from 'react-burger-menu';
import axios from 'axios';
import SuccessModal from "./SuccessModal";

export default function Header( {darkMode} ) {
 const [userIsLoggedIn, setUserIsLoggedIn] = useState();
 const [success, setSuccess] = useState(false);
  useEffect(() => {
    checkAuthStatus();
  }, [])

  const checkAuthStatus = async () => {
    try {
      let token = localStorage.getItem("token");
      await axios('/api/media',{
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      setUserIsLoggedIn(true);
    } catch (err) {
     setUserIsLoggedIn(false);
    }
  }

  const logOut = () => {
    localStorage.removeItem("token");
    setUserIsLoggedIn(false);
    setSuccess(true);
  }

  const menuStyles = {
    bmBurgerButton: {
      position: 'absolute',
      width: '36px',
      height: '30px',
      right: '36px',
      top: '33px'
    },
    bmBurgerBars: {
      background: (darkMode ? 'white' : 'black')
    },
    bmBurgerBarsHover: {
      background: '#93c5fd'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: 'black'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: 'white',
      padding: '1.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: 'black',
      display: 'flex',
      flexDirection: 'column',
    },
    bmItem: {
      display: 'inline-block',
      padding: '1em .5em',
      textTransform: 'uppercase'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }

  const headerStyles = {
    light: {
      backgroundColor: 'white',
      color: '#18181b',
    },
    dark: {
      backgroundColor: '#18181b',
      color: "white",
    }
  }

  const authStatus = {
    true: {
      logout: <li onClick={logOut} className="hover:text-blue-400">Log Out</li>,
      documents: <Link to="/documents" className="hover:text-blue-400">Saved Documents</Link>

    },
    false:{
      login: <Link to="/login" className="hover:text-blue-400 font-bold">Log In</Link>,
      signup: <Link to="/signup" className="hover:text-blue-400">Sign Up</Link>
    } 
  }
  
  return (
    <div className="sticky top-0 z-50">
      <Menu right styles={ menuStyles }>
        <Link to="/about" className="hover:text-blue-400">About</Link>
        <Link to="/convert" className="hover:text-blue-400">Convert</Link>
        {userIsLoggedIn ? authStatus.true.documents : authStatus.false.signup}
        {userIsLoggedIn ? authStatus.true.logout : authStatus.false.login}
        {success ? <SuccessModal closeMessage={() => setSuccess(false)}
            title="Success!"
            message="You have been logged out." 
            className="static normal-case"/> : null}
        
      
      </Menu>
      <div className="flex justify-between items-center bg-white h-24"
           style={(darkMode ? headerStyles.dark : headerStyles.light  )}
      >
        <Link to="/">
          <h1 className="text-5xl ml-3 font-louisgeorge">
            easy<b>Read</b>
          </h1>
        </Link>
      </div>
    </div>
  );
}
