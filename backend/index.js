import express from "express";
import Students from "./Models/stu.js";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(cors({
  origin: "http://localhost:3000",
}));

async function connectToDB() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Connected to DB");
  } catch (error) {
    throw new Error(error);
  }
}
connectToDB();
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
app.get("/test", (req, res) => {
  res.send("Alishba is cootest");
});
app.get("/students", async (req, res) => {
  try {
    const students = await Students.find();
    console.log(students);
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
app.post("/add-student", async (req, res) => {
  try {
    const new_student = new Students({
      name: req.body.name,
      phno: req.body.phno,
      age: req.body.age,
      subjects: req.body.subjects,
      feeStatus: req.body.feeStatus,
      Class: req.body.Class,
    });
    await new_student.save();
    res.json({ message: "New Student added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error Occured" });
  }
});
app.delete("/delete-student/:id", async (req, res) => {
  try {
    const StudentId = req.params.id;
    const deletedStudent = await Students.findByIdAndDelete(StudentId);
    if (!deletedStudent) {
      return res.json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successsfully" });
  } catch (error) {
    console.log(error);
    res.json({ error: "Server error occured" });
  }
});
app.patch("/update-student/:id", async (req, res) => {
  const StudentId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedStudent = await Students.findByIdAndUpdate(
      StudentId,
      updatedData,
      { new: true }
    ); //The { new: true } option ensures that the updated document is returned.
    if (!updatedData) {
      return res.json({ message: "Student not found" });
    }
    res.json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {}
  console.log(error);
  res.json({ error: "Server error occured" });
});
