const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [3, 'Username must be 3 characters or longer.']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [5, 'Password must be 5 characters or longer.']
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'users' })

userSchema.virtual('cPassword')
    .get(function () {
        return this._cPassword;
    })
    .set(function (value) {
        this._cPassword = value;
    })

userSchema.pre('validate', function (next) {
    if (this.password !== this.cPassword) {
        this.invalidate('cPassword', 'Password must match confirm password');
    }
    next();
})

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});


const User = mongoose.model('User', userSchema)
module.exports = User
