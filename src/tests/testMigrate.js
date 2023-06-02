const User= require('../models/User')
const sequelize = require("../utils/connection");
require("../models/Category");

const main = async () => {
  try {
    await sequelize.sync({ force: true });
    await User.create({
      firstName: "jose",
      lastName: "brazon",
      email: "brazon@gmail.com",
      password: "jose12345",
      phone: "1234567890",
    });
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

main();
