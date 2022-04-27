const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LowonganProyekSchema = new Schema({
    name: {
        type: String
    },
    deskripsi: {
        type: String
    },
    lokasi: {
        type: String
    },
    itemPekerjaan: {
        type: Array,
        default: []
    },
    waktuMulai: {
        type: Date
    },
    waktuBeres: {
        type: String
    },
    volumePekerjaan: {
        type: Number
    },
    pemilik: {
        type: String
    },
    RAB: {
        type: Number
    },
    gambar: {
        type: String
    },
    isAvail: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("LowonganProyek", LowonganProyekSchema)