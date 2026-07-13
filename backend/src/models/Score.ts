import mongoose, { Document, Schema } from "mongoose";

export interface IScore extends Document {
  sbd: string;
  toan: number | null;
  ngu_van: number | null;
  ngoai_ngu: number | null;
  vat_li: number | null;
  hoa_hoc: number | null;
  sinh_hoc: number | null;
  lich_su: number | null;
  dia_li: number | null;
  gdcd: number | null;
  ma_ngoai_ngu: string | null;
}

const ScoreSchema: Schema = new Schema(
  {
    sbd: { type: String, required: true, unique: true, index: true },
    toan: { type: Number, default: null },
    ngu_van: { type: Number, default: null },
    ngoai_ngu: { type: Number, default: null },
    vat_li: { type: Number, default: null },
    hoa_hoc: { type: Number, default: null },
    sinh_hoc: { type: Number, default: null },
    lich_su: { type: Number, default: null },
    dia_li: { type: Number, default: null },
    gdcd: { type: Number, default: null },
    ma_ngoai_ngu: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);

const Score = mongoose.model<IScore>("Score", ScoreSchema);

export default Score;
