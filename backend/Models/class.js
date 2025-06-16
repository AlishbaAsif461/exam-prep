import mongoose, { Schema } from "mongoose";

const class_schema = Schema({
  grade: number,
});
const Class = new mongoose.model(class_schema, "Class");
export default Class;
