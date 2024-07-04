import { Module } from "@nestjs/common";
import { ObjectRemoverProcessor } from "./processors";
import { MongooseModule } from "@nestjs/mongoose";
import { SourceImage, SourceImagesSchema } from "../schemas/source-images.schema";
import { PhotAiService } from "./services/phot-ai.service";

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: SourceImage.name,
        schema: SourceImagesSchema,
      }
    ]),
  ],
  providers: [ObjectRemoverProcessor, PhotAiService],
  exports: [ObjectRemoverProcessor],
})
export class AutomationModule {}
