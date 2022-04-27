const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const PenilaianKontraktorSchema = new Schema(
  {
    kontraktorId: {
      type: ObjectId,
      ref: "User",
    },
    lowonganId: {
      type: ObjectId,
      ref: "LowonganProyek",
    },
    penilaian: {
      type: Object,
      default: {}
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PenilaianKontraktor", PenilaianKontraktorSchema);
