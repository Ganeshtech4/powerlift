"""
Migration script to create the forms table in DynamoDB.
Run this once to initialize the forms management system.

Usage:
    python scripts/create_forms_table.py
"""

import sys
import os

# Add parent directory to path to import app modules
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.db.forms_db import create_forms_table
from app.db.dynamodb import get_dynamodb_client


def main():
    """Create the forms table in DynamoDB."""
    print("Creating forms table...")
    try:
        dynamodb = get_dynamodb_client()
        result = create_forms_table(dynamodb)
        if result:
            print("✅ Forms table created successfully!")
            print("Table name: forms")
            print("Primary key: id (String)")
            print("GSI: category-index (for filtering by category)")
        else:
            print("ℹ️ Forms table already exists or creation returned None")
    except Exception as e:
        print(f"❌ Error creating forms table: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
