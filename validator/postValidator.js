const { body, validationResult } = require('express-validator')

const postValidationRules = () => {
  
  return [
   body("title").notEmpty().withMessage('Title is required'),
   body("content").notEmpty().withMessage('Content is required'),
  ]
}

const validate = (req, res, next) => {
  
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  
  const extractedErrors = []
  errors.array().map(err => {
    extractedErrors.push({ [err.path]: err.msg })})

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  postValidationRules,
  validate,
}


