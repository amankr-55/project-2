import mongoose from 'mongoose';

// Flag to track database connection status
export let isMongoConnected = false;

/**
 * Connect to MongoDB Database
 * If MongoDB is not running locally or credentials are not yet set,
 * the server will still run smoothly in local memory mode.
 */
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 3000, // Timeout fast if Mongo server isn't running
    });

    isMongoConnected = true;
    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    isMongoConnected = false;
    console.warn(`\n[Database Notice] MongoDB not detected locally (${error.message}).`);
    console.log(`💡 The backend is automatically running in Fast In-Memory Mode.`);
    console.log(`💡 To connect to real MongoDB later, paste your MongoDB Atlas URI in backend/.env\n`);
  }
};
