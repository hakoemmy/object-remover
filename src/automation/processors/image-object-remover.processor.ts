import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as fs from "fs";
import { SourceImage } from "../../schemas/source-images.schema";
import { PhotAiService } from "../services/phot-ai.service";

@Injectable()
export class ObjectRemoverProcessor {
  constructor(
    @InjectModel(SourceImage.name)
    private readonly sourceImageModel: Model<SourceImage>,
    private readonly photAiService: PhotAiService
  ) {}

  public async processRemoveObjectFromImage(sourceImageId: number) {
    try {
      const sourceImage = await this.sourceImageModel
        .findOne({
          id: sourceImageId,
        })
        .populate("objectToRemove");

      if (!sourceImage) return;
      const sourceImageUrl = sourceImage.url;
      const objectToRemoveImageUrl = sourceImage.objectToRemove.url;

      const convertedObjectImageToBase64 = await this.convertImageToBase64(
        objectToRemoveImageUrl
      );
      const response = await this.photAiService.removeObjectFromImage(
        sourceImageUrl.replace("storage/", ""),
        sourceImageUrl,
        convertedObjectImageToBase64
      );
 
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  private async convertImageToBase64(imagePath: string): Promise<string> {
    try {
      const image = fs.readFileSync(imagePath);
      return image.toString("base64");
    } catch (error) {
      throw error;
    }
  }
}
