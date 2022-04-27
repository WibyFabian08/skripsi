const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const FormSchema = new Schema(
  {
    kriteriaId: {
      type: ObjectId,
      ref: "Kriteria",
    },
    inputType: {
      type: String,
    },
    inputName: {
      type: String,
    },
    inputDetail: {
      type: Object,
    },
    isForAdmin: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FormInput", FormSchema);
