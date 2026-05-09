"""
District Enquiries DynamoDB operations
"""
import uuid
from datetime import datetime
from typing import List, Optional


def create_enquiries_table(dynamodb):
    """Create district_enquiries table"""
    table_name = 'district_enquiries'
    
    try:
        table = dynamodb.create_table(
            TableName=table_name,
            KeySchema=[
                {'AttributeName': 'id', 'KeyType': 'HASH'}
            ],
            AttributeDefinitions=[
                {'AttributeName': 'id', 'AttributeType': 'S'},
                {'AttributeName': 'district_id', 'AttributeType': 'S'},
                {'AttributeName': 'created_at', 'AttributeType': 'S'}
            ],
            GlobalSecondaryIndexes=[
                {
                    'IndexName': 'district-index',
                    'KeySchema': [
                        {'AttributeName': 'district_id', 'KeyType': 'HASH'},
                        {'AttributeName': 'created_at', 'KeyType': 'RANGE'}
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
        table.wait_until_exists()
        return table
    except dynamodb.meta.client.exceptions.ResourceInUseException:
        return dynamodb.Table(table_name)


def get_all_enquiries(table) -> List[dict]:
    """Get all district enquiries"""
    response = table.scan()
    items = response.get('Items', [])
    
    # Sort by created_at descending (newest first)
    items.sort(key=lambda x: x.get('created_at', ''), reverse=True)
    return items


def get_enquiries_by_district(table, district_id: str) -> List[dict]:
    """Get enquiries for a specific district"""
    response = table.query(
        IndexName='district-index',
        KeyConditionExpression='district_id = :did',
        ExpressionAttributeValues={':did': district_id},
        ScanIndexForward=False  # Descending order
    )
    return response.get('Items', [])


def get_enquiry_by_id(table, enquiry_id: str) -> Optional[dict]:
    """Get enquiry by ID"""
    response = table.get_item(Key={'id': enquiry_id})
    return response.get('Item')


def create_enquiry(table, enquiry_data: dict) -> dict:
    """Create a new district enquiry"""
    enquiry_id = str(uuid.uuid4())
    timestamp = datetime.utcnow().isoformat()
    
    item = {
        'id': enquiry_id,
        'district_id': enquiry_data['district_id'],
        'district_name': enquiry_data['district_name'],
        'name': enquiry_data['name'],
        'email': enquiry_data['email'],
        'phone': enquiry_data['phone'],
        'message': enquiry_data['message'],
        'status': 'unread',  # unread, read, replied
        'created_at': timestamp
    }
    
    table.put_item(Item=item)
    return item


def update_enquiry_status(table, enquiry_id: str, status: str) -> Optional[dict]:
    """Update enquiry status (unread/read/replied)"""
    response = table.update_item(
        Key={'id': enquiry_id},
        UpdateExpression='SET #status = :status, updated_at = :updated',
        ExpressionAttributeNames={'#status': 'status'},
        ExpressionAttributeValues={
            ':status': status,
            ':updated': datetime.utcnow().isoformat()
        },
        ReturnValues='ALL_NEW'
    )
    return response.get('Attributes')


def delete_enquiry(table, enquiry_id: str) -> bool:
    """Delete a district enquiry"""
    try:
        table.delete_item(Key={'id': enquiry_id})
        return True
    except Exception:
        return False
