// Utils
const { catchAsync } = require('../utils/catchAsync')

// models
const { Profile } = require('../models/profile.model')

// Services
const { createProfileService, findProfileService, findNameSpaceProfileService } = require('../services/profile.service')
const { createToken } = require('../libs/token')

// Crear un nuevo link
const createProfile = catchAsync(async (req, res, next) => {
  const { nameSpace } = req.body
  try {
    const { userId } = req.headers.session
    const newProfile = await createProfileService(nameSpace, userId)
    const id = newProfile._id.toString()
    res.status(201).send({ id })
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error.message })
  }
})

const findProfile = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params
    //! Debo buscar en userProfiles
    const { userId } = req.headers.session
    const profile = await findProfileService(id)
    const token = createToken({ userId, profileId: profile.id })
    res.status(200).send({ profile, token })
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error.message })
  }
})

const findAllProfile = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const allProfile = await Profile.find({ user: id }).populate('user link theme') || null

  if (allProfile === null) {
    return res.status(409).json({ message: 'no tienes perfiles.' })
  }

  res.status(200).json({
    message: 'success',
    profile: allProfile
  })
})

const deleteProfile = catchAsync(async (req, res) => {
  const id = req.params.id;
  try {
    // Buscar y eliminar el perfil
    const profile = await Profile.findByIdAndDelete(id);
    if (!profile) {
      return res.status(404).send({ mensaje: 'Perfil no encontrado' });
    }
    // Buscar y eliminar todos los UserProfiles que tienen el perfil con el mismo ID
    const deletedUserProfiles = await UserProfile.deleteMany({ profile: id });
    // Buscar y eliminar todos los Links que tienen el perfil con el mismo ID
    const deletedLinks = await Link.deleteMany({ profile: id });
    if (deletedUserProfiles.deletedCount === 0 && deletedLinks.deletedCount === 0) {
      return res.status(200).send({ mensaje: 'Perfil eliminado exitosamente, pero no se encontraron UserProfiles ni Links asociados' });
    }
    res.status(200).send({ mensaje: 'Perfil eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el perfil:', error);
    res.status(500).send({ error: 'Error interno del servidor' });
  }
});

const findPublicProfile = catchAsync(async (req, res, next) => {
  try {
    const { nameSpace } = req.params
    const profile = await findNameSpaceProfileService(nameSpace)
    res.status(200).send(profile)    
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

module.exports = {
  createProfile,
  findProfile,
  findAllProfile,
  deleteProfile,
  findPublicProfile
}
