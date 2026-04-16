"""
AWS DynamoDB client for committee_members table
"""
import boto3
from botocore.exceptions import ClientError
from app.core.config import settings

_committee_table = None


def get_committee_members_table():
    """Get or create committee_members table"""
    global _committee_table
    if _committee_table is None:
        dynamodb = boto3.resource(
            'dynamodb',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_REGION
        )
        table_name = settings.DYNAMODB_COMMITTEE_TABLE

        try:
            _committee_table = dynamodb.Table(table_name)
            _committee_table.load()
        except ClientError as e:
            if e.response['Error']['Code'] == 'ResourceNotFoundException':
                print(f"Creating DynamoDB table: {table_name}")
                _committee_table = dynamodb.create_table(
                    TableName=table_name,
                    KeySchema=[{'AttributeName': 'id', 'KeyType': 'HASH'}],
                    AttributeDefinitions=[{'AttributeName': 'id', 'AttributeType': 'S'}],
                    ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
                )
                _committee_table.meta.client.get_waiter('table_exists').wait(TableName=table_name)
                print(f"✅ DynamoDB table '{table_name}' created successfully")
            else:
                raise

    return _committee_table


async def get_committee_table():
    """Dependency for FastAPI endpoints"""
    return get_committee_members_table()
