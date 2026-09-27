const Patient = require('../domain/Patient');

class PatientService {
  // Inyección de dependencias (Puertos)
  constructor(patientRepository, passwordHasher) {
    this.patientRepository = patientRepository;
    this.passwordHasher = passwordHasher;
  }

  async registerPatient(patientData) {
    const existingPatient = await this.patientRepository.findByEmail(patientData.email);
    if (existingPatient) throw new Error('El correo ya está registrado');

    const hashedPassword = await this.passwordHasher.hash(patientData.password);
    const newPatient = new Patient({
      id: Date.now().toString(),
      name: patientData.name,
      email: patientData.email,
      password: hashedPassword
    });

    return await this.patientRepository.save(newPatient);
  }

  async login(email, password) {
    const patient = await this.patientRepository.findByEmail(email);
    if (!patient) throw new Error('Credenciales inválidas');

    const isValid = await this.passwordHasher.compare(password, patient.password);
    if (!isValid) throw new Error('Credenciales inválidas');

    return { id: patient.id, name: patient.name, email: patient.email };
  }
}
module.exports = PatientService;