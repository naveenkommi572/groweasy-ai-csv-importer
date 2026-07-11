import Papa from "papaparse";
import { CsvRow } from "@/types/lead";

export const parseCSV = (
  file: File
): Promise<CsvRow[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });
};