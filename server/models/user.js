const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Joi = require("joi")
const passwordComplexity = require("joi-password-complexity")

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
	ids: [{ type: String }]
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    })
    await user.save()
    return token
}
const User = mongoose.model("User", userSchema)

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    })
    return schema.validate(data)
}

module.exports = {User, validate}
    