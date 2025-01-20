import express from 'express'
import Meal from '../models/meal.js' 

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const meal = new Meal({
      type: req.body.type,
      number_of_people: req.body.number_of_people,
      location: req.body.location,
      image: req.body.image,
      addedBy: req.body.addedBy,
      branch: req.body.branch,
      city: req.body.city,
      country: req.body.country,
      
    });
    await meal.save();
    res.status(201).json(meal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
    try {
  const {id}=req.body
  const meals = await Meal.find(id);
  res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
    try {
      const meal = await Meal.findById(req.params.id).populate('userId');
      if (!meal) {
        res.status(404).json({ message: 'Meal not found' });
      } else {
        res.json(meal);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
  try {
    const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!meal) {
      res.status(404).json({ message: 'Meal not found' });
    } else {
      res.json(meal);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Meal.findByIdAndRemove(req.params.id);
    res.json({ message: 'Meal deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router