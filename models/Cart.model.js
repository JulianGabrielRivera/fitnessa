const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
  cartItems: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  totalQty: Number,

  totalPrice: { type: Number, default: 0 },
});

const Cart = model('Cart', cartSchema);

module.exports = Cart;
