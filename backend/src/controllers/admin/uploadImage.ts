import { Response, Request } from "express";
import connectDB from "../../database/connect";

const uploadImage = async (request: Request, response: Response) => {
  const file = request.file;
  if (!file) {
    return response.status(400).send("No file uploaded.");
  }
  const client = await connectDB();
  client.connect();
  const db = client.db("pte_practice");
  await db.collection("describeImage").insertOne(file);
  console.log("File uploaded successfully:", file);
  response.send("File uploaded successfully.");
  client.close();
};

export default uploadImage;
