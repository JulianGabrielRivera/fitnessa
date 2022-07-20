const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  image: String,
  name: String,
  price: Number,
  rating: [],
  description: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Reviews' }],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  likedMe: { type: Number, default: 0 },
  isLiked: { type: Boolean, default: false },
});

const Product = model('Product', productSchema);

module.exports = Product;
