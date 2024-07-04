import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { ObjectRemoverProcessor } from '../automation/processors';

@Injectable()
@Processor('action.remove-object-from-source-image')
export class RemoveObjectFromImageSubscriber {
  constructor(private objectRemoverProcessor: ObjectRemoverProcessor) {}
  @Process()
  async reduceActionSource(
    job: Job<{
      action: string;
      sourceImageId: number
    }>,
  ) {
    switch (job.data.action) {
      case 'remove-object':
        return this.subscribeToRemoveObject(job);
      default:
        return {};
    }
  }

  public async subscribeToRemoveObject(
    job: Job<{
        sourceImageId: number
    }>,
  ) {
    await this.objectRemoverProcessor.processRemoveObjectFromImage(
      job.data.sourceImageId
    );
    await job.progress(100);
  }

}