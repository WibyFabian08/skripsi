const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const NormalisasiSchema = new Schema(
  {
    lowonganId: {
      type: ObjectId,
      ref: "LowonganProyek",
    },
    kontraktorId: {
      type: ObjectId,
      ref: "User",
    },
    normalisasi: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Normalisasi", NormalisasiSchema);
