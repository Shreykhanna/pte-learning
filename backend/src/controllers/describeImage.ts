import { Request, Response } from "express";
import connectDB from "../database/connect";

const describeImage = async (request: Request, response: Response) => {
  try {
    const pagination = parseInt(request.query.index as string);
    const client = await connectDB();
    client.connect();
    const db = client.db("pte_practice");
    const result = await db.collection("describeImage").find().toArray();
    const item = result[pagination];
    let base64Image = null;
    if (item && item?.buffer) {
      base64Image = `data:${
        item.mimetype || "image/png"
      };base64,${item.buffer.toString("base64")}`;
    }

    return response.json({
      ...item,
      image: base64Image, // replace buffer with base64 string
    });
  } catch (error: any) {
    console.log("error", error);
    return response.status(500).json({ error: error.message });
  }
};

export default describeImage;
