import mongoose, { Schema, Document } from "mongoose";

export interface IFillInTheBlanks extends Document {
  question: string;
  options: string[];
  answer: string;
}

const FillInTheBlanksSchema: Schema = new Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
});

export const FillInTheBlanksModel = mongoose.model<IFillInTheBlanks>(
  "FillInTheBlanks",
  FillInTheBlanksSchema,
  "filltheblanks"
);
