import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {slide as Menu} from 'react-burger-menu';
import axios from 'axios';
export default function Header( {darkMode} ) {
 const [userIsLoggedIn, setUserIsLoggedIn] = useState();
 
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
    setUserIsLoggedIn(false)
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
      textTransform: 'uppercase',
      display: 'flex',
      flexDirection: 'column',
    },
    bmItem: {
      display: 'inline-block',
      padding: '1em .5em',
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
      logout: <Link to="/" onClick={logOut}>Log Out</Link>,
      documents: <Link to="/documents">Saved Documents</Link>

    },
    false:{
      login: <Link to="/login">Log In</Link>,
      signup: <Link to="/singup">Sign Up</Link>
    } 
  }
  
  return (
    <>
      <Menu right styles={ menuStyles }>
        <Link to="/about">About</Link>
        <Link to="/convert">Convert</Link>
        {userIsLoggedIn ? authStatus.true.documents : authStatus.false.signup}
        {userIsLoggedIn ? authStatus.true.logout : authStatus.false.login}
        
      
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
    </>
  );
}
