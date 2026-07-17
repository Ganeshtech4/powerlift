"""
AWS DynamoDB client for events table
"""
import boto3
from botocore.exceptions import ClientError
from app.core.config import settings

_events_table = None


def get_events_table():
    """Get or create events table"""
    global _events_table
    if _events_table is None:
        dynamodb = boto3.resource(
            'dynamodb',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_REGION
        )
        table_name = settings.DYNAMODB_EVENTS_TABLE
        
        try:
            _events_table = dynamodb.Table(table_name)
            _events_table.load()
        except ClientError as e:
            if e.response['Error']['Code'] == 'ResourceNotFoundException':
                print(f"Creating DynamoDB table: {table_name}")
                _events_table = dynamodb.create_table(
                    TableName=table_name,
                    KeySchema=[
                        {'AttributeName': 'id', 'KeyType': 'HASH'},
                    ],
                    AttributeDefinitions=[
                        {'AttributeName': 'id', 'AttributeType': 'S'},
                        {'AttributeName': 'event_date', 'AttributeType': 'S'},
                    ],
                    GlobalSecondaryIndexes=[
                        {
                            'IndexName': 'date-index',
                            'KeySchema': [
                                {'AttributeName': 'event_date', 'KeyType': 'HASH'},
                            ],
                            'Projection': {'ProjectionType': 'ALL'},
                            'ProvisionedThroughput': {'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
                        }
                    ],
                    ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
                )
                _events_table.meta.client.get_waiter('table_exists').wait(TableName=table_name)
                print(f"[OK] DynamoDB table '{table_name}' created successfully")
            else:
                raise
    
    return _events_table


async def get_event_table():
    """Dependency for FastAPI endpoints"""
    return get_events_table()
