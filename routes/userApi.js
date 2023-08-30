const express = require('express');
const { create, list, updateOne, getOne, deleteOne } = require('../controllers/user.controller');
const passport = require('passport');
const uploadImage = require('../commun/multer');
const router = express.Router();

router.post('/users', passport.authenticate('bearer', { session: false }), create)
router.get('/users', passport.authenticate('bearer', { session: false }), list)
router.put('/users/:id', passport.authenticate('bearer', { session: false }), updateOne)
router.get('/users/:id', passport.authenticate('bearer', { session: false }), getOne)
router.delete('/users/:id', passport.authenticate('bearer', { session: false }), deleteOne)

module.exports = router