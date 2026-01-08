"""
Initialize Telangana Districts
Run this script once to populate the districts table with all 33 districts
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.districts_db import get_districts_table
from app.schemas.district import DistrictCreate
from app.services.district_service import district_service

# List of 33 Telangana Districts
TELANGANA_DISTRICTS = [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hanamkonda",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
    "Jayashankar Bhupalpally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Komaram Bheem",
    "Mahabubabad",
    "Mahbubnagar",
    "Mancherial",
    "Medak",
    "Medchal–Malkajgiri",
    "Mulugu",
    "Nagarkurnool",
    "Nalgonda",
    "Narayanpet",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Rangareddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal",
    "Yadadri Bhuvanagiri"
]


def initialize_districts():
    """Initialize all 33 Telangana districts"""
    table = get_districts_table()
    
    # Get existing districts to avoid duplicates
    existing = district_service.get_all_districts(table)
    existing_names = {d['name'] for d in existing}
    
    created_count = 0
    skipped_count = 0
    
    for district_name in TELANGANA_DISTRICTS:
        if district_name in existing_names:
            print(f"⏭️  Skipped: {district_name} (already exists)")
            skipped_count += 1
            continue
        
        district_data = DistrictCreate(
            name=district_name,
            is_available=True,  # All districts start as "available" (looking for president)
            president_name=None,
            president_email=None,
            president_phone=None,
            description=None
        )
        
        try:
            district_service.create_district(table, district_data)
            print(f"✅ Created: {district_name}")
            created_count += 1
        except Exception as e:
            print(f"❌ Error creating {district_name}: {e}")
    
    print(f"\n{'='*50}")
    print(f"✅ Created: {created_count} districts")
    print(f"⏭️  Skipped: {skipped_count} districts (already exist)")
    print(f"📊 Total: {created_count + skipped_count}/{len(TELANGANA_DISTRICTS)} districts")
    print(f"{'='*50}")


if __name__ == "__main__":
    print("Initializing Telangana Districts...")
    print(f"{'='*50}\n")
    initialize_districts()
