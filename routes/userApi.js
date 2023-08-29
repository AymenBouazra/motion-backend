const express = require('express');
const { create, list, updateOne, getOne, deleteOne } = require('../controllers/user.controller');
const router = express.Router();

router.post('/users', create)
router.get('/users', list)
router.put('/users/:id', updateOne)
router.get('/users/:id', getOne)
router.delete('/users/:id', deleteOne)

module.exports = router