import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { ObjectImage } from "src/schemas/object-images.schema";
import { BaseResV1 } from "../__helpers__";

export class GetObjectImageResDto extends BaseResV1 implements ObjectImage {
  @ApiProperty({
    description: "Id",
  })
  @Expose()
  id: number;
  @ApiProperty({
    description: "Object to remove image url",
  })
  @Expose()
  url: string;
}
