const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Purchase = sequelize.define('purchase', {
    /*userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productId: {
        type: DataTypes.TEXT,
        allowNull: false
    },*/
    quantity: {
        type: DataTypes.TEXT,
        allowNull: false
    },
});

module.exports = Purchase;