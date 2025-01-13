import express from "express";
import CityManager from "../models/CityManager.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const cityManagers = await CityManager.find();
  res.send(cityManagers);
});

router.post("/", async (req, res) => {
  try {
    const { name, location, city, country } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!location)
      return res.status(400).json({ message: "Location is required" });
    if (!city)
      return res.status(400).json({ message: "City name is required" });
    if (!country)
      return res.status(400).json({ message: "Country name is required" });

    let cityManager = new CityManager({ name, location, city, country });

    cityManager = await cityManager.save();

    res
      .status(201)
      .json({ message: "City Manager added successfully", cityManager });
  } catch (err) {
    res.status(400).json({ message: err.message, err });
  }
});

export default router;
