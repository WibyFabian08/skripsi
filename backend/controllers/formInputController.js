const FormInput = require("../models/FormInput");

exports.getAll = async (req, res) => {
  try {
    const data = await FormInput.find();

    return res.status(200).json({
      success: true,
      message: "get data success",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.getByKriteriaId = async (req, res) => {
  try {
    const data = await FormInput.findOne({ kriteriaId: req.params.id });

    return res.status(200).json({
      success: true,
      message: "get data success",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};
