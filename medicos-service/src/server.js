const express = require('express');
const cors = require('cors');
const MySQLDoctorRepository = require('./infrastructure/repositories/MySQLDoctorRepository');
const DoctorService = require('./application/DoctorService');
const DoctorController = require('./infrastructure/controllers/DoctorController');

const app = express();

// 1. Configuración explícita de CORS para permitir el frontend de Vite
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// 2. Parseo de JSON
app.use(express.json());

// 3. Ensamblaje: Inyectamos MySQL en lugar de InMemory
const repository = new MySQLDoctorRepository(); 
const service = new DoctorService(repository);
const controller = new DoctorController(service);

// 4. Rutas
app.post('/api/medicos', (req, res) => controller.register(req, res));
app.get('/api/medicos', (req, res) => controller.getAll(req, res));

// 5. Arranque del servidor
const PORT = 3002;
app.listen(PORT, () => console.log(`Microservicio de Médicos corriendo en el puerto ${PORT} con MySQL`));