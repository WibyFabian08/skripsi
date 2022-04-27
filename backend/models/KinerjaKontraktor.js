const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const KinerjaKontraktorSchema = new Schema(
  {
    mandorId: {
      type: ObjectId,
      red: "User",
    },
    bidangKeahlian: {
      type: String,
    },
    pengalaman: {
      type: Number,
    },
    jumlahProject: {
      type: Number,
    },
    jumlahTukang: {
      type: Number,
    },
    sertifikat: {
      type: Boolean,
    },
    tools: {
      type: Boolean,
    },
    bacaGambar: {
      type: Number,
    },
    legalitasPerusahaan: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("KinerjaKontraktor", KinerjaKontraktorSchema);
