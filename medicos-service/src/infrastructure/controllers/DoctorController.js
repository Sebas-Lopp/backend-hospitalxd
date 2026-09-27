class DoctorController {
  constructor(doctorService) {
    this.doctorService = doctorService;
  }

  async register(req, res) {
    try {
      const doctor = await this.doctorService.registerDoctor(req.body);
      res.status(201).json({ message: 'Médico registrado', data: doctor });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const doctors = await this.doctorService.getAllDoctors();
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = DoctorController;