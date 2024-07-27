import { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Importar el archivo CSS


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');  // Estado para el mensaje de éxito

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/register', { name, email, password });
      setMessage('Usuario registrado exitosamente');  // Establecer mensaje de éxito
      console.log(res.data);
    } catch (err) {
      setMessage('Error al registrar usuario');  // Establecer mensaje de error
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {message && <p>{message}</p>}  {/* Mostrar mensaje de éxito o error */}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
