import mongoose from 'mongoose';

const RfidTagSchema = new mongoose.Schema({
  rfidTag: {
    type: String,
    required: true,
    unique: true,
  },

  status: {
    type: String,
    enum: ['available', 'assigned'],
    default: 'available',
  },
});

export default mongoose.models.RfidTag ||
  mongoose.model('RfidTag', RfidTagSchema);
