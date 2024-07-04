import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Type } from "class-transformer";
import { autoIncrement } from "mongoose-plugin-autoinc";
import { ObjectImage } from "./object-images.schema";

@Schema({
  timestamps: true,
})
export class SourceImage {
  @Prop({
    unique: true,
  })
  id: number;

  @Prop({ required: true })
  url: string;

  @Prop()
  imageUrlWithObjectRemoved: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "ObjectImage" })
  @Type(() => ObjectImage)
  objectToRemove: ObjectImage;
}

export const SourceImagesSchema = SchemaFactory.createForClass(
  SourceImage
).plugin(autoIncrement, {
  model: "SourceImage",
  field: "id",
  startAt: 1,
  incrementBy: 1,
});
