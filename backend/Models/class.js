import mongoose, { Schema } from "mongoose";

const class_schema = Schema({
  grade: Number,
});
const Class = mongoose.model("Class", class_schema);
export default Class;
