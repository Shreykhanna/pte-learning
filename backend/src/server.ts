import app from "./app";
import dotenv from "dotenv";
import connectDB from "./database/connect";
dotenv.config();
const port = process.env.PORT;

connectDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
