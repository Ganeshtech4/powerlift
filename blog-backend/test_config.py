"""Test configuration loading"""
import sys
from pydantic import ValidationError

try:
    from app.core.config import settings
    print("✅ Configuration loaded successfully!")
    print(f"MongoDB URI: {settings.MONGODB_URI}")
    print(f"AWS Region: {settings.AWS_REGION}")
    print(f"API Prefix: {settings.API_V1_PREFIX}")
except ValidationError as e:
    print(f"❌ Configuration validation errors:")
    for error in e.errors():
        field = '.'.join(str(loc) for loc in error['loc'])
        print(f"  - Field: {field}")
        print(f"    Type: {error['type']}")
        print(f"    Message: {error['msg']}")
        print()
    sys.exit(1)
except Exception as e:
    print(f"❌ Unexpected error:")
    print(f"Error type: {type(e).__name__}")
    print(f"Error message: {str(e)}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
