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

*Writing infrastructure as code and lambdas functions' logic in the same repository and language feels really good*. Nevertheless, have you ever tried to provision a DynamoDB table, a SQS queue or an EventBridge with Serverless Framework? Being lambda-centric by design, this framework does not provision other AWS resources out-of-the-box for you. Essentially, it means that if you don't have any solution implemented for other resources, you'll have to write vanilla Cloud Formation. Should you want to try and feel my pain, here's [an article explaining how to provision a DynamoDB with Serverless](https://www.serverless.com/guides/dynamodb).

You can also take advantage of [embedme](https://github.com/zakhenry/embedme) to extract your code from the markdown file and make sure that what you're displaying in the markdown is always up to date too e.g.

```ts
// code/demo-code.ts

interface A {
  hello: string;
}
```

# Found a typo?

If you've found a typo, a sentence that could be improved or anything else that should be updated on this blog post, you can access it through a git repository and make a pull request. Instead of posting a comment, please go directly to <REPO URL> and open a new pull request with your changes.
