import mongoose from 'mongoose';

const { Schema } = mongoose;

const analyticsSchema = new Schema(
  {
    count: {
      type: Number,
      default: 0,
    },
    link: {
      type: String,
    },
    linkUid: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('analytics', analyticsSchema, 'analytics');
