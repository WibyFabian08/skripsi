const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
    },
    email: {
      type: String,
    },
    username: {
      type: String,
    },
    phone: {
      type: String,
    },
    profession: {
      type: String,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: Number,
      default: 3
    },
    image: {
      type: String,
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
