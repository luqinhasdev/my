import mongoose from "mongoose";

const digitalEntertainmentSchema = new mongoose.Schema({
  title: String,
  startDate: String,
  endDate: String,
  rating: Number,
  review: String,
});

export default mongoose.model(
  "DigitalEntertainment",
  digitalEntertainmentSchema
);
