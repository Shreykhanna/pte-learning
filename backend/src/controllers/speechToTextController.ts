import { Request, Response } from "express";
import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const speechToTextController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file uploaded" });
    }

    const response = await client.audio.transcriptions.create({
      file: fs.createReadStream(req.file.path),
      model: "gpt-4o-transcribe",
    });

    // Delete temp file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    return res.json({ text: response.text });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export default speechToTextController;
