const mongoose = require('mongoose');
const { Schema } = mongoose;

const WorkSchema = new Schema({
    headerTitle: String,
    breadcrumb: String,
    cover: String,
    title: String,
    description: String,
    clientInfos: {
        Client: String,
        Industry: String,
        Services: String,
        Date: String,
        Website: String,
    },
    pictures: [String],
    testimonial: String,
    otherDetails: String,
    picturesSecureUrl: [],
    picturescloudinary_id: []
}, {
    timestamps: true, versionKey: false
})

module.exports = mongoose.model('work', WorkSchema)