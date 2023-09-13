// const { UserProfile } = require('../models/userProfile.model')

// Devuelve un array de perfiles por usuario
// Compo parametro debe recibir un ObjectID
const findUserProfiles = async (userObjectId) => {
  // const profiles = UserProfile.find({ user: userObjectId }).lean()
  // const userProfiles = profiles.map(profile => {})
}

module.exports = { findUserProfiles }
