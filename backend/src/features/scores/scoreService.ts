import Score, { IScore } from "../../models/Score";

export const getScoreBySBD = async (sbd: string): Promise<IScore | null> => {
  return Score.findOne({ sbd })
    .select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })
    .lean();
};
