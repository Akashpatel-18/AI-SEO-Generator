import { Response } from "express";
import * as seoContentService from "./seoContent.service";

export const generate = async (req: any, res: Response) => {
  try {
    const { keyword, topic } = req.body;
    if (!keyword || !topic) {
      return res
        .status(400)
        .json({ success: false, message: "Keyword and Topic are required" });
    }

    const result = await seoContentService.generateSEOContent(
      req.user.id,
      keyword,
      topic
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getHistory = async (req: any, res: Response) => {
  try {
    const history = await seoContentService.getHistory(req.user.id);
    res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
