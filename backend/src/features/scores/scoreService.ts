import Score, { IScore } from "../../models/Score";

export const getScoreBySBD = async (sbd: string): Promise<IScore | null> => {
  return Score.findOne({ sbd }).lean();
};
