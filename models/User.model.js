const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: String,
    time: String,
    image: String,
    weight: { type: Number, default: 0 },
    //  user can store other user ids
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likedMe: { type: Number, default: 0 },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email is required'],
      // this match will disqualify all the emails with accidental empty spaces, missing dots in front of (.)com and the ones with no domain at all
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
    },
    // comments that im placing in other ppls profiles
    myComments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    //  comments that people have said about my profile
    userComments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    status: {
      type: String,
      enum: ['Pending Confirmation', 'Active'],
      default: 'Pending Confirmation',
    },
    confirmationCode: String,
    role: {
      type: String,
      enum: ['GUEST', 'ADMIN'],
      default: 'GUEST',
    },
    userCart: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },

  {
    timestamps: true,
  }
);

module.exports = model('User', userSchema);
