const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        firstName: { type: String, required: [true, 'Prénom est obligatoire'] },
        lastName: { type: String, required: [false, 'Nom est obligatoire'] },
        email: { type: String, required: [true, 'Email est obligatoire'] },
        password: { type: String, required: [true, 'Password est obligatoire'] },
        photo: { type: String, default: 'https://i.imgur.com/lh8Sd5C.png' },
        cloudinary_id: { type: String },
    }, {
    timestamps: true, versionKey: false
}
)

module.exports = mongoose.model('User', UserSchema, 'User');