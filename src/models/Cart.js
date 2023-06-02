const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Cart = sequelize.define('cart', {
    /*userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productId: {
        type: DataTypes.TEXT,
        allowNull: false
    },*/
    quantily: {
        type: DataTypes.TEXT,
        allowNull: false
    },
});

module.exports = Cart;