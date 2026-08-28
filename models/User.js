const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // ek email sirf ek dafa register ho sakti hai
      lowercase: true,
    },
    password: {
      type: String,
      required: true, // ye hamesha hashed (encrypted) store hoga
    },
    phone: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"], // sirf inhi 2 values allowed hain
      default: "user",
    },
  },
  { timestamps: true }
);

// Save hone se pehle password ko automatically hash kar do
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // agar password change nahi hua to skip karo

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Login ke waqt password check karne ke liye helper function
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);