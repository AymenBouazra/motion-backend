const express = require('express');
const { create, list, updateOne, getOne, getOneByslug, deleteOne } = require('../controllers/work.controller');
const passport = require('passport');
const { uploadImage } = require('../commun/multer');
const router = express.Router();

router.post('/works', uploadImage.fields([{ name: 'cover', maxCount: 1 }, { name: 'pictures', maxCount: 10 }]), create)
router.get('/works', passport.authenticate('bearer', { session: false }), list)
router.get('/works-for-clientside', list)
router.get('/works-for-clientside/:slug', getOneByslug)
router.put('/works/:id', [passport.authenticate('bearer', { session: false }), uploadImage.single('cover'), uploadImage.array('pictures')], updateOne)
router.get('/works/:id', passport.authenticate('bearer', { session: false }), getOne)
router.delete('/works/:id', passport.authenticate('bearer', { session: false }), deleteOne)

module.exports = router