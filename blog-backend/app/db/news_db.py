"""
AWS DynamoDB client for news table
"""
import boto3
from botocore.exceptions import ClientError
from app.core.config import settings

_news_table = None


def get_news_table():
    """Get or create news DynamoDB table"""
    global _news_table
    if _news_table is None:
        dynamodb = boto3.resource(
            'dynamodb',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_REGION
        )
        table_name = settings.DYNAMODB_NEWS_TABLE

        try:
            _news_table = dynamodb.Table(table_name)
            _news_table.load()
        except ClientError as e:
            if e.response['Error']['Code'] == 'ResourceNotFoundException':
                print(f"Creating DynamoDB table: {table_name}")
                _news_table = dynamodb.create_table(
                    TableName=table_name,
                    KeySchema=[
                        {'AttributeName': 'id', 'KeyType': 'HASH'},
                    ],
                    AttributeDefinitions=[
                        {'AttributeName': 'id', 'AttributeType': 'S'},
                    ],
                    BillingMode='PAY_PER_REQUEST',
                )
                _news_table.meta.client.get_waiter('table_exists').wait(TableName=table_name)
                print(f"✅ DynamoDB table '{table_name}' created successfully")
            else:
                raise

    return _news_table
