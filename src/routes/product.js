const express = require('express')
const { createProduct, getProductsBySlug, getProductDetailsById, deleteProductById, getProducts, allProducts } = require('../controller/product')
const { requireSignin, adminMiddleware } = require('../middleware/index')
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + Date.now() + file.originalname)
    }
})

const upload = multer({ storage })

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct)
router.get("/products/:slug", getProductsBySlug);
//router.get('/category/getcategory', getCategories);
router.get("/product/:productId", getProductDetailsById);
router.delete("/product/deleteProductById", requireSignin, adminMiddleware,deleteProductById);
router.post("/product/getProducts", getProducts);

module.exports = router;