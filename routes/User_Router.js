import express from "express";
import Users from "../models/User.js";

const router = express.Router();

// Add user
router.post("/", async (req, res) => {
  try {
    const { name, city, password, role } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!city) return res.status(400).json({ message: "City is required" });
    if (!password)
      return res.status(400).json({ message: "Password is required" });
    if (!role) return res.status(400).json({ message: "Role is required" });

    let user = new Users({
      name,
      city,
      password,
      role,
      country: req.body.country,
      location: req.body.location,
    });
    user = await user.save();
    res.status(201).json({ message: "User added successfully", user });
  } catch (err) {
    res.status(400).json({ message: err.message, err });
  }
});

// Get all users
router.get("/", async (req, res) => {
  const { role, city } = req.query;

  const query = {};
  if (role) query.role = { $eq: role };
  if (city) query.city = { $eq: city };

  const users = await Users.aggregate([
    {
      $match: query,
    },
    {
      $sort: {
        totalResult: -1,
      },
    },
  ]);

  res.status(200).send(users);
});

// Get user by ID
router.get("/:id", async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).send(user);
});

// Update user
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedUser = await Users.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message, err });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await Users.findByIdAndDelete(id);

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (err) {
    res.status(400).json({ message: err.message, err });
  }
});

export default router;