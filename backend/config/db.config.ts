import mongoose from "mongoose";

const connectDB = async () => {
  const URI = process.env.MONGODB_CONNECTION_STRING;

  if (!URI) throw new Error("DB URI not found");

  await mongoose.connect(`${URI}/Vaults`).then(() => {
    console.log("DB Connected!");
  });
};

export default connectDB;
