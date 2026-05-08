"""
AWS DynamoDB client for VTD books table
"""
import boto3
from botocore.exceptions import ClientError

from app.core.config import settings

_vtd_table = None


def get_vtd_books_table():
    """Get or create VTD books table"""
    global _vtd_table
    if _vtd_table is None:
        dynamodb = boto3.resource(
            'dynamodb',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_REGION
        )
        table_name = settings.DYNAMODB_VTD_TABLE

        try:
            _vtd_table = dynamodb.Table(table_name)
            _vtd_table.load()
        except ClientError as e:
            if e.response['Error']['Code'] == 'ResourceNotFoundException':
                print(f"Creating DynamoDB table: {table_name}")
                _vtd_table = dynamodb.create_table(
                    TableName=table_name,
                    KeySchema=[{'AttributeName': 'id', 'KeyType': 'HASH'}],
                    AttributeDefinitions=[{'AttributeName': 'id', 'AttributeType': 'S'}],
                    ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
                )
                _vtd_table.meta.client.get_waiter('table_exists').wait(TableName=table_name)
                print(f"DynamoDB table '{table_name}' created successfully")
            else:
                raise

    return _vtd_table


async def get_vtd_table():
    """Dependency for FastAPI endpoints"""
    return get_vtd_books_table()
