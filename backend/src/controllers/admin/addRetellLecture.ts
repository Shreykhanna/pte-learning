import { Request, Response } from "express";
import connectDB from "../../database/connect";

const addRetellLecture = async (request: Request, response: Response) => {
  console.log("text", request);
  const text = request.body.params;
  const client = await connectDB();
  client.connect();
  const db = client.db("pte_practice");
  await db.collection("retell-lecture").insertOne({ text });
  client.close();
};
export default addRetellLecture;
