const User = require("../models/User");
const KontraktorGallery = require("../models/KontraktorGallery");

exports.getLandingPageData = async (req, res) => {
  try {
    const totalClients = await User.find({ role: 2 }).countDocuments();
    const totalMandor = await User.find({ role: 3 }).countDocuments();
    const totalPortofolio = await KontraktorGallery.find().countDocuments();

    const images = await KontraktorGallery.aggregate([{ $sample: { size: 6 } }]);

    await KontraktorGallery.populate(images, {
      path: "mandorId",
      select: "image fullname",
    });

    return res.status(200).json({
      success: true,
      message: "get data success",
      totalClients,
      totalMandor,
      totalPortofolio,
      images,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.stack,
    });
  }
};
