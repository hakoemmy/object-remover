import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import mongoose, { HydratedDocument } from "mongoose";
import { autoIncrement } from "mongoose-plugin-autoinc";
import { SourceImage } from "./source-images.schema";

@Schema({
  timestamps: true,
})
export class ObjectImage {
  @Prop({
    unique: true,
  })
  id: number;
  @Prop({ required: true })
  url: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "SourceImage" })
  @Type(() => SourceImage)
  source?: SourceImage;
}

export const ObjectImagesSchema = SchemaFactory.createForClass(
  SourceImage
).plugin(autoIncrement, {
  model: "ObjectImage",
  field: "id",
  startAt: 1,
  incrementBy: 1,
});
