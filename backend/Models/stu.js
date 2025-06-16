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
  feeStatus: {
    type: String,
    enum: ["PAID", "UNPAID"],
    default: "UNPAID"
  },
  Class: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const Students = mongoose.model("Students", stu_schema); //collection in mongoDB
export default Students;
