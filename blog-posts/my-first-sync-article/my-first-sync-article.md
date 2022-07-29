---
published: false
title: 'Serverless Framework and AWS CDK: The ultimate cloud native stack'
cover_image:
description: 'Learn how to combine Serverless Framework and the AWS Cloud Development Kit to deploy serverless applications.'
tags: serverless, aws-cdk, cdk, aws, typescript, serverless-framework, lambda
series:
canonical_url:
---

As a software engineer, choosing a stack or framework to work with is hard. Take frontend developers for example. They have been argueing over which framework is the best for years. Yet, to this day, it's hard to say React has unequivoquely won (although it is safe to say Angular is loosing 🤒). The serverless community faces this struggle as well. I've been using Serverless Framework along with Typescript for half a year now to develop cloud native AWS applications. In my opinion, it's been mostly a DX dream journey - we'll get to why "mostly" is very important 🥺. 

## TL;DR
Create non-lambda AWS resources (DynamoDB tables, SQS queues, EventBridge's event buses, etc.) using the [AWS CDK](https://github.com/aws/aws-cdk) and leverage Serverless Framework's powerful plugin ecosystem to seamlessly provision these resources. Import and use the `serverless-cdk-plugin` in your `serverless.ts` file, write cdk constructs in your codebase, group them all in one parent construct, reference it in the `serverless.ts` file, and ta-da 🥳 🤩! 
Upon deploying your Serverless application (`sls deploy`), the `serverless-cdk-plugin` converts your `aws-cdk` code to Cloud Formation and Serverless Framework provisions it.

What you're getting: an all-in-one complete and reliable stack to create cloud native application! The plugin ships with helper functions to reference your resources inside your lambdas! For instance, your lambda can now have access to a type-safe ARN and name alias of your DynamoDB!

```ts

// code/lambda-config.ts

```

**Writing infrastructure as code and lambdas functions' logic in the same repository and language feels really good**. Nevertheless, have you ever tried to provision a DynamoDB table, a SQS queue or an EventBus with Serverless Framework? Being lambda-centric by design, this framework does not provision other AWS resources out-of-the-box for you. Essentially, it means that for Serverless to provision your resources, you'll have to write vanilla Cloud Formation. Should you want to try and feel the pain, here's [an article explaining how to provision a DynamoDB with Serverless](https://www.serverless.com/guides/dynamodb). Thankfully, [Fred Barthelet](https://dev.to/fredericbarthelet) recently posted an awesome article on how to replace vanilla Cloud Formation.

You can also take advantage of [embedme](https://github.com/zakhenry/embedme) to extract your code from the markdown file and make sure that what you're displaying in the markdown is always up to date too e.g.

```ts
// code/demo-code.ts

interface A {
  hello: string;
}
```

# Found a typo?

If you've found a typo, a sentence that could be improved or anything else that should be updated on this blog post, you can access it through a git repository and make a pull request. Instead of posting a comment, please go directly to <REPO URL> and open a new pull request with your changes.
