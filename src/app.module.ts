import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { configModuleOptions } from "./app.module.config";
import { BullModule } from "@nestjs/bull";
import { EVK } from "./__helpers__";
import { AutomationModule } from "./automation/automation.module";
import {
  SourceImage,
  SourceImagesSchema,
} from "./schemas/source-images.schema";
import {
  ObjectImage,
  ObjectImagesSchema,
} from "./schemas/object-images.schema";
import { MulterModule } from "@nestjs/platform-express";
import { storageOptions } from "multer.config";
import { SourceImageService } from "./services/source-image.service";
import { ObjectImageService } from "./services/object-image.service";
import { RemoveObjectFromImagePublisher } from "./pubsub/remove-object-from-image.publisher";
import { RemoveObjectFromImageSubscriber } from "./pubsub/remove-object-from-image.subscriber";

@Module({
  imports: [
    MulterModule.register(storageOptions),
    ConfigModule.forRoot(configModuleOptions),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSSWORD}@${process.env.DB_NAME}/?retryWrites=true&w=majority`
    ),
    EventEmitterModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get(EVK.REDIS_HOST),
          port: configService.get(EVK.REDIS_PORT),
          lazyConnect: false,
          showFriendlyErrorStack: true,
          maxRetriesPerRequest: 5,
          retryStrategy(times) {
            console.warn(`Retrying To Connect To Redis: attempt ${times}`);
            return Math.min(times * 500, 2000);
          },
        },
      }),
    }),
    MongooseModule.forFeature([
      {
        name: SourceImage.name,
        schema: SourceImagesSchema,
      },
      {
        name: ObjectImage.name,
        schema: ObjectImagesSchema,
      },
    ]),
    AutomationModule,
    BullModule.registerQueue({
      name: "action.remove-object-from-source-image",
    }),
  ],
  controllers: [AppController],
  providers: [
    SourceImageService,
    ObjectImageService,
    RemoveObjectFromImagePublisher,
    RemoveObjectFromImageSubscriber,
  ],
})
export class AppModule {}
