// This file will instantiate all of the different AWS resources it needs for the service
import "dotenv/config";
import { S3ClientConfig } from "@aws-sdk/client-s3";

export const awsConfig = {
  region: process.env.AWS_REGION!,
  endpoint: process.env.LOCALSTACK_HOST_URL!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
};

export const S3Config = {
  region: process.env.AWS_REGION!,
  endpoint: process.env.LOCALSTACK_HOST_URL_S3!,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
};
