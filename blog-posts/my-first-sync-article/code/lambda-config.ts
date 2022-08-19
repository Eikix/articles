// myLambda/config.ts

import { getHandlerPath, LambdaFunction } from '@swarmion/serverless-helpers';

import { getCdkProperty } from 'resources/dynamodb';

const config: LambdaFunction = {
  environment: {
    MY_TABLE_NAME: getCdkProperty('dynamodbName'),
  },
  handler: getHandlerPath(__dirname),
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Resource: getCdkProperty('dynamodbArn'),
      Action: ['dynamodb:PutItem'],
    },
  ],
  iamRoleStatementsInherit: true,
  // more configuration
};

export default config;
