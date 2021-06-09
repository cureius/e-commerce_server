const express = require('express')
const { signup, signin } = require('../../controller/admin/auth')
const { validateSigninRequest, validateSignupRequest, isRequestValidated } = require('../../validator/auth')
const router = express.Router()

router.post('/admin/signup',validateSignupRequest, isRequestValidated, signup)
router.post('/admin/signin',validateSigninRequest, isRequestValidated, signin)

// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({
//         user: 'profile'
//     })
// })

module.exports = router;