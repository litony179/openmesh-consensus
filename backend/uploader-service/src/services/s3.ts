import {
  CreateBucketCommand,
  CreateBucketCommandInput,
  HeadBucketCommand,
  HeadBucketCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
  GetObjectCommand,
  GetObjectCommandInput,
  S3Client,
  S3ClientConfig,
} from "@aws-sdk/client-s3";
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";

export const awsS3Client = (() => {
  let s3Client: S3Client;

  const createS3Client = (config: S3ClientConfig): S3Client => {
    if (!s3Client) {
      s3Client = new S3Client(config);
    }

    return s3Client;
  };

  const checkBucketExists = async (
    config: S3ClientConfig,
    bucketName: string
  ): Promise<boolean> => {
    const s3Client = createS3Client(config);

    const checkBucketExistsInput: HeadBucketCommandInput = {
      Bucket: bucketName,
    };

    const checkBucketExistsCommand = new HeadBucketCommand(
      checkBucketExistsInput
    );

    try {
      await s3Client.send(checkBucketExistsCommand);
      return true;
    } catch (error: any) {
      if (error["$metadata"].httpStatusCode === 404) {
        return false;
      }
      throw error;
    }
  };

  const createS3Bucket = async (config: S3ClientConfig, bucketName: string) => {
    const s3Client = createS3Client(config);

    const existingS3Buckets = await checkBucketExists(config, bucketName);
    console.log("This is the existing buckets: ", existingS3Buckets);

    const createS3BucketInput: CreateBucketCommandInput = {
      Bucket: bucketName,
    };

    if (existingS3Buckets === false) {
      const createS3BucketCommand = new CreateBucketCommand(
        createS3BucketInput
      );
      const createS3BucketResponse = await s3Client.send(createS3BucketCommand);
      console.log("This is the response: ", createS3BucketResponse);
      if (!createS3BucketResponse.Location) {
        throw new BadRequestError("There was an error creating the bucket");
      }
      return createS3BucketResponse.Location;
    }
    return bucketName;
  };

  const uploadFile = async (
    config: S3ClientConfig,
    file: any,
    uploadFileParams: {
      bucketName: string;
      key: string;
      contentType: string;
    }
  ) => {
    const s3Client = createS3Client(config);

    const uploadFileCommand: PutObjectCommandInput = {
      Bucket: uploadFileParams.bucketName,
      Body: file.buffer,
      Key: uploadFileParams.key,
      ContentType: uploadFileParams.contentType,
    };

    const putItemCommand = new PutObjectCommand(uploadFileCommand);
    const uploadedImageResponse = await s3Client.send(putItemCommand);
    console.log(uploadedImageResponse);
    return uploadedImageResponse;
  };

  const retrieveByFileName = async (
    config: S3ClientConfig,
    bucketName: string,
    fileName: string
  ) => {
    const s3Client = createS3Client(config);
    const getObjectCommandInput: GetObjectCommandInput = {
      Bucket: bucketName,
      Key: fileName,
    };

    const getObjectCommand = new GetObjectCommand(getObjectCommandInput);
    const retreiveFileResponse = s3Client.send(getObjectCommand);

    if (!retreiveFileResponse) {
      throw new NotFoundError("The file that you are looking for is not found");
    }

    return retreiveFileResponse;
  };

  return {
    createS3Bucket,
    createS3Client,
    uploadFile,
    checkBucketExists,
  };
})();
