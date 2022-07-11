const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Product' },
  content: String,
});

const Reviews = model('Reviews', reviewSchema);

module.exports = Reviews;
