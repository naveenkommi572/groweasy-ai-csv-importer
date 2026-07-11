import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import importRoutes from "./routes/importRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "GrowEasy AI Import API Running ",
  });
});

app.use("/api/import", importRoutes);

export default app;