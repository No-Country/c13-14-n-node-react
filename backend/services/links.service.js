const { Link } = require('../models/link.model')

const linksProfileService = async (idProfile) => {
  const links = await Link.find({ profile: idProfile })
  return links
}

module.exports = { linksProfileService }
