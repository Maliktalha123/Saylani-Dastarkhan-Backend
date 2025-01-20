import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Branch_Router from "./routes/Branch_Route.js";
import "dotenv/config";
import City_Router from "./routes/CityManager_Route.js";
import mealRouter from "./routes/meal.js";

const PORT = 4000
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error in connecting database => ", error);
  });
const app = express();
app.use(express.json());
app.use(cors());
 
app.use("/branch", Branch_Router);
app.use("/city-manger", City_Router )
app.use("/meal",mealRouter)
app.use("/", City_Router )

app.get("/",(req,res)=>{
    res.send("Hello World");
})

console.log("Hello World");



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
