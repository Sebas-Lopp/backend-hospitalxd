const Doctor = require('../domain/Doctor');

class DoctorService {
  constructor(doctorRepository) {
    this.doctorRepository = doctorRepository;
  }

  async registerDoctor(data) {
    const doctor = new Doctor({
      id: Date.now().toString(),
      name: data.name,
      specialty: data.specialty,
      licenseNumber: data.licenseNumber
    });
    return await this.doctorRepository.save(doctor);
  }

  async getAllDoctors() {
    return await this.doctorRepository.findAll();
  }
}
module.exports = DoctorService;