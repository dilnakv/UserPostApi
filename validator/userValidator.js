const { body, validationResult } = require('express-validator')

const userValidationRules = () => {
  
  return [
    body('email').isEmail().withMessage('Not a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password length should be minimum of 5'),
  ]
}

const validate = (req, res, next) => {
  
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userValidationRules,
  validate,
}


