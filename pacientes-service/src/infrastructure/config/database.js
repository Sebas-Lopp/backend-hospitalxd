const mysql = require('mysql2/promise');

// Configuración directa de la conexión a MySQL para la base de datos de pacientes
const pool = mysql.createPool({
  host: 'localhost',
  user: 'adminSebas', // Tu usuario de MySQL Workbench
  password: 'megadethxd', // Coloca aquí tu contraseña real
  database: 'db_pacientes',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;