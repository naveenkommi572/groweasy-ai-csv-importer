import { Request, Response } from "express";
import { parseCSV } from "../services/csvParser";
import { createBatches } from "../utils/batch";
import { mapCRM } from "../services/aiService";

export const uploadCsv = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "CSV file is required",
      });
    }

    // Parse CSV
    const rows = await parseCSV(req.file.buffer);

    // Create batches of 20 rows
    const batches = createBatches(rows, 20);

    const extractedRecords = [];

    for (const batch of batches) {
      const result = await mapCRM(batch);

      extractedRecords.push(...result);
    }

    return res.json({
      success: true,
      totalUploaded: rows.length,
      totalImported: extractedRecords.length,
      totalSkipped: rows.length - extractedRecords.length,
      records: extractedRecords,
    });
  } catch (error) {
    console.error("Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process CSV",
    });
  }
};