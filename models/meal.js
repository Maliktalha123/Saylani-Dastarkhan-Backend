import mongoose from "mongoose";


const mealSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner']
      },
      Meal_Name:{
        type: String,
      } ,   
    number_of_people: {
      type: Number,
      required: true
    },
    location: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    addedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    branch: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    city: {
      type: String,
      ref: "User",
      required: true
    },
    country: {
      type: String,
      ref: "User",
      required: true
    }
  },
{timestamps: true}
);
  
  const Meal = mongoose.model('Meal', mealSchema);
  export default Meal;
  
  