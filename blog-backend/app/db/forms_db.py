"""
Forms DynamoDB operations
"""
import uuid
from datetime import datetime
from typing import List, Optional
from boto3.dynamodb.conditions import Key


def create_forms_table(dynamodb):
    """Create forms table"""
    table_name = 'forms'
    
    try:
        table = dynamodb.create_table(
            TableName=table_name,
            KeySchema=[
                {'AttributeName': 'id', 'KeyType': 'HASH'}
            ],
            AttributeDefinitions=[
                {'AttributeName': 'id', 'AttributeType': 'S'},
                {'AttributeName': 'category', 'AttributeType': 'S'}
            ],
            GlobalSecondaryIndexes=[
                {
                    'IndexName': 'category-index',
                    'KeySchema': [
                        {'AttributeName': 'category', 'KeyType': 'HASH'}
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


def get_all_forms(table) -> List[dict]:
    """Get all forms"""
    response = table.scan()
    forms = response.get('Items', [])
    
    # Sort by display_order then title
    forms.sort(key=lambda x: (x.get('display_order', 999), x.get('title', '')))
    return forms


def get_forms_by_category(table, category: str) -> List[dict]:
    """Get forms by category"""
    response = table.query(
        IndexName='category-index',
        KeyConditionExpression=Key('category').eq(category)
    )
    forms = response.get('Items', [])
    
    # Sort by display_order then title
    forms.sort(key=lambda x: (x.get('display_order', 999), x.get('title', '')))
    return forms


def get_form_by_id(table, form_id: str) -> Optional[dict]:
    """Get form by ID"""
    response = table.get_item(Key={'id': form_id})
    return response.get('Item')


def create_form(table, form_data: dict) -> dict:
    """Create new form"""
    form_id = str(uuid.uuid4())
    timestamp = datetime.utcnow().isoformat()
    
    item = {
        'id': form_id,
        'category': form_data['category'],
        'form_type': form_data['form_type'],
        'title': form_data['title'],
        'description': form_data.get('description'),
        'file_url': form_data['file_url'],
        'file_name': form_data['file_name'],
        'display_order': form_data.get('display_order', 999),
        'created_at': timestamp,
        'updated_at': timestamp
    }
    
    table.put_item(Item=item)
    return item


def update_form(table, form_id: str, form_data: dict) -> Optional[dict]:
    """Update form"""
    form = get_form_by_id(table, form_id)
    if not form:
        return None
    
    timestamp = datetime.utcnow().isoformat()
    
    # Update only provided fields
    update_expr = "SET updated_at = :updated_at"
    expr_values = {':updated_at': timestamp}
    expr_names = {}
    
    if 'category' in form_data and form_data['category'] is not None:
        update_expr += ", category = :category"
        expr_values[':category'] = form_data['category']
    
    if 'form_type' in form_data and form_data['form_type'] is not None:
        update_expr += ", form_type = :form_type"
        expr_values[':form_type'] = form_data['form_type']
    
    if 'title' in form_data and form_data['title'] is not None:
        update_expr += ", title = :title"
        expr_values[':title'] = form_data['title']
    
    if 'description' in form_data and form_data['description'] is not None:
        update_expr += ", description = :description"
        expr_values[':description'] = form_data['description']
    
    if 'file_url' in form_data and form_data['file_url'] is not None:
        update_expr += ", file_url = :file_url"
        expr_values[':file_url'] = form_data['file_url']
    
    if 'file_name' in form_data and form_data['file_name'] is not None:
        update_expr += ", file_name = :file_name"
        expr_values[':file_name'] = form_data['file_name']
    
    if 'display_order' in form_data and form_data['display_order'] is not None:
        update_expr += ", display_order = :display_order"
        expr_values[':display_order'] = form_data['display_order']
    
    table.update_item(
        Key={'id': form_id},
        UpdateExpression=update_expr,
        ExpressionAttributeValues=expr_values,
        ExpressionAttributeNames=expr_names if expr_names else None
    )
    
    return get_form_by_id(table, form_id)


def delete_form(table, form_id: str) -> bool:
    """Delete form"""
    form = get_form_by_id(table, form_id)
    if not form:
        return False
    
    table.delete_item(Key={'id': form_id})
    return True
