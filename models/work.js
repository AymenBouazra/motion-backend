const mongoose = require('mongoose');
const { Schema } = mongoose;

const WorkSchema = new Schema({
    type: [String],
    headerTitle: String,
    slug: String,
    breadcrumb: String,
    title: String,
    description: String,
    Client: String,
    Industry: String,
    Services: String,
    Date: String,
    Website: String,
    testimonial: String,
    otherDetails: String,
    cover: String,
    firstBanner: String,
    firstPictures: [String],
    secondBanner: String,
    secondPictures: [String],
}, {
    timestamps: true, versionKey: false
})

module.exports = mongoose.model('work', WorkSchema)