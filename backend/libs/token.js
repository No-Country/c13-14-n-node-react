const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET
const expire = process.env.JWT_EXPIRE

const createToken = (data, options ) => {
  const exp = options?.expiresIn || expire
  const token = jwt.sign(data, secret, {
    expiresIn: exp
  })
  return token
}

const validToken = (token) => {
  const parts = token.split('.')
  if (parts.length !== 3)   return null
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    return null
  }
}

module.exports = {createToken, validToken}