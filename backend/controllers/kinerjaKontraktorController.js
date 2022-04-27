const KinerjaKontraktor = require("../models/KinerjaKontraktor");
const PenilaianKontraktor = require("../models/PenilaianKontraktor");

exports.getById = async (req, res) => {
  try {
    const kinerjaKontraktor = await KinerjaKontraktor.findOne({
      mandorId: req.params.id,
    });

    if (!kinerjaKontraktor) {
      return res.status(404).json({
        success: true,
        message: "data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "get kinerja success",
      data: kinerjaKontraktor,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.get = async (req, res) => {
  try {
    const kinerjaKontraktor = await KinerjaKontraktor.findOne({
      mandorId: req.user._id,
    });

    if (!kinerjaKontraktor) {
      return res.status(404).json({
        success: true,
        message: "data not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "get kinerja success",
      data: kinerjaKontraktor,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.create = async (req, res) => {
  try {
    const kinerjaKontraktor = new KinerjaKontraktor({
      mandorId: req.user._id,
      hargaPerMeter: req.body.hargaPerMeter,
      pengalaman: req.body.pengalaman,
      jumlahProject: req.body.jumlahProject,
      jumlahTukang: req.body.jumlahTukang,
      sertifikat: req.body.sertifikat,
      tools: req.body.tools,
      bacaGambar: req.body.bacaGambar,
      legalitasPerusahaan: req.body.legalitasPerusahaan,
    });

    await kinerjaKontraktor.save();

    // let hargaPerMeter,
    //   pengalaman,
    //   jumlahProject,
    //   jumlahPekerja,
    //   sertifikat,
    //   tools,
    //   bacaGambar;

    // if (KinerjaKontraktor.hargaPerMeter <= 80000) {
    //   hargaPerMeter = 1;
    // } else if (
    //   KinerjaKontraktor.hargaPerMeter >= 80000 &&
    //   KinerjaKontraktor.hargaPerMeter <= 150000
    // ) {
    //   hargaPerMeter = 3;
    // } else if (KinerjaKontraktor.hargaPerMeter >= 150000) {
    //   hargaPerMeter = 5;
    // }

    // if (KinerjaKontraktor.pengalaman <= 3) {
    //   pengalaman = 1;
    // } else if (KinerjaKontraktor.pengalaman >= 3 && KinerjaKontraktor.pengalaman <= 6) {
    //   pengalaman = 3;
    // } else if (KinerjaKontraktor.pengalaman >= 6) {
    //   pengalaman = 5;
    // }

    // if (KinerjaKontraktor.jumlahProject <= 5) {
    //   jumlahProject = 1;
    // } else if (
    //   KinerjaKontraktor.jumlahProject >= 5 &&
    //   KinerjaKontraktor.jumlahProject <= 10
    // ) {
    //   jumlahProject = 3;
    // } else if (KinerjaKontraktor.jumlahProject >= 10) {
    //   jumlahProject = 5;
    // }

    // if (KinerjaKontraktor.jumlahTukang <= 5) {
    //   jumlahPekerja = 1;
    // } else if (
    //   KinerjaKontraktor.jumlahTukang >= 5 &&
    //   KinerjaKontraktor.jumlahTukang <= 10
    // ) {
    //   jumlahPekerja = 3;
    // } else if (KinerjaKontraktor.jumlahTukang >= 10) {
    //   jumlahPekerja = 5;
    // }

    // if (KinerjaKontraktor.sertifikat == false) {
    //   sertifikat = 1;
    // } else {
    //   sertifikat = 5;
    // }

    // if (KinerjaKontraktor.tools == false) {
    //   tools = 1;
    // } else {
    //   tools = 5;
    // }

    // if (KinerjaKontraktor.bacaGambar === 1) {
    //   bacaGambar = 1;
    // } else if (KinerjaKontraktor.bacaGambar === 3) {
    //   bacaGambar = 3;
    // } else if (KinerjaKontraktor.bacaGambar === 5) {
    //   bacaGambar = 5;
    // }

    // const penilaian = new PenilaianMandor({
    //   mandorId: req.user._id,
    //   hargaPerMeter: hargaPerMeter,
    //   pengalaman: pengalaman,
    //   jumlahProject: jumlahProject,
    //   jumlahPekerja: jumlahPekerja,
    //   sertifikat: sertifikat,
    //   tools: tools,
    //   bacaGambar: bacaGambar,
    // });

    // await penilaian.save();

    return res.status(200).json({
      success: true,
      message: "create kinerja success",
      data: kinerjaKontraktor,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const kinerjaKontraktor = await KinerjaKontraktor.findOne({
      mandorId: req.user._id,
    });

    const penilaianMandor = await PenilaianKontraktor.findOne({
      mandorId: req.user._id,
    });

    if (!KinerjaKontraktor) {
      return res.status(404).json({
        success: true,
        message: "data not found",
      });
    }

    kinerjaKontraktor.bidangKeahlian =
      req.body.bidangKeahlian || kinerjaKontraktor.bidangKeahlian;
    kinerjaKontraktor.pengalaman = req.body.pengalaman || kinerjaKontraktor.pengalaman;
    kinerjaKontraktor.jumlahProject =
      req.body.jumlahProject || kinerjaKontraktor.jumlahProject;
    kinerjaKontraktor.jumlahTukang =
      req.body.jumlahTukang || kinerjaKontraktor.jumlahTukang;
    kinerjaKontraktor.sertifikat = req.body.sertifikat || kinerjaKontraktor.sertifikat;
    kinerjaKontraktor.tools = req.body.tools || kinerjaKontraktor.tools;
    kinerjaKontraktor.bacaGambar = req.body.bacaGambar || kinerjaKontraktor.bacaGambar;
    kinerjaKontraktor.legalitasPerusahaan = req.body.legalitasPerusahaan || kinerjaKontraktor.legalitasPerusahaan;

    await kinerjaKontraktor.save();

    // let hargaPerMeter,
    //   pengalaman,
    //   jumlahProject,
    //   jumlahPekerja,
    //   sertifikat,
    //   tools,
    //   bacaGambar;

    // if (KinerjaKontraktor.hargaPerMeter <= 80000) {
    //   hargaPerMeter = 1;
    // } else if (
    //   KinerjaKontraktor.hargaPerMeter >= 80000 &&
    //   KinerjaKontraktor.hargaPerMeter <= 150000
    // ) {
    //   hargaPerMeter = 3;
    // } else if (KinerjaKontraktor.hargaPerMeter >= 150000) {
    //   hargaPerMeter = 5;
    // }

    // if (KinerjaKontraktor.pengalaman <= 3) {
    //   pengalaman = 1;
    // } else if (KinerjaKontraktor.pengalaman >= 3 && KinerjaKontraktor.pengalaman <= 6) {
    //   pengalaman = 3;
    // } else if (KinerjaKontraktor.pengalaman >= 6) {
    //   pengalaman = 5;
    // }

    // if (KinerjaKontraktor.jumlahProject <= 5) {
    //   jumlahProject = 1;
    // } else if (
    //   KinerjaKontraktor.jumlahProject >= 5 &&
    //   KinerjaKontraktor.jumlahProject <= 10
    // ) {
    //   jumlahProject = 3;
    // } else if (KinerjaKontraktor.jumlahProject >= 10) {
    //   jumlahProject = 5;
    // }

    // if (KinerjaKontraktor.jumlahTukang <= 5) {
    //   jumlahPekerja = 1;
    // } else if (
    //   KinerjaKontraktor.jumlahTukang >= 5 &&
    //   KinerjaKontraktor.jumlahTukang <= 10
    // ) {
    //   jumlahPekerja = 3;
    // } else if (KinerjaKontraktor.jumlahTukang >= 10) {
    //   jumlahPekerja = 5;
    // }

    // if (KinerjaKontraktor.sertifikat == false) {
    //   sertifikat = 1;
    // } else {
    //   sertifikat = 5;
    // }

    // if (KinerjaKontraktor.tools == false) {
    //   tools = 1;
    // } else {
    //   tools = 5;
    // }

    // if (KinerjaKontraktor.bacaGambar === 1) {
    //   bacaGambar = 1;
    // } else if (KinerjaKontraktor.bacaGambar === 3) {
    //   bacaGambar = 3;
    // } else if (KinerjaKontraktor.bacaGambar === 5) {
    //   bacaGambar = 5;
    // }

    // (penilaianMandor.hargaPerMeter = hargaPerMeter),
    //   (penilaianMandor.pengalaman = pengalaman),
    //   (penilaianMandor.jumlahProject = jumlahProject),
    //   (penilaianMandor.jumlahPekerja = jumlahPekerja),
    //   (penilaianMandor.sertifikat = sertifikat),
    //   (penilaianMandor.tools = tools),
    //   (penilaianMandor.bacaGambar = bacaGambar),
    //   await penilaianMandor.save();

    return res.status(200).json({
      success: true,
      message: "update kinerja success",
      data: kinerjaKontraktor,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const kinerjaKontraktor = await KinerjaKontraktor.findOne({
      mandorId: req.user._id,
    });

    if (!KinerjaKontraktor) {
      return res.status(404).json({
        success: true,
        message: "data not found",
      });
    }

    await kinerjaKontraktor.delete();

    return res.status(200).json({
      success: true,
      message: "delete kinerja success",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong on the server",
    });
  }
};
