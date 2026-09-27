class PatientController {
  constructor(patientService) {
    this.patientService = patientService;
  }

  async register(req, res) {
    try {
      const patient = await this.patientService.registerPatient(req.body);
      res.status(201).json({ message: 'Paciente registrado', data: { email: patient.email } });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const patientData = await this.patientService.login(email, password);
      res.status(200).json({ message: 'Login exitoso', data: patientData });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}
module.exports = PatientController;