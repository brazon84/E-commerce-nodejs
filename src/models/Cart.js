const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Cart = sequelize.define('cart', {
    /*userId
    productId*/
    quantily: {
        type: DataTypes.TEXT,
        allowNull: false
    },
});

module.exports = Cart;