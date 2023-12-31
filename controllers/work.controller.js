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
        let firstBanner = ''
        let secondBanner = ''
        let firstPictures = []
        let secondPictures = []

        const workExist = await Work.findOne({ headerTitle })
        if (workExist) {
            res.status(400).json({ message: 'Work already exist!' })
        } else {
            if (req.files) {
                (req.files['firstPictures']).map((pic) => {
                    firstPictures.push(process.env.BACKEND_HOST + process.env.PORT + '/' + pic.path)
                });
                (req.files['secondPictures']).map((pic) => {
                    secondPictures.push(process.env.BACKEND_HOST + process.env.PORT + '/' + pic.path)
                });
                cover = process.env.BACKEND_HOST + process.env.PORT + '/' + req.files['cover'][0].path
                firstBanner = process.env.BACKEND_HOST + process.env.PORT + '/' + req.files['firstBanner'][0].path
                secondBanner = process.env.BACKEND_HOST + process.env.PORT + '/' + req.files['secondBanner'][0].path
            }
            const formattedTypes = type.split(',')
            const work = {
                headerTitle,
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
                cover,
                firstBanner,
                secondBanner,
                firstPictures,
                secondPictures,
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
        let firstBanner = ''
        let secondBanner = ''
        let firstPictures = []
        let secondPictures = []
        if (req.files['firstPictures']) {
            (req.files['firstPictures']).map((pic) => {
                firstPictures.push(process.env.BACKEND_HOST + process.env.PORT + '/' + pic.path)
            });
        }
        if (req.files['secondPictures']) {
            (req.files['secondPictures']).map((pic) => {
                secondPictures.push(process.env.BACKEND_HOST + process.env.PORT + '/' + pic.path)
            });
        }
        if (req.files['cover']) {
            cover = process.env.BACKEND_HOST + process.env.PORT + '/' + req.files['cover'][0].path
        }
        if (req.files['firstBanner']) {
            firstBanner = process.env.BACKEND_HOST + process.env.PORT + '/' + req.files['firstBanner'][0].path
        }
        if (req.files['secondBanner']) {
            secondBanner = process.env.BACKEND_HOST + process.env.PORT + '/' + req.files['secondBanner'][0].path
        }
        const formattedTypes = type.split(',')
        const workFound = await Work.findById(req.params.id)
        const work = {
            headerTitle,
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
            cover: cover != '' ? cover : workFound.cover,
            firstBanner: firstBanner != '' ? firstBanner : workFound.firstBanner,
            secondBanner: secondBanner != '' ? secondBanner : workFound.secondBanner,
            firstPictures: firstPictures.length != 0 ? firstPictures : workFound.firstPictures,
            secondPictures: secondPictures.length != 0 ? secondPictures : workFound.secondPictures,
            slug: slug[0],
            type: formattedTypes
        }
        await Work.findByIdAndUpdate(req.params.id, work);
        res.json({ message: 'Work updated successfully!' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}

exports.deleteOne = async (req, res) => {
    try {
        const work = await Work.findById(req.params.id);
        const fileNameCover = path.basename(work.cover);
        const fileNameFirstBanner = path.basename(work.firstBanner);
        const fileNameSecondBanner = path.basename(work.secondBanner);
        const filePathCover = path.resolve('./uploads/covers', fileNameCover);
        const filePathFirstBanner = path.resolve('./uploads/works', fileNameFirstBanner);
        const filePathSecondBanner = path.resolve('./uploads/works', fileNameSecondBanner);
        if (fs.existsSync(filePathCover)) {
            fs.unlinkSync(filePathCover);
        }
        if (fs.existsSync(filePathFirstBanner)) {
            fs.unlinkSync(filePathFirstBanner);
        }
        if (fs.existsSync(filePathSecondBanner)) {
            fs.unlinkSync(filePathSecondBanner);
        }
        work.firstPictures.map((picture) => {
            const fileName = path.basename(picture)
            const filePathPicture = path.resolve('./uploads/works', fileName);
            if (fs.existsSync(filePathPicture)) {
                fs.unlinkSync(filePathPicture);
            }
        })
        work.secondPictures.map((picture) => {
            const fileName = path.basename(picture)
            const filePathPicture = path.resolve('./uploads/works', fileName);
            if (fs.existsSync(filePathPicture)) {
                fs.unlinkSync(filePathPicture);
            }
        })

        await Work.findByIdAndDelete(req.params.id);
        res.json({ message: 'Utilisateur supprimé avec succés!' })
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error!' })
    }
}