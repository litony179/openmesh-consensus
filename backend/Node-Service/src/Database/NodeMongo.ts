import { MongoClient, MongoClientOptions } from 'mongodb';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';

// Define a hybrid type combining options from both mongoose and mongodb
interface HybridConnectOptions extends MongoClientOptions {
  useNewUrlParser?: boolean;
  useUnifiedTopology?: boolean;
}

export const connectToDatabase = async (): Promise<void> => {
  try {
    const options: HybridConnectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    const client = await MongoClient.connect(MONGODB_URI, options);

    // Use the client to create a mongoose connection
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Error connecting to MongoDB:', err);
      process.exit(1);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Disconnected from MongoDB');
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
};
