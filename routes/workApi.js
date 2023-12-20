const express = require('express');
const router = express.Router();
const passport = require('passport');
const { uploadImage } = require('../commun/multer');
const { create, list, updateOne, getOne, getOneByslug, deleteOne } = require('../controllers/work.controller');

router.get('/works', passport.authenticate('bearer', { session: false }), list)
router.get('/works-for-clientside', list)
router.get('/works-for-clientside/:slug', getOneByslug)
router.post('/works', [passport.authenticate('bearer', { session: false }), uploadImage.fields([{ name: 'cover', maxCount: 1 }, { name: 'firstPictures', maxCount: 2 }, { name: 'firstBanner', maxCount: 1 }, { name: 'secondPictures', maxCount: 2 }, { name: 'secondBanner', maxCount: 1 }])], create)
router.put('/works/:id', [passport.authenticate('bearer', { session: false }), uploadImage.fields([{ name: 'cover', maxCount: 1 }, { name: 'firstPictures', maxCount: 2 }, { name: 'firstBanner', maxCount: 1 }, { name: 'secondPictures', maxCount: 2 }, { name: 'secondBanner', maxCount: 1 }])], updateOne)
router.get('/works/:id', passport.authenticate('bearer', { session: false }), getOne)
router.delete('/works/:id', passport.authenticate('bearer', { session: false }), deleteOne)

module.exports = router