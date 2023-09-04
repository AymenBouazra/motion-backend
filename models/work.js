const mongoose = require('mongoose');
const { Schema } = mongoose;

const WorkSchema = new Schema({
    headerTitle: String,
    breadcrumb: String,
    cover: Buffer,
    title: String,
    description: String,
    clientInfos: {
        Client: String,
        Industry: String,
        Services: String,
        Date: String,
        Website: String,
    },
    pictures: [Buffer],
    testimonial: String,
    otherDetails: String
}, {
    timestamps: true, versionKey: false
})

module.exports = mongoose.model('work', WorkSchema)