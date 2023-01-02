import { Schema, model, models } from "mongoose";

const SerieSchema = new Schema({
  idx: String,
  name: String,
  year: String,
  tags: [],
  aka: [],
  co: Number,
  summary: String,
  summaryLink: String,
  video: String,
  title: String,
});

const Serie = models.Serie || model('Serie', SerieSchema);

export default Serie;