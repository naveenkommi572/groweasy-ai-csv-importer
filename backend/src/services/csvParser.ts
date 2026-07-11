import csv from "csv-parser";
import { Readable } from "stream";

export const parseCSV = (buffer: Buffer): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const rows: any[] = [];

    const stream = Readable.from(buffer);

    stream
      .pipe(csv())
      .on("data", (data) => rows.push(data))
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
};