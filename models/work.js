const mongoose = require('mongoose');
const { Schema } = mongoose;

const WorkSchema = new Schema({
    title: String,
    subtitle: String,
    cover: Buffer,
    description: String,
    clientInfos: {
        Client: String,
        Industry: String,
        Services: String,
        Date: String,
        Website: String,
    },
    productImages: [Buffer],
    productQuotes: String,


}, {
    timestamps: true, versionKey: false
})

module.exports = mongoose.model('work', WorkSchema)