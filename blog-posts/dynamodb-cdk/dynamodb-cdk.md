---
published: false
title: 'AWS CDK and DynamoDB: this one configuration line that is costing you hundreds of dollars'
cover_image: './assets/logo_kumo_carre.png'
description: 'AWS CDK sets the AWS DynamoDB billing mode to Provisioned by default. Learn how to fix this configuration.'
tags: serverless, awscdk, aws, dynamodb
series:
canonical_url:
---

Hey there, serverless aficionadas and aficionados 😶‍🌫️! Have you ever made an unfortunate mistake 🙊 that cost your team hundreds of dollars? More than that? No way. Thousands!? First, I'm really sorry. Second, welcome to the club.

## TL;DR

When using the [AWS Cloud Development Kit](https://github.com/aws/aws-cdk) to provision a DynamoDB table, CDK sets by default the billing mode as "Provisioned" instead of pay-per-request. Therefore, Dynamodb essentially ceases to be truly serverless - remember scale-to-zero?

Quick fix: when instanciating your AWS Dynamodb table, make sure to explicitly set the billing mode to "pay-per-request". If you're playing around with a toy stack, you can also set the removal policy to "destroy". This means that if you remove your stack, the table will be deleted as a result (probably a bad idea to use this setting in production).

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

One of my first missions as a rookie dev was to help design a "serverless 101 course". We aimed to help the future rookies in my team feel familiar with cloud native concepts quickly. We built a concise tutorial that goes through the basics of serverless: lambdas, API gateway, iam roles and dynamodb tables - with AWS as our cloud provider. I was pretty happy about the result! New comers could finally play in a sandbox environment with complex - and scary at first - concepts such as functions-as-a-service and cloud native databases!

There we had it, a small protocol where every rookie would deploy a toy stack. It served its purpose well and serverless newbies liked it.

### I used to take serverless tech's scale-to-zero property for granted 🥺

Surely, if you read the TL;DR and the small background story, you're starting to see where I'm going with this whole rant.

Each of our team's new comer deployed a toy stack to learn about serverless and AWS. The serverless tutorial uses AWS CDK. To keep it light, we mostly went with default settings. Amongst these settings hid the "provisioned" billing mode and the "retain" removal policy. To simplify, the "provisioned" billing mode means that when provisioning a new dynamodb table, AWS provisions a floor amount of storage space and makes you pay for it. Moreover, as one removes their stack, the "retain" removal policy prevents the dynamodb table from being deleted with the stack.

Each rookie deploys a sandbox stack. Storage resources are provisioned, i.e. the table costs a floor amount even if we don't use it. Tables are prevented from being deleted. Yep, a potentially bottomless pit was created.

### Wrapping it up: check your serverless expenses each month and don't take serverless' low prices for granted.

Serverless is really inexpensive compared to non-serverless tech stacks. An order of magnitude cheaper. That's why my manager seemed a little surpised when the stacks deployed as part of our serverless tutorial were costing hundreds each months!

Thankfully, my teammates caught the error after a couple of months thus limiting my oopsie from wasting thousands of dollars (and electricity 💚).
