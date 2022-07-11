const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  image: String,
  name: String,
  price: Number,
  rating: {
    type: Number,
    default: 0,
  },
  description: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Reviews' }],
});

const Product = model('Product', productSchema);

module.exports = Product;
