---
published: true
title: 'AWS CDK and DynamoDB: This One Configuration Line That Is Costing You Hundreds of Dollars'
cover_image: 'https://aws-bucket-images-and-resources-articles-engineering-general.s3.eu-west-3.amazonaws.com/dynamodb_awscdk_article_thumbnail.png'
description: 'AWS CDK sets the AWS DynamoDB billing mode to Provisioned by default. Learn how to fix this configuration.'
tags: serverless, awscdk, aws, dynamodb
series:
canonical_url:
---

Hey there, serverless aficionadas and aficionados 😶‍🌫️! Have you ever made an unfortunate mistake 🙊 that cost your team hundreds of dollars? More than that? No way. Thousands!? First, I'm sorry you went through this. Second, I know how you feel.

## TL;DR

When using the [AWS Cloud Development Kit](https://github.com/aws/aws-cdk) to provision a DynamoDB table, CDK sets by default [the billing mode as "Provisioned"](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_dynamodb.BillingMode.html) instead of pay-per-request. Therefore, Dynamodb essentially ceases to be truly serverless - remember scale-to-zero?

Quick fix: when instantiating your AWS Dynamodb table, make sure to explicitly set the billing mode to "pay-per-request". If you're playing around with a toy stack, you can also set the [removal policy](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.RemovalPolicy.html) to "destroy". This means that if you remove your stack, the table will be deleted as a result (probably a bad idea to use this setting in production).

```ts
// code/dynamodb-cdk.ts

import { App, RemovalPolicy, Stack } from '@aws-cdk/core';
import { AttributeType, Table, BillingMode } from '@aws-cdk/aws-dynamodb';

const app = new App();
const stack = new Stack(app);

const table = new Table(stack, 'MyTable', {
  partitionKey: { name: 'PK', type: AttributeType.STRING },
  sortKey: { name: 'SK', type: AttributeType.STRING },
  billingMode: BillingMode.PAY_PER_REQUEST,
  removalPolicy: RemovalPolicy.DESTROY,
});
```

### Getting acquainted with serverless as a software engineer

One of my first missions as a junior dev was to help design a "serverless 101 course". We aimed to help the future rookies in my team feel familiar with cloud-native concepts quickly. We created a concise tutorial that goes through the basics of serverless: lambdas, API gateway, IAM roles and dynamodb tables - with AWS as our cloud provider. I was pretty happy about the result! Newcomers could finally play in a sandbox environment with complex - and scary at first - concepts such as functions-as-a-service (FaaS) and cloud-native managed databases!

I felt proud. We had a small protocol where every new developer would deploy a toy stack. It served its purpose well and serverless newbies liked it.

### I used to take serverless tech's scale-to-zero property for granted 🥺

Surely, if you read the TL;DR and the small background story, you're starting to see where I'm going with this whole rant.

Each of our team's new engineer deployed a toy stack to learn about serverless and AWS. The serverless tutorial uses AWS CDK. To keep it light, we mostly went with default settings. Amongst these settings hid the "provisioned" billing mode and the "retain" removal policy.

To simplify, with the DynamoDB "provisioned" billing mode, AWS provisions a floor storage space, and minimum Read capacity units (RCU) & Write capacity units (WCU). Then, AWS charges you for it, regardless of your usage.

For DynamoDB, I found that the "provision" billing mode costs about $11/month per table (in US regions) even if you're not using the table at all. Moreover, when a stack is removed, the "retain" removal policy prevents the DynamoDB table from being deleted with the stack.

Each rookie deploys a sandbox stack. Storage resources are provisioned, i.e. the table costs a floor amount even if we don't use it. Tables are prevented from being deleted. Yep, a potentially bottomless pit was created.

### Wrapping it up: check your serverless expenses each month and don't take serverless' low prices for granted.

Serverless is inexpensive compared to non-serverless tech stacks. An order of magnitude cheaper. My manager seemed a little surprised when the stacks deployed as part of our serverless tutorial were costing us hundreds each month!

Thankfully ✨, my teammates caught the error after a couple of months, thus limiting my oopsie from wasting thousands of dollars (and lots of electricity 💚).
