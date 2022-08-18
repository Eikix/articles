---
published: false
title: 'AWS CDK & Dynamodb: this one configuration line that's costing you hundreds of dollars! 🤑 🆘'
cover_image: 'https://files.slack.com/files-pri/T7RNRLR3P-F03S45QR7PH/image.png'
description: 'AWS CDK sets your AWS Dynamodb's billing mode to "Provisioned" by default! You're potentially wasting hundreds of dollars per month because of this one line of configuration'
tags: serverless, awscdk, aws, dynamodb
series:
canonical_url:
---

Hey there, serverless aficionadas and aficionados 😶‍🌫️! Have you ever made an oopsie 🙊 that cost your team hundreds of dollars? More than that? No way. Thousands!? I have two things to say to you. First, I'm sorry. Second, welcome to the club.

## TL;DR

When using the [AWS Cloud Development Kit](https://github.com/aws/aws-cdk) to provision a Dynamodb table, CDK sets by default the billing mode configuration as "Provisioned" instead of pay-per-request. This means that, by default, Dynamodb ceases to be truly serverless (remember scale-to-zero?)!

Quick fix: when instanciating your AWS Dynamodb table, make sure to explicitly set the billing mode to "pay-per-request". If you're playing around with a toy stack, you can also set the removal policy to "destroy". This means that if you remove your stack, the table will be deleted as a result (probably a bad idea to use this setting in production).

```ts
// code/dynamodb-cdk.ts
```

### Getting acquainted with serverless as a software engineer

One of my first missions as a rookie dev was to help design a "serverless 101 course". We aimed to help the future rookies in my team feel familiar with cloud native concepts quickly. We built a concise tutorial that goes through the basics of serverless: lambdas, API gateway, iam roles and dynamodb tables - with AWS as our cloud provider. I was pretty happy about the result! New comers could finally play in a sandbox environment with complex - and scary at first - concepts such as functions-as-a-service and cloud native databases!

There we had it, a small protocol where every rookie would deploy a toy stack. It served its purpose well and serverless newbies liked it.

### I used to take serverless tech's scale-to-zero property for granted 🥺

Surely, if you read the TL;DR and the small background story, you're starting to see where I'm going with this whole rant.

Each of our team's new comer deployed a toy stack to learn about serverless and AWS. The serverless tutorial uses AWS CDK. To keep it light, we mostly went with default settings. Amongst these settings hid the "provisioned" billing mode and the "retain" removal policy. To simplify, the "provisioned" billing mode means that when provisioning a new dynamodb table, AWS provisions a floor amount of storage space and makes you pay for it. Moreover, as one removes their stack, the "retain" removal policy prevents the dynamodb table from being deleted with the stack.

Several stacks deployed. Resources provisioned even without usage. Tables prevented from being deleted. A potentially endless money sink.
