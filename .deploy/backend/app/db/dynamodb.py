"""
AWS DynamoDB client and dependency
"""
import boto3
from botocore.exceptions import ClientError
from app.core.config import settings

_dynamodb = None
_table = None


def get_dynamodb_client():
    """Get DynamoDB resource"""
    global _dynamodb
    if _dynamodb is None:
        _dynamodb = boto3.resource(
            'dynamodb',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_REGION
        )
    return _dynamodb


def get_blogs_table():
    """Get or create blogs table"""
    global _table
    if _table is None:
        dynamodb = get_dynamodb_client()
        table_name = settings.DYNAMODB_BLOGS_TABLE
        
        try:
            _table = dynamodb.Table(table_name)
            # Check if table exists
            _table.load()
        except ClientError as e:
            if e.response['Error']['Code'] == 'ResourceNotFoundException':
                # Create table if it doesn't exist
                print(f"Creating DynamoDB table: {table_name}")
                _table = dynamodb.create_table(
                    TableName=table_name,
                    KeySchema=[
                        {'AttributeName': 'id', 'KeyType': 'HASH'},  # Partition key
                    ],
                    AttributeDefinitions=[
                        {'AttributeName': 'id', 'AttributeType': 'S'},
                        {'AttributeName': 'slug', 'AttributeType': 'S'},
                    ],
                    GlobalSecondaryIndexes=[
                        {
                            'IndexName': 'slug-index',
                            'KeySchema': [
                                {'AttributeName': 'slug', 'KeyType': 'HASH'},
                            ],
                            'Projection': {'ProjectionType': 'ALL'},
                            'ProvisionedThroughput': {
                                'ReadCapacityUnits': 5,
                                'WriteCapacityUnits': 5
                            }
                        }
                    ],
                    ProvisionedThroughput={
                        'ReadCapacityUnits': 5,
                        'WriteCapacityUnits': 5
                    }
                )
                # Wait for table to be created
                _table.meta.client.get_waiter('table_exists').wait(TableName=table_name)
                print(f"✅ DynamoDB table '{table_name}' created successfully")
            else:
                raise
    
    return _table


async def get_blog_table():
    """Dependency for FastAPI endpoints"""
    return get_blogs_table()
