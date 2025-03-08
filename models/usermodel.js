const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, requied: true },
        password: { type: String },
        role: {
            type: String,
            default: "user"
        },
        accessToken: { type: String },
    }, {
    timestamps: true
}
) ;

module.exports = mongoose.model('User', userSchema);