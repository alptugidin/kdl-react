import { Schema, model, models } from "mongoose";

const TagsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  tag: String
});

const Tag = models.Tag || model('Tag', TagsSchema);

export default Tag;