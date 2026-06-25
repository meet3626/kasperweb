const mongoose = require('mongoose');
const argon2 = require('argon2');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  permissions: {
    dashboard: { type: Boolean, default: false },
    users: { type: Boolean, default: false },
    newsletter: { type: Boolean, default: false },
    settings: { type: Boolean, default: false },
    manage_admins: { type: Boolean, default: false },
  },
  role: {
    type: String,
    enum: ['Super Admin', 'Editor'],
    default: 'Editor'
  },
  mfaEnabled: {
    type: Boolean,
    default: false
  },
  mfaSecret: {
    type: String
  }
}, { timestamps: true });

// Hash password before saving
adminSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await argon2.hash(this.password);
});

// Method to verify password
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await argon2.verify(this.password, enteredPassword);
};

module.exports = mongoose.model('Admin', adminSchema);
