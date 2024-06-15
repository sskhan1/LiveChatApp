import mongoose from 'mongoose';

const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log('DB is connected!');
  } catch (err) {
    console.error('DB connection error:', err);
  }
};

export default connectDatabase;
