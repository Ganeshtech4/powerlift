"""
AWS DynamoDB client for referees table
"""
import boto3
from botocore.exceptions import ClientError
from app.core.config import settings

_referees_table = None


def get_referees_db_table():
    """Get or create referees table"""
    global _referees_table
    if _referees_table is None:
        dynamodb = boto3.resource(
            'dynamodb',
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_REGION
        )
        table_name = settings.DYNAMODB_REFEREES_TABLE

        try:
            _referees_table = dynamodb.Table(table_name)
            _referees_table.load()
        except ClientError as e:
            if e.response['Error']['Code'] == 'ResourceNotFoundException':
                print(f"Creating DynamoDB table: {table_name}")
                _referees_table = dynamodb.create_table(
                    TableName=table_name,
                    KeySchema=[{'AttributeName': 'id', 'KeyType': 'HASH'}],
                    AttributeDefinitions=[{'AttributeName': 'id', 'AttributeType': 'S'}],
                    ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
                )
                _referees_table.meta.client.get_waiter('table_exists').wait(TableName=table_name)
                print(f"✅ DynamoDB table '{table_name}' created successfully")
            else:
                raise

    return _referees_table


async def get_referee_table():
    """Dependency for FastAPI endpoints"""
    return get_referees_db_table()
