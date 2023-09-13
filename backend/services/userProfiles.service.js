const { Types } = require('mongoose')
const { UserProfile } = require('../models/userProfile.model');

// Devuelve un array de perfiles por usuario
// Compo parametro debe recibir un ObjectID
const userProfilesListService = async (userObjectId) =>{
  const profiles = UserProfile.find({user:userObjectId}).lean()

  const userProfiles = profiles.map(profile =>{})

}


module.exports = { findSessionDataService}