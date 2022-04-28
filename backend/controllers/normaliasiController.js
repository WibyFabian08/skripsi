const Normalisasi = require("../models/Normalisasi");
const Kriteria = require("../models/Kriteria");
const Penilaiankontraktor = require("../models/PenilaianKontraktor");
const Rangking = require("../models/Rangking");
const LowonganProyek = require("../models/LowonganProyek");
const CalonKontraktor = require("../models/CalonKontraktor");

exports.getNormalisasi = async (req, res) => {
  try {
    const data = await Normalisasi.find({ lowonganId: req.params.id }).populate(
      { path: "kontraktorId", select: "fullname" }
    );

    return res.status(200).json({
      success: true,
      message: "get data normalisasi success",
      data: data,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.getRangking = async (req, res) => {
  try {
    const data = await Rangking.find({ lowonganId: req.params.id })
      .populate({
        path: "kontraktorId",
        select: "fullname",
      })
      .sort({ nilai: -1 });

    return res.status(200).json({
      success: true,
      message: "get data rangking success",
      data: data,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.createNormalisasi = async (req, res) => {
  try {
    const kriteria = await Kriteria.find();
    const penilaian = await Penilaiankontraktor.find({
      lowonganId: req.body.lowonganId,
    }).populate({ path: "kontraktorId", select: "fullname" });

    const variablePenampung = [];
    kriteria.forEach((data) => {
      let name = data.code;
      let buffer = {};
      buffer = {
        kriteria: name,
        data: [],
      };

      variablePenampung.push(buffer);
    });

    penilaian.forEach((data) => {
      for (let i = 0; i < variablePenampung.length; i++) {
        variablePenampung[i].data.push(
          data.penilaian[variablePenampung[i].kriteria]
        );
      }
    });

    let bobotBuffer = [];
    variablePenampung.forEach((data) => {
      bobotBuffer.push(data.data);
    });

    let maxMin = [];
    bobotBuffer.forEach((data, index) => {
      let buffer = 0;
      if (kriteria[index].isBenefit) {
        buffer = Math.max(...data);
      } else {
        buffer = Math.min(...data);
      }
      maxMin.push(buffer);
    });

    let normalisasi = [];
    penilaian.forEach((data) => {
      let bufferNormalisasi = {};
      for (let j = 0; j < maxMin.length; j++) {
        bufferNormalisasi.lowonganId = data.lowonganId;
        bufferNormalisasi.kontraktorId = data.kontraktorId._id;
        bufferNormalisasi[variablePenampung[j].kriteria] =
          data.penilaian[variablePenampung[j].kriteria] / maxMin[j];
      }

      normalisasi.push(bufferNormalisasi);
    });

    let penilaianAkhir = [];
    normalisasi.forEach((data) => {
      let buffer = {
        lowonganId: data.lowonganId,
        kontraktorId: data.kontraktorId,
        normalisasi: [],
      };
      for (let i = 0; i < kriteria.length; i++) {
        buffer.normalisasi.push(
          data[kriteria[i].code] * kriteria[i].persentaseBobot
        );
      }

      penilaianAkhir.push(buffer);
    });

    let perangkingan = [];
    for (let i = 0; i < penilaianAkhir.length; i++) {
      let data = {
        lowonganId: penilaianAkhir[i].lowonganId,
        kontraktorId: penilaianAkhir[i].kontraktorId,
        nilai: 0,
      };

      for (let j = 0; j < kriteria.length; j++) {
        data.nilai += penilaianAkhir[i].normalisasi[j];
      }

      perangkingan.push(data);
    }

    let dataNormalisasi = [];
    normalisasi.forEach((data) => {
      dataNormalisasi.push({
        lowonganId: data.lowonganId,
        kontraktorId: data.kontraktorId,
        normalisasi: data,
      });
    });

    await Normalisasi.insertMany(dataNormalisasi);
    await Rangking.insertMany(perangkingan);

    return res.status(200).json({
      success: true,
      message: "Penilaian Berhasil",
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.updateLowongan = async (req, res) => {
  try {
    const lowongan = await LowonganProyek.findOne({ _id: req.params.id });

    lowongan.isAvail = false;

    await lowongan.save();

    return res.status(200).json({
      success: true,
      message: "Projek telah selesai melakukan penilaian",
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.piliihKontraktor = async (req, res) => {
  try {
    const kontraktor = await CalonKontraktor.find({
      lowonganId: req.params.lowonganId,
    });
    const kontraktorId = req.body.kontraktorId;

    kontraktor.forEach((data) => {
      if (data.kontraktorId == kontraktorId) {
        data.status = "Terpilih";
      } else {
        data.status = "Tidak Terpilih";
      }
    });

    kontraktor.forEach(async (data) => {
      const find = await CalonKontraktor.findOne({
        kontraktorId: data.kontraktorId,
      });

      find.status = data.status;

      await find.save();
    });

    return res.status(200).json({
      success: true,
      message: "pilih kontraktor success",
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.getKontraktorTerpilih = async (req, res) => {
  try {
    const kontraktor = await CalonKontraktor.findOne({
      lowonganId: req.params.lowonganId,
      status: "Terpilih"
    });


    return res.status(200).json({
      success: true,
      message: "pilih kontraktor success",
      kontraktor
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};
