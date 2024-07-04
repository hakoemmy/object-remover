import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
import { EVK } from "../../__helpers__";

@Injectable()
export class PhotAiService {
  constructor(private readonly configService: ConfigService) {}
  async removeObjectFromImage(
    inputFileName: string,
    inputImageUrl: string,
    base64MaskImage: string
  ): Promise<any> {
    try {
      console.log("======removeObjectFromImage====", inputFileName);
      console.log("======removeObjectFromImage====", inputImageUrl);
      const headers = {
        "x-api-key": this.configService.get(EVK.PHOT_AI_API_KEY),
        "Content-Type": "application/json",
      };

      const data = {
        file_name: inputFileName,
        input_image_link: inputImageUrl,
        mask_image: base64MaskImage,
      };

      const response = await axios.post(
        this.configService.get(EVK.PHOT_AI_API_URL),
        data,
        { headers }
      );
      // Next Steps:
      // Get returned image with object removed and update imageUrlWithObjectRemoved in SourceImage

      return response.data;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
