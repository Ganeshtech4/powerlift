import boto3
from dotenv import load_dotenv
import os

load_dotenv()

print("Testing S3 connection...")
print(f"AWS Region: {os.getenv('AWS_REGION')}")
print(f"AWS Bucket: {os.getenv('AWS_BLOG_BUCKET')}")

try:
    # Try without region first (S3 ListBuckets is region-independent)
    s3 = boto3.client('s3')
    
    # List all buckets
    buckets = s3.list_buckets()
    print(f'\n✅ S3 Connected! Found {len(buckets["Buckets"])} buckets:')
    for b in buckets['Buckets']:
        print(f"  - {b['Name']}")
    
    # Check specific bucket
    bucket_name = os.getenv('AWS_BLOG_BUCKET')
    print(f'\nChecking bucket: {bucket_name}')
    location = s3.get_bucket_location(Bucket=bucket_name)
    region = location['LocationConstraint'] or 'us-east-1'
    print(f'✅ Bucket exists! Region: {region}')
    
    # Test DynamoDB
    print("\n" + "="*50)
    print("Testing DynamoDB connection...")
    dynamodb = boto3.client('dynamodb', region_name=os.getenv('AWS_REGION'))
    
    tables = [
        os.getenv('DYNAMODB_BLOGS_TABLE'),
        os.getenv('DYNAMODB_DISTRICTS_TABLE'),
        os.getenv('DYNAMODB_RESULTS_TABLE'),
        os.getenv('DYNAMODB_EVENTS_TABLE')
    ]
    
    for table in tables:
        try:
            response = dynamodb.describe_table(TableName=table)
            print(f'✅ Table exists: {table}')
        except Exception as e:
            print(f'❌ Table error ({table}): {str(e)}')
    
except Exception as e:
    print(f'❌ Connection failed: {str(e)}')
