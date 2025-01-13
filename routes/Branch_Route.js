import express from "express";
import Branch from "../models/Branch.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const branches = await Branch.find();
  res.send(branches);
});

router.post("/", async (req, res) => {
  try {
    const { name, location, city } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!location)
      return res.status(400).json({ message: "Location is required" });
    if (!city)
      return res.status(400).json({ message: "City name is required" });

    let branch = new Branch({ name, location, city });
    branch = await branch.save();

    res.status(201).json({ message: "Category added successfully", branch });
  } catch (err) {
    res.status(400).json({ message: err.message, err });
  }
});

export default router;
