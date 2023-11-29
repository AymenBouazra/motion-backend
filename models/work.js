const mongoose = require('mongoose');
const { Schema } = mongoose;

const WorkSchema = new Schema({
    type: [String],
    headerTitle: String,
    slug: String,
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
}, {
    timestamps: true, versionKey: false
})

module.exports = mongoose.model('work', WorkSchema)