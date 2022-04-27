const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KriteriaSchema = new Schema(
  {
    kriteria: {
      type: String,
    },
    bobot: {
      type: Number,
    },
    persentaseBobot: {
      type: Number,
    },
    isBenefit: {
      type: Boolean,
      default: true,
    },
    code: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Kriteria", KriteriaSchema);
