import mongoose, { Schema, Document } from "mongoose";

export interface IReportCache extends Document {
  reportType: "score_distribution" | "top_group_a";
  data: any;
  lastCalculatedAt: Date;
}

const ReportCacheSchema = new Schema<IReportCache>(
  {
    reportType: {
      type: String,
      required: true,
      unique: true,
      enum: ["score_distribution", "top_group_a"],
    },
    data: {
      type: Schema.Types.Mixed,
      required: true,
    },
    lastCalculatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IReportCache>("ReportCache", ReportCacheSchema);
