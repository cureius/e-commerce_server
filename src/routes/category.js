const express = require('express')
const { addCategory, getCategories, updateCategories, deleteCategories } = require('../controller/category')
const { requireSignin, adminMiddleware } = require('../middleware/index')
const router = express.Router()
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage })

router.post('/category/create', requireSignin, adminMiddleware, upload.single('categoryImage'), addCategory)
router.get('/category/getcategory', getCategories)
router.post("/category/update", requireSignin, adminMiddleware, upload.array("categoryImage"), updateCategories);
router.post( "/category/delete", requireSignin, adminMiddleware, deleteCategories);

module.exports = router;