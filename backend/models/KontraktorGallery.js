const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const KontraktorGallerySchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    mandorId: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("kontraktorGallery", KontraktorGallerySchema);
