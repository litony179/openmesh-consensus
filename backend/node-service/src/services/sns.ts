import {
  CreateTopicCommand,
  CreateTopicCommandOutput,
  ListTopicsCommand,
  ListTopicsCommandOutput,
  PublishCommand,
  PublishCommandInput,
  PublishCommandOutput,
  SNSClient,
  SNSClientConfig,
} from "@aws-sdk/client-sns";
import { BadRequestError } from "../errors/bad-request-error";

export class SnsService {
  private static snsClient: SNSClient;
  /**
   * This function will generate a default AWS SNS client
   * @returns {SNSClient}
   */

  static createSnsClient(config: SNSClientConfig): SNSClient {
    if (!SnsService.snsClient) {
      SnsService.snsClient = new SNSClient(config);
    }
    return SnsService.snsClient;
  }

  /**
   * This will list all of tje global sns topics
   */
  static async listAllSnsTopics(
    config: SNSClientConfig
  ): Promise<ListTopicsCommandOutput> {
    const snsClient = SnsService.createSnsClient(config);
    const listTopicsParams = {};
    const listSnsTopicCommand = new ListTopicsCommand(listTopicsParams);
    const listSnsTopicsResponse: ListTopicsCommandOutput = await snsClient.send(
      listSnsTopicCommand
    );

    return listSnsTopicsResponse;
  }

  /**
   * This will create a sns topic
   * @param config - The AWS credentials
   * @param topicName - Name of the desired topic name
   */
  static async createSnsTopic(
    config: SNSClientConfig,
    topicName: string
  ): Promise<{ message: string; topicArn: string }> {
    const snsClient = SnsService.createSnsClient(config);
    const topicNameParams = {
      Name: topicName,
    };

    const extractedTopicNames: string[] = [];

    const topicList = await SnsService.listAllSnsTopics(config);
    let fullTopicArn: string = "";

    if (topicList && topicList.Topics) {
      topicList.Topics.forEach((topic) => {
        const topicArn = topic.TopicArn!;
        fullTopicArn = topicArn;
        const topicArray = topicArn.split(":");
        extractedTopicNames.push(topicArray[topicArray.length - 1]);
      });
    }

    if (extractedTopicNames.find((topic) => topic === topicName)) {
      return {
        message: "Topic name already exists!",
        topicArn: fullTopicArn,
      };
    }

    const createSnsTopicComamnd = new CreateTopicCommand(topicNameParams);

    const createSnsTopicResponse: CreateTopicCommandOutput =
      await snsClient.send(createSnsTopicComamnd);

    const snsTopicResponseString = JSON.stringify(createSnsTopicResponse);
    console.log(snsTopicResponseString);

    return {
      message: snsTopicResponseString,
      topicArn: fullTopicArn ? fullTopicArn : snsTopicResponseString,
    };
  }

  static async publishSnsMessage(
    config: SNSClientConfig,
    params: {
      message: string;
      subject: string;
      topicArn: string;
    }
  ): Promise<PublishCommandOutput | undefined> {
    const snsClient = SnsService.createSnsClient(config);

    const publisSnshMessageParams: PublishCommandInput = {
      Message: params.message,
      Subject: params.subject,
      TopicArn: params.topicArn,
    };

    const publishSnsMessageCommand = new PublishCommand(
      publisSnshMessageParams
    );

    const publishSnsMessageResponse: PublishCommandOutput =
      await snsClient.send(publishSnsMessageCommand);

    if (publishSnsMessageResponse.$metadata.httpStatusCode !== 200) {
      throw new BadRequestError("Failed to publish message");
    }

    return publishSnsMessageResponse;
  }
}
