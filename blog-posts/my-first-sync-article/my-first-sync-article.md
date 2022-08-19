---
published: false
title: 'Serverless Framework and AWS CDK: The ultimate typescript Serverless stack'
cover_image: 'https://files.slack.com/files-pri/T7RNRLR3P-F03S45QR7PH/image.png'
description: 'Combine Serverless Framework and the AWS Cloud Development Kit seamlessly using Serverless plugins.'
tags: serverless, awscdk, aws, typescript
series:
canonical_url:
---

As a software engineer, choosing a stack or framework to work with is hard. Take frontend developers for example. They have been argueing over which framework is the best for years. Yet, to this day, it's hard to say React has won (although it is safe to say Angular is loosing 🤒). The serverless community faces this struggle as well. I've been using Serverless Framework along with Typescript for half a year now to develop cloud native applications. In my experience, it's mostly been a breeze - mostly 🥺.

## TL;DR

You build serverless apps, your language of choice is Typescript. You're assessing which tech stack & tool will enable you to develop better quality applications for your end users. Coupling [Serverless Framework](https://www.serverless.com/framework) and the [AWS Cloud Development Kit](https://github.com/aws/aws-cdk) forms one of the best stacks to reliably and quickly build high-value cloud native apps.

Most compelling pros:

- 👷 Build a state-of-the-art serverless app by writing your application's logic and infrastructure as code in the same repository (in typescript 🧞‍♂️).

- 🍭 Easily create AWS resources thanks to the AWS CDK's awesome DevX.

- 🏗 Benefit from only one deployment process for the entire app handled by Serverless Framework.

How does it work?

1. Build your cloud native application using Serverless Framework.

2. Create non-lambda AWS resources (DynamoDB tables, SQS queues, EventBridge's event buses, etc.) using the [aws-cdk-lib](https://www.npmjs.com/package/aws-cdk-lib) (the aws-cdk v2).

3. Leverage Serverless Framework's powerful plugin ecosystem and install the [@swarmion/serverless-cdk-plugin](https://www.npmjs.com/package/@swarmion/serverless-cdk-plugin). Check out [our github open source repository](https://github.com/swarmion/swarmion/tree/main/packages/serverless-cdk-plugin)!

4. Reference your aws-cdk construct in your Serverless framework configuration file.

5. That's it! Serverless Framework seamlessly provisions these resources on deploy.

```ts
// code/serverless-config.ts

// serverless.ts

import { AWS } from '@serverless/typescript';

import type { ServerlessCdkPluginConfig } from '@swarmion/serverless-cdk-plugin';

import { OrchestratorDynamodb } from 'resources/dynamodb';

const serverlessConfiguration: AWS & ServerlessCdkPluginConfig = {
  service: `${projectName}-orchestrator`, // Keep it short to have role name below 64
  frameworkVersion,
  configValidationMode: 'error',
  // Import the plugin in your serverless configuration.
  plugins: ['@swarmion/serverless-cdk-plugin'],

  // Reference your custom aws-cdk construct at the "construct" key. That's it!
  construct: OrchestratorDynamodb,
  // ...More configuration props
};

module.exports = serverlessConfiguration;
```

## Building high quality Serverless apps

**Writing your application's logic and infrastructure as code in the same repository and language feels really good**. Nevertheless, have you ever tried to provision a DynamoDB table, a SQS queue or an EventBus with Serverless Framework? Being lambda-centric by design, this framework does not provision other AWS resources out-of-the-box for you.

From there, you have two options:

1. Handling the deployment of your other resources separately, for instance using the AWS CDK. [Sebastian Bille](https://dev.to/tastefulelk) wrote [a cool article](https://dev.to/aws-builders/combining-serverless-framework-aws-cdk-1dg0) about this subject. The main consequence of this approach is having two separate stacks that deploy independently. A situation might arise where one of the two deployment fails. Having only one deployment process for your application solves this downside.

2. Have Serverless Framework provision your resources as part of its deployment cycle. The trade-off is having to write vanilla Cloud Formation. If you've never done it before, believe me, it's a DevX faux-pas 🙅. Thankfully, [Fred Barthelet](https://dev.to/fredericbarthelet) wrote [an awesome article](https://dev.to/kumo/serverless-framework-aws-cdk-1dnf) on how to replace vanilla Cloud Formation by AWS CDK constructs.

Essentially, `aws-cdk` stack classes have a transpilation method that allows the dev-friendly Typescript code you wrote to be transpiled to Cloud formation. The downside to this process is the necessity to write a lot of boilerplate code everytime you need a new resource (SQS queue, etc.).

These two solutions solve many interesting use-cases that developers face when building cloud native apps:

![Several Serverless applications building blocks based on AWS serverless services](https://github.com/swarmion/swarmion/raw/main/packages/serverless-cdk-plugin/static/lambda-and-sqs-integration.svg)

**What if one could build an awesome Serverless application, use the AWS CDK for specific resources while having only one deployment process and no boilerplate?**

### Enter the @swarmion/serverless-cdk-plugin: a bridge between Serverless Framework and the AWS CDK.

At [Kumo](https://dev.to/kumo), we have worked on developing an awesome tool to achieve just that: a complete and stable typescript stack to build serverless applications. Did you know? Our plugin integrates seamlessly with [Swarmion](https://www.swarmion.dev/), a framework for Serverless Typescript microservices.

#### How does the plugin work?

Upon deploying (or packaging) your Serverless application (`sls deploy` or whatever you're using to deploy your stack), the `@swarmion/serverless-cdk-plugin` converts your `aws-cdk` construct code to Cloud Formation. This is essentially some kind of transpilation (typescript => cloud formation). Then, Serverless Framework provisions it on deploy.

> 🚨 Caveats: If the resources you're trying to deploy require a so-called bootstrap stack, the plugin won't work! Say you're using the aws-cdk library to provision a lambda function. The bootstrap stack consists in provisioning an S3 bucket with the lambda's code. This S3 buckets will then be referenced and used at a later stage of the deploy cycle to provision the lambda function. Don't worry, we got you covered! Constructs requiring a boostrap stack clash with Serverless Framework's deploy cycle and will result in an error at build time. The only way to deploy those type of constructs is to use a separate deployment process.

#### How can I use the plugin in my Serverless Framework app?

> 🎙 Disclaimer: This plugin supposes you are using Typescript as your Serverless app's main language. The bridge made between AWS CDK and Serverless Framework supposes users have a `serverless.ts` config file (sorry to all you yamlers out there 💅).

Import and use the `@swarmion/serverless-cdk-plugin` in your service's `serverless.ts` configuration file.

```ts
// code/serverless-config.ts

// serverless.ts

import { AWS } from '@serverless/typescript';

import type { ServerlessCdkPluginConfig } from '@swarmion/serverless-cdk-plugin';

import { OrchestratorDynamodb } from 'resources/dynamodb';

const serverlessConfiguration: AWS & ServerlessCdkPluginConfig = {
  service: `${projectName}-orchestrator`, // Keep it short to have role name below 64
  frameworkVersion,
  configValidationMode: 'error',
  // Import the plugin in your serverless configuration.
  plugins: ['@swarmion/serverless-cdk-plugin'],

  // Reference your custom aws-cdk construct at the "construct" key. That's it!
  construct: OrchestratorDynamodb,
  // ...More configuration props
};

module.exports = serverlessConfiguration;
```

Write `aws-cdk` constructs - if you have more than one, group them all in one parent construct - reference it in the `serverless.ts` file, and ta-da 🥳 🤩! Upon running your deploy script, the Serverless Framework will recognize that you want to provision your resources and deploy them.

For instance, if you want to provision a DynamoDB table:

```ts
// code/serverless-construct-testcase.ts

// MyConstruct.ts

import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

import { ServerlessConstruct, ServerlessProps } from 'types';

export class MyConstruct extends ServerlessConstruct {
  public dynamodbArn: string;
  public dynamodbName: string;
  public testServerlessConfigValue: string | undefined;

  constructor(scope: Construct, id: string, props: ServerlessProps) {
    super(scope, id, props);

    const { tableArn, tableName } = new Table(this, 'OrchestratorTable', {
      partitionKey: { name: 'PK', type: AttributeType.STRING },
      sortKey: { name: 'SK', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    this.dynamodbArn = tableArn;
    this.dynamodbName = tableName;

    // Serverless context is now accessible inside the CDK code! There are numerous use-cases, e.g. accessing your lambda's names.
    this.testServerlessConfigValue = props.serverless.resources.Outputs?.testOutput.Description;
  }
}
```

#### What you're getting:

- An all-in-one reliable stack to build serverless application!

- The plugin ships with helper functions to reference your resources inside your lambdas! Now, your lambda functions can access attributes of your DynamoDB in a type-safe manner (ARN, name, and more)!

- Moreover, the plugin exposes the Serverless context inside your construct! This allows for a better DevX: one no longer needs to hardcode ARNs or resources information inside their constructs' code.

When using the serverless <> cdk plugin, you can now type your construct as a `ServerlessCdkPlugin.ServerlessConstruct`. This will result in your construct having access to the Serverless Framework context and configuration.

```ts
// code/serverless-construct.ts

import { Construct } from 'constructs';
import * as Serverless from 'serverless';

export interface ServerlessProps {
  serverless: Serverless;
}

export class ServerlessConstruct extends Construct {
  serverlessProps?: ServerlessProps;

  constructor(scope: Construct, id: string, serverlessProps?: ServerlessProps) {
    super(scope, id);

    this.serverlessProps = serverlessProps;
  }
}
```
