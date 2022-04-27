const kriteriaPenilaian = [
  {
    kriteria: "Tanggung Jawab",
    code: "C1",
    isBenefit: true,
    bobot: 0.1,
  },
  {
    kriteria: "Bisa Baca Gambar",
    code: "C2",
    isBenefit: true,
    bobot: 0.1,
  },
  {
    kriteria: "Portofolio",
    code: "C3",
    isBenefit: true,
    bobot: 0.1,
  },
  {
    kriteria: "Pengalaman",
    code: "C4",
    isBenefit: true,
    bobot: 0.1,
  },
  {
    kriteria: "Peralatan",
    code: "C5",
    isBenefit: true,
    bobot: 0.07,
  },
  {
    kriteria: "Sertefikat",
    code: "C6",
    isBenefit: true,
    bobot: 0.05,
  },
  {
    kriteria: "Keuangan",
    code: "C7",
    isBenefit: true,
    bobot: 0.12,
  },
  {
    kriteria: "Penawaran",
    code: "C8",
    isBenefit: false,
    bobot: 0.07,
  },
  {
    kriteria: "Personil",
    code: "C9",
    isBenefit: true,
    bobot: 0.07,
  },
  {
    kriteria: "Legalitas",
    code: "C10",
    isBenefit: true,
    bobot: 0.07,
  },
  {
    kriteria: "Presentasi",
    code: "C11",
    isBenefit: true,
    bobot: 0.15,
  },
];

let totalBobot = 0;
for (let i = 0; i < kriteriaPenilaian.length; i++) {
  totalBobot += kriteriaPenilaian[i].bobot;
}

const alternatif = [
  {
    kontraktor: "Kontraktor 1",
    C1: 3,
    C2: 3,
    C3: 4,
    C4: 5,
    C5: 5,
    C6: 1,
    C7: 1000000,
    C8: 130000,
    C9: 4,
    C10: 1,
    C11: 4,
  },
  {
    kontraktor: "Kontraktor 2",
    C1: 3,
    C2: 3,
    C3: 3,
    C4: 3,
    C5: 5,
    C6: 1,
    C7: 1200000,
    C8: 120000,
    C9: 4,
    C10: 1,
    C11: 3,
  },
  {
    kontraktor: "Kontraktor 3",
    C1: 3,
    C2: 5,
    C3: 7,
    C4: 8,
    C5: 5,
    C6: 1,
    C7: 1500000,
    C8: 160000,
    C9: 3,
    C10: 1,
    C11: 5,
  },
  {
    kontraktor: "Kontraktor 4",
    C1: 3,
    C2: 1,
    C3: 2,
    C4: 1,
    C5: 5,
    C6: 1,
    C7: 1100000,
    C8: 120000,
    C9: 6,
    C10: 1,
    C11: 3,
  },
  {
    kontraktor: "Kontraktor 5",
    C1: 3,
    C2: 1,
    C3: 2,
    C4: 1,
    C5: 5,
    C6: 1,
    C7: 1300000,
    C8: 110000,
    C9: 3,
    C10: 1,
    C11: 2,
  },
];

let bobotBuffer = [];
const variablePenampung = [];
kriteriaPenilaian.forEach((_, index) => {
  let name = `C${index + 1}`;
  let buffer = {};
  buffer = {
    kriteria: name,
    data: [],
  };

  variablePenampung.push(buffer);
});

alternatif.forEach((data) => {
  for (let i = 0; i < variablePenampung.length; i++) {
    variablePenampung[i].data.push(data[variablePenampung[i].kriteria]);
  }
});

variablePenampung.forEach((data) => {
  bobotBuffer.push(data.data);
});

let maxMin = [];
bobotBuffer.forEach((data, index) => {
  let buffer = 0;
  if (kriteriaPenilaian[index].isBenefit) {
    buffer = Math.max(...data);
  } else {
    buffer = Math.min(...data);
  }
  maxMin.push(buffer);
});

let normalisasi = [];
alternatif.forEach((data) => {
  let bufferNormalisasi = {};
  for (let j = 0; j < maxMin.length; j++) {
    bufferNormalisasi.nama = data.kontraktor;
    bufferNormalisasi[variablePenampung[j].kriteria] =
      data[variablePenampung[j].kriteria] / maxMin[j];
  }

  normalisasi.push(bufferNormalisasi);
});

let penilaian = [];
normalisasi.forEach((data) => {
  let buffer = {
    nama: data.nama,
    nilai: [],
  };
  for (let i = 0; i < kriteriaPenilaian.length; i++) {
    buffer.nilai.push(
      data[kriteriaPenilaian[i].code] * kriteriaPenilaian[i].bobot
    );
  }

  penilaian.push(buffer);
});

let perangkingan = [];
for (let i = 0; i < penilaian.length; i++) {
  let data = {
    nama: penilaian[i].nama,
    nilai: 0,
  };

  for (let j = 0; j < kriteriaPenilaian.length; j++) {
    data.nilai += penilaian[i].nilai[j];
  }

  perangkingan.push(data);
}

// console.log(kriteriaPenilaian);
// console.log(totalBobot)
// console.log(alternatif);
// console.log(maxMin);
// console.log(normalisasi);
// console.log(bobotBuffer);
// console.log(penilaian);
console.log(perangkingan);
