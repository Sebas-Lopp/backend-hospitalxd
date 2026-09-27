const express = require('express');
const cors = require('cors');
const MySQLPatientRepository = require('./infrastructure/repositories/MySQLPatientRepository');
const BcryptHasher = require('./infrastructure/adapters/BcryptHasher');
const PatientService = require('./application/PatientService');
const PatientController = require('./infrastructure/controllers/PatientController');

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
const repository = new MySQLPatientRepository(); 
const hasher = new BcryptHasher();
const service = new PatientService(repository, hasher);
const controller = new PatientController(service);

// 4. Rutas
app.post('/api/pacientes/register', (req, res) => controller.register(req, res));
app.post('/api/pacientes/login', (req, res) => controller.login(req, res));

// 5. Arranque del servidor
const PORT = 3001;
app.listen(PORT, () => console.log(`Microservicio de Pacientes corriendo en el puerto ${PORT} con MySQL`));