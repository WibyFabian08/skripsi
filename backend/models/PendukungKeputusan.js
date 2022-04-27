const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const PendukungKeputusanSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    mandorName: {
      type: String,
    },
    nilai: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PendukungKeputusan", PendukungKeputusanSchema);
