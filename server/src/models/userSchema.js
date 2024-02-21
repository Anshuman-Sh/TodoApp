const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, min: 5, max: 20 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8 },
  },
  { timestamps: true }
);

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(this.password, 8);
  }
  return next();
});

const User = mongoose.model("users", userSchema);

module.exports = User;
