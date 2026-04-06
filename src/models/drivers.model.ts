import mongoose from 'mongoose';

const DriversSchema = new mongoose.Schema({
  driverName: {
    type: String,
    required: true,
  },
  plateNumber: {
    type: String,
    required: true,
    unique: true,
  },
  rfidTag: {
    type: String,
    required: true,
    unique: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  vehicleModel: {
    type: String,
    required: true,
  },
  registeredAt: {
    type: String,
    default: new Date().toISOString(),
    required: true,
  },
});

export default mongoose.models.Driver ||
  mongoose.model('Driver', DriversSchema);
