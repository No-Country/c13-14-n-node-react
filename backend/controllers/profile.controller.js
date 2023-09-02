// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

//models
const { Profile } = require('../models/profile.model')


const createProfile = catchAsync(async (req, res, next) => {
    const {
        nameSpace,
        title,
        header,
        image,
        body,
        themeId,
        lastInitProfile
    } = req.body;

    const validate = await Profile.findOne({ nameSpace }) || null;

    if (validate !== null) {
        return res.status(409).json({ message: "Profile exist" })
    }

    const newProfile = await Profile.create(
        {
            nameSpace,
            title,
            header,
            image,
            body,
            themeId,
            status: true,
            lastInitProfile
        }
    );
    res.status(200).json({
        message: "success",
        profile: newProfile
    })

});


module.exports = {
    createProfile
}