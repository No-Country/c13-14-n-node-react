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
        user,
        link,
        themeId,
        lastInitProfile
    } = req.body;


    const validateExist = await Profile.findOne({ nameSpace }) || null;
    const validate = await Profile.find({ user });

    if (validateExist !== null) {
        return res.status(409).json({ message: "ya existe un profile con ese nombre." })
    }

    if (validate.length > 4) {
        return res.status(409).json({ message: "no puedes crear mas de 5 profiles" })
    }

    const newProfile = await Profile.create(
        {
            nameSpace,
            title,
            header,
            image,
            body,
            user,
            link,
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


const deleteProfile = catchAsync(async (req, res, next) => {

    try {
        const { id } = req.params;

        const result = await Profile.findOneAndDelete({ _id: id });

        if (!result) {
            return res.status(500).json({ status: error, message: "error al eliminar" });
        }

        res.status(200).json({
            status: 'success',
            result,
            message: "profile delete"
        })

    } catch (error) {
        res.status(500).send({ error: "Error interno del servidor" });
    }
})


const findAllProfile = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const allProfile = await Profile.find({ user: id }).populate("user link theme") || null;

    if (allProfile === null) {
        return res.status(409).json({ message: "no tienes perfiles." })
    }

    res.status(200).json({
        message: "success",
        profile: allProfile
    })
})


module.exports = {
    createProfile,
    findAllProfile,
    deleteProfile
}