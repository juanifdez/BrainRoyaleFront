import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
// import { AuthProvider } from "../auth/AuthProvider";
import LogoutButton from '../profile/Logout';

import { useState, useEffect } from "react";

import './Navbar.css';



export default function NavbarLanding() {
    const { token } = useContext(AuthContext);

    console.log(token);
    return(
    <div className="block-nav">
        <div className="nav">
        <nav className="nav-general">
            <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="/app">Principal</a></li>
                <li><a href="/rulespage">Instrucciones</a></li>
                <li><a href="/teampage">Equipo</a></li>
            </ul>

            <ul id='users'>
            {token ? ( 
              <LogoutButton/>

          ) : 
          (       
            <>
            <li>
              <button>
                <a href="/login">Iniciar sesión</a>
              </button>
            </li>
            <li>
              <button>
                <a href="/signup">Crear cuenta</a>
              </button>
            </li>
            </> 
          )}
            </ul>
            
        </nav>
        </div>
    </div>


        );
}