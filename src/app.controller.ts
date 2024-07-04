import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiResponse } from "@nestjs/swagger";
import { UploadImageResDto } from "./dtos/image-upload.res.dto";
import { RemoveObjectFromImagePublisher } from "./pubsub/remove-object-from-image.publisher";
import { ObjectImageService } from "./services/object-image.service";
import { SourceImageService } from "./services/source-image.service";

@Controller()
export class AppController {
  constructor(
    private readonly sourceImageService: SourceImageService,
    private readonly objectImageService: ObjectImageService,
    private removeObjectFromImagePublisher: RemoveObjectFromImagePublisher
  ) {}

  @ApiResponse({
    type: UploadImageResDto,
    status: HttpStatus.OK,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Object removal from image request',
    schema: {
      type: 'object',
      properties: {
        sourceImage: {
          type: 'string',
          format: 'binary',
        },
        objectToRemove: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post("remove-object-in-image")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "sourceImage", maxCount: 1 },
      { name: "objectToRemove", maxCount: 1 },
    ])
  )
  async uploadFile(
    @UploadedFiles()
    files: {
      sourceImage?: Express.Multer.File[];
      objectToRemove?: Express.Multer.File[];
    }
  ) {
    const result = this.handleFileUpload(files);

    // Save Source and Object Image
    const createdImageObj = await this.objectImageService.createOne({
      url: result.objectToRemove[0],
    });
    const createdSourceImage = await this.sourceImageService.createOne({
      url: result.sourceImage[0],
      objectToRemove: createdImageObj,
    });

    // Offload Removing Object from Source Image to Redis/BullMQ message broker, add request to the queue

    await this.removeObjectFromImagePublisher.publishToStartObjectRemoverProcess(
      createdSourceImage.id
    );

    return new UploadImageResDto({
      message:
        "Replacing object has started, it will take sometime for the process to finish.",
    });
  }

  private handleFileUpload(files: {
    sourceImage?: Express.Multer.File[];
    objectToRemove?: Express.Multer.File[];
  }): { [key: string]: string[] } {
    const uploadResult: { [key: string]: string[] } = {};

    Object.keys(files).forEach((key) => {
      const fileArray = files[key];
      const savedFiles: string[] = [];

      fileArray.forEach((file) => {
        const filePath = `${file.path}`;
        savedFiles.push(filePath);
      });

      uploadResult[key] = savedFiles;
    });

    return uploadResult;
  }
}
