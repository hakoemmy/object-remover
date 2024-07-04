import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { ObjectImage } from "src/schemas/object-images.schema";
import { SourceImage } from "src/schemas/source-images.schema";
import { BaseResV1 } from "../__helpers__";
import { GetObjectImageResDto } from "./object-image.res.dto";

export class GetSourceImageResDto extends BaseResV1 implements SourceImage {
  @ApiProperty({
    description: "Id",
  })
  @Expose()
  id: number;
  @ApiProperty({
    description: "Original url of source image",
  })
  @Expose()
  url: string;
  @ApiProperty({
    description: "new url of source image with object removed",
  })
  @Expose()
  imageUrlWithObjectRemoved: string;
  @ApiProperty({
    description: "Image that was removed from original image",
  })
  @Expose()
  @Transform((n) => (n.value ? new GetObjectImageResDto(n.value) : undefined))
  objectToRemove: GetObjectImageResDto;
}
