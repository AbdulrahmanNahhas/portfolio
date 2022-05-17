import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navbar.css';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { RiMenuLine } from 'react-icons/ri';
import { GrClose } from 'react-icons/gr';

import { setTheme } from '../../utils/Themes/theme.js';

const Navbar = () => {

  const [togClass, setTogClass] = useState('dark');
  let theme = localStorage.getItem('theme');
  const handleOnClick = () => {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
        setTogClass('light')
    } else {
        setTheme('theme-dark');
        setTogClass('dark')
    }
  }
  useEffect(() => {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTogClass('dark')
    } else if (localStorage.getItem('theme') === 'theme-light') {
      setTogClass('light')
    }
  }, [theme])

  const toggleNavbar = () => {
    document.querySelector('.navbar').classList.toggle('active')
  }

  return (
    <nav className='navbar'>
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          Abdulrahman.
        </Link>
      </div>
      {/* ======= links ======= */}
      <div className="links">
        <NavLink activeClassName="active" className="link" to="/">Home</NavLink>
        <NavLink activeClassName="active" className="link" to="/About">About</NavLink>
        <NavLink activeClassName="active" className="link" to="/Services">Services</NavLink>
        <NavLink activeClassName="active" className="link" to="/Projects">Projects</NavLink>
        <NavLink activeClassName="active" className="link" to="/Contact">Contact</NavLink>

        {/* ======= themes ========= */}
        {
          togClass === "light" ?
          <button id="toggle" className="toggle-theme" onClick={handleOnClick} ><MdLightMode/></button>
          :
          <button id="toggle" className="toggle-theme" onClick={handleOnClick} ><MdDarkMode /></button>
        }

        {/* ==== when navbar is active on mobile */}
        <div className="CloseNavbar" onClick={toggleNavbar}>
          <GrClose/>
        </div>
      </div>
      {/* toggle */}
      <button className="toggleNavbar" onClick={toggleNavbar}><RiMenuLine/></button>
    </nav>
  )
}

export default Navbar