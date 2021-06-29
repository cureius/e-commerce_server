const express = require('express');
const { requireSignin, adminMiddleware } = require('../../middleware');
const { initialData, getProducts } = require('../../controller/admin/initialData');
const router = express.Router();


router.get('/initialdata', requireSignin, adminMiddleware, initialData);


module.exports = router;