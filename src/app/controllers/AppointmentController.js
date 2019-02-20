const { User, Appointment } = require("../models");
const { Op } = require("sequelize");
const { moment } = require("moment");

class AppointmentController {
  async create(req, res) {
    const provider = await User.findByPk(req.params.provider);

    return res.render("appointments/create", { provider });
  }

  async store(req, res) {
    const { id } = req.session.user;
    const { provider } = req.params;
    const { date } = req.body;

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date
    });

    return res.redirect("/app/dashboard");
  }

  async show(req, res) {
    const { provider } = req.params;

    const appointments = await Appointment.findAll({
      where: {
        provider_id: provider
      }
    });

    const users = await User.findAll({
      attributes: ["id", "name"]
    });
    console.log(users);
    return res.render("appointments/show", { appointments, users });
  }
}

module.exports = new AppointmentController();
