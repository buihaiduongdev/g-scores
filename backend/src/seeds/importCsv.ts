import fs from "fs";
import path from "path";
import csv from "csv-parser";
import dotenv from "dotenv";
import { AnyBulkWriteOperation } from "mongoose";
import Score, { IScore } from "../models/Score";
import connectDB from "../config/database";

dotenv.config();

let CSV_FILE_PATH = process.argv[2] || process.env.CSV_FILE_PATH;

if (!CSV_FILE_PATH) {
  CSV_FILE_PATH = path.resolve(__dirname, "dataset/diem_thi_thpt_2024.csv");
} else {
  CSV_FILE_PATH = path.resolve(process.cwd(), CSV_FILE_PATH);
}

if (!fs.existsSync(CSV_FILE_PATH)) {
  console.error(`Error: CSV file not found at ${CSV_FILE_PATH}`);
  console.error("Usage: npx tsx src/seeds/importCsv.ts <path-to-csv>");
  process.exit(1);
}
const BATCH_SIZE = 10000;

const parseScore = (value: string): number | null => {
  if (!value || value.trim() === "") return null;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? null : parsed;
};

const parseString = (value: string): string | null => {
  if (!value || value.trim() === "") return null;
  return value.trim();
};

const importData = async () => {
  await connectDB();

  //skip if data already exists
  const existingCount = await Score.countDocuments();
  if (existingCount > 0) {
    console.log(
      `Seed skipped: ${existingCount} documents already exist in 'scores' collection.`,
    );
    process.exit(0);
  }

  console.log("Starting CSV import process. This may take a few minutes...");

  let batch: AnyBulkWriteOperation<IScore>[] = [];
  let totalProcessed = 0;
  let totalInserted = 0;

  const stream = fs.createReadStream(CSV_FILE_PATH).pipe(csv());

  for await (const row of stream) {
    totalProcessed++;

    const scoreDoc = {
      sbd: row.sbd,
      toan: parseScore(row.toan),
      ngu_van: parseScore(row.ngu_van),
      ngoai_ngu: parseScore(row.ngoai_ngu),
      vat_li: parseScore(row.vat_li),
      hoa_hoc: parseScore(row.hoa_hoc),
      sinh_hoc: parseScore(row.sinh_hoc),
      lich_su: parseScore(row.lich_su),
      dia_li: parseScore(row.dia_li),
      gdcd: parseScore(row.gdcd),
      ma_ngoai_ngu: parseString(row.ma_ngoai_ngu),
    };

    batch.push({
      insertOne: {
        document: scoreDoc as unknown as IScore,
      },
    });

    if (batch.length >= BATCH_SIZE) {
      try {
        const result = await Score.bulkWrite(batch, { ordered: false });
        totalInserted += result.insertedCount;
      } catch (error: any) {
        if (error.code === 11000) {
          totalInserted += error.insertedCount || 0;
        } else {
          console.error(
            `Batch insert error at row ${totalProcessed}:`,
            error.message,
          );
        }
      }

      console.log(
        `Processed: ${totalProcessed} rows | Inserted: ${totalInserted} records`,
      );
      batch = [];
    }
  }

  if (batch.length > 0) {
    try {
      const result = await Score.bulkWrite(batch, { ordered: false });
      totalInserted += result.insertedCount;
    } catch (error: any) {
      if (error.code === 11000) {
        totalInserted += error.insertedCount || 0;
      } else {
        console.error("Final batch insert error:", error.message);
      }
    }
  }

  console.log("---------------------------------------------------");
  console.log(`Import completed. Total CSV rows read: ${totalProcessed}`);
  console.log(
    `Total records successfully inserted into MongoDB: ${totalInserted}`,
  );

  const finalCount = await Score.countDocuments();
  console.log(`Current total documents in 'scores' collection: ${finalCount}`);
  console.log("---------------------------------------------------");

  process.exit(0);
};

importData().catch((err) => {
  console.error("Unhandled error during import:", err);
  process.exit(1);
});
