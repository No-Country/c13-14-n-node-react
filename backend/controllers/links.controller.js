const { Link } = require('../models/link.model')
const { UserProfile } = require('../models/userProfile.model')

const { catchAsync } = require('../utils/catchAsync')

// Obtener todos los links

const getAllLinks = catchAsync(async (req, res) => {
  try {
    const links = await Link.find()
    res.status(200).send(links)
  } catch (error) {
    res.status(500).send({ error: 'Error interno del servidor' })
  }
})

// Obtener un link por ID
const getLinkById = catchAsync(async (req, res) => {
  try {
    const id = req.params.id
    const link = await Link.findById(id)
    if (!link) {
      return res.status(404).send({ error: 'Link no encontrado' })
    }
    res.status(200).send(link)
  } catch (error) {
    res.status(500).send({ error: 'Error interno del servidor' })
  }
})

// Crear un nuevo link
const createLink = catchAsync(async (req, res) => {
  try {
    // Extraigo los datos de sesión
    const { userId, profileId } = req.headers.session

    // Verifico que tenga permiso
    const userProfile = await UserProfile.findOne({ user: userId, profile: profileId, status: 'accepted' })

    if (!userProfile) return res.status(403).json('INVALID_TOKEN')
    const { name, urlEnlace, icon, status, order } = req.body
    const newLink = { name, profile: profileId, urlEnlace, icon, status, order }
    console.log(newLink)
    const link = await Link.create(newLink)
    res.status(201).send({ mensaje: 'Link creado exitosamente', idLink: link._id })
  } catch (error) {
    console.log(error)
    res.status(400).send({ error: 'Solicitud incorrecta', message: error.message })
  }
})

// Actualizar un link
const updateLink = catchAsync(async (req, res) => {
  const id = req.params.id
  const newLinkData = {
    name: req.body.name,
    profile: req.body.profile,
    urlEnlace: req.body.urlEnlace,
    icon: req.body.icon,
    status: req.body.status,
    order: req.body.order
  }
  try {
    const updatedLink = await Link.findByIdAndUpdate(id, newLinkData, { new: true })
    if (!updatedLink) {
      return res.status(404).send({ mensaje: 'No se encontró el link' })
    }
    res.status(200).send({ mensaje: 'Link modificado con éxito', link: updatedLink })
  } catch (error) {
    res.status(500).send({ error: 'Error interno del servidor' })
  }
})
// Eliminar un link
const deleteLink = catchAsync(async (req, res) => {
  const id = req.params.id
  try {
    const link = await Link.findByIdAndDelete(id)
    if (!link) {
      return res.status(404).send({ error: 'Link no encontrado' })
    }
    res.status(200).send({ mensaje: 'Link eliminado exitosamente' })
  } catch (error) {
    res.status(500).send({ error: 'Error interno del servidor' })
  }
})

module.exports = {
  getAllLinks,
  getLinkById,
  createLink,
  updateLink,
  deleteLink
}
