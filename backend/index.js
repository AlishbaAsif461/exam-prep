import express from "express";
import Students from "./Models/stu";
const app = express();

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
app.get("/test", (req, res) => {
  res.send("Alishba is cootest");
});
app.get("/students", async (req, res) => {
  try {
    const students = await Students.find();
  } catch (error) {}
});
