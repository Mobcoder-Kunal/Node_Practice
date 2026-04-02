const mongosse = require("mongoose")

const userSchema = new mongosse.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
    
}, {timestamps: true})

const User = mongosse.model("user", userSchema);

module.exports= User