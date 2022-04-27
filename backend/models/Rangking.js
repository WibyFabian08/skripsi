const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const RangkingSchema = new Schema(
  {
    lowonganId: {
      type: ObjectId,
      ref: "LowonganProyek",
    },
    kontraktorId: {
      type: ObjectId,
      ref: "User",
    },
    nilai: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rangking", RangkingSchema);
