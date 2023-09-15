// Utils
const { catchAsync } = require('../utils/catchAsync')

// models
const { Profile } = require('../models/profile.model')
const { UserProfile } = require('../models/userProfile.model')
const { User } = require('../models/user.model')

// Services
const { createUserProfileService } = require('../services/userProfiles.service')

const createUserProfile = catchAsync(async (req, res, next) => {
  const { email } = req.body
  console.log(email)
  try {
    const { profileId } = req.headers.session
    const newUserProfile = await createUserProfileService(email, profileId)
    const id = newUserProfile._id.toString()
    res.status(201).send({ id })
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error.message })
  }
})
const deleteUserProfile = catchAsync(async (req, res, next) => {
  const { profileUserId, profileUserEmail } = req.body;
  console.log("profileUserId", profileUserId);
  console.log("profileUserEmail", profileUserEmail);

  try {
    // Busca el usuario por su email
    const user = await User.findOne({ email: profileUserEmail });
    console.log(user._id)
    if (!user) {
      return res.status(404).send({ error: 'Usuario no encontrado' });
    }

    // Busca el UserProfile con las condiciones especificadas
    const userProfile = await UserProfile.findOne({
      'user': user._id,
      'profile': profileUserId,
    });

    if (!userProfile) {
      return res.status(404).send({ error: 'UserProfile no encontrado' });
    }

    // Elimina el UserProfile encontrado
    await UserProfile.findByIdAndDelete(userProfile._id);

    res.status(200).send({ mensaje: 'UserProfile eliminado exitosamente' });
  } catch (error) {
    res.status(500).send({ error: 'Error interno del servidor' });
  }
});


module.exports = {
    createUserProfile,
    deleteUserProfile
}
