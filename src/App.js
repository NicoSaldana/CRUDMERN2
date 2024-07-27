import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Crud from './pages/Crud/Crud'; // Importar el componente Crud

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/crud" element={<Crud />} /> {/* Ruta para el componente Crud */}
      </Routes>
    </Router>
  );
}

export default App;
