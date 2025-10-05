import { Request, Response } from "express";
import connectDB from "../../database/connect";

const addReadAlouds = async (request: Request, response: Response) => {
  const text = request.body.params;
  const client = await connectDB();
  client.connect();
  const db = client.db("pte_practice");
  await db.collection("read-alouds").insertOne({ text });
  client.close();
};
export default addReadAlouds;
