import React from "react";
import { Link } from "react-router-dom";
import {slide as Menu} from 'react-burger-menu';

export default function Header( {darkMode} ) {
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
  
  return (
    <>
      <Menu right styles={ menuStyles }>
        <Link to="/about">About</Link>
        <Link to="/convert">Convert</Link>
        <Link to="/documents">Saved Documents</Link>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
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
