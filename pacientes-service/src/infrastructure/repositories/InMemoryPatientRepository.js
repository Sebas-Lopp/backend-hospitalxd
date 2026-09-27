// Simula la Base de Datos A aislada
class InMemoryPatientRepository {
  constructor() {
    this.patients = [];
  }
  async save(patient) {
    this.patients.push(patient);
    return patient;
  }
  async findByEmail(email) {
    return this.patients.find(p => p.email === email) || null;
  }
}
module.exports = InMemoryPatientRepository;