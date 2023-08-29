const { genSaltSync, hashSync, compareSync } = require('bcryptjs');
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const userExist = await userModel.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(400).json({ message: 'Utilisateur déjà existe!' })
        } else {
            const salt = genSaltSync(10)
            const hash = hashSync(req.body.password, salt)
            req.body.password = hash
            await userModel.create(req.body)
            return res.status(201).json({ message: 'Utilisateur créé!' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Erreur serveur' })
    }
}

exports.login = async (req, res) => {
    try {
        const userExist = await userModel.findOne({ email: req.body.email });
        if (!userExist) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect!' })
        } else {
            const isValid = compareSync(req.body.password, userExist.password)
            if (isValid) {
                const data = {
                    userId: userExist._id
                }
                const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1d' });
                return res.send({ message: 'Connecté avec succés!', token })
            } else {
                return res.status(400).json({ message: 'Email ou mot de passe incorrect!' })
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Erreur serveur' })
    }
}
