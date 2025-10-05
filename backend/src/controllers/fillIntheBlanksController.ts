import { Response, Request } from "express";
import connectDB from "../database/connect";
const fillIntheBlanks = async (request: Request, response: Response) => {
  console.log("Request received at /api/fillintheblanks");

  try {
    console.log("Query params:", request.query);
    const pagination = parseInt(request.query.index as string) || 0; // default = 0
    console.log("Pagination:", pagination);
    const client = await connectDB();
    const db = client.db("pte_practice");
    const result = await db.collection("filltheblanks").find().toArray();
    console.log("result", result[pagination]);
    return response.json(result[pagination]);
  } catch (error: any) {
    console.log("Error", error);
    return response.status(500).json({ error: error.message });
  }
};

export default fillIntheBlanks;
