import { Router } from "express";
import { uploadCsv } from "../controllers/importController";
import upload from "../middleware/upload";

const router = Router();

router.post("/", upload.single("file"), uploadCsv);

export default router;