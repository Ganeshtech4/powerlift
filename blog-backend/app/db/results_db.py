"""
AWS DynamoDB client for results table
"""
import boto3
from botocore.exceptions import ClientError
from app.core.config import settings

_results_table = None


def get_results_table():
    """Get or create results table"""
    global _results_table
    if _results_table is None:
        dynamodb = boto3.resource(
            'dynamodb',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_REGION
        )
        table_name = settings.DYNAMODB_RESULTS_TABLE
        
        try:
            _results_table = dynamodb.Table(table_name)
            _results_table.load()
        except ClientError as e:
            if e.response['Error']['Code'] == 'ResourceNotFoundException':
                print(f"Creating DynamoDB table: {table_name}")
                _results_table = dynamodb.create_table(
                    TableName=table_name,
                    KeySchema=[
                        {'AttributeName': 'id', 'KeyType': 'HASH'},
                    ],
                    AttributeDefinitions=[
                        {'AttributeName': 'id', 'AttributeType': 'S'},
                        {'AttributeName': 'category', 'AttributeType': 'S'},
                        {'AttributeName': 'result_type', 'AttributeType': 'S'},
                    ],
                    GlobalSecondaryIndexes=[
                        {
                            'IndexName': 'category-index',
                            'KeySchema': [
                                {'AttributeName': 'category', 'KeyType': 'HASH'},
                            ],
                            'Projection': {'ProjectionType': 'ALL'},
                            'ProvisionedThroughput': {'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
                        },
                        {
                            'IndexName': 'type-index',
                            'KeySchema': [
                                {'AttributeName': 'result_type', 'KeyType': 'HASH'},
                            ],
                            'Projection': {'ProjectionType': 'ALL'},
                            'ProvisionedThroughput': {'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
                        }
                    ],
                    ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
                )
                _results_table.meta.client.get_waiter('table_exists').wait(TableName=table_name)
                print(f"[OK] DynamoDB table '{table_name}' created successfully")
            else:
                raise
    
    return _results_table


async def get_result_table():
    """Dependency for FastAPI endpoints"""
    return get_results_table()
