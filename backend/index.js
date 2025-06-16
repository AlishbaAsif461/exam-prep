import express from "express";
import Students from "./Models/stu.js";
import mongoose from "mongoose";
import 'dotenv/config'
const app = express();

async function connectToDB(){
  try {
    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log("Connected to DB")
  } catch (error) {
    throw new Error(error)
  }
}
connectToDB()
app.listen(3000, () => {
  console.log("Server listening on port 3000");
  
});
app.get("/test", (req, res) => {
  res.send("Alishba is cootest");
});
app.get("/students", async (req, res) => {
  try {
    const students = await Students.find();
    res.json(students)
  } catch (error) {
    res.status(500).json({message:"Server Error"})
  }
});
