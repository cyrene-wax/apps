import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IAdmin extends Document {
  name: string;
  username: string;
  password: string;
  createdAt: string;
}

const AdminSchema = new Schema<IAdmin>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: String, default: () => new Date().toISOString() },
});

const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);

export default Admin;
