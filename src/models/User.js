const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");
const bcrypt = require("bcrypt");

const User = sequelize.define("user", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.beforeCreate(async (user) => {
  const hashPassword = await bcrypt.hash(user.password, 10);
  user.password = hashPassword;
});

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

module.exports = User;
