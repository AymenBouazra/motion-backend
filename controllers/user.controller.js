const User = require('../models/user');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs')
const cloudinary = require("../utils/cloudinary");

exports.list = async (req, res) => {
    try {
        const Users = await User.find();
        res.json(Users)
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.getOne = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, { password: 0 });
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const userExist = await User.findOne({ email: req.body.email })
        if (userExist) {
            res.status(400).json({ message: 'Utilisateur existe déjà avec cette adresse e-mail!' })
        } else {
            if (req.file) {
                console.log(req.file);
                const result = await cloudinary.uploader.upload(req.file.path);
                req.body.photo = result.secure_url
                req.body.cloudinary_id = result.public_id
                const fileName = path.basename(req.file.filename);
                const filePath = path.resolve('./uploads', fileName);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt)
            req.body.password = hash
            await User.create(req.body);
            res.json({ message: 'Utilisateur créé avec succés!' })
        }
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.updateOne = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!req.body.password) {
            req.body.password = user.password
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt)
            req.body.password = hash
        }
        if (req.file) {

            const result = await cloudinary.uploader.upload(req.file.path);

            req.body.photo = result.secure_url
            req.body.cloudinary_id = result.public_id

            const fileName = path.basename(req.file.filename);
            const filePath = path.resolve('./uploads', fileName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Utilisateur modifié avec succés!' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.deleteOne = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Utilisateur supprimé avec succés!' })
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}