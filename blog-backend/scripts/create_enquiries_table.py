"""
Migration script to create the district_enquiries table in DynamoDB.
Run this once to initialize the enquiries storage system.

Usage:
    python scripts/create_enquiries_table.py
"""

import sys
import os

# Add parent directory to path to import app modules
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.db.district_enquiries_db import create_enquiries_table
from app.db.dynamodb import get_dynamodb_client


def main():
    """Create the district_enquiries table in DynamoDB."""
    print("Creating district_enquiries table...")
    try:
        dynamodb = get_dynamodb_client()
        result = create_enquiries_table(dynamodb)
        if result:
            print("✅ District enquiries table created successfully!")
            print("Table name: district_enquiries")
            print("Primary key: id (String)")
            print("GSI: district-index (for filtering by district)")
        else:
            print("ℹ️ District enquiries table already exists or creation returned None")
    except Exception as e:
        print(f"❌ Error creating district enquiries table: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
