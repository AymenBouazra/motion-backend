const Work = require('../models/work');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs')
const cloudinary = require("../utils/cloudinary");

exports.list = async (req, res) => {
    try {
        const Users = await Work.find();
        res.json(Users)
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.getOne = async (req, res) => {
    try {
        const work = await Work.findById(req.params.id);
        res.json(work)
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.create = async (req, res) => {
    try {
        const { headerTitle } = req.body
        const userExist = await Work.findOne({ headerTitle })
        if (userExist) {
            res.status(400).json({ message: 'Utilisateur existe déjà avec cette adresse e-mail!' })
        } else {
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                req.body.photo = result.secure_url
                req.body.cloudinary_id = result.public_id
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt)
            req.body.password = hash
            await Work.create(req.body);
            res.json({ message: 'Utilisateur créé avec succés!' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.updateOne = async (req, res) => {
    try {
        const work = await Work.findById(req.params.id);
        if (!req.body.password) {
            req.body.password = work.password
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt)
            req.body.password = hash
        }
        if (req.file) {

            const result = await cloudinary.uploader.upload(req.file.path);

            req.body.photo = result.secure_url
            req.body.cloudinary_id = result.public_id

            // req.body.photo = 'http://localhost:4000/uploads/' + req.file.filename
            // const fileName = path.basename(work.photo);
            // const filePath = path.resolve('./uploads', fileName);
            // if (fs.existsSync(filePath)) {
            //     fs.unlinkSync(filePath);
            // }
        }
        await Work.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: 'Utilisateur modifié avec succés!' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.deleteOne = async (req, res) => {
    try {
        const work = await Work.findById(req.params.id);
        const fileName = path.basename(work.photo);
        const filePath = path.resolve('./uploads', fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        await Work.findByIdAndDelete(req.params.id);
        res.json({ message: 'Utilisateur supprimé avec succés!' })
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}