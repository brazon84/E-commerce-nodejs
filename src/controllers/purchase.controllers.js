const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const ProductImg = require('../models/ProductImg');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll({
        include: [{
            model:Product,
            include:[ProductImg]
        }],
        where: {userId: req.user.id}
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const userId= req.user.id
    const result = await Cart.findAll({
        where:{userId},
        attributes: ['userId', 'productId', 'quantity'],
        raw: true
    });
    await Purchase.bulkCreate(result)
    await Cart.destroy({where:{userId}})
    return res.json(result);
});


module.exports = {
    getAll,
    create,
}