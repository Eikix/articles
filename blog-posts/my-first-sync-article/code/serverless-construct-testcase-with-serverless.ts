// MyCdkConstruct.ts

import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

import { ServerlessConstruct, ServerlessProps } from 'types';

export class MyCdkConstruct extends ServerlessConstruct {
  public dynamodbArn: string;
  public dynamodbName: string;
  public testServerlessConfigValue: string | undefined;

  constructor(scope: Construct, id: string, props: ServerlessProps) {
    super(scope, id, props);

    const { tableArn, tableName } = new Table(this, 'MyDynamoDBTable', {
      partitionKey: { name: 'PK', type: AttributeType.STRING },
      sortKey: { name: 'SK', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
    });

    this.dynamodbArn = tableArn;
    this.dynamodbName = tableName;

    /*
      Serverless context variables is now accessible inside the CDK code!
      There are numerous other use-cases, e.g. accessing your lambda's names.
     */
    this.testServerlessConfigValue = props.serverless.resources.Outputs?.TestOutput.Description;
  }
}
