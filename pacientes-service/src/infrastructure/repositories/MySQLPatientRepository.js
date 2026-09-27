const pool = require('../config/database');
const Patient = require('../../domain/Patient');

class MySQLPatientRepository {
  async save(patient) {
    const query = 'INSERT INTO patients (id, name, email, password) VALUES (?, ?, ?, ?)';
    await pool.execute(query, [patient.id, patient.name, patient.email, patient.password]);
    return patient;
  }

  async findByEmail(email) {
    const query = 'SELECT * FROM patients WHERE email = ?';
    const [rows] = await pool.execute(query, [email]);
    
    if (rows.length === 0) return null;
    
    // Retornamos una instancia de la entidad de Dominio
    return new Patient({
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
      password: rows[0].password
    });
  }
}
module.exports = MySQLPatientRepository;