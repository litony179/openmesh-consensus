import {
  CreateQueueCommand,
  CreateQueueCommandInput,
  CreateQueueCommandOutput,
  GetQueueAttributesCommandOutput,
  QueueAttributeName,
  ReceiveMessageCommand,
  ReceiveMessageCommandInput,
  SQSClient,
  SQSClientConfig,
} from "@aws-sdk/client-sqs";
export class SqsService {
  private static sqsClient: SQSClient;

  static createSqsClient(config: SQSClientConfig): SQSClient {
    if (!SqsService.sqsClient) {
      SqsService.sqsClient = new SQSClient(config);
    }

    return SqsService.sqsClient;
  }

  static async createSqsQueue(
    config: SQSClientConfig,
    queueName: string,
    attributes: {
      delaySeconds: string;
      messageRetentionPeriod: string; // 7 days
      receiveMessageWaitTimeSeconds: string;
    }
  ): Promise<string | undefined> {
    const sqsClient = SqsService.createSqsClient(config);

    const createSqsQueueParams: CreateQueueCommandInput = {
      QueueName: queueName,
      Attributes: {
        DelaySeconds: attributes.delaySeconds,
        MessageRetentionPeriod: attributes.messageRetentionPeriod,
        ReceiveMessageWaitTimeSeconds: attributes.receiveMessageWaitTimeSeconds,
      },
    };

    console.log(createSqsQueueParams);

    const createSqsQueueCommand = new CreateQueueCommand(createSqsQueueParams);

    const createSqsQueueResponse: CreateQueueCommandOutput =
      await sqsClient.send(createSqsQueueCommand);

    // console.log(createSqsQueueResponse);

    return createSqsQueueResponse.QueueUrl;
  }

  static async receiveQueueMessage(
    config: SQSClientConfig,
    queueUrl: string,
    params: {
      attributeNames: QueueAttributeName[];
      maxNumberOfMessages?: number;
      waitTimeSeconds?: number;
    }
  ) {
    const sqsClient = SqsService.createSqsClient(config);

    const receiveQueueMessageParams: ReceiveMessageCommandInput = {
      QueueUrl: queueUrl,
      AttributeNames: params.attributeNames,
      MaxNumberOfMessages: params.maxNumberOfMessages,
      WaitTimeSeconds: params.waitTimeSeconds,
    };

    const receiveQueueMessageCommand = new ReceiveMessageCommand(
      receiveQueueMessageParams
    );

    const receiveQueueMessageResponse = await sqsClient.send(
      receiveQueueMessageCommand
    );

    return receiveQueueMessageResponse;
  }
}
