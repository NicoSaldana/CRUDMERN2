import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importar el archivo CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Estado para el mensaje
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('/api/users/login', { email, password });
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      localStorage.setItem('user', JSON.stringify(res.data));
      setMessage('Usuario logeado exitosamente');
      navigate('/crud'); // Redirigir a la página de CRUD
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE' });
      setMessage('Error al logear usuario');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {message && <p>{message}</p>} {/* Mostrar mensaje */}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
