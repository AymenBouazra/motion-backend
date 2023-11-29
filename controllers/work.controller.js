const Work = require('../models/work');
const path = require('path');
const fs = require('fs')

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
exports.getOneByslug = async (req, res) => {
    try {
        const work = await Work.findOne({ slug: req.params.slug });
        res.json(work)
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.create = async (req, res) => {
    try {
        const { headerTitle,
            breadcrumb,
            title,
            description,
            Client,
            Industry,
            Services,
            Date,
            Website,
            testimonial,
            otherDetails,
            slug,
            type } = req.body
        let cover = ''
        let pictures = []
        const workExist = await Work.findOne({ headerTitle })
        if (workExist) {
            res.status(400).json({ message: 'Work already exist!' })
        } else {
            if (req.files) {
                (req.files['pictures']).map((pic) => {
                    pictures.push(process.env.BACKEND_HOST + process.env.PORT + '/' + pic.path)
                });
                cover = process.env.BACKEND_HOST + process.env.PORT + '/' + req.files['cover'][0].path
            }
            const formattedTypes = type.split(',')
            const work = {
                headerTitle,
                breadcrumb,
                title,
                description,
                clientInfos: {
                    Client,
                    Industry,
                    Services,
                    Date,
                    Website,
                },
                testimonial,
                otherDetails,
                cover,
                pictures,
                slug: slug[0],
                type: formattedTypes
            }
            await Work.create(work);
            res.json({ message: 'Work created successfully!' })
        }
    } catch (error) {
        console.log(error);
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