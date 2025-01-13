import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Branch_Router from "./routes/Branch_Route.js";
import City_Router from "./routes/CityManager_Route.js";
const PORT = 3000;
const MONGO_URL =
  "mongodb+srv://talhanoormalik0321b:saylani@cluster0.09gmglr.mongodb.net/";
mongoose
  .connect(MONGO_URL)
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

app.get("/",(req,res)=>{
    res.send("Hello World");
})

console.log("Hello World");



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
