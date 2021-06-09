const { check , validationResult} = require('express-validator');

exports.validateSignupRequest = [
        check('firstName').notEmpty().withMessage('First Name Is Required'),
        check('lastName').notEmpty().withMessage('Last Name Is Required'),
        check('email').isEmail().withMessage('Valid Email Is Required'),
        check('password').isLength({min: 6}).withMessage('Password must be atleast 6 charecters long')
]
exports.validateSigninRequest = [
    check('email').isEmail().withMessage('Valid Email Is Required'),
    check('password').isLength({min: 6}).withMessage('Password must be atleast 6 charecters long')
]
exports.isRequestValidated = (req, res, next)=>{

    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({
            errors: errors.array()[0].msg
        })
    }
    next();

}