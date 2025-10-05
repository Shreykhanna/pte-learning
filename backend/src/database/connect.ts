import { MongoClient } from "mongodb";

let client: MongoClient;

const connectDB = async () => {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URI as string);
    await client.connect();
    console.log("MongoDB connected");
  }
  return client;
};

export default connectDB;
