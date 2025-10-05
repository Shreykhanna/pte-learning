import { Router } from "express";
import uploadImage from "../../controllers/admin/uploadImage";
import multer from "multer";
const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });
console.log("upload", upload.single("file"));

router.post("/", upload.single("file"), uploadImage);

export default router;
