const pool = require('../config/database');
const Doctor = require('../../domain/Doctor');

class MySQLDoctorRepository {
  async save(doctor) {
    const query = 'INSERT INTO doctors (id, name, specialty, licenseNumber) VALUES (?, ?, ?, ?)';
    await pool.execute(query, [doctor.id, doctor.name, doctor.specialty, doctor.licenseNumber]);
    return doctor;
  }

  async findAll() {
    const query = 'SELECT * FROM doctors';
    const [rows] = await pool.execute(query);
    
    return rows.map(row => new Doctor({
      id: row.id,
      name: row.name,
      specialty: row.specialty,
      licenseNumber: row.licenseNumber
    }));
  }
}
module.exports = MySQLDoctorRepository;