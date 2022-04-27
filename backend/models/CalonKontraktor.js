const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const CalonKontraktorSchema = new Schema(
  {
    lowonganId: {
      type: ObjectId,
      ref: "LowonganProyek",
    },
    kontraktorId: {
      type: ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Dalam Review",
    },
    isAssessment: {
      type: Boolean,
      default: false
    },
    lampiran: {
      type: Object,
      default: {},
    },
    fileTender: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CalonKontraktor", CalonKontraktorSchema);
