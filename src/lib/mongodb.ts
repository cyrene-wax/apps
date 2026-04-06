import mongoose from 'mongoose';

async function connectToDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  await mongoose.connect(MONGODB_URI, {
    dbName: 'appsdb',
    bufferCommands: true,
  });

  return mongoose;
}

export default connectToDatabase;
