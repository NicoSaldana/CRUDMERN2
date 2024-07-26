const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes'); // Importar las rutas de tareas

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

connectDB();

const app = express();

app.use(cors()); // Usar CORS
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes); // Usar las rutas de tareas

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
