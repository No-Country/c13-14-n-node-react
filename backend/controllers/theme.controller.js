const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const { Theme } = require('../models/theme.model');


const createTheme = catchAsync(async (req, res, next) => {

    const { name, backgroundTheme, backgroundLink } = req.body;

    const validate = await Theme.findOne({ name, backgroundTheme, backgroundLink }) || null;

    if (validate !== null) {
        return res.status(409).json({ message: "Profile exist" })
    }

    const newTheme = await Theme.create({
        name,
        backgroundTheme,
        backgroundLink
    })
    res.status(200).json({
        message: "success",
        theme: newTheme
    })

});

module.exports = {
    createTheme
}