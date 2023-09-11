const { validToken } = require('../libs/token');
const { catchAsync } = require('../utils/catchAsync');

const validateToken = (req, res, next) => {
  const { authorization } = req.headers
  let token
  if (authorization) {
    let parts = authorization.split(' ')
    if (parts[1]) token = parts[1]
    if (token) parts = token.split('.')
    if (parts.length !== 3) token = undefined
  }
  if (!token) return res.status(406).json({message:'AUTH_FALSE'})
  const session = validToken(token)
  req.headers.session = session
  next()
}

module.exports = {validateToken}