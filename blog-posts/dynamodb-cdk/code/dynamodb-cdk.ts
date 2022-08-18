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
