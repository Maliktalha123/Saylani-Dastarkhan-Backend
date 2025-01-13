import mongoose from "mongoose";

const cityManagerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  location: { type: String, required: true },
});

const CityManager = mongoose.model("CityManager", cityManagerSchema);
export default CityManager;
