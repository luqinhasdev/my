import express from "express";
import DigitalEntertainment from "../models/digitalEntertainment.js";

const router = express.Router();

router.put("/:id", async (req, res) => {
  try {
    const updated = await DigitalEntertainment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updated)
      return res
        .status(404)
        .json({ message: "デジタルエンタテインメントが見つかりません" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: "デジタルエンタテインメントの更新中にエラーが発生しました",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await DigitalEntertainment.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ message: "デジタルエンタテインメントが見つかりません" });
    res.json({ message: "デジタルエンタテインメントは正常に削除されました" });
  } catch (error) {
    res.status(500).json({
      message: "デジタルエンタテインメントの削除中にエラーが発生しました",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const items = await DigitalEntertainment.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: "デジタルエンタテインメントの取得中にエラーが発生しました",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newItem = new DigitalEntertainment(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({
      message: "デジタルエンタテインメントの保存中にエラーが発生しました",
    });
  }
});

export default router;
