"""
AWS DynamoDB client for districts table
"""
import boto3
from botocore.exceptions import ClientError
from app.core.config import settings

_districts_table = None


def get_districts_table():
    """Get or create districts table"""
    global _districts_table
    if _districts_table is None:
        dynamodb = boto3.resource(
            'dynamodb',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_REGION
        )
        table_name = settings.DYNAMODB_DISTRICTS_TABLE
        
        try:
            _districts_table = dynamodb.Table(table_name)
            # Check if table exists
            _districts_table.load()
        except ClientError as e:
            if e.response['Error']['Code'] == 'ResourceNotFoundException':
                # Create table if it doesn't exist
                print(f"Creating DynamoDB table: {table_name}")
                _districts_table = dynamodb.create_table(
                    TableName=table_name,
                    KeySchema=[
                        {'AttributeName': 'id', 'KeyType': 'HASH'},  # Partition key
                    ],
                    AttributeDefinitions=[
                        {'AttributeName': 'id', 'AttributeType': 'S'},
                    ],
                    ProvisionedThroughput={
                        'ReadCapacityUnits': 5,
                        'WriteCapacityUnits': 5
                    }
                )
                # Wait for table to be created
                _districts_table.meta.client.get_waiter('table_exists').wait(TableName=table_name)
                print(f"[OK] DynamoDB table '{table_name}' created successfully")
            else:
                raise
    
    return _districts_table


async def get_district_table():
    """Dependency for FastAPI endpoints"""
    return get_districts_table()
