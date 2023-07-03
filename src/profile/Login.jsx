import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './Login.css';
import { SERVER_URL } from '../Comunications';




function Login() {
  const { token, setToken } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Aquí se debe hacer la llamada al backend para iniciar sesión 
    axios.post(`${SERVER_URL}/login`, {
        username: username,
        password: password
      }).then((response) => {
        console.log('Login successful');
        setError(false);
        setMsg("Login exitoso!");
        // Recibimos el token y lo procesamos
        const access_token = response.data.access_token;
        localStorage.setItem('token', access_token);
        setToken(access_token);
        console.log("SetToken: ", token);
      }).catch((error) => {
        console.error('An error occurred while trying to login:', error);
        setError(true);// aquí puede haber más lógica para tratar los errores
      })

  };


  return (
    <div className="Login">
      {msg.length > 0 && <div className="successMsg"> {msg} </div>}

      {error && <div className="error">No se pudo iniciar sesión. Intenta nuevamente.</div>}
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Nombre de Usuario:
          <input 
            type="username" 
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña:
          <input 
            type="password" 
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <input type="submit" value="Iniciar Sesión" />
      </form>

      <button className="returnButton">
        <a href='/'>Volver al Inicio</a>
      </button>
    </div>
  );
}

export default Login;