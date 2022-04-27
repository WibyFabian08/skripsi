const CalonKontraktor = require("../models/CalonKontraktor");

exports.create = async (req, res) => {
  try {
    const data = new CalonKontraktor(req.body);

    if (req.file) {
      data.fileTender = req.file.filename;
    }
    data.lampiran = JSON.parse(data.lampiran);

    await data.save();

    return res.status(200).json({
      success: true,
      message: "berhasil join tender",
      data: data,
    });
  } catch (er) {
    return res.status(500).json({
      success: false,
      message: "something went wrong ont the server",
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await CalonKontraktor.find()
      .select("lowonganId kontraktorId status lampiran fileTender isAssessment")
      .populate({
        path: "lowonganId",
        select: "name",
      })
      .populate({
        path: "kontraktorId",
        select: "fullname email phone professiona address description",
      });

    if (data.length < 1) {
      return res.status(200).json({
        success: true,
        message: "data not found",
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "get data success",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong ont the server",
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await CalonKontraktor.find({ lowonganId: req.params.id })
      .select("lowonganId kontraktorId status lampiran fileTender isAssessment")
      .populate({
        path: "lowonganId",
        select: "name",
      })
      .populate({
        path: "kontraktorId",
        select: "fullname email phone profession address description",
      });

    if (data.length < 1) {
      return res.status(200).json({
        success: true,
        message: "data not found",
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "get data success",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong ont the server",
    });
  }
};

exports.getByKontraktorId = async (req, res) => {
  try {
    const data = await CalonKontraktor.find({
      kontraktorId: req.params.kontraktorId,
    })
      .select("lowonganId kontraktorId status lampiran fileTender isAssessment")
      .populate({
        path: "lowonganId",
        select: "name",
      })
      .populate({
        path: "kontraktorId",
        select: "fullname email phone professiona address description",
      });

    if (!data) {
      return res.status(200).json({
        success: true,
        message: "data not found",
        data: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: "get data success",
      data: data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong ont the server",
    });
  }
};

exports.updatePenilaian = async (req, res) => {
  try {
    const data = await CalonKontraktor.findOne({
      kontraktorId: req.params.kontraktorId,
      lowonganId: req.params.lowonganId,
    });

    if (data !== null) {
      let dataUpdate = req.body;

      data.lampiran = {
        ...dataUpdate,
      };
    }

    data.isAssessment = true;

    await data.save();

    return res.status(200).json({
      success: true,
      message: "update penilaian",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.stack,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await CalonKontraktor.deleteOne({ _id: req.params.id });

    return res.status(200).json({
      success: true,
      message: "delete success",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong ont the server",
    });
  }
};
