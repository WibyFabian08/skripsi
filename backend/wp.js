const kepentingan = [
  {
    id: 1,
    kepentingan: "Tidak Penting",
    bobot: 1,
  },
  {
    id: 2,
    kepentingan: "Kurang Penting",
    bobot: 2,
  },
  {
    id: 3,
    kepentingan: "Cukup Penting",
    bobot: 3,
  },
  {
    id: 4,
    kepentingan: "Penting",
    bobot: 4,
  },
  {
    id: 5,
    kepentingan: "Sangat Penting",
    bobot: 5,
  },
];

const kriteria = [
  {
    name: "Harga Per Meter",
    bobot: 3,
    isBenefit: false,
    code: "C1",
  },
  {
    name: "Pengalaman",
    bobot: 5,
    isBenefit: true,
    code: "C2",
  },
  {
    name: "Jumlah Project",
    bobot: 3,
    isBenefit: true,
    code: "C3",
  },
  {
    name: "Jumlah Pekerja",
    bobot: 2,
    isBenefit: true,
    code: "C4",
  },
  {
    name: "Sertifikat",
    bobot: 3,
    isBenefit: true,
    code: "C5",
  },
  {
    name: "Peralatan",
    bobot: 4,
    isBenefit: true,
    code: "C6",
  },
  {
    name: "Baca Gambar",
    bobot: 4,
    isBenefit: true,
    code: "C7",
  },
];

const alternatifKriteria = [
  {
    code: "M1",
    C1: 3,
    C2: 3,
    C3: 3,
    C4: 3,
    C5: 1,
    C6: 5,
    C7: 3,
  },
  {
    code: "M2",
    C1: 3,
    C2: 1,
    C3: 3,
    C4: 3,
    C5: 1,
    C6: 5,
    C7: 3,
  },
  {
    code: "M3",
    C1: 5,
    C2: 5,
    C3: 5,
    C4: 3,
    C5: 1,
    C6: 5,
    C7: 5,
  },
  {
    code: "M4",
    C1: 3,
    C2: 1,
    C3: 1,
    C4: 3,
    C5: 1,
    C6: 5,
    C7: 1,
  },
  {
    code: "M5",
    C1: 3,
    C2: 1,
    C3: 1,
    C4: 1,
    C5: 1,
    C6: 5,
    C7: 1,
  },
];

let jumlahKriteria = 0;
kriteria.forEach((data) => {
  return (jumlahKriteria += data.bobot);
});

let pangkat = [];
kriteria.forEach((data) => {
  pangkat.push({
    code: data.code,
    pangkat: (data.bobot / jumlahKriteria) * (data.isBenefit ? 1 : -1),
  });
});

let arrayBuffer = [];
alternatifKriteria.forEach((data) => {
  let buffer = [];
  buffer.push(data.C1);
  buffer.push(data.C2);
  buffer.push(data.C3);
  buffer.push(data.C4);
  buffer.push(data.C5);
  buffer.push(data.C6);
  buffer.push(data.C7);

  arrayBuffer.push(buffer);
});

let countS = [];
arrayBuffer.forEach((data, index) => {
  let buffer = 1;
  for (let i = 0; i < pangkat.length; i++) {
    buffer *= Math.pow(data[i], pangkat[i].pangkat);
  }

  countS.push({
    alternative: `M${index + 1}`,
    s: buffer,
  });
});

let wj = 0;
pangkat.forEach((data) => {
  return (wj += data.pangkat);
});

let sumS = 0;
countS.forEach((data) => {
  return (sumS += data.s);
});

let countV = [];
countS.forEach((data, index) => {
  countV.push({
    alternative: `M${index + 1}`,
    v: data.s / sumS,
  });
});

let sumV = 0;
countV.forEach((data) => {
  return (sumV += data.v);
});

// console.log('Jumlah kriteria : \n', jumlahKriteria)
// console.log("Tabel alternatife kriteria : \n", alternatifKriteria);
// console.log("Jumlah bobot kepentingan : \n", wj);
// console.log("array buffer : \n", arrayBuffer);
// console.log("pangkat : \n", pangkat);
// console.log("menghitung S : \n", countS);
// console.log("Total S : \n", sumS);
// console.log("Menghitung V : \n", countV);
// console.log("Total V : \n", sumV);
const array = ['will', 23, 'ceo'];
const key = ['name', 'age', 'profesi']
const obj = {}
// const obj = (arr, key) => Object.assign({}, ...arr.map((data) => ({[item[key]]: data})))

for(let i = 0; i < array.length; i++) {
  let nama, jk, hobi, age
  obj[key[i]] =  array[i]
}

console.log(obj)