import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SourceImage } from "../schemas/source-images.schema";

@Injectable()
export class SourceImageService {
  constructor(
    @InjectModel(SourceImage.name)
    private readonly sourceImageModel: Model<SourceImage>
  ) {}

  async createOne(data: Partial<SourceImage>) {
    try {
      return await this.sourceImageModel.create(data);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
