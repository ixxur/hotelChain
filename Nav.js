import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Nav() {

  const navStyle = {
    color: 'white'
    
  };

  return (
    <nav>
      <h3>IXUR</h3>
      <ul className="nav-links">
        <Link style={navStyle} to='/'>
          <li>Home</li>
        </Link>
        <Link style={navStyle} to='/hotel'>
          <li>Hotel</li>
        </Link>
        <Link style={navStyle} to='/client'> 
          <li>Client</li>
        </Link>
        <Link style={navStyle} to='/angajat'>
          <li>Angajat</li>
        </Link>
        <Link style={navStyle} to='/camera'>
          <li>Camera</li>
        </Link>
        <Link style={navStyle} to='/tip_camera'>
          <li>Tip_camera</li>
        </Link>
        <Link style={navStyle} to='/rezervare'>
          <li>Rezervare</li>
        </Link>
        <Link style={navStyle} to='/regim_cazare'>
          <li>Regim_cazare</li>
        </Link>
        <Link style={navStyle} to='/plata'>
          <li>Plata</li>          
        </Link>
        <Link style={navStyle} to='/subc'>
          <li>Subc</li>          
        </Link>
        <Link style={navStyle} to='/subd'>
          <li>Subd</li>          
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
