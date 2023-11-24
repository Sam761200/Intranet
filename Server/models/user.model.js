const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    gender: {
      type: String,
      trim: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true
      },
      lastname: {
        type: String,
        trim: true
      },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6
    },
    phone: {
        type: String,
        minlength: 8
      },
      birthdate: {
        type: String,
        minlength: 4
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
      photo: {
        type: String,
      },
      category: {
        type: String,
      },
      isAdmin: {
        type: Boolean,
      }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email')
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;