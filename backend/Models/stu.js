import mongoose, { Schema } from "mongoose";

const stu_schema = Schema({
  name: {
    type: String,
    required: true,
  },
  phno: Number,
  age: Number,
  subjects: {
    type: [String],
    required: true,
  },
  feeStatus: "paid" | "unpaid",
  Class: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const Students = new mongoose.model(stu_schema, "Students"); //collection in mongoDB
export default Students;
