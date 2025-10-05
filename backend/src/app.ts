import express from "express";
import fillInTheBlanks from "./routes/fillInTheBlanks";
import errorHandler from "./middleware/errorHandler";
import logger from "./middleware/logger";
import cors from "cors";
import uploadImage from "./routes/admin/uploadImage";
import describeImage from "./routes/describeImage";
import addRetellLecture from "./routes/admin/addRetellLecture";
import addReadAloud from "./routes/admin/addReadAlouds";

import retellLecture from "./routes/retellLecture";
import readAloud from "./routes/readAloud";

const app = express();

app.use(express.json());
app.use(logger);
app.use(cors());

app.use("/api/fillintheblanks", fillInTheBlanks);
app.use("/api/retell-lecture", retellLecture);
app.use("/api/read-aloud", readAloud);
app.use("/api/upload", uploadImage);
app.use("/api/describeImage", describeImage);
app.use("/api/admin/retell-lecture", addRetellLecture);
app.use("/api/admin/read-aloud", addReadAloud);

app.use(errorHandler);

export default app;
