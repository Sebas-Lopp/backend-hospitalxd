// Simula la Base de Datos B aislada
class InMemoryDoctorRepository {
  constructor() {
    this.doctors = [];
  }
  async save(doctor) {
    this.doctors.push(doctor);
    return doctor;
  }
  async findAll() {
    return this.doctors;
  }
}
module.exports = InMemoryDoctorRepository;