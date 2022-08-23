// serverless.ts

import { AWS } from '@serverless/typescript';

import type { ServerlessCdkPluginConfig } from '@swarmion/serverless-cdk-plugin';

import { MyCdkConstruct } from 'resources/dynamodb';

const serverlessConfiguration: AWS & ServerlessCdkPluginConfig = {
  service: `my-service`,
  frameworkVersion: '*',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
  },

  // Import the plugin in your serverless configuration.
  plugins: ['@swarmion/serverless-cdk-plugin'],

  // Reference your custom aws-cdk construct at the "construct" key. That's it!
  construct: MyCdkConstruct,
  // ...More configuration props
};

module.exports = serverlessConfiguration;
