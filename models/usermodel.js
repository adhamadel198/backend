const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  username: {
    type: "String",
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
  profile: {
    type: "String",
  },

  personTypeId: {
    type: "Number",
  },
  topic: ["string"],
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const modelName = "User";
const existingModel = mongoose.models[modelName];

if (existingModel) {
  module.exports = existingModel;
} else {
  const userModel = mongoose.model(modelName, UserSchema);
  module.exports = userModel;
}