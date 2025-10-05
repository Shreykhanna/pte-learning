import { Response, Request } from "express";
import connectDB from "../database/connect";

const retellLecture = async (request: Request, response: Response) => {
  try {
    console.log("Query params:", request.query);
    const pagination = parseInt(request.query.index as string) || 0; // default = 0
    console.log("Pagination:", pagination);
    const client = await connectDB();
    const db = client.db("pte_practice");
    const result = await db.collection("retell-lecture").find().toArray();
    console.log("result", result[pagination]);
    return response.json(result[pagination]);
  } catch (error: any) {
    console.log("Error", error);
    return response.status(500).json({ error: error.message });
  }
};

export default retellLecture;
