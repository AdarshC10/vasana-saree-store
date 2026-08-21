import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'userModel'
  },
  userModel: {
    type: String,
    required: true,
    enum: ['Customer', 'Admin']
  },
  tokenHash: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: '7d' } // Auto-purge expired refresh tokens after 7 days
  },
  isRevoked: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model('RefreshToken', refreshTokenSchema);
