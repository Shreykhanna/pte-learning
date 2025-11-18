import { Router } from "express";
import multer from "multer";
import speechToText from "../controllers/speechToTextController";
const upload = multer({ dest: "uploads/" });

const router = Router();
router.post("/", upload.single("audio"), speechToText);
export default router;
