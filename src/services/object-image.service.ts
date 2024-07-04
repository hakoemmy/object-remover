import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ObjectImage } from "../schemas/object-images.schema";

@Injectable()
export class ObjectImageService {
  constructor(
    @InjectModel(ObjectImage.name)
    private readonly objectImageModel: Model<ObjectImage>
  ) {}

  async createOne(data: Partial<ObjectImage>) {
    try {
      return await this.objectImageModel.create(data);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
