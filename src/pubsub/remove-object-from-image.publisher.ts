import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";

@Injectable()
export class RemoveObjectFromImagePublisher {
  constructor(
    @InjectQueue("action.remove-object-from-source-image") private queue: Queue
  ) {}

  public async publishToStartObjectRemoverProcess(sourceImageId: number) {
    this.queue.add(
      { action: "remove-object", sourceImageId },
      { removeOnComplete: true }
    );
  }
}
